module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: "src/preload.js",
      // Or, for multiple preload files:
      // preload: { preload: "src/preload.js", otherPreload: "src/preload2.js" },
      mainProcessWatch: [
        'src/js/mainModules/appBuilder.js',
        'src/js/mainModules/componentTempl.js',
        'src/js/mainModules/jsTempl.js',
        'src/js/mainModules/htmlTempl.js'
      ]
    },
  },
};
