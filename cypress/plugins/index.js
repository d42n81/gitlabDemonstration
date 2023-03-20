const axeDevToolsPlugin = require('@axe-devtools/cypress/dist/plugin');

module.exports = (on, config) => {
  axeDevToolsPlugin(on);
  return config;
}