const auth = require("../middleware/auth");

const uploadFile = require('../middleware/upload.storage');

const signUpController = require("../controllers/signup/signup.contoller");
const googleAuthController = require("../controllers/google-signin/google.auth.controller");
const signInController = require("../controllers/signin/user.signin");
const signOutController = require("../controllers/signout/user.signout");
const signedInStatusController = require("../controllers/signin/user.signed.in.status");
const healthCheckController = require("../health/health.check");
const confirmEmailController = require("../controllers/otp/email/confirm.email.controller");
const addPhoneController = require("../controllers/otp/phone/add.phone.controller");
const verifyPhoneController = require("../controllers/otp/phone/verify.phone.controller");
const modifyUserProfileController = require("../controllers/profile/update.user.profile");
const modifyUserTokenIdController = require("../controllers/profile/update.user.token.id");
const getProfileController = require('../controllers/profile/get.user.profile');
const getTokenIdController = require('../controllers/profile/get.user.token.id'); 
const requestEmailOtpController = require('../controllers/otp/email/request.mail.otp');
const refreshTokenController = require('../controllers/google-signin/google.refresh.token.controller');
const uploadImageController = require('../controllers/image-upload/image.upload');
const uploadFileToBucketController = require('../controllers/s3-bucket/upload.file.bucket');
const createBlockchainWalletController = require('../controllers/blockchain-wallet/create.blockchain.wallet.controller');
const instagramBasicInfoController = require('../controllers/instagram/instagram.basic.info.controller');
const instagramAuthController = require('../controllers/instagram/instagram.authorize.controller');
const instagramAuthCallbackController = require('../controllers/instagram/instagram.profile.controller');
const instagramRevokeCallbackController = require('../controllers/instagram/instagram.revoke.controller');
const instagramMediaCallbackController = require('../controllers/instagram/instagram.media.controller');
const instagramDeauthorizeController = require('../controllers/instagram/instagram.deauthorize.controller');
const instagramDeleteAppController = require('../controllers/instagram/instagram.delete.controller');

const error = require("./error/error.routes");
const { healthCheckValidator, signInValidator, signOutValidator, googleSignInValidator, addPhoneValidator, verifyPhoneValidator, confirmEmailValidator, updateProfileValidator, getProfileValidator, requestEmailOtpValidator, signUpValidator, instagramAuthValidator, instagramAuthCallbackValidator, tokenIdValidator, s3BucketValidator, blockchainWalletValidator } = require("../validation/common.validation");

/**
 *  
 * Add auth in the routes below.
 * 
 * Execute JWT method on login & for security sake save token generated in a session rather than on the localStorage.
 * 
 * auth is passed as shown below in a route:
 * 
 * route.post('/myRoute',auth,myRouteController.ExampleMethod);
 * 
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
*/
module.exports = async(app) => {

    const router = require("express").Router();

    /**
     * @swagger
     * paths:
     *   /api/v1/signUp:
     *     post:
     *       summary: Sign out operation - (manual)
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 username:
     *                   type: string
     *                 email:
     *                   type: string
     *                 password:
     *                    type: string
     *               required:
     *                 - username
     *                 - email
     *                 - password
     *       responses:
     *         201:
     *           description: User account has been created.            
    */
    router.post('/signUp',signUpValidator,signUpController.UserSignUp);
    /**
     * @swagger
     * paths:
     *   /api/v1/googleSignIn:
     *     post:
     *       summary: Google sign in operation
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 idToken:
     *                   type: string
     *               required:
     *                 - idToken
     *       responses:
     *         200:
     *           description: Authentication successful, OTP has been sent to the provided email.            
    */
    router.post('/googleSignIn',googleSignInValidator,googleAuthController.GoogleUserSignIn);
    /**
     * @swagger
     * paths:
     *   /api/v1/signIn:
     *     post:
     *       summary: Sign in operation - (manual)
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   type: string
     *                 password: 
     *                   type: string
     *               required:
     *                 - email
     *                 - password
     *       responses:
     *         200:
     *           description: Login was successful.            
    */
    router.post('/signIn',signInValidator,signInController.SignIn);
    /**
     * @swagger
     * paths:
     *   /api/v1/signOut:
     *     post:
     *       summary: Sign in operation
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   type: string
     *               required:
     *                 - email
     *       responses:
     *         200:
     *           description: Sign in was successful.            
    */
    router.post('/signOut',signOutValidator,signOutController.SignOut);
    /**
     * @swagger
     * paths:
     *   /api/v1/signedInStatus:
     *     post:
     *       summary: Api to handled to Sign out
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   type: string
     *               required:
     *                 - email
     *       responses:
     *         200:
     *           description: Sign out was successful.            
    */
    router.post('/signedInStatus',auth,requestEmailOtpValidator,signedInStatusController.SignedInStatus);
    /**
     * @swagger
     * paths:
     *   /api/v1/ping:
     *     post:
     *       summary: Check user logged in status.
     *       security:
     *         - BearerAuth: [] 
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   type: string
     *                 reference_number: string
     *               required:
     *                 - email
     *                 - reference_number
     *       responses:
     *         200:
     *           description: Logged in status.            
    */
    router.post('/ping',auth,healthCheckValidator,healthCheckController.HealthCheck);
    /**
     * @swagger
     * paths:
     *   /api/v1/confirmEmail:
     *     post:
     *       summary: Confirm email operation
     *       security:
     *         - BearerAuth: []
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   type: string
     *                 reference_number:
     *                   type: string
     *                 otp:
     *                   type: string
     *               required:
     *                 - email
     *                 - reference_number
     *                 - otp
     *       responses:
     *         200:
     *           description: OTP confirmed.            
    */
    router.post('/confirmEmail',auth,confirmEmailValidator,confirmEmailController.ConfirmEmail);

    router.post('/addPhone',auth,addPhoneValidator,addPhoneController.AddPhone);
    /**
     * @swagger
     * paths:
     *   /api/v1/verifyPhone:
     *     post:
     *       summary: Phone verification operation
     *       security:
     *         - BearerAuth: []
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 phone:
     *                   type: string
     *                 email:
     *                   type: string
     *                 reference_number:
     *                   type: string
     *               required:
     *                 - phone
     *                 - email
     *                 - reference_number
     *       responses:
     *         200:
     *           description: Phone has been verified.            
    */
    router.post('/verifyPhone',auth,verifyPhoneValidator,verifyPhoneController.VerifyPhone);
    /**
     * @swagger
     * paths:
     *   /api/v1/updateProfile:
     *     patch:
     *       summary: Update user profile with extra information.
     *       security:
     *         - BearerAuth: []
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   type: string
     *                 phone:
     *                   type: string
     *                 country:
     *                   type: string
     *                 city:
     *                   type: string
     *                 reference_number:
     *                   type: string
     *               required:
     *                 - email
     *                 - phone
     *                 - country
     *                 - city
     *                 - reference_number
     *       responses:
     *         200:
     *           description: User profile has been updated.            
    */
    router.patch('/updateProfile',auth,updateProfileValidator,modifyUserProfileController.UpdateProfile);
        /**
     * @swagger
     * paths:
     *   /api/v1/updateTokenId:
     *     patch:
     *       summary: Update token id.
     *       security:
     *         - BearerAuth: []
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   type: string
     *                 reference_number:
     *                   type: string
     *                 token_id:
     *                   type: string
     *               required:
     *                 - email
     *                 - reference_number
     *                 - token_id
     *       responses:
     *         200:
     *           description: Update token id against a user.
    */
    router.patch('/addTokenId',auth,tokenIdValidator,modifyUserTokenIdController.UpdateTokenId);
    /**
     * @swagger
     * paths:
     *   /api/v1/getProfile:
     *     get:
     *       summary: Get user profile information.
     *       security:
     *         - BearerAuth: []
     *       parameters:
     *         - in: query
     *           name: email
     *           schema:
     *             type: string
     *           description: Email of the user.
     *           required: true
     *           example: joedoe@myemail.com
     *         - in: query
     *           name: reference_number
     *           schema:
     *             type: string
     *           description: reference number.
     *           required: true
     *           example: AX_12345667777339392-FRTE000=
     *       responses:
     *         200:
     *           description: User profile.            
    */
    router.get('/getProfile',getProfileValidator,auth,getProfileController.GetProfile);
     /**
     * @swagger
     * paths:
     *   /api/v1/getTokenId:
     *     get:
     *       summary: Get token Id.
     *       security:
     *         - BearerAuth: []
     *       parameters:
     *         - in: query
     *           name: email
     *           schema:
     *             type: string
     *           description: Email of the user.
     *           required: true
     *           example: joedoe@myemail.com
     *         - in: query
     *           name: reference_number
     *           schema:
     *             type: string
     *           description: reference number.
     *           required: true
     *           example: AX_12345667777339392-FRTE000=
     *       responses:
     *         200:
     *           description: User profile.            
    */   
    router.get('/getTokenId',getProfileValidator,auth,getTokenIdController.GetUserTokenID);
    /**
     * @swagger
     * paths:
     *   /api/v1/requestEmailOtp:
     *     post:
     *       summary: Initiate an OTP request via email
     *       security:
     *         - BearerAuth: []
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   type: string
     *                 reference_number:
     *                   type: string
     *               required:
     *                 - email
     *                 - reference_number
     *       responses:
     *         200:
     *           description: OTP has been sent to the provided email.            
    */
    router.post('/requestEmailOtp',auth,requestEmailOtpValidator,requestEmailOtpController.RequestEmailOtp);
    /**
     * @swagger
     * paths:
     *   /api/v1/getInstagramBasicUserInfo:
     *     post:
     *       summary: Get basic user Instagram info.
     *       security:
     *         - BearerAuth: []
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   type: string
     *                 reference_number:
     *                   type: string
     *               required:
     *                 - email
     *                 - reference_number
     *       responses:
     *         200:
     *           description: Information to be presented by the api include username, account_type, & media_count.            
    */  
    router.get('/getInstagramBasicInfo',getProfileValidator,instagramBasicInfoController.GetInstagramBasicInfo);
    /**
     * @swagger
     * paths:
     *   /api/v1/uploadImage:
     *     post:
     *       summary: Upload an image
     *       security:
     *         - BearerAuth: []
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   type: string
     *                 reference_number:
     *                   type: string
     *               required:
     *                 - email
     *                 - reference_number
     *       responses:
     *         200:
     *           description: Upload an image and return the Image URL.            
    */
    router.post('/uploadImage',uploadFile.single('image'),uploadImageController.UploadImage);
    /**
     * @swagger
     * paths:
     *   /api/v1/uploadToBucket:
     *     post:
     *       summary: Upload file to Amazon Bucket
     *       security:
     *         - BearerAuth: []
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 filename:
     *                   type: string
     *                 filetype:
     *                   type: string
     *               required:
     *                 - filename
     *                 - filetype
     *       responses:
     *         200:
     *           description: Upload a file to Amazon s3 Bucket & return a URL.            
    */
    router.post('/uploadToBucket',uploadFile.single('file'),s3BucketValidator,uploadFileToBucketController.UploadFileToBucket);
    /**
     * @swagger
     * paths:
     *   /api/v1/createBlockchainWallet:
     *     post:
     *       summary: create blockchain wallet.
     *       security:
     *         - BearerAuth: []
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   type: string
     *                 reference_number:
     *                   type: string
     *                 wallet_address:
     *                   type: string
     *                 primary_key:
     *                   type: string
     *               required:
     *                 - email
     *                 - reference_number
     *                 - wallet_address
     *                 - primary_key
     *       responses:
     *         200:
     *           description: create blockchain wallet account.            
    */
    router.post('/createBlockchainWallet',auth,blockchainWalletValidator,createBlockchainWalletController.CreateBlockChainWallet);    
    /**
     * @swagger
     * paths:
     *   /api/v1/refreshToken:
     *     post:
     *       summary: Generate new token.
     *       responses:
     *         200:
     *           description: Get a new access token.            
    */
    router.post('/refreshToken',requestEmailOtpValidator,refreshTokenController.SignInRefreshToken);
    /**
     * @swagger
     * paths:
     *   /api/v1/auth/instagram:
     *     post:
     *       summary: Authorize Instagram user.
     *       security:
     *         - BearerAuth: []
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   type: string
     *                 reference_number:
     *                   type: string
     *               required:
     *                 - email
     *                 - reference_number
     *       responses:
     *         200:
     *           description: Access token granted.            
    */
    router.post('/auth/instagram',instagramAuthValidator,instagramAuthController.InstagramAuthorize);
    /**
     * @swagger
     * paths:
     *   /auth/instagram/callback:
     *     get:
     *       summary: Get Instagram profile information.
     *       security:
     *         - BearerAuth: []
     *       parameters:
     *         - in: query
     *           name: code
     *           schema:
     *             type: string
     *           description: access token.
     *           required: true
     *           example: 33skdkdkabokv=
     *       responses:
     *         200:
     *           description: Access granted.            
    */
    router.get('/auth/instagram/callback',instagramAuthCallbackController.GetInstagramProfile);
    /**
     * @swagger
     * paths:
     *   /api/v1/revoke/instagram:
     *     get:
     *       summary: Revoke AreaX App from accesss your Instagram a/c.
     *       security:
     *         - BearerAuth: []
     *       parameters:
     *         - in: query
     *           name: code
     *           schema:
     *             type: string
     *           description: access token.
     *           required: true
     *           example: 33skdkdkabokv=
     *       responses:
     *         200:
     *           description: Access revoked.            
    */
    router.get('/revoke/instagram/callback',instagramRevokeCallbackController.InstagramRevoke);
    /**
     * @swagger
     * paths:
     *   /api/v1/media/instagram:
     *     get:
     *       summary: Get media from Instagram a/c.
     *       security:
     *         - BearerAuth: []
     *       parameters:
     *         - in: query
     *           name: code
     *           schema:
     *             type: string
     *           description: access token.
     *           required: true
     *           example: 33skdkdkabokv=
     *       responses:
     *         200:
     *           description: Access revoked.            
    */
    router.get('/media/instagram/callback',instagramAuthCallbackValidator,instagramMediaCallbackController.GetInstagramMedia);
    /**
     * @swagger
     * paths:
     *   /api/v1/deauthorize/instagram:
     *     post:
     *       summary: Deauthorize Instagram app.
     *       responses:
     *         200:
     *           description: Deauthorize the Instagram app.            
    */
    router.post('/deauthorize/instagram',instagramDeauthorizeController.DeauthorizeInstagramApp);
    /**
     * @swagger
     * paths:
     *   /api/v1/delete/instagram:
     *     post:
     *       summary: Delete Instagram app.
     *       responses:
     *         200:
     *           description: Delete the Instagram app.            
    */
    router.post('/delete/instagram',instagramDeleteAppController.DeauthorizeInstagramApp);

    app.use("/api/v1",router);
    app.use(error.errorHandler);
};