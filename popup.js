async function changeFocus(){
    const result = await chrome.storage.local.get(["focus"]);
    if (result.focus == undefined || result.focus == false){
        await chrome.storage.local.set({ focus: [0, 0] })
        document.getElementById("changeFocusButton").innerText = "Turn off focus"
    } else {
        const lastResult = await chrome.storage.local.get(["focus"])
        const last = lastResult.last;
        const newLast = [];
        if (last != undefined){
            for (lastScore of last){
                newLast.push(lastScore)
            }
        }
        newLast.push(result.focus)
        alert(result.focus)
        await chrome.storage.local.set({ last: newLast })
        var para = document.createElement("p");
        var node = document.createTextNode(result.focus);
        para.appendChild(node);
        var element = document.getElementById("last");
        element.appendChild(para);
        await chrome.storage.local.set({ focus: false })
        document.getElementById("changeFocusButton").innerText = "Turn on focus"
    }
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
    if (last == undefined){
        var para = document.createElement("p");
        var node = document.createTextNode("Start your focus to show logs.");
        para.appendChild(node);
        var element = document.getElementById("last");
        element.appendChild(para);
    } else {
        for (lastScore of last) {
            var para = document.createElement("p");
            var node = document.createTextNode(lastScore);
            para.appendChild(node);
            var element = document.getElementById("last");
            element.appendChild(para);
        }
    }
}

window.addEventListener("load", async () => {await windowLoad();});
document.getElementById("changeFocusButton").addEventListener("click", changeFocus);