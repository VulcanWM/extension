chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (typeof chrome.tabs.onUpdated === 'undefined') {
      return; 
    }
    if (changeInfo.status === 'complete') {
        chrome.storage.local.get(["focus"]).then((result) => {
            if (result.focus != false){
                chrome.tabs.remove(tabId); 
            }
        });
    }
  
});

function updateTime(){
    chrome.storage.local.get(["focus"]).then((result) => {
        if (result.focus == undefined || result.focus == false){
            // nothing
        } else {
            // increase time
            const time = result.focus;
            if (time[1] == 60){
                time[1] = 0;
                time[0] = time[0] + 1;
            } else {
                time[1] = time[1] + 1;
            }
            chrome.storage.local.set({ focus: time })
        }
    });
}

chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason !== chrome.runtime.OnInstalledReason.INSTALL) {
      return;
    }
  
    updateTime()
  
    chrome.alarms.create('every-second-alarm', {
      delayInMinutes: 1/60,
      periodInMinutes: 1/60
    });
  });
  
chrome.alarms.onAlarm.addListener((alarm) => {
    updateTime()
})