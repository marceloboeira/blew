
module.exports = {

	view: function (req, res) {
		var username = req.param('username');
		
		User.findOne({id:username})
			.populate('keys')
			.populate('pastes')
			.exec(function(err, user){
				if (err || !user) {
					User.findOne({username:username})
						.populate('keys')
						.populate('pastes')
						.exec(function(err, user){
							if (err || !user) return res.notFound();
							return res.view({user: user});
					});
				}
				else {
					return res.view({user: user});	
				}
		});
	}
};

