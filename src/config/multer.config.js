import multer from 'multer'
import * as path from 'path'

const upload = multer({ storage: multer.memoryStorage() })

export default upload
