import React from 'react';

function round(n) {
  let mult = n < 0 ? -1 : 1;
  n *= mult;
  let pow = 0;
  while (n < Math.pow(10, 3)) {
    n *= 10;
    pow += 1;
  }

  return mult * Math.round(n) / Math.pow(10, pow);
}

export default function StarInfo({starName, starSystem, star, i}) {
  return (
    <div className="StarInfo">
      <h4 className="planet-label">Star {i + 1}</h4>
      <strong>Type:</strong> {star.starType}<br />
      <strong>Color:</strong> <span style={{backgroundColor: star.color, color: 'black'}}>{star.color}</span><br />
      <strong>Radius:</strong> {round(star.radius)} suns<br />
      <strong>Luminosity:</strong> {round(star.luminosity)} suns<br />
      <strong>Mass:</strong> {round(star.mass)} suns<br />
      <strong>Metallicity:</strong> {round(star.metallicity)} [Fe/H]<br />
    </div>
  );
}