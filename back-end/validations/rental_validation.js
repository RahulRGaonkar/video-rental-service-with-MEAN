const Joi = require('@hapi/joi');

const rentalValidation = (rental) => {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
    dateReturned: Joi.allow(null),
    rentalFee: Joi.allow(null)
  });
  return schema.validate(rental);
}

module.exports.rentalValidation = rentalValidation;