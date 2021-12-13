const multer = require("multer");
//dictionaire des MIME type 
const MIME_TYPEs = {
    "image/jpg":"jpg",
    "image/gif":"gif",
    "image/png":"png",
}

// la destination de fich + generee un nome unique 
 
const storage = multer.diskStorage({
   
   
    destination:(req , fille , cb)=>{
        cb (null, './public/uploads');
    },
 
    filename:(req,file,cb)=>{
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPEs[file.mimetype];
        cb(null, name + "_"+ Date.now()+extension);
    }
      
})   



module.exports = multer({storage}).single("image");