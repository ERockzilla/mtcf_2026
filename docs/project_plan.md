# Project Development Plan: MTCF Launch

## overview
This plan outlines the aggressive 14-day strategy to launch the MedTech Cognitive Foundry (MTCF) Pilot Episode. The goal is to achieve a Minimum Viable Experience (MVE).

## Phase 1: Infrastructure and Governance (Days 1-7)

### Day 1: Governance Setup
*   **Recruit Interim Steering Committee**: Secure 1 MD, 1 FDA expert, and 1 Tech Lead.
*   **Legal**: Draft "Participant Agreement" (IP assignment, "Safe Sandbox" rules).

### Day 2: Infrastructure Provisioning
*   **VDI Cluster**: Deploy AWS Workspaces/AppStream for remote desktops.
*   **Golden Image Creation**:
    *   OS: Ubuntu/Windows Server.
    *   IDE: VS Code.
    *   AI Tools: Med-PaLM 2 API SDK, Project MONAI.

### Day 3: Sponsor Acquisition
*   **Target**: Secure one "Anchor Sponsor" (Tier 1).
*   **Value Prop**: Free R&D + Marketing visibility.
*   **Action**: Define the first "Clinical Challenge" (e.g., Lung Nodule Segmentation).

### Day 4: Platform Logic Implementation
*   **Constraint Triangle**: Define specific metrics for Clinical, Regulatory, and Technical constraints.
*   **Testing Harness**: Hard-code the automated testing scripts (Python/PyTest) for the challenge.

### Day 5: Recruitment ("Call for Heroes")
*   **Channels**: Kaggle, GitHub, MedTech forums.
*   **Target**: 8 Teams (approx. 32 Engineers).
*   **Messaging**: "Prove your skills, Win Contracts."

### Day 6: Vetting
*   **Process**: "Speed Vetting" based on GitHub history and team cohesion.
*   **Identity**: Verify identities for legal IP transfer.

### Day 7: Dry Run (Technical Stress Test)
*   **Action**: Internal team runs a 30-minute sprint.
*   **Focus**: Test VDI latency, screen capture, and OBS broadcasting integration.

## Phase 2: Hype and Execution (Days 8-14)

### Day 8: Marketing Blitz
*   **Release**: "Teaser Data" (small subset of synthetic data).
*   **Announce**: Judges and Sponsors.
*   **Ads**: Reddit (r/MachineLearning, r/MedicalDevices).

### Day 9: Onboarding
*   **Access**: Grant VDI credentials to teams.
*   **Education**: Mandatory "Regulatory Orientation" webinar.

### Day 10: Ad/Bidding Setup
*   **Portal**: Open Sponsor Portal for ad slots.
*   **Workaround**: Use manual sealed-bid process if auction engine is not ready.

### Day 11: Content & Production
*   **Pre-production**: Record "Expert Commentary" segments to explain medical context.
*   **Assets**: Prepare overlays and transition graphics for the stream.

### Day 12: The Weigh-In (Hype Building)
*   **Stream**: Live "Team Introductions."
*   **Stats**: Publish team stats/predictions to build rivalry.

### Day 13: Code Freeze
*   **Platform**: Lock down platform code.
*   **Verification**: Verify "Reset" scripts and security of the "Safe Sandbox."

### Day 14: THE LAUNCH
*   **19:00 EST**: Live Stream Begins.
*   **Event**: The Race (2 hours).
*   **Goal**: Achieve a **"Vertical Slice" Prototype** (Functional Happy Path).
*   **Post-Event**: 72-hour "Open Proposal" window opens immediately.

## Realistic Expectations (Capacity Check)
*   **Human Teams (400 hrs)**: Expect a high-fidelity "Demo" with minimal backend robustness.
*   **AI-Augmented Teams**: Expect "Functional Ugly" code with high test coverage and documentation density.
*   **The Target**: The "Hybrid" output—polished UI backed by AI-generated robustness.
