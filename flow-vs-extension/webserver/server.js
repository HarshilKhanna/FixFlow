const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8765 });

wss.on("connection", (ws) => {
    console.log("FixFlow WebSocket connected");

    ws.on("message", (message) => {
        console.log("Received:", message);
    });

    ws.on("close", () => {
        console.log("FixFlow WebSocket disconnected");
    });
});
