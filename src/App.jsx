import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [promptCount, setPromptCount] = useState(0);

  useEffect(() => {
    // Guard for non-extension environments
    if (!chrome?.storage?.local) return;

    // Initial load
    chrome.storage.local.get(['promptCount'], (res) => {
      setPromptCount(res.promptCount ?? 0);
    });

    // Live updates
    const onChanged = (changes, area) => {
      if (area !== 'local') return;
      if (changes.promptCount) setPromptCount(changes.promptCount.newValue ?? 0);
    };
    chrome.storage.onChanged.addListener(onChanged);
    return () => chrome.storage.onChanged.removeListener(onChanged);
  }, []);


  return (
    <>
      <h1>Hi Noel was Here</h1>
      <p>Prompts this week: {promptCount}</p>
    </>
  );
}

export default App;