import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";
import __ from "./normalize.css";
import ___ from "./style.scss";
import Chance from 'chance';
import { StarSystem } from "stellardream";
import Star from './components/Star';
import Planet from './components/Planet';

console.log("ff?", StarSystem);
console.log(new StarSystem(Date.now()));

function isRockyHabitablePlanet(starSystem, planet) {
  if (starSystem.stars[0].starType == 'M') return false; // tidally locked
  if (planet.planetType != 'Terran') return false;
  return planet.distance >= starSystem.habitableZoneMin && planet.distance <= starSystem.habitableZoneMax;
}

function hasRockyHabitablePlanets(starSystem) {
  if (starSystem.stars[0].starType == 'M') return false; // tidally locked
  for (let p of starSystem.planets) {
    if (isRockyHabitablePlanet(starSystem, p)) {
      return true;
    }
  }
  return false;
}

class KStarSystem {
  constructor(seed) {
    this.seed = seed || Date.now();
    this.chance = new Chance(this.seed);
    this.name = this.chance.capitalize(this.chance.word({syllables: 4}));
    this.starSystem = new StarSystem(this.seed);
  }
}

class Meta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kss: new KStarSystem(Date.now()),
    };
  }

  render() {
    const { starSystem } = this.state.kss;
    return (
      <div className="Meta">
        <h1>{this.state.kss.name}</h1>
        {starSystem.stars.map((s, i) => <Star key={i} star={s} />)}

        {starSystem.planets.map((p, i) => (
          <Planet key={i} i={i} starSystem={this.state.kss.starSystem} planet={p} />))}
        
        {starSystem.planets.length == 0 && <div className="EmptyState">This star system has no planets.</div>}
      </div>
    );
  }
}

ReactDOM.render(<Meta />, document.getElementById('root'))