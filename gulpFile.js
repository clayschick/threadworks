var gulp = require('gulp'),
   plugins = require("gulp-load-plugins")(),
   lr = require('tiny-lr')(),
   express = require('express'),
   minifyCss = require('gulp-minify-css'),
   sourcemaps = require('gulp-sourcemaps');

var EXPRESS_PORT = 3000;
var EXPRESS_ROOT = __dirname + '/src';
var LIVERELOAD_PORT = 35729;

function startLivereload() {
   lr.listen(LIVERELOAD_PORT);
};

function startExpress() {
   var app = express();
   app.set('view engine', 'ejs');
   app.set('views', './src');
   //var accepts = require('accepts');
   //var useragent = require('express-useragent');
   app.use(require('connect-livereload')());
   //app.use(useragent.express());
   // app.use(function(req, res, next) {
   //    next();
   // });
   /*app.get('/', function(req, res) {
      console.log(req.useragent.isMobile);
      res.render('index',{isMobile: req.useragent.isMobile})
   });*/

   app.use(express.static(EXPRESS_ROOT));

   app.listen(EXPRESS_PORT);
};

function notifyLiveReload(event) {
   console.log("Reloading page");
   var fileName = require('path').relative(EXPRESS_ROOT, event.path);

   lr.changed({
      body: {
         files: [fileName]
      }
   });
};

gulp.task('initServer', function() {
   startExpress();
   startLivereload();
});

gulp.task('watch', function() {
   gulp.watch('src/scss/**/*.scss', ['styles']);
   gulp.watch('src/*.html', notifyLiveReload);
   gulp.watch('src/assets/css/*.css', notifyLiveReload);
});

gulp.task('styles', function() {
   return gulp.src('src/scss/**/*.scss')
      .pipe(plugins.sass())
      .pipe(gulp.dest('src/assets/css'));
});

gulp.task('npm-styles', function() {
   return gulp.src('npm_modules/hint.css/hint.min.css')
      .pipe(gulp.dest('src/assets/css/hint'));
});

gulp.task('foundation-scss', function() {
   return gulp.src('bower_components/foundation/scss/foundation.scss')
      .pipe(plugins.sass())
      .pipe(sourcemaps.init())
      .pipe(minifyCss({
         compatibility: '*'
      }))
      //.pipe(sourcemaps.write())
      .pipe(gulp.dest('src/assets/css/foundation/'));
});

gulp.task('foundation-js', function() {
   return gulp.src('./bower_components/foundation/js/**/*.js')
      .pipe(gulp.dest('./src/assets/js/'));
});

gulp.task('default', ['initServer', 'styles', 'watch'], function() {
   var options = {
      url: "http://localhost:3000"
   };
   gulp.src('./src/index.html')
      .pipe(plugins.open("", options));

   gulp.start('foundation-scss');
   //gulp.start('foundation-js');
});
