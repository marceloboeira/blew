/**
 * PasteController
 *
 * @description :: Server-side logic for managing pastes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	view: function (req, res) {
		var id = req.param('id');
		Paste.find(id).exec(function(e,r){
			res.json(r);
		});
		
	}
	
};

