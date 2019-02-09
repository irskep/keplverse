import Chance from 'chance';
import Alea from 'alea';
import { StarSystem } from "stellardream";

export default class KStarSystem {
  constructor(seed) {
    this.seed = seed || Date.now();
    this.chance = new Chance(this.seed);
    this.name = this.chance.capitalize(this.chance.word({syllables: 4}));
    this.starSystem = new StarSystem(this.seed);
    this.alea = new Alea(this.seed);
  }
}