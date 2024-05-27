/*
cd C:\Users\Administrator\Desktop\前端笔记\手写
node 1-1-bind.js

使得下面可运行
function logX() {
    console.log(this.x, 'xxx');
}

logX.newBind({ x: 1 })()
*/

Function.prototype.newBind = function () {
    const _this = this
    const args = Array.prototype.slice.call(arguments)
    const newThis = args.shift()

    return function () {
        return _this.newApply(newThis, args)
    }
}

Function.prototype.newApply = function (context) {
    const newContext = context || window

    const _this = this
    newContext.fn = _this

    let result;
    if (arguments[1]) {
        result = newContext.fn(...arguments[1])
    } else {
        result = newContext.fn()
    }

    delete newContext.fn
    return result

}

function logX() {
    console.log(this.x, 'xxx');
    console.log(arguments);

}

logX.newBind({ x: 1 }, 1, 2, 3)()