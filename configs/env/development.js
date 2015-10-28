'use strict';

module.exports = {
	port: process.env.PORT || 3000,
    db: {
        uri : 'mongodb://localhost:27017/db_dev',
        options : {
            user : '',
            pass : ''
        }
    },
};