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

function getRef(url) {
    if (url.split('.').length === 2) {
        return url.split('.')[0].split('//')[1];
    }
    else {
        return url.split('.')[1];
    }
}

chrome.browserAction.onClicked.addListener(function(tab) {
    getCurrentURL(function(url) {
        var ref = getRef(url)
        var url = encodeURIComponent(url);
        getLang(function(lang) {
            finalUrl = "https://dev.getnative.me?ref="+ref+"&lang="+lang+"&url="+url;
            chrome.tabs.create({url: finalUrl});
        });
    });
});