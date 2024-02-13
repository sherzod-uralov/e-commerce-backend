import { Sequelize } from 'sequelize'
import 'dotenv/config'

const newSequelize = new Sequelize({
    database:'shop',
    username:'postgres',
    dialect:'postgres',
    password:'sherzod',
    host:'localhost',
    logging:false
})
 
export { newSequelize }
   