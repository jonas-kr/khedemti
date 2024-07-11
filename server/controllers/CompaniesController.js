const Company = require('../Models/CompanyModel')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const Apply = require('../Models/ApplyModel')
require('dotenv').config()

/**************** Create JWT FUNCTION ***************/
const createToken = (id) => {
    return JWT.sign({ id }, process.env.SECRET_PHRASE, { expiresIn: '7d' })
}

/**************** Create NEW USER FUNCTION ***************/

const registerCompany = async (req, res) => {
    const { email, password, cName, cUrl } = req.body
    if (!email || !password || !cName || !cUrl) {
        return res.status(400).json({ error: "all the Fields must be filled" })
    }
    const existEmail = await Company.findOne({ email: email })
    if (existEmail) {
        return res.status(400).json({ error: "email already taken" })
    }
    const existCompany = await Company.findOne({ cName })
    if (existCompany) {
        return res.status(400).json({ error: "company name already taken" })
    }
    const salt = await bcrypt.genSalt()
    const hashed = await bcrypt.hash(password, salt)
    try {
        const company = await Company.create({ email, password: hashed, cName, cUrl })
        //Create JWT
        const token = createToken(company._id)
        res.status(200).json({ email, cName, token })
    } catch (error) {
        res.status(500).json({ error: `Error is ${error.message}` })
    }
}

const loginCompany = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ error: "Fields must be filled" })
    }
    const company = await Company.findOne({ email })
    if (!company) {
        return res.status(400).json({ error: "Incorrect Email" })
    }
    const match = await bcrypt.compare(password, company.password)
    if (!match) {
        return res.status(400).json({ error: "Incorrect Password" })
    }
    try {
        //Create JWT
        const token = createToken(company._id)
        res.status(200).json({ email, cName: company.cName, token })
    } catch (error) {
        res.status(500).json({ message: `Error is ${error.message}` })
    }

}


const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find({}).sort({ "createdAt": -1 })
        res.status(200).json(companies)

    } catch (error) {
        res.json({ message: `Error is ${error.message}` })
    }
}


const getCompany = async (req, res) => {
    const { email } = req.body
    try {
        const company = await Company.find({ email })
        res.status(200).json(company)

    } catch (error) {
        res.json({ message: `Error is ${error.message}` })
    }
}


const getCompanyId = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id)
        res.status(200).json(company)

    } catch (error) {
        res.json({ message: `Error is ${error.message}` })
    }
}

const updateCompany = async (req, res) => {
    const {
        bio,
        profilePic,
        state,
        mnplct,
        contactNmbr,
        nich
    } = req.body

    const company = await Company.findById(req.user._id)
    if (!company) {
        return res.status(401).json({ message: "No Company found" })
    }
    try {
        await Company.findByIdAndUpdate(req.user._id, {
            bio,
            profilePic,
            state,
            mnplct,
            contactNmbr,
            nich
        })
        res.status(200).json({ message: "Company Updated" })
    } catch (error) {
        res.status(400).json({ message: `Error is ${error.message}` })
    }
}

const updateApply = async (req, res) => {
    const {
        status, id
    } = req.body

    const apply = await Apply.findById(id)

    if (!apply) {
        return res.status(401).json({ message: "No Apply Found" })
    }
    try {
        await Apply.findByIdAndUpdate(id, { status })
        res.status(200).json({ message: "Status Updated" })

    } catch (error) {
        res.status(400).json({ message: `Error is ${error.message}` })
    }
}

const getApplies = async (req, res) => {
    try {
        const applies = await Apply.find({ company: req.user._id }).sort({ "createdAt": -1 })
        res.status(200).json(applies)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    registerCompany, loginCompany, getCompanies,
    getCompany, getCompanyId, updateCompany, updateApply, getApplies
}


