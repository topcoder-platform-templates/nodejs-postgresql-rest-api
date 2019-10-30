'use strict';

/*
 * Copyright (c) 2016 TopCoder, Inc. All rights reserved.
 */

/**
 * This configuration of passport for express App.
 */
const _ = require('lodash');
const glob = require('glob');
const Path = require('path');
const config = require('config');
const helper = require('./common/helper');
/**
 * Configure routes for express
 * @param app the express app
 */
module.exports = (app) => {
  // load all routes.js in modules folder.
  glob.sync(Path.join(__dirname, './modules/**/routes.js')).forEach((routes) => {
    /* Load all routes */
    _.each(
      require(Path.resolve(routes)), // eslint-disable-line import/no-dynamic-require
      (verbs, path) => {
        _.each(verbs, (def, verb) => {
          const controllerPath = Path.join(
            Path.dirname(routes),
            `./controllers/${def.controller}`
          );
          const method = require(controllerPath)[def.method]; // eslint-disable-line import/no-dynamic-require
          if (!method) {
            throw new Error(`${def.method} is undefined`);
          }
          const actions = [];
          actions.push((req, res, next) => {
            req.signature = `${def.controller}#${def.method}`;
            next();
          });
          actions.push(method);
          app[verb](
            `/api/${config.version}${path}`,
            helper.autoWrapExpress(actions)
          );
        });
      }
    );
  });
};
