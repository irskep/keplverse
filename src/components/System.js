import React from 'react';
import Star from './Star';
import Planet from './Planet';

export default class System extends React.Component {
  // props: { kss }
  render() {
    const { starSystem } = this.props.kss;
    const seedStr = "" + this.props.kss.seed;
    const a = seedStr.substring(0, Math.floor(seedStr.length / 2));
    const b = seedStr.substring(Math.floor(seedStr.length / 2));
    return (
      <div className="System">
        <h1>{this.props.kss.name}</h1>
        <p>Galactic coordinates: {a},{b}</p>

        {starSystem.stars.map((s, i) => <Star key={i} star={s} />)}

        {starSystem.planets.map((p, i) => (
          <Planet key={i} i={i} starSystem={this.props.kss.starSystem} planet={p} />))}
        
        {starSystem.planets.length == 0 && <div className="EmptyState">This star system has no planets.</div>}
      </div>
    );
  }
}