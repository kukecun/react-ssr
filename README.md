# 目录结构
+ logs => 日志输出目录
+ pm2 => 线上启动配置
+ src => 资源目录
  + build => webpack构建
  + client => 用户端
    + dist => 打包目录
    + enter => 入口文件
      + main.js => 核心文件配置入口
  + conf => 配置文件
  + server => 服务端

# 启动方式
cnpm i 

npm run dll 

npm run dev 

dll 只需执行一次，默认已经打包。即： 下载完依赖包后就可以启动

环境配置在 conf/env.js 文件中
