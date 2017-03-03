const gulp = require('gulp');
const rename = require('gulp-regex-rename');
const babel = require('gulp-babel');
const bs = require('browser-sync').create();


gulp.task('default', () => {

    bs.init({
        server: {
            baseDir: "public/"
        }
    });

    gulp.watch(['public/**/*es6.*'], ['babel'],() => {

    });
});

gulp.task('babel', () => {

    gulp.src('public/js/*.es6.js')
        .pipe(babel({
            presets: ['es2015', 'babili']
        }))
        .pipe(rename(/\.es6\.js$/, '.min.js'))
        .pipe(gulp.dest('public/js'))

});

