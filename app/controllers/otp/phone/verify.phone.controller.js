const { parsePhoneNumber } = require('libphonenumber-js');
const { formatPhone } = require('../../../utils/format.phone');
const { findUserCountByEmail } = require("../../user/find.user.count.by.email");
const { findUserCountByReferenceNumber } = require("../../user/find.user.count.by.reference.no");
const { modifyUserByEmail } = require("../../user/modify.user.by.email");

exports.VerifyPhone = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const { phone,email,reference_number } = req.body;
        try{
            const email_found = await findUserCountByEmail(email)
            if(typeof phone !== "undefined"){
                const formattedPhone = formatPhone(phone);
                const phoneNumber = parsePhoneNumber(formattedPhone);
                if(phoneNumber.isValid()){
                    if(email_found > 0){
                        const reference_number_found = await findUserCountByReferenceNumber(reference_number);
                        if(reference_number_found > 0){
                            await modifyUserByEmail(email,{phone:phone,phone_verified:1});
                            res.status(200).json({
                                success: true,
                                error: false,
                                data: [],
                                message: 'Phone has been verified.'
                            });
                        }else{
                            res.status(404).json({
                                success: false,
                                error: true,
                                message: 'Reference no not found.'
                            });               
                        }
                    }else{
                        res.status(404).json({
                            success: false,
                            error: true,
                            message: 'Email not found.'
                        });                 
                    }
                }else{
                    res.status(400).json({
                        success: false,
                        error: true,
                        message: 'Invalid phone.'
                    });  
                }
            }else{
                res.status(400).json({
                    success: false,
                    error: true,
                    message: 'Missing: phone has to be provided.'
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