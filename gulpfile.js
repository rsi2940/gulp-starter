const gulp = require("gulp");
const pump = require("pump");
const composer = require("gulp-uglify/composer");
const uglifyjs = require("uglify-es");
const browserSync = require("browser-sync").create();

const uglify = composer(uglifyjs, console);
const sass = require("gulp-sass");
const useref = require("gulp-useref"); //concatenate the js or css
const gulpIf = require("gulp-if");
const cssnano = require("gulp-cssnano");
const imagemin = require("gulp-imagemin");

gulp.task("hello", function() {
  console.log("Hello everyone!!");
});

gulp.task("compress", function(cb) {
  pump([gulp.src("src/js/*.js"), uglify(), gulp.dest("dist/js")], cb);
});

gulp.task("sass", function() {
  return gulp
    .src("src/scss/styles.scss")
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("useref", function() {
  return gulp
    .src("src/index.html")
    .pipe(useref())
    .pipe(gulpIf("*.js", uglify()))
    .pipe(gulpIf("*.css", cssnano()))
    .pipe(gulp.dest("dist"));
});

gulp.task("images", function() {
  return gulp
    .src("src/img/**/*.+(png|jpg|gif|svg)")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"));
});

//watch has 2 parameter first is the glob and 2nd is either function or array of task(s)
gulp.task("watch", ["browserSync"], function() {
  gulp.watch("src/scss/style.scss", ["sass"]);
  gulp.watch("src/*.html", browserSync.reload);
  gulp.watch("src/js/*.js", browserSync.reload);
  gulp.watch("src/css/*.css", browserSync.reload);
});

//BrowserSync
gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "src"
    }
  });
});
