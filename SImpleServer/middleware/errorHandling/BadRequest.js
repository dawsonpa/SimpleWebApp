/**
 * Created by pdawson on 6/6/16.
 */
"use strict";
module.exports = () => {
    return function (message, errorCode) {

        Error.captureStackTrace(this, this.constructor);

        this.name = 'Bad Request';
        this.statusMessage = 'BAD REQUEST';
        this.statusDescription = message || 'The requested resource couldn\'t be found';
        this.statusCode = 400;
        this.errorCode = errorCode || 400;
        this.status = 400
    };

};

