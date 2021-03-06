export default class FifoCacheObject {
  constructor({cacheSize} = {}) {
    if (cacheSize === undefined) {
      throw new Error('Missing the required property `cacheSize`.');
    }
    if (!Number.isInteger(cacheSize) || cacheSize <= 0) {
      throw new Error(
        'The `cacheSize` property must be a positive integer value.'
      );
    }
    this._cache = {};
    this._cacheOrdering = [];
    this._cacheSize = cacheSize;
  }
  set(key, selectorFn) {
    this._cache[key] = selectorFn;
    this._cacheOrdering.push(key);

    if (this._cacheOrdering.length > this._cacheSize) {
      const earliest = this._cacheOrdering[0];
      this.remove(earliest);
    }
  }
  get(key) {
    return this._cache[key];
  }
  remove(key) {
    const index = this._cacheOrdering.indexOf(key);

    if (index > -1) {
      this._cacheOrdering.splice(index, 1);
    }
    delete this._cache[key];
  }
  clear() {
    this._cache = {};
    this._cacheOrdering = [];
  }
}
