# 组件练习场说明

![首页](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20200424171617849.png)


## 项目启动

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

## 目标
1. 仅仅关注前端UI的设计，完全不担心数据获取和处理；让设计者更加专注于UI的设计

2. 组件试验

3. 增加文件夹里 components 的内容,作为我们的组件库。

## 基本使用方法

* 在components 文件夹里面写 基础的组件
* 在page 文件里面,创建pageName页面组件，并导入components里的组件实现想要的效果
* 运行后，在localhost:8000/pageName 下面看到实现



## 其他

#### 添加路由
* 只要出现在 pages 目录下的js\jsx,都可以通过 localhost:8000/文件名 或者文件夹名查看文件渲染出来的效果
* 建议创建一个文件夹，在文件里面添加 名为 index.js /jsx 的文件

#### 数据使用
* 可参考首页的例子
#### 目录结构描述

|—— Readme.md                  //说明文档
|—— components                //组件目录,主要增加文件夹里的组件
|   |—— DispalyCard           //例子组件
|   |—— EditBox               //例子组件
|   |__ ...                   //例子组件
|
|—— layouts                     //全局布局
|   |—— index.jsx               //布局框架、导航栏
|   |__ index.less
|
|—— models                 //Dva数据存放
|   |—— machine.js            //machine数据
|   |—— progarm.js            //progarm数据
|   |—— staticModel.js        //staticModel数据
|   |__ ...                   //
|
|—— pages                 //页面放置
|   |—— Mary               //页面,localhost:8000/mary
|   |—— Lucy               //页面，localhost:8000/lucy
|   |—— Jeremy               //页面，localhost:8000/jeremy
|   |—— index.js          //首页页面，路径localhost：8000
|   |__ ...               //
|
|—— services                 //请求后端API
|   |__ customapi.js           //获取实际业务要求的API
|
|__ utils                 //工具库
    |__ ...                   //请求的方法、逻辑算法...

* services  --
