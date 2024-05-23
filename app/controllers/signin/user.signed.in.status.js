const { findUserCountByEmail } = require("../user/find.user.count.by.email");
const { findUserCountByReferenceNumber } = require("../user/find.user.count.by.reference.no");
const { validationResult } = require("express-validator");
const { getUserSignedInStatusCountByEmail } = require("../user/get.user.signed.in.status.by.email");

exports.SignedInStatus = async(req,res) => {
    const { email,reference_number } = req.body;
    const errors = validationResult(req);
    if(errors.isEmpty()){
        try{
            const email_found = await findUserCountByEmail(email);
            if(email_found > 0){
                const reference_number_found = await findUserCountByReferenceNumber(reference_number);
                if(reference_number_found > 0){
                    const signed_in_status = getUserSignedInStatusCountByEmail(email);
                    if(signed_in_status === 1){
                        res.status(200).json({
                            success: true,
                            error: false,
                            message: "User is logged in."
                        }); 
                    }else{
                        res.status(400).json({
                            success: false,
                            error: true,
                            message: "User is not logged in."
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