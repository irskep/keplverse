import React from 'react';
import _ from 'lodash';
import Star from './Star';
import PlanetSphere from './PlanetSphere';
import PlanetInfo from './PlanetInfo';

class StarSystem extends React.Component {
  render() {
    const { starSystem, alea } = this.props;

    const scaleFactor = 1000;
    const sizeAU = 2 * _.max(starSystem.planets.map((p) => p.distance));
    const sizePx = sizeAU * scaleFactor + 3 * scaleFactor;

    return (
      <div
          className="StarSystem"
          style={{
            width: sizePx + 'px',
            height: sizePx + 'px',
            border: '1px solid white',
            }}>

        <div style={{
          transform: `translate(${sizePx/2}px, ${sizePx/2}px)`,
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

export default class System extends React.Component {
  // props: { kss }
  render() {
    const { starSystem } = this.props.kss;
    const seedStr = "" + this.props.kss.seed;
    const a = seedStr.substring(0, Math.floor(seedStr.length / 2));
    const b = seedStr.substring(Math.floor(seedStr.length / 2));
    return (
      <div className="System">
        <h1>{this.props.kss.name}</h1>
        <p>Galactic coordinates: {a},{b}</p>

        <StarSystem starSystem={starSystem} alea={this.props.kss.alea} />
      </div>
    );
  }
}