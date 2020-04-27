window.createtab = function(url){
    chrome.tabs.create({
        url: url
    });
};
