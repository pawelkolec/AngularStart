module.exports = function(grunt) {
	'use strict';

    var path = require('path');

    grunt.initConfig({
        express: {
			dev: {
		  		options: {
					script: 'server.js',
					background: true,
  					livereload: true
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
				files:  [ 'src/app/**/*.less' ],
				tasks:  [ 'less' ],
			    options: {
		      		livereload: true,
			    }
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
					{ expand: true, cwd: 'src', src: ['app/**/*.html'], dest: 'dist' },
					{ expand: true, cwd: 'src', src: ['app/img/**'], dest: 'dist' },
				],
			},
		},

		less: {
			styles: {
	            files: [
	                {
	                  expand: true,
	                  cwd: 'src/',
	                  src: ['src/app/**/*.less'],
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
					'src/index.html': ['bower.json', 'src/app/app.js', 'src/app/**/*.js', '!src/app/**/*.spec.js', 'src/app/css/**/*.css'],
				},
				cwd: 'src'
			}
		},

		karma: {
			unit: {
				options: {
					files: [
						'src/bower_components/jquery/dist/jquery.js',
			            'src/bower_components/angular/angular.js',
      					'src/bower_components/angular-mocks/angular-mocks.js',
			            'src/bower_components/angular-ui-router/release/angular-ui-router.js',
						'src/app/app.js',
						'src/app/**/*.js'
					],
					browsers : ['Chrome', 'Firefox'],
				    plugins : [
			            'karma-chrome-launcher',
			            'karma-firefox-launcher',
			            'karma-jasmine'
		            ],
				    autoWatch : true,
				    frameworks: ['jasmine']
				}
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
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('build:src', ['wiredep', 'less', 'injector:local_dependencies']);
	grunt.registerTask('build:dist', ['clean:dist', 'build:src', 'useminPrepare', 'concat:generated', 'cssmin:generated', 'uglify:generated', 'usemin', 'processhtml', 'copy']);

	grunt.registerTask('serve', ['build:src', 'express:dev', 'watch:reload']);
	grunt.registerTask('serve:dist', ['build:dist', 'express:prod']);
}
