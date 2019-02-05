import React from 'react';
import spheroidGradient from './spheroidGradient';
import PlanetInfo from './PlanetInfo';

const hues = {
  Terran: [60, 270],
  Neptunian: [180, 270],
  Jovian: [10, 60],
};

const saturations = {
  Terran: [0.05, 0.7],
  Neptunian: [0.05, 0.65],
  Jovian: [0.10, 0.4],
};

const brightnesses = {
  Terran: [0.4, 0.9],
  Neptunian: [0.4, 0.9],
  Jovian: [0.4, 0.9],
};

const sizes = {
  Terran: 30,
  Neptunian: 40,
  Jovian: 80,
};

export default class PlanetSphere extends React.Component {
  // props: { planet, style }
  render() {
    const {planet} = this.props;
    const wPx = sizes[planet.planetType] + 'px';
    const rPx = (sizes[planet.planetType] / 2) + 'px';

    return (
      <div
        className={`planet-circle m-${planet.planetType.toLowerCase()}`}
        style={Object.assign({
          background: spheroidGradient(
            this.props.alea,
            hues[planet.planetType],
            saturations[planet.planetType],
            brightnesses[planet.planetType],
            0.5),
          width: wPx,
          height: wPx,
          borderRadius: rPx,
          transform: `translate(-${rPx}, -${rPx})`,
        }, this.props.style)}/>
    );
  }
}