async function changeFocus(){
    const result = await chrome.storage.local.get(["focus"]);
    if (result.focus == undefined || result.focus == false){
        await chrome.storage.local.set({ focus: [0, 0] })
        document.getElementById("changeFocusButton").innerText = "Turn off focus"
    } else {
        const lastResult = await chrome.storage.local.get(["last"])
        const last = lastResult.last;
        const newLast = [];
        if (last != undefined){
            for (let lastScore of last){
                newLast.push(lastScore)
            }
        } else {
            var element = document.getElementById("last");
            element.innerHTML = ""
        }
        newLast.push(result.focus)
        await chrome.storage.local.set({ last: newLast })
        var para = document.createElement("p");
        const minutes = result.focus[0]
        const seconds = result.focus[1]
        var node = document.createTextNode(`${minutes} mins ${seconds} secs`);
        para.appendChild(node);
        var element = document.getElementById("last");
        element.appendChild(para);
        await chrome.storage.local.set({ focus: false })
        document.getElementById("changeFocusButton").innerText = "Turn on focus"
    }
}

async function clearAllTimes(){
    await chrome.storage.local.remove("last")
    var element = document.getElementById("last");
    element.innerHTML = ""
    var para = document.createElement("p");
    var node = document.createTextNode("Start your focus to show logs.");
    para.appendChild(node);
    element.appendChild(para);
}

async function windowLoad(){
    const result = await chrome.storage.local.get(["focus"])
    if (result.focus == undefined || result.focus == false){
        document.getElementById("changeFocusButton").innerText = "Turn on focus"
    } else {
        document.getElementById("changeFocusButton").innerText = "Turn off focus"
    }
    const lastResult = await chrome.storage.local.get(['last']);
    const last = lastResult.last;
    var element = document.getElementById("last");
    if (last == undefined){
        var para = document.createElement("p");
        var node = document.createTextNode("Start your focus to show logs.");
        para.appendChild(node);
        element.appendChild(para);
    } else {
        var button = document.createElement("button")
        button.innerText = "Clear all times"
        button.onclick = async () => {await clearAllTimes();}
        element.appendChild(button)
        for (let i = 0; i < last.length; i++) {
            if (i < 9){
                const lastScore = last[i]
                const minutes = lastScore[0]
                const seconds = lastScore[1]
                var para = document.createElement("p");
                var node = document.createTextNode(`${minutes} mins ${seconds} secs`);
                para.appendChild(node);
                element.appendChild(para);
            }
        }
    }
}

window.addEventListener("load", async () => {await windowLoad();});
document.getElementById("changeFocusButton").addEventListener("click", changeFocus);