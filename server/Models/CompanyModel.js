const mongoose = require('mongoose')
const CompanySchema = mongoose.Schema(
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
        cName: {
            type: String,
            required: true,
            unique: true
        },
        cUrl: {
            type: String,
            required: true,
            unique: true
        },
        profilePic: {
            type: String,
            default: "https://res.cloudinary.com/dnnbhmypw/image/upload/v1710637727/607438_s1id7r.png"
        },
        bio: {
            type: String,
            default: "Our company is specialized in web developement"
        },
        state: {
            type: String,
            default: ""
        },
        mnplct: {
            type: String,
            default: ""
        },
        contactNmbr: {
            type: String,
            default: ""
        },
        nich: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
)

const Company = mongoose.model('Company', CompanySchema)

module.exports = Company