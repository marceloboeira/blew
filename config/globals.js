module.exports.globals = {
	_: true,
	async: true,
	sails: true,
	services: true,
	models: true

	baseUrl: process.env.BASE_URL ||  'http://blew.io',
	baseHost: process.env.BASE_HOST ||  'blew.io',
	package: require('../package.json'),

	GA_ID: process.env.GA_ID || null,
	MIXPANEL_ID: process.env.MIXPANEL_ID || null,
};
