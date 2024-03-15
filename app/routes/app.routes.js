//const { param } = require("express-validator");

const auth = require("../middleware/auth");

/*
const uploadFile = require('../middleware/upload');
*/

const googleAuthController = require("../controllers/google-signin/google.auth.controller");
const signOutController = require("../controllers/signout/user.signout");
const validateEmailController = require("../controllers/otp/email/validate.email.controller");
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
 * TO DO .. 
 * - add auth in the routes below.
 * 
 * Execute JWT method on login & for security save the generated token in a session rather than a localStorage.
 * 
 * auth is passed as shown below in a route:
 * 
 * route.post('/createNewUser',auth,createController.MyNewValue);
 * 
 */
module.exports = async(app) => {

    const router = require("express").Router();

    router.post('/googleSignIn',googleAuthController.GoogleUserSignIn);
    router.post('/signOut',signOutController.SignOut);
    router.post('/validateEmail',validateEmailController.ValidateEmail);
    router.post('/confirmEmail',confirmEmailController.ConfirmEmail);
    router.post('/addPhone',addPhoneController.AddPhone);
    router.post('/confirmPhone',confirmPhoneController.ConfirmPhone);
    router.post('/verifyPhone',verifyPhoneController.VerifyPhone);
    router.patch('/updateProfile',modifyUserProfileController.UpdateProfile);
    router.get('/getProfile',getProfileController.GetProfile);
    router.post('/requestEmailOtp',requestEmailOtpController.RequestEmailOtp);

    /*
    router.patch('/update',uploadFile.fields([{name:'id_file'},{name:'sample_file'}]),testFileUploadController.TestHandleUploads);
    */
    app.use("/api/v1",router);
    app.use(error.errorHandler);
};