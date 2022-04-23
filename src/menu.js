import { app, ipcMain } from "electron";
import Project from "./js/mainModules/project";

const menuInit = (win) => {
    const isMac = process.platform === "darwin";

    const template = [
        // { role: 'appMenu' }
        ...(isMac
            ? [
                  {
                      label: app.name,
                      submenu: [
                          { role: "about" },
                          { type: "separator" },
                          { role: "services" },
                          { type: "separator" },
                          { role: "hide" },
                          { role: "hideOthers" },
                          { role: "unhide" },
                          { type: "separator" },
                          { role: "quit" },
                      ],
                  },
              ]
            : []),
        // { role: 'fileMenu' }
        {
            label: "File",
            submenu: [
                {
                    role: "open",
                    label: "Import Project",
                    click: async () => {
                        const result = await Project.load();
                        win.webContents.send("load_fromMain", result);
                    },
                },
                {
                    role: "save",
                    label: "Export Project",
                    click: async () => {
                        win.webContents.send("save_fromMain");
                    },
                },
                { type: "separator" },
                {
                    role: "build",
                    label: "Build App",
                    click: async () => {
                        win.webContents.send("build_fromMain");
                    },
                },
            ],
        },
        // { role: 'editMenu' }
        {
            label: "Edit",
            submenu: [{ role: "cut" }, { role: "copy" }, { role: "paste" }],
        },
        // { role: 'viewMenu' }
        // ...(isDev
        //     ? [
        //           {
        //               label: "View",
        //               submenu: [
        //                   { role: "reload" },
        //                   { role: "forceReload" },
        //                   { role: "toggleDevTools" },
        //                   { type: "separator" },
        //                   { role: "resetZoom" },
        //                   { role: "zoomIn" },
        //                   { role: "zoomOut" },
        //                   { type: "separator" },
        //                   { role: "togglefullscreen" },
        //               ],
        //           },
        //       ]
        //     : []),
        // { role: 'windowMenu' }
        {
            label: "Window",
            submenu: [
                { role: "minimize" },
                { role: "zoom" },
                ...(isMac
                    ? [
                          { type: "separator" },
                          { role: "front" },
                          { type: "separator" },
                          { role: "window" },
                      ]
                    : [{ role: "close" }]),
            ],
        },
        {
            role: "help",
            submenu: [
                {
                    label: "Learn More",
                    click: async () => {
                        const { shell } = require("electron");
                        await shell.openExternal("https://github.com/kpilat/omnicore-screenmaker");
                    },
                },
            ],
        },
    ];

    return template;
};

export default { menuInit };
