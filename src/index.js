import _ from "lodash";
import __ from "./normalize.css";
import ___ from "./style.scss";
import {jumbogrove} from "jumbogrove"; 
console.log(jumbogrove);

import top from './game/_top.yaml';

/*
High level goals of the player:
- Defeat a rival AMI in combat
- Build another AMI and choose who to continue as
- Ferry humans to a new home
- Discover an alien species
- Build an android body
*/

const SITUATIONS = top;

const FORMATTERS = {
  starType: (val) => {
    if (val < 0.5) return 'White Dwarf';
    if (val <= 1.0) return 'Pretty Yellow Sun';
  }
}

const INITIAL_STATE = {
  hullIntegrity: 100,
};

function renderDebugString(obj, objName, keys, indent) {
  const result = [objName, '('];
  indent = (indent ? indent : '') + '  ';
  let hasList = false;
  keys = ['debugKey'].concat(keys);

  for (const k of keys) {
    const val = obj[k];
    if (_.isArray(val)) {
      hasList = true;
      result.push('\n' + indent);
      break;
    }
  }

  for (const k of keys) {
    result.push(k)
    result.push('=')
    const val = obj[k];
    if (_.isArray(val)) {
      result.push('\n');
      result.push(renderArray(val, indent + '  '));
    } else if (val.hasOwnProperty('debugString')) {
      result.push(val.debugString())
    } else if (FORMATTERS[k]) {
      result.push(FORMATTERS[k](val));
    } else {
      result.push(val);
    }

    result.push(hasList ? '\n' + indent : ', ')
  }
  result.pop();
  result.push(')');
  return result.join('');
}

function renderArray(arr, indent) {
  const result = [];
  for (const item of arr) {
    result.push(indent + '- ');
    result.push(item.debugString(indent + '  '));
    result.push('\n');
  }
  result.pop();
  return result.join('');
}

class AsteroidBelt {
  constructor(systemKey, index) {
    self.debugKey = `AsteroidBelt/${index}`;
    self.key = `${systemKey}/AsteroidBelt/${index}`;
  }

  debugString() {
    return `AsteroidBelt`;
  }
}

class Moon {
  constructor(planetKey, index) {
    self.debugKey = `Moon/${index}`;
    self.key = `${planetKey}/Moon/${index}`
    self.planetaryBodySize = Math.random();
    self.waterAbundance = Math.random();
    self.resourceAbundance = Math.random();
    self.atmosphere = Math.random();
  }

  debugString(indent) {
    return renderDebugString(
      self, 'Moon', [
        'planetaryBodySize',
        'waterAbundance',
        'resourceAbundance',
        'atmosphere',
      ], indent);
  }
}

class Planet {
  constructor(systemKey, index) {
    self.debugKey = `Planet/${index}`;
    self.key = `${systemKey}/Planet/${index}`

    self.moons = [];
    while (Math.random() > 0.5) {
      self.moons.push(new Moon(self.key, self.moons.length));
    }
    self.planetaryBodySize = Math.random();
    self.waterAbundance = Math.random();
    self.resourceAbundance = Math.random();
    self.atmosphere = Math.random();
  }

  debugString(indent) {
    return renderDebugString(
      self, 'Planet', [
        'planetaryBodySize',
        'waterAbundance',
        'resourceAbundance',
        'atmosphere',
        'moons',
      ], indent);
  }
}

class System {
  constructor() {
    self.key = "System";
    self.debugKey = "System";
    self.starType = Math.random();
    self.orbitalObjects = [];
    while (Math.random() > 0.3) {
      const kind = Math.random();
      if (kind < 0.1) {
        self.orbitalObjects.push(new AsteroidBelt(self.key, self.orbitalObjects.length));
      } else {
        self.orbitalObjects.push(new Planet(self.key, self.orbitalObjects.length));
      }
    }
  }

  debugString() {
    return renderDebugString(
      self, 'System', [
        'starType',
        'orbitalObjects',
      ]);
  }
}

console.log(new System().debugString());

jumbogrove('#main > .JumboGrove', {
  id: 'von-neumann-probe',
  showAside: false,
  globalState: INITIAL_STATE,
  willEnter: (model, ui, situation, nextID) => {
    if (nextID == 'start') {
      model.globalState = INITIAL_STATE;
    }
    return true;
  },
  situations: SITUATIONS.map((s) => {
    s.clear = true;
    return s;
  })
})