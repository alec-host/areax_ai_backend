const { OAuth2Client } = require("google-auth-library");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = require("../constants/app_constants");

const client = new OAuth2Client(GOOGLE_CLIENT_ID);
  
module.exports.confirmGoogleToken = async(idToken) => {
    try{
        const verifiedToken = await client.verifyIdToken({idToken,audience:GOOGLE_CLIENT_ID});  
        const payload = verifiedToken.getPayload();
        return payload;
    }catch(error){
        console.error(error);
        return error;
    }
};