const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Storage for profile photos (images)
const photoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'job-tracker/photos',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 300, height: 300, crop: 'fill' }]
  }
})

// Storage for resumes (PDFs)
const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'job-tracker/resumes',
    allowed_formats: ['pdf'],
    resource_type: 'raw'
  }
})

const uploadPhoto = multer({ storage: photoStorage })
const uploadResume = multer({ storage: resumeStorage })

module.exports = { cloudinary, uploadPhoto, uploadResume }