var gulp = require('gulp'),
    imageResize = require('gulp-image-resize'),
    markdown = require('gulp-markdown-to-json'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    tap = require('gulp-tap'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cached = require('gulp-cached'),
    remember = require('gulp-remember'),
    templateCache = require('gulp-angular-templatecache'),
    ngAnnotate = require('gulp-ng-annotate'),
    chokidar = require('chokidar'),
    _ = require('lodash'),
    fs = require('fs');

var MD = './etwasvonluise/**/*.md',
	PICT = './etwasvonluise/**/*.{jpg,gif}',
	LESS = './style/**/*.less',
	FONT = './webfonts/*';

var DIST = './dist';

var components = [
	'./bower_components/angular/angular.js',
	'./bower_components/angular-route/angular-route.js',
	'./bower_components/angular-sanitize/angular-sanitize.js',
	'./tmp/page.js',
	'./src/**/*.js',
	'./tmp/templates.js'
];

var STATIC = [
	'./src/index.html',
	'./src/.htaccess'
];

gulp.task('tpl', function () {
	gulp.src('./src/app/views/**/*.html')
		.pipe(templateCache({
			root: 'src/app/views/',
			module: 'luisesPortfolio'
		}))
		.pipe(gulp.dest('./tmp'));
});

gulp.task('js', ['tpl', 'content'], function () {
	return gulp.src(components)
		.pipe(concat('app.js'))
		.pipe(ngAnnotate())
		.pipe(uglify({
			preserveComments: 'some'
		}))
		.pipe(gulp.dest(DIST));
});

gulp.task('font', function () {
	return gulp.src(FONT)
		.pipe(gulp.dest(DIST + '/webfonts'));
});

gulp.task('static', function () {
	return gulp.src(STATIC)
		.pipe(gulp.dest(DIST));
});

gulp.task('less', function () {
	return gulp.src(LESS)
		.pipe(concat('style.less'))
        .pipe(less().on('error', gutil.log))
		.pipe(gulp.dest(DIST));
});

gulp.task('md', function () {
    return gulp.src(MD)
        .pipe(gutil.buffer())
        .pipe(markdown('site.json', {
        	breaks: true
        }))
        .pipe(tap(function (file) {
        	global.pages = JSON.parse(file.contents.toString());
        }));
});

gulp.task('pict', ['md'], function () {
	return gulp.src(PICT)
		.pipe(cached('pict', { optimizeMemory: true }))
		.pipe(gulp.dest(DIST))
		.pipe(imageResize({
            width: 30,
            quality: 0.1,
            imageMagick: true
        }))
        .pipe(tap(function (file) {
        	file.contents = new Buffer('data:image/*;base64,' + file.contents.toString('base64'));
        }))
        .pipe(remember('pict'))
        .pipe(tap(function (file) {
        	var filepath = file.path.replace(__dirname + '/dist/', ''),
        		pathArray = filepath.split('/');

    		var project = global.pages[pathArray[0]][pathArray[1]],
				image = {
	        		file: '/' + filepath,
	        		uri: file.contents.toString()
	        	};

        	if (project) {
        		(project.images = project.images || []).splice(_.sortedIndex(project.images, image, 'file'), 0, image);
        	}
        }));
});


gulp.task('content', ['pict'], function (callback) {
	fs.mkdir('./tmp/', function () {
		fs.writeFile('./tmp/page.js', 'var pageContent = ' + JSON.stringify(global.pages) + ';', callback);
	});
});

gulp.task('watch', function () {

	var refresh = _.debounce(function () {
		setTimeout(function () {
			gutil.log('files changed');
			gulp.start('js');
		}, 500);
	}, 500);

	var watcher = chokidar.watch('./etwasvonluise', { ignored: /[\/\\]\./, persistent: true });

	watcher
		.on('all', refresh)
		.on('unlink', function (path) {
			gutil.log('File', path, 'has been removed');
			if (cached.caches.pict[__dirname + '/' + path]) {
				gutil.log('Cache for', path, 'removed');
				delete cached.caches.pict[__dirname + '/' + path];
			}
			remember.forget('pict', __dirname + path.replace('etwasvonluise', '/dist'));
		});
});

gulp.task('default', ['js', 'less', 'font', 'static']);
