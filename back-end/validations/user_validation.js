const Joi = require('@hapi/joi');

const registerUser = data => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.required(),
    password: Joi.string().min(8).required()
  });``
  return schema.validate(data);
}

const userlogin = data => {
  const schema = Joi.object({
    email: Joi.required(),
    password: Joi.required()
  });
  return schema.validate(data);
}

module.exports.registerUser = registerUser;
module.exports.userlogin = userlogin;