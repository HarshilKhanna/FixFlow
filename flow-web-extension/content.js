(function () {
    console.log("FixFlow Inspector Activated!");

    let highlightBox = document.createElement("div");
    highlightBox.style.position = "absolute";
    highlightBox.style.border = "2px solid red";
    highlightBox.style.pointerEvents = "none";
    highlightBox.style.zIndex = "999999";
    document.body.appendChild(highlightBox);


    const ws = new WebSocket("ws://localhost:5050");

    ws.onopen = () => console.log("Connected to FixFlow WebSocket");
    ws.onerror = (error) => console.error("WebSocket Error:", error);
    ws.onmessage = (event) => console.log("Message from VS Code:", event.data);

    document.addEventListener("mouseover", (event) => {
        let target = event.target;
        let rect = target.getBoundingClientRect();

        highlightBox.style.top = `${window.scrollY + rect.top}px`;
        highlightBox.style.left = `${window.scrollX + rect.left}px`;
        highlightBox.style.width = `${rect.width}px`;
        highlightBox.style.height = `${rect.height}px`;
    });

    document.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        let target = event.target;
        let elementInfo = {
            tag: target.tagName,
            id: target.id || "No ID",
            classes: target.classList.value || "No Classes",
            text: target.innerText.trim().slice(0, 50) || "No Text",
            styles: window.getComputedStyle(target).cssText
        };

        console.log("Sending Element Info:", elementInfo);

        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(elementInfo));
        } else {
            console.error("WebSocket not connected.");
        }
    });
})();
