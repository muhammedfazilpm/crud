const express = require('express');

const router = express.Router();

// MULTER SETUP
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination : (req , res , cb ) => {
        cb(null , 'public/uploads')
    },
    filename : (req , file , cb ) => {
       cb(null , file.fieldname + "_" + Date.now() + path.extname(file.originalname) )
    }
})
const uploads = multer({
    storage : storage
})

const Controller = require('../Controllers/Controller')

router.get('/get' , Controller.GetData);

router.post('/post', uploads.single('image') , Controller.AddTask)

router.delete(`/delete/:id` , Controller.DeleteTask)

router.get('/get/:id', Controller.GetById)

router.get('/viewtask/:id' , Controller.ViewTask)

router.put('/updatetask/:id', uploads.single('image'), Controller.UpdateTask);




module.exports = router;