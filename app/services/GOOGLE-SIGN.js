const { OAuth2Client } = require("google-auth-library");
const { GOOGLE_CLIENT_ID } = require("../constants/app_constants");

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

module.exports.confirmGoogleToken = async(idToken) => {
    try{
        const verifiedToken = await client.verifyIdToken({idToken,audience:GOOGLE_CLIENT_ID});  
        const payload = verifiedToken.getPayload();
        return payload;
    }catch(error){
        console.log(error);
        return error;
    }
};