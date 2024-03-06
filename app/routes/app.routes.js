//const { param } = require("express-validator");

const auth = require("../middleware/auth");

/*
const uploadFile = require('../middleware/upload');
*/

const ssoSignUpController = require("../controllers/user/user.sso.signup.controller");
const ssoSignInController = require("../controllers/user/user.sso.signin.controller");
const changePasswordController = require("../controllers/user/modify.user.controller");
const addPetController = require("../controllers/pet/add.new.pet.controller");


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

    /*
    router.post('/signUp',signUpController.CreateNewUser);
    router.post('/signIn',signInController.UserLogin);
    router.patch('/changePassword',changePasswordController.UpdateUserDetails);
    router.post('/pet',addPetController.AddNewPet);
    router.get('/getPet',getPetByOwnerReferenceNoController.GetPetByOwnerReferenceNo);
    router.get('/getInbox',getInboxByOwnerReferenceNoController.GetInboxByOwnerReferenceNo);
    router.get('/getWalletTransaction',getTransactionByOwnerReferenceNoController.GetTransactionByOwnerReferenceNo);
    router.patch('/deleteAccount',userAccountDeactivationController.UpdateUserDetails);
    router.patch('/updateProfile',modifyUserProfileInfoController.UpdateUserDetails);
    router.get('/getStats',getUserDashboardStatsController.GetUserDashboardStats);
    */

    /*
    router.patch('/updateUserDetailsFile',uploadFile.fields([{name:'id_file'},{name:'business_cert_file'}]),updateUserBusinesssDetailsController.UpdateUserBusinessDetails);
    */
    app.use("/api/v1",router);
    app.use(error.errorHandler);
};