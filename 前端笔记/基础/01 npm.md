# npm

### 命令：

ls 列出所有的文件命
npm init 出现 package.json
node 出现命令行

### 文件中引入的包 ？？？
import * from "A"
./node_modules 是最先检索的路径

### package.json的命令行
```js
"scripts":{
  "test":"jest"
}
```

在 package.json 中的命令行（jest）会自动地去 ./node_modules/.bin 路径找
实际相当于在命令行中写： ./node_modules/.bin/jest
