const { findUserCountByEmail } = require("../user/find.user.count.by.email");
const { modifyUserByEmail } = require("../user/modify.user.by.email");

exports.SignOut = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const { email } = req.body;
        try{
            if(typeof email !== "undefined"){
                email_found = await findUserCountByEmail(email);
                if(email_found > 0){
                    const signout = await modifyUserByEmail(email,{is_online:0});
                    if(signout){
                        res.status(200).json({
                            success: true,
                            error: false,
                            message: 'Sign out was successful.'
                        });              
                    }else{
                        res.status(400).json({
                            success: false,
                            error: true,
                            message: "Missing: email has to be provided."
                        });                
                    }
                }else{
                    res.status(404).json({
                        success: false,
                        error: true,
                        message: "Email not found."
                    }); 
                }
            }else{
                res.status(400).json({
                    success: false,
                    error: true,
                    message: "Missing: request payload not provided."
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