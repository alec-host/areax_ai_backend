const { validationResult } = require("express-validator");
const { sendEmailOtp } = require("../../../services/NODEMAILER");
const { generateRandomOtp } = require("../../../utils/generate.otp");
const { findUserCountByEmail } = require("../../user/find.user.count.by.email");
const { findUserCountByReferenceNumber } = require("../../user/find.user.count.by.reference.no");
const { saveMailOtp } = require("../save.mail.otp");
const { otpWaitTimeInMinutes } = require("../otp.wait.time.model");

exports.RequestEmailOtp = async(req,res) => {
    const { email, reference_number } = req.body;
    const errors = validationResult(req);
    if(errors.isEmpty()){
        try{ 
            const email_found = await findUserCountByEmail(email);
            if(email_found > 0){
                const reference_number_found = await findUserCountByReferenceNumber(reference_number);
                if(reference_number_found > 0){
                    let delay = {};
                    const waitTimeInMinutes = await otpWaitTimeInMinutes(email);
                    if(waitTimeInMinutes !== null){
                        delay = JSON.stringify(waitTimeInMinutes);
                    }else{
                        delay = {time_in_minutes: 0};
                    }
                    if(JSON.parse(delay).time_in_minutes >= 25){
                        const otpCode = generateRandomOtp();
                        const response = await sendEmailOtp(email,otpCode);
                        if(response[0]){
                            await saveMailOtp({phone:0,email:email,message:response[2]});
                            res.status(200).json({
                                success: true,
                                error: false,
                                message: response[1]
                            }); 
                        }else{
                            res.status(400).json({
                                success: false,
                                error: true,
                                message: response[1] || 'Invalid token'
                            });                                
                        }  
                    }else{
                        res.status(400).json({
                            success: true,
                            error: false,
                            message: 'OTP will be sent once 25 minutes lapses.' 
                        }); 
                    }
                }else{
                    res.status(404).json({
                        success: false,
                        error: true,
                        message: 'Reference number not found.'
                    });                           
                }
            }else{
                res.status(404).json({
                    success: false,
                    error: false,
                    message: 'Email not found.'
                });               
            }
        }catch(e){
            if(e){
                res.status(500).json({
                    success: false,
                    error: true,
                    message: e?.response?.message || 'Something wrong has happened'
                });
            }           
        }
    }else{
        res.status(422).json({errors: errors.array()});
    }
};