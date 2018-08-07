/**
 * Created by pdawson on 6/6/16.
 */
"use strict";
module.exports = () => {
    return function (message, errorCode) {

        Error.captureStackTrace(this, this.constructor);

        this.name = 'Unauthorized';
        this.statusMessage = 'UNAUTHORIZED';
        this.statusDescription = message || 'You must be authorized to view this resource';
        this.statusCode = 401;
        this.errorCode = errorCode || 401;
        this.status = 401;
    }
};
