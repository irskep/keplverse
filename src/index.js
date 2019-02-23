import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import KeyHandler, { KEYPRESS } from 'react-key-handler';

import __ from "./normalize.css";
import ___ from "./style.scss";

import { MovableWindow, StaticWindow, Group, TinyButton } from 'ninetyfive';

import URLStorage from './URLStorage';
import KStarSystem from "./KStarSystem";
import SeedNavigator from './components/SeedNavigator';
import BodyListAndPanZoomer from './components/BodyListAndPanZoomer';
import SystemFinder from './components/SystemFinder';
import AboutText from './components/AboutText';

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
  const [seed, setSeed] = URL_STORAGE.useStoredValue('seed');
  const [isAboutOpen, setIsAboutOpen] = useState(!localStorage.wasClosed);

  const go = (delta) => setSeed(seed + delta);

  const closeAbout = () => {
    localStorage.wasClosed = true;
    setIsAboutOpen(false);
  }

  const kss = getSystem(seed);

  return (
    <div className="Meta">
      <KeyHandler keyEventName={KEYPRESS} keyValue="n" onKeyHandle={go.bind(this, 1)} />
      <KeyHandler keyEventName={KEYPRESS} keyValue="p" onKeyHandle={go.bind(this, -1)} />
      <KeyHandler
        keyEventName={KEYPRESS}
        keyValue="r"
        onKeyHandle={setSeed.bind(this, Math.floor(Math.random() * Number.MAX_SAFE_INTEGER))} />

      <StaticWindow
          title="Keplverse Telescope Software 1.0"
          titleExtra={(
            <TinyButton key="button" style={{float: 'right'}} onClick={setIsAboutOpen.bind(this, true)}>
              ?
            </TinyButton>
          )}>
        <div className="W95__HorzFlex" key="top">
          <Group title="Star System Info">
            <p>Auto name: {kss.name}</p>
            <p>Seed: {seed}</p>
          </Group>
          <Group title="Seed">
            <SeedNavigator baseSeed={seed} onSeedFound={setSeed} />
          </Group>
          <SystemFinder baseSeed={seed} onSeedFound={setSeed} />
        </div>
        <BodyListAndPanZoomer key="bottom" kss={kss} key={seed} />
      </StaticWindow>

      <MovableWindow
          isOpen={isAboutOpen}
          title="About Keplverse Telescope Software"
          windowStyle={{
            width: 485,
            height: 485,
            maxWidth: '100%',
            maxHeight: '100%',
          }}
          canClose={true}
          onClose={closeAbout}>
        <AboutText />
      </MovableWindow>
    </div>
  );
}

ReactDOM.render(<Meta />, document.getElementById('root'))