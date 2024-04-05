const { validationResult } = require("express-validator");
const { findUserCountByEmail } = require("../user/find.user.count.by.email");
const { findUserCountByReferenceNumber } = require("../user/find.user.count.by.reference.no");
const { instagramOauthEndpoint } = require("../../services/INSTAGRAM");
const { storeUserInstagramActivityLog } = require("../user/store.user.instagram.activity.log");

exports.InstagramAuthorize = async(req,res) => {
    const { email,reference_number } = req.body;
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const email_found = await findUserCountByEmail(email);
        if(email_found > 0){
            const reference_number_found = await findUserCountByReferenceNumber(reference_number);
            if(reference_number_found > 0){
                const resp = await instagramOauthEndpoint(reference_number);
                if(resp[0]){

                    const route = req.originalUrl;
                    const created_at = Date.now();
                    await storeUserInstagramActivityLog({reference_number,route,created_at});
                    
                    res.status(200).json({
                        success: false,
                        error: true,
                        data: resp[1],
                        message: 'Redirect url'
                    });
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