angular.module( 'services.utils', ['lodash']).service('utils', ['lodash', 'config', function(lodash, config) {
	return {
		prepareUrl: function(uriSegments) {
			apiUrl = lodash.isNull(config.apiUrl) ? 'https://api.test' : config.apiUrl;
			return apiUrl + "/" + uriSegments;
		},
		showDatetime: function(string, format) {
			return moment(string).fromNow();
		}

	};

}]);
