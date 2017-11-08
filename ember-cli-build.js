/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const stew = require('broccoli-stew');
const Funnel = require('broccoli-funnel');
const Concat = require('broccoli-concat');
const p = require('ember-cli-preprocess-registry/preprocessors');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  function addonTreeForTest(addon) {
    const tests = new Funnel(addon.path + '/tests/', { destDir: addon.name + '/tests' });

    return p.preprocessJs(tests, '/tests', addon.name, {
      registry: app.registry,
    });
  }

  function addonTreesForTest(app) {
    const inRepoAddons = app.project.addonDiscovery.discoverInRepoAddons(app.project.root, app.project.pkg);

    return inRepoAddons.map(addon => {
      return new Concat(addonTreeForTest(addon), {
        outputFile: 'assets/' + addon.name + '-tests.js'
      });
    })
  }
  // addon.addonTreesFor('tests');
	return app.toTree(addonTreesForTest(app));
};
