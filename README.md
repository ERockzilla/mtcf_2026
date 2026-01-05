# MedTech Cognitive Foundry (MTCF) Demo

![MTCF Badge](https://img.shields.io/badge/Status-Operational-cyan) ![Security](https://img.shields.io/badge/Security-Hardened-green) ![Framework](https://img.shields.io/badge/Built%20With-Next.js%2014-black)

## 🌐 Vision: The Inspiration Engine
The **MTCF Demo** is a high-fidelity "Wizard of Oz" simulation platform designed to showcase the future of AI-driven medical governance and operations. It serves as a visual storytelling tool for the *"MedTech Cognitive Foundry"*, creating an immersive experience of a futuristic, automated medical ecosystem.

## 🚀 Key Features

### 1. Immersive 3D Visualization
- **Atomic Core Visualization**: A central 3D animated component representing the cognitive core of the system (Atom/Solar style).
- **Matrix Rain**: Dynamic background showing real-time data ingestion.
- **Responsive Animations**: Built with **Framer Motion** for smooth, futuristic transitions.

### 2. Live Simulation Arena
- **Multi-View Dashboard**: Switch between different active "Teams" (Alpha, Beta, Gamma) processing AI tasks.
- **Real-Time Telemetry**: Live charts showing system load, active nodes, and thermal status.
- **Oversight Mode**: Dedicated "Team Gamma" view for regulatory AI monitoring (simulated video feed).

### 3. Governance & Security
- **Interactive Graph**: A ReactFlow-powered network graph visualizing AI data pipelines and audit checkpoints.
- **Security Hardening**: Pre-configured `customHttp.yml` for AWS Amplify headers (HSTS, XSS Protection).
- **Easter Eggs**: Hidden developer tools (Secrets in Console, `/editor` route) to simulate a "hackable" layer.

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS, Lucide Icons
- **Animation**: Framer Motion
- **Visualization**: Recharts, ReactFlow
- **Deployment**: AWS Amplify

## 📦 Getting Started

### Local Development
1.  **Clone**: `git clone <repo>`
2.  **Install**: `npm install`
3.  **Run**: `npm run dev`
4.  **Access**: Open `http://localhost:3000`

### Secret Features
- **Developer Console**: Check F12 console for system boot logs.
- **Secure Editor**: Navigate to `/editor` to access the classified text editor.

## ☁️ Deployment (AWS Amplify)
This project is optimized for deployment on AWS Amplify with the domain `rockrun.systems`.

1.  **Push** code to GitHub `main` branch.
2.  **Connect** repository in AWS Amplify.
3.  **Verify** headers using `curl -I https://rockrun.systems`.

See [DEPLOY.md](./DEPLOY.md) for detailed instructions.

---
*MedTech Cognitive Foundry - Building the Future of Responsible AI*
