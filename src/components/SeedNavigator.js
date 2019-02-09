import React, { useState } from 'react';
import Button from './ui/Button';
import TextInput from './ui/TextInput';

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
        <Button onClick={onSeedFound.bind(this, parseInt(inputSeed, 10))}>
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