import { 
// StarTypeProbabilities,
StarType, 
// HabitableZonePlanetLikelihoods,
computeHabitableZone, } from "./stars";
import { StarSystem } from "./starSystem";
/// Tweak probability values to make planets more habitable and life-infested
// function cheatStars() {
//     StarTypeProbabilities.set(StarType.K, StarTypeProbabilities.get(StarType.K)! + 0.5);
//     StarTypeProbabilities.set(StarType.G, StarTypeProbabilities.get(StarType.G)! + 0.5);
//     StarTypeProbabilities.set(StarType.F, StarTypeProbabilities.get(StarType.F)! + 0.5);
//     // Cheat so about half of G-type stars have a planet in their habitable zones
//     for (let k of Object.keys(StarType)) {
//         const t = StarType[k as keyof typeof StarType];
//         HabitableZonePlanetLikelihoods.set(t, HabitableZonePlanetLikelihoods.get(t)! * 250);
//     }
// }
// cheatStars();
// main
var main = document.getElementById("js-main");
var seed = Date.now();
if (main) {
    main.innerHTML = '';
    var j = 0;
    for (var i = 0; i < 102; i++) {
        var system = new StarSystem(seed + j);
        j += 1;
        while (system.planets.length < 4) {
            system = new StarSystem(seed + i + j);
            j += 1;
        }
        var systemEl = document.createElement('div');
        systemEl.className = 'system';
        for (var _i = 0, _a = system.stars; _i < _a.length; _i++) {
            var star = _a[_i];
            var starEl = document.createElement('div');
            systemEl.appendChild(starEl);
            starEl.className = 'star';
            starEl.style.backgroundColor = star.color;
            starEl.innerHTML = star.starType == StarType.M ? "" : star.starType;
            starEl.title = JSON.stringify(star, null, 2);
            var minStarSize = 0.08;
            var minPixelSize = 3;
            var w = minPixelSize / minStarSize * star.radius;
            starEl.style.width = w.toString() + 'px';
            starEl.style.height = w.toString() + 'px';
            starEl.style.borderRadius = (w / 2).toString() + 'px';
            // console.table(system.stars[0]);
        }
        var separatorEl = document.createElement('div');
        systemEl.appendChild(separatorEl);
        separatorEl.className = 'planet-separator';
        var planetsEl = document.createElement('div');
        systemEl.appendChild(planetsEl);
        planetsEl.className = 'planets-container';
        var distanceFactor = 50;
        var hzEl = document.createElement('div');
        planetsEl.appendChild(hzEl);
        hzEl.className = 'hz-indicator';
        var _b = computeHabitableZone(system.stars[0].starType, system.stars[0].luminosity), hzMin = _b[0], hzMax = _b[1];
        hzEl.style.left = hzMin * distanceFactor + "px";
        hzEl.style.width = (hzMax - hzMin) * distanceFactor + "px";
        var maxDistance = 1;
        for (var _c = 0, _d = system.planets; _c < _d.length; _c++) {
            var planet = _d[_c];
            var planetEl = document.createElement('div');
            planetsEl.appendChild(planetEl);
            planetEl.className = "planet-" + planet.planetType.toString().toLowerCase();
            planetEl.style.position = 'absolute';
            planetEl.style.left = planet.distance * distanceFactor + "px";
            planetEl.title = JSON.stringify(planet, null, 2);
            maxDistance = Math.max(maxDistance, planet.distance);
            planetsEl.style.backgroundColor = 'lightblue';
        }
        planetsEl.style.width = (maxDistance * distanceFactor) + 100 + "px";
        main.appendChild(systemEl);
    }
}
// Dumb visual check of the metallicity probability distribution
// function testMetallicity() {
//     if (document.body.children[0].tagName == 'CANVAS') {
//         document.body.removeChild(document.body.children[0]);
//     }
//     const buckets: any = {};
//     let maxCount = 0;
//     let min = 0;
//     let max = 0;
//     const mult = 100;
//     for(let i=0; i<100000; i++) {
//         const val = getMetallicityValue(Math.random(), Math.random());
//         const roundedVal = Math.floor(val * mult) / mult;
//         min = Math.min(min, roundedVal);
//         max = Math.max(max, roundedVal);
//         if (!buckets[roundedVal]) buckets[roundedVal] = 0;
//         buckets[roundedVal] += 1;
//         maxCount = Math.max(maxCount, buckets[roundedVal]);
//     }
//     console.log(maxCount);
//     const height = 200;
//     const factor = height / maxCount;
//     const canvasEl = document.createElement('canvas');
//     canvasEl.width = (max - min) * mult;
//     canvasEl.height = height;
//     canvasEl.style.backgroundColor = 'white';
//     const ctx = canvasEl.getContext('2d');
//     if (!ctx) return;
//     ctx.fillStyle = 'black';
//     for(let i=min * mult; i<max * mult; i+=1) {
//         const k = i / mult;
//         const val = buckets[k];
//         switch (k) {
//         case 0:
//             ctx.fillStyle = 'red';
//             break;
//         case 0.3:
//         case -0.45:
//             ctx.fillStyle = 'lightgreen';
//             break;
//         case 1:
//             ctx.fillStyle = 'cyan';
//             break;
//         case -1:
//             ctx.fillStyle = 'yellow';
//             break;
//         default:
//             ctx.fillStyle = 'black';
//             break;
//         }
//         ctx.fillRect(i - (min * mult), height - val * factor, 1, val * factor);
//     }
//     console.log(buckets);
//     document.body.insertBefore(canvasEl, document.body.children[0]);
// }
// testMetallicity();
export { StarSystem };
//# sourceMappingURL=index.js.map