const express = require("express")
const port = 1616
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
require('dotenv').config()


const CompaniesRoute = require('./Routes/CompaniesRoute')
const JobsRoute = require('./Routes/JobsRoute')
const WorkersRoute = require('./Routes/WorkersRoute')
const Cv = require("./Models/CvModel")


/*************MIDDLEWARE**********/
app.use(express.json())
app.use(express.static('public'))
app.use(cors())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public', 'cv')); // Set the destination folder
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname)); // Keep the original file name
    },
});
const upload = multer({ storage: storage });

/*************ROUTES**********/
app.use('/api/companies', CompaniesRoute)
app.use('/api/jobs', JobsRoute)
app.use('/api/workers', WorkersRoute)

app.post('/api/uploadCv', upload.single('file'), async (req, res) => {
    const cv = await Cv.create({
        url: req.file.filename,
    })
    res.status(200).json({ cv })
})


/*************APP LISTENING**********/
mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        app.listen(port, () => {
            console.log("server is running on port", port)
            console.log('Connected to DB')
        })
    })

