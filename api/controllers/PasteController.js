/**
 * PasteController
 *
 * @type {Controller}
 */
module.exports = {

  /**
   * [view description]
   * @param  {[type]}
   * @param  {[type]}
   * @return {[type]}
   */
  view: function (req, res) {
    var id = req.param('id');
  Paste.findOne(id).populate('owner').exec(function(err, paste){
    if (err || !paste) return res.notFound();

    /**
     * Private paste view to owner only
     *
     * @see https://github.com/vimia/blew/issues/10
     */
    if (paste.isPrivate()) {
      if (!req.isAuthenticated() || (!paste.isOwner(req.user.id))) {
        return res.notFound();
      }
    }

    /**
    * Paste expired
    *
    * @see https://github.com/vimia/blew/issues/3
    */
    if (paste.itExpires() && paste.isExpired()) {
      return res.notFound();
    }

    return res.view({title: paste.name, paste: paste });
  });
  }
};

