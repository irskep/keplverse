import React, { useState } from 'react';
import { Button, TextInput } from 'ninetyfive';

export default function SeedNavigator({baseSeed, onSeedFound}) {
  const [inputSeed, setInputSeed] = useState("" + baseSeed);

  function onChange(e) {
    setInputSeed(e.target.value);
  }

  return (
    <div className="SeedNavigator">
      <div>
        <TextInput value={inputSeed} onChange={onChange} />
        {" "}
        <Button style={{width: '5rem', minWidth: 0}} onClick={onSeedFound.bind(this, parseInt(inputSeed, 10))}>
          Go
        </Button>
      </div>
      <Button onClick={onSeedFound.bind(this, baseSeed - 1)}>
        <u>P</u>revious seed
      </Button>
      <Button onClick={onSeedFound.bind(this, baseSeed + 1)}>
        <u>N</u>ext seed
      </Button>
      <Button onClick={onSeedFound.bind(this, Math.floor(Math.random() * Number.MAX_SAFE_INTEGER))}>
        <u>R</u>andom
      </Button>
    </div>
  )
}