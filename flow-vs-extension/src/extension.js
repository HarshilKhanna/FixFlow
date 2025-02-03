const vscode = require("vscode");
const WebSocket = require("ws");

function activate(context) {
    console.log("🚀 FixFlow VS Code Extension Activated!");

    const ws = new WebSocket("ws://localhost:5050");

    ws.onopen = () => console.log("✅ Connected to FixFlow WebSocket");

    ws.onmessage = async (event) => {
        const elementInfo = JSON.parse(event.data);
        console.log("📩 Received in VS Code:", elementInfo);

        vscode.window.showInformationMessage("FixFlow: Received element details from browser!");

        const filePath = await findRelevantFile(elementInfo);

        if (filePath) {
            await openFileAndHighlight(filePath, elementInfo);
        } else {
            console.log("⚠️ Could not find the relevant file.");
        }
    };

    ws.onclose = () => console.log("❌ WebSocket disconnected");

    let disposable = vscode.commands.registerCommand("fixflow.start", () => {
        vscode.window.showInformationMessage("FixFlow extension is running!");
    });

    context.subscriptions.push(disposable);
}

async function findRelevantFile(elementInfo) {
    console.log("🔎 Searching for file related to:", elementInfo);
    return null; 
}

async function openFileAndHighlight(filePath, elementInfo) {
    console.log("📂 Opening file:", filePath);
    const doc = await vscode.workspace.openTextDocument(filePath);
    await vscode.window.showTextDocument(doc);
}

function deactivate() {}

module.exports = { activate, deactivate };
