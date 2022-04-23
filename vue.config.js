module.exports = {
    pluginOptions: {
        electronBuilder: {
            preload: "src/preload.js",
            // Or, for multiple preload files:
            // preload: { preload: "src/preload.js", otherPreload: "src/menu.js" },
            mainProcessWatch: [
                "src/js/mainModules/appBuilder.js",
                "src/js/mainModules/componentTempl.js",
                "src/js/mainModules/jsTempl.js",
                "src/js/mainModules/htmlTempl.js",
                "src/js/mainModules/componentConfigTempl.js",
                "src/js/mainModules/project.js",
                "src/js/mainModules/fileManager.js",
                "src/js/mainModules/utilities.js",
                "src/menu.js",
            ],
            builderOptions: {
                extraResources: [
                    {
                        from: "./public/assets",
                        to: "assets",
                    },
                ],
            },
        },
    },
};
