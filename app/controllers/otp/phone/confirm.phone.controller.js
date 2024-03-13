const { verifyToken } = require("../../../services/FIREBASE-OTP");
const { findUserCountByPhone } = require("../../user/find.user.count.by.phone");

exports.ConfirmPhone = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const { idToken } = req.body;
        try{ 
            const decodedPhone = await verifyToken();
            const user_found = await findUserCountByPhone(decodedPhone);
            if(user_found > 0){
                if(decodedPhone){
                    res.status(200).json({
                        success: true,
                        error: false,
                        data: data,
                        message: 'Phone has been verified.'
                    });
                }else{
                    res.status(200).json({
                        success: true,
                        error: false,
                        message: 'Failed to confirm the phone.'
                    });
                }
            }else{
                res.status(404).json({
                    success: true,
                    error: false,
                    message: 'Phone not found.'
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