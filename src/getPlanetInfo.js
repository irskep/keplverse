export default function getPlanetInfo(starSystem, planet) {
  const isCold = planet.distance > starSystem.habitableZoneMax;
  const isHot = planet.distance < starSystem.habitableZoneMin;
  const isTidallyLocked = !isCold && starSystem.stars[0].starType == 'M';
  return {isCold, isHot, isTidallyLocked};
}