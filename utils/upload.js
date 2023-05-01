import cloudinary from 'cloudinary'

const clv2 = cloudinary.v2


// Configuration 
clv2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


// Upload

const upload = (file, public_id) => {
    const res = clv2.uploader.upload(file, {public_id: public_id})
    res.then((data) => {
        console.log(data);
        console.log(data.secure_url);
        return data.secure_url
      }).catch((err) => {
        console.log(err);
      });
}

export default upload



