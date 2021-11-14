const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require("uuid")
var AWS = require('aws-sdk');
var fs =  require('fs');
var s3 = new AWS.S3();

let bucket_name = "test-cmpe-273"

router.post('/upload-image', async (req, res) => {
    console.log(req.files.file)

    let dishImage;
    console.log(req.files,"----")
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    dishImage= req.files.file;
    file_format = dishImage.name.split(".").length == 2 ? dishImage.name.split(".")[1] : ""
    let saving_filename = uuidv4() + "." + file_format
    params = {Bucket: bucket_name, Key: saving_filename, Body: dishImage.data };

	s3.putObject(params, function(err, body) {

        if (err) {

            console.log(err);
            return res.status(500).send(err);

        } else {

            console.log("Successfully uploaded data to myBucket/myKey");
            res.send({"file_path": saving_filename});
        }

     });    
})


module.exports = router
