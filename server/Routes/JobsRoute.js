const express = require('express')
const router = express.Router()
const { getJobs, addJob, updateJob, deleteJob, getJob, getCompanyJobs } = require('../controllers/JobsController')
const auth = require('../middlewares/Auth')


// Get all the Jobs from the database
router.get('/', getJobs)
// Get all the company Jobs from the database
router.get('/jobscmp',auth, getCompanyJobs)
// Add A new Job
router.post('/create', auth, addJob)
// Update A Job
router.put('/:id', auth, updateJob)
// Delete A Job
router.delete('/:id', auth, deleteJob)
// Get One Job from the database
router.get('/:id', getJob)

module.exports = router