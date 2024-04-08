const { validationResult } = require("express-validator");

exports.DeauthorizeInstagramApp = async(req,res) => {
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX ',req.body);
    const errors = validationResult(req);
    if(errors.isEmpty()){
        res.status(200).json({
            success: true,
            error: false,
            message: 'Instagram app deleted.'
        });
    }else{
        res.status(422).json({errors: errors.array()});
    }
};