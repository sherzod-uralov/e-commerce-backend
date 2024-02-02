import { User } from '../model/user.model.js'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { token } from 'morgan'
import joi from 'joi'
import { registerValidate } from '../validation/register.validate.js'
import jwtConfig from '../config/jwt.config.js'

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const { error, value } = registerValidate.validate(req.body)

        if (error) {
            return res.status(400).json({
                error: 400,
                msg: error.details[0].message,
            })
        }

        const checkUser = await User.findOne({ where: { email } })

        if (!checkUser) {
            return res.status(400).json({
                error: 400,
                msg: 'user not found',
            })
        }

        const matchPassword = await compare(password, checkUser.password)
        console.log(matchPassword)
        if (!matchPassword) {
            return res.status(400).json({
                error: 400,
                msg: 'wrong password',
            })
        }

        const token = jwtConfig.sign({
            email,
            username: checkUser.username,
            user_id: checkUser.user_id,
        })

        return res.status(200).json({
            status: 200,
            msg: 'successfully logged',
            token,
        })
    } catch (e) {
        console.log(e)
    }
}

export default login
