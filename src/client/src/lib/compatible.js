
import getGlobal from 'system.global';

// window用global替代
const global = getGlobal();

// 配置本地存储兼容
const storage = global.localStorage || {
  getItem: function(){},
  setItem: function(){},
};

export {
  storage
};
