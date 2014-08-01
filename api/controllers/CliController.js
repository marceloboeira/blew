/**
 * CliController
 *
 * @description :: Server-side logic for managing clis
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	check: function(req, res) {
		
		return res.json({isValid:true});
	},

	paste: function(req, res) {
			
		var data = {
			name: req.param('name'),			
			language: req.param('language') || null,
			private: (req.param('private') == 'true'),
			content: req.param('content') || null,
			owner: req.user.id
		};	
		
		Paste.create(data, function (err, paste) {
			if (!err && paste) {
				return res.json(paste);
			}
			else {
				return res.json(err);
			}
		});


	}
};

