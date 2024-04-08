const { validationResult } = require("express-validator");

exports.DeauthorizeInstagramApp = async(req,res) => {
    console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT ',req.body);
    const errors = validationResult(req);
    if(errors.isEmpty()){
        res.status(200).json({
            success: true,
            error: false,
            message: 'Instagram app revoked.'
        });
    }else{
        res.status(422).json({errors: errors.array()});
    }
};