const auth = require("../middleware/auth");

//const uploadFile = require('../middleware/upload');

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
const getProfileController = require('../controllers/profile/get.user.profile');
const requestEmailOtpController = require('../controllers/otp/email/request.mail.otp');
const instagramAuthController = require('../controllers/instagram/instagram.authorize.controller');
const instagramAuthCallbackController = require('../controllers/instagram/instagram.profile.controller');
const instagramRevokeCallbackController = require('../controllers/instagram/instagram.revoke.controller');
const instagramMediaCallbackController = require('../controllers/instagram/instagram.media.controller');
const instagramDeauthorizeController = require('../controllers/instagram/instagram.deauthorize.controller');
const instagramDeleteAppController = require('../controllers/instagram/instagram.delete.controller');

const error = require("./error/error.routes");
const { healthCheckValidator, signInValidator, signOutValidator, googleSignInValidator, addPhoneValidator, verifyPhoneValidator, confirmEmailValidator, updateProfileValidator, getProfileValidator, requestEmailOtpValidator, signUpValidator, instagramAuthValidator, instagramAuthCallbackValidator } = require("../validation/common.validation");
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

    /*
    router.patch('/update',uploadFile.fields([{name:'id_file'},{name:'sample_file'}]),testFileUploadController.TestHandleUploads);
    */

    app.use("/api/v1",router);
    app.use(error.errorHandler);
};