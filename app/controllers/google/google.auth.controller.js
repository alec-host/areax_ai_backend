const {v4:uuidv4} = require('uuid');
const db = require('../../models');

const { confirmGoogleToken } = require('../../services/GOOGLE-SIGN');
const { findUserCountByEmail } = require('../user/find.user.count.by.email');
const { modifyUserByEmail } = require('../user/modify.user.by.email');
const { sendEmailOtp } = require('../../services/NODEMAILER');
const { saveMailOtp } = require('../otp/save.mail.otp');

exports.GoogleUserSignIn = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const { idToken } = req.body;
        try{ 
            const Users = db.users;
            const payload = await confirmGoogleToken(idToken);
            if(payload){
                const google_user_id = payload['sub'];
                const username = payload['name'];
                const email = payload['email'];
                const display_name = payload['given_name'];
                const profile_picture_url = payload['picture'];
                const reference_number = 'AX_'+uuidv4();
                const newUser = {reference_number,google_user_id,username,display_name,email,profile_picture_url};

                const found_user = await findUserCountByEmail(email);
                if(found_user === 0){
                    const response = await sendEmailOtp(email);
                    if(response[0]){
                        await saveMailOtp({phone:0,email:email,message:response[2]});
                        Users.create(newUser).then(data => {
                            const username = data.username;
                            const email = data.email;
                            const display_name = data.display_name;
                            const profile_picture_url = data.profile_picture_url;
                            const reference_number = data.reference_number;
                            const userProfile = {reference_number,username,email,display_name,profile_picture_url};
                            res.status(201).json({
                                success: true,
                                error: false,
                                data: userProfile,
                                access_token: "",
                                refresh_token: "",
                                message: 'Authentication successful & '+response[1]
                            });
                        }).catch(err => {
                            res.status(500).json({
                                success: false,
                                error: true,
                                message: err.message || 'Error occurred, user creation has failed.'
                            });
                        });
                    }else{
                        res.status(500).json({
                            success: false,
                            error: true,
                            message: response[1]
                        });
                    }               
                }else{
                    const userProfile = {reference_number,username,email,display_name,profile_picture_url};
                    await modifyUserByEmail(email,{is_online:1});
                    res.status(200).json({
                        success: true,
                        error: false,
                        data: userProfile,
                        access_token: "",
                        refresh_token: "",
                        message: 'Authentication successful'
                    });
                }
            }else{
                res.status(401).json({
                    success: true,
                    error: false,
                    message: 'Authentication unsuccessful.'
                });
            }
        }catch(e){
            if(e){
                res.status(500).json({
                    success: false,
                    error: true,
                    message: e?.response?.message
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