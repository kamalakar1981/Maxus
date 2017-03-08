/// <binding />
var ts = require('gulp-typescript');
var gulp = require('gulp');
var rimraf = require('rimraf');
var sourcemaps = require('gulp-sourcemaps');
var destPath = './libs/';

// Delete the dist directory
gulp.task('clean-libs', function (cb) {
    rimraf(destPath, cb);
});

gulp.task('clean-app', function (cb) {
    rimraf('./Scripts/app', cb);
});

gulp.task('scriptsNStyles', ['clean-libs'], function () {
    gulp.src([
        'core-js/client/**',
        'systemjs/dist/system.src.js',
        'reflect-metadata/**',
        'rxjs/**',
        'zone.js/dist/**',
        '@angular/**',
        'jquery/dist/jquery.*js',
        'bootstrap/dist/js/bootstrap.*js'
    ], {
            cwd: "node_modules/**"
        })
        .pipe(gulp.dest("./libs"));
});

var tsProject = ts.createProject('wwwroot/tsconfig.json', {
    typescript: require('typescript')
});
gulp.task('ts', ['clean-app'], function (done) {
    var tsResult = gulp.src([
        "wwwroot/**/*.ts"
    ])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject), undefined, ts.reporter.fullReporter())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./Scripts/app'));
});

gulp.task('watch', ['watch.ts']);

gulp.task('watch.ts', ['ts'], function () {
    return gulp.watch('wwwroot/**/*.ts', ['ts']);
});

gulp.task('default', ['scriptsNStyles', 'ts']);