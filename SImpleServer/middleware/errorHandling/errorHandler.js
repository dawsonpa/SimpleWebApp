"use strict";

module.exports = (ServerResponse, config, log) => {
  return (response, error) => {
    let serverResponse = new ServerResponse();
    let { statusCode,status, statusDescription } = error;
    log.error(error);
    statusCode = statusCode ? statusCode: 500;
    const errorDict = config.get('errorDict');
    const errorType = errorDict[statusCode.toString()];
    return serverResponse[errorType](response, {result:{...error}})
  }
};
