
# 项目说明

1、在 HBuilderX 中打开项目，选择运行-运行到浏览器-chrome，即可在本地跑起来
2、选择发行-网站-PC WEB或手机H5(仅适用于uni-app)，即可打包为h5
3、打包后，会生成unpackage目录，找到里层的h5文件夹，将整个文件夹部署到线上即可

**目录说明**

```json
┌─api                     接口
├─components              公共组件目录
├─locale                  多语言
├─pages                   业务页面文件存放的目录
├─static                  静态资源（打包时，资源不会被压缩）
├─App.vue                 应用配置，用来配置App全局样式以及监听 应用生命周期
├─index.html              应用入口html文件
├─main.js                 Vue初始化入口文件
├─manifest.json           配置应用名称、appid、logo、版本等打包信息，详见
├─pages.json              配置页
└─uni.scss                应用公共变量

```