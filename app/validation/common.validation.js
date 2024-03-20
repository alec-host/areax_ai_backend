const { body, query } = require("express-validator");

/*
export const loginValidator = [
    body('email', 'Invalid does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
];
  
export const createValidator = [
    body('user.username', 'username does not Empty').not().isEmpty(),
    body('user.email', 'Invalid email').isEmail(),
    body('user.age', 'username must be Alphanumeric').isAlphanumeric(),
    body('user.birthday', 'Invalid birthday').isISO8601(), // check date is ISOString
    body('user.password', 'password does not Empty').not().isEmpty(),
    body('user.password', 'The minimum password length is 6 characters').isLength({min: 6}),
];
*/

const signUpValidator = [
    body('username','Missing: name must be checked').not().isEmpty(),
    body('email','Missing: email must be checked').not().isEmpty(),
    body('email','Invalid email').isEmail(),
];

const googleSignInValidator = [
    body('idToken','Missing: idToken must be checked').not().isEmpty(),
];

const signInValidator = [
    body('email', 'Email cannot be Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
];

const signOutValidator = [
    body('email','Missing: email must be checked').not().isEmpty(),
    body('email','Invalid email').isEmail(),
];

const healthCheckValidator = [
    body('word','Word cannot be Empty').not().isEmpty(),
];

const confirmEmailValidator = [
    body('email', 'Email cannot be Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(), 
    body('reference_number', 'Reference number must be provided').not().isEmpty(),
    body('otp', 'The minimum OTP length is 6 characters').isLength({min:6}),
];

const addPhoneValidator = [
    body('phone', 'Phone must be provided').not().isEmpty(),
    //body('phone', 'Invalid mobile phone').isMobilePhone(),
    body('email', 'Email cannot be Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(), 
    body('reference_number', 'Reference number must be provided').not().isEmpty(),
];
  
const verifyPhoneValidator = [
    body('phone', 'Phone must be provided').not().isEmpty(),
    //body('phone', 'Invalid mobile phone').isMobilePhone(),
    body('email', 'Email cannot be Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(), 
    body('reference_number', 'Reference number must be provided').not().isEmpty(),
];

const updateProfileValidator = [
    body('email', 'Email cannot be Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(), 
    body('phone', 'Phone must be provided').not().isEmpty(),
    //body('phone', 'Invalid mobile phone').isMobilePhone(),
    body('country', 'Country must be provided').not().isEmpty(),
    body('city', 'City number must be provided').not().isEmpty(),
    body('reference_number', 'Reference number must be provided').not().isEmpty(),
];

const getProfileValidator = [
    query('email', 'Email cannot be Empty').not().isEmpty(),
    query('email', 'Invalid email').isEmail(), 
    query('reference_number', 'Reference number must be provided').not().isEmpty(),
];

const requestEmailOtpValidator  = [
    body('email', 'Email cannot be Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(), 
    body('reference_number', 'Reference number must be provided').not().isEmpty(),
];

module.exports = {
    signUpValidator,
    googleSignInValidator,
    signInValidator,
    signOutValidator,
    healthCheckValidator,
    confirmEmailValidator,
    addPhoneValidator,
    verifyPhoneValidator,
    updateProfileValidator,
    getProfileValidator,
    requestEmailOtpValidator
};
