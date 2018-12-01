export declare enum StarType {
    M = "M",
    K = "K",
    G = "G",
    F = "F",
    A = "A",
    B = "B",
    O = "O"
}
export declare const StarTypeProbabilities: Map<StarType, number>;
export declare const StarTemperature: Map<StarType, number>;
export declare const StarLuminosityMin: Map<StarType, number>;
export declare const StarLuminosityMax: Map<StarType, number>;
export declare const StarRadiusMin: Map<StarType, number>;
export declare const StarRadiusMax: Map<StarType, number>;
export declare const StarColors: Map<StarType, string>;
/**
* ~44% of F6-K3 stars with 0.5-1.5 stellar masses are likely binary/multiple star systems,
* making stable orbits extremely unlikely unless the stars are close together.
*
* Inside HZ: "water is broken up by stellar radiation into oxygen and hydrogen...
* the freed hydrogen would escape to space due to the relatively puny
* gravitational pull of small rocky planets like Earth"
*
* Outside HZ: "atmospheric carbon dioxide condenses...which eliminates its
* greenhouse warming effect."
*
* Stars get brighter as they age, so HZ expands outward. CHZ = "continuously habitable zone"
* over time.
*/
export declare const HabitableZonePlanetLikelihoods: Map<StarType, number>;
export declare function computeHabitableZone(t: StarType, luminosity: number): [number, number];
export declare function computeMass(luminosity: number): number;
export declare function getMetallicityValue(aRandomNumber: number, n2: number): number;
export declare class Star {
    starType: StarType;
    luminosity: number;
    mass: number;
    radius: number;
    color: string;
    metallicity: number;
    constructor(getRandom: any);
}
