# 🧹 Remove Comments - VS Code Extension

A simple Visual Studio Code extension that removes **all comments** from the currently open file.  
Supports common programming languages like **JavaScript, TypeScript, C, C++, C#, Java, Python, Shell, YAML**, and more.

---

## ✨ Features

- Removes **single-line comments** (`//` or `#`).
- Removes **multi-line comments** (`/* ... */`).
- Works on the entire file in one command.
- Supports multiple languages (auto-detection with regex).
- Customizable keyboard shortcut.

---

## 🚀 Usage

1. Open any file in VS Code.
2. Press **Ctrl+Shift+P** → Search for **"Remove All Comments"**.
3. Or use the default shortcut:  
   **`Ctrl + Alt + C`** (Windows/Linux)  
   **`Cmd + Alt + C`** (Mac)

---

## 🛠 Installation

### From Marketplace (future)
Will be available soon on the [Visual Studio Marketplace](https://marketplace.visualstudio.com/).

### Manual (VSIX)
1. Download the `.vsix` file (see [Releases](./releases)).
2. In VS Code, press **Ctrl+Shift+P** → select **Extensions: Install from VSIX…**.
3. Pick the `.vsix` file to install.

Or via CLI:

```bash
code --install-extension remove-comments-0.0.1.vsix
