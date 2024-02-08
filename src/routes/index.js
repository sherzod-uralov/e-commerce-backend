import { Router } from 'express'
import Register from '../controller/register.controller.js'
import login from '../controller/login.controller.js'
import authCheck from '../middleware/auth.middleware.js'
import {
    addProduct,
    deleteProduct,
    getProducts,
    updateProduct,
} from '../controller/product.controller.js'
import upload from '../config/multer.config.js'
import {getUserProfile} from "../controller/user.controller.js";

export const router = Router()

/**
 * @openapi
 * /register:
 *   post:
 *     tags: [Authentication]
 *     summary: yangi user yaratish
 *     description: hisob ma'lumotlari orqali foydalanuvchini ro'yxatdan o'tkazing
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createUserInput'
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/createResponse'
 *       '409':
 *         description: user already exists conflict
 *         content:
 *           application/plain:
 *             schema:
 *               $ref: '#/components/schemas/createConflictResponse'
 *       '400':
 *         description: validation error
 *         content:
 *           application/plain:
 *             schema:
 *               $ref: '#/components/schemas/createValidationResponse'
 */

router.post('/register', Register)

/**
 * @openapi
 * tags:
 *   name: Authentication
 *   description: foydalanuvchi authentikatsiyasi
 */

/**
 * @openapi
 * /login:
 *   post:
 *     tags: [Authentication]
 *     summary: Authenticate user
 *     description: hisob ma'lumotlari orqali kirish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *
 *     responses:
 *       '200':
 *         description: User authenticated successfully
 */

router.post('/login', login)

/**
 * @openapi
 * tags:
 *   name: Products
 *   description: Operations related to products
 */

/**
 * @openapi
 * /product:
 *   get:
 *     tags: [Products]
 *     summary: Get all products
 *     description: Retrieve a list of all products
 *     responses:
 *       '200':
 *         description: A list of products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductList'
 */

router.get('/product', getProducts)
 
/**
 * @openapi
 * /product:
 *   post:
 *     tags: [Products]
 *     summary: Add a new product
 *     description: Add a new product to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProduct'
 *     responses:
 *       '201':
 *         description: Product added successfully
 */

router.post('/product', upload.single('product_image'), addProduct)

/**
 * @openapi
 * /product/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Delete a product
 *     description: Delete a product from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Product deleted successfully
 */

router.delete('/product/:id', deleteProduct)

/**
 * @openapi
 * /product/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Update a product
 *     description: Update an existing product in the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatedProduct'
 *     responses:
 *       '200':
 *         description: Product updated successfully
 */

router.put('/product/:id',upload.single('product_image'), updateProduct)


router.get('/user', getUserProfile)

export default router
