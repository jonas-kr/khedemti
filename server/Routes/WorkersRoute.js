const express = require('express')
const { loginWorker, registerWorker, getWorkers, getWorkerId,applyForJob, getWorker, updateWorker, getApplies } = require('../controllers/WorkersController')
const auth = require('../middlewares/AuthW')
const router = express.Router()


/**************** GET ALL WORKERS ***************/
router.get('/', getWorkers)

/**************** REGISTER ROUTE ***************/
router.post('/register', registerWorker)

/**************** LOGIN ROUTE ***************/
router.post('/login', loginWorker)

/**************** GET ONE WORKER BY EMAIL ***************/
router.post('/one', getWorker)

/**************** UPDATE WORKER ***************/
router.put('/update', auth, updateWorker)

/**************** APPLY FOR JOB ***************/
router.post('/apply', auth, applyForJob)

/**************** GET ALL APPLIES ***************/
router.get('/appliesW', auth, getApplies)

/**************** GET ONE WORKER BY ID ***************/
router.get('/:id', getWorkerId)

module.exports = router
