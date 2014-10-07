'use strict';
var _ = require('underscore');
var setupSocialSignin = require('./lib/setupSocialSignin');

module.exports = function(app, config, loginUtils) {
    // border-control currently expects an express instance
    _.each(config, function(site){
        console.log('BORDER-CONTROL ' + JSON.stringify(site, null, 4));
        var credentials = {};
        setupSocialSignin(app, site, loginUtils);
    });
};
