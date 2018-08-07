/**
 * A module that allows for running Mongoose sync.
 */
"use strict";

module.exports = ($injector, log, glob, config, db, Promise) => {
  // Resolve each model file to make sure they are registered with Mongoose.
  // Normally these would just be resolved as needed, but we need them to all be loaded for the sync to work.
  const files = glob.sync("models/**/*.js");
  files.forEach(file => {
    // This assumes the module name matches the file name, which is the default behavior
    const name = file.substring(7, file.length - 3);
    $injector.resolve(name);
  });

  return {
    connect: () => {
      return new Promise((resolve, reject) => {
        log.info("Connecting to database...");
        const dbConfig = config.get('db');
        db.on('connected', function () {
          log.info('Mongoose connection open to ' + dbConfig.uri);
          resolve()
        });

        // If the connection throws an error
        db.on('error',function (err) {
          log.info('Mongoose db connection error: ' + err);
          reject(err)
        });

        // When the connection is disconnected
        db.on('disconnected', function () {
          log.info('Mongoose scorecard connection disconnected');
          resolve();
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', function() {
          db.close(function () {
            log.info('Mongoose db connection disconnected through app termination');
            process.exit(0);
            resolve();
          });
        });
      })
    }
  }
};
