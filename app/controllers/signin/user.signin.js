const { compare } = require("bcrypt");
const { findUserCountByEmail } = require("../user/find.user.count.by.email");
const { getUserPasswordByEmail } = require("../user/get.user.paswd.by.email");
const { modifyUserByEmail } = require("../user/modify.user.by.email");
const { accessToken, refreshToken } = require("../../services/JWT");
const { getUserProfileByEmail } = require("../user/get.user.profile.by.email");

exports.SignIn = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const { email,password } = req.body;
        try{
            if(typeof email !== "undefined"){
                if(typeof password !== "undefined"){
                    const email_found = await findUserCountByEmail(email);
                    if(email_found > 0){
                        const storedPassword = await getUserPasswordByEmail(email);
                        const allowedAccess = await compare(password,storedPassword);
                        const signIn = await modifyUserByEmail(email,{is_online:1});
                        if(allowedAccess && signIn){
                            const _accessToken = accessToken({email:email});
                            const _refreshToken = refreshToken({email:email});
                            await getUserProfileByEmail(email,profileCallback => {
                                res.status(200).json({
                                    success: true,
                                    error: false,
                                    data: profileCallback,
                                    access_token: _accessToken,
                                    refresh_token: _refreshToken,
                                    message: 'Login was successful.'
                                });  
                            });            
                        }else{
                            res.status(400).json({
                                success: false,
                                error: true,
                                message: "Login has failed."
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
                        message: "Password must be provided."
                    });                     
                }
            }else{
                res.status(400).json({
                    success: false,
                    error: true,
                    message: "Email must be provided."
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