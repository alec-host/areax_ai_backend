const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const { addLeadPlusSign } = require('../../utils/add.plus.sign');
const { findUserCountByEmail } = require("../user/find.user.count.by.email");
const { findUserCountByReferenceNumber } = require("../user/find.user.count.by.reference.no");
const { getUserProfileByEmail } = require("../user/get.user.profile.by.email");
const { modifyUserByEmail } = require("../user/modify.user.by.email");

module.exports.UpdateProfile = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const { email,phone,country,city,reference_number } = req.body;
        try{
            const email_found = await findUserCountByEmail(email);
            if(email_found > 0){
                if(typeof reference_number !== "undefined"){
                    const reference_number_found = await findUserCountByReferenceNumber(reference_number);
                    if(reference_number_found > 0){
                        if(typeof phone !== "undefined"){
                            const formattedPhone = await addLeadPlusSign(phone);
                            const isPhoneValid = phoneUtil.isValidNumber(phoneUtil.parse(formattedPhone));
                            if(isPhoneValid){
                                if(typeof country !== "undefined" && typeof city !== "undefined"){
                                    if(country !== "" && city !== ""){
                                        await modifyUserByEmail(email,{phone,country,city});
                                        await getUserProfileByEmail(email,callBack => {
                                            res.status(200).json({
                                                success: true,
                                                error: false,
                                                data: callBack,
                                                message: "User profile has been updated"
                                            }); 
                                        });
                                    }else{
                                        res.status(400).json({
                                            success: false,
                                            error: true,
                                            message: "Missing: country/city must be provided."
                                        });  
                                    }
                                }else{
                                    res.status(400).json({
                                        success: false,
                                        error: true,
                                        message: "Missing: country/city must be provided."
                                    });                              
                                }
                            }else{
                                res.status(400).json({
                                    success: false,
                                    error: true,
                                    message: "Invalid phone."
                                });                       
                            }
                        }else{
                            res.status(500).json({
                                success: false,
                                error: true,
                                message: "Missing: phone must be provided."
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
                    res.status(400).json({
                        success: false,
                        error: true,
                        message: "Missing: reference number is not provided."
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
        res.status(400).json({
            success: false,
            error: true,
            message: "Missing: request payload not provided."
        }); 
    }
};