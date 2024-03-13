const { sendEmailOtp } = require("../../../services/NODEMAILER");
const { findUserCountByEmail } = require("../../user/find.user.count.by.email");

exports.ValidateEmail = async(req,res) => {
    const { email } = req.body;
    if(email){
        try{ 
            if(typeof email !== "undefined"){
                const user_found = await findUserCountByEmail(email);
                if(user_found > 0){
                    const response = await sendEmailOtp(email);
                    if(response[0]){
                        res.status(200).json({
                            success: true,
                            error: false,
                            message: response[1]
                        });
                    }else{
                        res.status(500).json({
                            success: false,
                            error: true,
                            message: response[1]
                        });
                    }
                }else{
                    res.status(404).json({
                        success: false,
                        error: false,
                        message: 'User not found'
                    });                
                }
            }else{
                res.status(500).json({
                    success: false,
                    error: true,
                    message: "Missing: email is not provided."
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