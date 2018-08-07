"use strict";

// Set the working directory to this one.
process.chdir(__dirname);

// Create an injector.
const Injector = require("bolus");
const injector = new Injector();

// Register the required modules.
injector.registerRequires({
  bunyan: "bunyan",
  Promise: "bluebird",
  Mongoose: "mongoose",
  config: "config",
  _: "lodash",
  express: "express",
  moment: "moment",
  glob:'glob',
  bcrypt:'bcrypt-nodejs',
  jwt:'jsonwebtoken',
  passport: 'passport',
  recur: 'moment-recur',
  timekit:'timekit-sdk',
  timestamps: 'mongoose-timestamp',
  request: 'request-promise-native'
}, module);

// Register all of the JS files as modules except for the routes.
// (The routes are no registered on the global scope. See the server.js file for how they are handled.)
injector.registerPath(["models/*.js","env/*.js", "modules/*.js", "scripts/*.js","middleware/**/*.js","services/*.js","!routes/**","db.js","log.js","credentials.js","dbConnect.js", "service.js",]);

// Resolve the basic modules needed to start the server.
injector.resolve((dbConnect, service,log ) => {
    async function startService () {
      try{
        await dbConnect.connect();
        const port = await service.start();
        log.info(`service started on ${port}`)
      } catch (err) {
        log.error({err})
      }

  }

  return startService()
});
