import React from 'react';

const numbers = [
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'X',
  'XI',
  'XII',
  'XIII',
  'XIV',
  'XV',
  'XVI',
  'XVII',
  'XVIII',
  'XIX',
  'XX',
];
export { numbers };

const TYPE_DESCRIPTIONS = {
  Terran: `
  These worlds resemble Mercury, Venus, Earth, and Mars, in that they have
  survivable gravity and the potential for oceans, ices, and atmospheres.
  `,
  Neptunian: `
  Akin to Saturn, Uranus and Neptune, Neptunian planets are dominated by a large
  atmosphere of hydrogen, helium, and other atoms/molecules that are easily
  boiled off. They may have rocky interiors, but their atmospheric pressure is
  too high to be habitable by humans.
  `,
  Jovian: `
  Jovians are gas giants, like Jupiter. They have enormous atmospheres of
  hydrogen and helium, but rather than having a rocky core, they are so massive
  that they begin to compress on the inside. The "surface," if one exists, is
  deadly.
  `,
};

const tidalLockingDesc = `
  However, though it is the correct temperature, it is so close to its star that
  it is tidally locked; it doesn't rotate, so one side is blasted with heat and
  the other is always in freezing darkness.`;

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

export default class Planet extends React.Component {
  // props: { starSystem, planet, i }
  render() {
    const {starSystem, planet, i} = this.props;
    const isCold = planet.distance > starSystem.habitableZoneMax;
    const isHot = planet.distance < starSystem.habitableZoneMin;
    const isTidallyLocked = !isCold && starSystem.stars[0].starType == 'M';

    let habDesc = "";
    let habClass = ""
    if (planet.planetType == 'Terran') {
      if (isCold) {
        habDesc = "This planet is too far from the sun to have an atmosphere.";
        habClass = "m-cold";
      } else if (isHot) {
        habDesc = "This planet is too close to the sun. If it ever had an atmosphere, it has burned off.";
        habClass = "m-hot";
      } else {
        habDesc = "This planet is in the habitable zone and could plausibly have an atmosphere.";
        habClass = "m-habitable";
      }
    }

    return (
      <div
          className={`planet m-${planet.planetType.toLowerCase()} ${habClass}`}
          title={`${JSON.stringify(planet, null, 2)}`}>
        <h4 className="planet-label">{numbers[i]}: {planet.planetType}</h4>
        <p className="planet-desc">Distance: {planet.distance.toFixed(2)} AU</p>
        <p className="planet-desc">{TYPE_DESCRIPTIONS[planet.planetType]}</p>
        {habDesc && <p className="planet-desc">{habDesc} {isTidallyLocked ? tidalLockingDesc : ''}</p>}
      </div>
    );
  }
}