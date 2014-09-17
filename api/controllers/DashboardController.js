/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
  index: function (req, res) {
    return res.view({title:res.__('Dashboard')});
  },

  "getting-started": function (req, res) {
    return res.view({title:res.__('Getting Started')});
  }

};

