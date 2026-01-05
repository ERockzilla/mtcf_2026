# Software Bill of Materials (SBOM)

This document lists the third-party components, libraries, and infrastructure anticipated for the MedTech Cognitive Foundry platform.

## Infrastructure & Cloud
*   **Cloud Provider**: AWS or Azure (Centralized VDI hosting).
*   **Virtual Desktop**: AWS WorkSpaces / Azure Virtual Desktop.
*   **Compute**: GPU Clusters (NVIDIA A100/H100 instances).

## AI & Machine Learning
*   **Large Language Models**:
    *   **Med-PaLM 2** (Google): Clinical reasoning.
    *   **CodeLlama / Codex**: Code generation.
*   **Frameworks**:
    *   **Project MONAI**: Medical imaging AI framework.
    *   **PyTorch / TensorFlow**: Deep learning backends.
*   **Vector Database**:
    *   **Pinecone** or similar: Managed vector store for RAG.

## Development Environment (The "Golden Image")
*   **IDE**: Visual Studio Code (VS Code).
*   **Languages**: Python 3.x.
*   **Package Management**: Pip / Conda.

## Broadcasting & Production
*   **Streaming Software**: OBS Studio (Open Broadcaster Software).
*   **Telemetry**: Custom dashboards (likely React/Next.js).

## Governance & Security
*   **Identity Management**: OAuth2 / SSO integration.
*   **Data Synthesis**: GANs / Diffusion Models (for synthetic data generation).
