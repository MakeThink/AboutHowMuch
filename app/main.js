import React from 'react';
import ReactDOM from 'react-dom';

import Inputs from 'app/views/Inputs';

class MainView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      year: 1970,
      pound: 3,
      shilling: 2,
      pence: 1
    };
  }
  render() {
    return (
      <div className="main">
        <Inputs main={this} />
        (target £3, 10p, 4p)
      </div>
    );
  }
}

ReactDOM.render(<MainView />, document.body.querySelector('.main'));
