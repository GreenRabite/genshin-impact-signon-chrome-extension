// function logMessage(msg) {
//   chrome.tabs.executeScript({ code: "console.log('" + msg + "')" });
// }

// chrome.browserAction.onClicked.addListener(function(tab) {
//   chrome.tabs.executeScript(tab.id, {file: "popup.js"});
// })

//   console.log(tab)
//   chrome.scripting.executeScript({
  //     target: {tabId: tab, allFrames: true},
  //     files: ["main.js"]
  //   }, ()=> console.log("Callback"));
  // })

const NEXT_DAY = 3600 * 1000 * 24;
// const NEXT_DAY = 1;
  
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab ){
  if(!tab.url || !tab.url.startsWith('http') || changeInfo.status !== "complete"){
    return;
  }
  
  chrome.storage.sync.get('genshinImpactSignOnTime', (data) => {
    if(data.genshinImpactSignOnTime){
      const oldDate = new Date(data.genshinImpactSignOnTime)
      if(Date.now() > oldDate){
        chrome.storage.sync.set({genshinImpactSignOnTime: Date.now() + NEXT_DAY}, () => {
          chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ["main.js"]
          }, () => {
            chrome.storage.sync.get('genshinImpactSignOnTime', (data) => {
              console.log("new date:", data.genshinImpactSignOnTime)
            })
          })
        });  
      }else{
        console.log("Failed")
      }
    }else{
      chrome.storage.sync.set({genshinImpactSignOnTime: Date.now()}, ()=>{
        chrome.storage.sync.get('genshinImpactSignOnTime', (data) => {
          console.log(data.genshinImpactSignOnTime)
        })
      });
    }
  });
})

