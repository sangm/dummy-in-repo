/* eslint-env node */
module.exports = {
  description: 'Foo blueprint',

  normalizeEntityName: (entityName) => {
    return entityName || 'foo-entity-name';
  },

  fileMapTokens: function(options) {
    // Return custom tokens to be replaced in your files
    return {
      __styleToken__: function(options) {
        console.log(options.dasherizedModuleName);
        return "_" + options.dasherizedModuleName;
      }
    }
  },

  locals: function(options) {
    var fileName = options.entity.name;
    options.entity.styleModule = { moduleName: "_" + fileName + ".scss" };
    return options;
  }


  // locals(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  // afterInstall(options) {
  //   // Perform extra work here.
  // }
};
