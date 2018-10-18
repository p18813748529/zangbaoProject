const gulp = require("gulp"),
    htmlmin = require('gulp-htmlmin'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    imagemin = require('gulp-imagemin'),
    cleanCSS = require('gulp-clean-css');

/* 创建任务流程
1、 gulp.task("任务名",function(){
2、     查找数据源
3、     执行插件方法
4、     输出到文件夹
5、     刷新
    })
*/

// 输出所有,app/**/*.* : app下所有的文件夹下的任意名称.任意后缀，用**会自动在dist下创建对应的文件夹
gulp.task("all",function(){
    gulp.src("app/**/*.*")
    .pipe(gulp.dest("dist"))
});
// 压缩html
gulp.task("html",function(){
    gulp.src("app/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true,minifyJS: true,minifyCSS: true,removeComments: true}))
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
});
// 压缩js
gulp.task("js",function(){
    gulp.src("app/**/*.js")         //查找数据源
    .pipe(babel({                   //调用插件方法
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
});
// 压缩css
gulp.task("css",function(){
    gulp.src("app/**/*.css")
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
});
// 压缩img
gulp.task("img",function(){
    gulp.src("app/**/*.{png,jpg,gif}")
    .pipe(imagemin())
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
});
// 监听
gulp.task("watch",function(){
    gulp.watch("app/**/*.html",["html"]);
    gulp.watch("app/**/*.js",["js"]);
    gulp.watch("app/**/*.css",["css"]);
    gulp.watch("app/**/*.{png,jpg,gif}",["img"]);
});
// 合并任务
gulp.task("bulid",["all","html","css","js","img"]);
// 开启服务器
gulp.task("connect",function(){
    connect.server({
        root: 'dist',
        livereload: true
    });
});
gulp.task("default",["watch","connect"]);