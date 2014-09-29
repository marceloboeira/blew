
module.exports = {
  view: function (req, res) {
 		var id = req.param('id');		
		
		Paste.findOne(id).populate('owner').exec(function(err, paste){	 	
			if (err || !paste) return res.notFound();

			/** 
			 * Private paste view to owner only
			 * 	
			 * @see https://github.com/vimia/blew/issues/10
			 */
			if (paste.isPrivate()) {
				if (!req.isAuthenticated() || (!paste.isOwner(req.user.id))) {
						return res.notFound();
						//return res.forbidden(res.__('This paste is private, only the owner has access.'));	
				}
			}

			return res.view({title: paste.name, paste: paste });
		});
  }	
};

