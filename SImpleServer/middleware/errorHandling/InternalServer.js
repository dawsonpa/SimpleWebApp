/**
 * Created by pauldawson on 8/10/17.
 */
"use strict";
module.exports = () => {
  return function (message, errorCode) {

    Error.captureStackTrace(this, this.constructor);

    this.name = 'Internal Server';
    this.statusMessage = 'INTERNAL_SERVER';
    this.statusDescription = message || 'The server encountered an internal error';
    this.statusCode = 500;
    this.errorCode = errorCode || 500;
    this.status = 500;
  }
};
