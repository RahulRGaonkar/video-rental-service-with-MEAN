const Joi = require('@hapi/joi');

const validateGenre = genre => {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });
  return schema.validate(genre);
}

module.exports.validateGenre = validateGenre;