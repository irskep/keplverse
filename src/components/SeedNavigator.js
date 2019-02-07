import React, { useState } from 'react';
import Button from './ui/Button';

export default function SeedNavigator({baseSeed, onSeedFound}) {
  const [inputSeed, setInputSeed] = useState("" + baseSeed);

  function onChange(e) {
    setInputSeed(e.target.value);
  }

  return (
    <div className="SeedNavigator">
      <div>
        <input type="text" value={inputSeed} onChange={onChange} />
        {" "}
        <Button onClick={onSeedFound.bind(this, parseInt(inputSeed, 10))}>
          Go
        </Button>
      </div>

      <Button onClick={onSeedFound.bind(this, baseSeed - 1)}>
        Previous seed (p)
      </Button>
      <Button onClick={onSeedFound.bind(this, baseSeed + 1)}>
        Next seed (n)
      </Button>
    </div>
  )
}