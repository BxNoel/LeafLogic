// Initialize query history storage on extension installation
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get("PROMPT_HISTROY", (result) => {
      if (!result.PROMPT_HISTROY) {
        chrome.storage.local.set({ PROMPT_HISTROY: [] });
      }
    });
  });
  