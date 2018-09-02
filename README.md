### react+antd搭建的后台管理系统
使用webpack+yarn，项目搭建时，因使用支付宝的antd，故使用less。
项目初始化时遇到的问题：
1. less版本在安装的时候为3.8左右，在webpack4配置`less-loader`的时候，设置如下
```
  {
    loader: require.resolve('less-loader'),
    options: { 
      modifyVars: {
        '@primary-color': '#f9c700',
        'link-color': '#1DA57A',
        'border-radius-base': '2px',
      },
      javascriptEnabled: true,
    }
  }
```

a: 其中`javascriptEnabled: true,`是为less 3及以上版本添加的属性，否则报错
```
    Module build failed:

  // https://github.com/ant-design/ant-motion/issues/44
  .bezierEasingMixin();
  ^
  Inline JavaScript is not enabled. Is it set in your options?
```
b:其中`modifyVars`用于设置antd自定义主题，然而less 3.8的版本在设置自定义主题的时候会报错，
```
  Error evaluating function `tint`: color2.toHSL is not a function
  in F:\react\imoocmanage\node_modules\antd\es\style\themes\default.less (line 465, column 38)
```
,大致意思为`default.less`里的`tint`无法解析识别。
将已安装的less3.8移除`yarn remove less`,重新安装`yarn add less@2.7.3`,此时antd自定义主题功能也没有问题了

### 记录
1. 3.4 9.3，基本布局