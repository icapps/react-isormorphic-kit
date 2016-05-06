class ModuleCollector {
  constructor(config) {
    this.actions = [];
    this.reducers = [];
    this.modules = {};
    this.config = config;
  }

  add(newModule) {
    if (typeof newModule === 'function') {
      newModule = newModule(this.config);
    }

    if (!newModule) {
      throw new Error('Check if your module is an object or is returning an object');
    }

    if (newModule.name) {
      if (this.modules.hasOwnProperty(newModule.name)) {
        throw new Error(`Module with name '${newModule.name}' was already registered.`);
      }

      this.modules[newModule.name] = newModule;
    }

    if (newModule.reducers) {
      this.reducers.push(newModule.reducers);
    }

    if (newModule.actions) {
      this.actions.push(newModule.actions);
    }
  }

  get(moduleName) {
    if (typeof moduleName === 'string') {
      return this.modules[moduleName];
    }

    return this.modules;
  }

  getReducers() {
    return Object.assign({}, ...this.reducers);
  }
}

export default ModuleCollector;
