import { DataTypes, Model } from 'sequelize'
import { newSequelize } from '../config/postgres.config.js'
import { User } from './user.model.js'

class Product extends Model {}

Product.init(
    {
        product_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        product_name: {
            type: DataTypes.TEXT,
        },

        product_description: {
            type: DataTypes.TEXT,
        },
        product_image: {
            type: DataTypes.TEXT,
        },
        product_size: {
            type: DataTypes.TEXT,
        },
        product_price: {
            type: DataTypes.INTEGER,
        },
        discounted: {
            type: DataTypes.INTEGER,
        }, 
        views: {
            type: DataTypes.INTEGER,
        },
    },
    {
        modelName: 'product',
        tableName: 'product',
        sequelize: newSequelize,
    }
)

export { Product }

