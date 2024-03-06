const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_REFRESH_SECRET } = require("../constants/app_constants");

module.exports.accessToken = (params) => {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60,
      /*expiresIn: '15m',*/
      data: params,
    },
    JWT_SECRET
  );
};

module.exports.refreshToken = (params) => {
  return jwt.sign(
    {
      data: params,
    },
    JWT_REFRESH_SECRET
  );
};

module.exports.jwtVerifyToken = (token) => {
  try {
    const data = jwt.verify(token,JWT_SECRET);
    return [true, 'Login Success', data];
  } catch (error) {
    let err;
    switch (error.name) {
      case 'TokenExpiredError':
        err = 'Token Expired';
        break;
      default:
        err = error.name;
    }
    return [false, err];
  }
};