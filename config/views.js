/** 
 * HTML Minification
 * 	
 * @see https://github.com/vimia/blew/issues/37
 */
var minify = require('html-minifier').minify;
var ejs = require('ejs-locals');

var parsing = function(path, options, cb) {
    options.locals = options.locals || {};
    
    // Override the layout file
    options.locals._layoutFile = '/layout/default.ejs';
    ejs(path, options, function(err, str){
    	  str = minify(str,{collapseWhitespace: true, removeComments: true, collapseBooleanAttributes: true, minifyJS: true, minifyCSS: true, minifyURLs: true });
      return cb(err, str);
    });

};

module.exports.views = {
  engine: {
    ext: 'ejs',
    fn: parsing // <-- Function to parse the view
  },
  layout: false // <-- Disable layout
};