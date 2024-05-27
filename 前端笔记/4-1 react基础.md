# react 基础

<!-- ********************************************************************* -->

## 前端的工作

用户交互 -> 界面更新

vue :{{data}} -- 知道你要改变它，往它的子节点上去 diff

react:
onClick -> setState/dispatch -> enqueueSetState -> scheduleUpdateOnFiber
从根节点开始层层判断，哪个组件发生变化 -> 记录变化 -> 更新界面
因为 react 的 jsx 写法灵活性高，监听不到哪个组件发生变化，所以重新跑一遍看和上次的差别到底在哪里 -- Fiber 双缓存

<!-- ********************************************************************* -->

## 生命周期

### 初始化阶段

#### constructor 先执行

- 初始化、state、截取路由参数
- 防抖、截流

#### getDerivedStateFromProps 执行

静态函数，当作纯函数来用

- 传入 props 和 state 。 返回值将和之前的 state 进行合并，作为新的 state

```js
static getDerivedStateFromProps(nextProps, preState) {
    const {match: {params: {instrumentId}}} = nextProps;
    // 此处当传入的instrumentId发生变化的时候，更新state
    if (instrumentId !== preState.instrumentId) {
        //若需要在数据变化后进行其他操作，需要在return前操作！
        return {
            instrumentId: instrumentId,
        };
    }
    return null;    // 不变化，则对于state不进行任何操作
}
```

#### componentWillMount 执行

> UNSAFE_componentWillMount

- 如果有了 getDerivedStateFromProps 或 getSnapshotBeforeUpdate 生命周期，则不执行 componentWillMount

#### render

#### componentDidMount 执行

#### 更新阶段

##### componentWillReceiveProps（有用）

- 如果我的组件中已经有了 getDerivedStateFromProps，则不会执行 componentWillReceiveProps
- 有用的原因：一些数据，我 props 发生改变的时候，props 的改变来决定 state 是否更新。例如：弹窗 visible - state

##### getDerivedStateFromProps

##### shouldComponentUpdate

相当于一个拦截器，返回一个 bool，来决定组件要不要更新

```js
shouldComponentUpdate(){
    // 此时，页面上的任何点击按钮都没有反应，相当于一个简单的拦截器
    return false
}
```

##### componentWillUpdate

- 获取组件更新前的一些状态，DOM 位置

##### render

beginWork 不代表创建了虚拟 DOM、生成了这些 DOM 并更新在界面上

- 使用 createElement 方法返回虚拟 DOM 树

##### getSnapshotBeforeUpdate

获取更新前的快照。

- 源码里执行的函数： commitBeforeMutationCycle

##### componentDidUpdate

在此不能调用 setState ; 会陷入死循环

#### 销毁阶段

##### componentWillUnmount

<!-- ********************************************************************* -->

### react 生命周期的代替方案

#### useEffect

```js
useEffect(() => {
  console.log("callback");
  return () => {
    console.log("destroy");
  };
}, [deps]);
```

- destroy 是useEffect第一个参数（即callback）的返回值，在下一次 callback 执行前调用
- deps 值改变时，执行上一次的 destroy，并再次执行 callback


```js
// 代替生命周期

useEffect(() => {
  console.log("componentWillReceiveProps");
}, [props]);

useEffect(() => {
  console.log("componentDidMount");
  return () => {
    console.log("componentWillUnmount");
  };
}, []);

useEffect(() => {
  console.log("componentDidUpdate");
  return () => {
    console.log("componentWillUpdate");
  };
});
```

<!-- ********************************************************************* -->

## setState

### react 17 lagecy 模式

```js
handleClick = () => {
  // isbatchingUpdate react框架的变量，用于判断是否合并更新
  // isbatchingUpdate = true

  // 只执行一次setState
  this.setState(1);
  this.setState(1);

  setTimeout(() => {
    // 执行两次次setState
    this.setState(1);
    this.setState(1);
  });
  // isbatchingUpdate = false
};
```

### react 18

更新：上述 setState 只执行一次

<!-- ********************************************************************* -->

## 面试问到性能

### 1.指标是什么

交互指标：（一般两个

- 首屏速度
- 输入延迟
- 高优先级打断低优先级 （react)

<!-- 内存指标 自己去找 -->

FMP FP LCP FID

### 2. 在确定指标的前提下，谈性能。不要上来就说框架好坏

<!-- ********************************************************************* -->

## 组件库

- headlessui
- tailwind
