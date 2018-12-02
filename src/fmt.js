function pct(n) {
  return n + '%';
}

function identity(x) { return x; }

export default {
  probes: identity,
  seedStore: identity,
  foodSupply: identity,
  metal: identity,
  robots: identity,
  geneticDiversity: pct,
  gravity: pct,
  temperature: pct,
  water: pct,
  resources: pct,
  atmosphere: pct,
  total: identity,
  fractionChild: pct,
  fractionMale: pct,
  fractionFemale: pct,
  maleFertility: pct,
  femaleFertility: pct,
  educationQuality: pct,
}
