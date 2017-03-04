const gulp = require('gulp');
const bs = require('browser-sync').create();
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

gulp.task('default', ['bundle'],() => {

    bs.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(['./src/**/*.js','index.html'],['watch-bundle'])


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

});

gulp.task('watch-bundle', ['bundle'],  (done) => {
    bs.reload();
    done();
});





