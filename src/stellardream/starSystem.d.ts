import { Star } from "./stars";
import { Planet } from "./planets";
export declare function addPlanets(starSystem: StarSystem, getRandom: () => number): void;
export declare class StarSystem {
    seed: number;
    stars: Array<Star>;
    planets: Array<Planet>;
    constructor(seed: number);
    readonly metallicity: number;
}
