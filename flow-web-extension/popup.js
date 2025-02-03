document.getElementById("activate").addEventListener("click", () => {
    // Get the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.log('Tabs:', tabs);

        if (tabs.length > 0) {
            const tab = tabs[0];
            console.log('Tab ID:', tab.id); // Log the tab ID
            
            if (tab.id) {
                // Send message to background.js to inject script
                chrome.runtime.sendMessage({
                    action: 'injectScript',
                    tabId: tab.id
                }, (response) => {
                    console.log("Script injected successfully.");
                });
            } else {
                console.error('tab.id is missing!');
            }
        } else {
            console.error("No active tab found.");
        }
    });
});