const { validationResult } = require("express-validator");
const { getInstagramToken, instagramProfile } = require("../../services/INSTAGRAM");
const { insertOrUpdateUserInstagramActivityLog } = require("../user/store.user.instagram.data");
const { getLatestUserInstagramActivityLog } = require("../user/get.user.instagram.activity.log");
const { deleteUserInstagramActivityLog } = require("../user/delete.user.instagram.activity.log");

exports.GetInstagramProfile = async(req,res) => {
    const code = req.query.code;
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const resp = await getInstagramToken(code);
        if(resp[0]){
            const profile = await instagramProfile(resp[1]);
            const reference_number = await getLatestUserInstagramActivityLog();

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
                message: resp[1]
            });
        }
    }else{
        res.status(422).json({errors: errors.array()});
    }
};