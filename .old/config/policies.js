
module.exports.policies = {
	
  '*': 'isPjaxRequest',
  cli: 'isValidCliRequest',
  User: {
  	'change-password': 'isAuthenticated',
  	'change-password-post': 'isAuthenticated'
  },
  dashboard: ['isPjaxRequest','isAuthenticated'],
  
};
