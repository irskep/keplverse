import React, { useState } from 'react';
import _ from 'lodash';
import PanZoomer from './PanZoomer';
import StarSystem from './StarSystem';
import StarInfo from './StarInfo';
import PlanetInfo from './PlanetInfo';
import List from './ui/List';
import romanNumerals from '../romanNumerals';

// /// compute size of area needed to contain all orbits
// function getSizes(starSystem, scaleFactor) {
//   const sizeAU = 2 * _.max(starSystem.planets.map((p) => p.distance));
//   const sizePx = sizeAU * scaleFactor + 3 * scaleFactor;
//   return { sizeAU, sizePx };
// }

export default function System({kss, seed}) {
  const [state, setState] = useState({
    activePlanet: null,
    activeStar: null,
    activePlanetIndex: null,
    activeStarIndex: null,
  });

  const { starSystem } = kss;
  const seedStr = "" + kss.seed;
  const a = seedStr.substring(0, Math.floor(seedStr.length / 2));
  const b = seedStr.substring(Math.floor(seedStr.length / 2));
  const scaleFactor = 200;

  const {activeStar, activePlanet, activePlanetIndex, activeStarIndex} = state;

  const items = []
    .concat(starSystem.stars.map((s, i) => `Star ${(i + 1)}: ${s.starType}`))
    .concat(starSystem.planets.map((p, i) => `${kss.name} ${romanNumerals[i]}`));
  let selectedItemIndex = null;
  const planetIndexStart = starSystem.stars.length;
  if (activeStarIndex !== null) selectedItemIndex = activeStarIndex;
  if (activePlanetIndex !== null) selectedItemIndex = planetIndexStart + activePlanetIndex;

  function onHoverPlanet(p, i) {
    setState({activePlanet: p, activeStar: null, activePlanetIndex: i, activeStarIndex: null});
  }

  function onHoverStar(s, i) {
    setState({activePlanet: null, activeStar: s, activePlanetIndex: null, activeStarIndex: i});
  }

  function resetSelection() {
    setState({activePlanet: null, activeStar: null, activePlanetIndex: null, activeStarIndex: null});
  }

  function onSelect(i) {
    if (i < planetIndexStart) {
      onHoverStar(starSystem.stars[i], i);
    } else {
      onHoverPlanet(starSystem.planets[i - planetIndexStart], i - planetIndexStart);
    }
  }

  return (
    <div className="System">
      <div className="SidebarUI">
        <div className="SidebarUI__Sidebar">
          <List
            items={items}
            selectedItemIndex={selectedItemIndex}
            onSelect={onSelect} />

          {activeStar && <div className="StarInfoWrapper">
            <StarInfo
              starName={kss.name}
              starSystem={starSystem}
              star={activeStar}
              i={activeStarIndex} />
          </div>}

          {activePlanet && (
            <div className="PlaneInfoWrapper">
              <PlanetInfo
                starName={kss.name}
                starSystem={starSystem}
                planet={activePlanet}
                i={activePlanetIndex} />
            </div>
          )}
        </div>

        <PanZoomer initialZoom={1} style={{backgroundColor: 'black'}}>
          <StarSystem
            starSystem={starSystem}
            scaleFactor={scaleFactor}
            activePlanetIndex={activePlanetIndex}
            onHoverStar={onHoverStar}
            onHoverPlanet={onHoverPlanet} />
        </PanZoomer>
      </div>
    </div>
  );
}