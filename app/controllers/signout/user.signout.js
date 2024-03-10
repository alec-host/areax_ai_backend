const { modifyUserByEmail } = require("../user/modify.user.by.email");

exports.SignOut = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const { email } = req.body;
        if(typeof email !== "undefined"){
            const signout = await modifyUserByEmail(email,{is_online:0});
            if(signout){
                res.status(200).json({
                    success: true,
                    error: false,
                    message: 'Sign out was successful.'
                });              
            }else{
                res.status(404).json({
                    success: false,
                    error: true,
                    message: "email not found."
                });                
            }
        }else{
            res.status(500).json({
                success: false,
                error: true,
                message: "Missing: request payload not provided."
            });             
        }
    }else{
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing: request payload not provided."
        }); 
    }
};