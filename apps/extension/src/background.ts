// Cuttoso Background Service Worker

chrome.runtime.onInstalled.addListener(() => {
  console.log("[Cuttoso] Extension installed");

  // Set default settings
  chrome.storage.sync.set({
    enabled: true,
    baseUrl: "http://localhost:3000",
  });
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "GET_SETTINGS") {
    chrome.storage.sync.get(["enabled", "baseUrl"], (result) => {
      sendResponse(result);
    });
    return true; // Keep channel open for async response
  }

  if (message.type === "SET_SETTINGS") {
    chrome.storage.sync.set(message.settings, () => {
      sendResponse({ success: true });
    });
    return true;
  }
});
