import multer from 'multer'
import{v4 as uuid} from 'uuid'

const storage=multer.diskStorage({
    destination(req,res,cb){
        cb(null,"uploads")
    },
    filename(req,file,cb){
        const id=uuid();

        const extName=file.originalname.split('.').pop();
        const fileName=`${id}.${extName}`

        cb(null,fileName);
    }
});

// For course image uploads (createCourse)
export const uploadFiles=multer({storage}).single("file")