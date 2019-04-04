
export default {

  pullRefreshTimer: null,

  down(ck) {

    let _this = this;

    clearTimeout(_this.pullRefreshTimer);
    _this.pullRefreshTimer = null;

    _this.pullRefreshTimer = setTimeout(() => {

      let H = +$(document).innerHeight();
      let WH = +$(window).height();

      let top = +$(window).scrollTop()+WH;
      if(top >= H-80) {
        _this.tick(ck);
      }
    }, 300);
  },

  tick(ck) {

    typeof ck === "function" && ck();
  },
}
