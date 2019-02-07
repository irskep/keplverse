import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import KeyHandler, { KEYPRESS } from 'react-key-handler';

import _ from "lodash";

import __ from "./normalize.css";
import ___ from "./style.scss";

import URLStorage from './URLStorage';
import KStarSystem from "./KStarSystem";
import System from './components/System';
import SystemFinder from './components/SystemFinder';

/* Good seeds for testing:
1549433735318
*/

const SYSTEMS = {};
function getSystem(seed) {
  if (!SYSTEMS[seed]) {
    SYSTEMS[seed] = new KStarSystem(seed);
  }
  return SYSTEMS[seed];
}

const URL_STORAGE = new URLStorage(() => ({
  seed: Date.now(),
}));

function Meta() {
  const [seed, setSeed] = URL_STORAGE.useStoredValue('seed', parseFloat);

  const go = (delta) => setSeed(seed + delta);

  const kss = getSystem(seed);

  return (
    <div className="Meta">
      <KeyHandler
        keyEventName={KEYPRESS}
        keyValue="n"
        onKeyHandle={go.bind(this, 1)}
        />

      <KeyHandler
        keyEventName={KEYPRESS}
        keyValue="p"
        onKeyHandle={go.bind(this, -1)}
        />

      <header className="Header">
        <h1>The Keplverse: A procedural star system generator</h1>

        <nav>
          <span className="Meta__Next m-clickable" onClick={go.bind(this, 1)}>
            Next (n)
          </span>
          {" "}
          <span className="Meta__Previous m-clickable" onClick={go.bind(this, -1)}>
            Previous (p)
          </span>
        </nav>
        <div style={{clear: 'both'}} />
      </header>

      <SystemFinder baseSeed={seed} onSeedFound={setSeed} />
      <System kss={kss} key={seed} />
    </div>
  );
}

ReactDOM.render(<Meta />, document.getElementById('root'))