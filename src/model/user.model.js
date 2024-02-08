import { DataTypes, Model } from 'sequelize'
import { newSequelize } from '../config/postgres.config.js'
import { Product } from './product.model.js'

/**
 * @openapi
 * components:
 *   schemas:
 *     createUserInput:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           default: john
 *         email:
 *           type: string
 *           default: john@example.com
 *         password:
 *           type: string
 *           default: 123456
 *     createResponse:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *     createConflictResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *           default: 409
 *         error:
 *           type: string
 *           default: conflict
 *         msg:
 *           type: string
 *           default: user already exist
 *     createValidationResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *           default: 400
 *         error:
 *           type: string
 *           default: password or email
 *         msg:
 *           type: string
 *           default: validation error
 */

class User extends Model {}

User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        username: {
            type: DataTypes.STRING(30),
        },
        email: {
            type: DataTypes.STRING(50),
        },
        password: {
            type: DataTypes.TEXT,
            min: 3,
            max: 30,
        },
        darkMode: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isUpdated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isCreated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        photo: {
            type: DataTypes.TEXT,
        }
    },
    {
        modelName: 'users',
        tableName: 'users',
        paranoid: true,
        sequelize: newSequelize,
    }
)

Product.hasMany(User, { foreignKey: 'user_id' })
User.hasMany(Product, { foreignKey: 'user_id' })

export { User }
