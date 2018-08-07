/**
 * Created by pdawson on 6/6/16.
 */
"use strict";
module.exports = () => {
    return function (message, errorCode) {

        Error.captureStackTrace(this, this.constructor);

        this.name = 'Not Found';
        this.statusMessage = 'NOT FOUND';
        this.statusDescription = message || 'The requested resource couldn\'t be found';
        this.statusCode = 404;
        this.errorCode = errorCode || 404;
        this.status = 404;
    };
};
