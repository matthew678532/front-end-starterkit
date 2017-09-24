'use strict'

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
			del = require('del'),
			pump = require('pump'),
			browsersync = require('browser-sync').create()
			config = require('./config.js').options
