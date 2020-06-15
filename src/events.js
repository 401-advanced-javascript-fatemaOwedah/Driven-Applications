'use strict';
// Global Events pool
const events = require('events');
const eventsEmmiter = new events();
module.exports = eventsEmmiter;