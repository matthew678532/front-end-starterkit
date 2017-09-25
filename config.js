'use strict'

const options = {
	src: {
		base: 'src',
		assets: 'src/assets',
		pug: 'src/pug',
		sass: 'src/assets/css',
		js: 'src/assets/js',
		img: 'src/assets/img'
	},
	dist: {
		base: 'dist',
		assets: 'dist/assets',
		sass: 'dist/assets/css',
		js: 'dist/assets/js',
		img: 'dist/assets/img'
	},
	suffix: {suffix: '.min'}
}

module.exports.options = options
