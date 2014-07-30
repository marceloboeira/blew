
module.exports = {

	view: function (req, res) {
		var id = req.param('id');
				
		Paste.findOne(id).populate('owner').exec(function(e,paste){
			res.view({ paste: paste });
		});
		
	}
	
};

