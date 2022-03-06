const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');


gulp.task('css', function () {
	var processors = [
		autoprefixer,
		cssnano
	];
	return gulp.src('./src/style/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(gulp.dest('./src/dist/'));
});
  
gulp.task('watch', function () {
	gulp.watch('./src/style/**/*.scss', gulp.series('css'));
});
