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

  zoomIn() {
    this.setState({
      zoomIndex: Math.min(ZOOMS.length - 1, this.state.zoomIndex + 1),
    });
  }

  zoomOut() {
    this.setState({
      zoomIndex: Math.max(0, this.state.zoomIndex - 1),
    });
  }

  // props: { kss }
  render() {
    const { starSystem } = this.props.kss;
    const seedStr = "" + this.props.kss.seed;
    const a = seedStr.substring(0, Math.floor(seedStr.length / 2));
    const b = seedStr.substring(Math.floor(seedStr.length / 2));
    const scaleFactor = 1000;

    return (
      <div className="System">
        <h2>{this.props.kss.name}</h2>
        <p>Galactic coordinates: {a},{b}</p>

        <div className="ZoomControls">
          <span className="ZoomControls__ZoomIn m-clickable" onClick={this.zoomIn.bind(this)}>Zoom in</span>
          {" "}
          <span className="ZoomControls__ZoomIn m-clickable" onClick={this.zoomOut.bind(this)}>Zoom out</span>
        </div>
        <PanZoomer initialZoom={ZOOMS[this.state.zoomIndex]}>
          <StarSystem starSystem={starSystem} scaleFactor={scaleFactor} />
        </PanZoomer>
      </div>
    );
  }
}