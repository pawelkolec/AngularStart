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
		  	options: {
    			livereload: true
  			},
    		express: {
      			files:  [ 
                    '**/*.js'
                ],
      			tasks:  [ 'express:dev' ],
      			options: {
        			spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified 	express won't be reloaded
      			}
    		}
  		},
        
        processhtml: {
			dist: {
		  		files: {
					'dist/index.html': ['app/index.html']
			  	}
			}
	  	},
		
		cssmin: {
	  		target: {
				files: {
			  		'dist/style.min.css': ['app/bower_components/bootstrap/dist/css/bootstrap.css', 'app/bower_components/bootstrap/dist/css/bootstrap-theme.css', 'app/css/build/**/*.css']
				}
		  	}
  		},
		
		copy: {
			main: {
				files: [
					{ expand: true, cwd: 'app', src: ['partials/**'], dest: 'dist' },
					{ expand: true, cwd: 'app', src: ['img/**'], dest: 'dist' },
				],
			},
		},
		
		uglify: {
			main: {
				files: {
					'dist/build.min.js': [
						'app/bower_components/jquery/dist/jquery.js',
						'app/bower_components/angular/angular.js',
						'app/bower_components/angular-resource/angular-resource.js',
						'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
						'app/bower_components/angular-animate/angular-animate.js',
						'app/js/**/*.js'
					]
				}
			}
		},
		
		less: {
            production: {
                files: [
                    {
                      expand: true,
                      cwd: 'app/css/',
                      src: ['**/*.less'],
                      dest: 'app/css/build',
                      ext: '.css'
                    }
                  ]
            },
        },

		clean: {
			dist: ["dist"],
			removeCss: ["app/css/build"]
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
	
	grunt.registerTask('build-dist', ["clean:dist", "processhtml", "less:production", "cssmin", "clean:removeCss", "uglify", 'copy']);
	grunt.registerTask('serve', ['express:dev', 'watch']);
	grunt.registerTask('serve:dist', ['build-dist', 'express:prod']);
}