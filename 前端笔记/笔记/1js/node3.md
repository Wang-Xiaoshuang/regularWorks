## promise 解析

- 异步的定义

```js
// 异步执行
let count = 1;
let timer = setTimeout(function () {
  count++;
  console.log("in", count);
}, 1000);

console.log("out");
```

```js
// 循环执行
let count = 1;
let timer = setInterval(function () {
  count++;
  console.log("in", count);
}, 1000);
console.log("out");

setTimeout(function () {
  clearInterval(timer);
  console.log("clear");
}, 5000);
```

### 1. 进程 和 线程

#### 浏览器窗口（进程间）通信 => storage | cookie => 多种存储的区别 => 应用场景 => 多端登录

#### 浏览器原理（中高级）

##### GUI 渲染线程

1.  解析 HTML\CSS ; 构建 DOM 树\CSSON 树 => 布局 =>绘制
2.  与 JS 引擎线程是互斥的，当执行 JS 线程时，GUI 渲染会被挂起，当任务队列空闲时，主线程才会去执行 GUI

###### JS 引擎线程

1. 处理 JS，解析执行脚本
2. 分配、处理、执行 待执行的脚本，同时，处理待执行事件以及维护事件队列
3. 阻塞 GUI 渲染 => js 为何会阻塞 GUI => 本职需要

##### 定时器的触发线程

1. 异步定时器的处理和执行 setTimeout setInterval
2. 接收 JS 引擎分配的定时器任务，并执行
3. 处理完成交由事件触发线程

##### 事件触发线程

1. 接收所有来源的事件（同步、异步）
2. 将回调的事件一次加入到任务队列的队尾，交还给 JS 引擎执行

##### 异步 HTTP 线程

1. 异步执行请求类操作
2. 接收 JS 引擎线程异步请求操作
3. 监听回调，交给事件触发侧做处理

### EVENT-LOOP

#### 1. 执行栈

##### 执行顺序：

- JS 单线程语言，单步执行

```js
function func2() {
  throw new Error("error"); // 抛出错误，没有被执行完
}

function func1() {
  func2();
}

function func() {
  func1();
}

func();
```

执行栈： 先放 func 、func1 、 func2 ; 开始执行 func2, 报错，停住

#### 面试题

- 执行顺序

首先开始主流程 ，主流程是第一个宏任务（宏任务 1），同步优先进入

```js
setTimeout(() => {
  console.log("timeOut"); //5 开启一个全新的宏任务2，
  // 在宏任务1和所有的微任务执行完后，再执行
}, 0);

new Promise((resolve) => {
  console.log("new promise"); //1 属于同步进入主线程 宏任务1
  resolve();
})
  .then(() => {
    console.log("promise then"); //3 微任务1
  })
  .then(() => {
    console.log("promise then then"); //4 微任务2
  });

console.log("start"); //2
//  同步 + 宏任务1； 宏任务1 封装完毕，这两句放进栈里，给js主线程执行
// 然后开启第二个宏任务，再次从头到尾开始扫描

// 小结
// 由主线程执行

// 顺序：执行宏任务 --》 是否有可执行的微任务 --》 执行微任务 --》 执行下一个宏任务

// 同步执行, 存放在 call stack -- 调用栈

// 异步执行， 存放在event table ；
// JS 引擎线程维护 event queue， 调度好要执行的事件
// 所有的事件组成 event queue，一个一个执行，
// 事件队列不停地自循环
```

#### 任务

##### 宏任务 - macro task

script setTimeout setInterval I/O

##### 微任务 - micro task

promise defineProperty Proxy

### promise

#### 背景 - 回调地狱

```js
// 加时延
setTimeout(() => {
  request.onreadystatechange = () => {
    // 回调后的处理
    setTimeout(() => {
      // 处理
      request.onreadystatechange = () => {
        //
      };
    });
  };
});

// 解决
// promise化
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("ok");
  });
})
  .then((res) => {
    request();
  })
  .catch((err) => {
    console.log(err);
  });

// 多个异步顺序执行 => 复合链式调用
function wait500(input) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(input + 500);
    }, 500);
  });
}

function wait1000(input) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(input + 1000);
    }, 1000);
  });
}

const p = new Promise((resolve, reject) => {
  resolve(1);
});

p.then(wait500)
  .then(wait1000)
  .then(wait500)
  .then(wait1000)
  .then((result) => {
    console.log("end", result);
  });

// 一些API
// 全部执行完成回调
Promise.all([wait1000, wait500]).then((result) => {
  console.log("all end", result);
});
// 有一个执行完全的，立刻开始then里的回调
Promise.race([wait1000, wait500]).then((result) => {
  console.log("race end", result);
});
```

### 面试题

1. promise 的状态
   pending (还没有执行完成，等待返回中)、fulfilled、 rejected

   executor: new Promise 的时候立即执行，接收两个参数 resolve | reject

2. promise 默认状态？状态是如何流转的？
   默认 pending；
   状态流转：pending => fulfilled 或 pending => rejected;

内部维护成功 value：undefined、thenable、promise
内部维护失败变量 reason

3. promise 的返回值？
   then 方法：接收 onFulfilled 和 onRejected

   如果 then 时，promise 已经成功，执行 onFulfilled，参数 value;
   如果 then 时，promise 已经失败，执行 onRejected，参数 reason;
   如果 then 中有异常，执行 onRejected;

4. 手写 promise

```js
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class Promise {
  constructor(executor) {
    // 1. 默认状态 - PENDING
    this.status = PENDING;
    // 2. 内部维护的变量值
    this.value = undefined;
    this.reason = undefined;

    // 成功的回调
    let resolve = (value) => {
      // 单向流转配置
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
      }
    };

    // 失败的回调
    let reject = (reason) => {
      // 单向流转配置
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.value = reason;
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }
}

// 追问：异步怎么办？
class Promise {
  constructor(executor) {
    // 1. 默认状态 - PENDING
    this.status = PENDING;
    // 2. 内部维护的变量值
    this.value = undefined;
    this.reason = undefined;

    // 存放回调
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    // 成功的回调
    let resolve = (value) => {
      // 单向流转配置
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    // 失败的回调
    let reject = (reason) => {
      // 单向流转配置
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.value = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
    if (this.status === PENDING) {
      // 存放队列
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}

//  追问：实现then的链式调用 + api + all / race
```

```js
// 实现then的链式调用
 then(onFulfilled, onRejected) {
  // 处理默认参数
  onFulfilled = typeof onFulfilled === 'function'
  ?onFulfilled
  :value=>value;

    onRejected = typeof onRejected === 'function'
  ?onRejected
  :reason=>{
    throw reason
  };

  let promise2 = new Promise((resolve,reject)=>{
if(this.status === FULFILLED){
setTimeout(()=>{
  try{
let r = onFulfilled(this.value)
// 做进一步promise处理
this.resovePromise(promise2,r,resolve,reject)
  }catch(error){
    reject(error)
  }
},0)
}
if(this.status === REJECTED){
setTimeout(()=>{
  try{
    let r = onRejected(this.reason)
// 做进一步promise处理
this.resovePromise(promise2,r,resolve,reject)
  }catch(error){
    reject(error)
  }
},0)
}
if(this.status === PENDING){
    this.onResolvedCallbacks.push(()=>{
    setTimeout(()=>{
      try{
          let r = onFulfilled(this.value)
          // 做进一步promise处理
          this.resovePromise(promise2,r,resolve,reject)
      }catch(error){
        reject(error)
      }
    },0)
  })
  this.onRejectedCallbacks.push(()=>{
    setTimeout(()=>{
    try{
      let r = onRejected(this.reason)
      // 做进一步promise处理
      this.resovePromise(promise2,r,resolve,reject)
    }catch(error){
      reject(error)
    }
    },0)
  })
}
  })
   return promise2
  }

  resovePromise(promise2,x,resolve,reject){
    // 1. 边缘检测
    if(promise2 === x){
      return reject(new Error('error'))
    }
    // 2. 根据x类型判断如何处理
    let rc = false // recall
    if(x instanceof Promise){
      x.then(r=>{
        this.resovePromise(promise2,r,resolve,reject) //递归
      },reason=>{
        reject(reason)
      })
    }else if(x !== null &&( typeof x === 'object'||typeof x === 'function')){
      let then = x.then;
      if(typeof then === 'function'){
        then.call(x,value=>{
          if(!rc){
            rc = true
            this.resovePromise(promise2,value,resolve,reject)
          }
        }.reason=>{
          if(rc) return;
          rc = true
          reject(reason)
        })
      }else{
        resolve(x)
      }catch(error){
        if(!rc){
          rc=true
          reject(errors)
        }
      }
    }else{
      resolve(x)
    }

    static resolve(value){
      return new Promise((resolve,reject)=>{
        resolve(value)
      })
    }

    static reject(reason){
      return new Promise((resolve,reject)=>{
        reject(reason)
      })
    }


    // 实现or、race
    static all(promises){
      return new Promise((resolve,reject)=>{
        let _count = 0;
        let result = []

        for(let i =0;i<promises.length;i++){
          promises[i].then(value=>{
            _count++;
            result[i] = value

            if(_count === promises.length){
              resolve(result)
            }
          },reason=>{
            reject(reason)
          })
        }
      })
    }

    static race(promises){
      return new Promise((resolve,reject)=>{

        for(let i =0;i<promises.length;i++){
          promises[i].then(value=>{
            resolve(value)
            if(_count === promises.length){
              resolve(result)
            }
          },reason=>{
            reject(reason)
          })
        }
      })
    }
  }
```

### async await & generator => 规范
