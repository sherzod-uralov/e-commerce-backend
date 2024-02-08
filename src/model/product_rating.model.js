import { DataTypes, Model } from 'sequelize'
import { newSequelize } from '../config/postgres.config.js'
import { User } from './user.model.js'
import { Product } from './product.model.js'

class ProductRating extends Model {}

ProductRating.init(
    {
        rating_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            },
        },
    },
    {
        modelName: 'rating',
        tableName: 'rating',
        paranoid: true,
        sequelize: newSequelize,
    }
)

export { ProductRating }


User.hasMany(ProductRating,{foreignKey:'user_id'})
Product.hasMany(ProductRating,{foreignKey:'product_id'})