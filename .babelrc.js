module.exports = {
  presets: ["@babel/env", "@babel/typescript", "@babel/react"],
  plugins: [
    "@babel/plugin-transform-runtime", // 不引入polyfill，让使用者自己去配置
    // [
    //   "@babel/plugin-transform-runtime",
    //   {
    //     corejs: 3, // 结合@babel/runtime-corejs3，按需引入一些polyfill函数，就不需要全局引入@babel/polyfill了
    //     helpers: true, // 会将一些helpers方法单独生成出来，避免编译的时候每一个文件生成一份；
    //   },
    // ],
  ],
  // 用环境变量区分esm和cjs
  env: {
    esm: {
      presets: [
        [
          "@babel/env",
          {
            modules: false, // 保留es模块
          },
        ],
      ],
      plugins: [["@babel/plugin-transform-runtime", { useESModules: true }]],
    },
  },
};
