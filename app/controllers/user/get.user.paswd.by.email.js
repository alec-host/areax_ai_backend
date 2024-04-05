const { db } = require("../../models");

const Users = db.users;

module.exports.getUserPasswordByEmail = (email) => {
    return new Promise((resolve, reject) => {
        Users.findOne({attributes: ['password'], where:{email:email}}).then((data) => {
            console.log('data:  ',data.password);
            resolve(data.password);
        }).catch(e => { 
            console.error(e);
            resolve([]);
        });
    });
};