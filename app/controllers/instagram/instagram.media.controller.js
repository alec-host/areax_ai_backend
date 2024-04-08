const { validationResult } = require("express-validator");
const { getInstagramToken, instagramMedia } = require("../../services/INSTAGRAM");
//const { insertOrUpdateUserInstagramActivityLog } = require("../user/store.user.instagram.data");
const { getLatestUserInstagramActivityLog } = require("../user/get.user.instagram.activity.log");
const { deleteUserInstagramActivityLog } = require("../user/instagram/delete.user.instagram.activity.log");
const { getUserInstagramIdByReferenceNo } = require("../user/get.user.instagram.id.by.reference.no");

exports.GetInstagramMedia = async(req,res) => {
    const code = req.query.code;
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const tokenResponse = await getInstagramToken(code,"media");
        if(tokenResponse[0]){
            const reference_number = await getLatestUserInstagramActivityLog();
            if(reference_number){
                const userInstagramDetails = await getUserInstagramIdByReferenceNo(reference_number);
                const userInstagramID = JSON.parse(userInstagramDetails)._profile_data.id;
                const media = await instagramMedia(userInstagramID,tokenResponse[1]);
                //-..
                //await insertOrUpdateUserInstagramActivityLog({_profile_data: profile[1]},reference_number);
                //-.clean up.
                await deleteUserInstagramActivityLog(reference_number);
                res.status(200).json({
                    success: true,
                    error: false,
                    data: media[1],
                    message: 'Media information'
                });
            }else{
                res.status(404).json({
                    success: false,
                    error: true,
                    message: "Reference number not found."
                }); 
            }
        }else{
            res.status(400).json({
                success: false,
                error: true,
                message: tokenResponse[1]
            });
        }
    }else{
        res.status(422).json({errors: errors.array()});
    }
};