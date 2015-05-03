'use strict';

var gulp             = require('gulp'),
    sass             = require('gulp-ruby-sass'),
    autoprefixer     = require('gulp-autoprefixer'),
    uglify           = require('gulp-uglify'),
    source           = require('vinyl-source-stream'),
    buffer           = require('vinyl-buffer'),
    browserify       = require('browserify'),
    gutil            = require('gulp-util'),
    sourcemaps       = require('gulp-sourcemaps'),
    annotate         = require('browserify-ngannotate'),
    reactify         = require('reactify');


gulp.task('sass', function(){
    return sass('./src/scss/main.scss', {
            style: 'compressed'
        })
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('browserify', function () {
    // set up the broserify instace on a task basis
    var b      = browserify({
        entries: './entry.js',
        debug: true,
        transform: [reactify]
    });

    return b
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here
            // .pipe(uglify())
            .on('error', gutil.log)
        .pipe(sourcemaps.write('./dist/js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', function(){
    gulp.watch(['./src/scss/**/*.scss'], ['sass']);
    gulp.watch(['./entry.js','./src/js/**/*.js'], ['browserify']);
});

gulp.task('default', ['sass','browserify','watch']);