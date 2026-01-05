# MTCF "Inspiration Engine" - Installation & Deployment Guide

This guide details how to run the MedTech Cognitive Foundry (MTCF) Demo locally and prepare it for a "Wizard of Oz" style live broadcast.

## 1. Prerequisites
*   **Node.js**: Version 18.17 or later.
*   **npm**: Installed with Node.js.
*   **Git**: For version control.
*   **OBS Studio** (Optional): For broadcasting the demo.

## 2. Local Installation
1.  **Clone the Repository** (if not already local):
    ```bash
    git clone <repo-url>
    cd mtcf-demo
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    # Installs Next.js 14, Tailwind, Framer Motion, Recharts, ReactFlow, Lucide Icons
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    *   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 3. Configuration & Customization
### Simulation Logic
*   **Game Clock**: Modify `src/context/SimulationContext.tsx` to change the 60-second timer.
*   **Event Script**: Edit the random event triggers inside the `useEffect` loop in `SimulationContext.tsx`.

### Visual Assets
*   **Video Feeds**: The demo uses videos and images in `public/`.
*   **Live Stream Rotation**: The main video feed cycles every 10 seconds. You can adjust this interval in `src/app/arena/page.tsx`.

## 4. "Wizard of Oz" Broadcast Setup (OBS)
To stream this as a "Live Pilot":

1.  **Open OBS Studio**.
2.  **Add Source** -> **Browser**.
3.  **URL**: `http://localhost:3000/arena`
4.  **Width/Height**: 1920 x 1080.
5.  **Interact**: Right-click the source -> "Interact" to click buttons or change tabs during the stream.

## 5. Manual Deployment (AWS Amplify)
The user prefers to manually push code and deploy to AWS Amplify.

1.  **Push to GitHub**:
    *   Ensure your local changes are committed and pushed to your GitHub repository.
    ```bash
    git add .
    git commit -m "Ready for deploy"
    git push origin main
    ```

2.  **Deploy on AWS Amplify**:
    *   Log in to the [AWS Management Console](https://console.aws.amazon.com/).
    *   Go to **AWS Amplify**.
    *   Click **Create new app** -> **Host web app**.
    *   Select **GitHub** as the source provider and continue.
    *   Authorize AWS to access your GitHub repositories.
    *   Select the `mtcf-demo` repository and the `main` branch.
    *   **Build Settings**: Amplify automatically detects Next.js settings. Click **Next**.
    *   **Review & Save**: Click **Save and deploy**.

3.  **Scale (Optional)**:
    *   Once deployed, Amplify provides a global CDN (CloudFront) automatically.
    *   You can assign a custom domain in the "Domain management" section.

## 6. Security Headers (Amplify)
The project includes a `customHttp.yml` file in the root. AWS Amplify automatically detects this file to apply security headers (HSTS, XSS Protection) and custom theme headers. No manual action is required if this file is in the repository.

## 7. Troubleshooting
*   **"Module not found"**: Ensure you are in the `mtcf-demo` directory.
*   **Hydration Error**: Often caused by random numbers generated during server-side rendering. The simulation uses deterministic initial state where possible, but check `useEffect` hooks if issues arise.
