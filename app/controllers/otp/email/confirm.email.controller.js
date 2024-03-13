const { findUserCountByEmail } = require("../../user/find.user.count.by.email");
const { confirmMailOtp } = require("../confirm.mail.otp");
const { purgeOtp } = require("../purge.otp");

exports.ConfirmEmail = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const { email, otp } = req.body;
        try{ 
            if(typeof email !== "undefined"){
                const user_found = await findUserCountByEmail(email);
                if(user_found > 0){
                    if(typeof otp !== "undefined"){
                        const hasOtpMatched = await confirmMailOtp(otp,email);
                        if(hasOtpMatched){
                            await purgeOtp(email);
                            res.status(200).json({
                                success: true,
                                error: false,
                                message: 'OTP confirmed.'
                            });
                        }else{
                            res.status(200).json({
                                success: false,
                                error: true,
                                message: 'Invalid OTP.'
                            });
                        }
                    }else{
                        res.status(500).json({
                            success: false,
                            error: true,
                            message: "Missing: otp must be not provided."
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
                res.status(500).json({
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
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing: request payload not provided."
        }); 
    }
};