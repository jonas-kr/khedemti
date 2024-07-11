const Job = require('../Models/JobModel')
const Company = require('../Models/CompanyModel')


/************GET ALL COMPANY JOBS FUNCTION******/
const getCompanyJobs = async (req, res) => {

    const company = await Company.findById(req.user._id)
    try {
        const companyJobs = await Job.find({ user: company._id }).sort({ "createdAt": -1 })

        res.status(200).json(companyJobs)
    } catch (error) {
        res.json({ message: `Error is ${error.message}` })
    }
}

/************GET ALL JOBS FUNCTION******/
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ "createdAt": -1 })

        res.status(200).json(jobs)
    } catch (error) {
        res.json({ message: `Error is ${error.message}` })
    }
}
/************GET One JOBS FUNCTION******/
const getJob = async (req, res) => {
    try {
        const job = await Job.find({ _id: req.params.id })

        res.status(200).json(job)
    } catch (error) {
        res.json({ message: `Error is ${error.message}` })
    }
}


/************CREATE A NEW JOB******/
const addJob = async (req, res) => {
    const { title, category, desc, type, state, mnplct } = req.body
    const company = await Company.findById(req.user._id)
    try {
        const job = await Job.create({ user: company._id, title, category, desc, type, state, mnplct })
        res.status(200).json({ message: "data is add to the database" })
    } catch (error) {
        res.json({ message: `Error is ${error.message}` })
    }
}
/************UPDATE A JOB******/
const updateJob = async (req, res) => {
    const { title, category, desc, type, state, mnplct } = req.body
    const job = await Job.findById(req.params.id)

    if (!title || !category || !desc) {
        return res.status(400).json({ message: "All fields required" })
    }
    if (!job) {
        return res.status(400).json({ message: "job not available" })
    }

    const company = await Company.findById(req.user._id)
    if (!job.user.equals(company._id)) {
        return res.status(401).json({ message: "Not Authorized to delete" })
    }
    try {
        await Job.findByIdAndUpdate(req.params.id, {
            title,
            category,
            desc,
            type,
            state,
            mnplct
        })
        res.status(200).json({ message: "Post Updated" })
    } catch (error) {
        res.status(400).json({ message: `Error is ${error.message}` })
    }
}

/************DELETE A JOB******/
const deleteJob = async (req, res) => {
    const job = await Job.findById(req.params.id)
    if (!job) {
        return res.status(400).json({ message: "Job not available" })
    }
    const company = await Company.findById(req.user._id)
    if (!job.user.equals(company._id)) {
        return res.status(401).json({ message: "Not Authorized to delete" })
    }
    try {
        await job.deleteOne()
        res.status(200).json({ message: "Post Deleted" })
    } catch (error) {
        res.json({ message: `Error is ${error.message}` })

    }
}




module.exports = { getJobs, addJob, updateJob, deleteJob, getCompanyJobs, getJob }
