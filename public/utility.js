function injectFetchHook() {
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("pageFetchHook.js");
    script.type = "text/javascript";
    script.onload = () => script.remove();
    (document.head || document.documentElement).appendChild(script);
  }

function getDayOfWeek() {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    const today = new Date();
    return days[today.getDay()];
}


  