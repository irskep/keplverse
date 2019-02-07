import React, { useState } from 'react';
import _ from 'lodash';
import PanZoomer from './PanZoomer';
import StarSystem from './StarSystem';
import StarInfo from './StarInfo';
import PlanetInfo from './PlanetInfo';
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

  function onHoverPlanet(p, i) {
    setState({activePlanet: p, activeStar: null, activePlanetIndex: i, activeStarIndex: null});
  }

  function onHoverStar(s, i) {
    setState({activePlanet: null, activeStar: s, activePlanetIndex: null, activeStarIndex: i});
  }

  function resetSelection() {
    setState({activePlanet: null, activeStar: null, activePlanetIndex: null, activeStarIndex: null});
  }

  const { starSystem } = kss;
  const seedStr = "" + kss.seed;
  const a = seedStr.substring(0, Math.floor(seedStr.length / 2));
  const b = seedStr.substring(Math.floor(seedStr.length / 2));
  const scaleFactor = 200;

  const {activeStar, activePlanet, activePlanetIndex, activeStarIndex} = state;

  return (
    <div className="System">
      <p>
        Auto name: {kss.name}
        <br />
        Galactic coordinates: {a},{b}
      </p>

      <div className="SidebarUI">
        <div className="SidebarUI__Sidebar">
          {!activeStar && !activePlanet && (
            <div className="EmptyState">
              <ul className="BodyList">
                {starSystem.stars.map((s, i) => (
                  <li className="m-clickable" key={'star-' + i}
                      onClick={onHoverStar.bind(this, s, i)}>
                    Star {(i + 1)}: {s.starType}
                  </li>
                ))}
                {starSystem.planets.map((p, i) => (
                  <li className="m-clickable" key={'planet-' + i} onClick={onHoverPlanet.bind(this, p, i)}>
                    {kss.name} {romanNumerals[i]}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeStar && <div className="StarInfoWrapper">
            <div className="BackLink m-clickable" onClick={resetSelection.bind(this)}>Back</div>
            <StarInfo
              starName={kss.name}
              starSystem={starSystem}
              star={activeStar}
              i={activeStarIndex} />
          </div>}

          {activePlanet && (
            <div className="PlaneInfoWrapper">
              <div className="BackLink m-clickable" onClick={resetSelection.bind(this)}>Back</div>
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