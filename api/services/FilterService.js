/** 
 * View Filters
 *
 * @see https://github.com/vimia/blew/issues/23
 */
module.exports = {

	/** 
	 * Apply moment.js at server-side as a  filter
	 * 
	 * @param d - Dirty Date
	 * @return 'x days ago' 
	 */
	dateFromNow: function(d) {
		var moment = require('moment');
		return moment(d).fromNow();
	}
	//TODO - Date Component creator..
}

