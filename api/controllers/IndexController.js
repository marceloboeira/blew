/**
 * IndexController
 *
 * @description :: Server-side logic for managing indices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function (req, res) {
  	Paste.find().populate('owner').sort({ createdAt: 'desc' }).limit(10).exec(function(err, lp) {
  		return res.view({title:'Index_1',lastPastes: lp});
  	});
  }
};

