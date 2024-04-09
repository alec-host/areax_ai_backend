const { validationResult } = require("express-validator");
const { findUserCountByEmail } = require("../user/find.user.count.by.email");
const { findUserCountByReferenceNumber } = require("../user/find.user.count.by.reference.no");
const { instagramOauthEndpoint } = require("../../services/INSTAGRAM");
const { storeUserInstagramActivityLog } = require("../user/instagram/store.user.instagram.activity.log");
const { findUserInstagramProfileCountByReferenceNumber } = require("../user/instagram/find.user.instagram.profile.by.reference.no");

exports.InstagramAuthorize = async(req,res) => {
    const { email,reference_number,operation_type } = req.body;
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const email_found = await findUserCountByEmail(email);
        if(email_found > 0){
            const reference_number_found = await findUserCountByReferenceNumber(reference_number);
            if(reference_number_found > 0){
                const resp = await instagramOauthEndpoint(operation_type);
                if(resp[0]){
                    const accountExist = await findUserInstagramProfileCountByReferenceNumber(reference_number);
                    const route = req.originalUrl;
                    const created_at = Date.now();
                    if(accountExist === 0){
                        if(operation_type !== "deauthorize"){
                            await storeUserInstagramActivityLog({reference_number,route,operation_type,created_at});
                            res.status(200).json({
                                success: true,
                                error: false,
                                data: resp[1],
                                message: 'You will shortly be redirected back to your page.'
                            });
                        }else{
                            res.status(401).json({
                                success: false,
                                error: false,
                                data: [],
                                message: 'You have not allowed AreaX to access your Instagram account.'
                            });
                        }
                    }else{
                        if(operation_type === "deauthorize"){
                            await storeUserInstagramActivityLog({reference_number,route,operation_type,created_at});
                            res.status(200).json({
                                success: true,
                                error: false,
                                data: resp[1],
                                message: 'You will shortly be redirected back to your page.'
                            });                           
                        }else{
                            res.status(200).json({
                                success: false,
                                error: true,
                                data:[],
                                message: 'You have already allowed AreaX to access your Instagram acccount.'
                            });
                        }
                    }
                }else{
                    res.status(400).json({
                        success: false,
                        error: true,
                        data: [],
                        message: resp[1]
                    });
                }
            }else{
                res.status(404).json({
                    success: false,
                    error: true,
                    message: "Reference number not found."
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
        res.status(422).json({errors: errors.array()});
    }
};