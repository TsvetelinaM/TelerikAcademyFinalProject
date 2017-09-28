const gulp = require('gulp');
const webserver = require('gulp-webserver');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const shell = require('gulp-shell')

gulp.task('server', () => {
    gulp.src('public')
        .pipe(webserver({
            livereload: true,
            open: true,
            fallback: 'index.html',
        }));
});

gulp.task('styles', () => {
    gulp.src('./public/styles/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/styles/css'));
    gulp.watch('./public/styles/scss/**/*.scss', ['styles']);
});

gulp.task('compile', () => {
    gulp.src('./public/scripts/**/*.js')
        .pipe(babel({
            presets: ['env'],
        }))
        .pipe(uglify())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('./build/scripts'));
});

gulp.task('clean', () => {
    gulp.src('./public/styles/css/**/*.css')
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