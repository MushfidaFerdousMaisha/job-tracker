const express = require('express');
const router = express.Router();
const { createJob, getJobs, getJobById, deleteJob } = require('../controllers/jobController');
const { protect, companyOnly } = require('../middleware/authMiddleware');

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', protect, companyOnly, createJob);
router.delete('/:id', protect, companyOnly, deleteJob);

module.exports = router;