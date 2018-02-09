const joi = require("joi");

const elements = {
  name: joi
    .string()
    .alphanum()
    .min(4)
    .max(20)
};

module.exports = {
  createRoom: {
    body: {
      name: elements.name.required()
    }
  },
  getRoom: {
    params: {
      id: joi.number().required()
    }
  }
};
