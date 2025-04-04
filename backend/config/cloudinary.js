import { v2 as cloudinary } from "cloudinary";


const connectCloudainry = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log("Cloudinary Connection Successful.");
  } catch (error) {
    console.log(`Cloudinary Connection Failed. => ${error.message}`);

  }
};

export default connectCloudainry;