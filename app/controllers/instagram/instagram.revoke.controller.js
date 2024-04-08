const { validationResult } = require("express-validator");
const { revokeInstagramAccess, getInstagramToken } = require("../../services/INSTAGRAM");
const { getUserInstagramIdByReferenceNo } = require("../user/get.user.instagram.id.by.reference.no");
const { getLatestUserInstagramActivityLog } = require("../user/get.user.instagram.activity.log");
const { deleteUserInstagramActivityLog } = require("../user/instagram/delete.user.instagram.activity.log");
const { userDeletionByReferenceNumber } = require("../user/instagram/mark.deleted.user.instagram.data");

exports.InstagramRevoke = async(req,res) => {
    const code = req.query.code;
    const errors = validationResult(req)
    if(errors.isEmpty()){
        const tokenResponse = await getInstagramToken(code,"deauthorize");
        if(tokenResponse[0]){
            const reference_number = await getLatestUserInstagramActivityLog();
            if(reference_number){
                const userInstagramDetails = await getUserInstagramIdByReferenceNo(reference_number);
                if(userInstagramDetails.length > 0){
                    const userInstagramID = JSON.parse(userInstagramDetails)._profile_data.id;
                    const response = await userDeletionByReferenceNumber(reference_number);
                    if(response){
                        await revokeInstagramAccess(userInstagramID,tokenResponse[1]);
                        //-.clean up.
                        await deleteUserInstagramActivityLog(reference_number);
                        res.status(200).json({
                            success: true,
                            error: false,
                            message: 'Instagram access revoked & data deleted.'
                        });
                    }else{
                        res.status(400).json({
                            success: false,
                            error: true,
                            message: 'Failed to delete user\'s Instagram data.'
                        });
                    }
                }else{
                    res.status(404).json({
                        success: false,
                        error: true,
                        message: 'User\'s Instagram ID not found.'
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