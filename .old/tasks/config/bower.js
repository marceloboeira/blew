/**
 * Install bower components.
 *
 * ---------------------------------------------------------------
 *
 * Installs bower components and copies the required files into the assets folder structure.
 *
 */

module.exports = function(grunt) {

	grunt.config.set('bower', {
		install: {
			options: {
				targetDir: './assets/components',
				layout: 'byType',
				install: true,
				verbose: true,
				cleanTargetDir: true,
				cleanBowerDir: false,
				bowerOptions: {

				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-bower-task');
};
