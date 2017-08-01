var application = {};

// Application settings
application.settings = {
	"httpPort": 3801,
        "port": 3900,
	"maintenance": false,
	"logging": true,
	"max_issue_limit_per_currency": 1000,
        "loggerPath":__dirname+'/logs',
	"env": (process.env.NODE_ENV) ? process.env.NODE_ENV : "DEVELOPMENT"
};
module.exports =  application;