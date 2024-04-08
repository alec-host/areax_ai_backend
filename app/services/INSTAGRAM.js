const axios = require("axios");
const querystring = require("querystring");
const { INSTAGRAM_CLIENT_ID, INSTAGRAM_REDIRECT_URI, INSTAGRAM_CLIENT_SECRET, INSTAGRAM_REVOKE_REDIRECT_URI, INSTAGRAM_MEDIA_REDIRECT_URI } = require("../constants/app_constants");

module.exports.instagramOauthEndpoint = async(operation_type) => {
    try{
        //authorize|deauthorize
        const endpoint = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=${operation_type === "authorize" ? INSTAGRAM_REDIRECT_URI : operation_type === "deauthorize" ? INSTAGRAM_REVOKE_REDIRECT_URI : INSTAGRAM_MEDIA_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
        return [true,endpoint];
    }catch(error){
        console.error(error);
        return [false,error];
    }
};

module.exports.getInstagramToken = async(code,operation_type) => {
    const url = 'https://api.instagram.com/oauth/access_token';
    try{
        const tokenResponse = await axios.post(url,querystring.stringify({
            client_id: INSTAGRAM_CLIENT_ID,
            client_secret: INSTAGRAM_CLIENT_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: operation_type === "authorize" ? INSTAGRAM_REDIRECT_URI : operation_type === "deauthorize" ? INSTAGRAM_REVOKE_REDIRECT_URI : INSTAGRAM_MEDIA_REDIRECT_URI,
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

module.exports.revokeInstagramAccess = async(userInstagramID,accessToken) => {
    const url = `https://graph.instagram.com/${userInstagramID}/permissions?access_token=${accessToken}`;
    try{
        const response = await axios.delete(url);
        console.log('Access revoked:', response.data);
        return [true,response.data];
    }catch(error) {
        console.error('Error revoking access:', error.response.data);
        return [false,error.response.data];
    }
};

module.exports.instagramMedia = async(userInstagramID,accessToken) => {
    const url = `https://graph.instagram.com/${userInstagramID}/media?fields=id,caption,media_type,media_url,permalink&access_token=${accessToken}`;
    console.log(url);
    try{
        const mediaResponse = await axios.get(url);
        console.log('Media:', mediaResponse.data);
        return [true,mediaResponse.data];
    }catch(error) {
        console.error('Error:', error.response.data);
        return [false,error.response.data];
    }
};