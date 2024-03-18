//const { param } = require("express-validator");

const auth = require("../middleware/auth");

/*
const uploadFile = require('../middleware/upload');
*/

const signUpController = require("../controllers/signup/signup.contoller");
const googleAuthController = require("../controllers/google-signin/google.auth.controller");
const signInController = require("../controllers/signin/user.signin");
const signOutController = require("../controllers/signout/user.signout");
const healthCheckController = require("../health/health.check");
const confirmEmailController = require("../controllers/otp/email/confirm.email.controller");
const addPhoneController = require("../controllers/otp/phone/add.phone.controller");
const confirmPhoneController = require("../controllers/otp/phone/confirm.phone.controller");
const verifyPhoneController = require("../controllers/otp/phone/verify.phone.controller");
const modifyUserProfileController = require("../controllers/profile/update.user.profile");
const getProfileController = require('../controllers/profile/get.user.profile');
const requestEmailOtpController = require('../controllers/otp/email/request.mail.otp');

//const confirmOtpController = require("../controllers/");

const error = require("./error/error.routes");
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
    router.post('/signUp',signUpController.UserSignUp);
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
     *           description: Authentication successful.            
     */
    router.post('/googleSignIn',googleAuthController.GoogleUserSignIn);
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
    router.post('/signIn',signInController.SignIn);
    /**
     * @swagger
     * paths:
     *   /api/v1/signOut:
     *     post:
     *       summary: Sign out operation
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
    router.post('/signOut',signOutController.SignOut);
    /**
     * @swagger
     * paths:
     *   /api/v1/ping:
     *     post:
     *       summary: Check health status of the service.
     *       security:
     *         - BearerAuth: [] 
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 word:
     *                   type: string
     *               required:
     *                 - word
     *       responses:
     *         200:
     *           description: OTP has been sent to the provided email.            
     */
    router.post('/ping',auth,healthCheckController.HealthCheck);
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
    router.post('/confirmEmail',auth,confirmEmailController.ConfirmEmail);
    router.post('/addPhone',auth,addPhoneController.AddPhone);
    router.post('/confirmPhone',confirmPhoneController.ConfirmPhone);
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
    router.post('/verifyPhone',auth,verifyPhoneController.VerifyPhone);
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
     *           description: OTP has been sent to the provided email.            
     */
    router.patch('/updateProfile',modifyUserProfileController.UpdateProfile);
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
     *           description: Unique user reference number.
     *           required: true
     *           example: AX_12345667777339392-FRTE000=
     *       responses:
     *         200:
     *           description: User profile.            
     */
    router.get('/getProfile',auth,getProfileController.GetProfile);
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
    router.post('/requestEmailOtp',auth,requestEmailOtpController.RequestEmailOtp);

    /*
    router.patch('/update',uploadFile.fields([{name:'id_file'},{name:'sample_file'}]),testFileUploadController.TestHandleUploads);
    */

    app.use("/api/v1",router);
    app.use(error.errorHandler);
};