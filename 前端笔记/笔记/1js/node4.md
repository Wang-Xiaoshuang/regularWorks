# JS 模块化

## 背景

JS 本身定位：简单的页面设计 —— 页面简单动画+基本的表单提交
并没有模块化 或 命名空间的概念

发展的推力：客户端性能的提升 =》 JS 的模块化需求日益增长

### 幼年期：无模块化

1. 开始需要在页面中增加一些不同的 JS：动画、表单、格式化工具
2. 多种 js 文件被分在不同的文件中
3. 不同的文件又被同一个模板所引用

```js
// test.html
<script src='jquery.js'></script>
<script src='main.js'></script>
<script src='tool.js'></script>
```

认可：文件分离式最基础的模块化，只是第一步
普通 - 从上到下逐行解析，解析到 script 标签，立刻 pending，并且下载执行

- 追问
  script 标签
  script 标签两个变量参数 - async 、 defer

```js
<script src="main.js" async></script>
```

defer - 解析到标签，开始异步下载（下载不会阻塞解析本身），继续解析文件，文件全部解析完成后，再回过头来执行这个

async - 解析到标签，开始异步下载，下载完成后立刻执行，并阻塞原解析，执行结束后，继续解析（不能保证顺序)

#### 多个 script 标签，多人协作 => 出现问题

- 污染全局作用域 => 不利于大型项目的开发以及多人团队共建

### 成长期：模块化雏形 —— IIFE（语法侧的优化）立即执行函数

#### 作用域的把控

例子：
场景：

```js
// 定义一个全局变量
let count = 0;

// 代码块1
const increase = () => count++;

// 代码块2
const reset = () => {
  count = 0;
};

increase();
reset();
```

##### 解决：利用函数独立作用域

```js
(() => {
  let count = 0;
  // ....
})();
```

定义逻辑+ 立即执行 => 独立的空间
实现一个最最最初步的模块

##### 拓展：JS 模块化、JS 沙箱隔离（例如 iframe)

#### 尝试去定义一个最简单的模块

```js
const module = (()=>{
    let count = 0;

    // 主流程功能
    // 本例子简单，无主流程

    // 对外暴露的接口
    return {
        increase:()=>++count;
        reset:()=>{
            count = 0
        }
    }
})()
module.increase();
module.reset();

```

\*\* 追问：如果模块有额外的依赖，如何处理？
优化 1：依赖其他模块的 IIFE

```js
const iifeModule=((depModule1,depModule2)=>{
    let count = 0;
    const obj = {
         // depModule1,depModule2 注入的逻辑可加入
          increase:()=>++count;
        reset:()=>{
            count = 0
        }
    }

    // depModule1,depModule2 注入的逻辑可加入

    // 最终暴露出去
    return
})(dep1,dep2); // 传参
```

拓展知识理解：

```js
const iifeModule=((depModule1,depModule2)=>{
    let count = 0;
    const obj = { // 1. 再封装
         // depModule1,depModule2 注入的逻辑可加入
          increase:()=>++count;
        reset:()=>{
            count = 0
            // fn(depModule1)
        }
    }

    // depModule1,depModule2 注入的逻辑可加入

    // 最终暴露出去
    return{  // 2. 再暴露
        reset
    }
})(dep1,dep2); // 传参
```

再封装 + 再暴露 ==> 中间层

\*\* 面试题：jquery 的源码\早期 jquery 的依赖处理 => IIFE + 传参调配
实际上，传统框架利用一种揭示模式的写法

```js
const iifeModule = ((depModule1, depModule2) => {
  let count = 0;
  const obj = {
    // depModule1,depModule2 注入的逻辑可加入
    increase: () => ++count,
    reset: () => {
      count = 0;
      // fn(depModule1)
    },
  };

  // depModule1,depModule2 注入的逻辑可加入

  // 最终暴露出去
  return {
    reset,
  };
})(dep1, dep2); // 传参

iifeModule.reset();
```

\*\* 追问：

1. 深入模块化实现
2. 转向框架：jquery vue react 模块化细节，以及框架特征原理
3. 转向设计模式：注重模块化的设计（高级）

### 成熟期

#### node.js 出现，制定 CJS - commonjs

特征：

1. 通过 module + export 去对外暴露接口
2. 通过 require 进行其他模块的调用

main.js

```js
const depModule1 = require("./dependencyModule1");
const depModule2 = require("./dependencyModule2");

let count = 0;
const obj = {
  // depModule1,depModule2 注入的逻辑可加入
  increase: () => ++count,
  reset: () => {
    count = 0;
    // fn(depModule1)
  },
};

exports.increase = increase;
exports.reset = reset;

module.export = {
  increase,
  reset,
};
```

```js
const { increase, reset } = require("main.js");
increase();
```

#### 问题：实际执行处理

```js
(function (thisValue, exports, require, module) {
  const depModule1 = require("./dependencyModule1");
  const depModule2 = require("./dependencyModule2");

  // 业务逻辑...
}).call(thisValue, exports, require, module);
// call 写call是为了绑定执行环境，保证this使用的正确，保险的写法
// 框架封装，一般靠谱的绑定this靠谱

// 部分开源源码，分别传入全局、指针、框架作为参数
// 核心代码的自我保障
(function (window, $, undefined) {
  // 业务逻辑...
})(window, jQuery);
// window
// 1. 避免全局变化 | 全局作用域转化为局部的时候，提升效率
// 2. 编译的时候优化压缩，例如：(function(c){c}(window))，把window这个单词变成c，压缩了一点

// jQuery
// 1. 独立定制复写，保障稳定（万一重名覆盖）
// 2. 防止全局工具的全局污染

// undefined
// 防止被重写
// 在旧的浏览器中它允许被重新赋值 undefined = "test"
// 这一行为在2009年的ECMAScript 5被修复了
// 在现代浏览器中，undefined的值将不能被重写
```

CJS 优点：
CJS 率先利用服务端的搭建实现了从框架层面解决依赖、模块化的问题

缺点：
针对的是服务端，对于异步依赖没有很友好地处理解决

新问题：浏览器端存在异步依赖的问题

### AMD 规范

通过异步加载 + 允许定制回调函数
经典框架：require.js

新增定义方式：

```js
define(id, [depModule], callback); //id全局挂载在window上
require([module], callback);

// 例子
define("amdModule", [depModule1, depModule2], (depModule1, depModule2) => {
  let count = 0;
  const obj = {
    // depModule1,depModule2 注入的逻辑可加入
    increase: () => ++count,
    reset: () => {
      count = 0;
      // fn(depModule1)
    },
  };
});

//使用
require(["amdModule"], (amdModule) => {
  amdModule.increase();
});
```

#### 面试题：逻辑外壳的封装、类装饰器

```js
define("amdModule", [depModule1, depModule2], (depModule1, depModule2) => {
  let count = 0;
  const obj = {
    // depModule1,depModule2 注入的逻辑可加入
    increase: () => ++count,
    reset: () => {
      count = 0;
      // fn(depModule1)
    },
  };

  //暴露接口
  return {
    increase,
    reset,
  };
});
```

#### 面试题：如何用一个代码兼容 AMD 和 CJS =>UMD

1.  CJS: module 对象+ export
2.  AMD：define 函数

```js
// 目标：一次性区分CJS和AMD
// 1. CJS factory
// 2. module 和 module exports
// 3. define
define(fn)(
  typeof module === "Object" && module.exports && typeof define !== "function"
    ? //CJS
      (factory) => (module.export = factory(require, exports, module))
    : //AMD
      define
);

// https://juejin.cn/post/6844903927104667662#comment
(function (fn) {
  //UMD的出现
  console.log(fn)
  fn(
    // 业务逻辑
  )
})(
  typeof module === "Object" && module.exports && typeof define !== "function"
    ? //CJS
      (factory) => (module.export = factory(require, exports, module))
    : //AMD
      define
);
```

AMD 优点：解决了浏览器中异步加载模块，可以并行加载多个模块
缺点：有引入成本，缺少考虑按需加载

#### CMD 规范 - sea.js

按需加载

```js
define("module", (require, exports, module) => { 
  let $ = require("jquery");
  let depModule1 = require("./depencyModule1");
});
```

优点：按需加载，依赖就近
缺点：依赖打包，加载逻辑存在于每个模块中，扩大了模块的体积

### ESM

新增定义：引入 —— import；导出 —— export

```js
// 异步加载(例子，路由懒加载)
import("xxx").then((a) => {});
```


整体总结：
目标：
1. 隔离每个模块和作用域
2. 扩展共同协作的方便程度

=> 可以将无数模块进行所以组装

=> 前端工程化

