'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var notifier = require('node-notifier');

var config = require('./config.json');

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:"+config.port,
        port: 7000,
	});
});

gulp.task('nodemon', function (cb) {
	
	var started = false;

	console.log("nodemon");
	
	return nodemon({
		script: config.starter
	}).on('start', function () {
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

gulp.task('clean', function() {
 return gulp.src(config.dist)
 .pipe(clean());
});

gulp.task('default', ['browser-sync'], function () {
	notifier.notify({ title: 'Gulp', message: 'Start nodemon on '+config.starter });
	gulp.watch(config.watch, reload);
});

gulp.task('build',['clean'], function(){
 gulp.src(config.path+'/**/*.*')
 .pipe(gulp.dest(config.dist));
});