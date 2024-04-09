const { db2 } = require("../../../models");

const Instagrams = db2.instagrams;

module.exports.findUserInstagramProfileCountByReferenceNumber = async(referenceNumber) => {
    const count = await Instagrams.count({where:{reference_number:referenceNumber}});
    return count;  
};