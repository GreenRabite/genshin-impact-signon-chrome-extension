// Base on 24 hour
// Daily Check in reset at 12AM UTC+8/ 16hrs behind (Shanghai time)
const firstDate = new Date();
const INITIAL_RESET_TIMER_HOUR = `${firstDate.getFullYear()}-${firstDate.getMonth() + 1}-${firstDate.getDate()}T16:00:00.000`;
const NEXT_RESET_TIMER_HOUR = `${firstDate.getFullYear()}-${firstDate.getMonth() + 1}-${firstDate.getDate() + 1}T16:00:00.000`;

const timeZoneTransformer = (stringDate, timeZone = "Asia/Shanghai") => {
  const now = new Date();
  const serverDate = new Date(stringDate);
  const utcDate = new Date(
    Date.UTC(
      serverDate.getFullYear(),
      serverDate.getMonth(),
      serverDate.getDate(),
      serverDate.getHours(),
      serverDate.getMinutes(),
      serverDate.getSeconds()
    )
  );
  const invdate = new Date(
    serverDate.toLocaleString("en-US", {
      timeZone,
    })
  );
  const diff = now.getTime() - invdate.getTime();
  const adjustedDate = new Date(now.getTime() - diff);
  return {
    toUtc: utcDate,
    fromUtc: adjustedDate,
  };
};

// Not working from unpacked
chrome.runtime.onInstalled.addListener(reason => {
  const date = new Date(Date.now())
  // const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1, RESET_TIMER_HOUR, 0)
  const newDate = timeZoneTransformer(INITIAL_RESET_TIMER_HOUR).toUtc;
  console.log(newDate)
  console.log(newDate.getTime())
  chrome.storage.sync.set({genshinImpactSignOnTime: newDate.getTime()}, () => {
    chrome.storage.sync.get('genshinImpactSignOnTime', (data) => {
      console.log("Initial Install: Genshin Impact Timer Set to: ", new Date(data.genshinImpactSignOnTime))
    })
  });
})
  
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab ){
  if(!tab.url || !tab.url.startsWith('http') || changeInfo.status !== "complete"){
    return;
  }

  chrome.storage.sync.get('genshinImpactSignOnTime', (data) => {
    if(data.genshinImpactSignOnTime){
      const oldDate = new Date(data.genshinImpactSignOnTime)
      const date = new Date(Date.now())
      if(date > oldDate){
        // const nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, RESET_TIMER_HOUR, 0)
        const nextdate = timeZoneTransformer(NEXT_RESET_TIMER_HOUR).toUtc;
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

