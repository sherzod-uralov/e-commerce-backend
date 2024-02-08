import { Sequelize } from 'sequelize'
import 'dotenv/config'

const newSequelize = new Sequelize('postgres://moxkbyjkeknqje:9d6115f87c4c35a3a1a20ea1e5d37299ff55abc8822adf03e25976967e5c6406@ec2-107-21-67-46.compute-1.amazonaws.com:5432/dacqphsq5vqaao',{
    dialectOptions: {
        ssl: {
            require: true, // Agar foydalanuvchi server bilan amal qilmasa, ulgurji serverga ulanishni talab qiladi
            rejectUnauthorized: false // Lokal yoki test maqsadlar uchun ishlatilgan daqiqo o'zgartiriladi. Ishlab chiqarishga o'tkazish uchun ba'zi foydalanuvchilar tomonidan tavsiya etilmaydi.
        }
    },
    logging: true
})
 
export { newSequelize }
 