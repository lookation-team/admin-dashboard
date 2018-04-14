'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('sass', function () {
	return gulp.src('./public/sass/index.scss')
		.pipe(concat('index.css'))
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
	gulp.watch('./public/sass/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'sass:watch']);