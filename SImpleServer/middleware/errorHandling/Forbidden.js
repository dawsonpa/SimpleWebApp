/**
 * Created by pdawson on 6/6/16.
 */
"use strict";
module.exports = () => {
    return function (message, errorCode) {

        Error.captureStackTrace(this, this.constructor);

        this.name = 'Forbidden';
        this.statusMessage = 'FORBIDDEN';
        this.statusDescription = message || 'The requested resource is forbidden';
        this.statusCode = 403;
        this.errorCode = errorCode || 403;
        this.status = 403;
    }
};
