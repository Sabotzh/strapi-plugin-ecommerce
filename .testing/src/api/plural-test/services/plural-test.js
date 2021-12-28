'use strict';

/**
 * plural-test service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::plural-test.plural-test');
