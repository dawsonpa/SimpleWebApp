
"use strict";
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const PrettyStream = require('bunyan-prettystream');
const fs = require('fs')
const https = require('https')

const prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);
/**
 * The express.js server.
 */
module.exports = function ($injector, log, glob, express, Promise, moment,) {
    const app = express();
    const port = process.env.PORT || 8080;
    const env = process.env.NODE_ENV

    /**
     * @description Stamp every request with the process id that handled it.
     * @param {object} req - express request object
     * @param {object} res - express response object
     * @param {function} next - express next handler
     */

    app.use((req, res, next) => {
        res.set('x-process-id', process.pid);
        next();
    });

    /**
     * Security.
     */
    const ninetyDaysInMilliseconds = moment.duration(90, 'days').asMilliseconds();
    app.use(helmet());
    app.use(helmet.hidePoweredBy({setTo: `barberAppServer/V1`}));
    app.use(helmet.hsts({maxAge: ninetyDaysInMilliseconds}));

    app.use(cors());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(require('express-bunyan-logger')({
        name: 'patientHTTPLogger',
        streams: [{
            level: 'info',
            type: 'raw',
            stream: prettyStdOut
        }]
    }));

    // The routes are not registered like standard modules since they are used by this module. Instead they are resolved
    // directly with an express router that matches the file path. So /routes/foo/bar.js will serve HTTP routes as
    // http://example.com/foo/bar/
    const files = glob.sync("routes/**/*.js");
    files.forEach(function (file) {
        // Get the path minus the routes folder and the .js extension.
        let route = file.substring(6, file.length - 3);
        if (route.substr(route.length - 6) === "/index") route = route.substr(0, route.length - 5);

        // Create an express router.
        const router = Promise.promisifyAll(express.Router());

        // Resolve the route module but pass in the router as a local variable.
        $injector.resolvePath(file, { router: router });

        // Register the router with express.
        app.use(route, router);
    });

    // Handle errors by logging them and returning a 500.
    app.use(function (err, req, res, next) {
        log.error(err);
        if (err.stack) err.stackTrace = err.stack;
        res.status(err.status ? err.status : 500).send(err);
    });

    // Return an object with a start method.
    return {
        start: async  () => {
            return Promise.fromCallback(cb => {
              app.listen(port, cb);
            }).then(function () {
                return port
            });
        }
    };
};
