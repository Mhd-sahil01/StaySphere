const Joi = require('joi');

// for server-side validation of list
module.exports.listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
    image: Joi.object({
      url: Joi.string().required(),
      filename: Joi.string().required()
    }),
    category: Joi.string(),
    contact: Joi.string().required(),
});


// for server-side validation of review
module.exports.reviewSchema = Joi.object({
      rating: Joi.number().required().min(1).max(5),
      comment: Joi.string().required().trim().min(1),
});