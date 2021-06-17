const NEXT_DAY = 3600 * 1000 * 24;
// Base on 24 hour
const RESET_TIMER_HOUR = 14; 
  
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab ){
  if(!tab.url || !tab.url.startsWith('http') || changeInfo.status !== "complete"){
    return;
  }
  
  chrome.storage.sync.get('genshinImpactSignOnTime', (data) => {
    if(data.genshinImpactSignOnTime){
      const oldDate = new Date(data.genshinImpactSignOnTime)
      if(Date.now() > oldDate){
        const date = new Date(Date.now())
        const nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, RESET_TIMER_HOUR, 0)
        chrome.storage.sync.set({genshinImpactSignOnTime: nextDate.getTime()}, () => {
          chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ["main.js"]
          }, () => {
            chrome.storage.sync.get('genshinImpactSignOnTime', (data) => {
              console.log("Firing Background worker. Setting new date as: ", new Date(data.genshinImpactSignOnTime))
            })
          })
        });  
      }else{
        console.log("Reset Timer has not been reached.")
      }
    }else{
      const date = new Date(Date.now())
      const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1, RESET_TIMER_HOUR, 0)
      chrome.storage.sync.set({genshinImpactSignOnTime: newDate.getTime()}, () => {
        chrome.storage.sync.get('genshinImpactSignOnTime', (data) => {
          console.log("Initial Genshin Impact Timer Set to: ", new Date(data.genshinImpactSignOnTime))
        })
      });
    }
  });
})

