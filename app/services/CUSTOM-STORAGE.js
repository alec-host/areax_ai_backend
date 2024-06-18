module.exports.uploadImageToCustomStorage = async(filename) => {
    const imageUrl = `https://api.weaiu.com/image-storage/${filename}`;
    return imageUrl;
};