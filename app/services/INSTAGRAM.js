const axios = require("axios");
const querystring = require("querystring");
const { INSTAGRAM_CLIENT_ID, INSTAGRAM_REDIRECT_URI, INSTAGRAM_CLIENT_SECRET, INSTAGRAM_REVOKE_REDIRECT_URI, INSTAGRAM_MEDIA_REDIRECT_URI } = require("../constants/app_constants");

module.exports.instagramOauthEndpoint = async(operation_type) => {
    try{
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
    try{
        const response = await axios.get(`https://graph.instagram.com/me`, {
            params: {
                fields: 'id,username,account_type,media_count,followers_count',
                access_token: accessToken
            }
        });
        const userProfile = response.data;
        return [true,userProfile];
    }catch (error){
        console.error('Error fetching Instagram user profile:', error.message);
        return [false,error.message];
    }
};

module.exports.getLongLivedAccessToken = async(shortLivedToken) => {
    try {
      const response = await axios.get('https://graph.instagram.com/access_token', {
        params: {
            grant_type: 'ig_exchange_token',
            client_secret: INSTAGRAM_CLIENT_SECRET,
            access_token: shortLivedToken
        }
      });
  
      const longLivedToken = response.data.access_token;
      
      console.log('Long-lived Access Token:', longLivedToken);
      return longLivedToken;
    } catch (error) {
      console.error('Error exchanging for long-lived access token:', error.response.data);
      return null;
    }
};

module.exports.refreshLongLivedAccessToken = async(longLivedToken) => {
    try {
        const response = await axios.get('https://graph.instagram.com/refresh_access_token', {
            params: {
                grant_type: 'ig_refresh_token',
                access_token: longLivedToken
            }
        });

        const newLongLivedToken = response.data.access_token;
        console.log('Refreshed Long-lived Access Token:', newLongLivedToken);
        return newLongLivedToken;
    }catch (error){
        console.error('Error refreshing long-lived access token:', error.response.data);
        return null;
    }
};

module.exports.revokeInstagramAccess = async(userInstagramID,accessToken) => {
    const url = `https://graph.instagram.com/${userInstagramID}/permissions`;
    try{
        const response = await axios.delete(url,{params:{access_token: accessToken}});
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