const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
 
gulp.task('template', function() {
	// які файли читати
	gulp.src('./templates/index.html')
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		// куди посістити результат
		.pipe(gulp.dest('./'));
});

gulp.task('css', function() {
  return gulp.src(['./templates/css/reset.css', './templates/css/base.css', './templates/css/heder.css', './templates/css/why.css', './templates/css/latest-projects.css', 'templates/css/footer.css'])
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./css/'));
});
 
gulp.task('img:minify', () =>
    gulp.src('./img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);