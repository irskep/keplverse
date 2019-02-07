import { useState, useEffect } from 'react';
import queryString from 'query-string';

import _ from "lodash";

export default class URLStorage {
  constructor(getInitialState) {
    this.getInitialState = getInitialState;
    this.storedValues = getInitialState();

    const values = {};
    for (const k of Object.keys(this.storedValues)) {
      values[k] = this.load(k);
    }

    location.hash = queryString.stringify(
      Object.assign({}, queryString.parse(location.hash), values));
  }

  load(k, parse) {
    const newValues = queryString.parse(location.hash);
    if (newValues[k] !== undefined) {
      this.storedValues[k] = (parse || _.identity)(newValues[k]);
    }
    return this.storedValues[k];
  }

  save(k, v) {
    this.storedValues[k] = v;
    location.hash = queryString.stringify(
      Object.assign({}, queryString.parse(location.hash), {[k]: v}));
  }

  useStoredValue(k, parse) {
    const [v, setV] = useState(this.storedValues[k]);

    const wrappedSetV = (newV) => {
      setV(newV);
      this.save(k, newV);
    }

    useEffect(() => {
      const listener = () => {
        console.log("Update from URL");
        setV(this.load(k, parse));
      };
      window.addEventListener('hashchange', listener, false);
      () => { window.removeEventListener('hashchange', listener); }
    });

    return [v, wrappedSetV];
  }
}