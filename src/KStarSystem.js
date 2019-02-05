import Chance from 'chance';
import { StarSystem } from "stellardream";

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

export default class KStarSystem {
  constructor(seed) {
    this.seed = seed || Date.now();
    this.chance = new Chance(this.seed);
    this.name = this.chance.capitalize(this.chance.word({syllables: 4}));
    this.starSystem = new StarSystem(this.seed);
  }
}