import { Sequelize } from 'sequelize'

const newSequelize = new Sequelize('postgres://ritkjerlfoxzkg:ef30c95ca410e713336b885d783e4b89598179e87fa93f1f4c742e9b351de4cf@ec2-44-213-151-75.compute-1.amazonaws.com:5432/df5jmosajnh8qb',{
    logging: false,
    ssl:true
})

export { newSequelize } 
