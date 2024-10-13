## 作用域 + 上下文

### 作用域链 - xxx is undefined | 'value' of undefined

#### 1-1 梳理：

1. JS 引擎在正式执行之前先预编译
2. 函数声明提升（undefined），无论是否处于块级区域，都只储存到函数执行上下文中变量环境下的作用域中
3. 函数提升（可执行），在块级区域内提升，提升的优先级最高
4. var 变量声明-提升（undefined），无论是否处于块级区域，都只储存到函数执行上下文中变量环境下的作用域中
   （其实，也就是，var 和 function 的声明，都不受块级作用域的限制）
5. let 不支持提升
6. 作用域向上查找，向下传递
   先查找本地作用域，如果找到目标变量即返回，否则会去父级作用域继续查找...一直找到全局作用域。
   我们把这种作用域的嵌套机制，称为 作用域链。

7. 覆盖-函数被提升到最前，无论函数 function 写在什么位置，都会被后面的 var 声明、匿名|具名函数表达式的同名变量覆盖
8. 覆盖-var 声明、匿名|具名函数表达式的同名变量，按照位置顺序覆盖
9. let 不允许重复声明
10. let 包裹在新的块级作用域内，可声明与块级作用域之外同名的变量

11. 对于作用域链，我们直接通过创建态来定位作用域链 —— 是基于静态创建的，作用域类型是词法作用域（静态作用域）
12. 手动取消全局： 通过块级作用域，手动取消全局，把作用域划分得更细

兴趣小点：

1. 匿名|具名函数表达式的区别：
   具名就是个代理，可以忽视，仅有的用处是在浏览器的调用栈里可以看到该名称，更方便调试。
   在旧的浏览器里，匿名函数表达式可以显示出变量名。新的里面，改为空了

到 1.15

<!-- 拓展 https://www.cnblogs.com/liuhe688/p/5891273.html -->
<!-- 具名、匿名函数表达式的区别 https://segmentfault.com/q/1010000008209350 -->

#### 1-1

- 面试题：

```js
// 1. 执行顺序
let a = "global";
console.log(a);
// console.log(session); // 报错 undefined
// 此时，报错后，就不再往下执行了

// console.log(b); // 报错 undefined
// var声明的变量和函数声明，无论是否处于块级区域，都只储存到函数执行上下文中变量环境下的作用域中

// console.log(session); // 报错 undefined
function course() {
  var b = "js";
  console.log(b); //js

  console.log(session); //成功 undefined
  var session = 666;
  console.log(session); //666
  session();
  if (true) {
    console.log(session); // session()
    function session() {
      let c = "this";
      console.log(c);

      teacher(); // 2. 函数提升 - JS引擎会在正式执行之前先进行一次预编译,
      // 当前作用域内，将变量声明（undefined）及函数（可执行），提升至当前作用域的顶端
      function teacher() {
        // 2.1 let不支持提升
        // 2.2 变量通过var支持提升，声明提升
        // var e = undefined
        console.log(e);
        // console.log(d);
        let d = "yunyin";
        var e = "yy";

        console.log("test1", b); // 3. 作用域向上查找，向下传递
      }
    }
  }
}
course();

// 补充2.提升的实例
function hoistVariable() {
  if (!foo) {
    var foo = 5;
  }
  console.log(foo); // 5
}

hoistVariable();
// 解释-补充提升的实例：
// 预编译之后
function hoistVariable() {
  var foo;

  if (!foo) {
    foo = 5;
  }

  console.log(foo); // 5
}
hoistVariable();

// 拓展--作用域链-向上查找
var foo = 3;
function hoistVariable() {
  console.log(foo); // 3
}
hoistVariable();

// 拓展--作用域链-向上查找
function out() {
  var foo = 3;
  hoistVariable();
  function hoistVariable() {
    console.log(foo); // 3
  }
}
out();
// 拓展 -- 覆盖
var foo = 3;
function hoistVariable() {
  console.log(foo); // undefined
  var foo = foo || 5;
  console.log(foo); // 5
}
hoistVariable();
// 拓展 -- 覆盖
function out() {
  var foo = 3;
  hoistVariable();
  function hoistVariable() {
    console.log(foo); // undefined
    var foo = foo || 5;
    console.log(foo); // 5
  }
}
out();

// 函数提升 -- 覆盖
function hoistFunction() {
  function foo() {
    console.log(1);
  }

  foo(); // output: 2

  function foo() {
    console.log(2);
  }
}
hoistFunction();

// **********************************************************
// 提升优先级 -- 函数一等公民
console.log("yunyin", yunyin);
function yunyin() {
  this.course = "js";
}
var yunyin = "course";
console.log("222", yunyin);

// let不允许重复声明
console.log("yunyin", yunyin);
function yunyin() {
  this.course = "js";
}

let yunyin = "course";
console.log("out", yunyin); // 报错 Identifier 'yunyin' has already been declared

// let包裹在块级作用域内 -- 可以
console.log("yunyin", yunyin);
function yunyin() {
  this.course = "js";
}
if (true) {
  let yunyin = "course";
  console.log("in", yunyin); // course
}
// **********************************************************

// 匿名、具名函数表达式、函数声明 -- 覆盖
function hoistFunction() {
  foo(); // 2

  var foo = function () {
    console.log(1);
  };
  foo(); // 1

  function foo() {
    console.log(2);
  }
  foo(); // 1

  var foo = function () {
    console.log(3);
  };
  foo(); // 3
}
hoistFunction();

// 解释：预编译
// 函数是一等公民，函数声明的优先级最高，
// 会被提升至当前作用域最顶端，所以第一次调用时实际执行了下面定义的函数声明，
// 然后第二次调用时，由于前面的函数表达式与之前的函数声明同名，故将其覆盖，
// 以后的调用也将会打印同样的结果
// 预编译之后
function hoistFunction() {
  var foo;

  foo = function foo() {
    console.log(2);
  };

  foo(); // 2

  foo = function () {
    console.log(1);
  };

  foo(); // 1

  foo(); // 1
}
hoistFunction();

// 块级作用域
if (true) {
  let e = 111;
  var f = 222;
}
console.log(f); // 222
console.log(e); // 报错 undefined
```

- 1. 对于作用域链，我们直接通过创建态来定位作用域链 —— 是基于静态创建的
- 2. 手动取消全局： 通过块级作用域，手动取消全局，把作用域划分得更细

到 1：15 分

### this 上下文 context

#### 1-2 梳理

1. 执行上下文总 3 种类型：

   - 全局执行上下文（只有一个），
   - 函数执行上下文（存在无数个，只有在函数被调用的时候才会被创建，每次调用函数都会创建一个新的执行上下文，
   - eval 函数执行上下文（运行在 eval 函数中的代码）

2. 在全局环境中（在任何函数体外部的代码），this 始终指向全局对象
3. 在函数环境（函数执行上下文）中，绝大多数情况，函数的调用方式决定了 this 的值

   - 1. 函数直接调用中 —— this 指向的是 全局对象（浏览器里是 window)
   - 2. 隐式绑定 - this 指代调用堆栈的上一级 => 对象、数组等引用关系逻辑

4. 执行栈/调用栈
   首次运行 JS 代码时，会创建一个 ‘全局执行上下文’ 并推到当前执行栈中
   每当发生函数调用时，引擎都会为该函数创建一个 新的函数执行上下文 并推到当前执行栈的栈顶。

-- 1：53

#### 1-3 梳理

1. 显式绑定 （bind | apply | call）
2. fn.call(thisArg,1,2)
3. fn.apply(thisArg,[1,2])
4. fn.bind(thisArg, 1, 2)() 。 bind 返回的是一个函数，需要再执行一下

5. 手写 bind

- bind 位置（挂载在哪里）=> Function.prototype
- 取到新 this
- 返回函数 - 使用 newApply
- newApply 挂载 => Function.prototype
- 挂载执行函数--隐式绑定

6. 异步队列 => async queue，例如 setTimeout。
   执行里面的函数时，this 是 Window

拓展知识
Array.prototype.slice.call()

1. Array.prototype.slice.call() 方法可以将一个具有 length 属性的对象转换为数组 (es5)
2. 与 [].slice.call() 方法等价 (es5)
3. es6 提供一个等价的方法 Array.from(arguments) .可转换 '类数组对象' 和 '可遍历对象'（包括 es6 的 Set 和 Map)
4. es6 扩展运算符 ... ，将某些数据结构转换成数组 [...arguments]

-- 2：09

#### 1-4 梳理

1. 闭包： 有权访问另一个函数内部变量的函数，称为闭包。
2. 闭包本质:利用了作用域的机制--作用域链，来达到外部作用域访问内部作用域的目的
3. 经典的闭包场景

   1)函数作为返回值的场景,实现私有变量 -- 返回处理内部变量的方法,不让外界用未定义的方法处理内部变量

   2)函数作为参数传入 -- 外部函数是一个逻辑外壳，只传入函数对内部变量进行逻辑处理

   3)函数嵌套 -- 函数分装，一个工具包里有多个小工具
   没有变作用域，但是通过外部传入的参数，决定内部哪个函数执行
   好处：每一个小工具的作用域，被限制在工具包里，不会突破外部函数的作用域
   但是可以在工具包内，实现小工具之间的模块共享 -- 通过闭包

   4)立即执行函数 IIFE => js 模块化的基石

拓展：

1.  let|const 和 var 声明的变量区别
    1. var 声明的变量，不受块级作用域限制，是全局变量
       （说明 js 不是原生支持块级作用域的）
    2. (es6) let|const 声明的变量 ，在块级作用域内

---

#### 1.15 1-2 内容

1. 动态执行是，判断上下文，也就是指针 this

- 我家门前有条河，门前的河上有座桥，门前的河里有群鸭
- 我家门前有条河，这河上有座桥，这河里有群鸭

- this 是执行时动态读取上下文决定的，而不是创建时。是在这句话被执行时，才有具体含义。

考察重点 —— 各使用态的指针指向

##### 函数直接调用中 —— this 指向的是 window (浏览器的全局对象是 window)

在全局环境中（在任何函数体外部的代码），this 始终指向全局对象
=> 全局上执行的环境 => 函数表达式、匿名函数、嵌套函数

```js
function foo() {
  var a = 1
  console.log("函数内部", this.a);
}

foo(); // undefined
```

##### 隐式绑定 - this 指代调用堆栈的上一级 => 对象、数组等引用关系逻辑

```js
function fn() {
  console.log("隐式绑定", this.a);
}
const obj = {
  a: 1,
  fn,
};

obj.fn();
```

##### 面试题：

```js
const foo = {
  bar: 10,
  fn: function () {
    console.log(this.bar);
    console.log(this);
  },
};
// 取出
let fn1 = foo.fn;
// 独立执行 undefined window
fn1();

// 追问1: 如何改变属性指向
const o1 = {
  text: "o1",
  fn: function () {
    // 直接使用上下文 - 传统派活
    console.log("o1fn-this", this);
    return this.text;
  },
};

const o2 = {
  text: "o2",
  fn: function () {
    console.log("o2fn-this", this);
    // 呼叫领导执行 —— 部门协作
    return o1.fn();
  },
};

const o3 = {
  text: "o3",
  fn: function () {
    console.log("o3fn-this", this);
    // 直接内部构造 —— 公共人
    let fn = o1.fn;
    return fn(); // 执行o3.fn()时，此行的fn，在全局上执行的环境 window
  },
};

console.log("o1fn", o1.fn());
console.log("o2fn", o2.fn());
console.log("o3fn", o3.fn());
```

- 拓展
  https://i-want-offer.github.io/FE-Essay/JavaScript/%E6%9C%A8%E6%98%93%E6%9D%A8%E5%89%8D%E7%AB%AF%E8%BF%9B%E9%98%B6/%E8%B0%83%E7%94%A8%E5%A0%86%E6%A0%88.html#%E6%89%BE%E4%B8%8D%E5%90%8C

```js
var scope = "global scope";
function checkscope() {
  var scope = "local scope";

  function f() {
    return scope;
  }

  return f();
}
checkscope();
```

##### 追问：现在我要将 console.log('o2fn', oa.fn())的结果是 o2

```js
// 1. 人为干涉，改变this - bind / call / apply
o2.fn.call(o2);
// 2. 不需人为改变
const o1 = {
  text: "o1",
  fn: function () {
    // 直接使用上下文 - 传统派活
    console.log("o1fn", this);
    return this.text;
  },
};

const o2 = {
  text: "o2",
  fn: o1.fn,
};
console.log("o2fn", o2.fn());
```

#### 1.53 内容 1-3

##### 显式绑定 （bind | apply | call）

```js
function foo() {
  console.log("函数内部", this);
}

foo();

// 使用
foo.call({
  a: 1,
});
foo.apply({
  a: 1,
});

// bind 不同：返回的是一个函数，绑定后要再执行一下
const bindFoo = foo.bind({
  a: 1,
});
bindFoo();
```

##### 面试题：call、apply、bind 的区别

1. call vs apply 传参不同 依次传入/数组传入 .call(newContext,1,2) || .apply(newContext,[1,2])
2. bind 直接返回不同。 bind 返回的是一个函数，需要再执行一下。call 和 apply 直接返回执行后的结果

##### bind 的原理 / 手写一个 bind

- 原理或者手写类的题目， 解题思路

1. 说明原理，写下注释
2. 根据注释补齐代码

<!-- 拓展知识 Array.prototype.slice.call() -->

1. Array.prototype.slice.call() 方法可以将一个具有 length 属性的对象转换为数组 (es5)
2. 与 [].slice.call() 方法等价 (es5)
3. es6 提供一个等价的方法 Array.from(arguments) .可转换 类数组对象 和 可遍历对象（包括 es6 的 Set 和 Map)
4. es6 扩展运算符 ... ，将某些数据结构转换成数组 [...arguments]

```js
// 1. 需求：手写bind => bind位置（挂载在哪里）=> Function.prototype
Function.prototype.newBind = function () {
  // 2. bind是什么？
  // 改变this
  const _this = this;
  // 接受参数args，第一项参数是新的this，第二项到最后一项是函数传参
  const args = Array.prototype.slice.call(arguments);
  const newThis = args.shift();

  // 3. 返回值
  return function () {
    return _this.newApply(newThis, args);
  };
};

Function.prototype.newApply = function (context) {
  const newContext = context || window;

  // 挂载执行函数--隐式绑定
  const _this = this;
  newContext.fn = _this;

  let result;
  if (arguments[1]) {
    result = newContext.fn(...arguments[1]);
  } else {
    result = newContext.fn();
  }

  delete newContext.fn;
  return result;
};

function logX() {
  console.log(this.x, "xxx");
  console.log(arguments);
}

logX.newBind({ x: 1 }, 1, 2, 3)();
```

#### new

```js
class Course {
  constructor(name) {
    this.name = name;
    console.log("this", this); // Course
  }
  test() {
    console.log("this1", this); // Course
  }
  asyncTest() {
    // 异步队列 => async queue
    setTimeout(function () {
      console.log("this_async", this); // Window
    }, 100);
  }
}

const course = new Course("this");
course.test();
course.asyncTest(); // Window
```

### 2.09 内容 1-4

#### 闭包：一个函数和他周围状态的引用捆绑在一起的组合

有权访问另一个函数内部变量的函数，我们称为'闭包'。
闭包的本质是利用了作用域的机制，来达到外部作用域访问内部作用域的目的

过度使用会导致闭包内的变量所占用的内存空间无法释放，带来 内存泄露 的问题。？标记清除 、 计数清除

<!-- 拓展 https://juejin.cn/post/6844904165672484871 -->

经典的闭包场景

```js
// 1. 函数作为返回值的场景 -- 直接把打鱼的方法返回
function mail() {
  let content = "信";
  return function () {
    console.log(content, "content");
  };
}
const envelop = mail();
envelop();

// -------------------------------------
// --- 拓展： let|const 和 var 声明的变量区别
// var 声明的变量 挂载在window,是全局变量
// es6 let|const 声明的变量 ，在块级作用域内
content = "外部信";
function mail() {
  console.log(this, "this");
  let content = "信";
  return function () {
    console.log(this.content, "this.content");
    console.log(content, "content");
  };
}
const envelop = mail();
envelop();

// -------------------------------------

// 2. 函数作为参数的时候 -- envelop逻辑外壳，防止意外改变数据，只传入函数做逻辑处理

let content;
function envelop(fn) {
  content = 1;

  fn();
}

function mail() {
  console.log(content);
}
envelop(mail);

// 3. 函数嵌套（工具包） -- 函数分装，一个工具包里有多个小工具
// 没有变作用域，但是通过外部传入的参数，决定内部哪个函数执行
// 好处：每一个小工具的作用域，被限制在工具包里，不会突破outerFn
// 但是可以在工具包内，实现小工具之间的模块共享 -- 通过闭包
let counter = 1;

function outerFn() {
  function innerFn() {
    counter++;
    console.log(counter);
  }
  function innerFn2() {
    counter--;
    console.log(counter);
  }

  if (counter > 0) {
    return innerFn2;
  }
  return innerFn;
}

outerFn()();

// 4. 立即执行函数IIFE => js模块化的基石
// 限定住作用域
let count = 0;
(function immediate(args) {
  if (count === 0) {
    let count = 1;

    console.log(count);
  }
})(args);

// 5. 实现私有变量
function createStack() {
  return {
    items: [],
    push(item) {
      this.item.push(item);
    },
  };
}

const stack = {
  items: [],
  push: function () {},
};

//  不想让外界获得完整的items
// 解决：闭包 + 返回函数
function createStack() {
  const items = [];
  return {
    push(item) {
      items.push(item);
    },
  };
}
```
