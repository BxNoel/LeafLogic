(() => {
    const originalFetch = window.fetch;
  
    window.fetch = async function (...args) {
      try {
        const [input, init] = args;
        const url = typeof input === "string" ? input : input?.url;
        
        if (
          url &&
          url === "https://chatgpt.com/backend-api/f/conversation"
        ) {
          window.postMessage(
            { type: "LEAFLOGIC_PROMPT_SENT" },
            "*"
          );
        }
      } catch (e) {
        console.error("Error in fetch hook:", e);
      }
  
      return originalFetch.apply(this, args);
    };
  })();
  