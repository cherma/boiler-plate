const Joi = require('@hapi/joi');

const validateSchema = (schema, testObject = {}) => new Promise((resolve, reject) => {
  Joi.validate(testObject, schema, (err, response) => {
    if (err) {
      return reject(err);
    }
    return resolve(response);
  });
});

module.exports = {
  validateSchema,
};
