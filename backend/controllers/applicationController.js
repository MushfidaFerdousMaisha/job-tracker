const Application = require('../models/Application')
const Job = require('../models/Job')

// Apply for a job
const applyForJob = async (req, res) => {
  try {
    const { coverLetter } = req.body

    if (!coverLetter || coverLetter.trim() === '') {
      return res.status(400).json({ message: 'Cover letter is required' })
    }

    const job = await Job.findById(req.params.jobId)
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    // Check if user has photo and resume
    const User = require('../models/User')
    const user = await User.findById(req.user.id)
    if (!user.resume) {
      return res.status(400).json({ message: 'Please upload your resume before applying' })
    }

    const alreadyApplied = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user.id
    })
    if (alreadyApplied) {
      return res.status(400).json({ message: 'Already applied for this job' })
    }

    const application = await Application.create({
      job: req.params.jobId,
      applicant: req.user.id,
      coverLetter: coverLetter.trim()
    })

    res.status(201).json(application)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get my applications (jobseeker)
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate('job', 'title description salary location')
    res.status(200).json(applications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get applicants for a job (company)
const getJobApplicants = async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email bio skills github photo resume')
    res.status(200).json(applications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update application status (company)
const updateApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
    if (!application) {
      return res.status(404).json({ message: 'Application not found' })
    }
    application.status = req.body.status
    await application.save()
    res.status(200).json(application)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { applyForJob, getMyApplications, getJobApplicants, updateApplicationStatus }