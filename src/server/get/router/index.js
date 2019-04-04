
// react主要包引入
import React from 'react';

// react服务端渲染方法
import {renderToString} from 'react-dom/server';

// 路由
import { StaticRouter } from 'react-router-dom';

// redux引入
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux';
import thunk from "redux-thunk";

// 路径
import path from "path";

// 请求切割
import Util from "m.util";

// config
import mConfig from "m.config";

module.exports.start = function(req, res, dataBase) {

  // 模块路径
  const viewsPath = path.resolve(Config.rootStartProject(), './src/views');

  // 模块引入
  const reducer = require(path.resolve(viewsPath, "./reducer"));
  const App = require(viewsPath);

  if(Util.filterGet.test(req.url)) next();

  let config = dataBase.G;

  const store = createStore(reducer, dataBase.data, compose(
    applyMiddleware(thunk),
  ));

  const preloadedState = store.getState();

  const context = {}

  const content = renderToString(
    (
      <Provider store={store}>
        <StaticRouter location={req.url} context={context} >
          <App />
        </StaticRouter>
      </Provider>
    )
  );

  let data = {G: dataBase.G, meta: dataBase.meta, preloadedState: dataBase.preloadedState, content,};

  res.render('views/index', data, function(err, html) {

    res.send(html);
  });
}
