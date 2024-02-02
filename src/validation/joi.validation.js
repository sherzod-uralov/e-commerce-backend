import joi from 'joi'

const signUpScheme = joi.object({
    username: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email().required().empty(),
    password: joi.string().min(3).max(20).required().alphanum(),
})

export { signUpScheme }
