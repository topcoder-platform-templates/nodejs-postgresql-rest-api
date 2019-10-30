'use strict';

/*
 * Copyright (c) 2016 TopCoder, Inc. All rights reserved.
 */

/**
 * Contains all routes.
 */

module.exports = {
  '/tests': {
    post: {
      controller: 'TestController',
      method: 'createTest'
    },
    get: {
      controller: 'TestController',
      method: 'getTests'
    }
  },
  '/tests/:id': {
    get: {
      controller: 'TestController',
      method: 'getTestById'
    },
    put: {
      controller: 'TestController',
      method: 'updateTest'
    },
    delete: {
      controller: 'TestController',
      method: 'deleteTest'
    }
  }
};
