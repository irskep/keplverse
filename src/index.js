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
        this.state = JSON.parse(window.decodeURIComponent(h).substring(1));
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
    const newState = {seed: this.state.seed + delta};
    this.setState(newState);
    window.location.hash = JSON.stringify(Object.assign({}, this.state, newState));
  }

  render() {
    return (
      <div className="Meta">
        <header className="Header">
          <h1>The Keplverse: A procedural star system generator</h1>

          <nav>
            <span className="Meta__Next m-clickable" onClick={this.go.bind(this, 1)}>Next (n)</span>
            {" "}
            <span className="Meta__Previous m-clickable" onClick={this.go.bind(this, -1)}>Previous (p)</span>
          </nav>
          <div style={{clear: 'both'}} />
        </header>

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