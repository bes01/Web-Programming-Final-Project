const {src, parallel, dest } = require('gulp');
const imagemin = require('gulp-imagemin')
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const minifyCSS = require('gulp-minify-css');
const prefix = require('gulp-autoprefixer');

const imgTask = () =>{
    return src(['src/images/**/*', '!src/images/Home/logo.jpg']).
    pipe(imagemin()).
    pipe(dest('dist/images'))
}

const jsTask = () => {
    return src('src/js/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('all.js'))
      .pipe(terser())
      .pipe(sourcemaps.write('.'))
      .pipe(dest('dist/js'));
}

const cssTask = () =>{
    return src('./src/css/*.css')
    .pipe(concat('all.css'))
    .pipe(minifyCSS())
    .pipe(prefix('last 2 versions'))
    .pipe(dest('./dist/css'))
}

exports.default = parallel(imgTask, jsTask, cssTask);
