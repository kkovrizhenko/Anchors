const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const imagemin = require('gulp-imagemin');
 
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

 
gulp.task('img:minify', () =>
    gulp.src('./img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);