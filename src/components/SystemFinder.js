import React from 'react';
import _ from 'lodash';
import { StarSystem } from 'stellardream';

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
    };
  }

  flipCheckbox(st) {
    this.setState({[st]: !this.state[st]});
  }

  search() {
    this.setState({isSearching: true, numSearched: 1});
    this.trySeed(this.props.baseSeed + 1);
  }

  trySeed(baseSeed) {
    const batchSize = 10000;
    // const batchSize = 1;

    for (let seed=baseSeed; seed<baseSeed+batchSize; seed++) {
      const starSystem = new StarSystem(seed);

      if (this.state[starSystem.stars[0].starType]) {
        for (let planet of starSystem.planets) {
          const isCold = planet.distance > starSystem.habitableZoneMax;
          const isHot = planet.distance < starSystem.habitableZoneMin;
          const isTidallyLocked = !isCold && starSystem.stars[0].starType == 'M';
          const isTerran = planet.planetType == 'Terran';

          if (isTerran && !isCold && !isHot && !isTidallyLocked) {
            console.log("Searched", this.state.numSearched + (seed - baseSeed));
            this.setState({isSearching: false, numSearched: 0});
            this.props.onSeedFound(seed);
            return;
          }
        }
      }
    }

    this.setState({numSearched: this.state.numSearched + batchSize});
    _.defer(() => {
      this.trySeed(baseSeed + 100);
    });
  }

  render() {
    const {isSearching} = this.state;
    return (
      <div className="SystemFinder">
        <h2>System Finder</h2>
        <div className="CheckboxRow">
          {STAR_TYPES.map((st) => (
            <label key={st}>
              <input
                type="checkbox"
                onChange={this.flipCheckbox.bind(this, st)}
                checked={this.state[st]}/>
              {" "}
              {st}
              {" "}
            </label>
          ))}
        </div>

        <div className="CheckboxRow">
          <label>
            <input
              type="checkbox"
              onChange={this.flipCheckbox.bind(this, 'forceHabitableTerrain')}
              checked={this.state['forceHabitableTerran']}/>
            {" Must have Terran planet in habitable zone"}
          </label>
        </div>

        {!isSearching && (<span className="m-clickable" onClick={this.search.bind(this)}>
          Search the genspace
        </span>)}

        {isSearching && (<span className="SystemFinder__Progress">
          Searched {this.state.numSearched} star systems
        </span>)}
      </div>
    );
  }
}