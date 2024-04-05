const { db2 } = require("../../models");

const InstagramActivityLogs = db2.instagrams.activities;

module.exports.getLatestUserInstagramActivityLog = () => {
    return new Promise((resolve, reject) => {
        InstagramActivityLogs.findOne({attributes: ['reference_number'], order:[['created_at', 'DESC']], limit: 1}).then((data) => {
            resolve(data.reference_number);
        }).catch(e => { 
            console.error(e);
            resolve([]);
        });
    });
};