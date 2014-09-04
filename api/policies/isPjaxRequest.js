
module.exports = function(req, res, cb) {
  
  console.log(req.isAjax);
  console.log(req.isSocket);
  
  req.isPjax = (req.param('_pjax') !== undefined) && req.isAjax();
  
  sails.config.views.layout = (req.isPjax) ? 'layout/pjax' : 'layout/default';

  return cb();
};
