# 项目查重系统

## 2020.3.25 补充

1. 对比库模块与送检输入模块的相似页面代码和逻辑完全一致，仅仅替换文件中的"manage"和"list",后期有时间可以考虑抽取公共代码和样式
2. 页面里的面包屑统一用 Nav 组件

## 说明

1. 系统的全局样式写在 project.less 文件中
2. 所有需要后台解析的文件上传操作，写在相应模块的 model 文件中
3. 上传文件：先传 excel 再传 zip，补充 zip 时，只需要调用传 zip 的接口即可

## 文档

接口文档：http://192.168.1.253:8092/doc.html#/home

UI: https://lanhuapp.com/web/#/item/project/detailDetach?pid=63f8ec78-67f3-4887-955c-e77a5670796b&project_id=63f8ec78-67f3-4887-955c-e77a5670796b&image_id=8661c31c-be71-45b2-b3eb-c4753796d24f&fromEditor=true

## 部署

#### 开发环境：

1. 部署地址：liangzhi@192.168.1.253:/home/liangzhi/web_service/check_duplicates
2. 部署密码：liangzhi
3. 开发环境链接: http://192.168.1.253:8167/

#### 正式环境

链接：http://202.107.204.56:8874/
