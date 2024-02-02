import jwtConfig from '../config/jwt.config.js'

const authCheck = (req, res, next) => {
    try {
        const token = req.headers.authorization

        if (!token) {
            return res.status(400).json({
                status: 400,
                msg: 'token is not available',
            })
        }

        const checkToken = jwtConfig.verify(token)

        if (!checkToken) {
            return res.status(400).json({
                status: 400,
                msg: 'the token is outdated or invalid',
            })
        }
        req.token = {
            token,
            user_data: checkToken,
        }

        next()
    } catch (e) {
        console.log(e)
    }
}

export default authCheck
