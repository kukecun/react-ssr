
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Page extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    class A{
      constructor() {
        this.a = 1;
        this.b = 2;
      }
    }

    class B{
      constructor() {
        this.c = 3;
        this.d = 4;
      }
    }

    B.prototype = new A();
    B.prototype.constructor = B;
    B.prototype.o = A.prototype;

    let c = new B();
    let d = new B();

    let f = Object.assign({}, ...Object.getPrototypeOf(c).__proto__);

    // console.log(f)
    // console.log(Object.getPrototypeOf(c).b)
    // console.log(Object.getPrototypeOf(d).c)

    function clone(origin) {
      let originProto = Object.getPrototypeOf(origin);
      return Object.assign(Object.create(originProto), origin);
    }

    let dd = {b: 3, c:6}
    let aa = {a: Object.assign({}, dd)}


    console.log(">>>>>>>>")
    let cc = clone(aa);
    cc.b = 2;
    cc.a = Object.assign({}, dd);
    cc.a.b = 5;
    console.log(cc);
    console.log(aa);
  }

  render() {

    return (
      <div className="page-home">
        kukecun
      </div>
    )
  }
}

const mapStateToProps = (state) => {
	return {
		data: state.data,
	}
}

Page = connect(mapStateToProps)(Page);

Page.propTypes = {
  data: PropTypes.string
}

export default Page;
