const gulp = require('gulp');
const webserver = require('gulp-webserver');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const shell = require('gulp-shell');
const systemjsBuilder = require('gulp-systemjs-builder');

gulp.task('server', () => {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            open: true,
            fallback: 'index.html',
        }));
});

gulp.task('styles', () => {
    gulp.src('./styles/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./styles/css'));
    gulp.watch('./styles/scss/**/*.scss', ['styles']);
});


gulp.task('compile', () => {
    const builder = systemjsBuilder('./', './scripts/config/system-config.js');
    builder.buildStatic('./scripts/main.js', 'bundle.js', {
        minify: true,
        mangle: false,
    })
        .pipe(gulp.dest('./build/scripts'));
});


gulp.task('clean', () => {
    gulp.src('./styles/css/**/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./build/css'));
});


gulp.task('dev', ['styles', 'server']);
gulp.task('build', ['compile', 'clean']);
gulp.task('deploy', shell.task([
    // 'firebase deploy'
    'node -v'
]))