/**
 * Created by pauldawson on 7/26/17.
 */
"use strict";
const PrettyStream = require('bunyan-prettystream');
const prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

module.exports = function (bunyan) {
    return bunyan.createLogger({
        name: "barberAppServer",
        streams: [{
            level: 'info',
            type: 'raw',
            stream: prettyStdOut
        }]
    });
};
