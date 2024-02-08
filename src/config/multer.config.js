import multer from 'multer'



const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg'
    ) {
        cb(null, true)
    } else { 
        cb(null, false)
    }
}

const upload = multer({ storage, fileFilter })


export default upload
