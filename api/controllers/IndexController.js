/**
 * IndexController
 *
 * @description :: Server-side logic for managing indices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function (req, res) {
  	Paste.find().where({ 'private':false }).populate('owner').sort({ createdAt: 'desc' }).limit(10).exec(function(err, lp) {
  		return res.view({title:res.__('Home'),lastPastes: lp});
  	});
  }
};

