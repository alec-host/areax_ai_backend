const nomailer = require("nodemailer");

const { MAILER_USERNAME, MAILER_PASSWORD } = require("../constants/app_constants");
const { nomailerBody } = require("../mail-template/nomailer.body");

module.exports.sendEmailOtp = async(toEmail,code) => {
    let transporter = nomailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: MAILER_USERNAME,
            pass: MAILER_PASSWORD
        }  
    });

    try{
        await transporter.sendMail(nomailerBody(toEmail,code));

        return [true,'OTP has been sent to the provided email',code];
    }catch(e){
        console.error(e);
        return [false,'Unable to send email at the moment'];
    }
};