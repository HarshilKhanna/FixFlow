const ws = new WebSocket("ws://localhost:8765");

ws.onopen = () => {
    console.log("Connected to FixFlow WebSocket");
    // Now you can send messages
};

ws.onmessage = (event) => {
    console.log("Received from VS Code:", event.data);
};

// Prevent sending while WebSocket is not open
function sendMessage(message) {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
    } else {
        console.error("WebSocket not open, cannot send message.");
    }
}

chrome.runtime.onInstalled.addListener(() => {
    console.log('FixFlow Extension Installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'injectScript') {
        // Handle script injection
        chrome.scripting.executeScript({
            target: { tabId: message.tabId },
            func: () => alert("Click on the buggy element!")
        }).then(() => {
            console.log("Script injected successfully.");
        }).catch((error) => {
            console.error("Error executing script:", error);
        });

        // Example of sending message over WebSocket
        sendMessage("Inject script triggered");
    }
});