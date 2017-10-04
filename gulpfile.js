var gulp 			= require('gulp'),
	fileinclude 	= require('gulp-file-include'),
	minifyCSS 		= require('gulp-minify-css'),
	imagemin 		= require('gulp-imagemin'),
	concat 			= require('gulp-concat'),
	sass 			= require('gulp-sass'),
	autoprefixer 	= require('gulp-autoprefixer'),
	browserSync 	= require('browser-sync');

gulp.task('template', function() {
	gulp.src('./templates/index.html')
	.pipe(fileinclude({
		prefix: '@@',
		basepath: '@file'
	}))
	.pipe(gulp.dest('./'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('sass', function(){
	return gulp.src(['templates/sass/**/*.scss', 'templates/sass/**/*.sass'])
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions'], {cascade: true}))
	.pipe(gulp.dest('./templates/css/'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('styles', function() {
	return gulp.src('templates/css/*.css')
	.pipe(concat('main.min.css'))
	.pipe(minifyCSS({
		keepBreaks: true
	}))
	.pipe(gulp.dest('./css/'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: './'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync', 'template', 'sass', 'styles'], function(){
	gulp.watch('templates/sass/**/*', ['sass']);
	gulp.watch('templates/css/**/*', ['styles']);
	gulp.watch('templates/*.html', ['template']);
});

// gulp.task('css', function() {
//   return gulp.src(['./templates/css/reset.css', './templates/css/base.css', './templates/css/heder.css', './templates/css/why.css', './templates/css/latest-projects.css', 'templates/css/footer.css'])
//     .pipe(concat('main.css'))
//     .pipe(gulp.dest('./css/'));
// });

// gulp.task('img:minify', () =>
// 	gulp.src('./img/**/*')
// 	.pipe(imagemin())
// 	.pipe(gulp.dest('dist/img'))
// 	);