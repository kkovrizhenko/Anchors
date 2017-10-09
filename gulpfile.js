var gulp 			= require('gulp'),
	fileinclude 	= require('gulp-file-include'),
	minifyCSS 		= require('gulp-minify-css'),
	merge 			= require('merge-stream'),
	imagemin 		= require('gulp-imagemin'),
	concat 			= require('gulp-concat'),
	sass 			= require('gulp-sass'),
	autoprefixer 	= require('gulp-autoprefixer'),
	sourcemaps 		= require('gulp-sourcemaps'),
	browserSync 	= require('browser-sync'),
	spritesmith 	= require('gulp.spritesmith'),
	imagemin 		= require('gulp-imagemin'),
	cache			= require('gulp-cache'),
	del 			= require('del');

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
	return gulp.src(['./sass/**/*.scss', './sass/**/*.sass'])
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions'], {cascade: false}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./css/'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('styles', function() {
	return gulp.src('./css/*.css')
	.pipe(concat('style.min.css'))
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

// створення спрайту з картинок з папки images/sprite
gulp.task('sprite', () => {
    let spriteData = gulp.src('pic/sprite/*.png').pipe(
        spritesmith({
            imgName: 'sprite.png',
            cssName: '_icon-mixin.scss',
            cssVarMap: (sprite) => {sprite.name = 'icon-' + sprite.name}
        })
    );

    let imgStream = spriteData.img.pipe(gulp.dest('pic/'));
    let cssStream = spriteData.css.pipe(gulp.dest('sass/'));

    return merge(imgStream, cssStream);
});
// зтиснення svg, png, jpeg
gulp.task('imgmin', function(){
    // беремо всі картинки крім папки де лежать картинки для спрайту
    // картинки зі спрайту упаковуються в окрему картинку
    return gulp.src(['./img/**/*', '!./pic/*'])
        .pipe(cache(imagemin({

        })))
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('clean', function(){
	return del.sync('./dist/**/*');
});

gulp.task('watch', ['browser-sync', 'template', 'sass', 'styles'], function(){
	gulp.watch('./sass/**/*', ['sass']);
	// gulp.watch('templates/css/**/*', ['styles']);
	gulp.watch('templates/*.html', ['template']);
});


gulp.task('build', ['clean', 'sass', 'template', 'imgmin'], function(){
	var buildCss = gulp.src([
		'css/main.css'
	])
		.pipe(gulp.dest('dist/css'));

	var buildHTML = gulp.src('./*.html')
		.pipe(gulp.dest('dist/'));

	var buildPic= gulp.src('./pic/**/*')
		.pipe(gulp.dest('dist/pic'));	
});

// gulp.task('css', function() {
//   return gulp.src(['./templates/css/reset.css', './templates/css/base.css', './templates/css/heder.css', './templates/css/why.css', './templates/css/latest-projects.css', 'templates/css/footer.css'])
//     .pipe(concat('main.css'))
//     .pipe(gulp.dest('./css/'));
// });
