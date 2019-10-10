const router = require('express').Router();
const multer = require('multer');

const Storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./Uploads')
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname+"_" + Date.now() + "_" + file.fieldname)
    }
});

const upload = multer({
    storage:Storage,
    limits:1000000
}).single('Image');



router.get('/',(req,res)=>{
    res.render('index.ejs');
})

router.post('/',(req,res)=>{
    upload(req,res,()=>{
        res.send("Uploaded Bro");
    })
})

module.exports = router;