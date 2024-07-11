const mongoose = require('mongoose')
const CvSchema = mongoose.Schema(
    {
        url: {
            type:String,
        }
    }, { timestamps: true }
)

const Cv = mongoose.model('Cv', CvSchema)

module.exports = Cv