import React, { useState } from 'react';
import PanZoomer from './PanZoomer';
import StarSystem from './StarSystem';
import StarInfo from './StarInfo';
import PlanetInfo from './PlanetInfo';
import List from './ui/List';
import romanNumerals from '../romanNumerals';
import getPlanetInfo from '../getPlanetInfo';

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

  function getStarText(s, i) {
    return `Star ${(i + 1)}: ${s.starType}`;
  }

  function getPlanetText(p, i) {
    const prefix = `${kss.name} ${romanNumerals[i]}`;
    const suffixes = [p.planetType[0]];
    const {isHot, isCold, isTidallyLocked} = getPlanetInfo(starSystem, p);
    if (!isHot && !isCold) suffixes.push("Hab");
    if (isTidallyLocked) suffixes.push("TL");
    return `${prefix} (${suffixes.join(', ')})`;
  }

  const items = []
    .concat(starSystem.stars.map(getStarText))
    .concat(starSystem.planets.map(getPlanetText));
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