import React from 'react';
import _ from 'lodash';
import PanZoomer from './PanZoomer';
import StarSystem from './StarSystem';
import StarInfo from './StarInfo';
import PlanetInfo from './PlanetInfo';
import romanNumerals from '../romanNumerals';

function getSizes(starSystem, scaleFactor) {
  const sizeAU = 2 * _.max(starSystem.planets.map((p) => p.distance));
  const sizePx = sizeAU * scaleFactor + 3 * scaleFactor;
  return { sizeAU, sizePx };
}

const ZOOMS = [0.1, 0.25, 0.5, 1, 1.5, 2];
export default class System extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomIndex: ZOOMS.length - 3,
      activeStar: null,
      activePlanet: null,
      activePlanetIndex: null,
      activeStarIndex: null,
    };
  }

  onHoverPlanet(p, i) {
    this.setState({activePlanet: p, activeStar: null, activePlanetIndex: i, activeStarIndex: null});
  }

  onHoverStar(s, i) {
    this.setState({activePlanet: null, activeStar: s, activePlanetIndex: null, activeStarIndex: i});
  }

  resetSelection() {
    this.setState({activePlanet: null, activeStar: null, activePlanetIndex: null, activeStarIndex: null});
  }

  // props: { kss }
  render() {
    const { starSystem } = this.props.kss;
    const seedStr = "" + this.props.kss.seed;
    const a = seedStr.substring(0, Math.floor(seedStr.length / 2));
    const b = seedStr.substring(Math.floor(seedStr.length / 2));
    const scaleFactor = 800;

    const {activeStar, activePlanet, activePlanetIndex, activeStarIndex} = this.state;

    return (
      <div className="System">
        <p>
          Auto name: {this.props.kss.name}
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
                        onClick={this.onHoverStar.bind(this, s, i)}>
                      Star {(i + 1)}: {s.starType}
                    </li>
                  ))}
                  {starSystem.planets.map((p, i) => (
                    <li className="m-clickable" key={'planet-' + i} onClick={this.onHoverPlanet.bind(this, p, i)}>
                      {this.props.kss.name} {romanNumerals[i]}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeStar && <div className="StarInfoWrapper">
              <div className="BackLink m-clickable" onClick={this.resetSelection.bind(this)}>Back</div>
              {console.log(activeStarIndex)}
              <StarInfo
                starName={this.props.kss.name}
                starSystem={starSystem}
                star={activeStar}
                i={activeStarIndex} />
            </div>}

            {activePlanet && (
              <div className="PlaneInfoWrapper">
                <div className="BackLink m-clickable" onClick={this.resetSelection.bind(this)}>Back</div>
                <PlanetInfo
                  starName={this.props.kss.name}
                  starSystem={starSystem}
                  planet={activePlanet}
                  i={activePlanetIndex} />
              </div>
            )}
          </div>

          <PanZoomer initialZoom={ZOOMS[this.state.zoomIndex]} style={{backgroundColor: 'black'}}>
            <StarSystem
              starSystem={starSystem}
              scaleFactor={scaleFactor}
              activePlanetIndex={activePlanetIndex}
              onHoverStar={this.onHoverStar.bind(this)}
              onHoverPlanet={this.onHoverPlanet.bind(this)} />
          </PanZoomer>
        </div>
      </div>
    );
  }
}