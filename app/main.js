import React from 'react';
import ReactDOM from 'react-dom';

import Inputs from 'app/views/Inputs';

class MainView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      year: 1946,
      pound: null,
      shilling: null,
      pence: null
    };
  }
  render() {
    return (
      <div className="main">
        <Inputs main={this} />
      </div>
    );
  }
}

ReactDOM.render(<MainView />, document.body.querySelector('.main'));
