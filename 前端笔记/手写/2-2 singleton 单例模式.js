
// // 检验
// console.log(GlobalUser.getInstance("张三").name); // 张三
// console.log(GlobalUser.getInstance("李四").name); // 张三，依然是张三，复用了第一次创建的实例
// console.log(GlobalUser.getInstance() === GlobalUser.getInstance()); // true

// 构造函数静态函数
function GlobalUser(name) {
    this.name = name
    this.id = 1002
}

GlobalUser.getInstance = function (name) {
    if (this.instance) return this.instance
    return (this.instance = new GlobalUser(name))
}



// ES6 class static静态方法

class GlobalUser {
    constructor(name) {
        this.name = name
        this.id = 1002
    }
    static getInstance(name) {
        if (this.instance) return this.instance
        return this.instance = new GlobalUser(name)
    }
}

// 代理 

function CreateGlobalUser(name) {
    this.name = name
    this.id = 1002
}

CreateGlobalUser.prototype.getName = function () {
    console.log(this.name)
}

var GlobalUser = (function () {
    var instance;
    return function (name) {
        if(!instance){
            instance = new CreateGlobalUser(name)
        }
        return instance
    }
})()

const user1 = new GlobalUser('a')
const user2 = new GlobalUser('b')
console.log(user1 === user2);



