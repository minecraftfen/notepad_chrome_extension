window.createtab = function(url){
    chrome.tabs.create({
        url: url
    });
};
window.bgConnect = function (device = window.notepad, hSP = window.handleSyncPointer) {
    window.handleSyncPointer=hSP;
    window.connect(device)
}
window.bgSetMode = function () {
    
    window.SetMode = setInterval(function () {
        if (window.notepadClient) {
            var views = chrome.extension.getViews()
            for (let i = 0; i < views.length; i++) 
                views[i].notepadClient = window.notepadClient
            window.setMode();
            clearInterval(window.SetMode);
            delete window.SetMode
        }
    }, 1000)
}
