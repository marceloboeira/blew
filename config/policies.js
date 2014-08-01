
module.exports.policies = {

  '*': true,
  cli: 'isValidCliRequest',
  dashboard: 'isAuthenticated'

};
