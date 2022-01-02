const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require("uuid")
const settings = require('../settings')

let bucket_name = "test-cmpe-273"

router.post('/upload-image', async (req, res) => {
    console.log(req.files.file)
    let uploadPath;
    let dishImage;
    console.log(req.files,"----")
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    dishImage= req.files.file;
    file_format = dishImage.name.split(".").length == 2 ? dishImage.name.split(".")[1] : ""
    let saving_filename = uuidv4() + "." + file_format
    console.log("saving", saving_filename)
    uploadPath =  "../../Lab2_Frontend/public/" + saving_filename;
    console.log(uploadPath)
    dishImage.mv(uploadPath, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send(err);
        }

        res.status(200).send({ "file_path": saving_filename });

    // params = {Bucket: bucket_name, Key: saving_filename, Body: dishImage.data };

	// s3.putObject(params, function(err, body) {

    //     if (err) {

    //         console.log(err);
    //         return res.status(500).send(err);

    //     } else {

    //         console.log("Successfully uploaded data to myBucket/myKey");
    //         res.send({"file_path": saving_filename});
    //     }

     });    
})


module.exports = router
