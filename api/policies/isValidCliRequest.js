
module.exports = function(req, res, cb) {

	User.findOne({cliKey:req.param('key')}).exec(
		function(err, user){
			if (!err && user) {
				req.user = user;
				return cb();
			}

			return res.json({error:true,
							message:res.__('Invalid API key')});
	});
};
