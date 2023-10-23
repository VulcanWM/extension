async function updateTime(){
    const result = await chrome.storage.local.get(["focus"])
    console.log(result.focus)
    if (result.focus == undefined || result.focus == false){
        console.log("Nothing")
        // do nothing
    } else {
        console.log("increase")
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
    alert(tabId)
    if (changeInfo.status === 'complete') {
      alert(tabId);
      // existing code
    }
  });