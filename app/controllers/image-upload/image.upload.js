const path = require('path');
const sizeOf = require('image-size');
const { validationResult } = require("express-validator");
const { uploadImageToCustomStorage } = require('../../services/CUSTOM-STORAGE');
const { findUserCountByEmail } = require("../user/find.user.count.by.email");
const { findUserCountByReferenceNumber } = require("../user/find.user.count.by.reference.no");

module.exports.UploadImage = async(req, res) => {
    const { reference_number, email } = req.body;
    const errors = validationResult(req); 
    if(errors.isEmpty()){
        try{
            const email_found = await findUserCountByEmail(email);
            if(email_found > 0){  
                let reference_number_found;
                if(reference_number !== '1'){
                    reference_number_found = await findUserCountByReferenceNumber(reference_number);
                }else{
                    reference_number_found = 1;
                }
                if(reference_number_found > 0){
                    if(!req.file){
                        return res.status(400).json({ success: false, error: true, message: 'Missing file.' });
                    }
        
                    const imagePath = req.file.path;
                    //-.check image dimensions.
                    const dimensions = sizeOf(imagePath);
                    const aspectRatio = dimensions.width / dimensions.height;
                    if(aspectRatio !== 0.8 && aspectRatio !== 1.91) {
                        res.status(400).json({ success: false, error: true, message: 'Invalid image dimensions. The aspect ratio must be 4:5 or 1:91.' });
                        return;
                    }
        
                    const ext = path.extname(req.file.originalname);
                    if(ext !== '.jpg') {
                        res.status(400).json({ success: false, error: true, message: 'Invalid image format. Only .jpg images are accepted.'});
                        return;
                    }
                    const file = req.file;
                    const imageUrl = await uploadImageToCustomStorage(file.filename);
                    if(imageUrl){
                        try{
                            if(imageUrl){
                                res.status(200).json({
                                    success: true, 
                                    error: false, 
                                    image_url: imageUrl,
                                    message: 'Image uploaded successfully.'
                                });
                            }else{
                                res.status(400).json({
                                    success: true, 
                                    error: false,
                                    message: "Something wrong has just happened."
                                });
                            }
                        }catch(error){
                            res.status(500).json({
                                success: true, 
                                error: false,
                                message: error.message
                            });
                        }          
                    }else{
                        res.status(400).json({
                            success: false,
                            error: true,
                            message: "Something wrong has happened."
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
        }catch(error){
            console.error('Upload error:', error);
            res.status(500).json({ success: false, error: true,message:'An error occurred during the upload process.' });
        }
    }else{
        res.status(422).json({errors: errors.array()});
    }
};