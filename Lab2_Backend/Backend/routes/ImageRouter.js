const express = require('express')
const router = express.Router()
const multer = require('multer')
const multerGoogleStorage = require('multer-google-storage')

let uploadHandler = multer({
    storage: multerGoogleStorage.storageEngine({
        autoRetry: true,
        bucket: 'uber_eats_images',
        projectId: 'uber-eats-331202',
        keyFilename: './uber-eats-331202-fee2f3fda5af.json',
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${file.originalname}`)
        }
    })
})

router.post('/upload-image', uploadHandler.any(), (req, res) => {
    console.log(req.files)
    res.send("Ok")
})


module.exports = router
