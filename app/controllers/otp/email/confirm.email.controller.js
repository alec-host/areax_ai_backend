const { findUserCountByEmail } = require("../../user/find.user.count.by.email");
const { confirmMailOtp } = require("../confirm.mail.otp");

exports.ConfirmEmail = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const { email, otp } = req.body;
        try{ 
            const user_found = await findUserCountByEmail(email);
            if(user_found > 0){
                const hasOtpMatched = await confirmMailOtp(otp,email);
                if(hasOtpMatched){
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
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing: request payload not provided."
        }); 
    }
};