const Joi = require('@hapi/joi');

const validateMovie = movie => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
  });
  return schema.validate(movie);
}

module.exports.validateMovie = validateMovie;