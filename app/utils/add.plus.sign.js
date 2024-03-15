module.exports.addLeadPlusSign = async(inputPhone) => {
    if(inputPhone.length > 5){
        if(inputPhone[0] !== "+"){
            return "+"+inputPhone;
        }else{
            return inputPhone;
        }
    }else{
        return "+25400";
    }
};