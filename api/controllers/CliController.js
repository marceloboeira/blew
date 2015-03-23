/**
 * CliController
 *
 * @type {Controller}
 */
module.exports = {

  /**
   * Action to check user crecentials
   *
   * @return {json}
   */
  check: function(req, res) {
    return res.json({ user:req.user, isValid: true });
  },

  /**
   * Action to POST a paste from CLI Tool
   *
   * @return {json}
   */
  paste: function(req, res) {
    // Get data from POST
    var data = {
      name: req.param('name'),
      language: req.param('language') || null, // @todo Verify input
      private: (req.param('private') == 'true'), // default is false
      content: req.param('content') || null,
      expiresAt: req.param('expiresAt') || null, // @see https://github.com/vimia/blew/issues/3
      owner: req.user.id
    };

    Paste.create(data, function (err, paste) {
      return res.json((!err && paste) ? paste : err);
    });
  }
};

