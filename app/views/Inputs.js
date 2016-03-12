import React from 'react';
import {RATES} from 'app/config';

export default class Inputs extends React.Component {
  convert() {
    let state = this.state || {};

    state.output = <div className="amount">&pound;{this.state.amount.pound} {(this.state.amount.shilling + this.state.amount.pence)}p</div>;

    this.setState(state);
  }

  setValues(values) {
    this.setState(values);
  }

  setValue(name, value) {
    let state = this.state || {};

    if (!state.amount) {
      state.amount = {};
    }

    if (RATES[name]) {
      value *= RATES[name];
    }

    state.amount[name] = value;

    this.setState(state);
  }

  componentDidMount() {
    if (!this.state) {
      this.setValues({
        amount: {
          pound: this.props.main.state.pound * RATES.pound,
          shilling: this.props.main.state.shilling * RATES.shilling,
          pence: this.props.main.state.pence * RATES.pence
        }
      });
    }
  }

  render() {
    const self = this;

    let year = this.props.main.state.year;
    let pound = this.props.main.state.pound;
    let shilling = this.props.main.state.shilling;
    let pence = this.props.main.state.pence;

    let amount = '';
    if (this.state && this.state.output) {
      amount = this.state.output;
    }

    let _convert = (function () {
      const _self = self;
      return function () {
        _self.convert();
      };
    })();

    let setValue = function (e) {
      const name = e.target.id;
      const value = e.target.value;
      self.setValue(name, value);
    }

    return (
      <div className="inputs">
        <input type="number" maxLength="4" id="year" defaultValue={year} />
        <br />
      &pound;<input type="number" id="pound" defaultValue={pound} onChange={setValue} />
        <input type="number" id="shilling" defaultValue={shilling} onChange={setValue} />s
        <input type="number" id="pence" defaultValue={pence} onChange={setValue} />d
        <button onClick={_convert}>was about</button>
        {amount}
      </div>
    );
  }
}
