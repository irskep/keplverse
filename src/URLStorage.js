import { useState, useEffect } from 'react';
import queryString from 'query-string';

export default class URLStorage {
  constructor(getInitialState) {
    this.getInitialState = getInitialState;
    this.storedValues = getInitialState();

    const values = {};
    const newValues = queryString.parse(location.hash);
    for (const k of Object.keys(this.storedValues)) {
      values[k] = this.load(k, newValues);
    }

    location.hash = queryString.stringify(
      Object.assign({}, queryString.parse(location.hash), values));
  }

  load(k, newValues) {
    if (!newValues) {
      newValues = queryString.parse(location.hash);
    }

    if (newValues[k] !== undefined) {
      this.storedValues[k] = JSON.parse(newValues[k]);
    }

    return this.storedValues[k];
  }

  save(k, v) {
    this.storedValues[k] = v;
    location.hash = queryString.stringify(
      Object.assign({}, queryString.parse(location.hash), {[k]: v}));
  }

  useStoredValue(k) {
    const [v, setV] = useState(this.storedValues[k]);

    const wrappedSetV = (newV) => {
      setV(newV);
      this.save(k, newV);
    }

    useEffect(() => {
      const listener = () => {
        setV(this.load(k));
      };
      window.addEventListener('hashchange', listener, false);
      () => { window.removeEventListener('hashchange', listener); }
    });

    return [v, wrappedSetV];
  }
}