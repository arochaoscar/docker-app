const axios = require('axios');
const { logResponse, logStartRequest, logErrorResponseRequest } = require('./loggers');

/**
 * @param {Object} options - Request options such as URL, method, qs...
 * @returns {Promise<Response>}
 */
const request = async (options, token) => {
    try {

      logStartRequest(options, token);
      const response = await axios(options);
      logResponse(
        {
          status: response.statusCode,
          url: options.url,
          method: options.method,
          params: options.qs,
          body: response.body,
          headers: response.headers,
        },
        token
      );
      return response.data;
    } catch (error) {
      logErrorResponseRequest(Object.assign(error, options), token);
      const { response: { status, data } = {} } = error || {};
      return Promise.reject({
        statusCode: status || 500,
        message: data || error.message
      });
    }
  };


  module.exports = {
    request
  }