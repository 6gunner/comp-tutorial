import { defineConfig } from "dumi";
import path from 'path';

let base: string | undefined;
let publicPath: string | undefined;

export default defineConfig({
  title: "Easy UI", // 站点名称
  outputPath: "doc-site", // 输出文件夹
  exportStatic: {}, // 后续会部署到 github pages 直接全部生成静态页面 不走前端路由
  extraBabelPlugins: [
    [
      "import", // 利用babel-plugin-import来导入样式
      {
        libraryName: "@easy/comp-tutorial",
        libraryDirectory: '',
        customStyleName: (name: string) => path.resolve(__dirname, `src/${name}/style/index.ts`),
      },
    ],
  ],
});
