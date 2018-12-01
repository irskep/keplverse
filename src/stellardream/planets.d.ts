import { Star } from "./stars";
export declare enum KeplerGrouping {
    HotJupiter = "HotJupiter",
    ColdGasGiant = "ColdGasGiant",
    IceGiant = "IceGiant",
    OceanWorld = "OceanWorld",
    LavaWorld = "LavaWorld",
    Rocky = "Rocky"
}
export declare enum PlanetType {
    Terran = "Terran",
    Neptunian = "Neptunian",
    Jovian = "Jovian",
    Placeholder = "Placeholder"
}
export declare const PlanetTypeMassMin: Map<PlanetType, number>;
export declare const PlanetTypeMassMax: Map<PlanetType, number>;
export declare const PlanetTypeRadiusExponent: Map<PlanetType, number>;
export declare class Planet {
    distance: number;
    star: Star;
    planetType: PlanetType;
    constructor(planetType: PlanetType, star: Star, distance: number);
}
