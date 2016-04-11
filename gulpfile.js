var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('connect', function(){
	connect.server({
		root:'./',
		port:4000,
		livereload: true
	})
});

gulp.task('build-js', function(){
	console.log('Bundling application javascript');
	var stream = browserify('./app/app.js',{debug: true})
		.bundle()
		.pipe(source('concat-app.js'))
		.pipe(gulp.dest('./'))
		.pipe(connect.reload());
	return stream;
});

gulp.task('build-html', function(){
    console.log('Bundling application html');
    gulp.src('./app/**/*.html')
        .pipe(connect.reload());
});

gulp.task('build-css', function(){
	gulp.src('./app/**/*.css')
		.pipe(concat('index.css'))
		.pipe(gulp.dest('./'))
		.pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch('app/**/*.js', ['build-js']);
	gulp.watch('app/**/*.html', ['build-html']);
	gulp.watch('app/**/*.css', ['build-css']);
});

gulp.task('default', ['build-js', 'build-html', 'build-css', 'watch', 'connect']);