const {v4:uuidv4} = require('uuid');
const db = require('../../models');

const { findUserCountByEmail } = require('../user/find.user.count.by.email');
const { modifyUserByEmail } = require('../user/modify.user.by.email');
const { sendEmailOtp } = require('../../services/NODEMAILER');
const { saveMailOtp } = require('../otp/save.mail.otp');
const { getUserProfileByEmail } = require('../user/get.user.profile.by.email');
const { generateRandomOtp } = require('../../utils/generate.otp');
const { accessToken, refreshToken } = require('../../services/JWT');
const { encrypt } = require('../../services/CRYPTO');
const { validateEmail } = require('../../validation/validate.email');

exports.UserSignUp = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const { name, email, password } = req.body;
        const Users = db.users;
        try{ 
            if(name !=="" && email !== "" && password !==""){
                try{
                    if(typeof name !== "undefined"){
                        if(typeof email !== "undefined"){
                            if(typeof password !== "undefined"){
                                const isEmailValid = await validateEmail(email);
                                if(isEmailValid){
                                    const google_user_id = 0;
                                    const reference_number = 'AXR_'+uuidv4();
                                    const profile_picture_url = 'https://';
                                    const hashedPassword = await encrypt(password);
                                    const access_token = accessToken({email:email});
                                    const refresh_token = refreshToken({email:email});
                                    const newUser = {reference_number,google_user_id,name,email,profile_picture_url,access_token,refresh_token,password:hashedPassword};

                                    const found_user = await findUserCountByEmail(email);
                                    if(found_user === 0){
                                        const otpCode = generateRandomOtp();
                                        const response = await sendEmailOtp(email,otpCode);
                                        if(response[0]){
                                            await saveMailOtp({phone:0,email:email,message:response[2]});
                                            Users.create(newUser).then(data => {
                                                const username = data.username;
                                                const email = data.email;
                                                const display_name = data.display_name;
                                                const profile_picture_url = data.profile_picture_url;
                                                const reference_number = data.reference_number;
                                                const country = 0;
                                                const city = 0;
                                                const email_verified = 0;
                                                const phone_verified = 0;
                                                const date_created = data.created_at;
                                                const userProfile = {reference_number,username,email,display_name,profile_picture_url,country,city,email_verified,phone_verified,date_created};
                                                res.status(201).json({
                                                    success: true,
                                                    error: false,
                                                    data: userProfile,
                                                    access_token: access_token,
                                                    refresh_token: reference_number,
                                                    message: 'User account has been created.'
                                                });
                                            }).catch(err => {
                                                res.status(500).json({
                                                    success: false,
                                                    error: true,
                                                    message: err.message || 'Error occurred, user creation has failed.'
                                                });
                                            });
                                        }else{
                                            res.status(400).json({
                                                success: false,
                                                error: true,
                                                message: response[1] || 'Invalid token'
                                            });
                                        }               
                                    }else{
                                        await modifyUserByEmail(email,{is_online:1,access_token:access_token,refresh_token:refresh_token});
                                        await getUserProfileByEmail(email,callBack => {
                                            res.status(200).json({
                                                success: true,
                                                error: false,
                                                data: callBack,
                                                access_token: access_token,
                                                refresh_token: refresh_token,
                                                message: 'Authentication successful'
                                            });
                                        });
                                    }
                                }else{
                                    res.status(400).json({
                                        success: false,
                                        error: true,
                                        message: 'Invalid email.'
                                    });
                                } 
                            }else{
                                res.status(400).json({
                                    success: false,
                                    error: true,
                                    message: 'Password has to be provided.'
                                });                                 
                            }
                        }else{
                            res.status(400).json({
                                success: false,
                                error: true,
                                message: 'Email has to be provided.'
                            });                         
                        }
                    }else{
                        res.status(400).json({
                            success: false,
                            error: true,
                            message: 'Name has to be provided.'
                        });                       
                    }
                }catch(e){
                    if(e){
                        res.status(401).json({
                            success: false,
                            error: true,
                            message: "The token provided is invalid or has expired."
                        });
                    } 
                }
            }else{
                res.status(400).json({
                    success: false,
                    error: true,
                    message: 'Missing: request payload not provided.'
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