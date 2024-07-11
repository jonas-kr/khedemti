const Worker = require("../Models/WorkerModel")
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const Apply = require("../Models/ApplyModel")
const { ObjectId } = require('mongodb');
require('dotenv').config()

/**************** Create JWT FUNCTION ***************/
const createToken = (id) => {
    return JWT.sign({ id }, process.env.SECRET_PHRASE, { expiresIn: '7d' })
}


const getWorkers = async (req, res) => {
    try {
        const workers = await Worker.find({}).sort({ "createdAt": -1 })
        res.status(200).json(workers)

    } catch (error) {
        res.status(500).json({ message: `Error is ${error.message}` })
    }
}

const registerWorker = async (req, res) => {
    const { email, password, firstName, secondName } = req.body
    if (!email || !password || !firstName || !secondName) {
        return res.status(400).json({ message: "all the Fields must be filled" })
    }
    const existEmail = await Worker.findOne({ email: email })
    if (existEmail) {
        return res.status(400).json({ message: "email already taken" })
    }
    const salt = await bcrypt.genSalt()
    const hashed = await bcrypt.hash(password, salt)

    try {
        const worker = await Worker.create({
            email, password: hashed,
            firstName, secondName
        })
        //Create JWT
        const token = createToken(worker._id)
        res.status(200).json({ email, secondName, token })
    } catch (error) {
        res.status(500).json({ message: `Error is ${error.message}` })
    }
}


const loginWorker = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Fields must be filled" })
    }
    const worker = await Worker.findOne({ email })
    if (!worker) {
        return res.status(400).json({ message: "Incorrect Email" })
    }
    const match = await bcrypt.compare(password, worker.password)
    if (!match) {
        return res.status(400).json({ message: "Incorrect Password" })
    }

    try {
        //Create JWT
        const token = createToken(worker._id)
        res.status(200).json({ email, secondName: worker.secondName, token })
    } catch (error) {
        res.status(500).json({ message: `Error is ${error.message}` })
    }

}

const getWorker = async (req, res) => {
    const { email } = req.body
    try {
        const worker = await Worker.find({ email })
        res.status(200).json(worker)

    } catch (error) {
        res.json({ message: `Error is ${error.message}` })
    }
}


const getWorkerId = async (req, res) => {
    try {
        const worker = await Worker.findById(req.params.id)
        res.status(200).json(worker)

    } catch (error) {
        res.json({ message: `Error is ${error.message}` })
    }
}

const updateWorker = async (req, res) => {
    const {
        profilePic,
        state,
        mnplct,
        portfolioUrl,
        cvUrl,
        education,
        skills, bio
    } = req.body

    const worker = await Worker.findById(req.user._id)
    if (!worker) {
        return res.status(401).json({ message: "No Worker found" })
    }
    try {
        await Worker.findByIdAndUpdate(req.user._id, {
            profilePic,
            state,
            mnplct,
            portfolioUrl,
            cvUrl,
            education,
            skills, bio
        })
        res.status(200).json({ message: "Worker Updated" })
    } catch (error) {
        res.status(400).json({ message: `Error is ${error.message}` })
    }
}
const applyForJob = async (req, res) => {
    const { company, job, desc } = req.body;
    if (!company || !job || !desc) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if worker exists
        const wrkr = await Worker.findById(req.user._id);
        if (!wrkr) {
            return res.status(404).json({ message: "No Worker found" });
        }

        // Check if the worker has already applied for the job
        const worker = await Apply.findOne({ worker: req.user._id, job });
        if (worker) {
            return res.status(409).json({ message: "Already applied" });
        }

        // Create a new application
        const apply = await Apply.create({
            company,
            worker: req.user._id,
            job,
            desc
        })
        return res.status(201).json({ message: "You applied successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const getApplies = async (req, res) => {
    try {
        const applies = await Apply.find({ worker: req.user._id }).sort({ "createdAt": -1 })
        res.status(200).json(applies)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    loginWorker, registerWorker, getWorkers,
    applyForJob, getWorkerId, getWorker, updateWorker, getApplies
}