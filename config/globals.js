module.exports.globals = {
	_: true,
	async: true,
	sails: true,
	services: true,
	models: true,

	baseUrl: process.env.BASE_URL ||  'http://blew.io',
	host: process.env.DEV_DB_ADAPTER ||  'blew.io',
	
};
