const path = require('path');
// context 可以理解为配置资源入口的基础目录，在配置时要求必须使用绝对路径
// webpack 配置中有多种方式定义 entry 属性，如：字符串、数组、对象、函数
// 字符串类型：直接定义入口的名称。
// 数组类型：传入一个数组的作用是将多个文件预先合并，最终将多个依赖的内容绘制在一个 chunk 中，在打包时 webpack 会将数组中的最后一个元素作为实际的入口路径，其余文件会预先构建到入口文件
// module.exports = {
//   entry: ['lodash', './src/script/index.js'],
// };
// 类似于在 index.js 中引入 lodash
// 这种配置和下面是等效的
// // index.js
// import * from 'lodash'
// // webpack.config.js
// module.exports = {
//   entry: './src/script/index.js',
// }
// 如果要定义多入口文件则需要使用对象的形式
// 多入口配置本质上打包后生成多个js文件，
// module.exports = {
//   entry: {
//     index: ['lodash', './src/script/index.js'],
//     vendor: './vendor'
//   }
// }
// 使用函数类型定义入口时，只要返回上面介绍的几种形式即可，传入函数的优点是我们可以通过函数中增加一些逻辑来动态改变打包入口
// entry: () => './src/script/index.js'；

/**
 * 对于单页应用，我们一般来定义单一入口即可
 * 通过单一入口打包文件，可以将所有入口文件依赖的 框架、引入的工具库、各个页面内容打包到一起。这样的好处是将所有内容都打包成一个 js 文件，
 * 依赖关系清晰。但是这种方式也有个弊端，即所有模块都打到一个包中，当应用规模上升到一定程度后导致打包资源体积过大，导致页面首次加载速度变慢
module.exports = {
  entry: './src/index.js',
};
对于多页应用的场景，为了尽可能减少打包资源的体积，我们希望每个页面都只加载各自必要的逻辑，而不是将所有内容都打包到一个 bundle 中，我们来看下多应用的配置
module.exports = {
  entry: {
    index: './src/index.js',
    hello: './src/hello.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  }
};
打包的内容中包含了 index.js 和 hello.js 两个文件

在一个应用中，我们使用的框架、库、第三方依赖等往往很少会有改动，如果我们将所有内容都打包到一个 bundle 文件，一旦业务代码有一点点变更，那用户就要重新下载整个资源，这对于页面的性能是很不友好的。为了解决这个问题，我们可以使用应用程序和第三方库分离的方式来打包文件。也就是将业务代码和不频繁变更的第三方依赖分 bundle 打包
  mode: 'development',
  entry: {
    index: './src/index.js',
    vendor: ['lodash']
  }
};
也成功提取了 vender 文件，但是打开打包后的 dist/index.js 我们发现 lodash 还是被打到文件中了，对于这种情况我们可以配合使用 optimization.splitChunks，将 vender 和 index 中的公共代码提取出来
output:
常见配置:
filename 决定了每个输出 bundle 的名称。这些 bundle 将写入到 output.path 选项指定的目录下。
对于单个入口起点，filename 会是一个静态名称。 filename 支持以字符串和函数的形式定义参数。

module.exports = {
  ...
  output: {
    filename: 'js/[name]/bundle.js'
  }
};
替换方式	变量名称	功能描述	使用方式	打包结果
入口名称	[name]	如果设置，则为此 chunk 的名称，否则使用 chunk 的 ID	filename: '[name].bundle.js'	
chunk id	[id]	指代 此 chunk 的 id	filename: '[id].bundle.js'	
chunk hash	[chunkhash]	此 chunk 的 hash 值，包含该 chunk 的所有元素	filename: '[chunkhash].bundle.js'	
content hash	[contenthash]	指代由生成的内容产生的 hash	filename: '[contenthash].bundle.js'	

path 可以指定资源输出位置，要求必须使用绝对路径
const path = require('path');
module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  }
};

 */

module.exports = {
  context: path.resolve(__dirname, './src/'),
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
