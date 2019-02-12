import starnames from './starnames';
import Alea from 'alea';
import { StarSystem } from "stellardream";

function patchingMathDotRandom(fn, code) {
  const oldMR = Math.random;
  Math.random = fn;
  code();
  Math.random = oldMR;  
}

export default class KStarSystem {
  constructor(seed) {
    this.seed = seed || Date.now();
    this.starSystem = new StarSystem(this.seed);
    this.alea = new Alea(this.seed);

    patchingMathDotRandom(this.alea, () => {
      this.name = starnames.flatten('#starname#');
    });
  }
}