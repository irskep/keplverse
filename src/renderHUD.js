/*
const INITIAL_STATE = {
  resources: {
    numProbes: 10,
    seedStore: 10000,
    foodSupply: 10000,
    metal: 10000,
    robots: 1000,
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
  geneticDiversity: 100,
  humans: {
    // [sperm-producing, womb-having, neither]
    biologists: [50, 50, 0],
    geologists: [50, 50, 0],
    mechanics: [500, 500, 0],
    normals: [5000, 5000, 0],
    military: [5000, 5000, 0],
    technologists: [500, 500, 0],
    children: [4000, 4000, 0],
  },
};
*/

function renderResources(data) {
  return Object.keys(data)
    .sort()
    .map((k) => {
      return `
        <div class="hud-item m-resource">
          <span class="hud-item-key">${k}</span>
          <span class="hud-item-value">${data[k]}</span>
        </div>
      `;
    })
    .join('');
}

function renderSensors(data) {
  return Object.keys(data)
    .sort()
    .map((k) => {
      return `
        <div class="hud-item m-sensors">
          <span class="hud-item-key">${k}</span>
          <span class="hud-item-value">${data[k]}</span>
        </div>
      `;
    })
    .join('');
}

function renderHumans(data, geneticDiversity) {
  return Object.keys(data)
    .sort()
    .map((k) => {
      return `
        <div class="hud-item m-humans">
          <span class="hud-item-key">${k}</span>
          <span class="hud-item-value">${data[k]}</span>
        </div>
      `;
    })
    .join('');
}

export default function renderHUD(data) {
  return `
  <div class="hud">
    <div class="hud-category m-resources">
      ${renderResources(data.resources)}
    </div>
    <div class="hud-category m-sensors">
      ${renderSensors(data.sensors)}
    </div>
    <div class="hud-category m-humans">
      ${renderHumans(data.humans)}
    </div>
  </div>
  `.replace(/\n/g, "").replace(/\s\s+/g, "").trim();
}