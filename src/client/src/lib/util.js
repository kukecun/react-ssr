
export default {

	// 获取url
	getQueryString(name){
		let reg = new RegExp("(^|&?)"+ name +"=([^&]*)(&|$)");
		let r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
	},

	// 获取url参数对象
	getRequestData(){
		let url = location.search;
		let R = {};

		if(url.indexOf("?") != -1) {
			let str = url.substr(1);
			let strs = str.split("&");

			for(let i=0; i<strs.length; i++) {
				let r = strs[i].split("=");
				R[r[0]] = decodeURIComponent(r[1]);
			}
		}

		return R;
	},

	// 替换URL参数
	changeURLArg(url,arg,arg_val){
    let pattern=arg+'=([^&]*)';
		let replaceText=arg+'='+arg_val;

    if(url.match(pattern)){
			let tmp = '/('+ arg+'=)([^&]*)/gi';
			tmp = url.replace(eval(tmp),replaceText);
			return tmp;
    }else{
			if(url.match('[\?]')){
				return url+'&'+replaceText;
			}else{
				return url+'?'+replaceText;
			}
    }
    return url+'\n'+arg+'\n'+arg_val;
	},

	// 设置title
	title(str){
		let title = str || '';
    window.document.title = title;
  },

	// 打*号
	hiddenString: function(str, startLen, endLen){
		if (!str) return "";

		var xNum = str.length - (startLen + endLen);

		if (xNum < 0) {
			return str;
		}
		return str.replace(str.slice(startLen, str.length - endLen), new Array(xNum + 1).join("*"));
  },

  // 打...
	moreString: function(str, len){
    if (!str) return "";

    if(str.length <= len) return str;

		return str.substring(0, len)+"...";
	},

	/**
	 * 功能：时间戳转换时间
	 * 用法: expUse.format(new Date().getTime(), "yyyy-MM-dd hh:mm:ss W")
	 */
	format: function(timenumber, format) {

		let week = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
			newDate = new Date(timenumber),
			date = {
				"M+": (newDate.getMonth() + 1),
				"d+": newDate.getDate(),
				"h+": newDate.getHours(),
				"m+": newDate.getMinutes(),
				"s+": newDate.getSeconds(),
				"q+": Math.floor((newDate.getMonth() + 3) / 3),
				"S+": newDate.getMilliseconds(),
				"w+": newDate.getDay(),
				"W+": week[newDate.getDay()],
				"P+": () => {
					if(newDate.getHours() >= 11 && newDate.getHours() < 12)
					return "中午";

					if(newDate.getHours() < 11)
					return "上午";

					if(newDate.getHours() >=12)
					return "下午";
				}
			};

		if (/(y+)/i.test(format)) {
			format = format.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length));
		}

		for (var k in date) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
			}
		}

		return format;
  },

  // 时分秒
  countDown(timenumber, format){

    let date = {
      "d+": Math.floor(+timenumber/1000/60/60/24),
      "h+": Math.floor(+timenumber/1000/60/60%24),
      "m+": Math.floor(+timenumber/1000/60%60),
      "s+": Math.floor(+timenumber/1000%60),
    }

    for (var k in date) {
      console.log(new RegExp("(" + k + ")"))
			if (new RegExp("(" + k + ")").test(format)) {
        console.log(RegExp.$1)
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
			}
    }

    return format;
  },

	/**
	 * 倒计时
	*/
	tick(n, callback){

		let d = n * 1000, //持续时间
				c = d, //变化值
				t = 0, //当前时间
				b = 1, //当前值
				s = new Date().getTime();

		let T = (t, b, c, d) => (c * t / d + b),
				timer = null;

		function run(){
			let t = new Date().getTime() - s;

			if (d > t) {
				if (typeof callback === "function") {
					callback(Math.ceil(T(t, b, c, d) / 1000))
				};
				timer = setTimeout(function(){
					run();
				}, 1000);
			};
		}
		run();
  },

  randomString(len = 7){
    let chars = `ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678${new Date().getTime()}`;
    let maxPos = chars.length;
    let pwd = '';

    for (let i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },

  randomFrom(lowerValue,upperValue) {
    return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
  },

  urlParams(data){

    let params = Object.keys(data).map(function (key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    }).join("&");

    if(params != "") params = `?${params}`;

    return params;
  },

  //返回角度
  getSlideAngle(dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI;
  },

  // 判断设备
  browser(){

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

  // 判断来源是否是app
  getIsFromApp(){
    let browser = this.browser();
    let isFromApp = false;

    if (browser == "Android" || browser == "iOS") {

      let a = this.getQueryString("isFromApp");
      let b = this.getQueryString("v");
      let c = this.getQueryString("u");

      if (!!a && a != 0) {
        isFromApp = a;
      } else {

        if (!!b && b != 0 && !!c && c != 0) {
          isFromApp = c;
        }
      }

      return isFromApp;
    }

    return isFromApp;
  },

  //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
  getSlideDirection(startX, startY, endX, endY) {
    let dy = startY - endY;
    let dx = endX - startX;
    let result = 0;

    //如果滑动距离太短
    if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
      return result;
    }

    let angle = this.getSlideAngle(dx, dy);

    // 向上
    if(angle >= 60 && angle <= 120) {
      result = 1;
    }

    // 左上
    if(angle <= 180 && angle > 120) {
      result = 6;
    }

    // 右上
    if(angle >= 0 && angle < 60) {
      result = 2;
    }

    // 向下
    if(angle <= -60 && angle >= -120) {
      result = 4;
    }

    // 左下
    if(angle >= -180 && angle < -120) {
      result = 5;
    }

    // 右下
    if(angle < 0 && angle > -60) {
      result = 3;
    }

    return result;
  }

};
