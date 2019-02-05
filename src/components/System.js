import React from 'react';
import _ from 'lodash';
import PanZoomer from './PanZoomer';
import StarSystem from './StarSystem';

function getSizes(starSystem, scaleFactor) {
  const sizeAU = 2 * _.max(starSystem.planets.map((p) => p.distance));
  const sizePx = sizeAU * scaleFactor + 3 * scaleFactor;
  return { sizeAU, sizePx };
}

const ZOOMS = [0.1, 0.25, 0.5, 1, 1.5, 2];
export default class System extends React.Component {
  constructor(props) {
    super(props);
    this.state = {zoomIndex: ZOOMS.length - 3};
  }

  onHoverPlanet(p) {
    console.log(p);
  }

  onHoverStar(s) {
    console.log(s);
  }

  // props: { kss }
  render() {
    const { starSystem } = this.props.kss;
    const seedStr = "" + this.props.kss.seed;
    const a = seedStr.substring(0, Math.floor(seedStr.length / 2));
    const b = seedStr.substring(Math.floor(seedStr.length / 2));
    const scaleFactor = 800;

    return (
      <div className="System">
        <p>
          Auto name: {this.props.kss.name}
          <br />
          Galactic coordinates: {a},{b}
        </p>

        <PanZoomer initialZoom={ZOOMS[this.state.zoomIndex]}>
          <StarSystem
            starSystem={starSystem}
            scaleFactor={scaleFactor}
            onHoverStar={this.onHoverStar.bind(this)}
            onHoverPlanet={this.onHoverPlanet.bind(this)} />
        </PanZoomer>
      </div>
    );
  }
}