const mongoose = require('mongoose')
const JobSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Company"
        },
        title: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        mnplct: {
            type: String,
            required: true
        },

    }, { timestamps: true }
)

const Job = mongoose.model('Job', JobSchema)

module.exports = Job