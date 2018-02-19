const joi = require("joi");

const elements = {};

module.exports = {
  createRequest: {
    body: {
      receiverId: joi.number().required()
    }
  },
  respondToRequest: {
    params: {
      id: joi.number().required()
    },
    body: {
      status: joi
        .string()
        .valid("ACCEPTED", "REJECTED")
        .required()
    }
  }
};
