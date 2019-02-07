import React from 'react';
import ReactDOM from 'react-dom';
import KeyHandler, { KEYPRESS } from 'react-key-handler';

import _ from "lodash";

import __ from "./normalize.css";
import ___ from "./style.scss";

import KStarSystem from "./KStarSystem";
import System from './components/System';
import SystemFinder from './components/SystemFinder';

const SYSTEMS = {};

function encode(s) {
  return window.encodeURIComponent(s)
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D');
}

class Meta extends React.Component {
  constructor(props) {
    super(props);

    if (window.location.hash.length == 0) {
      this.state = {
        seed: Date.now(),
      };
      window.location.hash = encode(JSON.stringify(this.state));
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
    this.setSeed(this.state.seed + delta);
  }

  setSeed(seed) {
    const newState = Object.assign({}, this.state, {seed});
    this.setState(newState);
    window.location.hash = encode(JSON.stringify(Object.assign({}, this.state, newState)));
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

        <header className="Header">
          <h1>The Keplverse: A procedural star system generator</h1>

          <nav>
            <span className="Meta__Next m-clickable" onClick={this.go.bind(this, 1)}>Next (n)</span>
            {" "}
            <span className="Meta__Previous m-clickable" onClick={this.go.bind(this, -1)}>Previous (p)</span>
          </nav>
          <div style={{clear: 'both'}} />
        </header>

        <SystemFinder baseSeed={this.state.seed} onSeedFound={this.setSeed.bind(this)} />
        <System kss={this.kss()} key={this.state.seed} />
      </div>
    );
  }
}

ReactDOM.render(<Meta />, document.getElementById('root'))