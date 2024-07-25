const { body, query, check, param } = require("express-validator");

/*
export const sampleValidator = [
    body('user.username', 'username does not Empty').not().isEmpty(),
    body('user.email', 'Invalid email').isEmail(),
    body('user.age', 'username must be Alphanumeric').isAlphanumeric(),
    body('user.birthday', 'Invalid birthday').isISO8601(), // check date is ISOString
    body('user.password', 'password does not Empty').not().isEmpty(),
    body('user.password', 'The minimum password length is 6 characters').isLength({min: 6}),
];
*/

const signUpValidator = [
    body('username', 'Missing: name must be checked').not().isEmpty(),
    body('email', 'Missing: email must be checked').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
];

const googleSignInValidator = [
    body('idToken', 'Missing: idToken must be checked').not().isEmpty(),
];

const signInValidator = [
    body('email', 'Email cannot be Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
];

const signOutValidator = [
    body('email', 'Missing: email must be checked').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
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

const instagramAuthValidator = [
    body('email', 'Email cannot be Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('reference_number', 'Reference number must be provided').not().isEmpty(),
    body('operation_type', 'Operation type must be provided').not().isEmpty(),
];

const instagramAuthCallbackValidator = [
    query('code', 'Code must be provided').not().isEmpty(),
];

const huggingFaceChatValidator = [
    body('user_message', 'Message cannot be Empty').not().isEmpty(),
    body('email', 'Email cannot be Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('reference_number', 'Reference number must be provided').not().isEmpty(),
];

const formDataValidator = [
    check('email', 'Email cannot be Empty').not().isEmpty(),
    check('email', 'Invalid email').isEmail(), 
    check('reference_number', 'Reference number must be provided').not().isEmpty(),
];

const tokenIdValidator = [
    check('email', 'Email cannot be Empty').not().isEmpty(),
    check('email', 'Invalid email').isEmail(), 
    check('reference_number', 'Reference number must be provided').not().isEmpty(),
    check('token_id', 'Token id must be provided').not().isEmpty(),
];

const blockchainWalletValidator = [
    body('email', 'Email cannot be Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(), 
    body('reference_number', 'Reference number must be provided').not().isEmpty(),
    body('wallet_address', 'Wallet address must be provided').not().isEmpty(),
    body('private_key', 'Private key must be provided').not().isEmpty(),
];

const s3BucketValidator = [
    check('file_name', 'File Name cannot be Empty').not().isEmpty(),
    check('file_type', 'File Type cannot be Empty').not().isEmpty(),
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
    requestEmailOtpValidator,
    instagramAuthValidator,
    instagramAuthCallbackValidator,
    huggingFaceChatValidator,
    formDataValidator,
    tokenIdValidator,
    s3BucketValidator,
    blockchainWalletValidator
};