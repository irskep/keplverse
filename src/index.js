import _ from "lodash";
import __ from "./normalize.css";
import ___ from "./style.scss";
import { StarSystem } from "./stellardream";
import {jumbogrove} from "jumbogrove"; 
import top from "./game/_top.yaml";
import renderHUD from "./renderHUD";

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
    numProbes: 40,
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
  // putting it at half that (11,000 adults, 8,000 children)
  genderBalance: 0.5,
  humans: {
    // [sperm-producing, womb-having, neither]
    biologists: 100,
    geologists: 100,
    mechanics: 1000,
    normals: 10000,
    military: 10000,
    technologists: 1000,
    children: 8000,
  },
};

let total = 0;
for (let k of Object.keys(INITIAL_STATE.humans)) {
  total += INITIAL_STATE.humans[k];
}
console.log("Total humans:", total);

jumbogrove('#main > .JumboGrove', {
  id: 'von-neumann-probe',
  showAside: false,
  globalState: INITIAL_STATE,
  init: function(model, ui) {
    ui.nunjucks.addFilter('yesNo', function(val) {
      if (val) { return "yes"; } else { return "no"; }
    });
    ui.templateHelperFunctions.renderHUD = () => renderHUD(model.globalState);
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
      return s;
    })
})