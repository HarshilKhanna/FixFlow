const vscode = require("vscode");
const WebSocket = require("ws");

// Start WebSocket server
const wss = new WebSocket.Server({ port: 8765 });

function activate(context) {
    console.log("FixFlow extension is activated");

    let disposable = vscode.commands.registerCommand("fixflow.openBug", (data) => {
        const filePath = vscode.Uri.file(vscode.workspace.rootPath + "/" + data.file);
        vscode.workspace.openTextDocument(filePath).then((doc) => {
            vscode.window.showTextDocument(doc).then((editor) => {
                let range = new vscode.Range(data.line - 1, 0, data.line - 1, 100);
                editor.selection = new vscode.Selection(range.start, range.end);
                vscode.commands.executeCommand("revealLine", { lineNumber: data.line - 1, at: "center" });
            });
        });
    });

    context.subscriptions.push(disposable);

    wss.on("connection", (ws) => {
        ws.on("message", (message) => {
            let data = JSON.parse(message);
            vscode.window.showInformationMessage(`FixFlow: Received ${data.selector} at ${data.file}:${data.line}`);

            // Open the file and highlight the line
            vscode.commands.executeCommand("fixflow.openBug", data);
        });
    });
}

function deactivate() {
    wss.close();
}

module.exports = { activate, deactivate };
