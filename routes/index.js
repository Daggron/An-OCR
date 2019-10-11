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
    res.render('index.ejs',{
        data:req.session.data,
        error:req.session.err
    });
    req.session.data = null;
    req.session.err = null;
})

router.post('/',async(req,res)=>{
    upload(req,res,async ()=>{

        req.session.err = null;
        if(req.file === undefined){
            req.session.err = 'Please select a file'
           return  res.redirect('/');
        }

      let data = await fs.readFileSync(`./Uploads/${req.file.filename}`,{
          encoding:null
      })
      console.log(`./${req.file.path}`)

      if(data===null){
          console.log(err);
          req.session.err="OOpsie their is some error";
          res.redirect('/')
      }

      tesseract.recognize(data)
      .progress(progress=>{
          req.session.err = null;
          console.log(progress)
      })
      .then(result=>{
        req.session.data = result.text;
        req.session.err = null;
        res.redirect('/');
      })
      .catch(()=>{
          req.session.err = 'Internal server error'
          res.redirect('/')
      })

      

      
      
     

     

    })

    
})

module.exports = router;