chrome.browserAction.onClicked.addListener(function (i_oTab) {
    PinUnpinAll(!i_oTab.pinned);
});

// pin and unpin the tabs in the correct order
function PinUnpinAll(i_bPin) {    
    chrome.tabs.query({ currentWindow: true }, function (i_oTabs) {        

        // sort by index
        var oSortedTabs = i_oTabs.sort(function(a, b){
                if(i_bPin){ return a.index - b.index; }
                else { return b.index - a.index;}
            });

        // pin or unpin them
        for (var i = 0; i < oSortedTabs.length; i++) {
            chrome.tabs.update(oSortedTabs[i].id, { 'pinned': i_bPin });
        }
    });
}
