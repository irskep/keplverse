import React from 'react';
import ReactPanZoom from "@ajainarayanan/react-pan-zoom";
import Alea from 'alea';
import _ from 'lodash';
import Star from './Star';
import PlanetSphere from './PlanetSphere';
import PlanetInfo from './PlanetInfo';

function getSizes(starSystem, scaleFactor) {
  const sizeAU = 2 * _.max(starSystem.planets.map((p) => p.distance));
  const sizePx = sizeAU * scaleFactor + 3 * scaleFactor;
  return { sizeAU, sizePx };
}

class StarSystem extends React.Component {
  render() {
    const { starSystem, seed, scaleFactor } = this.props;

    // const { sizePx } = getSizes(starSystem, scaleFactor);

    const alea = new Alea(starSystem.seed);

    return (
      <div
          className="StarSystem"
          style={{
            // width: sizePx + 'px',
            // height: sizePx + 'px',
            // border: '1px solid white',
            }}>

        <div style={{
          // transform: `translate(${sizePx/2}px, ${sizePx/2}px)`,
        }}>

          {starSystem.planets.map((p, i) => {
            const wPx = (p.distance * scaleFactor * 2) + 'px';
            const rPx = (p.distance * scaleFactor ) + 'px';
            return (<div className="orbit"
              key={i}
              style={{
                width: wPx,
                height: wPx,
                borderRadius: rPx,
                position: 'absolute',
                top: `-${rPx}`,
                left: `-${rPx}`,
              }} />);
            })}

          {starSystem.stars.map((s, i) => (
            <Star
              key={i}
              star={s}
              minSize={10}
              style={{position: 'absolute', top: 0, left: 0}}
              />))}

          {starSystem.planets.map((p, i) => (
            <PlanetSphere
              key={i}
              planet={p}
              alea={alea}
              style={{
                position: 'absolute',
                top: 0,
                left: (p.distance * scaleFactor) + 'px',
              }}
              />))}

          {/* {starSystem.planets.map((p, i) => (
            <PlanetInfo
              key={i}
              i={i}
              starSystem={this.props.starSystem}
              planet={p} />))} */}

        </div>
      </div>
    );
  }
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
        <ReactPanZoom
          className="StarSystemContainer"
          pandx={768 / 2}
          pandy={768 / 2}
          zoom={ZOOMS[this.state.zoomIndex]}>
          <StarSystem starSystem={starSystem} scaleFactor={scaleFactor} />
        </ReactPanZoom>
      </div>
    );
  }
}