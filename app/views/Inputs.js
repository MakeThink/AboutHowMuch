import React from 'react';
import {RATES} from 'app/config';
import RPI from 'app/rpi'; // 2010 = 100% (baseline)

export default class Inputs extends React.Component {
  convert() {
    let state = this.state || {};

    let rpi = RPI[this.state.year.toString()] / 100;

    let pound = this.state.amount.pound;
    let pence = this.state.amount.shilling + this.state.amount.pence;

    let amount = (pound * 100) + pence;

    amount = amount * rpi;

    amount = amount / 100;

    let _amount = 0;
    let fixed = 1;
    while(_amount === 0) {
      _amount = parseFloat(amount.toFixed(fixed));
      fixed = fixed + 1;
    }

    state.output = <div className="amount">&pound;{amount.toFixed(fixed)}p</div>;

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

  setYear(value) {
    let state = this.state || {};

    state.year = value;

    this.setState(state);
  }


  componentDidMount() {
    if (!this.state) {
      this.setValues({
        year: this.props.main.state.year,
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
    };

    let setYear = function (e) {
      const value = e.target.value;
      self.setYear(value);
    };

    return (
      <div className="inputs">
        <div className="money mbm cf">
          <div className="col-3-3">
            <label className="input-label">Add an amount in pounds, shillings and pence</label>
          </div>
          <div className="col-1-3">
            <input type="number" id="pound" defaultValue={pound} onChange={setValue} placeholder="&pound;" />
          </div>
          <div className="col-1-3">
            <input type="number" id="shilling" defaultValue={shilling} onChange={setValue} placeholder="s" />
          </div>
          <div className="col-1-3">
            <input type="number" id="pence" defaultValue={pence} onChange={setValue} placeholder="d" />
          </div>
        </div>
        <div className="year mbm cf">
          <div className="year-input">
            <div className="col-1-3">
              <span className="in">In</span>
            </div>
            <div className="col-2-3">
              <label className="year-label">choose a year between now and 1694</label>
              <input type="number" maxLength="4" id="year" defaultValue={year} onChange={setYear} />
            </div>
          </div>
        </div>
        <button onClick={_convert}>was about how much?</button>

        <div className="result mtm">
          {amount}
        </div>
      </div>
    );
  }
}
