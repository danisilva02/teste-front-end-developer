var gulp = require('gulp'),
    jscs = require('gulp-jscs'),
    babel = require('gulp-babel'),
    inject = require('gulp-inject'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    del = require('del'),
    browserify = require('gulp-browserify'),
    browserSync = require('live-server'),
    htmlmin = require('gulp-htmlmin');

var onError = function (err) {
    console.log('An error occurred:', err.message);
    this.emit('end');
};

gulp.task('check-js-style', function () {
    gulp.src('src/assets/**/*.js')
        .pipe(jscs({fix: true}))
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'))
        .pipe(gulp.dest('src'));
});

gulp.task('serve', function () {
    var files = [
        './app/*.html',
        './app/css/**/*.css',
        './app/js/**/*.js'

    ];
    browserSync.init(files, {
        server: {
            baseDir: './app'
        }
    });

});

gulp.task('scss', function () {
    return gulp.src('./src/assets/application.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass())
        .pipe(gulp.dest('./app/css'));
});

gulp.task('babel', ['scss'], function () {
    return gulp.src('src/assets/**/*.js')
        .pipe(plumber({errorHandler: onError}))
        .pipe(babel())
        .pipe(gulp.dest('./app/js'));
});

gulp.task('watch', function () {
    gulp.watch('./src/**/*.scss', ['default']);
    gulp.watch('./src/**/*.js', ['default']);
    gulp.watch('./src/**/*.html', ['default']);
});

gulp.task('jshint', ['babel', 'scss'], function () {
    return gulp.src('src/assets/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('default', ['cleanDist', 'jshint', 'babel'], function () {
    gulp.src('src/assets/images/**/*')
        .pipe(gulp.dest('app/images'));
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('app/'))
        .pipe(inject(gulp.src(['app/js/**/*.js', 'app/css/lib/*.css', 'app/css/*.css'], {read: false}), {relative: true}))
        .pipe(gulp.dest('app/'));
});

gulp.task('copyMinJsLib', ['cleanDist'], function () {
    gulp.src('bower_components/jquery/dist/jquery.min.js')
        .pipe(rename("bootstrap-jquery-a.min.js"))
        .pipe(gulp.dest('app/js'));
    return gulp.src([
        'src/ang.js',
        'node_modules/chart.js/dist/Chart.min.js',
        'bower_components/sweetalert2/dist/sweetalert2.min.js',
        'bower_components/jquery-ui/jquery-ui.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js'
        ])
        .pipe(gulp.dest('app/js'));
});

gulp.task('copyMinCssLib', ['cleanDist'], function () {
    return gulp.src([
        'src/assets/estilo.css',
        'bower_components/sweetalert2/dist/sweetalert2.min.css',
        'bower_components/jquery-ui/themes/smoothness/jquery-ui.min.css'
        ])
        .pipe(gulp.dest('app/css/lib'));
});

gulp.task('cleanDist', function () {
    return del('app/**/*');
});

gulp.task('minifyJs', ['cleanDist'], function () {
    return gulp.src('src/assets/**/*.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(plumber({errorHandler: onError}))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('minifyCss', ['cleanDist'], function () {
    return gulp.src('src/assets/application.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass())
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'));
});

gulp.task('browserify', function(){
    return gulp.src(['src/app.js'])
        .pipe(browserify())
        .pipe(uglify())
        .pipe(rename("main.js"))
        .pipe(gulp.dest('app/js/'));
});

gulp.task('build', ['minifyJs', 'minifyCss', 'copyMinCssLib', 'copyMinJsLib', 'browserify'], function () {
    gulp.src('src/assets/fonts/**/*')
        .pipe(gulp.dest('app/fonts/'));
    gulp.src('src/assets/styles/main.css')
        .pipe(gulp.dest('app/css/'));
    gulp.src('src/*.html')
        .pipe(gulp.dest('app/'))
        .pipe(inject(gulp.src(['app/js/**/*.js', 'app/css/lib/*.css',
            'app/css/*.css'], {read: false}), {relative: true}))
        .pipe(gulp.dest('app/'));
    gulp.src('src/assets/images/**/*')
        .pipe(gulp.dest('app/images'));
   gulp.src('src/views/**/*')
        .pipe(gulp.dest('app/views/'));
});
