const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
    let validChannels = ['build', 'save', 'load'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ['fromMain'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});



//import ipcRenderer from 'electron';
//const ipcRenderer = require('electron');

// const linker = () => {
//   let jsCode = [];
//   window.components?.forEach((component) =>
//     jsCode.push(componentsInit(component))
//   );
//   jsCode = createAppJs(jsCode);

//   let downloadAnchorNode = document.createElement("a");
//   downloadAnchorNode.setAttribute("href", jsCode);
//   downloadAnchorNode.setAttribute("download", 'app.js');
//   document.body.appendChild(downloadAnchorNode); // required for firefox
//   downloadAnchorNode.click();
//   downloadAnchorNode.remove();
// };



// const createAppJs = (jsCode) => {
//   jsCode = new Blob([jsCode.join()], { type: "text/javascript" });

//   // If we are replacing a previously generated file we need to
//   // manually revoke the object URL to avoid memory leaks.
//   if (jsCode !== null) {
//     window.URL.revokeObjectURL(jsCode);
//   }

//   jsCode = window.URL.createObjectURL(jsCode);

//   // returns a URL you can use as a href
//   return jsCode;
// };

// // Initialization
// const init = () => {
//   window.api.receive("fromMain", (data) => {
//     console.log(`Received ${data} from main process`);
//     if(data) {
//       document.querySelector("#build-app").style.color = "green";
//     }
// });
//   document.querySelector("#build-app").addEventListener("click", () => {
//     //ipcRenderer.send('main', window.components);
//     // window.electronAPI.setTitle('title');
//     console.log(window.api);
//     window.api.send('toMain', JSON.stringify({ name: 'title' }));
//   });
// };

// export default { init };
