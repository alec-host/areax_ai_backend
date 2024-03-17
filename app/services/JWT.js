const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_REFRESH_SECRET } = require("../constants/app_constants");

module.exports.accessToken = (data) => {
  const token = jwt.sign(data,JWT_SECRET,{expiresIn: '1h'});

  return token;
};

module.exports.refreshToken = (data) => {
  const refreshToken = jwt.sign(data,JWT_REFRESH_SECRET);

  return refreshToken;
};

module.exports.jwtVerifyToken = (token) => {
  try {
    const decoded = jwt.verify(token,JWT_SECRET);
    return [true, decoded];
  } catch (error) {
    let err;
    switch (error.name) {
      case 'TokenExpiredError': err = 'Token Expired'; break;
      default: err = error.name; break;
    }
    return [false, err];
  }
  
};