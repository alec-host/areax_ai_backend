const { db2 } = require("../../models");

const Instagrams = db2.instagrams;

module.exports.insertOrUpdateUserInstagramActivityLog = async(inputInstagramProfile,reference_number) => {
    try{
        await Instagrams.upsert({
            _profile_data: JSON.stringify(inputInstagramProfile),
            reference_number: reference_number,
            created_at: new Date(),
        });    
        console.log('Instagram profile data inserted or updated successfully.');
    }catch(err){
        console.error('Error: failed to insert or update. ',err);
    }
};

module.exports.findUserInstagramActivityLogCountByReferenceNumber = async(reference_number) => {
    const count = await Instagrams.count({where:{reference_number:reference_number}});
    return count;  
};