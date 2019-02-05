import React from 'react';
import Alea from 'alea';
import _ from 'lodash';
import Star from './Star';
import PlanetSphere from './PlanetSphere';

export default class StarSystem extends React.Component {
  render() {
    const { starSystem, seed, scaleFactor } = this.props;

    const alea = new Alea(starSystem.seed);

    return (
      <div
          className="StarSystem"
          style={{
            // width: sizePx + 'px',
            // height: sizePx + 'px',
            // border: '1px solid white',
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
    );
  }
}