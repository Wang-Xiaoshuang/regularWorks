# js 性能优化

前情知识补充：
单页应用要通过路由导航守卫和生命周期来找时间戳
单页应用的路由切换不会触发下面的 Navigation Timing API
单页应用，通过 history - 路由状态；或者 hash - 唯一的 hash 值， 来切换页面展示
单页应用仅仅是路由的变化，不是跳转 redirect

## Navigation Timing API

进程解锁事件：从 A 页面跳转到 B 页面，A 页面首先要做 unload。

1. navigationStart / End （不是同域名的，要包含这个时间，涉及到重新加载的过程）
   表示从上一个文档卸载开始到完全切到新页面（当前页面） 的时间戳
   验证浏览器是否因为机器、环境原因受到影响
   => 如果没有上一个文档，这个值和 fetchStart 相等

2. unloadEventStart / End
   表示前一个网页 unload 的时间点

3. redirectStart / End
   第一个 http（同域名且是跳转）--重定向，发生和结束的时间

4. fetchStart / End
   浏览器准备好使用请求获取文档的时间
   （浏览器获取所有资源，都通过先初始化一个请求符）
   多一个（from cache)

5. domainLookupStart / End
   http 开始建立连接的时间。
   如果是长连接，fetchStart == domainLookupStart。？？

为什么与 4.不同：
3xxx，在发出请求之前，状态是（from cache)，
fetchStart 代表所有 http 相关处理之前的那个点。
domainLookupStart 开始寻址，去做与目标连接。
所以，fetchStart 和 domainLookupStart 相差的时间是缓存检查 -- from cache

6. connectStart / End
   TCP 开始建立连接的时间
   （domainLookupStart，connectStart 之间的时间差很小，现在电脑性能都很好）

7. secureConnectionStart / End
   HTTPS 连接开始的时间

8. requestStart / End
9. respondStart /End

10. domLoading
    开始解析渲染 DOM 树的时间 => readyState （？） 变成 loading 态，抛出钩子 readystatechange
11. domInteractive
    完成解析 -- dom 树的解析完成时间

12. domContentLoadedEventStart / End
    加载网页内资源（web 资源等）的时间

13. domComplete
    dom 完全解析完成（结合了样式、整体布局等，可以开始布局排列绘制 layout、paint） => readyState 变成 lcomplete 态，抛出钩子 readystatechange

运用

```js
// index.html
<script>
javascript:(()=>{
    var perData = window.performance.timing;
    var pageLoadTime = perData.domComplete - perData.navigationStart;
    console.log("页面加载耗时",pageLoadTime,'ms')
})();
</script>

// 不同系统、不同硬件的平均值、实时值 => 大数据分析性能
```

### 评判性能的标准：谷歌提出的 Core Web Vitals - 网页核心的性能指标

- 加载、交互、视觉稳定性

#### Largest Contentful Paint(LCP)

衡量装载性能：LCP 应该在页面首次开始加载后 2.5s 内发生

- 前 2.5 秒进行最大内容的渲染

##### a. 最大内容包含了哪些？

- <img>
- <svg>
- <video>
- 通过 url 函数加载的背景图片元素
- 包含了文本节点或其他内联节点的大块内嵌内容的块级元素

##### b. LCP 值低下的原因

- 拉取外部资源导致慢（domContentLoadedEventStart），埋点定位哪个资源导致
  原因 => 服务器响应慢

- 阻断渲染的 JavaScript | CSS
- 资源下载（加载）时间过长（国内下载国外资源，链路过长）
- 客户端渲染机器的影响

##### c. 针对性的改造

- 服务器的优化
  缓存 HTML 静态的离线页面。
  缓存页面资源，减少浏览器直接对资源的请求
  => 面试：浏览器的缓存机制（强缓存等）

- 对图片的优化，进行图片合理化使用，降低图片大小，加快请求速度
  => 图片上传格式 | 云资源管理

- 重写、压缩、注释过滤....减少最终文件大小，加快加载速度
  => webpack vite 工程化打包

使用 CDN - 提供内容服务网络，在物理上接近请求点

- 渲染阻断的优化
  CSS + JS => 延迟处理 -- 骨架屏只是遮挡一下，有东西在后面渲染
  单页应用：首屏优化 => 懒加载（页面模块）、异步加载（组件、样式）
  CSS 模块优化 - less sass => module -- @import
  SSR 服务端渲染

题外知识：
svg 通常在大屏使用，不会模糊失真。

## First Input Delay (FID)

衡量交互性，页面的 FID 应该小于 100ms

- 页面首次输入延迟应该小于 100ms（在输入框输入没反应，点按钮不弹窗）

产生原因：执行阻塞

a. 减少 JS 的执行时间

- 缩小、压缩 JS 文件
- 延迟加载不需要的 JS => 1. 模块的懒加载 | tree shaking
- 尽量减少未使用的 polyfill(兼容)

b. 分解耗时任务

- 减少长逻辑（耗时 500ms)
- 异步化：不影响主要流程的。可以异步化慢慢操作

c. worker
web worker | service worker

```js
// 1. web worker
// main.js
// 新增worker
const myWorker = new Worker("worker.js");

// 与main thread 之间通信
myWorker.postMessage("hello");
myWorker.onmessage = function (e) {
  console.log(e.data);
};

// worker.js
// 接收消息
self.onmessage = function (e) {
  console.log(e.data);
  // 回调逻辑
  let workerResult = "";
  self.postMessage(workerResult);
};

// 2. service worker
// main.js
navigator.serviceWorker.regist("./service-worker.js");

// service-worker.js
self.addEventListener("install", function (event) {
  // ...
});
//=> 可以面向网络和cache处理
```

## Cumulative Layout Shift(CLS)

测量视觉稳定性 - 页面稳定性在加载过程中以及渲染后 CLS 小于 0.1

- 整体布局的移动可能发生在可见元素从一帧到下一帧改变位置的任何阶段

会带来偏移的因素：图片、内容插入、字体变大变小

解决：

1. 图片不适用无尺寸元素（预设尺寸）
   => srcset & sizes

```js
<img
srcset="yy-320w.jpg 320w, yy-480w.jpg 480w, yy-800w.jpg 800w"

sizes="(max-width:320p) 280px,
(max-width:4810p) 440px,
800px"

src="yy.jpg" alt="yy"
>
```

2. 整体化内容的插入
   (a 内容里有需要动态请求和渲染的数据 b,把 a 整体内容都做好后,再在页面里以一个整体插入 a 内容)

否则,影响: => 影响整体的布局 => 导致重排 => 重绘

3. 动态字体控制

```js
// 加载完默认字体再显示
// 先用默认字体渲染,下载完成后,再替换成后续字体
// 先当于把下载的过程后置(理解)
@font-face{
    src:local('xxx Regular'),url('http://fonts.xxxx.com/xxx.woff2')
}
```

# 工具

CWV 工具 Core Web Vitals - 浏览器插件

performance - 性能评估神器

# 大厂监控体系
第一步:从数据采集到展示汇总

1. 埋点上报 => 点到点 + 信息采集
2. 数据处理 => 阈值设置(区分合格\不合格) + 数据分类(请求数据\渲染数据) + 数据重组(各种维度分组,例如PC 端\小程序端)
3. 可视化展示 : 自研监控; 开源 grafana......

第二步:评估
1. 根据性能指标要求进行数据圈层(符合\不符合),进一步收集归档 => 数据归档
2. 定位问题

第三步:指导提升
1. 对模块负责人进行告警处理
2. 触发问题分派

#### 性能优化另一个可能性 - bigpipe(历史上没有实现,不用花时间,兴趣了解)