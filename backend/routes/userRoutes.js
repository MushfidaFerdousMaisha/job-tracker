const express = require('express')
const router = express.Router()
const { getProfile, updateProfile, uploadPhoto, uploadResume } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const { uploadPhoto: uploadPhotoMiddleware, uploadResume: uploadResumeMiddleware } = require('../config/cloudinary')

router.get('/profile', protect, getProfile)
router.put('/profile', protect, updateProfile)
router.post('/upload-photo', protect, uploadPhotoMiddleware.single('photo'), uploadPhoto)
router.post('/upload-resume', protect, uploadResumeMiddleware.single('resume'), uploadResume)

module.exports = router