# CSS Previewer – Prototype VSCode Extension

A lightweight VSCode extension to preview individual CSS/SCSS class rules in real-time. Best suited for atomic CSS styles or isolated classes.

⚠️ Note: Due to the cascading nature of CSS, styles influenced by other files/selectors may not be fully represented.

## Demo
![Demo gif](https://github.com/HovSyan/css-preview/demo/demo.gif)

## Features:
- Parse .css and .scss files
- Extract selectors and rules
- Webview preview of selected class
- Enable/disable from command palette

## Limitations / Known Issues:

- No support for CSS imports, global rules, or variable resolution
- Doesn’t compile full SCSS context
- Not accurate for deeply nested or overwritten styles