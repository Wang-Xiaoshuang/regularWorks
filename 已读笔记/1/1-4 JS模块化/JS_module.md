讲了人们对页面的要求越来越高, JS 对页面的操作也越来越复杂.
一个简单的 JS 文件, 已经不再满足需求, 所以开始发展

1. 在 HTML 中引入多个 JS 脚本 -- 逻辑分离 || 都在全局作用域, 没有分离
2. 使用 IIFE 立即执行函数 -- 作用域封闭/可以传参 || 写法看着奇怪
3. commonJS 服务器端 -- || 没有异步
4. AMD 浏览器端 -- 可以异步加载脚本
5. UMD -- 兼容 commonJS/AMD || 不能按需加载
6. CMD -- 就近加载依赖, 编译时不需要加载的依赖就隐藏相关代码
7. ES6
8. webpack

# 梳理

1. cJS

```js
exports.fn = fn;
module.exports = {
  fn,
};

require();
```

2. AMD

```js
define(id, [depends], (depend1, depend2) => {});

require([module], (module) => {
  module.fn();
});
```

3. UMD

```js
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["moduleA"], factory);
  } else if (typeof exports === "object") {
    module.exports = factory(require("moduleA"));
  }
})(this, function (moduleA) {
  return someFunction;
});
```

4. CMD

```js
define(function (require, exports, module) {
  var $ = require("jquery");
  var dependencyModule1 = require("./dependencyModule1");

  // ……
  // exports.increase = ...
  // module.exports = ...
});
```

5. ESM
ESM is the new standard for both browser and server.

ESM is static (better for tree shaking and optimization), while others like CJS are dynamic.

Static module structure, 
meaning you can statically analyze the imports and exports without running the code.
```js
import moduleA from "./moduleA";
export const someFunction = () => {};
```

## JS 模块化

## 4.1 内容

### 1. 不得不说的历史

#### 背景

JS 本身就是为了简单页面的设计：
页面动画、表单提交，
并不会内置任何命名空间或者模块化相关的概念

> 随着业务的飞速的飞速扩张，针对 JS 的模块化涌现出了大量的解决方案

#### 幼年期：无模块化

1. 开始需要在页面中增加不同类型的 js 文件，如：
   - 动画 js(旋转、3d,把反复写得动画逻辑沉淀成一个库)、
   - 验证 js(表单提交校验)、
   - 格式化 js(手机号\银行卡号等等不同的格式)
2. 多种 js 为了维护和可读性，被分在了不同的 js 文件中
3. 不同的文件要在同一个模版中被引用

```js
    // 最初步的逻辑的隔离
    <script src="jquery.js"></script>
    <script src="main.js"></script>
    <script src="deps1.js"></script>
    <script src="deps2.js"></script>
```

进步点：
相比于使用一个 js 文件去包含所有逻辑，这种多个 js 文件实现最简单初步的模块化

问题：
污染全局作用域。每一个模块都是暴露在全局的，需要协调每一个模块变量函数名称都不可以相同.
不利于大型项目的分工开发与维护

#### 成长期：模块化的雏形 —— IIFE

要解决作用域的冲突

##### 作用域的把控

- 例子：(作用域的冲突)

```js
// 定义全局变量count
// 无法保证别的地方都不使用和改变count
let count = 0;
const increase = () => ++count;
const reset = () => {
  count = 0;
  console.log("hahaha count is reset");
};

increase();
reset();
```

- 解决: 利用函数作用域限制

```js
() => {
  let count = 0;
  // ……
};
```

上面仅仅定义了一个函数，但里面的代码并没有执行，如何能够对齐原来的逻辑呢？
-- 立即执行函数 IIFE

```js
(() => {
  let count = 0;
  // ……
})();
```

- 应用: 尝试定义一个简单的模块

```js
    const iifeCounterModule = (() => {
        let count = 0;
        return {
            increase: () => ++count;
            reset: () => {
                count = 0;
                console.log('hahaha count is reset');
            }
        }
    })();

    iifeCounterModule.increase();
    iifeCounterModule.reset();
```

完成了一个模块的封装，实现了对外暴露功能，保留变量 + 不污染全局作用域

> 优化 1: 如果依赖其他的模块呢？ -- 函数传参

```js
    const iifeCounterModule = ((dependencyModule1, dependencyModule2) => {
        let count = 0;
        // dependencyModule做处理
        return {
            increase: () => ++count;
            reset: () => {
                count = 0;
                console.log('hahaha count is reset');
            }
        }
    })(dependencyModule1, dependencyModule2);
```

- 面试题 1: 了解早期 jquery 的依赖处理以及模块加载方案吗？
  答：IIFE 加 传参调配(术语,就是上面说得函数传参)

实际书写上，jquery 等框架实际应用会涉及到一种模式: revealing 的写法

```js
const revealingCounterModule = (() => {
  let count = 0;
  const increase = () => ++count;
  const reset = () => {
    count = 0;
    console.log("hahaha count is reset");
  };

  // 用 return 暴露出去
  return {
    increase,
    reset,
  };
})();
```

本质实现与方案上并无不同，只是在写法思想上，更强调
所有 API 一 局部变量的形式定义在函数中，而仅仅对外暴露出可被调用的接口

IIFE 在写法上看起来奇怪。所以, 后续在技术层面上, 进行各种各样的规范, 这样写的时候看着顺眼

#### 成熟期：(就是专门制定了一套规范--立规矩)

##### CJS module: CommonJs

是 node.js 制定, 因为服务端更需要有一套确定的规范

> 特征：

- 通过 module + exports 来对外暴露接口
- require 来调用其他模块

模块组织方式

```js
// commonJSCounterModule.js
const dependencyModule1 = require("./dependencyModule1");
const dependencyModule2 = require("./dependencyModule2");

let count = 0;
const increase = () => ++count;
const reset = () => {
  count = 0;
  console.log("hahaha count is reset");
};

// 暴露出去的方法一
exports.increase = increase;
exports.reset = reset;

// 暴露出去的方法一
module.exports = {
  increase,
  reset,
};

// main.js
const { increase, reset } = require("./commonJSCounterModule");
increase();

const commonJSCounterModule = require("./commonJSCounterModule");
commonJSCounterModule.increase();
```

实际执行的内部处理逻辑

```js
(function (exports, require, module, __filename, __dirname) {
  const dependencyModule1 = require("./dependencyModule1");
  const dependencyModule2 = require("./dependencyModule2");

  let count = 0;
  const increase = () => ++count;
  const reset = () => {
    count = 0;
    console.log("hahaha count is reset");
  };
  module.exports = {
    increase,
    reset,
  };

  return module.exports;
}).call(thisValue, exports, require, module, filename, dirname);

(function (exports, require, module, __filename, __dirname) {
  const commonJSCounterModule = require("./commonJSCounterModule");
  commonJSCounterModule.increase();
}).call(thisValue, exports, require, module, filename, dirname);
```

> - 优点：
>   CommonJS 规范在服务器端率先完成了 JavaScript 的模块化，
>   解决了依赖、全局变量污染的问题，
>   这也是 js 能够运行在服务端运行的必要条件

- 缺点：-- 没有异步
  由于服务端以及 commonjs 是同步加载模块的
  (服务端每个文件都保存在硬盘或内存里的, 数据同步加载没有问题,
  但浏览器端有很多异步服务:网络请求等)

##### AMD 规范(就是 CommonJs 异步版本的优化)

define + require

> 非同步加载模块，允许制定回调函数
> 经典的实现框架：require.js

新增了定义的方式：

```js
// 通过define来定义一个模块，然后require加载
define(id, [depends], callback); // id 是定义的这个模块的名字或者称为id
require([module], callback);
```

模块的定义方式：

```js
define("amdCounterModule", ["dependencyModule1", "dependencyModule2"], (
  dependencyModule1,
  dependencyModule2
) => {
  let count = 0;
  const increase = () => ++count;
  const reset = () => {
    count = 0;
    console.log("hahaha count is reset");
  };

  return {
    increase,
    reset,
  };
});

require(["amdCounterModule"], (amdCounterModule) => {
  amdCounterModule.increase();
  amdCounterModule.reset();
});
```

\*\* 面试题 2: 如果想在 AMD 中使用 require 方式加载同步模块可以么？可以
AMD 支持向前兼容的，以提供回调的形式来做 require 方法动态加载模块

```js
// 也是一种兼容的define方式
define((require) => {
  const dependecyModule1 = require("dependecyModule1");
  const dependecyModule2 = require("dependecyModule2");

  let count = 0;
  const increase = () => ++count;
  const reset = () => {
    count = 0;
    console.log("hahaha count is reset");
  };

  // 可以这样直接返回
  // return {
  //     increase,
  //     reset
  // }

  // revealing写法
  exports.increase = increase;
  exports.reset = reset;
});
```

\*\* 面试题 3: 有没有什么方式可以统一兼容 AMD 和 common
UMD 的出现
增加判断一下解析方式, 是用 AMD 还是 common

```js
((define) =>
  define((require, exports, module) => {
    const dependecyModule1 = require("dependecyModule1");
    const dependecyModule2 = require("dependecyModule2");

    let count = 0;
    const increase = () => ++count;
    const reset = () => {
      count = 0;
      console.log("hahaha count is reset");
    };

    module.export = {
      increase,
      reset,
    };
  }))(
  // 判断区分是否为AMD or common
  typeof typeof define === "function" && define.amd
    ? // AMD
      define
    : // CommonJS
      (factory) => (module.exports = factory(require, exports, module))
);
```

```js
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["moduleA"], factory);
  } else if (typeof exports === "object") {
    module.exports = factory(require("moduleA"));
  }
})(this, function (moduleA) {
  return someFunction;
});
```

- 优点：适合在浏览器环境中异步加载模块，同时又适用采用 common 模块的环境
- 缺点：提高了开发成本，并且不能按需加载，必须提前加载所有依赖

##### CMD 规范 -- 编译时的操作

> 应用于可优化方案中，代表：sea.js
> 特征：支持按需加载

```js
define(function (require, exports, module) {
  var $ = require("jquery");
  var dependencyModule1 = require("./dependencyModule1");

  // ……
  // exports.increase = ...
  // module.exports = ...
});
```

\*\* 面试题：CMD 和 AMD 区别

```js
// AMD 要把依赖提前都加载进来
define(["./dependencyModule1", "./dependencyModule2"], function (
  dependencyModule1,
  dependencyModule2
) {
  dependencyModule1.increase();
  dependencyModule2.reset();
});

// CMD - 编译时, 依赖就近: 只有需要的时候, 才加载这个依赖
define(function (require, exports, module) {
  let dependencyModule1 = require("./dependencyModule1");
  dependencyModule1.increase();

  // 编译时
  // 不需要的时候, 相关代码被隐藏掉
  // if (true) {
  //     let dependencyModule2 = require('./dependencyModule2');
  //     dependencyModule2.reset();
  // }
});
```

#### ES6 模块化 - ESM

> 走向新时代

新增定义方式：
在运行前,静态引入：import
在运行前,静态导出：export

模块引入、导出和定义的地方

```js
    import dependencyModule1 from './dependencyModule1'; // 同步
    import dependencyModule2 from './dependencyModule2';

    let count = 0;

    export const increase = () => ++count;
    export const reset = () => {
        count = 0;
        console.log('hahaha count is reset');
    };

    export default {
        increasem
        reset
    }
```

\*\* 面试题：动态模块的加载 (需要从远端加载过来,异步的)
考察的 import 和 promise

<!-- 原生 (es 11版本后支持) -->

```js
import("./esModule").then(({ increase, reset }) => {
  // 异步加载模块 esModule模块加载完了之后, 才能用该模块里的方法
  increase();
  reset();
});

import("./esModule").then((dynamicESModule) => {
  dynamicESModule.increase();
  dynamicESModule.reset();
});
```

### 未来: 解决模块化的新思路

#### 背景

根本问题： 运行时的分析依赖 (例如: require(). ), 基于代码处理

> 前端的模块化处理方案依赖于运行时进行分析，并且同时进行依赖加载处理以及实际的逻辑执行

解决方案：基于文件处理, 线下执行(改成编译时)

```js
    project
        | - lib
        |   |- xmd.js
        | - mods
            | - a.js
            | - b.js
            | - c.js
            | - d.js
            | - e.js
            | - f.js
        | - index.html

    // index.html
    <!doctype html>
    <script src="lib/xmd.js"></script>
    <script>
        {/* 做一个标识位, 等待构建工具生成数据替换`__FRAMEWORK_CONFIG__` */}
        {/* 在这里加载某些模块 */}
        require.config(__FRAMEWORK_CONFIG__);
    </script>
    <script>
        {/* 业务代码 */}
        require.async(['a', 'e'], function(a, e) {
            // ……
        })
    </script>

    // mods/a.js
    //  a 里面 又加载了模块 b 和 c
    define('a', function(require, exports, module) {
        let b = require('b');
        let c = require('c');
        exports.run = function() {
            //……
        }
    })

    // 工程化模块的构建
    // 1. 扫描生成依赖关系表
    {
        "a": ["b", "c"],
        "b": ["d"]
    }
    // 2. 生成构建模版
    <!doctype html>
    <script src="lib/xmd.js"></script>
    <script>
        {/* 替换`__FRAMEWORK_CONFIG__` 为依赖关系表*/}
        require.config({
            "deps": {
                "a": ["b", "c"],
                "b": ["d"]
            }
        });
    </script>
    <script>
        {/* 业务代码 */}
        require.async(['a', 'e'], function(a, e) {
            // ……
        })
    </script>
    // 3. 转化配置为依赖加载代码
    define('a', ["b", "c"], function(require, exports, module) {
       // ……
    })
```

#### 究极体：webpack

知识体系：上游 执行&作用域&原理 => 模块化 => 工程化
