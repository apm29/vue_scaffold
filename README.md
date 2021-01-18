# vue-scaffold

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 配置说明

* Eslint规则文件.eslintrc.js
* babel配置文件babel.network.config.js
* vue/webpack配置:vue.network.config.js
* 浏览器兼容设置:.browserslistrc
* vscode配置:jsconfig.json

### 文件夹说明

* @为src文件夹别名
* @assets资源文件:图片等
* components:组件文件夹
* config:配置文件夹
* mixins:混入文件夹
* plugins:插件的配置等
* router:vue-router的路由表/路由守卫文件
* store:vuex的配置
* utils:自定义工具栏,例如网络请求
* views:页面文件
* style:公共样式文件

### Vue原型挂载的方法说明

* $delay:传入延迟的毫秒数N,返回一个Promise,N毫秒后resolve
* $notification:传入String或者Object配置,在页面顶部显示通知内容,配置内容见下面的代码,post/get/upload方法已经写入了很多默认参数

```javascript
{
  title: string; //标题
  text: string; //内容
  type: string; //类型:success warning info error
  group: string; //组名,相同组显示在不同位置 top/bottom
  duration: number; //持续时间
  speed: number; //进入速度
  data: object; //数据类:暂不支持[WIP]
  clean: boolean; //是否情空其他通知
}
```

* $remote:请求工具类,带有若干Http请求方法
    * post
    * get
    * upload

> 请求参数为option,主要使用其中的url和data两个字段:

```javascript
//默认options
const DEFAULT_OPTION = {
  responseType: "json", //类型
  url: "/", //url
  data: {}, //请求参数在此
  method: "POST",
  header: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  silent: false, //不显示loading
  resumeOnError: false, //false时失败直接抛出异常
  transformRequest: [
    data => {
      return qs.stringify(data);
    }
  ]
};
```


