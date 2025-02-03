const ws = new WebSocket("ws://localhost:5050");

ws.onopen = () => console.log("✅ Connected to FixFlow WebSocket");

document.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const element = event.target;

    const elementInfo = {
        tag: element.tagName,
        id: element.id || null,
        classes: element.className || null,
        text: element.innerText || null,
        styles: window.getComputedStyle(element).cssText || null
    };

    console.log("🖱️ Element Clicked:", elementInfo);

    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(elementInfo));
        console.log("🚀 Sent to VS Code:", elementInfo);
    } else {
        console.error("❌ WebSocket not open. Could not send data.");
    }
});
