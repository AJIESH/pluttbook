var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var nodemon = require('gulp-nodemon');

gulp.task('connect', function(){
	connect.server({
		root:'./public',
		port:4000,
		livereload: true
	})
});

gulp.task('build-js', function(){
	console.log('Bundling application javascript');
	var stream = browserify('./public/app/app.js',{debug: true})
		.bundle()
		.pipe(source('concat-app.js'))
		.pipe(gulp.dest('./public'))
		.pipe(connect.reload());
	return stream;
});

gulp.task('build-html', function(){
    console.log('Bundling application html');
    gulp.src('./public/app/**/*.html')
        .pipe(connect.reload());
});

gulp.task('build-css', function(){
	console.log('Bundling application css');
	gulp.src('./public/app/**/*.css')
		.pipe(concat('index.css'))
		.pipe(gulp.dest('./public'))
		.pipe(connect.reload());
});

gulp.task('watch-server', function () {
	nodemon({
		script: 'server.js',
		ext: 'js',
		env: { 'NODE_ENV': 'development' }
	});
});

gulp.task('watch', function(){
	gulp.watch('./public/app/**/*.js', ['build-js']);
	gulp.watch('./public/app/**/*.html', ['build-html']);
	gulp.watch('./public/app/**/*.css', ['build-css']);
});

gulp.task('default', ['build-js', 'build-html', 'build-css', 'watch', 'watch-server']);