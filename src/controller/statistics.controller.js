import { User } from '../model/user.model.js'
import { Product } from '../model/product.model.js'
import { Op } from 'sequelize'

const getUserStatistics = async (req, res) => {
    try {
        const statistics = await User.findAll()

        res.status(200).json({
            status: 200,
            msg: 'get user statistics',
            statistics,
        })
    } catch (e) {
        res.status(500).json({
            status: 500,
            msg: 'internal server error',
        })
    }
}

const getProductStatistics = async (req, res) => {
    try {
        const statistics = await Product.findAll()

        res.status(200).json({
            status: 200,
            msg: 'get product statistics',
            statistics,
        })
    } catch (e) {
        res.status(500).json({
            status: 500,
            msg: 'internal server error',
        })
    }
}

const getUserLoggedInToday = async (req, res) => {
    try {

        const statistics = await User.findAll({
            where: {
                createdAt: {
                    [Op.between]: [
                        new Date(new Date().setHours(0, 0, 0, 0)),
                        new Date(new Date().setHours(23, 59, 59, 999)),
                    ],
                },
            },
        })

        res.status(200).json({
            status: 200,
            msg: 'get user statistics',
            statistics,
        })
    } catch (e) {
        res.status(500).json({
            status: 500,
            msg: 'internal server error',
        })
    }
}

