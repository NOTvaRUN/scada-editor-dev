module.exports = function(grunt) {
	grunt.initConfig({
		uglify : {
			options : {
				banner : "/** scada-editor minified package, 'https://www.npmjs.com/package/scada-editor', development branch is currently private, it will be publicly available once a stable version is released. **/"
			},
			build : {
				src : ["mxGraph src/index-mxGraph-copy.js", "editor/*.js"],
				dest : "dist/index.js"
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask("default", ["uglify"]);
};