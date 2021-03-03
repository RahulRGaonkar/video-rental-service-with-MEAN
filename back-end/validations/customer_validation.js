const Joi = require('@hapi/joi');

const validateCustomer = data =>{
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean()
  });
  return schema.validate(data);
}

module.exports.validateCustomer = validateCustomer;