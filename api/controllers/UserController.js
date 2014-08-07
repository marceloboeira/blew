
module.exports = {

	view: function (req, res) {
		var username = req.param('username');
				
		User.findOne({username:username})
			.populate('keys')
			.populate('pastes')
			.exec(function(err, user){
				if (err) return res.notFound();
				return res.view({user: user});
		});
		
	}
};

