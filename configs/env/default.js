'use strict';

module.exports = {
    hostname: "0.0.0.0",
    templateEngine: 'swig',
    // The secret should be set to a non-guessable string that
    // is used to compute a session hash
    sessionSecret: 'sessionSecret',

    // The name of the MongoDB collection to store sessions in
    sessionCollection: 'sessions', 

    // The session cookie settings
    sessionCookie: { 
    	path: '/',
    	httpOnly: true,
    	// If secure is set to true then it will cause the cookie to be set
    	// only when SSL-enabled (HTTPS) is used, and otherwise it won't
    	// set a cookie. 'true' is recommended yet it requires the above
    	// mentioned pre-requisite.
    	secure: false,
    	// Only set the maxAge to null if the cookie shouldn't be expired
    	// at all. The cookie will expunge when the browser is closed.
    	maxAge:  10 * 12 * 30 * 24 * 60 * 60 * 1000
    },

    // The session cookie name
    sessionName: 'sessionName.sid'
};
