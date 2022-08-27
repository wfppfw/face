安装[webpack-cli]](https://webpack.docschina.org/api/cli/)

```sh
npm init
npm install webpack webpack-cli --save-dev
webpack-cli -v

#添加 index.html、src 文件夹下添加 index.js、hello.js 文件

npx webpack  #打包
```

命令行指定：

```sh
npx webpack --entry=./src/index.js --output-filename=bundle.js --mode=development
```

使用 npm script

```sh
"scripts": {
  "build": "webpack"
}
```

解析流程：

1 根据入口文件名称通过 nodejs 提供的方法 fs.readFileSync 读取到文件内容
2 使用 @babel/parser 将文件内容转换成 ast 语法树
3ast 语法树中 node 节点中包含了文件依赖的文件名称，使用 @babel/traverse 方法提取出依赖的文件名称并存储到一个数组中
4 通过 @babel/core 中的 babel.transformFromAst 方法将 ast 转换成目标浏览器可执行的代码
5 将上述获取的参数返回个对象，对象包含文件名，依赖数组，文件可执行代码，这个对象即为一个依赖图谱中的一个节点
6 遍历入口文件的依赖数组，由于数组中是文件名，则递归执行上述方法，直到找到所有依赖
7 返回所有依赖对象
