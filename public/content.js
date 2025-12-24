// Confirming script injection
console.log("LeafLogic content script loaded");
const day = getDayOfWeek();

injectFetchHook();
// Function to increment prompt count in chrome storage
async function incrementPromptCount() {
  if (!chrome.runtime?.id) return;
  const day = getDayOfWeek();
  const DAY_KEY = `${day}_promptCount`;
  try {
    const res = await chrome.storage.local.get(["promptCount", DAY_KEY]);
    const TOTAL_PROMPT_COUNT = (res.promptCount || 0) + 1;
    const DAY_PROMPT_COUNT = (res[DAY_KEY] || 0) + 1;
    await chrome.storage.local.set({
      promptCount: TOTAL_PROMPT_COUNT,
      [DAY_KEY]: DAY_PROMPT_COUNT
    });
  } catch (err) {
    console.debug("Storage update skipped:", err);
  }
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
  const HTML_ELEMENT = e.target;
  if (HTML_ELEMENT && HTML_ELEMENT.id === "prompt-textarea") {
    activeInput = HTML_ELEMENT;
    if (!HTML_ELEMENT.__llBound) {
      HTML_ELEMENT.__llBound = true;
      HTML_ELEMENT.addEventListener("input", () => {
        const text = HTML_ELEMENT.textContent?.trim() || "";
        // SEND THIS MESSAGE to catch in react app  --> window.postMessage({ type: "LEAFLOGIC_INPUT_UPDATE", text }, "*");
      });
    }
  }
});

document.addEventListener("keydown", async (e) => {
  if (!activeInput) return;
  //Should allow for new-line char inserts with shift+enter
  if (e.key === "Enter" && e.shiftKey) return;
  if (e.key === "Enter" && !e.shiftKey) {
    const text = activeInput.innerText.trim();
    if (text.length === 0) return;
    console.log("Prompt submitted:", text);
    //TODO: Cache the prompt with the current chat URL into local storage
    const URL = await getStableChatUrl();
    let PROMPT = text;
    try {
      cachePrompt(PROMPT, URL);
    } catch (err) {
      console.debug("Storage update skipped:", err);
    }
  }
});
