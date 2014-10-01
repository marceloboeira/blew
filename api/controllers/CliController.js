/**
 * CliController
 *
 * @description :: Server-side logic for managing clis
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	check: function(req, res) {
		
		return res.json({ user:req.user,
						  isValid:true });
	},

	paste: function(req, res) {
			
		var data = {
			name: req.param('name'),			
			language: req.param('language') || null,
			private: (req.param('private') == 'true'),
			content: req.param('content') || null,
			expiresAt: req.param('expiresAt') || null, // @see https://github.com/vimia/blew/issues/3
			owner: req.user.id
		};	
		
		Paste.create(data, function (err, paste) {
			return res.json((!err && paste) ? paste : err);
		});


	}
};

