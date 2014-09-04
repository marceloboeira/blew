/**
 * Verify the '_pjax' param and change the layout.
 *
 */
module.exports = function(req, res, cb) {
 
  req.isPjax = (req.param('_pjax') !== undefined);  
  sails.config.views.layout = (req.isPjax) ? 'layout/pjax' : 'layout/default';
  return cb();
};