import _ from "lodash";
import __ from "./normalize.css";
import ___ from "./style.scss";
import Chance from 'chance';
import { StarSystem } from "./stellardream";
import {jumbogrove} from "jumbogrove"; 
import indefiniteArticle from "./indefinite-article";
import top from "./game/_top.yaml";
import renderHUD from "./renderHUD";
import renderStar from "./renderStar";
import renderPlanet from "./renderPlanet";
import {numbers} from "./renderPlanet";
import fmt from "./fmt";
import { rule } from "postcss";

/*
You are the AI on a generation ship.
The humans all live in a VR paradise that you control (no social breakdowns, etc)
Different star systems have resources that you can collect
*/

/*
Encounter ideas:
- Disease (Fungal infections of pods)
  - Sterilization
  - Male- or female-only illness
  - Child-only illness
  - Adult-only illness
- Space bug parasites
- Food-supply-eating bugs/fungi
- Fires
- Computer glitches
  - Lose the ability to train people in certain skills
*/

console.log(new StarSystem(Date.now()));

const SITUATIONS = top;

const INITIAL_STATE = {
  resources: {
    probes: 40,
    seedStore: 10000,
    foodSupply: 10000,
    metal: 10000,
    robots: 1000,
    geneticDiversity: 100,
  },
  sensors: {
    gravity: 100,
    temperature: 100,
    water: 100,
    resources: 100,
    atmosphere: 100,
  },
  // Estimation of a genetically viable population for multigenerational
  // interstellar voyaging: Review and data for project Hyperion
  // https://www.sciencedirect.com/science/article/pii/S0094576513004669
  // (answer: 23,000 adults, 17,000 children)
  // But this is a videogame about sacrifices, so let's add some risk by
  // putting it at half that. Muahaha
  humans: {
    total: 20000,
    fractionChild: 40,
    fractionMale: 45,
    fractionFemale: 45,
    maleFertility: 95,
    femaleFertility: 95,
    educationQuality: 100,
  },
};

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

const surveySituations = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map((i) => {
  return {
    id: `survey-${i}`,
    tags: ['from_star_system'],
    choices: ['#star_system'],
    getCanSee: (model, hostSituation) => {
      if (model.globalState.starSystem.planets.length <= i) return false;
      return isRockyHabitablePlanet(model.globalState.starSystem, model.globalState.starSystem.planets[i]);
    },
    optionText: (model, hostSituation) => {
      return `Survey ${model.globalState.starSystemName} ${numbers[i]}`
    },
    content: `
      You find nothing.
    `,
  };
});

jumbogrove('#main > .JumboGrove', {
  id: 'von-neumann-probe',
  showAside: false,
  globalState: INITIAL_STATE,
  init: function(model, ui) {
    ui.nunjucks.addFilter('yesNo', function(val) {
      if (val) { return "yes"; } else { return "no"; }
    });
    ui.templateHelperFunctions.renderHUD = () => renderHUD(model.globalState);
    ui.templateHelperFunctions.renderStar = renderStar;
    ui.templateHelperFunctions.renderPlanet = renderPlanet;
    ui.templateHelperFunctions.aAn = (phrase) => {
      return indefiniteArticle(phrase) + " " + phrase;
    };
    ui.templateHelperFunctions.val = (keyPath) => {
      const parts = keyPath.split(".");
      const last = parts[parts.length - 1];
      return fmt[last](_.get(model.globalState, keyPath));
    };
  },
  willEnter: (model, ui, situation, nextID) => {
    if (nextID == 'start') {
      model.globalState = INITIAL_STATE;
    }
    return true;
  },
  situations: SITUATIONS
    .filter((s) => s)
    .map((s) => {
      s.clear = true;
      s.willEnter = (model, ui, fromSituation) => {
        if (model.globalState.starSystem && !s.newStarSystem) return true;
        let seed = Date.now();
        model.globalState.starSystem = new StarSystem(seed);

        while (!hasRockyHabitablePlanets(model.globalState.starSystem)) {
          seed += 1;
          model.globalState.starSystem = new StarSystem(seed);
        }

        model.globalState.starSystemSeed = model.globalState.starSystem.seed; 
        model.globalState.starSystemChance = new Chance(model.globalState.starSystem.seed);
        model.globalState.starSystemName = model.globalState.starSystemChance.capitalize(
          model.globalState.starSystemChance.word({syllables: 4}));
        return true;
      }
      return s;
    })
    .concat(surveySituations),
});