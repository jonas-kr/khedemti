const JWT = require('jsonwebtoken')
const Worker = require('../Models/WorkerModel')

require('dotenv').config()


const auth = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ message: "Auth token NOT FOUND" })
    }
    const token = authorization.split(" ")[1]
    try {
        //GET the Company ID from headers
        const _id = JWT.verify(token, process.env.SECRET_PHRASE)

        //Save User in request
        req.user = await Worker.findById(_id.id).select("_id")
        next()
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

module.exports = auth