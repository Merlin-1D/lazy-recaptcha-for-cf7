module.exports = function (grunt) {

	'use strict';

	// Project configuration
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		addtextdomain: {
			options: {
				textdomain: 'cf7-lazy-recaptcha',
			},
			update_all_domains: {
				options: {
					updateDomains: true
				},
				src: ['*.php', '**/*.php', '!\.git/**/*', '!bin/**/*', '!node_modules/**/*', '!tests/**/*']
			}
		},

		wp_readme_to_markdown: {
			your_target: {
				files: {
					'README.md': 'readme.txt'
				}
			},
		},

		makepot: {
			target: {
				options: {
					domainPath: '/languages',
					exclude: ['\.git/*', 'bin/*', 'node_modules/*', 'tests/*'],
					mainFile: 'cf7-lazy-recaptcha.php',
					potFilename: 'cf7-lazy-recaptcha.pot',
					potHeaders: {
						poedit: true,
						'x-poedit-keywordslist': true
					},
					type: 'wp-plugin',
					updateTimestamp: true
				}
			}
		},

		babel: {
			options: {
				sourceMap: true,
				presets: ['@babel/preset-env']
			},
			dist: {
				files: {
					'dist/index.js': 'src/index.js'
				}
			}
		},
		uglify: {
			options: {
				sourceMap: {
					includeSources: true
				},
				sourceMapIn: 'dist/index.js.map',
			},
			my_target: {
				files: {
					'dist/index.min.js': ['dist/index.js']
				}
			}
		}
	});


	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-wp-i18n');
	grunt.loadNpmTasks('grunt-wp-readme-to-markdown');

	grunt.registerTask('default', ['i18n', 'readme', 'babel', 'uglify']);
	grunt.registerTask('js', ['babel', 'uglify']);
	grunt.registerTask('i18n', ['addtextdomain', 'makepot']);
	grunt.registerTask('readme', ['wp_readme_to_markdown']);

	grunt.util.linefeed = '\n';

};
