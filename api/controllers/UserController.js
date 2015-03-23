/**
 * User Controller
 *
 * @type {Controller}
 */
module.exports = {

  /**
   * Get All Users
   *
   * @return {json}
   */
  getAll: function(req, res) {
    User.getAll().spread(function(users) {
      return res.json({data:users});
    }).fail(function(err) {
      return res.send(404);
    });
  },

  /**
   * Get a user based on his id
   *
   * @param  {id}
   * @return {json}
   */
  getOne: function(req, res) {
    User.getOne(req.param('id')).spread(function(data) {
    return res.json(data);
    }).fail(function(err) {
      return res.send(404);
    });
  },

  /**
   * Create a user
   *
   * @param  {[username]}
   * @param  {[type]}
   * @return {[type]}
   */
  create: function (req, res) {
    var data = {
      username: req.param('username'),
      email: req.param('email'),
      first_name: req.param('first_name'),
      role: req.param('role')
    };

    User.create(model).exec(function(err, data) {
      if (err) return res.send(404);
      User.publishCreate(model.toJSON());
      res.json(model);
    });
  }
};
