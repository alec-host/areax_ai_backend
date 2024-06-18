const { validationResult } = require("express-validator");
const { findUserCountByEmail } = require("../user/find.user.count.by.email");
const { findUserCountByReferenceNumber } = require("../user/find.user.count.by.reference.no");
const { getUserInstagramIdByReferenceNo } = require("../user/get.user.instagram.id.by.reference.no");
const { extractInstagramBasicData } = require("../../utils/extract.ig.user.basic.info");
const { instagramProfile, refreshLongLivedAccessToken } = require("../../services/INSTAGRAM");
const { connectToRedis, closeRedisConnection } = require("../../cache/redis");
const { calculateInstagramTokenExpiry } = require("../user/instagram/user.instagram.token.expiry.date");

exports.GetInstagramBasicInfo = async(req,res) => {
    const errors = validationResult(req);
    const email = req.query.email;
    const reference_number = req.query.reference_number;

    if(errors.isEmpty()){
        try{
            const email_found = await findUserCountByEmail(email);
            if(email_found > 0){
                const reference_number_found = await findUserCountByReferenceNumber(reference_number);
                if(reference_number_found > 0){
                    const client = await connectToRedis();
                    if(client){
                        const dateDifferenceInDays = await calculateInstagramTokenExpiry(reference_number);
                        const longLivedToken = await client.get(reference_number);
                        if(longLivedToken){
                            //-.renew token if it's 1 day old.
                            if(dateDifferenceInDays && dateDifferenceInDays.length > 0){
                                const newLongLivedToken = await refreshLongLivedAccessToken(longLivedToken);
                                const profile = await instagramProfile(newLongLivedToken);
                                client.set(reference_number,profile[1]);
                            }else{
                                await instagramProfile(longLivedToken);
                            }
                            closeRedisConnection(client);
                        }
                    }
                    const instagramBasicInfo = await getUserInstagramIdByReferenceNo(reference_number);
                    try {
                        if(instagramBasicInfo){
                            const object = JSON.parse(instagramBasicInfo);
                            const jsonData = extractInstagramBasicData(object);
                            res.status(200).json({
                               success: true,
                               error: false,
                               data: jsonData,
                               message: "Instagram user basic information."
                            });
                         }else{
                            res.status(404).json({
                               success: false,
                               error: true,
                               data: [],
                               message: "To proceed allow Instagram to access your data."
                            });
                         } 
                    }catch(error){
                        console.error('Error parsing JSON string:', error);
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
        res.status(422).json({errors: errors.array()});
    }
};