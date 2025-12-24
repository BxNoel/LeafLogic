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

function cachePrompt(PROMPT, URL) {
  chrome.storage.local.get("PROMPT_HISTROY", (result) => {
    let history = result.PROMPT_HISTROY || [];
    // Add to front (most recent)
    history.unshift({ PROMPT, URL });
    // Trim to last 100
    if (history.length > 100) {
      history = history.slice(0, 100);
    }

    chrome.storage.local.set({ PROMPT_HISTROY: history });
  });
}

function getStableChatUrl(timeoutMs = 3000) {
  return new Promise((resolve) => {
    const start = Date.now();

    const hasConversationId = () => {
      const url = new URL(location.href);
      // chat.openai.com/c/<id> or chatgpt.com/c/<id>
      return /\/c\/[a-zA-Z0-9_-]+$/.test(url.pathname) ? url.href : null;
    };

    const first = hasConversationId();
    if (first) return resolve(first);

    const iv = setInterval(() => {
      const stable = hasConversationId();
      if (stable) {
        clearInterval(iv);
        resolve(stable);
      } else if (Date.now() - start > timeoutMs) {
        clearInterval(iv);
        resolve(location.href);
      }
    }, 150);
  });
}