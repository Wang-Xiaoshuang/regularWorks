从业务中自我提升和突破：发现问题>找到问题>获取痛点>制定方案

1.函数提升（最优先提升的） - 当前作用域之内

```js
f();
function f() {}
```

函数框定一个作用域；

2. let 声明不支持提升；var 的声明提升，值 undefined; 直接赋值，全局变量
3. 作用域向上查找

4. 优先级 : 函数声明先提升，变量覆盖函数

```js
console.log('before',f)

function f(){
    this.a = 'a'
    console.log('a')
}

  f = 'b' // 全局变量
  <!-- var f = 'b'  -->
  console.log('after',f)
```

5.  块级作用域：let 限制在当前作用域；var 不限制

```js
// 块级作用域
console.log(v);
if (true) {
  let f = "f";
  var v = "v";
}
```

总结：

1. 对于作用域链，直接通过创建态来定位作用域链（根据写出来的代码，就能通过分析层级来确定作用域链）。
   原因：作用域链是静态创建的。

2. 手动取消全局-- 通过块级作用域来声明非全局变量

### this 上下文 context

this 在执行时动态读取上下文，不是在创建时
（对这句话的解释：
this 指向当前运行到的这句话所执行的上下文。
模块里不同位置的 this 值可能不同，this 不是一个固定值）

重点-- 各使用态的指针指向

#### 函数直接调用 -- this 指向是 window

全局上执行的环境=> 函数表达式、匿名函数、嵌套函数 ...

```js
function foo() {
  console.log("函数内部", this);
}

foo(); // foo挂在window上，
```

#### 隐式绑定 -- this 指代 调用堆栈的上一级 (指针---动态地看待)

=> 对象、数组等引用关系逻辑

```js
function fn() {
  console.log("隐式绑定", this.a);
}
const obj = {
  //上一级
  a: 1,
  fn, // 调用堆栈
};
obj.fn = fn;
obj.fn(); // 执行到fn时，fn被挂载到obj同名的属性上
```

#### 面试题

```js
const foo = {
  bar: 10,
  fn: function () {
    console.log(this.bar);
    console.log(this);
  },
};
let fn1 = foo.fn; // 被取出 独立执行（执行是动态的，动态看待）
fn1(); // undefined Window

// 追问：改变属性指向
const o1 = {
  text: "o1",
  fn: function () {
    // 直接使用上下文 - 传统派活
    console.log("o1fn_this", this);
    return this.text;
  },
};

const o2 = {
  text: "o2",
  fn: function () {
    // 呼叫领导（o1) - 部门协作
    return o1.fn();
  },
};

const o3 = {
  text: "o3",
  fn: function () {
    let fn = o1.fn();
    return fn;
  },
};

const o4 = {
  text: "o4",
  fn: function () {
    // 直接内部构造 - 公共人（挂载在全局公共的方法，因为已经被拿出来）
    let fn = o1.fn;
    return fn();
  },
};

console.log("o1fn", o1.fn()); // o1
console.log("o2fn", o2.fn()); // o1
console.log("o3fn", o3.fn()); // *  o1
console.log("o4fn", o4.fn()); // *  undefined // this --> window
```

#### 追问：将 console.log('o2fn',o2.fn()) 的结果是 o2

1. 人为干涉，改变 this - bind / call / apply
2. 不许人为改变，改代码结构 --> 执行上下文 独立取出

#### 显式绑定

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

const bindFoo = foo.bind({
  a: 1,
});
bindFoo();
```

#### 改代码结构

```js
const o1 = {
  text: "o1",
  fn: function () {
    console.log("o1fn_this", this);
    return this.text;
  },
};

const o2 = {
  text: "o2",
  fn: o1.fn,
};
console.log("o2fn", o2.fn());
```

#### 面试题：call\apply\bind 的区别

1. call vs apply 传参不同 依次传入/数组传入
2. bind 直接返回不同

#### bind 原理/手写 bind

说明原理，写注释，根据注释补齐代码

```js
// 1. 需求：手写bind=> bind位置（挂载在哪里） => 函数 - Function.prototype
Function.prototype.newBind = function () {
  // 2. bind是什么？
  //  改变this指向 ；
  const _this = this; // 保护一下原有的this
  //  接受参数args, 第一项参数是新的this，第二项到最后一项是函数传参
  const args = Array.prototype.slice.call(arguments); // 将函数的实际参数转换成数组
  const newThis = args.shift(); // 第一项 -- 新的this

  // 3. 返回值
  return function () {
    return _this.newApply(newthis, args);
  };
};

// apply实现this指向的变更
Function.prototype.newApply = function (context) {
  context = context || window;

  // 挂载执行函数 -- 隐式绑定 -- 定义了新的上下文，把老的函数拿出来在它里执行
  context.fn = this;

  let result = arguments[1] ? context.fn(...arguments[1]) : context.fn();

  delete context.fn;
  return result;
};
```

### 闭包：一个函数和它周围状态的引用捆绑一起的组合

场景： -- 用于做复杂功能模块的梳理

1. 函数作为返回值的场景

```js
function mail() {
  // 函数是一个封闭的作用域
  let content = "信";
  return function () {
    console.log(content);
  };
}
const envelop = mail();
envelop();
```

2. 函数作为参数

```js
let content;
// 逻辑外壳
function envelop(fn) {
  // 通用存储
  content = 1;

  // 具体业务逻辑
  fn();
}

function mail() {
  console.log(content);
}
envelop(mail);
```

3. 函数嵌套

```js
let counter = 0;

// 模块封装 -- 下面有诺干的小模块；
// 函数封装，优点作用域限制，不突破outerFn的作用域
// 实现功能包outerFn内每个模块之间的数据共享 -- 闭包
function outerFn() {
  function innerFn() {
    // 模块1
    counter++;
    console.log(counter);
  }

  function innerFn2() {
    // 模块2
    counter--;
    console.log(counter);
  }

  if (true) {
    return innerFn;
  }
  return innerFn2;
}
outerFn()();

console.log(counter);

// 立即执行函数 => js模块化的基石
// 作用：限定作用域
let count = 0;
(function immediate() {
  if (count === 0) {
    let count = 1;

    console.log(count,this);
  }
})();

// 实现私有变量
function createStack(){
  return{
    items:[],
    push(item){
      this.item.push(item)
    }
  }
}
// 相当于
const stack = {
  items:[],
  push:fucntion(){

  }
}

function createStack(){
  // 不想让外界获得完整的items
  // 外界只能删改
  const items = []; // 私有变量
  return {
    push(item){
      items.push(item)
    }
  }
}
```
