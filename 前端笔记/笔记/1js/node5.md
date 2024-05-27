# 浏览器内置 JS 对象、事件模型、请求相关

## 浏览器相关

### 一、认识浏览器运行态下的 JS

#### 包含：BOM DOM ECMAScript

```js
(function (context, undefined) {
  const _class = [
    "js",
    2,
    "browser",
    {
      name: "vue_base",
    },
    {
      name: "vue_promote",
      index: {},
    },
  ];
})(this);

// 线程（简单称浏览器），把IIFE放入一个模块，模块内进行变量声明
```

```js
(function (global, context, undefined) {
  const _class = [
    "js",
    2,
    "browser",
    {
      name: "vue_base",
    },
    {
      name: "vue_promote",
      index: {},
    },
  ];

  global.classArr = _class.map((i) => i);
  // 浏览器提供全局的存储，并可执行js的语句
})(window, this);
```

```js
(function (global, context, undefined) {
  const _class = [
    "js",
    2,
    "browser",
    {
      name: "vue_base",
    },
    {
      name: "vue_promote",
      index: {},
    },
  ];

  global.classArr = _class.map((i) => i);

  const _url = location.href;
  // 路径地址相关

  document.title = "browser";
  // document是全局的文本对象
  document.getElementById("app");
})(window, this);
```

小结：
ECMAScript - 基础逻辑、数据处理
DOM - 对于浏览器视窗内 HTML 文本的相关操作
BOM - 对浏览器本身功能区域做的处理

理解：
为什么前端代码被说是文本流
（自底层而上，代码的变化形式）

Bytes: 2F 62 6F 3E （底层机器码，底层编译器给底层执行时文件的形式）

Characters: <html><head></head><body><div>文本</div></body></html>（执行场景对象：Characters 流）

Tokens： starTag: html startTag:head ... endTag:html （令牌流）

Nodes: JS 转译成一个个 nodes 节点，包含层级结构的信息

Dom: 浏览器生成 DOM 树（页面结构树）

### BOM

#### 1. location

location.href => 'https://www.aaa.com/search?class=browser#comments'

.origin => https://www.aaa.com
.protocol => https
.host => www.aaa.com
.port => '' 、'8080'
.pathname => /search/
.search => ?class=browser
.hash => #comments

location.assign(url) 跳转到指定 url；入栈 //一般用 assign 处理，href 读取
.replace(url) 跳转到指定 url，重点：清空浏览历史
.reload()
.toString()

面试方向：

1. location 本事 api 操作
2. 路由相关：跳转、参数、操作
   => 场景分析：router 是 history 模式、 hash 模式：页面锚点的区别
3. url 处理 —— 正则、手写处理

#### history

history.state => 存储获取当前页面状态
.replaceState => 替换当前状态。不会刷新当前页面，所以用在单页应用上

#### navigator - 浏览器系统信息大集合

```js
navigator.userAgent;
```

面试方向：

1. UA 读取系统信息 => 浏览器兼容性
2. 获取剪切板、键盘等输入数据，是代码连接硬件设备的桥梁
3. 系统信息采集（高级） => 数据上报 => 数据采集汇总

#### screen

一码多形态（适配不同尺寸的屏幕）

面试：

1. 判断区域大小
   window 视窗判断：
   window.innerHeight、window.innerWidth

文本处获取：
document.documentElement.clientHeight
document.documentElement.clientWidth

网页内容 size: => offsetHeight = 视窗的 clientHeight + 滚动条 + 边框
document.documentElement.offsetHeight
document.documentElement.offsetWidth

定位：
scrollLeft / scrollTop => 距离常规左/上滚动的距离（滚动了多少，相对距离）
offsetLeft / offsetTop => 距离常规左/上（0，0） 的距离（绝对距离）

当前元素距离边的间距
element.getBoundingClientRect()
element.getBoundingClientRect().top
element.getBoundingClientRect().left
element.getBoundingClientRect().bottom
element.getBoundingClientRect().right

- 兼容性 - IE 会多出 2 像素（边框占位）

面试：通过 CSS 和 JS（上述）做出吸顶效果

#### 事件模型

```js
<div id="app">
  <p id="dom">Click</p>
</div>
```

冒泡 ：p=>div=>body=>html=>document
捕获: document=>html=>body=>div=>p

```js
el.addEventListener(event,function,useCaption) // useCaption默认false
```

追问：(核心：区分不同阻止) 1.阻止事件传播
event.stopPropagation(); => 无法阻止默认事件的发生，如 a 标签跳转

2.阻止默认事件
event.preventDefault()

3.相同节点绑定了多个同类事件，如何阻止？
event.stopImmediatePropagation()

4. 手写多浏览器兼容的事件绑定
   本质：attachEvent 和 addEventListener

```js
// 区别
// 1. 传参不同 attachEvent对于事件名需要加上'on'
// 2. 执行顺序 attachEvent - 后绑定先执行；addEventListener - 先绑定先执行
// 3. 解绑不同 dettachEvent removeEventListener
// 4. 阻断冒泡 e.cancelBubble = true ; e.stopPropagation()
// 5. 阻断默认事件 e.returnValue 和 e.preventDefault()

class bindEvent {
  constructor(element) {
    this.element = element;
  }

  addEventListener = (type, handler) => {
    if (this.element.addEventListener) {
      this.element.addEventListener(type, handler, false);
    } else if (this.element.attachEvent) {
      const element = this.element;
      this.element.attachEvent("on" + type, () => {
        handler.call(element);
      });
    } else {
      this.element["on" + type] = handler;
    }
  };

  removeEventListener = (type, handler) => {
    if (this.element.removeEventListener) {
      this.element.removeEventListener(type, handler, false);
    } else if (this.element.dettachEvent) {
      const element = this.element;
      this.element.dettachEvent("on" + type, () => {
        handler.call(element);
      });
    } else {
      this.element["on" + type] = null;
    }
  };

  static stopPropagation(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  }

  static preventDefault(e) {
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
  }
}
```

5. 性能优化 - 事件代理

监听每一个节点 li 的点击

```js
<ul class="list">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
<div class="content"></div>


var list = document.querySelector(".list")
var li = list.getElementsByTagName("li")
var content = document.querySelector(".content")

// 性能差的写法
for(var n=0; n<li.length;n++){
  li[n].addEventListener('click',function(){
    //点击逻辑
  })
}

// 代理后 - 利用冒泡
function onClick(e){
  vae e = e || window.event; // window.event当前正在处理的事件对象;
  // Firefox不支持window.event，Firefox使用 e
  // IE8 没有 e对象，使用window.event
  if(e.target.nodeName.toLowerCase()==='li'){
    const liList = this.querySelectorAll('li')
    index = Array.prototype.indexOf.call(liList,target)
  }
}
list.addEventListener('click',onClick,false)
```

### 四、网络

```js
// 实例化
const xhr = new XMLHttpRequest();

// 发送
// 初始化连接 - open初始化连接，不会发起真正的请求
xhr.open(method, url, async);

// 发送请求
// 当请求方法为POST - 要有body请求体
// 当请求方法为GET - data可以为空
// 都需要encodeURIComponent进行转码 （拓展了解）
xhr.send(data);

//接收
xhr.readyStatus;
// 0 - 尚未调用open
// 1 - 已调用open，已建立连接
// 2 - 已调用send
// 3 - 已接收请求返回数据
// 4 - 已完成请求

xhr.onreadystatechange = () => {
  if (xhr.readyStatus === 4) {
    if (xhr.status === 200) {
      // 业务逻辑
    }
  }
};

// 设置超时
xhr.timeout = 1000;

// 超时触发方法
xhr.ontimeout = () => {
  //打印trace
};

// 手写请求封装
ajax({
  url: "reqUrl",
  method: "get",
  async: true,
  timeout: 3000,
  data: {
    payload: "text",
  },
}).then(
  (res) => {
    console.log("成功");
  },
  (err) => {
    console.log("失败");
  }
);
```

实现封装

```js
function ajax(options) {
  //参数读取
  const { url, method, async, timeout, data } = options;
  // 实例化
  const xhr = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    // 成功
    xhr.onreadystatechange = () => {
      if (xhr.readyStatus === 4) {
        if (xhr.status === 200) {
          // 业务逻辑
          resolve && resolve(xhr.responseText);
        } else {
          reject && reject();
        }
      }
    };
    // 失败
    xhr.ontimeout = () => {
      reject && reject("超时");
    };

    xhr.onerr = () => {
      reject && reject(err);
    };

    // 传参处理
    let _params = [];
    let encodeData;

    if (data instanceof Object) {
      for (let key in data) {
        _params.push(
          encodeURLComponent(key) + "=" + encodeURLComponent(data[key])
        );
      }
      encodeData = _params.join("&");
    }

    // methods处理
    // get类型直接拼接到url
    if(method === 'get'){

      const index = url.indexOf('?')

      if(index === -1){
        url + = '?'
      }else if(index !== url.length -1){
        url += '&'
      }

      url += encodeData
    }
    // 建立连接
    xhr.open(method,url,async)

    if(method==='get'){
      xhr.send(url)
    }else{
      xhr.setRequestHeade(
        'Content-type','application/x-www-form-urlencoded;chartset=UTF-8' // 了解Content-type的作用
      )
      xhr.send(encodeData)
    }
  });
}
```

面试方向：
1. RESTFUL - GET POST PUT DELETE OPTION
2. 跨域 - 配置返回头CORS、iframe、JSONP
3. 状态码 - 2xxx, 4xxx , 3xxx(浏览器缓存问题)
4. 强缓存 协商缓存

### 本课总结：
浏览器除了运行渲染前端代码外，

浏览器还把前端代码和三方面搭建了桥梁：
设备、用户操作、外部数据
分别通过BOM、event事件系统和网络层

DOM BOM EVENT NETWORK