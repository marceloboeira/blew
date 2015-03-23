/**
 * DashboardController
 *
 * @type {Controller}
 */
module.exports = {

  index: function (req, res) {
    return res.view({title:res.__('Dashboard')});
  },

  "getting-started": function (req, res) {
    return res.view({title:res.__('Getting Started')});
  }
};

