const Joi = require('@hapi/joi');

const createTelevisionSeries = data => {
  const schema = Joi.object({
    name: Joi.string().required(),
    rated: Joi.string().min(1).max(2).required(),
    yearOfRelease: Joi.number().min(4).max(4).required(),
    genre: Joi.string().max(200).required(),
    seasons: Joi.number().required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required()
  });
  return schema.validate(data);
};

module.exports.createTelevisionSeries = createTelevisionSeries;