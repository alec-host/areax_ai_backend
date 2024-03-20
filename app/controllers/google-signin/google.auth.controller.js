const {v4:uuidv4} = require('uuid');

const { confirmGoogleToken } = require('../../services/GOOGLE-SIGN');
const { findUserCountByEmail } = require('../user/find.user.count.by.email');
const { modifyUserByEmail } = require('../user/modify.user.by.email');
const { sendEmailOtp } = require('../../services/NODEMAILER');
const { saveMailOtp } = require('../otp/save.mail.otp');
const { getUserProfileByEmail } = require('../user/get.user.profile.by.email');
const { generateRandomOtp } = require('../../utils/generate.otp');
const { accessToken, refreshToken } = require('../../services/JWT');
const { createUser } = require('../user/create.user');
const { validationResult } = require('express-validator');

exports.GoogleUserSignIn = async(req,res) => {
    const { idToken } = req.body;
    const errors = validationResult(req);
    if(errors.isEmpty()){
        try{
            const payload = await confirmGoogleToken(idToken);
            if(payload){
                const google_user_id = payload['sub'];
                const username = payload['name'];
                const email = payload['email'];
                const display_name = payload['given_name'];
                const profile_picture_url = payload['picture'];
                const reference_number = 'AXS_'+uuidv4();
                const access_token = accessToken({email:email});
                const refresh_token = refreshToken({email:email});
                const newUser = {reference_number,google_user_id,username,display_name,email,profile_picture_url,access_token,refresh_token};
                const found_user = await findUserCountByEmail(email);
                if(found_user === 0){
                    const otpCode = generateRandomOtp();
                    const response = await sendEmailOtp(email,otpCode);
                    if(response[0]){
                        await saveMailOtp({phone:0,email:email,message:response[2]});
                        const resp = await createUser(newUser);
                        if(resp[0]){
                            await getUserProfileByEmail(email,profileCallback => {
                                res.status(201).json({
                                    success: true,
                                    error: false,
                                    data: profileCallback,
                                    access_token: access_token,
                                    refresh_token: refresh_token,
                                    message: resp[1] +' '+ response[1]
                                }); 
                            });                                               
                        }else{
                            res.status(500).json({
                                success: false,
                                error: true,
                                message: resp[1]
                            });
                        }
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
                    message: 'Missing: idToken has to be provided.'
                });  
            }
        }catch(e){
            if(e){
                res.status(401).json({
                    success: false,
                    error: true,
                    message: "The signin token is invalid or has expired."
                });
            } 
        }
    }else{
        res.status(422).json({errors: errors.array()});
    }  
};