var background = chrome.extension.getBackgroundPage()
window.connected = false;
// Title i18n
document.getElementsByTagName("title")[0].textContent = chrome.i18n.getMessage("Title_bluetoothelp");
// First time massage i18n
var ua = navigator.userAgent.toLowerCase();
var info = [/msie/.test(ua) && !/opera/.test(ua), /opera/.test(ua),
  /version.*safari/.test(ua), /chrome/.test(ua), /gecko/.test(ua) && !/webkit/.test(ua)
];
var info_list = ["IE", "Opera", "Safari", "chrome", "Firefox"]

function detect() {
  var array = []
  for (let i = 0; i < info.length; i++) {
    if (info[i]) {
      array.push(
        chrome.i18n.getMessage("browser_name_prefix") +
        info_list[i] +
        chrome.i18n.getMessage("browser_name_suffix")
      )
    }
  }
  return array;
}
var line1 = document.getElementById("line1")
var line2 = document.getElementById("line2")
var line3 = document.getElementById("line3")
line1.textContent = chrome.i18n.getMessage("bluetoothhelp_line1");
line2.textContent =
  chrome.i18n.getMessage("bluetoothhelp_line2_prefix") +
  detect().join(" ") +
  chrome.i18n.getMessage("bluetoothhelp_line2_suffix");
line3.textContent = chrome.i18n.getMessage("bluetoothhelp_line3_state1");
// First time bluetooth
window.handleSyncPointer = function (p) {
  line2.textContent = chrome.i18n.getMessage("bluetoothhelp_line2_help");
  line3.textContent = chrome.i18n.getMessage("bluetoothhelp_line3_help");
  line3.style.display = "block";
}
document.onclick = function (e) {
  window.requestDevice()
  document.onclick = function(){}
  line3.textContent = chrome.i18n.getMessage("bluetoothhelp_line3_state2");
  window.Connect = setInterval(function () {
    if (window.notepad) {
      line1.textContent = chrome.i18n.getMessage("bluetoothhelp_line1_state2");
      line2.textContent = chrome.i18n.getMessage("bluetoothhelp_line2_state2");
      line3.style.display = "none";
      background.bgConnect(notepad, window.handleSyncPointer)
      background.bgSetMode()
      window.SetMode = setInterval(function () {
        if (window.notepadClient) {
          line1.style.display = "none";
          line2.textContent = chrome.i18n.getMessage("bluetoothhelp_line2_finished");
          line3.style.display = "none";
          clearInterval(window.SetMode);
          delete window.SetMode
        }
      }, 100)
      clearInterval(window.Connect);
      delete window.Connect
    }
  }, 100)
}