const db = require("../../models");

const OTPs = db.otps;

module.exports.confirmMailOtp = async(confirmOtp,email) => {
    const otp = await OTPs.findOne({where:{message:confirmOtp,email:email}}).catch(e => { return false; });
    if(!otp) {
        return false;
    }
    return true;
};