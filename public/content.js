// Confirming script injection
console.log("LeafLogic content script loaded");

function injectFetchHook() {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("pageFetchHook.js");
  script.type = "text/javascript";
  script.onload = () => script.remove();
  (document.head || document.documentElement).appendChild(script);
}
injectFetchHook();
console.log("safelt injected fetch hook");  
// indicating that a prompt has been sent.
window.addEventListener("message", (event) => {
  if (event.data?.type && event.data.type === "LEAFLOGIC_PROMPT_SENT") {
    incrementPromptCount();
  }
});
// Function to increment prompt count in chrome storage
function incrementPromptCount() {
  chrome.storage.local.get(["promptCount"], (result) => {
    const currentCount = result.promptCount || 0;
    const newCount = currentCount + 1;
    chrome.storage.local.set({ promptCount: newCount });
  });
}

//Use this later to cache prompts to certaint links
// [PROMPT] --> [CHAT_URL]
let activeInput = null;
document.addEventListener("focusin", (e) => {
  const el = e.target;
  if (el && el.id === "prompt-textarea") {
    activeInput = el;
    console.log("ChatGPT input focused");
  }
});
document.addEventListener("keydown", (e) => {
  if (!activeInput) return;
  if (e.key === "Enter" && !e.shiftKey) {
    const text = activeInput.innerText.trim();
    if (text.length === 0) return;
    console.log("Prompt submitted:", text);
  }
});