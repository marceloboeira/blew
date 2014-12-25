/** 
 * HTML Minification
 *  
 * @see https://github.com/vimia/blew/issues/37
 */
var minify = require('html-minifier').minify;
var ejs = require('ejs-locals');

var parser = function(path, options, cb) {
  options.locals = options.locals || {};
    
  // Override the layout file
  options.locals._layoutFile = '/layouts/public.ejs';
  ejs(path, options, function(err, str){
    str = minify(str,{collapseWhitespace: true, conservativeCollapse: true, removeComments: true, collapseBooleanAttributes: true, minifyJS: true, minifyCSS: true, minifyURLs: true });
    return cb(err, str);
  });
};

/* Injecting the view-parser into the ejs engine */
module.exports.views = {
  engine: {
    ext: 'ejs',
    fn: parser 
  },
  layout: false 
};