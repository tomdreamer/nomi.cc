const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDYNARY_NAME,
  api_key: process.env.CLOUDYNARY_KEY,
  api_secret: process.env.CLOUDYNARY_SECRET,
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: "user-pictures",

  //t upload things that are not images
  // params: {
  //   resource_type: "raw",
  // }
});

// this is  a Multer file upload object that should connect to a route
const fileUploader = multer({storage});

module.exports = fileUploader;
