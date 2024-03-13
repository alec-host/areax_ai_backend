const db = require("../../models");

const Users = db.users;

module.exports.getUserProfileByEmail = async(email,callBack) => {
    await Users.findAll({attributes: ['reference_number','username','email','phone','display_name','profile_picture_url','country','city'], 
    where:{email:email}}).then((data) => {
        callBack(data);
    }).catch(e => { 
        console.error(e);
        callBack([]);
    });
};