
module.exports = {

	me: function (req, res) {
		return res.json({user: req.user});
	},
	view: function (req, res) {
		var username = req.param('username');		
		User.findOne({id:username}).populate('keys').populate('pastes').exec(function(err, user) {
				if (err || !user) {
					User.findOne({username:username}).populate('keys').populate('pastes').exec(function(err, user) {
						if (err || !user) return res.notFound();
						return res.view({user: user,
													 title: res.__('%s Profile', user.name)});
					});
				}
				else {
					return res.view({user: user,
													 title: res.__('%s Profile', user.name)});
				}
		});
	},
	
	'change-password': function(req, res) {
		return res.view();	
	},

	'change-password-post': function(req, res) {
		var password = req.param('newPassword'),
		    confirmation = req.param('confirmation'),
				response = {
					error: true,
					erroData: null,
					message: res.__('Invalid data')
				};	
		if (password !== confirmation) {
		  response.error = true;
			response.message = res.__('Password and confirmation should be equal');
			return res.json(response);
		}	
		else {
			User.findOne(req.user.id).exec(function(err, user){
				user.changePassword(password,function(err, u){
					if (err) {
						response.error = true;
						response.message = res.__('Database error');
						response.errorData = err;
					}
					else {
						response.error = false;
						response.message = res.__('Done!');
					}
					
					return res.json(response);
				});
			})
		}
	}
};


