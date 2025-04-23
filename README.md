
# SpikeApp – Interactive SVG with React + TypeScript + D3.js

This project demonstrates how to load and interact with an SVG file using **React**, **TypeScript**, and **D3.js**. It allows users to **drag and reposition specific elements** (like drill bits or markers) within an SVG file. Ideal for visualizing seismic or geological data.

##  Project Overview

- **Framework**: [React](https://react.dev/)
- **Tooling**: [Vite](https://vitejs.dev/) + TypeScript
- **SVG Interaction**: [D3.js](https://d3js.org/) handles dragging behavior
- **Goal**: Make specific SVG elements (e.g., `path`, `ellipse`) draggable and log their new positions for potential backend API calls.




## Run Locally

Clone the project

```bash
  git clone https://github.com/Hina-Shahzad/spikeapp.git
```

Go to the project directory

```bash
  cd spikeapp
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## 🧰 Tech Stack

| Tool             | Description                                                                |
| ----------------- | ------------------------------------------------------------------ |
| React | UI framework |
| TypeScript | Static typing for JavaScript |
| Vite | Lightning-fast dev server and bundler |
| D3.js | Data-driven manipulation of SVG elements |
| ESLint | Linting for code quality |
| Prettier | Code formatting |


## Folder Structure
```
spikeapp/
├── public/
│   └── annotated_drillbit.svg      # The SVG file with draggable elements
├── src/
│   ├── App.tsx                     # Main layout component
│   ├── main.tsx                    # React entry point
│   └── InteractiveSVG.tsx          # SVG rendering and D3 interaction logic
├── .eslintrc.cjs                   # ESLint configuration
├── index.html                      # HTML template
├── package.json                    # Project metadata and scripts
├── tsconfig.json                   # TypeScript config
└── vite.config.ts                  # Vite configuration
```