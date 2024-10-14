// cd C:\Users\Administrator\Desktop
// node temp.js

// 基础版
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
    constructor(executor) {
        // 1. 默认状态 - PENDING
        this.status = PENDING;
        // 2. 维护内部成功失败的值
        this.value = undefined;
        this.reason = undefined;

        // 存放成功的回调
        this.onResolvedCallbacks = [];
        // 存放失败的回调
        this.onRejectedCallbacks = [];

        // 成功回调
        let resolve = value => {
            // 单向流转
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }

        // 失败的回调
        let reject = reason => {
            // 单向流转
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        // 主执行
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
        // executor里有异步的，此时没执行完，还在PENDING状态
        if (this.status === PENDING) {
            // 存放执行队列
            this.onResolvedCallbacks.push(() => {
                onFulfilled(this.value);
            })
            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason);
            })
        }
    }
}

// 完整版
class myPromise {
    constructor(executor) {
        this.status = 'PENDING';
        this.value = undefined;
        this.reason = undefined;

        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        let resolve = value => {
            if (this.status === 'PENDING') {
                this.status = 'FULFILLED';
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }

        let reject = reason => {
            if (this.status === 'PENDING') {
                this.status = 'REJECTED';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error };

        // 实现可以链式调用
        let promise2 = new myPromise((resolve, reject) => {
            if (this.status === 'FULFILLED') {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            }

            if (this.status === 'REJECTED') {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            }

            if (this.status === 'PENDING') {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            this.resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                });

                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            this.resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
            }
        });

        return promise2;

    } catch(onRejected) {
        return this.then(null, onRejected);
    }

    // then 也是可以return 的。 x 就是then()执行后的返回值
    resolvePromise(promise2, x, resolve, reject) {
        if (promise2 === x) {
            // 已经promise
            return reject(new TypeError('Chaining cycle detected for promise'));
        }

        let called = false;
        if (x instanceof Promise) {
            x.then(y => {
                this.resolvePromise(promise2, y, resolve, reject);
            }, error => {
                reject(error);
            });
        } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
            try {
                let then = x.then;
                if (typeof then === 'function') {
                    then.call(x, y => {
                        if (called) return;
                        called = true;
                        this.resolvePromise(promise2, y, resolve, reject);
                    }, error => {
                        if (called) return;
                        called = true;
                        reject(error);
                    });
                } else {
                    // then 到底了，是最终返回的值
                    resolve(x);
                }
            } catch (error) {
                if (called) return;
                called = true;
                reject(error);
            }
        } else {
            // 都不是，本来就是我最终需要的值，不需要任何额外操作
            resolve(x); 
        }
    }
}


// 测试用例
const asyncOperation = new myPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('Async operation success');
    }, 1000);
});

asyncOperation
    .then(value => {
        console.log('First then:', value);
        return 'Result from first then';
    })
    .then(value => {
        console.log('Second then:', value);
        return new myPromise((resolve, reject) => {
            setTimeout(() => {
                resolve('Result from second then Promise');
            }, 500);
        }).then((value) => {
            return "2th then.then Promise"
        });
    })
    .then(value => {
        console.log('Third then:', value);
        throw new Error('Error in third then');
    })

    .catch(error => {
        console.error('Catch:', error.message);
    });