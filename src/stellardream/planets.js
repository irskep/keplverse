export var KeplerGrouping;
(function (KeplerGrouping) {
    KeplerGrouping["HotJupiter"] = "HotJupiter";
    KeplerGrouping["ColdGasGiant"] = "ColdGasGiant";
    KeplerGrouping["IceGiant"] = "IceGiant";
    KeplerGrouping["OceanWorld"] = "OceanWorld";
    KeplerGrouping["LavaWorld"] = "LavaWorld";
    KeplerGrouping["Rocky"] = "Rocky";
})(KeplerGrouping || (KeplerGrouping = {}));
// https://medium.com/starts-with-a-bang/sorry-super-earth-fans-there-are-only-three-classes-of-planet-44f3da47eb64
export var PlanetType;
(function (PlanetType) {
    PlanetType["Terran"] = "Terran";
    PlanetType["Neptunian"] = "Neptunian";
    PlanetType["Jovian"] = "Jovian";
    PlanetType["Placeholder"] = "Placeholder";
})(PlanetType || (PlanetType = {}));
// Units: 10^x earth-masses
// https://arxiv.org/pdf/1603.08614v2.pdf%29
/*
    https://www.manyworlds.space/index.php/tag/hydrogen-and-helium-envelope/

    "...it appears that once a planet has a radius more than 1.5 or 1.6
    times the size of Earth, it will most likely have a thick gas envelope of
    hydrogen, helium and sometimes methane and ammonia around it."
*/
export var PlanetTypeMassMin = new Map([
    [PlanetType.Terran, -1.3],
    [PlanetType.Neptunian, 0.22],
    [PlanetType.Jovian, 2],
]);
export var PlanetTypeMassMax = new Map([
    [PlanetType.Terran, 0.22],
    [PlanetType.Neptunian, 2],
    [PlanetType.Jovian, 3.5],
]);
// R = M^exponent
export var PlanetTypeRadiusExponent = new Map([
    [PlanetType.Terran, 0.28],
    [PlanetType.Neptunian, 0.59],
    [PlanetType.Jovian, -0.04],
]);
var Planet = /** @class */ (function () {
    function Planet(planetType, star, distance) {
        this.planetType = planetType;
        this.distance = distance;
        this.star = star;
    }
    return Planet;
}());
export { Planet };
//# sourceMappingURL=planets.js.map