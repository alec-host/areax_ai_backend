const dns = require('dns');
const validator = require('validator');

module.exports.validateEmail = (email) => {
  return new Promise((resolve, reject) => {
    if(!validator.isEmail(email)) {
      return resolve(false); // Not even a valid format
    }
    const domain = email.split('@')[1];
    dns.resolveMx(domain, (err, addresses) => {
      if(err) {
        console.error(err);
        return resolve(false); // DNS error or no MX records found
      }
      if(addresses && addresses.length > 0) {
        resolve(true); // MX record exists, so the domain can receive emails
      } else {
        resolve(false); // No MX records found
      }
    });
  });
}

// Example usage
/*
const email = "test@example.com";
validateEmailAdvanced(email).then(isValid => {
  if (isValid) {
    console.log("The email address is valid and the domain can receive emails.");
  } else {
    console.log("The email address is invalid or the domain cannot receive emails.");
  }
});
*/