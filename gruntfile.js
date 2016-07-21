module.exports = function(grunt) {
	'use strict';

    var path = require('path');

    grunt.initConfig({
        express: {
			dev: {
		  		options: {
					script: 'server.js',
					background: true
			  	}
			},
		  	prod: {
      			options: {
        			script: 'server.js',
        			node_env: 'production',
					background: false
      			}
    		}
	  	},

        watch: {
			reload: {
				files:  [ '**/*.less' ],
				tasks:  [ 'less' ]
			}
  		},

        processhtml: {
			dist: {
		  		files: {
					'dist/index.html': ['src/index.html']
			  	},
				options: {
					commentMarker: 'processhtml'
				}
			}
	  	},

		useminPrepare: {
			html: ['src/index.html'],
		    options: {
		    root: 'src',
		    dest: 'dist'
		    }
		},

		usemin: {
			html: ['dist/index.html']
		},

		copy: {
			main: {
				files: [
					{ expand: true, cwd: 'src', src: ['**/*.html', '!**/index.html'], dest: 'dist' },
					{ expand: true, cwd: 'src', src: ['img/**'], dest: 'dist' },
				],
			},
		},

		less: {
			styles: {
	            files: [
	                {
	                  expand: true,
	                  cwd: 'src/',
	                  src: ['**/*.less', '!**/bower_components/**'],
	                  dest: 'src/css',
	                  ext: '.css'
	                }
	              ]
			  }
        },

		wiredep: {
			task: {
				src: [
					'src/index.html'
				],
			}
		},

		includeSource: {
			options: {
				basePath: 'src'
			},
			myTarget: {
				files: {
					'src/index.html': 'src/index.html'
				}
			}
		},

		injector: {
			options: {
				addRootSlash: false,
        		ignorePath: 'src/'
			},
			local_dependencies: {
				files: {
					'src/index.html': ['bower.json', 'src/app.js', 'src/**/*.js', '!src/**/*.spec.js', 'src/css/**/*.css', '!**/bower_components/**'],
				},
				cwd: 'src'
			}
		},

		clean: {
			dist: ["dist"],
			removeCss: ["src/css/build"]
		}
    });

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-regex-replace');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-include-source');
	grunt.loadNpmTasks('grunt-injector');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('build:src', ['wiredep', 'less', 'injector:local_dependencies']);
	grunt.registerTask('build:dist', ['clean:dist', 'build:src', 'useminPrepare', 'concat:generated', 'cssmin:generated', 'uglify:generated', 'usemin', 'processhtml', 'copy']);

	grunt.registerTask('serve', ['build:src', 'express:dev', 'watch:reload']);
	grunt.registerTask('serve:dist', ['build:dist', 'express:prod']);
}
