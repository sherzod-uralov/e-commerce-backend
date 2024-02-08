import { DataTypes, Model } from 'sequelize'
import { newSequelize } from '../config/postgres.config.js'
import { User } from './user.model.js'
import {Product} from "./product.model.js";

class Favorites extends Model {}

Favorites.init(
    {
        favorites_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        liked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        trash: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        modelName: 'favorites',
        tableName: 'favorites',
        paranoid: true,
        sequelize: newSequelize,
    }
)

Favorites.belongsTo(User, { foreignKey: 'user_id' })
Favorites.belongsTo(Product, { foreignKey: 'product_id' })

export { Favorites }
