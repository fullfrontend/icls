export default class InMemoryStore {

    constructor (initialStore = {}) {
        this._store = initialStore;
    }

    _recurse (key, value) {

        if (key === undefined) {
            return this._store;
        }

        let writeMode = value !== undefined;

        let currentLevel = this._store;
        let levels = key.split('.');

        for (let i = 0, l = levels.length; i < l; i++) {
            if (!writeMode && currentLevel[levels[i]] === undefined) {
                return null;
            }

            if (!writeMode) {
                currentLevel = currentLevel[levels[i]];
                continue;
            }

            if (currentLevel[levels[i]] === undefined) {
                currentLevel[levels[i]] = {};
            }

            if (i + 1 === l) {
                currentLevel[levels[i]] = value;
            }

            currentLevel = currentLevel[levels[i]];
        }

        return currentLevel;
    }

    get (key, defaultValue = null) {
        return this._recurse(key) || defaultValue;
    }

    set (key, value) {
        this._recurse(key, value);
        return this;
    }

    reset () {
        this._store = {};
    }

    toJS () {
        return this._store;
    }

}
