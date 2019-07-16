import { validationResult } from 'express-validator/check';

/**
 * @description this function displays error messages
 * @param {object} request the request body
 * @param {object} response the response body
 * @param {function} next passes the request to another function to be processed
 * @returns next
 */
const displayErrors = (request, response, next) => {
  const messages = [];
  const error = validationResult(request);
  if (!error.isEmpty()) {
    error.array().forEach((err) => {
      messages.push(err.msg);
    });

    return response.status(400).json({
      status: 400,
      error: messages,
    });
  }
  return next();
};

export default displayErrors;
