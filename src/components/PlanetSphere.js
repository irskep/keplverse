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
  Terran: 5,
  Neptunian: 20,
  Jovian: 40,
};

export default function PlanetSphere({planet, style, onClick, alea}) {
  const size = sizes[planet.planetType]
  const wPx = size + 'px';
  const rPx = (size / 2) + 'px';

  return (
    <div
      className={`planet-circle m-${planet.planetType.toLowerCase()}`}
      onClick={onClick}
      style={Object.assign({
        background: spheroidGradient(
          alea,
          hues[planet.planetType],
          saturations[planet.planetType],
          brightnesses[planet.planetType],
          0.5),
        width: wPx,
        height: wPx,
        borderRadius: rPx,
        transform: `translate(-${rPx}, -${rPx})`,
      }, style)}/>
  );
}