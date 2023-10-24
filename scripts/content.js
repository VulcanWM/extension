async function updateTime(){
    const result = await chrome.storage.local.get(["focus"])
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
        await chrome.storage.local.set({ focus: time })
    }
}

setInterval(updateTime, 1000);

// chrome.tabs.onCreated.addListener(async (tab) => {
//     const result = await chrome.storage.local.get(["focus"])
//     if(result.focus) {
//       chrome.tabs.remove(tab.id); 
//     }
// });

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {

    if (typeof chrome.tabs.onUpdated === 'undefined') {
      // chrome.tabs.onUpdated is undefined, so likely this is not a browser context
      return; 
    }
  
    alert(tabId);
  
    if (changeInfo.status === 'complete') {
      alert(tabId);
      // existing code
    }
  
  });