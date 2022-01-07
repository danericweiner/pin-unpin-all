// pin in order, unpin in reverse order
function pinAllTabsInOrder(tabs, pin) {
    try {
        tabs.sort((a, b) => pin ? a.index - b.index : b.index - a.index).forEach(tab => {
            pinOneTab(tab, pin);
        });
    } catch (err) {
        console.log("PinUnpinAll: Error pinning tabs: " + err);
    }
}

function pinOneTab(tab, pin) {
    try {
        chrome.tabs.update(tab.id, { pinned: pin });
    } catch (err) {
        console.log("PinUnpinAll: Error pinning tab: " + err);
    }
}

chrome.action.onClicked.addListener((tab) => {
    try {
        chrome.tabs.query({ currentWindow: true }, function (tabs) {
            pinAllTabsInOrder(tabs, !tab.pinned);
        });
    } catch (err) {
        console.log("PinUnpinAll: Error retrieving tabs: " + err);
    }
});