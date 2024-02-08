import express from 'express'
import 'dotenv/config'
import { router } from './routes/index.js'
import { newSequelize } from './config/postgres.config.js'
import cors from 'cors'
import { initializeApp } from 'firebase/app'
import swaggerDoc from './swagger/swagger.js'
import firebaseConfig from './firebase/firebase.config.js'
const bootStrap = async () => {
    try {
        const app = express()
        app.use(cors())
        app.use(express.json())
        app.use('/api', router) 
        

        initializeApp(firebaseConfig) 
        await newSequelize.authenticate()
        await newSequelize.sync({ alter: true }) 

        const PORT = process.env.PORT || 5400
        const HOST = '192.168.0.103'
        swaggerDoc(app, PORT, HOST)
        app.listen(PORT, HOST, () =>
            console.log(
                ` server is running port: ${PORT}\n url: http://${HOST}:${PORT}/api`
            )
        )
    } catch (e) {
        console.log(e)
    }
}

bootStrap()
