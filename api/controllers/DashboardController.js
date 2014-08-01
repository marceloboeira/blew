/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `DashboardController.index()`
   */
  index: function (req, res) {
    return res.view({user: req.user});
  }
};

