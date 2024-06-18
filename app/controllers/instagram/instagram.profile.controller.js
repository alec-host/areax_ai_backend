const { validationResult } = require("express-validator");
const { getInstagramToken, instagramProfile, getLongLivedAccessToken } = require("../../services/INSTAGRAM");
const { insertOrUpdateUserInstagramActivityLog } = require("../user/instagram/store.user.instagram.data");
const { insertOrUpdateUserInstagramToken } = require("../user/instagram/store.user.instagram.token");
const { getLatestUserInstagramActivityLog } = require("../user/get.user.instagram.activity.log");
const { deleteUserInstagramActivityLog } = require("../user/instagram/delete.user.instagram.activity.log");
const { connectToRedis, closeRedisConnection } = require("../../cache/redis");

exports.GetInstagramProfile = async(req,res) => {
    const code = req.query.code;
    const error = req.query.error;
    const error_reason = req.query.error_reason;
    const errors = validationResult(req);
    if(errors.isEmpty()){
        if(error && error_reason === 'user_denied'){
            res.status(403).send({
                success: false,
                error: true,               
                message: 'Access denied. Please try again later.'
            });
        }else{
            const tokenResponse = await getInstagramToken(code,"authorize");
            if(tokenResponse[0]){
                const profile = await instagramProfile(tokenResponse[1]);
                const reference_number = await getLatestUserInstagramActivityLog();
                //-.get long lived token.
                const longLivedToken = await getLongLivedAccessToken(tokenResponse[1]);
                if(profile[0]){
                    //-.log activities.
                    await insertOrUpdateUserInstagramActivityLog({_profile_data: profile[1]},reference_number);
                    //-.store token info.
                    await insertOrUpdateUserInstagramToken(reference_number,tokenResponse[1],longLivedToken);
                    //-.cache token.
                    const client = await connectToRedis();
                    if(client){
                        if(longLivedToken){
                            await client.set(reference_number,longLivedToken);
                        }
                        await closeRedisConnection(client);
                    }
                    //-.clean up.
                    await deleteUserInstagramActivityLog(reference_number,"authorize");
                    await deleteUserInstagramActivityLog(reference_number,"deauthorize");
                    res.redirect(303,'https://www.weaiu.com/instagram?message=Your Instagram profile information has been shared with AreaX');
                }else{
                    res.redirect(400,`https://www.weaiu.com/instagram?message=${profile[1]}`);
                }   
            }else{
                res.status(400).json({
                    success: false,
                    error: true,
                    message: tokenResponse[1]
                });
            }
        }
    }else{
        res.status(422).json({errors: errors.array()});
    }
};