/** 
 * Check if the user is fully authenticated
 * 
 */
module.exports = function(req, res, cb) {

  if (req.isAuthenticated()) {
    return cb();
  }
  return res.forbidden('You are not permitted to perform this action.');
};
