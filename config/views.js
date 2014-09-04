var minify = require('html-minifier').minify;
var ejs = require('ejs');
var parsing = function(path,options,fn) {
	ejs.renderFile(path, options, function(err, str){
  	str = minify(str,{collapseWhitespace: true});
  	return fn(err, str);
  	});
  	
};

module.exports.views = {
  engine: {
  	ext: 'ejs',
  	fn: parsing
  },
  layout: 'layout/default'
};
