import jwt from 'jsonwebtoken'

const jwtConfig = {
    sign: function (payload) {
        return jwt.sign(payload, process.env.JWT_KEY)
    },
    verify: function (token) {
        return jwt.verify(token, process.env.JWT_KEY)
    },
}

export default jwtConfig
