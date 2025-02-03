const vscode = require("vscode");

function createSidebar(context) {
    const panel = vscode.window.createWebviewPanel(
        "fixflowSidebar",
        "FixFlow Bug Tracker",
        vscode.ViewColumn.Two,
        { enableScripts: true }
    );

    panel.webview.html = getWebviewContent();
}

function getWebviewContent() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>FixFlow</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 10px; }
                button { width: 100%; padding: 10px; margin: 5px 0; border: none; background-color: #007acc; color: white; font-size: 16px; cursor: pointer; }
                button:hover { background-color: #005fa3; }
            </style>
        </head>
        <body>
            <h1>FixFlow Debugging</h1>
            <ul id="bugList"></ul>
            <script>
                const vscode = acquireVsCodeApi();
                window.addEventListener("message", (event) => {
                    const bugList = document.getElementById("bugList");
                    const li = document.createElement("li");
                    li.textContent = event.data.selector + " - " + event.data.file + ":" + event.data.line;
                    li.onclick = () => {
                        vscode.postMessage(event.data);
                    };
                    bugList.appendChild(li);
                });
            </script>
        </body>
        </html>
    `;
}

module.exports = { createSidebar };
