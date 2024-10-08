面向对象 + 构造函数 + 继承

我的俗语：就是一个对象，获取里面属性和方法。这些属性和方法，一些是对象自身私有的，一些是从爸爸上拿来直接用的。
所有开发者，都想能打造出复用性高、抽象得好的好爸爸，面向对象编程的目的

在本文讲解的内容里的 this，大部分都是在指向一个对象，通过 this 来找这个对象的属性和方法，并顺着它的原型链，一直向上找过去

本文逻辑：

1. 介绍一下对象，对象的封闭作用域特点，有助于高度模块化
2. 为什么不直接用对象来进行继承？引出构造函数
3. 明白原型链，实例、对象原型、构造函数
4. 讲继承，怎么实现一个好的继承

# 面向对象

### 对象是什么？为什么要面向对象？

### 梳理 2-1

1. 对象，封装了属性和方法
2. 面向对象的特点：逻辑上迁移更加灵活、代码复用性更高、高度的模块化（封闭的作用域）
3. 简单对象的问题：属性容易被改变，多个场景同时使用的时候，无法保持每个场景的特殊性
4. 解决方式：函数对象，即构造函数，在每处场景去生成一个新的实例，每个实例都是独立的。改一个实例，不会影响到另一个实例

### 内容 2-1

通过代码抽象，进而描述单个种类物体的方式

#### 特点：面向对象 —— 逻辑上迁移更加灵活、代码复用性更高、高度的模块化

（模块化是封闭作用域的开始，不会导致作用域的混乱和泄露）

#### 对象的理解

- 对象是对于单个物体的简单抽象
- 对象是容器，封装了属性 & 方法
  ** 属性：对象状态
  ** 方法：对象的能力 & 行为

```js
// 简单对象
const Course = {
  teacher: "yunyin",
  leader: "xh",
  startCourse: (name) => {
    return `开始${name}课`;
  },
};

// 出现问题：简单对象里的属性很容易被改变，多个场景同时使用的时候，无法保持每个场景的特殊性
// A
Course.teacher = "xxxx";
Course.startCourse("react");
// B
Course.startCourse("vue");

// 函数对象 -- 解决方法
function Course() {
  this.teacher = "yunyin";
  this.leader = "xh";
  this.startCourse = (name) => {
    return `开始${name}课`;
  };
}
```

# 构造函数 - 生成对象 => 这个对象，称为：实例

### 梳理 2-2

1. js 本质，是基于构造函数 + 原型链
2. 构造函数

- 1. 函数体内使用的 this，指向所要生成的实例
- 2. 生成对象用 new 来实例化
- 3. 可以初始化传参

3. 如果在项目中需要使用，且不希望外界进行感知情况下。如何让外界直接拿到实例化后的对象？
   => 单例模式 singleton design pattern （路由、全局状态机的存储）

   1. 通过构造函数的静态函数实现
   2. 通过 ES6 Class 的静态方法实现，static 里的 this 指向类本身
   3. 优化 1：代理，使用IIFE。可以依旧通过 new 关键词来获取实例

   应用场景：遮罩层

### 梳理 2-3

1. new 的原理

- 1. 结构上：创建空对象，为实例对象
- 2. 属性上：改对象原型————将空对象的对象原型指向了构造函数的 prototype 属性
- 3. 关系上：改 this————将空对象赋给了内部的 this
- 4. 生命周期上：初始化————执行了构造函数的初始化代码
- 5. 返回上：判断返回值类型————对象类型-返回该对象，原始类型-第一步创建的空对象

2. 每个实例是独立的。修改一个实例的属性，不会像简单函数那样影响到另一个实例
3. 对象的`构造函数属性 constructor` 的原理

- 1. 每个对象在创建时，会自动拥有一个构造函数属性 constructor
- 2. constructor 源自对象原型，指向了构造函数的引用

- 实例获得了模版的属性

2. Object.create 怎么实现？ F.prototype = p

### 梳理 2-4

1. 原型链，涉及到 3 个部分：构造函数、实例、对象原型（也叫做原型对象、原型）
2. 实例的属性`__proto__`指向的对象原型`[[Prototype]]`，
   构造函数的`prototype`也指向对象原型`[[Prototype]]`
3. 实例 和 对象原型 的 `constructor`属性，都指向了构造函数
4. ```js
   course1._proto_._proto_ === Object.prototype;
   Course.prorotype._proto_ === Object.prototype;
   Course.prototype.constructor === Course;
   course1._proto_._proto_._proto_ === null;
   ```
5. 对象找一个属性的时候，
   不停地通过`__proto__`去找对象原型、对象原型的对象原型，直到为 null
6. Object.prototype 是最基础的原型，所有对象默认都拥有它
   Object.prototype 的原型是 null，所以它位于原型链的终点
7. 对象的原型可以通过`__proto__`语法手动绑定，像 `{ a: 1, b: 2, __proto__: c } `

<!-- 其他 -->

7. Object.create(obj)
   以一个现有对象作为原型，创建一个新对象
   返回一个空对象，该对象的`__proto__`指向的对象原型是 obj
8. `__proto__`非标准，不可用它去直接修改，
   直接修改在每个浏览器和 JavaScript 引擎中都是非常缓慢的，
   存在一些安全问题和隐患。
   js 有提供专门的接口 Object.getPrototypeOf(Instance) 、Object.setPrototypeOf(Instance,Prototype)
9. `instanceof` ———— swan instanceof Swan
   定义：to see if the `prototype` property of a constructor
   appears anywhere in the prototype chain of an object.

### 梳理 2-5

一、 继承

1. 原型链直接继承: 直接修改子函数的 prototype
   LOL.prototype = new Game();
   LOL.prototype.constructor = LOL;

   - 缺点：
     - 1.共享属性
     - 2.子向父传参

2. 经典继承：在子类的构造函数内部调用父类的构造函数
   本质是 copy，运行了一遍 Game 函数，不是通过原型链去拿的

   ```js
   // 改成
   function LOL(arg) {
     Game.call(this, arg);
   }
   ```

   缺点：拿不到原型链上的共享方法

3. 组合继承

   ```js
   // 再增加第一步的操作
   LOL.prototype = new Game();
   LOL.prototype.constructor = LOL;
   ```

   缺点：调用两次父类的构造函数

4. 寄生组合继承
   ```js
   // 改成
   LOL.prototype = Object.create(Game.prototype);
   ```

二、多重继承

```js
function LOL(arg) {
  Game.call(this, arg);
  Store.call(this, arg);
}

LOL.prototype = Object.create(Store.prototype);
Object.assign(LOL.prototype, Game.prototype);
LOL.prototype.constructor = LOL;
```

### 内容 2-2 0.20

#### 需要一个模版 - 表征了一类物体的共同特性，从而生成对象

#### 类，即对象模版

#### js 其实本质上并不是基于类，而是基于构造函数 + 原型链

```js
function Course() {
  this.teacher = "yunyin";
  this.leader = "xh";
  this.startCourse = (name) => {
    return `开始${name}课`;
  };
}

const course = new Course(args);
```

#### 所以， function Course 本质就是构造函数

- 1. 函数体内使用的 this，指向所要生成的实例
- 2. 生成对象用 new 来实例化
- 3. 可以初始化传参

#### 追问：

#### 如果构造函数不用 new 去实例化，可以使用具有相同能力吗？ - 无法具有

#### 如果在项目中需要使用，且不希望外界进行感知情况下。如何让外界直接拿到实例化后的对象？ => 单例模式 singleton design pattern

（解释：有些时候，就是要全局唯一性，例如路由、全局状态机的存储，必须是单例模式，全局只有一个被该构造函数实例化的对象）

<!-- 3种单例实现方式 -->

```js
// 通过构造函数的静态函数实现
// 在GlobalUser挂载了一个getInstance方法
// 调用getInstance方法后，又在GlobalUser上挂载了instance属性
function GlobalUser(name) {
  this.name = name;
  this.id = 1002;
}
// 基于构造函数的静态函数作为统一入口，Constructor.getInstance()
GlobalUser.getInstance = function (name) {
  // 注意这里的this指向的是构造函数GlobalUser
  if (this.instance) return this.instance;
  // 第一次没有创建
  return (this.instance = new GlobalUser(name));
};
// GlobalUser此时打印：  [Function: GlobalUser] { getInstance: [Function (anonymous)] }
console.log(GlobalUser);
console.log(GlobalUser.getInstance("张三").name); // 张三
// GlobalUser此时打印：
// [Function: GlobalUser] {
//   getInstance: [Function (anonymous)],
//   instance: GlobalUser { name: '张三', id: 1002 }
// }
console.log(GlobalUser.getInstance("李四").name); // 张三，依然是张三，复用了第一次创建的实例
console.log(GlobalUser.getInstance() === GlobalUser.getInstance()); // true
```

ES6 的 Class 版本的 static 静态方法

```js
// 通过静态方法实现
class GlobalUser {
  constructor(name) {
    this.name = name;
    this.id = 1002;
  }
  static getInstance(name) {
    //静态方法属于类本身，这里的this也就指向类本身
    if (!this.instance) this.instance = new GlobalUser(name);
    return this.instance;
  }
}
console.log(GlobalUser.getInstance("张三").name); // 张三
console.log(GlobalUser.getInstance("李四").name); // 张三，依然是张三，复用了第一次创建的实例
console.log(GlobalUser.getInstance() === GlobalUser.getInstance()); // true
```

代理 —— 为了可以直接通过 new 关键字来创建实例

```js
// 单例构造函数
function CreateSingleton(name) {
  this.name = name;
}

// 获取实例的名字
CreateSingleton.prototype.getName = function () {
  console.log(this.name);
};

// 单例对象
// 构造函数有返回值，返回值是对象时，此时的 new 操作直接返回该函数的返回值
var Singleton = (function () {
  var instance;
  return function (name) {
    if (!instance) {
      instance = new CreateSingleton(name);
    }
    return instance;
  };
})();

// 创建实例对象1
var a = new Singleton("a");
// 创建实例对象2
var b = new Singleton("b");

console.log(a === b);
```

应用：遮罩层 <!-- https://segmentfault.com/a/1190000012842251 -->

- 单例模式的启发：编写底层 api 代码时，尽量做到不让外部去感知区分内部类型

## 内容 2-3 0.39

#### 引发思考： new 是什么？/ new 的原理？/ new 时候做了些什么？

```js
function Course() {}
const course = new Course();
```

- 1. 结构上：创建了一个空对象，作为返回的对象实例
- 2. 属性上：将生成空对象的对象原型指向了构造函数的 prototype 属性
- 3. 关系上：将当前实例对象赋给了内部的 this
- 4. 生命周期上：执行了构造函数的初始化代码
- 5. 返回上：当构造函数有返回值时 是对象类型则返回该对象，是原始类型则返回第一步创建的空对象

```js
// 实现一个 new
function newFunc(Father) {
  if (typeof Father !== "function") {
    throw new Error("new operator function the first param must be a fucntion");
  }

  var obj = Object.create(Father.prototype);
  var result = Father.apply(obj, Array.prototype.slice.call(arguments, 1));
  return result && typeof result === "object" ? result : obj;
}
```

那反过来，Object.create 怎么实现？

```js
function inherit(p) {
  if (p == null) throw TypeError();
  if (Object.create) {
    return Object.create(p);
  }

  var t = typeof p;
  if (t !== "object" && t !== "function") throw TypeError();

  // - 返回了一个对象；
  // - 这个对象的原型，指向了这个函数 Function 的 prototype；

  function F() {}
  F.prototype = p;
  return new F();
}
```

#### 追问：实例属性影响 —— 独立的

```js
function Course(teacher, leader) {
  this.teacher = teacher;
  this.leader = leader;
}
const course1 = new Course("yunyin", "xh"); // course1.leader => xh
const course2 = new Course("yunyin", "bubu"); // course2.leader => bubu
course2.teacher = "xxxx"; // course1.teacher => yunyin
```

### constructor 是什么？

```js
function Course(teacher, leader) {
  this.teacher = teacher;
  this.leader = leader;
}
const course = new Course("yunyin", "xh");
```

- 1. 每个对象在创建时，会自动拥有一个构造函数属性 constructor
- 2. constructor 源自对象原型，指向了构造函数的引用

- 实例获得了模版的属性 => (大胆点)继承了类的属性

## 内容 2-4 1.13

#### 对象原型

```js
function Course() {}
const course1 = new Course();
const course2 = new Course();
// * 1. Course - 用来初始化创建对象的函数 ｜ 类
// __proto__ -- 对象原型
course1.__proto__ === Course.prorotype;

// * 2. course1 - 根据原型创建出来的实例
course1.constructor === Course;

// 补充
function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function () {
  console.log(this.name);
};

let person = new Person("Ayush");
console.log(person.name); // "Ayush"
console.log(person.__proto__ === Person.prototype); // true
console.log(person.sayName === Person.prototype.sayName); // true
```

```js
let obj1 = {
  name: "object 1",
};

let obj2 = Object.create(obj1);
obj2.name = "object 2";
console.log(obj2.__proto__ === obj1); // true
```

- prototype 是什么？ 原型

```js
// 用处：实例之间，属性隔离开，方法共用
function Course() {
  this.teacher = "yunyin";
  this.leader = "xh";
}
const course1 = new Course();
const course2 = new Course();

Course.prototype.startCourse = (name) => {
  return `开始${name}课`;
};
```

```js
_proto_ 实例查找兜底的属性值
```

- 追问，对象原型有自己的原型吗？

```js
course1._proto_._proto_ === Object.prototype;
Course.prorotype._proto_ === Object.prototype;
Course.prototype.constructor === Course;
course1._proto_._proto_._proto_ === null;
```

<!-- 查看画图 -->

原型链

是在找对象的属性！

作用域是在找有没有这个变量！

<!-- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain -->

每个对象（object）都有一个私有属性指向另一个名为原型（prototype）的对象。
对象原型也有一个自己的原型，层层向上直到一个对象的原型为 null。
根据定义，null 没有原型，并作为这个原型链（prototype chain）中的最后一个环节。

值得注意的是，`{ __proto__: ... }` 语法与 `obj.__proto__` 访问器不同：前者是标准且未被弃用的。

<!-- 手动绑定 -->

在像 `{ a: 1, b: 2, __proto__: c } `

<!-- 手动绑定不方便。所以，使用构造函数 -->

这样的对象字面量中，
c 值（必须为 null 或另一个对象）将变成字面量所表示的对象的 `[[Prototype]]`，
而其他键（如 a 和 b）将变成对象的自有属性。
这种语法读起来非常自然，因为` [[Prototype]]` 只是对象的“内部属性”。

```js
// 注意作用域链 和 原型链的区别
const parent = {
  value: 2,
  method() {
    return this.value + 1;
  },
};

console.log(parent.method()); // 3
// 当调用 parent.method 时，“this”指向了 parent

// child 是一个继承了 parent 的对象
const child = {
  __proto__: parent,
};

// 话外： 作用域相关
const parent2 = {
  value: 2,
  method() {
    return value + 1;
  },
};
console.log(parent2.method()); // ERROR: value is not defined
// *****************************

const fn = child.method;
console.log(fn()); // NaN

console.log(child.method()); // 3
// 调用 child.method 时，“this”指向了 child。
// 又因为 child 继承的是 parent 的方法，
// 首先在 child 上寻找“value”属性。但由于 child 本身
// 没有名为“value”的自有属性，该属性会在
// [[Prototype]] 上被找到，即 parent.value。

child.value = 4; // 在 child，将“value”属性赋值为 4。
// 这会遮蔽 parent 上的“value”属性。
// child 对象现在看起来是这样的：
// { value: 4, __proto__: { value: 2, method: [Function] } }
console.log(child.method()); // 5
// 因为 child 现在拥有“value”属性，“this.value”现在表示
// child.value
```

# 继承

## 内容 2-5 1.37

js 如何实现继承

#### 在对象原型的所有属性方法，都可以被实例所共享

```js
function Game() {
  this.name = "lol";
}
Game.prototype.getName = function () {
  return this.name;
};

// LOL
function LOL() {}
LOL.prototype = new Game();
LOL.prototype.constructor = LOL;
const game = new LOL();
// 本质：重写了对象原型方式，将父对象的属性方法，作为自对象对象原型的属性方法，同时重写构造函数
```

#### 追问：原型链直接继承有什么缺点

```js
function Game() {
  this.name = "lol";
  this.skin = ["s"];
}
Game.prototype.getName = function () {
  return this.name;
};

// LOL
function LOL() {}
LOL.prototype = new Game();
LOL.prototype.constructor = LOL;
const game1 = new LOL();
const game2 = new LOL();
game1.skin.push("ss");
// 此时，game2也有ss了
// 本质：重写了对象原型方式，将父对象的属性方法，作为自对象对象原型的属性方法，同时重写构造函数
```

- 1. 父类属性一旦赋值给到子类的原型属性，
     此时属性属于子类的共享属性了 (game2 也有 ss)
     理解：子类的自身属性里没有父类的自身属性，
     所有子类共享父类的自身属性，
     一个子类改变了父类的属性，其他子类里取该属性值时都变
- 2. 实例化子类时，无法向父类进行传参

#### 解决方法：构造函数继承

##### 经典继承：在子类的构造函数内部调用父类的构造函数

```js
function Game(arg) {
  this.name = "lol";
  this.skin = ["s"];
}
Game.prototype.getName = function () {
  return this.name;
};

function LOL(arg) {
  // 本质是copy，运行了一遍Game函数，不是通过原型链去拿的
  Game.call(this, arg);
}

const game3 = new LOL("arg");
// 解决了共享属性问题 + 子向父传参的问题
// 问题，拿不到原型链上的共享方法getName
```

追问：原型链上的共享方法无法被读取继承，如何解决？

#### 组合继承

```js
function Game(arg) {
  this.name = "lol";
  this.skin = ["s"];
}
Game.prototype.getName = function () {
  return this.name;
};

function LOL(arg) {
  Game.call(this, arg);
}
LOL.prototype = new Game();
LOL.prototype.constructor = LOL;
const game4 = new LOL("arg");
```

追问：组合继承方式就没有缺点吗？
问题在于：无论何种场景，都会调用两次父类的构造函数

#### 解决方案：寄生组合继承

```js
function Game(arg) {
  this.name = "lol";
  this.skin = ["s"];
}
Game.prototype.getName = function () {
  return this.name;
};

function LOL(arg) {
  Game.call(this, arg);
}
// Object.create 返回一个简单对象
// 不直接使用Game.prototype
// 因为，接下来改 constructor ，会把 Game.prototype.constructor 给改了
LOL.prototype = Object.create(Game.prototype);
LOL.prototype.constructor = LOL;
const game5 = new LOL("arg");
```

#### 拔高：如何实现多重继承？

<!-- 继承两个爸爸 -->

```js
function Game(arg) {
  this.name = "lol";
  this.skin = ["s"];
}
Game.prototype.getName = function () {
  return this.name;
};

function Store() {
  this.shop = "steam";
}
Store.prototype.getPlatform = function () {
  return this.shop;
};

function LOL(arg) {
  Game.call(this, arg);
  Store.call(this, arg);
}

LOL.prototype = Object.create(Store.prototype);
Object.assign(LOL.prototype, Game.prototype);
LOL.prototype.constructor = LOL;
```

Object.assign() 静态方法
将一个或者多个源对象中所有可枚举的自有属性,
复制到目标对象`LOL.prototype`，
并返回修改后的目标对象。

<!-- 拓展 -->

Object.assign() 有一个深拷贝的问题
