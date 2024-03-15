const { findUserCountByEmail } = require("../../user/find.user.count.by.email");
const { findUserCountByReferenceNumber } = require("../../user/find.user.count.by.reference.no");
const { modifyUserByEmail } = require("../../user/modify.user.by.email");
const { confirmMailOtp } = require("../confirm.mail.otp");
const { purgeOtp } = require("../purge.mail.otp");

exports.ConfirmEmail = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const { email, reference_number, otp } = req.body;
        try{ 
            if(typeof email !== "undefined"){
                const email_found = await findUserCountByEmail(email);
                if(email_found > 0){
                    if(typeof reference_number !== "undefined"){
                        const reference_number_found = await findUserCountByReferenceNumber(reference_number);
                        if(reference_number_found > 0){
                            if(typeof otp !== "undefined"){
                                const hasOtpMatched = await confirmMailOtp(otp,email);
                                if(hasOtpMatched){
                                    await purgeOtp(email);
                                    await modifyUserByEmail(email,{email_verified:1});
                                    res.status(200).json({
                                        success: true,
                                        error: false,
                                        message: 'OTP confirmed.'
                                    });
                                }else{
                                    res.status(400).json({
                                        success: false,
                                        error: true,
                                        message: 'Invalid OTP.'
                                    });
                                }
                            }else{
                                res.status(400).json({
                                    success: false,
                                    error: true,
                                    message: "Missing: otp must be not provided."
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
                    message: "Missing: param(s) must be not provided."
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