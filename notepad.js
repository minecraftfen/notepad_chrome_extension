window.autosetMode == true
import {
  NotepadConnectionState,
  NotepadConnector
} from "./src/index.js";
import {
  NotepadMode
} from "./src/models.js";
const notepadConnector = new NotepadConnector();

window.requestDevice = async function () {
  window.notepad = await notepadConnector.requestDevice();
  console.log("requestDevice", window.notepad);
  return notepad
};

window.connect = function (device = window.notepad) {
  notepadConnector.connect(device);
};

window.disconnect = function () {
  notepadConnector.disconnect();
};

notepadConnector.connectionChangeHandler = function (client, state) {
  console.log(`handleConnectionChange ${client}, ${state}`);
  switch (state) {
    case NotepadConnectionState.disconnected:
      if (window.notepadClient) window.notepadClient.syncPointerHandler = null;
      window.notepadClient = null;
      break;
    case NotepadConnectionState.connected:
      window.notepadClient = client;
      window.notepadClient.syncPointerHandler = window.handleSyncPointer;
      if(window.autosetMode==true){
        window.connected=true;
      }
      break;
  }
};

window.setMode = function () {
  window.notepadClient.setMode(NotepadMode.Sync);
};

const getCanvas = function () {
  window.canvas = document.getElementById("canvas");
  return window.canvas;
};

window.handleSyncPointer = function (pointers) {
  let canvas = getCanvas()
  let context = canvas.getContext("2d");
  if (canvas.width != 1480) canvas.width = 1480;
  if (canvas.height != 2100) canvas.height = 2100;
  for (let p of pointers) {
    let pre = window.prePointer ? window.prePointer : {
      x: 0,
      y: 0,
      t: 0,
      p: 0
    };
    context.beginPath();
    if (pre.p > 0) context.moveTo(pre.x / 10, pre.y / 10);
    else context.moveTo(p.x / 10, p.y / 10);
    context.lineWidth = p.p / 128;
    context.lineTo(p.x / 10, p.y / 10);
    context.stroke();
    window.prePointer = p;
  }
};