const { validationResult } = require("express-validator");
const { getInstagramToken, instagramProfile } = require("../../services/INSTAGRAM");
const { insertOrUpdateUserInstagramActivityLog } = require("../user/instagram/store.user.instagram.data");
const { getLatestUserInstagramActivityLog } = require("../user/get.user.instagram.activity.log");
const { deleteUserInstagramActivityLog } = require("../user/instagram/delete.user.instagram.activity.log");

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
                //-..
                await insertOrUpdateUserInstagramActivityLog({_profile_data: profile[1]},reference_number);
                //-.clean up.
                await deleteUserInstagramActivityLog(reference_number);
                res.status(200).json({
                    success: true,
                    error: false,
                    data: profile[1],
                    message: 'Profile information'
                });
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