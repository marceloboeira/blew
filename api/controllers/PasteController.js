
module.exports = {

	view: function (req, res) {
		var id = req.param('id');
				
		Paste.findOne(id)
			 .populate('owner')
			 .exec(function(err, paste){
			 	
			 	if (err || !paste) return res.notFound();


				return res.view({ paste: paste });
		});
		
	}
	
};

