// Confirming script injection
console.log("LeafLogic content script loaded");
const day = getDayOfWeek();
console.log(`Today is ${day}`);

injectFetchHook();
// Function to increment prompt count in chrome storage
function incrementPromptCount() {
  const day = getDayOfWeek();
  const DAY_KEY = `${day}_promptCount`;

  chrome.storage.local.get(["promptCount", DAY_KEY], (res) => {
    const TOTAL_PROMPT_COUNT = (res.promptCount || 0) + 1;
    const DAY_PROMPT_COUNT = (res[DAY_KEY] || 0) + 1;

    chrome.storage.local.set({
      promptCount: TOTAL_PROMPT_COUNT,
      [DAY_KEY]: DAY_PROMPT_COUNT
    });
  });
}

console.log("safelt injected fetch hook");  
// indicating that a prompt has been sent.
window.addEventListener("message", (event) => {
  if (event.data?.type && event.data.type === "LEAFLOGIC_PROMPT_SENT") {
    incrementPromptCount();
  }
});

//Use this later to cache prompts to certaint links. We dont really need to make a new anything here for us, 
// This will be handled by the popup when we want to view saved prompts for certain links.
// Need to think of a way to limit it to just 100 tho...
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