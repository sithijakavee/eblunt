import multer from 'multer'

const storage = multer.diskStorage({
    
    destination: function (req,res,cb){
        cb(null, "uploads/");
    },
    filename: function (req,file,cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = file.originalname.split(".")[0];
        const ext = file.originalname.split(".")[file.originalname.split(".").length - 1]
        cb(null,filename.replace(" ", "-") + "-" + uniqueSuffix + "." + ext);
    },
});

export const upload = multer({storage: storage});