var background = chrome.extension.getBackgroundPage()
function canvastoggle(e = null,state = null,extended = false){
  var obj = document.getElementById("canvas")
  if(state == null)
    if(obj.classList.contains("active")) 
      obj.classList.remove("active"); 
    else obj.classList.add("active");
  else if(state) obj.classList.add("active");
  else obj.classList.remove("active");
  if(extended){
    obj.classList.add("extended");
  }else{
    obj.classList.remove("extended");
  }
}

// Title i18n
document.getElementsByTagName("title")[0].textContent = chrome.i18n.getMessage("Title_popup")
// Mode detect
obj = document.children[0]
if (Math.max(obj.offsetWidth / obj.offsetHeight, obj.offsetHeight / obj.offsetWidth) > 1.25){
  // Windowed mode
  canvastoggle(true,true,true)
  document.getElementsByClassName("windowed")[0].style.display = "none";
  // setTimeout(function(){alert(chrome.i18n.getMessage("Alert_popup_windowd"))},1)
}else{
  // Popup mode
  document.getElementsByClassName("windowed")[0].onclick = function () {
    background.createtab("./popup.html")
  }
  // Animation in first open
  if (!eval(localStorage.opened)) {
    localStorage.opened = "true";
    var array = document.getElementsByClassName("block");
    for (let i = 0; i <= 2; i++) array[i].classList.add("move");
    console.log(document.getElementsByClassName("body"))
    document.getElementsByTagName("body")[0].classList.add("move");
  }
  document.getElementById("canvas").onclick = canvastoggle;
}