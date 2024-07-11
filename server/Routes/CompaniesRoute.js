const express = require('express')
const router = express.Router()
const { registerCompany, loginCompany, updateApply,getCompanies, getCompany, getCompanyId, updateCompany, getApplies } = require('../controllers/CompaniesController')
const auth  = require('../middlewares/Auth')

/**************** REGISTER ROUTE ***************/
router.post('/register', registerCompany)

/**************** LOGIN ROUTE ***************/
router.post('/login', loginCompany)

/**************** UPDATE COMPANY ***************/
router.put('/update', auth, updateCompany)

/**************** GET ALL THE COMPANIES ***************/
router.get('/', getCompanies)

/**************** GET ONE COMPANY BY EMAIL ***************/
router.post('/one', getCompany)

/**************** UPDATE THE APPLY (ACCEPT OFFER) ***************/
router.put('/apply',auth , updateApply)

/**************** GET COMPANY OFFERS ***************/
router.get('/appliesC',auth , getApplies)

/**************** GET ONE COMPANY BY ID ***************/
 router.get('/:id', getCompanyId)

module.exports = router