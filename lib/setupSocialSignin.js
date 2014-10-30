'use strict';
var passport = require('passport');
var User = require('karmashared').Schemas.User;
// var logger          = require('karmashared').Utils.logger;
var loginUtils = null;
// sets up the strategy
var _setupStrategy = function(app, Strategy, options) {
    options.credentials.passReqToCallback = true;
    options.credentials.callbackURL = app.baseDomain + '/auth/' + options.siteName + '/callback';
    passport.use(options.siteName+'-karma-auth', new Strategy(options.credentials,
        function(req, accessToken, refreshToken, profile, done) {
            // logger.log('info', 'BORDERCONTROL CALLBACK'.red, {accessToken: accessToken, refreshToken: refreshToken, profile: profile});
            var key = { token: accessToken};
            if (refreshToken) {
                key.tokenSecret = refreshToken;
            }
            loginUtils.processSuccessfulAuthorization(req, options.siteName, profile, done, key, options.login);
            // loginUtils.findOrCreateUser(options.siteName, profile, done, key);
        }));
};

// setup the serialization for passport
var _setupSerialization = function() {
    // passport stuff
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            if (err || !user) {
                done(err, false);
            }
            else {
                done(null, user);
            }

        });
    });
};

// setup auth and callback routes.
var _setupRoutes = function(app, options) {
    // if we're allowing login, set it up here.
    app.get('/auth/'+options.siteName, passport.authenticate(options.siteName+'-karma-auth', {
        scope: options.scope,
        state: options.state || null
    }));

    app.get('/auth/'+options.siteName+'/callback', passport.authenticate(options.siteName+'-karma-auth', {
        failureRedirect: '/loginerror'
    }), loginUtils.processLogin);

};


// exported function to set everything up
// app - the express app instance
// options - an object containing the options necessary
// to set it up (siteName, scope, credentials)
module.exports = function(app, options, _loginUtils) {
    if (!loginUtils) {
        loginUtils = _loginUtils;
    }
    options = options || {};
    if (!options.siteName) {
        throw 'siteName is a required attribute!';
    }
    else {
        options.siteName = options.siteName.trim().toLowerCase();
    }

    // try and setup the strategy dynamically, but may have to abstract this
    // step to "options"
    var packageName = '../../../node_modules/' + (options.packageName || 'passport-'+ options.siteName);
    // logger.log('error', 'BORDERCONTROL SETUP'.red, {packageName: packageName});
    var _strategy = require(packageName).Strategy;

    _setupRoutes(app, options);
    _setupSerialization();
    _setupStrategy(app, _strategy, options);



};
