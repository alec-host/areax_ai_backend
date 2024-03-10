require('dotenv').config();

module.exports = {
    APP_SERVER_PORT: process.env.PORT || 3005,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_PASS: process.env.DATABASE_PASS,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    ADMIN_SDK_TYPE: process.env.ADMIN_SDK_TYPE,
    ADMIN_SDK_PROJECT_ID: process.env.ADMIN_SDK_PROJECT_ID,
    ADMIN_SDK_KEY_ID: process.env.ADMIN_SDK_KEY_ID,
    ADMIN_SDK_PRIVATE_KEY: process.env.ADMIN_SDK_PRIVATE_KEY,
    ADMIN_SDK_CLIENT_EMAIL: process.env.ADMIN_SDK_CLIENT_EMAIL,
    ADMIN_SDK_CLIENT_ID: process.env.ADMIN_SDK_CLIENT_ID,
    ADMIN_SDK_AUTH_URL: process.env.ADMIN_SDK_AUTH_URL,
    ADMIN_SDK_TOKEN_URI: process.env.ADMIN_SDK_TOKEN_URI,
    ADMIN_SDK_AUTH_PROVIDER_X509_CERT_URL: process.env.ADMIN_SDK_AUTH_PROVIDER_X509_CERT_URL,
    ADMIN_SDK_CLIENT_X509_CERT_URL: process.env.ADMIN_SDK_CLIENT_X509_CERT_URL,
    ADMIN_SDK_UNIVERSE_DOMAIN: process.env.ADMIN_SDK_UNIVERSE_DOMAIN,
    MAILER_USERNAME: process.env.MAILER_USERNAME,
    MAILER_PASSWORD: process.env.MAILER_PASSWORD
};