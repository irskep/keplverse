import fmt from "./fmt";

function camelConvert(s, replacement) {
  return s.replace(/([A-Z])/g, function($1){return replacement+$1.toLowerCase();});
}

function renderResources(data) {
  return Object.keys(data)
    .sort()
    .map((k) => {
      return `
        <div class="hud-item m-resource">
          <span class="hud-item-key">${camelConvert(k, " ")}</span>
          <span class="hud-item-value">${fmt[k](data[k])}</span>
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
          <span class="hud-item-key">${camelConvert(k, " ")}</span>
          <span class="hud-item-value">${fmt[k](data[k])}</span>
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
          <span class="hud-item-key">${camelConvert(k, " ")}</span>
          <span class="hud-item-value">${fmt[k](data[k])}</span>
        </div>
      `;
    })
    .join('');
}

export default function renderHUD(data) {
  return `
  <div class="hud">
    <div class="hud-category m-resources">
      <h3 class="hud-category-title">Resources</h3>
      ${renderResources(data.resources)}
    </div>
    <div class="hud-category m-sensors">
      <h3 class="hud-category-title">Sensors</h3>
      ${renderSensors(data.sensors)}
    </div>
    <div class="hud-category m-humans">
      <h3 class="hud-category-title">Humans</h3>
      ${renderHumans(data.humans)}
    </div>
  </div>
  `.replace(/\n/g, "").replace(/\s\s+/g, "").trim();
}