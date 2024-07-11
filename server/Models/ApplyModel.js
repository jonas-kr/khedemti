const mongoose = require('mongoose')
const ApplySchema = mongoose.Schema(
    {
        worker: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Worker"
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Company"
        },
        job: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Job"
        },
        desc: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            default: "Waiting"
        },

    }, { timestamps: true }
)

const Apply = mongoose.model('Apply', ApplySchema)

module.exports = Apply