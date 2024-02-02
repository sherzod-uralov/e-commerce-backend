import { Product } from '../model/product.model.js'
import { User } from '../model/user.model.js'
import jwt from 'jsonwebtoken'
import { getStorage, ref, uploadBytes } from 'firebase/storage'

import * as path from 'path'
import jwtConfig from '../config/jwt.config.js'
const getProducts = async (req, res) => {
    try {
        const jwt = jwtConfig.verify(req.headers.authorization)
        const user = await User.findOne({ where: { user_id: jwt.user_id } })

        const product = await Product.findAll({ where: user.user_id })

        res.status(200).json({
            status: 200,
            msg: 'successfully get product',
            product,
        })
    } catch (e) {
        console.log(e)
    }
}

const addProduct = async (req, res) => {
    const storage = getStorage()
    const image = Date.now() + path.extname(req.file.originalname)
    const storageRef = ref(storage, image)

    const medata = {
        contentType: req.file.mimetype,
    }

    const imageUpload = await uploadBytes(storageRef, req.file.buffer, medata)

    try {
        const {
            product_name,
            product_description,
            product_image,
            product_size,
            product_price,
            discounted,
            views,
        } = req.body
        const token = jwt.verify(
            req.headers.authorization,
            process.env['JWT_KEY']
        )

        const findUser = await User.findOne({
            where: { user_id: token.user_id },
        })

        const createProduct = await Product.create({
            product_name,
            product_description,
            product_image: `gs://backend-405523.appspot.com/${image}`,
            product_size,
            product_price,
            discounted,
            views,
            user_id: findUser.user_id,
        })

        res.status(201).json({
            status: 201,
            msg: 'create product',
            createProduct,
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            status: 500,
            msg: 'internal server error',
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const deleteProduct = await Product.destroy({
            where: {
                product_id: id,
            },
        })
        res.status(201).json({
            status: 201,
            msg: 'delete product',
            deleteProduct,
        })
    } catch (e) {
        res.status(500).json({
            status: 500,
            msg: 'internal server error',
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params

        const findProduct = await Product.findOne({ where: { product_id: id } })

        if (!findProduct) {
            return res.status(400).json({
                status: 400,
                msg: 'product not found',
            })
        }

        const {
            product_name,
            product_description,
            product_image,
            product_size,
            product_price,
            discounted,
            views,
        } = req.body

        const updateProduct = await Product.update(
            {
                product_name,
                product_description,
                product_image,
                product_size,
                product_price,
                discounted,
                views,
            },
            {
                where: {
                    product_id: id,
                },
            }
        )
    } catch (e) {
        res.status(500).json({
            status: 500,
            msg: 'internal server error',
        })
    }
}

export { addProduct, getProducts, deleteProduct, updateProduct }
