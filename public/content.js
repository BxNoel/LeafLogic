// Confirming script injection
console.log("LeafLogic content script loaded");

// Initialize count if missing
chrome.storage.local.get(["promptCount"], (res) => {
  if (typeof res.promptCount === "undefined") {
    chrome.storage.local.set({ promptCount: 0 });
  }
});

function incrementPromptCount() {
  // Simple get->set; low frequency so races are unlikely
  chrome.storage.local.get(["promptCount"], (res) => {
    const next = (res.promptCount || 0) + 1;
    chrome.storage.local.set({
      promptCount: next,
      lastPromptAt: Date.now()
    });
    console.log("THIS IS THE counter for :: prompt submitted:", next);
  });
}

// De-dupe double fires (e.g., Enter + click) within 500ms
let lastIncAt = 0;
function safeIncrement() {
  const now = Date.now();
  if (now - lastIncAt < 500) return;
  lastIncAt = now;
  incrementPromptCount();
}

// Helpers
function isComposerActive(el) {
  if (!el) return false;
  if (el.tagName === "TEXTAREA") return true;
  const ce = el.getAttribute && el.getAttribute("contenteditable");
  return ce === "" || ce === "true";
}

// Detect Enter key submissions (textarea or contenteditable)
document.addEventListener("keydown", (e) => {
  if (e.isComposing) return; // IME guard
  if (e.key !== "Enter") return;
  if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return;

  const el = document.activeElement;
  if (isComposerActive(el)) {
    safeIncrement();
  }
}, true);

// Detect send button clicks via capture-phase delegation
// Covers multiple possible attributes ChatGPT may use
const SEND_BUTTON_SELECTOR = [
  "#composer-submit-button",
  'button[data-testid="send-button"]',
  'button[aria-label="Send message"]',
  'button[aria-label="Send"]',
  'button[aria-label^="Send"]'
].join(", ");

document.addEventListener("click", (e) => {
  const target = e.target instanceof Element ? e.target : null;
  if (!target) return;
  const btn = target.closest("button");
  if (btn && btn.matches(SEND_BUTTON_SELECTOR)) {
    safeIncrement();
  }
}, true);

// Also catch form submits if present (some UIs wrap the composer in a form)
document.addEventListener("submit", () => {
  safeIncrement();
}, true);

// Optional: debug to confirm selector visibility
// setTimeout(() => {
//   console.log("Send button present?",
//     !!document.querySelector(SEND_BUTTON_SELECTOR));
// }, 2000);