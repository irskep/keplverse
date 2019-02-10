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
        Congratulations on your purchase of the Keplverse Telescope! This
        device allows you to stargaze in an imaginary, procedurally generated
        universe.
      </p>

      <p>
        Each star system is at a coordinate called a <em>seed</em>. This seed
        is used to choose pseudorandom numbers to decide things like type and
        number of stars, type and number of planets, types of planets, and
        how far each planet is from the star.
      </p>

      <p>
        The star systems in the Keplverse are meant to approximate the
        distribution of stars and planets in the Milky Way Galaxy, according
        to what we know as of 2019. NASA's Kepler exoplanet search mission
        spawned hundreds of research papers, many of which changed our
        expectations of the type and number of exoplanets in outer space.
      </p>

      <p>
        More about how this program works: <a target="_blank" href="https://blog.steveasleep.com/using-data-from-the-kepler-mission-to-scientifically-imagine-star-systems">Using data from the Kepler mission to scientifically imagine star systems</a>
      </p>

      <p>
        The original purpose of Keplverse Telescope Software
        demonstrate <a href="https://github.com/irskep/stellardream" target="_blank">Stellar Dream</a>,
        a JavaScript library that generates random star systems that pass a
        basic nerd sniff test. That library may eventually be used in a game about
        space exploration. To find out if that ever happens, subscribe
        to <a href="https://blog.steveasleep.com/" target="_blank">blog.steveasleep.com</a> in
        your RSS reader.
      </p>

      <p>
        Links to the papers used to create these star systems may be found
        in the comments of <a href="https://github.com/irskep/stellardream" target="_blank">Stellar Dream's code</a>.
      </p>
    </ScrollingText>
  );
}