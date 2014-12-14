/**
 * AboutController
 *
 * @description :: Server-side logic for managing Abouts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {	
  index: function (req, res) {
    return res.view({title: res.__('About')});
  },
  
  statistics: function (req, res) {
    return res.view({title: res.__('Statistics')});
  }
};

