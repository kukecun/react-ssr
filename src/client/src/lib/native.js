import Util from './util';

export default {

  setParams(action_name, params, _url){
    let data = {
      url:_url,
      cmd:{
        action_name:action_name,
        params:params,
        url:_url,
      }
    };
    sendDataToOC(data);
  },

  webviewSystem(){

    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    let ua = window.navigator.userAgent.toLowerCase();

    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return 'wx';
    } else {

      if (isiOS) {
        return 'iOS';
      } else if (isAndroid) {
        return 'Android';
      } else {
        console.log('非微信web', ua)
      }
    }

    return 'web';
  },

  // 针对iOS
  connectWebViewJavascriptBridge(callback){
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge)
    } else {
      document.addEventListener('WebViewJavascriptBridgeReady', function() {
        callback(WebViewJavascriptBridge)
      }, false)
    }
  },

  // connectWebViewJavascriptBridge 回调函数
  connectWebViewJavascriptBridgeCallback(bridge){
    bridge.init(function(message, responseCallback) {})
    bridge.registerHandler('javascriptHandler', function(data, responseCallback) {})

    window.sendDataToOC = function(params) {
      bridge.callHandler("javascriptHandler", params, function(response){
        if(typeof response.uid == 'undefined') {
          return;
        }
        loginSite(response);
      });
    }
  },

  // iOS专家版
  connectWebViewJavascriptBridgeZhuanJia(){
    window.sendDataToOC = function(params) {
      window.webkit.messageHandlers.MModel.postMessage(params);
    }
  },

  init(){

    const browser = this.webviewSystem();

    window.sendDataToOC = function(params) {};

    // 针对Android
    if(browser == "Android") {
      window.sendDataToOC = function(params) {
        let a = JSON.stringify(params);
        window.javascriptHandler.sendDataToOC(a);
      };
    }

    if(browser == "iOS") {

      let isFromApp = Util.getQueryString("isFromApp");

      // 如果是用户版
      if(isFromApp == 1) {
        this.connectWebViewJavascriptBridge(this.connectWebViewJavascriptBridgeCallback);
      }

      // 如果是专家版
      if(isFromApp == 2) {
        this.connectWebViewJavascriptBridgeZhuanJia();
      }
    }

    return {
      setParams: this.setParams,
      browser,
    }
  },
}
