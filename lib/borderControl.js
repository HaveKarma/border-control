'use strict';
var setupSocialSignin = require('./setupSocialSignin');


module.exports = function(app) {
    var apiKeys = require('karmashared/lib/Config.json').apiKeys[app.get('env')];

    setupSocialSignin(app,
    {
        siteName: 'facebook',
        scope: ['email', 'friends_photos', 'user_photos'],
        login: true,
        credentials: {
            clientID: apiKeys.facebook.appId,
            clientSecret: apiKeys.facebook.appSecret,
            profileFields: ['id', 'displayName', 'photos', 'emails',
                'username', 'name'
            ]
        }

    });

    setupSocialSignin(app,
    {
        siteName: 'linkedin',
        packageName: 'passport-linkedin-oauth2',
        scope: ['r_emailaddress', 'r_basicprofile', 'r_fullprofile', 'r_network'],
        state: 'SOME STATE',
        login: true,
        credentials: {
            clientID: apiKeys.linkedin.clientID,
            clientSecret: apiKeys.linkedin.clientSecret,
            profileFields: ['id', 'first-name', 'last-name',
                'email-address'
            ]
        }

    });

    setupSocialSignin(app,
    {
        siteName: 'twitter',
        login: false,
        credentials: {
            consumerKey: apiKeys.twitter.consumerKey,
            consumerSecret: apiKeys.twitter.consumerSecret
        }

    });

    setupSocialSignin(app,
    {
        siteName: 'foursquare',
        login: false,
        credentials: {
            clientID: apiKeys.foursquare.clientID,
            clientSecret: apiKeys.foursquare.clientSecret,
        }

    });

    setupSocialSignin(app,
    {
        siteName: 'ebay',
        login: false,
        credentials: {
            devName: apiKeys.ebay.devName,
            cert: apiKeys.ebay.cert,
            appName: apiKeys.ebay.appName,
            ruName: apiKeys.ebay.ruName,
            sandbox: apiKeys.ebay.sandbox
        }

    });

};
