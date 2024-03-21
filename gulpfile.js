const gulp = require("gulp");
const babel = require("gulp-babel");
const less = require("gulp-less");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano"); // 載入 cssnano 套件
const through2 = require("through2");
const paths = {
  // 仿照ant-desgin的目录结构，来定义产物的输出目录
  dest: {
    lib: "lib", // commonjs 文件存放的目录名
    esm: "esm", // ES module 文件存放的目录名
    dist: "dist", // umd文件存放的目录名 - 暂时不关心
  },
  styles: "src/**/*.less", // 样式文件路径
  scripts: ["src/**/*.{ts,tsx}", "!src/**/demo/*.{ts,tsx}"], // 脚本文件路径
};

// 单独生成css.js文件
function extractCss() {
  return through2.obj(function z(file, encoding, next) {
    this.push(file.clone());
    // 找到目标
    // console.log("file.path = ", file.path);
    if (file.path.match(/(\/|\\)style(\/|\\)index\.(ts|js)$/)) {
      let content = file.contents.toString(encoding);
      // console.log("content = ", content);
      content = content
        .replace(/\/style\/?'/g, "/style/css'")
        .replace(/\/style\/?"/g, '/style/css"')
        .replace(/\.less/g, ".css");
      file.contents = Buffer.from(content); // 文件内容处理
      file.path = file.path.replace(/index\.js/, "css.js"); // 文件重命名
      this.push(file); // 新增该文件
      next();
    } else {
      next();
    }
  });
}
function compileCJS() {
  process.env.BABEL_ENV = "cjs";
  const { dest, scripts } = paths;
  return gulp
    .src(scripts)
    .pipe(babel()) // 使用gulp-babel处理
    .pipe(extractCss())
    .pipe(gulp.dest(dest.lib));
}

function compileESM() {
  process.env.BABEL_ENV = "esm"; // 设置babel的env为esm，这样单独处理一下
  const { dest, scripts } = paths;
  return gulp
    .src(scripts)
    .pipe(babel()) // 使用gulp-babel处理
    .pipe(extractCss())
    .pipe(gulp.dest(dest.esm));
}

function copyLess() {
  return gulp
    .src(paths.styles)
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.esm));
}

function less2css() {
  return gulp
    .src(paths.styles)
    .pipe(less()) // 处理less文件
    .pipe(
      postcss([autoprefixer(), cssnano({ zindex: false, reduceIdents: false })]) // 用postcss来预处理样式、增加前缀，压缩
    ) // 根据.browserslistrc增加前缀
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.esm));
}

// 打包任务串行，避免出现env冲突
const compileTasks = gulp.series(compileCJS, compileESM);
// 并行任务 后续加入样式处理 可以并行处理
const build = gulp.parallel(compileTasks, copyLess, less2css);

exports.build = build;
exports.default = build;
