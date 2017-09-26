/**
 * This is our gulp file! Here we implement a variety of tasks
 * and watchers to help automate common development tasks such as
 * compiling sass to css, and concatenate multiple js files. For full
 * documentation please refer to the usage heading of the readme file
 * at https://github.com/matthew678532/front-end-starterkit/blob/master/README.md
 */

'use strict'

// Here we pull in all of the gulp plugins, and packages we require!
// To learn more about any of the packages used, visit:
// https://www.npmjs.com/, and simply search for the package by name.
const gulp = require('gulp'),
			sass = require('gulp-sass'),
			pug = require('gulp-pug'),
			prefix = require('gulp-autoprefixer'),
			cssnano = require('gulp-cssnano'),
			uglify = require('gulp-uglify'),
			imagemin = require('gulp-imagemin'),
			rename = require('gulp-rename'),
			notify = require('gulp-notify'),
			cache = require('gulp-cache'),
			concat = require('gulp-concat'),
			del = require('del'),
			pump = require('pump'),
			browsersync = require('browser-sync').create(),
			runsequence = require('run-sequence'),
			opts = require('./config.js').options

/**
 * Task: pug
 * Description: The purpose of the pug task is to take all of
 * the pug files located within the src directory, and run them
 * through the gulp-pug plugin, which transforms the pug files to
 * html and then minifys them. browsersync.stream() is called to
 * inform browser sync that a change has been made, and that the
 * browser needs to reflect this.
 */
gulp.task('pug', function(cb) {
	pump([
		gulp.src([`${opts.src.pug}/*.pug`, `!${opts.src.pug}/layout.pug`]),
		pug(),
		gulp.dest(opts.dist.base),
		browsersync.stream()
	], cb)
})

/**
 * Task: sass
 * Description: The purpose of the sass task is to take the main.sass
 * file located within the src/assets/css directory, and applies
 * the following transformations,
 * 1) convert sass to css
 * 2) add autoprefixes to css properties for cross-browser
 * compatibility
 * 3) rename the css file to main.min.sass
 * 4) minify the css file for improved loading times
 * Once these transformations have been accomplished the output file
 * is directed to the dist directory, and browsersync receives a
 * request to reload the browser.
 */
gulp.task('sass', function(cb) {
	pump([
		gulp.src(`${opts.src.sass}/main.sass`),
		sass(),
		prefix(),
		gulp.dest(opts.dist.sass),
		rename(opts.suffix),
		cssnano(),
		gulp.dest(opts.dist.sass),
		browsersync.stream()
	], cb)
})

/**
 * Task: js
 * Description: The js gulp task collects all js files from the
 * src/assets/js directory, and pipes them through the following
 * transformations,
 * 1) All js files are concatenated (inc vendor ones like jQuery!)
 * 2) The output js file (main.js) is suffixed with min to signify
 * minification
 * 3) The js file is then minified
 * Once these transformations take place, the output js file is
 * piped to the dist/ directory, and browsersync reloads the browser.
 */
gulp.task('js', function(cb) {
	pump([
		gulp.src(['node_modules/jquery/dist/jquery.min.js', `${opts.src.js}/modules/*.js`, `${opts.src.js}/main.js`]),
		concat('main.js'),
		rename(opts.suffix),
		uglify(),
		gulp.dest(opts.dist.js),
		browsersync.stream()
	], cb)
})

/**
 * Task: image
 * Description: The image task takes any image located within the
 * src/assets/img directory and sub-directories of this, and pipes
 * them through an image minification process, to be outputted
 * within the dist/ directory. browsersync is then informed of
 * this and updates the browser appropriately.
 */
gulp.task('image', function(cb) {
	pump([
		gulp.src(`${opts.src.img}/**/*`),
		cache(imagemin({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true
		})),
		gulp.dest(opts.dist.img),
		browsersync.stream()
	], cb)
})

/**
 * Task: browsersync
 * Description: This browsersync task initialises a browsersync
 * server using the dist/ directory on port 8080. When ran, this
 * task will automatically launch, and continually run the server
 * with the options specified.
 */
gulp.task('browsersync', function() {
	browsersync.init({
		server: {
			baseDir: opts.dist.base
		},
		port: 8080
	})
})

/**
 * Task: build
 * Description: The build task is used to run all build tasks
 * in sequence. Here the task will run the clean task first
 * to empty the dist/ folder of any old files, and then the
 * pug, sass, js and image tasks are ran in parallel as the order
 * of execution of these tasks really doesn't matter all too much!
 */
gulp.task('build', function(cb) {
	runsequence(
		'clean',
		['pug', 'sass', 'js', 'image'],
		cb
	)
})

/**
 * Task: clean
 * Description: The purpose of the clean task is to remove
 * any unwanted/old files which may have found there way into
 * the dist/ folder.
 */
gulp.task('clean', function() {
	return del([`${opts.dist.base}/**/*`])
})

/**
 * Task: watch
 * Description: The watch task is a bit different from all
 * other tasks, and simply waits on changes to code (pug/sass/js)
 * then re-runs the independant tasks to update the dist/ directory
 * and the reload the browser with the latest code.
 */
gulp.task('watch', function() {
	gulp.watch(`${opts.src.pug}/**/*.pug`, ['pug'])
	gulp.watch(`${opts.src.sass}/**/*.sass`, ['sass'])
	gulp.watch(`${opts.src.js}/**/*.js`, ['js'])
})

/**
 * Task: default
 * Description: The default task ties all tasks/watchers together
 * to create a full complient workflow, which builds the dist/
 * directory with the latest code, launches browsersync to view
 * the website, and continually watches all changes made, updating
 * the browser on the fly!
 */
gulp.task('default', function(cb) {
	runsequence(
		'build',
		'browsersync',
		'watch',
		cb
	)
})
