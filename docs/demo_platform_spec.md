# Demo Platform Specification: MTCF "Glass Box" Experience

## 1. Concept & Vision
To sell the "MedTech Cognitive Foundry" (MTCF) to investors, sponsors, and engineers, we will build a **"Glass Box" Demo Platform**. This web application will not run a real competition but will **simulate** high-intensity moments of the MTCF ecosystem, visualizing the invisible mechanics of governance, bidding, and code racing.

**The Aesthetic**: "Clinical Cyberpunk."
*   **Base**: Sterilized Medical White/Grey (representing Regulation).
*   **Overlay**: Neon data streams (Cyan/Magenta) (representing Innovation).
*   **Metaphor**: A transparent, high-tech surgical theater where code is the patient.

## 2. Technical Stack
*   **Framework**: Next.js 14 (App Router) for SEO and performance.
*   **Styling**: Tailwind CSS with `shadcn/ui` components for rapid, premium UI.
*   **Animation**: `Framer Motion` for complex state transitions (crucial for "wow" factor).
*   **Diagrams**: `ReactFlow` for interactive node-based governance maps.
*   **Charts**: `Recharts` for real-time telemetry mockups.

## 3. Core Experience Modules (Pages)

### 3.1 The "Arena" (Live Stream Simulator)
A split-screen interface mimicking the "Pilot Episode" broadcast.
*   **Left Panel (The Stream)**: Placeholder for video (Twitch/YouTube embed).
*   **Right Panel (Telemetry)**:
    *   **Live Metrics**: Mocked real-time graphs showing "Commit Velocity" and "Unit Test Pass Rate" for 2 competing teams.
    *   **The Constraint Triangle**: A radar chart that pulses when a team violates a constraint (e.g., "Memory Limit Exceeded").
*   **Bottom Ticker**: A scrolling news ticker of "Sponsor Bids" and "Regulatory Interventions."

### 3.2 The "Governance Console" (Interactive Flow)
A visually stunning, interactive node graph explaining the regulatory safety net.
*   **Visual**: A `ReactFlow` diagram where the user drags a "Code Block" through various "Gates."
*   **Gates**:
    1.  **Ingest**: Synthetic Data Check.
    2.  **Process**: Audit Trail Logger.
    3.  **Output**: FDA Labeling & "Cooling Off" Lock.
*   **Interaction**: User tries to drag "Unsafe Code" (red block) and sees it rejected by the "Auto-Oracle" with a visual shield effect.

### 3.3 The "Marketplace" (Bidding Engine)
A gamified view of the "Pay-to-Procure" economy.
*   **Visual**: A "Stock Market" style dashboard for Rentable Teams.
*   **Elements**:
    *   **Team Cards**: Holographic-style cards showing stats: "Win Rate: 88%", "Safety Score: 99%".
    *   **Draft Simulation**: A button to "Place Bid". When clicked, it simulates a Vickrey Auction countdown and awards the team to the user.

## 4. User Journey (The "Pitch" Flow)
1.  **Landing**: Hero Section with 3D particles forming the MTCF logo. Tagline: "The Sport of Saving Lives."
2.  **The Problem**: Scroll-triggered animation shattering a "Old TPLC" monolith.
3.  **The Solution**: User enters the "Arena" (Simulated View).
4.  **The Proof**: User plays with the "Governance Console."
5.  **The Ask**: CTA to "Sponsor an Episode" or "Register a Team."

## 5. Implementation Roadmap (3 Days)
*   **Day 1**: Setup Next.js + Tailwind + `shadcn/ui`. Build the "Arena" layout.
*   **Day 2**: Implement `ReactFlow` for the Governance Console. Add `Framer Motion` transitions.
*   **Day 3**: Polish. Add "Glassmorphism" effects, mobile responsiveness, and deploy to Vercel.

## 6. Success Metrics for the Demo
*   **"Wow" Time**: User should see an animation within 3 seconds of load.
*   **Clarity**: User must understand "Regulation + Speed" within 30 seconds.
