const gulp = require('gulp');
const bs = require('browser-sync').create();
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

gulp.task('default', () => {

    bs.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(['./src/**/*.js','index.html'],['bundle'])


});

gulp.task('bundle', () => {

    var bundler = browserify('src/app.js');
    bundler.transform(babelify.configure({
        presets: ["es2015"]
    }));

    bundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./'));

    bs.reload()

});

gulp.task('global-watch', ['bundle'],  (done) => {
    bs.reload();
    done();
});





