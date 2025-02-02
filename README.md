# FixFlow

FixFlow is a developer tool that streamlines debugging by linking UI bug identification to source code navigation. It consists of a **browser extension** for selecting buggy elements and a **VS Code extension** that navigates to the corresponding code, all powered by **real-time WebSocket communication**.

## 🚀 Features
- Select UI elements in the browser to identify bugs
- Automatically locate corresponding code in VS Code
- Seamless real-time communication via WebSockets
- Supports modern web frameworks like React, Angular, and Vue

## 🛠️ Installation

### **1. Browser Extension**
1. Clone the repository:  
   ```sh
   git clone (https://github.com/HarshilKhanna/FixFlow.git)
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer Mode** (toggle in the top right corner)
4. Click **Load Unpacked** and select the `/browser-extension` folder

### **2. VS Code Extension**
1. Navigate to the `/vscode-extension` folder:
   ```sh
   cd fixflow/vscode-extension
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the extension in VS Code:
   ```sh
   npm run start
   ```

## 🖥️ Usage
1. Open a webpage and select a buggy UI element using the FixFlow **browser extension**.
2. The element’s metadata is sent via WebSocket to the **VS Code extension**.
3. VS Code automatically opens the relevant file and highlights the code section.
4. Edit and fix the bug efficiently without searching through large codebases!

## ⚡ Tech Stack
- **Node.js** – WebSocket Server
- **Chrome DevTools API** – UI Element Selection
- **VS Code Extension API** – Code Navigation
- **WebSockets** – Real-time Communication

## 📌 Roadmap
- [ ] Improve UI element-to-code mapping
- [ ] Enhance multi-framework compatibility
- [ ] Add support for additional IDEs (e.g., JetBrains)

## 📄 License
This project is licensed under the **MIT License**.

---

🚀 **FixFlow** makes debugging seamless by minimizing time spent navigating code! Happy debugging! 🎯

