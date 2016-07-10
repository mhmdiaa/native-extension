function getCurrentURL(callback) {
    queryinfo = {
        active: true,
        currentWindow: true
    };
    chrome.tabs.query(queryinfo, function(tabs) {
        var url = tabs[0].url;
        callback(url);
    });
};

function getLang(callback) {
    chrome.tabs.detectLanguage(function(lang) {
        callback(lang);
    });
}

chrome.browserAction.onClicked.addListener(function(tab) {
    getCurrentURL(function(url) {
        var ref = url.replace(/^https?\:\/\//i, "").replace(/\./g, "");
        var url = encodeURIComponent(url);
        getLang(function(lang) {
            finalUrl = "https://dev.getnative.me?ref=" + ref + "&lang=" + lang + "&url=" + url + "&splitMode=1";
            chrome.tabs.create({
                url: finalUrl
            });
        });
    });
});
