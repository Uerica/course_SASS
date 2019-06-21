// //註冊事件
// const {
//     src,
//     dest,
//     series,
//     parallel,
//     watch
// } = require('gulp');

// const style = require('gulp-sass');
// const cleanCSS = require('gulp-clean-css');
// const browsersync = require('browser-sync').create();

// // sass
// function sass() {
//     return src('./sass/*.scss')
//         .pipe(style())
//         .pipe(dest('./css'));
// }
// //browserSync
// function browserSync(done) {
//     browsersync.init({
//         server: {
//             baseDir: "./",
//             index: "index.html"
//         },
//         port: 3000
//     });
//     done();
// }
// // BrowserSync Reload
// function browserSyncReload(done) {
//     browsersync.reload();
//     done();
// }

// //watch files
// function watchfiles() {
//     watch(['./sass/*.scss' , './sass/**/*.scss'] , sass);
//     watch(['./', './**/*'], series(browserSyncReload))
// }

// // mini css
// function miniCss(){
//     return src('css/*.css')
//     .pipe(cleanCSS({compatibility: '*'}))
//     .pipe(dest('css/mini'));
// }

// const watcher = series(sass, parallel( watchfiles , browserSync));

// exports.mini = miniCss;
// exports.default = watcher;

//註冊事件
//plugin
const { src, dest, series, parallel, watch } = require("gulp");

const style = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const browsersync = require("browser-sync").create();

// sass
function sass() {
  return src(["./sass/*.scss", "./sass/**/*.scss"])
    .pipe(style())
    .pipe(dest("./css"));
}
//browserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    },
    port: 3000
  });
  done();
}
// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

//watch files
function watchfiles() {
  watch(
    ["./sass/*.scss", "./sass/**/*.scss"],
    { events: "all" },
    series(sass, browserSyncReload)
  );
  watch(["./*.html", "./**/*.html"], { queue: false }, browserSyncReload);
}

// mini css
function miniCss() {
  return src("css/*.css")
    .pipe(cleanCSS({ compatibility: "*" }))
    .pipe(dest("css/mini"));
}

const watcher = series(sass, parallel(watchfiles, browserSync));

exports.mini = miniCss;
exports.default = watcher;


// -----筆記-----
// js/app.js：指定确切的文件名。
// js/*.js：某个目录所有后缀名为js的文件。
// js/**/*.js：某个目录及其所有子目录中的所有后缀名为js的文件。
// !js/app.js：除了js/app.js以外的所有文件。
//-----筆記-----
