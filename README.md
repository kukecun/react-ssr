# 目录结构
+ logs => 日志输出目录
+ pm2 => 线上启动配置
+ src => 资源目录
  + build => webpack构建
  + client => 用户端
    + dist => 打包目录
    + enter => 入口文件
      + main.js => 核心文件配置入口
    + lib => 主库文件，里面方些  jquery、createjs、echarts等公共js
    + src => 用户端资源文件
    + views => nodejs 模版文件
  + conf => 配置文件
  + server => 服务端
    + get => 页面及react-node配置，实现ssr。
      + control => 总控制机
      + page => 配置单独页面的title、meta、description及针对性资源
      + router => react-node 中间件（还没封装，框架还需完善）最核心配置就在这里
    + post => post请求
    + node_modules => 此文件里的内容并非 npm下载内容，而是为了方便引入的自定义文件包，如 redis、mysql、mongodb、wechat的核心文件都在此写入。
    + server.js => 启动基础文件
    + server.dev.js => 本地启动
    + server.prod.js => 线上启动
    + server.nodemon.js => 写服务端的时候用，如调试mysql、redis、接口调试等。

# 启动方式
cnpm i 

npm run dll 

npm run dev 

dll 只需执行一次，默认已经打包。即： 下载完依赖包后就可以启动

环境配置在 conf/env.js 文件中
