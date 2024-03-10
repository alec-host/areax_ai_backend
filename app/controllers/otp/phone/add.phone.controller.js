const { sendVerificationToken } = require("../../../services/FIREBASE-OTP");
const { findUserCountByEmail } = require("../../user/find.user.count.by.email");
const { modifyUserByEmail } = require("../../user/modify.user.by.email");

exports.AddPhone = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const { email,phone } = req.body;
        try{ 
            const user_found = await findUserCountByEmail(email);
            if(user_found > 0){
                const response = await sendVerificationToken(phone);
                if(response[0]){
                    await modifyUserByEmail(email,{phone:phone});
                    res.status(200).json({
                        success: true,
                        error: false,
                        verificationToken: response[1],
                        message: response[2]
                    });
                }else{
                    res.status(500).json({
                        success: false,
                        error: true,
                        message: request[1]
                    });
                }
            }else{
                res.status(404).json({
                    success: false,
                    error: true,
                    message: 'Email not found'
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