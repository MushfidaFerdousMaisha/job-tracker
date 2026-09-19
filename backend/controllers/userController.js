const User = require('../models/User')

// Get my profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update profile (bio, skills, github, phone, location)
const updateProfile = async (req, res) => {
  try {
    const { bio, skills, github, phone, location } = req.body

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        bio,
        github,
        phone,
        location,
        skills: skills ? skills.split(',').map(s => s.trim()) : []
      },
      { new: true }
    ).select('-password')

    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Upload profile photo
const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { photo: req.file.path },
      { new: true }
    ).select('-password')

    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Upload resume
const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { resume: req.file.path },
      { new: true }
    ).select('-password')

    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getProfile, updateProfile, uploadPhoto, uploadResume }