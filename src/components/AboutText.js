import React from 'react';
import ScrollingText from './ui/ScrollingText';

export default function AboutText() {

  return (
    <ScrollingText style={{position: 'absolute', top: 4, right: 4, bottom: 4, left: 4}}>
      <h2>Keplverse Telescope Software 1.0</h2>
      <h3>
        by Steve Landey
        <br />
        <a href="mailto:steve@steveasleep.com">steve@steveasleep.com</a>
      </h3>

      <p>

      </p>
    </ScrollingText>
  );
}