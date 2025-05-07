
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

## Backend setup
1. ### Navigate to the Backend Directory

`` cd spikeapp/backend ``

2. ### Create a Virtual Environment
Run the following command to create a virtual environment. This keeps all your Python dependencies isolated.

```` python -m venv venv ````

3. ### Activate the Virtual Environment
For Windows (Command Prompt or PowerShell)

``venv\Scripts\activate``

For macOS/Linux (or Git Bash on Windows):

``source venv/bin/activate``

4. ### Install Backend Dependencies
Once the virtual environment is activated, install the required dependencies for the backend.

Make sure you have a requirements.txt file in the backend/ folder with the following content:
````
Flask==2.2.2
flask-cors==3.0.10
flask-cors==3.0.10
  ````

Now, install the dependencies:

``
pip install -r requirements.txt
``

5. ### Run the Flask Backend
Once the dependencies are installed, you can run the backend Flask server:
````
cd backend 
python app.py 
````

## Frontend setup
1. ### Open a New Terminal Window
2. ### Navigate to the Frontend Directory

````
cd spikeapp/frontend
````
3. ### Install Frontend dependencies
````
 npm install 
 ````

4. ### Start the Frontend Server
````
npm run dev
````
This will start the frontend at ````http://localhost:5173 ````


## 🧰 Tech Stack

| Tool             | Description                                                                |
| ----------------- | ------------------------------------------------------------------ |
| React | UI framework |
| TypeScript | Static typing for JavaScript |
| Vite | Lightning-fast dev server and bundler |
| D3.js | Data-driven manipulation of SVG elements |
| Flask |Python web framework for the backend |
| Flask-CORS | Cross-Origin Resource Sharing (CORS) support for the Flask server |
| ESLint | Linting for code quality |
| Prettier | Code formatting |


## Folder Structure
```
spikeapp/
├── backend/                           # Backend logic (e.g., Flask, FastAPI)
│   ├── app.py                         # Flask entry point for serving SVG and handling position updates
│   ├── gensvg.py                      # Core logic for SVG generation and coordinate management
│   └── requirements.txt               # Python dependencies for the backend
├── frontend/                          # Frontend React app
│   ├── public/                        # Public folder for static assets (like images, SVGs)
│   │   └── annotated_drillbit.svg     # The SVG file with draggable elements
│   ├── src/                           # All frontend source code
│   │   ├── App.tsx                    # Main layout component
│   │   ├── main.tsx                   # React entry point
│   │   ├── InteractiveSVG.tsx         # SVG rendering and D3 interaction logic
│   │   ├── services/                  # Service-related files (e.g., API calls, etc.)
│   │   │   ├── apiService.ts          # API service logic (e.g., fetching SVG, updating position)
│   │   ├── types/                     # TypeScript types for frontend
│   │   │   ├── api.ts                 # TypeScript types for API responses/requests (e.g., Position)
│   ├── .gitignore                     # Git ignore file for frontend
│   ├── index.html                     # HTML template for frontend
│   ├── package.json                   # Frontend project metadata and scripts
│   ├── tsconfig.json                  # TypeScript configuration for frontend
│   └── vite.config.ts                 # Vite configuration for frontend
├── .gitignore                         # Root-level Git ignore file (to ignore node_modules, logs, etc.)
├── README.md                          # Project readme for documentation


```

