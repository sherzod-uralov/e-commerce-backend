import joi from 'joi'

const signUpScheme = joi.object({
    username: joi.string().alphanum().min(3).max(30),
    email: joi.string().email().empty(),
    password: joi.string().min(3).max(20).alphanum(),
})

export { signUpScheme }
