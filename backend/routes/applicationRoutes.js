const express = require('express');
const router = express.Router();
const { applyForJob, getMyApplications, getJobApplicants, updateApplicationStatus } = require('../controllers/applicationController');
const { protect, companyOnly } = require('../middleware/authMiddleware');

router.post('/:jobId/apply', protect, applyForJob);
router.get('/my', protect, getMyApplications);
router.get('/:jobId/applicants', protect, companyOnly, getJobApplicants);
router.put('/:id/status', protect, companyOnly, updateApplicationStatus);

module.exports = router;