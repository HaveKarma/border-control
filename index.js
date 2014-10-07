'use strict';
var _ = require('underscore');
var setupSocialSignin = require('./lib/setupSocialSignin');

module.exports = function(app, config, loginUtils) {
    // border-control currently expects:
    // app-  an express instance
    // config - the border control config information for each site
    // loginUtils - @TODO - this should not be here, since it's tied to karma
    // It should just be two callback functions for approve/deny
    _.each(config, function(site){
        var credentials = {};
        setupSocialSignin(app, site, loginUtils);
    });
};
