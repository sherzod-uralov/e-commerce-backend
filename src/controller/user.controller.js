import jwtConfig from "../config/jwt.config.js";
import {User} from "../model/user.model.js";
import {getStorage, ref, uploadBytes} from "firebase/storage";
import * as path from "path";
import {Favorites} from "../model/favorites_and_desire.model.js";
const getUserProfile = async (req, res) => {
    try {
        const userToken = jwtConfig.verify(req.headers.authorization)

        const user = await User.findOne({ where: { user_id: userToken.user_id } })


        res.status(200).json({
            status: 200,
            msg: 'successfully get user profile',
            user,
        })
    }
    catch (e) {-

        console.log(e)
        res.status(500).json({
            status: 500,
            msg: 'internal server error',
        })
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const userToken = jwtConfig.verify(req.headers.authorization)

        const user = await User.findOne({ where: { user_id: userToken.user_id } })

        const { username} = req.body

        const updateUser = await User.update({ username }, { where: { user_id: userToken.user_id } })

        res.status(200).json({
            status: 200,
            msg: 'successfully update user profile',
            updateUser,
        })

    }
    catch (e) {
        console.log(e)
        res.status(500).json({
            status: 500,
            msg: 'internal server error',
        })
    }
}

const addPhoto = async (req, res) => {
    try {
        const userToken = jwtConfig.verify(req.headers.authorization)

        const user = await User.findOne({ where: { user_id: userToken.user_id } })

        const { photo } = req.file;

        const storage = getStorage()

        const image = Date.now() + path.extname(req.file.originalname)

        const storageRef = ref(storage, image)

        const medata = {
            contentType: req.file.mimetype
        }

        const imageUpload = await uploadBytes(storageRef, req.file.buffer, medata)

        const updatePhoto = await User.update({ photo: `gs://backend-405523.appspot.com/${image}` }, { where: { user_id: userToken.user_id } })

        res.status(200).json({
            status: 200,
            msg: 'successfully update photo',
            updatePhoto
        })

    }catch (e) {

    }
}

export { getUserProfile, updateUserProfile, addPhoto }