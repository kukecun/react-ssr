
let timer, style = document.head.appendChild(document.createElement("style"));
let useREM = window.useREM = Object.create(
	{
		resize: function () {
			var config=this.config;
			this.size=Math.max(config.min, Math.min(config.max, document.documentElement.clientWidth)) / config.num;
			style.innerHTML="html{font-size: "+ this.size +"px !important;}"
			return this;
		},

		set: function (newConfig) {
			if(newConfig){
				for (var a in newConfig){
					if(this.config.hasOwnProperty(a)){
						this.config[a]=newConfig[a];
					}
				}
			}
			this.resize();
			return this;
		}
	},

	{
		size: {
			value: 20,
			writable: true,
			configurable: false,
			enumerable: true
		},

		config: {
			value:{
				max: 750,
				min: 320,
				num: 16,
				delay: 100
			},

			writable: false,
			configurable: false,
			enumerable: true
		}
  });

  addEventListener("resize", function () {
    clearTimeout(timer);
    timer = setTimeout(this.resize.bind(this), this.config.delay);
  }.bind(useREM));

  useREM.set();

// export default {
//   init(){
// 		addEventListener("resize", function () {
// 			clearTimeout(timer);
// 			timer = setTimeout(this.resize.bind(this), this.config.delay);
// 		}.bind(useREM));

// 		useREM.set();
// 	}
// };
