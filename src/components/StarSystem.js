import React from 'react';
import Alea from 'alea';
import _ from 'lodash';
import pct from '../pct';
import Star from './Star';
import PlanetSphere from './PlanetSphere';

export default class StarSystem extends React.Component {
  // props: { starSystem scaleFactor, onHoverPlanet, onHoverStar }

  render() {
    const { starSystem, scaleFactor, activePlanetIndex } = this.props;

    const alea = new Alea(starSystem.seed);

    const hzMin = starSystem.habitableZoneMin;
    const hzMax = starSystem.habitableZoneMax;
    const hzWPx = hzMax * scaleFactor * 2;
    const hzRPx = hzWPx / 2;

    return (
      <div
          className="StarSystem"
          style={{
            // width: sizePx + 'px',
            // height: sizePx + 'px',
            // border: '1px solid white',
            }}>

        <div
          className="StarSystem__HabitableZone"
          style={{
            width: hzWPx + 'px',
            height: hzWPx + 'px',
            borderRadius: hzRPx + 'px',
            position: 'absolute',
            top: `-${hzRPx}px`,
            left: `-${hzRPx}px`,
            background: `
              radial-gradient(
                ellipse at center,
                rgba(0,0,0,0) 0%,
                rgba(0,0,0,0) ${pct(hzMin / hzMax)},
                rgba(0, 255, 0, 10%) ${pct(hzMin / hzMax + 0.00001)},
                rgba(0, 255, 0, 10%) 100%)
              `.replace(/\n/g, ''),
          }}>
        </div>

        {starSystem.planets.map((p, i) => {
          const wPx = (p.distance * scaleFactor * 2) + 'px';
          const rPx = (p.distance * scaleFactor ) + 'px';
          return (<div className={`orbit ${activePlanetIndex === i ? 'm-active' : ''}`}
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
            dataStarIndex={i}
            star={s}
            minSize={3}
            offset={i}
            onClick={this.props.onHoverStar.bind(this, s, i)}
            style={{position: 'absolute', top: 0, left: 0}}
            />))}

        {starSystem.planets.map((p, i) => {
          const angle = Math.PI * alea();
          return (<PlanetSphere
            key={i}
            dataPlanetIndex={i}
            planet={p}
            onClick={this.props.onHoverPlanet.bind(this, p, i)}
            alea={alea}
            style={{
              position: 'absolute',
              left: (Math.cos(angle) * p.distance * scaleFactor) + 'px',
              top: (Math.sin(angle) * p.distance * scaleFactor) + 'px',
            }} />);
        })}

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