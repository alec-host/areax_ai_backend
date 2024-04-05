const axios = require("axios");
const querystring = require("querystring");
const { INSTAGRAM_CLIENT_ID, INSTAGRAM_REDIRECT_URI, INSTAGRAM_CLIENT_SECRET } = require("../constants/app_constants");

module.exports.instagramOauthEndpoint = async(reference_number) => {
    try{
        const endpoint = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=${INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code&reference_number=${reference_number}`;
        return [true,endpoint];
    }catch(error){
        console.error(error);
        return [false,error];
    }
};

module.exports.getInstagramToken = async(code) => {
    const url = 'https://api.instagram.com/oauth/access_token';
    try{
        const tokenResponse = await axios.post(url,querystring.stringify({
            client_id: INSTAGRAM_CLIENT_ID,
            client_secret: INSTAGRAM_CLIENT_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: INSTAGRAM_REDIRECT_URI,
            code,
        }));
        const accessToken = tokenResponse.data.access_token;
        return [true,accessToken];
    }catch(error){
        console.error(error);
        return [false,error];
    }
};

module.exports.instagramProfile = async(accessToken) => {
    const url = `https://graph.instagram.com/me?fields=id,username,account_type,media_count,media,name,profile_picture_url,biography,website,followers_count,follows_count&access_token=${accessToken}`;
    try{
        const profileResponse = await axios.get(url);
        return [true,profileResponse.data];
    }catch(error){
        console.error(error);
        return [false,error];
    }
};