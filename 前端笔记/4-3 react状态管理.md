# 软件工程，在干一件什么事？

软件的本质，就是管理数据
首先考虑，一个数据的生命周期是什么？作用范围是什么？

- DB(DataBase): 用户名、掘金的观看历史
- localStorage: 搜索历史
- sessionStorage \ cookie: 用户的登录态
- project runtime: 一些筛选框，刷新一下就没了
- compon: [state, props, data]

## 我们一般说的状态管理

vuex , redux

- project runtime: 可以在多个页面，同一个运行时，持有
- 刷新的动作下，所有的 js 重新执行了一遍
- 在这个 js 运行时，一直持有（全局变量）

全局变量的实现

- global -> data 在根节点下挂载一个数据
- 闭包 closure

闭包定义：是一个函数以及其捆绑的'周边环境状态的引用'的组合。
闭包让开发者可以从内部函数访问外部函数的作用域。在 JavaScript 中，闭包会随着函数的创建而被同时创建。

简单的闭包

```js
export function CreacteData(init) {
  let data = init;
  function getData() {
    return data;
  }
  return {
    getData,
  };
}
```

## 状态管理的实现

1. 组件之外，可以全局共享状态/数据

   1. closure 可以解决

2. 有修改这个数据的明确方法，并且，能够让其他用到该数据的地方感知到

   1. 本质上，就是把监听函数放在一个地方，必要时拿出来执行一下
      方式：发布订阅 或 ES6 的 new proxy / Object.defineProperty

3. 修改状态，会触发 UI 更新
   forceUpdate, setState, useState

redux 核心原理

```JS
import React, { useState, useEffect } from 'react';

function CreacteData(init, reducer) {
    let data = init;

    let deps = []

    function getData() {
        return data
    }
    function subscribe(handler) {
        // 希望订阅了这个数据的handler，在数据改变时，都能执行
        deps.push(handler)
    }
    function UNSAFE_changeData(newData) {
        // 提供一个修改这个data的方法
        data = newData
        deps.forEach(fn => fn())
    }

    // 需要提供一个可预测的、可以固定能力去修改 data 的逻辑
    // 使用action， action代表：我要如何修改这个数据
    function setDataByAction(action) {
        data = reducer(data, action)
        deps.forEach(fn => fn())
    }

    return {
        getData, subscribe, UNSAFE_changeData, setDataByAction
    };
}

const init = {
    count: 1
}

const myReducer = (data, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { ...data, count: data.count + 1 }
        case 'DECREMENT':
            return { ...data, count: data.count - 1 }
        default:
            return data
    }
}

const dataObject = CreacteData(init, myReducer)

function GetData() {
    const [count, setCount] = useState(1);

    // 初始化，在didMount的时候执行
    useEffect(() => {
        dataObject.subscribe(() => {
            let currentData = dataObject.getData()
            setCount(currentData.count)
        })
    }, []);

    const handleClick = () => {
        dataObject.UNSAFE_changeData({
            count: dataObject.getData().count + 1,
        })
    }
    const handleClick2 = () => {
        dataObject.setDataByAction({
            type: 'INCREMENT'
        })
    }

    return (<div>
        <button onClick={handleClick}>click</button>
        <div>{count}</div>
    </div>);
}

export default GetData;

```

<!-- redux 源码（变量命名规范等），与上几乎相同 -->

```js
function createStore(initState, reducer) {
  let state = initState;

  let listeners = [];

  function getData() {
    return state;
  }
  function subscribe(handler) {
    listeners.push(handler);
  }

  function dispatch(action) {
    //所谓redux是个 immutable -- 数据不可变，没有改变state 本身，而是生成了一个新的state
    const currentState = reducer(state, action);
    state = currentState;
    listeners.forEach((fn) => fn());
  }

  //初始化的数据要填充进去
  //所以，手动调用一下dispatch
  dispatch({ type: Symbol() });

  return {
    getData,
    subscribe,
    dispatch,
  };
}
```

<!-- 多个 reducer 合并 -->

```js
function createStore(initState, reducer) {
  let state = initState;

  let listeners = [];

  function getData() {
    return state;
  }
  function subscribe(handler) {
    listeners.push(handler);
  }

  function dispatch(action) {
    //所谓redux是个 immutable -- 数据不可变，没有改变state 本身，而是生成了一个新的state
    const currentState = reducer(state, action);
    state = currentState;
    listeners.forEach((fn) => fn());
  }

  return {
    getData,
    subscribe,
    dispatch,
  };
}

const initState = {
  counter: {
    count: 0,
  },
  info: {
    age: 1,
  },
};

function counterReducer(state, action) {
  switch (action.type) {
    case "ADD_COUNT":
      return { count: state.count + 1 };
    default:
      state;
  }
}

function infoReducer(state, action) {
  switch (action.type) {
    case "ADD_AGE":
      return { age: state.age + 1 };
    default:
      state;
  }
}

// reducers里每个reducer都执行一遍
// 使用时，不同reducer里的action的type不能有一样
const combineReducer = function (reducers) {
  const keys = Object.keys(reducers);
  return function (state = {}, action) {
    const nextState = {};
    keys.forEach((key) => {
      const reducer = reducers[key];
      const pre = state[key];
      nextState[key] = reducer(pre, action);
    });
    return nextState;
  };
};

// 多个 reducer 可以合并
const reducers = combineReducer({
  counter: counterReducer,
  info: infoReducer,
});

const store = createStore(initState, reducers);

export default store;
```

<!-- connect 实现 -->

```js
// connect 应用场景
import React, { Component, useContext } from 'react';

function ReduxTest({ counter, handleAdd }) {
    return <div>
        <div>{counter}</div>
        <button onClick={() => handleAdd()}>
            +
        </button>
    </div>
}

const mapStateToProps = (state) => {
    return {
        counter: state.counter,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleAdd() {
            dispatch({ type: 'ADD_COUNT' })
        }
    }
}

// connect 是 redux-react 提供的一个API
// 接收两个函数，mapStateToProps, mapDispatchToProps
// 可以通过这两个函数，把store里的数据，dispatch，作为 props 传入组件
export default connect(mapStateToProps, mapDispatchToProps)(ReduxTest)



// 实现connect

// 首先做好使用场景
// context.js
import { createContext } from 'react';
const _context = createContext({})
export default _context;

// index.js
import React from 'react';
import ReduxContext from './ReduxContext'
import App from './App'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <ReduxContext.Provider value={store} >
        <App />
    </ReduxContext.Provider>
)

// 实现
// connect.js
export const connect = (mapStateToProps, mapDispatchToProps) => Component => {
    return function ConnectComponent(props) {
        const _store = useContext(ReduxContext)
        const [, setBool] = useState(true);
        const forceUpdate = () => { setBool(val => !val) }
        useEffect(() => {
            _store.subscribe(forceUpdate)
        }, []);
        return (
            <ReduxContext.Consumer>
                {
                    store => <Component
                        {...props} //component 自身的参数
                        {...mapStateToProps(store.getState())}
                        {...mapDispatchToProps(store.dispatch)}
                    />
                }
            </ReduxContext.Consumer>
        )
    }
}
```

# 了解mobx的思想
