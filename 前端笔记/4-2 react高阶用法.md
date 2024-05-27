架构的技术能力，不只是体现在规则，主要是灵活性。
越灵活。要考虑的边界 case，和 防劣化的 case 就越多

# ref 的创建

## class 类组件中通过 createRef()创建；

### ref 常见的使用方式

ref 一般可以标识在 hostComponent （宿主元素--首字母小写的，最终会变成基础 HTML 元素的）
例如：
<button ref={ref} ></button>；<div ref={ref}></div>

### ref 转发子组件

forwardRef()；
ref 本身是不能跨层级捕获和传递的，forwardRef 可以接收父元素的 ref 信息，转发下去。

ref 不能直接挂载在 react 组件上，可以通过 forwardRef()转发到子组件内的元素上
（理解：ref 可以通过 props 传参到组件里，挂载在组件里的某个 html 元素上）

## 函数组件中 useRef() 创建

### expose - 在父组件直接调用子组件的方法 useImperativeHandle

useImperativeHandle

- param1 : ref 接收 forwardRef 传递进来的 Ref
- createHandle 返回暴露给父组件的 ref 对象
- deps 更新 ref 对象的依赖（可能返回的 ref 对象不是纯函数，依赖了 state）

子组件有个 modal,drawwe -- visible

```js
import React, { forwardRef, useImperativeHandle, useRef } from "react";

function FuncRef() {
  const exposeRef = useRef(null);
  return (
    <div>
      <FancyInput ref={exposeRef} />
      <button
        onClick={() => {
          exposeRef.current.focus();
        }}
      >
        focus
      </button>
      <button
        onClick={() => {
          exposeRef.current.changeValue(12);
        }}
      >
        changeValue
      </button>
    </div>
  );
}

const Input = (props, ref) => {
  const inputRef = useRef(null);

  const focus = () => {
    inputRef.current.focus();
  };
  const changeValue = (v) => {
    inputRef.current.value = v;
  };
  useImperativeHandle(ref, () => ({
    focus,
    changeValue,
  }));
  return <input ref={inputRef} />;
};

const FancyInput = forwardRef(Input);
```

# context

react 很多都是用这个实现的，redux、router...
antd 的最新的样式使用方式也有这个（自己去找）
要注入进去

```js
// 和路由里的with-router 类似
const navgator = window.history;
‘
export default function FuncContext() {
  return (
    <ThemeContext.Provider value={navgator}>
      <Parent />
    </ThemeContext.Provider>
  );
}

const withNavigator = (Component) => {
  return function () {
    const navgator = useContext(ThemeContext);
    return <Component navgator={navgator} />;
  };
};

const Child = withNavigator((props) => {
  console.log(props.navgator);
  const theme = useContext(ThemeContext);
  return (
    <div>
      <span style={{ background: theme }}>Func Usage</span>
    </div>
  );
});
```

## class 基础用法 contextType; Consumer

consumer 和 provider;
可以理解为生产消费模式；

拓展：
不用 context 做全局样式处理，会使得 css 和 js 搅在一起

- css 全局变量是`var(xxx-xxx)`
- 媒体选择器

```js
// themeContext.js
//  全局的闭包
import React from "react";

export const ThemeContext = React.createContext("light");
```

```js
// classContext.js
import React, { Component } from "react";
import { ThemeContext } from "./ThemeContext";

export default class ClassContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "dark",
    };
  }
  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <Parent />
        <button
          onClick={() => {
            this.setState({ theme: "light" });
          }}
        >
          light
        </button>
      </ThemeContext.Provider>
    );
  }
}

const Parent = () => {
  <div>
    <Child1 />
    <Child2 />
  </div>;
};

class Child1 extends Component {
  static contextType = ThemeContext; // 用法1
  render() {
    return <div>Child1 -- {this.context}</div>;
  }
}

class Child2 extends Component {
  render() {
    return (
      // 用法2
      <ThemeContext.Consumer>
        {(theme) => {
          <div>Child2 -- {theme}</div>;
        }}
      </ThemeContext.Consumer>
    );
  }
}
```

## 函数用法 useContext

```js
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const theme = "blue";

export default function FuncContext() {
  return (
    <ThemeContext.Provider value={theme}>
      <Parent />
    </ThemeContext.Provider>
  );
}

const Parent = () => {
  <div>
    <Child />
  </div>;
};

const Child = () => {
  const theme = useContext(ThemeContext);
  return (
    <div>
      <span style={{ background: theme }}>Func Usage</span>
    </div>
  );
};
```

# hoc 高阶组件

把一个组件作为参数传入

### 属性代理

举例用处： 做一个基础卡片包裹，封装一些通用的方法(拖拽等）和样式，卡片内部的东西作为组件灵活传入
`basicCard('blue')(SubContent)`

```js
import React from "react";

const basicCard = (color) => (Component) => {
  const WrapperCom = (props) => {
    const hocStyle = {
      margin: "4px",
      background: color,
    };
    return (
      <div style={hocStyle}>
        <Component {...props} hoc="hoc" />
      </div>
    );
  };
  return WrapperCom;
};

const PropsExtend = (props) => {
  return (
    <div>
      <span>{props.hoc}</span>
    </div>
  );
};

export default basicCard("blue")(PropsExtend);
```

### 反向继承 reverseExtend

一般用类组件

```js
import React from "react";

// 比如 我们有一个case，我们需要非常优雅地实现埋点的曝光

function logProps(logMap) {
  return (WrappedComponent) => {
    // 拿继承的组件的生命周期来处理，有点不好
    const didMount = WrappedComponent.prototype.componentDidMount;
    return class A extends WrappedComponent {
      componentDidMount() {
        if (didMount) {
          didMount.apply(this);
        }

        Object.entries(logMap).forEach(([k, v]) => {
          if (document.getElementById(k)) {
            console.log(v); // text_module_show
          }
        });
      }

      render() {
        // 不改变传入的组件 WrappedComponent 的渲染
        return super.render();
      }
    };
  };
}

export default function ReverseExtends() {
  return (
    <div>
      <LogIndex />
    </div>
  );
}

class Index extends Component {
  state = {};
  render() {
    return (
      <div>
        <div id="text">这是一个简单的组件</div>
      </div>
    );
  }
}

const LogIndex = logProps({ text: "text_module_show" })(Index);
```

# 渲染控制 renderControl

要做运行时的代码优化

1. 父组件直接隔离子组件的渲染
2. 组件本身控制要不要额外渲染

## 父组件直接隔离子组件的渲染

### 类组件 constructor、React.cloneElement

```js
import React, { Component } from "react";

export default class RenderControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      count: 0,
    };
    this.component = <Child num={this.state.num} />;
  }

  controlComponentRender = () => {
    const { props } = this.component;
    if (props.num !== this.state.num) {
      return (this.component = React.cloneElement(this.component, {
        num: this.state.num,
      }));
    }
    return this.component;
  };

  render() {
    return (
      <div>
        {/* renderControl */}
        {this.controlComponentRender()}
        {/* 原写法 count变时Child的也重新渲染 */}
        {/* <Child num={this.state.num} /> */}
        <button
          onClick={() => {
            this.setState({ num: this.state.num + 1 });
          }}
        >
          num:{this.state.num}
        </button>
        <button
          onClick={() => {
            this.setState({ count: this.state.count + 1 });
          }}
        >
          count:{this.state.count}
        </button>
      </div>
    );
  }
}

const Child = ({ num }) => {
  console.log("子组件执行");
  return (
    <div>
      <span>子组件--{num}</span>
    </div>
  );
};
```

### 函数组件 useMemo  useCallback
useMemo 缓存组件
useCallback 缓存这个函数
```js
import React, { useState, useEffect, useMemo, useCallback } from "react";

function RenderControl() {
  const [num, setNum] = useState(0);
  const [count, setCount] = useState(0);

  const handlClick = useCallback(() => {}, []);
  const memoCount = useMemo(
    () => <Child num={num} name="count" onClick={handlClick} />,
    [num, handlClick]
  );
  return (
    <div>
      {memoCount}
      <MemoChild num={count} name="count" onClick={handlClick} />
      {/* useMemo 把组件缓存起来 */}
      {useMemo(
        () => (
          <Child num={num} />
        ),
        [num]
      )}
      <button
        onClick={() => {
          setNum((pre) => pre + 1);
        }}
      >
        num:{num}
      </button>
      <button
        onClick={() => {
          setCount((pre) => pre + 1);
        }}
      >
        count:{count}
      </button>
    </div>
  );
}

const Child = ({ num }) => {
  console.log("子组件执行");
  return (
    <div>
      <span>子组件--{num}</span>
    </div>
  );
};

// 组件包裹
const MemoChild = React.memo(Child);

export default RenderControl;
```

## 组件本身控制要不要额外渲染

1. 生命周期：shouldComponentUpdate
2. PureComponent - class类组件
 -  对 props 和 state 做一层浅比较，修改对象里的属性值，不会触发渲染

<!-- 力扣 top100 简、中等 -->
