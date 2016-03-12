import React from 'react';
import {RATES} from 'app/config';

export default class Inputs extends React.Component {
  convert() {
    let state = this.state || {};

    let pound = this.state.amount.pound;
    let pence = this.state.amount.shilling + this.state.amount.pence;

    if (pence / 100 > 1) {
      let poundMod = pence / 100;
      pound = poundMod + pound;
      pence = false;
      pound = pound.toFixed(2);
    } else {
      pence = '.' + Math.round(pence);
    }

    state.output = <div className="amount">&pound;{pound}{pence}p</div>;

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
        <label>&pound;</label>
        <input type="number" id="pound" defaultValue={pound} onChange={setValue} />
        <label>Shillings</label>
        <input type="number" id="shilling" defaultValue={shilling} onChange={setValue} />
        <label>Old Pence</label>
        <input type="number" id="pence" defaultValue={pence} onChange={setValue} />
        <button onClick={_convert}>was about</button>
        {amount}
      </div>
    );
  }
}
