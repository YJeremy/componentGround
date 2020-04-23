# 组件练习场说明

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



### 其他

#### 添加路由
* 只要出现在 pages 目录下的js,都可以通过 localhost:8000/文件名 或者文件夹名查看

#### 数据使用
* 可参考首页的例子

#### 目录说明
* components  组件存放 --主要增加这个文件夹的内容
* layouts 全局布局  --这里设置了页面全局布局，一切页面都在这个布局下展示
* models 数据模型文件夹 --dvaJS 的路径，只要调用connect（） 函数就能够访问文件夹里的数据
* pages 页面存放  --展示组件
* services 请求后端API --获取实际业务要求的API
* utils 工具库  --请求的方法、逻辑算法
