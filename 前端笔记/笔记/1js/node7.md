# 函数式编程

## 函数式编程的出现

1. 发展历程：命令（脚本）式 => 面向对象 => 函数式

### 问题的出现 -- 基础面试题

```js
// 上节浏览器原理 - 参数parse
// 1. 数组在url中展示形式
// location.search => '?name[]=progressive$%coding&name[]=objective$%coding&name[]=functional$%coding'
// 2. 参数提取出来并且拼接成数组
// ['progressive$%coding','objective$%coding','functional$%coding']
// 3. 转化成对象
// [{
//    name:'Progressive Coding',
// },{
//    name:'Objective Coding',
// },{
//    name:'Functional Coding',
// }]

const _array = [
  "progressive$%coding",
  "objective$%coding",
  "functional$%coding",
];
const _objArr = [];

const nameParser = (array, objArr) => {
  array.forEach((i) => {
    let names = i.split("$%");
    let newName = [];

    // 内部处理
    names.forEach((name) => {
      // slice取下第一个元素，剩下的全返回
      let nameItem = name[0].toUpperCase() + name.slice(1);

      newName.push(nameItem);
    });
  });
  // ......
  return objArr;
};
console.log(nameParser(_array, _objArr));

// 存在的问题
// 1. 存在包裹逻辑 forEach很多 - 看完整段才明白在做啥
// 2. 存在临时变量，并且收尾封闭 - 迭代拓展难度高
```

#### 2.解决方案

```js
// step1: 需求分析 ： 数组 > 数组对象=> [字符串 > 对象]
// nameParser => [objHelper :: string > object]

// step2：功能明确 => objHelper = formatName + assembleObj

// step3：功能拆分 => objHelper = [(split + capitalize + join)] + assembleObj

// step4：代码实现
const _array = [
  "progressive$%coding",
  "objective$%coding",
  "functional$%coding",
];

// 原子操作实现
const assembleObj = (key, v) => {
  let obj = {};
  obj[key] = x;
  return obj;
};

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

// 一次只做一件事
//......

// 声明结构
const formatName = ()
```

### 二、函数式编程的原理特点

#### 1. 什么是函数式原理

#### 2. 理论思想

1. 函数是一等公民 => 实际功能逻辑落脚点 - 函数； 实现函数 + 拼接流程
2. 声明式编程 => 声明需求
3. 惰性执行 - 无缝连接，性能节约

```js
// 惰性函数
const program = (name) => {
  if (name === "progressive") {
    return () => {
      // ...
    };
  }
  if (name === "objective") {
    return () => {
      // ...
    };
  }
};
```

#### 3. 每一个函数都 无状态 + 无副作用

1、 无状态（幂等）：不可改变数据源，每次都干一样的事（没有改变 state,没有用 state)
2、无副作用：函数内部不应该直接对整个系统中任何参数或变量进行改动

### 三、实际开发

#### 1. 纯函数改造

```js
const _class = {
  name: "objective",
};

// 函数内部引入了外部变量 - 违背无状态
// 直接使用外部变量_class
const score = (str) => _class.name + ":" + str;

// 修改了输入参数 - 违背无副作用
const changeClass = (obj, name) => (obj.name = name);

// 改造：实现纯函数

// 和外部变量无耦合
const score = (obj, str) => obj.name + ":" + str;
// 未直接修改外部变量
const changeClass = (obj, name) => ({ ...obj, name });
```

面试题：副作用函数（重点 - 红宝书）
split slice splice ..... 是不是纯函数？

### 2. 流水线组装 - 加工和拼接

#### 加工 - 柯里化

把单次执行单次传参变成多次执行多次传参

```js
// f(x,y,z)=>f(x)(y)(z)
const sum = (x, y) => {
  return x + y;
};
sum(1, 2);

const add = (x) => {
  return (y) => {
    return x + y;
  };
};
add(1)(2);

// 要实现一个体系 = 加工 + 组装， 单个函数输入输出应该单值化 -- 单元函数（做柯里化的原因）
const fetch = ajax(method, url, params);

// 实现
const fetch = ajax.get(method);
const request = fetch(url);
组装(fetch, request);
```

面试题：手写构造可拆分传参的累加函数
add(1)(2)(3)(4)

```js
// 1. 构造柯里化的结构 => 输出函数
// 2. 输入值  处理外层的arguments => 类数组处理
// 3. 传入参数无线拓展 => 递归 => 返回递归函数本身
// 4. 主功能 => 累加函数
// 5. 输出 从函数到产出 ； 使用一个toString属性

const add = function () {
  // 2. 输入值  处理外层的arguments => 类数组处理
  let args = Array.prototype.slice.call(arguments);

  // 1. 构造柯里化结构

  let inner = function () {
    // 主功能
    args.push(...arguments);
    return inner;
  };

  // 3. 最终返回值的输出，通过toSring方法
  //   覆盖toSring
  //   innner是内部自己定义的，改变inner.toSring 不违反纯函数的原则
  inner.toSring = function () {
    return args.reduce((pre, cur) => {
      return pre + cur;
    });
  };
  return inner;
};

// 得到结果 - add(1)(2)(3)(4)+''

// 用真正的toString -- 利用call直接运行toString
```

##### 2. 流水线 - 组装函数

```js
const compose = (f, g) => (x) => f(g(x));

const sum1 = (x) => x + 1;
const sum2 = (x) => x + 2;
const sum12 = compose(sum1, sum2);
```

实际实现使用

```js
// 命令式
trim(reverse(toUpperCase(map(arr))));

// 面向对象
arrInstance.map().toUpperCase().reverse().trim();

// 函数式
compose(trim, reverse, toUpperCase, map);
// compose 忽略中间过程，面向函数的流水线
```

### 四、BOX 与涵子（了解）

```js
// 一封信
class Mail {
  constructor(content) {
    this.content = content;
  }
  map(fn) {
    return new mail(fn(this.content));
  }
}

// 1. 拆开看信
let mail1 = new Mail("love");
// 2. 读信
let mail2 = mail.map(function (mail) {
  return read(mail);
});
// 烧信
let mail3 = mail1.map(function (mail) {
  return burn(mail);
});
// 老妈查岗
mail3.map(function (mail) {
  return check(mail);
});

// 链式
new Mail("love").map(read).map(burn).map(check);
// 1.具有通用的map方法，返回新的实例，
// 2.实例与之前的实例规则相同
// 3.传入的参数为函数，具有结合外部运算能力
// => 涵子（辅助函数式串联的东西）
```

# 函数式有成熟的框架/仓库
