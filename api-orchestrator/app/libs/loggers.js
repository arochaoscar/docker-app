/**
 * Logs the response of a request
 * @param {Response} res - Response
 * @param {uuid} token - ID Request
 */
 const logResponse = (res,token) => {
    const { url, status, method, body, headers } = res;
    const message = `[${token}] - The ${`${method}`.toUpperCase()} request to ${url} got status ${status} with headers ${JSON.stringify(
      headers
    )} and data ${JSON.stringify(body)}`;
    console.log(message);
  };
  
  /**
   * Logs the start of a request
   * @param {Object} options - Request options
   * @param {uuid} token - ID Request
   */
  const logStartRequest = (options, token) => {
    const { method, url, headers, body } = options;
    let message = `[${token}] - Starting ${`${method}`.toUpperCase()} request to ${url} with headers ${JSON.stringify(
      headers || 'no headers'
    )}`;
    if (body) message += ` and body ${JSON.stringify(body)}`;
    console.log(message);
  };
  
  /**
   * Logs an error response
   * @param {Object} error - Response error object
   * @param {uuid} token - ID Request
   */
  const logErrorResponseRequest = (error, token) => {
    const { url, response: { status, headers, data } = {}, message: reqMessage, stack, method } = error;
    let message = `[${token}] - The ${`${method}`.toUpperCase()} request to ${url} got status ${status} with headers ${JSON.stringify(
      headers
    )}`;
    if (data) {
      message += ` and data ${JSON.stringify(data)}`;
    }
    if (reqMessage) {
      message += ` and message ${reqMessage}`;
    }
    if (stack) {
      message += ` and stack ${stack}`;
    }
    console.log(message);
  };
  



  /**
   * Logs the start of a request
   * @param {Object} req - Request options
    */
   const logRequest = (req) => {
    //const { method, url, headers, body } = options;
    let message = `[${req.id}] - Recieved Request by ${`${req.method}`.toUpperCase()} from ${req.socket.remoteAddress} with headers ${JSON.stringify(req.headers || 'no headers')}`;
    if (req.params) message += ` and params ${JSON.stringify(req.params)}`;
    if (req.body) message += ` and body ${JSON.stringify(req.body)}`;
    console.log(message)
  };


  module.exports = { logResponse, logStartRequest, logErrorResponseRequest,logRequest};
  