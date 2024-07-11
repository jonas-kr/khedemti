const mongoose = require('mongoose')
const WorkerSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 8
        },
        firstName: {
            type: String,
            required: true,
        },
        secondName: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            default: "https://res.cloudinary.com/dnnbhmypw/image/upload/v1711339441/wghtotmvvibrmygsdxzf.png"
        },
        bio: {
            type: String,
            default: "I'am a full stack web developer"
        },
        state: {
            type: String,
            default: ""
        },
        mnplct: {
            type: String,
            default: ""
        },
        education: {
            type: String,
            default: "Bachelor"
        },
        cvUrl: {
            type: String,
            default: "www.CvUrl.com"
        },
        portfolioUrl: {
            type: String,
            default: "www.portfolio.com"
        },
        skills: {
            type: [String]
        }
    },
    {
        timestamps: true
    }
)

const Worker = mongoose.model('Worker', WorkerSchema)

module.exports = Worker