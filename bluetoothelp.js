document.getElementsByTagName("title")[0].textContent = chrome.i18n.getMessage("Title_bluetoothelp");
var ua = navigator.userAgent.toLowerCase(); //获取用户端信息
var info = [/msie/.test(ua) && !/opera/.test(ua),/opera/.test(ua),
  /version.*safari/.test(ua),/chrome/.test(ua),/gecko/.test(ua) && !/webkit/.test(ua)];
info_list = ["IE", "Opera", "Safari", "chrome", "Firefox"]
function detect(){
  var array=[]
  for (let i = 0; i < info.length; i++) {
    if (info[i]){
      array.push(
        chrome.i18n.getMessage("browser_name_prefix")+
        info_list[i]+
        chrome.i18n.getMessage("browser_name_suffix")
      )
    }
  }
  return array;
}
document.getElementById("line1").textContent = chrome.i18n.getMessage("bluetoothhelp_line1");
document.getElementById("line2").textContent = 
  chrome.i18n.getMessage("bluetoothhelp_line2_prefix") +
  detect().join(" ") +
  chrome.i18n.getMessage("bluetoothhelp_line2_suffix");
document.getElementById("line3").textContent = chrome.i18n.getMessage("bluetoothhelp_line3");