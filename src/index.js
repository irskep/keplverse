import React from 'react';
import ReactDOM from 'react-dom';
import KeyHandler, { KEYPRESS } from 'react-key-handler';

import _ from "lodash";

import __ from "./normalize.css";
import ___ from "./style.scss";

import KStarSystem from "./KStarSystem";
import System from './components/System';

const SYSTEMS = {};

class Meta extends React.Component {
  constructor(props) {
    super(props);

    if (window.location.hash.length == 0) {
      this.state = {
        seed: Date.now(),
      };
      window.location.hash = JSON.stringify(this.state);
    } else {
      let h = window.location.hash;
      if (h[0] == "#") {
        this.state = JSON.parse(h.substring(1));
      } else {
        this.state = JSON.parse(h);
      }
    }
  }

  kss() {
    if (!SYSTEMS[this.state.seed]) {
      SYSTEMS[this.state.seed] = new KStarSystem(this.state.seed);
    }
    return SYSTEMS[this.state.seed];
  }

  go(delta) {
    this.setState({seed: this.state.seed + delta});
      window.location.hash = JSON.stringify(this.state);
  }

  render() {
    return (
      <div className="Meta">
        <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="n"
          onKeyHandle={this.go.bind(this, 1)}
          />

        <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="p"
          onKeyHandle={this.go.bind(this, -1)}
          />

        <System kss={this.kss()} />
      </div>
    );
  }
}

ReactDOM.render(<Meta />, document.getElementById('root'))