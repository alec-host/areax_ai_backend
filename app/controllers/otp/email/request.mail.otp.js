const { sendEmailOtp } = require("../../../services/NODEMAILER");
const { generateRandomOtp } = require("../../../utils/generate.otp");
const { findUserCountByEmail } = require("../../user/find.user.count.by.email");
const { findUserCountByReferenceNumber } = require("../../user/find.user.count.by.reference.no");
const { saveMailOtp } = require("../save.mail.otp");

exports.RequestEmailOtp = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const { email, reference_number } = req.body;
        try{ 
            if(typeof email !== "undefined"){
                const email_found = await findUserCountByEmail(email);
                if(email_found > 0){
                    if(typeof reference_number !== "undefined"){
                        const reference_number_found = await findUserCountByReferenceNumber(reference_number);
                        if(reference_number_found > 0){
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
                            res.status(404).json({
                                success: false,
                                error: true,
                                message: 'Reference number not found.'
                            });                           
                        }
                    }else{
                        res.status(400).json({
                            success: false,
                            error: true,
                            message: "Missing: reference number must be not provided."
                        });                         
                    }
                }else{
                    res.status(404).json({
                        success: false,
                        error: false,
                        message: 'Email not found.'
                    });               
                }
            }else{
                res.status(400).json({
                    success: false,
                    error: true,
                    message: "Missing: email must be not provided."
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
        res.status(400).json({
            success: false,
            error: true,
            message: "Missing: request payload not provided."
        }); 
    }
};