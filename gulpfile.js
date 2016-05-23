var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    minifycss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    tape = require('gulp-tape'),
    tapColorize = require('tap-colorize');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./dist"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('images', function(){
  gulp.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img/'));
});

gulp.task('html', function(){
  gulp.src('./src/**/*')
  .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function(){
  gulp.src(['src/sass/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 1 versions'))
    .pipe(gulp.dest('dist/style/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/style/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
  return gulp.src('src/js/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(babel())
    .pipe(gulp.dest('dist/scripts/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('test', function() {
  return gulp.src('src/spec/*.spec.js')
    .pipe(tape({
      reporter: tapColorize()
    }));
});

gulp.task('default', ['browser-sync'], function(){
  gulp.watch("src/sass/**/*.scss", ['styles']);
  gulp.watch("src/js/**/*.js", ['scripts']);
  gulp.watch("src/**/*.html", ['html']);
});