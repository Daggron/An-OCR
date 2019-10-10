const router = require('express').Router();
const multer = require('multer');
const tesseract = require('tesseract.js');
const fs = require('fs');


const Storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./Uploads')
    },
    filename:(req,file,callback)=>{
        callback(null, Date.now() + "_" + file.fieldname+"_"+file.originalname)
    }
});

const upload = multer({
    storage:Storage,
    limits:1000000
}).single('Image');



router.get('/',(req,res)=>{
    res.render('index.ejs');
})

router.post('/',async(req,res)=>{
    upload(req,res,async ()=>{

      let data = await fs.readFileSync(`./Uploads/${req.file.filename}`,{
          encoding:null
      })
      console.log(`./${req.file.path}`)

      if(data===null){
          console.log(err);
          res.send("OOpsie");
      }

      tesseract.recognize(data)
      .progress(progress=>{
          console.log(progress)
      })
      .then(result=>{
        res.send(result.text)
          
      })
      .then(()=>{
       
      })

      

      
      
     

     

    })

    
})

module.exports = router;