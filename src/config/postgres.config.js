import { Sequelize } from 'sequelize'

const newSequelize = new Sequelize({
    database: 'blog',
    host: 'localhost',
    username: 'postgres',
    dialect: 'postgres',
    logging: false,
})

export { newSequelize }
