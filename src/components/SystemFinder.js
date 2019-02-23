import React from 'react';
import { Button, Checkbox, Group, TextInput } from 'ninetyfive';
import { StarSystem } from 'stellardream';

const defer = (fn) => {
  setTimeout(fn, 0);
};

const STAR_TYPES = [
  'M', 'K', 'G', 'F', 'A', 'B', 'O',
];

export default class SystemFinder extends React.Component {
  // props: { baseSeed, onSeedFound }
  constructor(props) {
    super(props);
    this.state = {
      'M': false,
      'K': true,
      'G': true,
      'F': true,
      'A': false,
      'B': false,
      'O': false,
      forceHabitableTerran: true,
      isSearching: false,
      numSearched: 0,
      minPlanetsString: "3",
    };
  }

  flipCheckbox(st) {
    this.setState({[st]: !this.state[st]});
  }

  onChangeMinPlanets(e) {
    const minPlanetsString = e.target.value;
    this.setState({minPlanetsString});
  }

  search() {
    this.setState({isSearching: true, numSearched: 1});
    this.trySeed(this.props.baseSeed + 1);
  }

  trySeed(baseSeed) {
    const batchSize = 7;

    const maybeMinPlanets = parseInt(this.state.minPlanetsString, 10);
    const minPlanets = isNaN(maybeMinPlanets) ? 0 : maybeMinPlanets;

    const success = (seed) => {
      console.log("Searched", this.state.numSearched + (seed - baseSeed));
      this.setState({isSearching: false, numSearched: 0});
      this.props.onSeedFound(seed);
    }

    for (let seed=baseSeed; seed<baseSeed+batchSize; seed++) {
      const starSystem = new StarSystem(seed);

      if (!this.state[starSystem.stars[0].starType]) {
        continue;
      }

      if (starSystem.planets.length < minPlanets) {
        continue;
      }

      if (!this.state.forceHabitableTerran) {
        success(seed);
        return
      }

      for (let planet of starSystem.planets) {
        const isCold = planet.distance > starSystem.habitableZoneMax;
        const isHot = planet.distance < starSystem.habitableZoneMin;
        const isTidallyLocked = !isCold && starSystem.stars[0].starType == 'M';
        const isTerran = planet.planetType == 'Terran';

        if (isTerran && !isCold && !isHot && !isTidallyLocked) {
          success(seed);
          return;
        }
      }
    }

    this.setState({numSearched: this.state.numSearched + batchSize});
    defer(() => {
      this.trySeed(baseSeed + batchSize);
    });
  }

  render() {
    const {isSearching} = this.state;
    return (
      <Group className="SystemFinder" title="Find Systems">
        <div className="CheckboxRow">
          <strong>Star type:</strong>
          {" "}
          {STAR_TYPES.map((st) => (
            <Checkbox
              label={st}
              key={st}
              onChange={this.flipCheckbox.bind(this, st)}
              checked={this.state[st]} />
          ))}
        </div>

        <div className="CheckboxRow" style={{textAlign: 'center'}}>
          <Checkbox 
            onChange={this.flipCheckbox.bind(this, 'forceHabitableTerran')}
            checked={this.state['forceHabitableTerran']}
            label="Must have Terran planet in habitable zone"
            />
        </div>

        <div className="SystemFinder__MinPlanets">
          <strong>Minimum planets:</strong> <TextInput
            value={this.state.minPlanetsString}
            onChange={this.onChangeMinPlanets.bind(this)} />

          {!isSearching && (<Button onClick={this.search.bind(this)}>
            Search genspace
          </Button>)}

          {isSearching && (<span className="SystemFinder__Progress">
            Searched {this.state.numSearched} star systems
          </span>)}

        </div>
      </Group>
    );
  }
}