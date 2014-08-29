
module.exports.policies = {
	
  '*': 'isPjaxRequest',
  cli: 'isValidCliRequest',
  dashboard: ['isPjaxRequest','isAuthenticated'],
  
};
