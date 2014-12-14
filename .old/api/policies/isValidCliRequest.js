 /** 
  * Check if the Request is a valid CLI Request, to be valid it 
  * needs the CLI key corresponding do the user key.
  * 
  */
module.exports = function(req, res, cb) {
  User.findOne({cliKey:req.param('key')}).exec(function(err, user){
	  if (!err && user) {
		  req.user = user;
			return cb();
		}
		return res.json({error: true, message: res.__('Invalid API key')});
	});
};
