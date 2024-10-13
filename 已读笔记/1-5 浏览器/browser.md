## 浏览器相关
### 一、认识浏览器运行态下的JS
#### 包含：BOM、DOM、ECMAScript
```js
    (function(context, undefined) {
        const _class = ['js', 'browser', 'vue']

        // 向全局作用域中进行存储
        window.classArr = _class.map(item => item)

        // 获取当前页面的地址
        const _url = location.href

        // 获取渲染节点
        document.getElementById('app')

        // 页面标题
        document.title = 'zhaowa'
    })(this, undefined)

    // 简述：
    // ECMAScript - 基础逻辑、数据处理
    // DOM - 对于浏览器视窗内HTML文本的相关处理和操作
    // BOM - 对浏览器本身功能区域做处理
```

### 二、BOM
#### 1. location
```js
location.href => 'https://www.zhaowa.com/search?class=browser#comments'
    .origin => 'https://www.zhaowa.com'
    .protocol => 'https:'
    .host => 'www.zhaowa.com'
    .port => ''
    .pathname => '/search/'
    .search => '?class=browser'
    .hash => '#comments'

location.assign(url) // 跳转到制定的path，替换pathname的值
    .replace(url)  // 效果同上，同时会替换浏览历史
    .reload()  // 重新加载
    .toString() // 当前完整地址字符串输出
```
* 面试方向：
1. location本身api操作
2. 路由相关：跳转、参数、操作 => 场景：可返回（history）、是否刷新（hash）
3. url处理 - 正则 or 手写js解析

#### 2. history
history.pushState() // 跳转到制定状态页上
    .replaceState() // 替换当前状态
* 面试方向 - 路由方向history和hash模式利弊

#### 3. navigator
* 浏览器系统信息的大集合
```js
    navigator.userAgent // 获取当前用户环境信息
```
* 面试方向
1. userAgent 读取信息 => 浏览器兼容性
2. 剪切板、键盘

#### 4. screen
表示显示区域的参数 - 屏幕

* 面试方向 - 对于区域的判断
window 视窗判断：

全局入口处
window.innerHeight
window.innerWidth

文本处进行获取
document.documentElement.clientHeight
document.documentElement.clientWidth
document.body.clientHeight
document.body.clientWidth

网页的size => offsetHeight = clientHeight + 滚动条 + 边框
document.documentElement.offsetHeight
document.documentElement.offsetWidth
document.body.offsetHeight
document.body.offsetWidth

定位：
scrollLeft / scrollTop - 距离常规左 / 上 滚动距离
offsetLeft / offsetTop - 距离常规左 / 上 绝对距离

el.getBoundingClientRect()
    .top  // 上距离
    .left // 左距离
    .bottom // 下距离
    .right  // 右距离
* 兼容性 - IE会多出两个像素

### 三、事件模型
```js
    <div id="app">
        <p id="dom">Click</p>
    </div>

    // 冒泡：p => div => body => HTML => document
    // 捕获：document => HTML => body => div => p

    el.addEventListener(event, function, useCapture) // useCapture - false

    // 追问：
    // 1. 如何阻止事件传播
    event.stopPropagation()
    // 注意：无论向上还是向下都可以阻止 => 无法阻止默认事件的发生，如a标签的跳转

    // 2. 如何阻止默认事件的传播
    event.preventDefault()

    // 3. 相同节点绑定多个同类事件，如何阻止
    event.stopImmediatePropagation()

    // 4. 兼容性
    // addEventListener vs IE - attachEvent
    // 区别：
    // a. 传参 attachEvent对于所有的事件名都要加上on
    // b. 执行顺序，attachEvent - 后绑定先执行；addEventListener - 先绑定，后执行
    // c. 解绑，detachEvent vs removeEventListener
    // d. e.cancelBubble = true vs e.stopPropagation()
    // e. 阻止默认事件 e.returnValue vs e.preventDefault()
```
```js
    // 手写统一事件绑定
    class bindEvent {
        constructor(element) {
            this.element = element;
        }
        addEventlistener(type, handle) {
            if (this.element.addEventListener) {
                this.element.addEventListener(type, handler, false);
            } else if (this.element.attachEvent) {
                const element = this.element;
                this.element.attachEvent('on' + type, () => {
                    handler.call(element);
                });
            } else {
                this.element['on' + type] = handler;
            }
        }
        removeEventListener(type, handler) {
            if (this.element.removeListener) {
                this.element.removeListener(type, handler, false);
            } else if (this.element.dettachEvent) {
                const element = this.element;
                element.dettachEvent('on' + type, () => {
                    handler.call(element);
                });
            } else {
                this.element['on' + type] = null;
            }
        }

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

    // 性能优化 - 事件代理
    <ul class="list">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
    </ul>
    <div class="content"></div>

    let list = document.querySelector('.list');
    let li = list.getElementsByTagName('li');
    let content = document.querySelector('.content');

    // 硬碰硬
    for(let n = 0; n < li.length; n++) {
        li[n].addEventListener('click', function() {
            // ^-^
        })
    }

    // 代理后 - 利用冒泡
    function onClick(e) {
        let e = e || window.event;
        if (e.target.nodeName.toLowerCase() === 'li') {
            const liList = this.querySelectorAll('li');
            index = Array.prototype.indexOf.call(liList, target);
        }
    }

    list.addEventListener('click', onClick, false);
```

### 四、网络层
```js
    // 实例化
    const xhr = new XMLHttpRequest()

    // 初始化连接
    xhr.open(method, url, async)

    // 发送请求
    xhr.send(data)

    // 接收统计
    xhr.readyStatus // 0 - 尚未调用open  1 - 已经open 2 - 已经send 3 - 已接收到请求 4 - 请求已完成
    
    // 接收回调
    xhr.onreadystatechange = () => {
        if (xhr.readyStatus === 4) {
            if (
                xhr.status >= 200
                    && xhr.status < 300
                    || xhr.status == 304
            ) {
                // 请求成功
            }
        }
    }

    // 设置超时
    xhr.timeout = 1000
    xhr.ontimeout = () => {
        // ^^^
    }
```
* 面试方向：
1. RESTFUL -  GET ｜ POST ｜ PUT ｜ DELETE
2. 跨域 - 代理、JSONP、CORS、iframe
3. 状态码 - 2xx 、 400、500、 3xx => 涉及到浏览器缓存
=> 强缓存（expire + cache-control） vs 协商缓存（last-modify + E-tag）

### 五、浏览器原理
```js
    // 1. DOM
    // 2. CSSOM 浏览器将css解析成树形的数据结构
    // 3. Render Tree 合并后生成具有样式 + 元素 + 层级解析树
    // 4. Layout 计算出每个节点要渲染的位置
    // 5. Painting 渲染

    // 面试题：重排 & 重绘
    // reflow  元素几何尺寸发生了变化，我们需要重新计算layout tree
    // repaint 某个元素背景、颜色、边框颜色
    // display： none  => reflow
    // visibility: hidden => repaint
```