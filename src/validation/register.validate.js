import joi from 'joi'

const registerValidate = joi.object({
    email: joi.string().required().email().empty(),
    password: joi.string().required().alphanum().empty(),
})

export { registerValidate }
