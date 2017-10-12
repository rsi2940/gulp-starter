const gulp = require("gulp");
const pump = require("pump");
const composer = require("gulp-uglify/composer");
const uglifyjs = require("uglify-es");
const browserSync = require("browser-sync").create();

const uglify = composer(uglifyjs, console);

gulp.task("hello", function() {
  console.log("Hello everyone!!");
});

gulp.task("compress", function(cb) {
  pump([gulp.src("src/js/*.js"), uglify(), gulp.dest("dist/js")], cb);
});

gulp.task("watch", ["browserSync"], function() {
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
