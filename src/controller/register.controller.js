import { User } from '../model/user.model.js'
import { hash } from 'bcrypt'
import { signUpScheme } from '../validation/joi.validation.js'
import jwtConfig from '../config/jwt.config.js'

const Register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const { error, value } = signUpScheme.validate(req.body)

        if (error) {
            return res.status(400).json({
                status: 400,
                msg: error.details[0].message,
            })
        }

        const findUser = await User.findOne({ where: { email } })

        if (findUser) {
            return res.status(409).json({
                status: 409,
                error: 'conflict',
                msg: 'user already exist',
            })
        }

        const hashedPassword = await hash(password, 5)

        const createUser = await User.create({
            username,
            password: hashedPassword,
            email,
        })

        const find = await User.findOne({ where: { email } })

        const token = jwtConfig.sign({
            email,
            user_id: find.user_id,
            username,
        })

        res.status(201).json({
            status: 201,
            msg: 'create user successfully',
            token: token,
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            status: 500,
            msg: 'internal server error',
        })
    }
}

export default Register
