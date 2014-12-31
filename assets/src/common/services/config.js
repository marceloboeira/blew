angular.module( 'services.config', ['lodash']).service('config',['lodash', function(lodash) {
	return {
		siteName: 'BLEW',
		siteUrl: '/',
		apiUrl: '/api',
		currentUser: false
	};
}]);
