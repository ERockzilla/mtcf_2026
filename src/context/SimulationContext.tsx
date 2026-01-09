"use client";

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";

export type Team = {
    id: string;
    name: string;
    velocity: number[]; // Last 10 data points
    score: number;
    status: 'active' | 'flagged' | 'winner' | 'disqualified';
    logs: string[];
};

export type Bid = {
    id: string;
    sponsor: string;
    amount: number;
    teamId: string;
    timestamp: string;
};

type SimulationContextType = {
    isActive: boolean;
    gameTime: number; // 0 to 60
    teams: Team[];
    bids: Bid[];
    viewerCount: number; // Live viewer count
    systemLogs: string[]; // High-speed system logs
    startSimulation: () => void;
    stopSimulation: () => void;
};

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

// Initial State for 5 Teams
const initialTeams: Team[] = [
    { id: 'alpha', name: 'Team Alpha', velocity: Array(10).fill(50), score: 80, status: 'active', logs: [] },
    { id: 'beta', name: 'Team Beta', velocity: Array(10).fill(45), score: 75, status: 'active', logs: [] },
    { id: 'gamma', name: 'Team Gamma', velocity: Array(10).fill(60), score: 85, status: 'active', logs: [] },
    { id: 'delta', name: 'Team Delta', velocity: Array(10).fill(30), score: 60, status: 'active', logs: [] },
    { id: 'epsilon', name: 'Team Epsilon', velocity: Array(10).fill(55), score: 70, status: 'active', logs: [] },
];

// Fictitious MedTech company sponsors
const SPONSORS = [
    'NovaSynth Medical',
    'HelixMed Systems',
    'Axiom BioTech',
    'Zenith Therapeutics',
    'Pulse Dynamics',
    'Cortex Neurotech',
    'Vantage MedDevices',
    'Stratos Healthcare',
];

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
    const [isActive, setIsActive] = useState(false);
    const [gameTime, setGameTime] = useState(0);
    const [teams, setTeams] = useState<Team[]>(initialTeams);
    const [bids, setBids] = useState<Bid[]>([]);
    const [viewerCount, setViewerCount] = useState(8500);
    const [systemLogs, setSystemLogs] = useState<string[]>([]);
    const router = useRouter();

    // Ref to access current teams without causing effect re-runs
    const teamsRef = useRef(teams);
    useEffect(() => { teamsRef.current = teams; }, [teams]);

    const startSimulation = () => {
        setIsActive(true);
        setGameTime(0);
        setTeams(initialTeams);
        setBids([]); // Reset bids
        setViewerCount(8500 + Math.floor(Math.random() * 2000)); // Reset viewer count with variance
        setSystemLogs([]);
        router.push('/arena');
    };

    const stopSimulation = () => {
        setIsActive(false);
        setGameTime(0);
        // We can clear logs or keep them
    };

    // BID GENERATOR - Creates new bids from fictitious sponsors with escalating prices
    useEffect(() => {
        let bidTimeout: NodeJS.Timeout;
        let bidCount = 0;

        const generateBid = () => {
            if (!isActive) return;

            const currentTeams = teamsRef.current;
            bidCount++;

            // Escalating bid amounts based on bid count (simulates auction heating up)
            let minAmount: number;
            let maxAmount: number;

            if (bidCount <= 5) {
                // Early phase: $50k - $100k
                minAmount = 50000;
                maxAmount = 100000;
            } else if (bidCount <= 12) {
                // Mid phase: $100k - $500k
                minAmount = 100000;
                maxAmount = 500000;
            } else if (bidCount <= 20) {
                // Hot phase: $500k - $1M
                minAmount = 500000;
                maxAmount = 1000000;
            } else {
                // Mega phase: $1M - $5M
                minAmount = 1000000;
                maxAmount = 5000000;
            }

            const amount = Math.floor(Math.random() * (maxAmount - minAmount)) + minAmount;

            const newBid: Bid = {
                id: `bid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                sponsor: SPONSORS[Math.floor(Math.random() * SPONSORS.length)],
                amount: amount,
                teamId: currentTeams[Math.floor(Math.random() * currentTeams.length)].name,
                timestamp: new Date().toLocaleTimeString(),
            };
            setBids(prev => [newBid, ...prev].slice(0, 15));

            // Faster bid frequency: 2-4 seconds
            bidTimeout = setTimeout(generateBid, 2000 + Math.random() * 2000);
        };

        if (isActive) {
            // First bid after 1.5 seconds
            bidTimeout = setTimeout(generateBid, 1500);
        }

        return () => clearTimeout(bidTimeout);
    }, [isActive]); // Removed teams from dependency array

    // VIEWER COUNT FLUCTUATION
    useEffect(() => {
        let viewerInterval: NodeJS.Timeout;
        if (isActive) {
            viewerInterval = setInterval(() => {
                setViewerCount(prev => {
                    // Trend upward slightly with random fluctuation
                    const change = Math.floor(Math.random() * 300) - 100;
                    const newCount = prev + change;
                    // Keep between 5000 and 50000
                    return Math.max(5000, Math.min(50000, newCount));
                });
            }, 3000);
        }
        return () => clearInterval(viewerInterval);
    }, [isActive]);

    // HIGH SPEED LOG GENERATOR (100ms)
    useEffect(() => {
        let logInterval: NodeJS.Timeout;
        if (isActive) {
            logInterval = setInterval(() => {
                const codeSnippets = [
                    "executing_routine(0x4F3A)...",
                    "allocating_tensor_memory[GPU_0]: 4096MB",
                    "optimizing_weights: loss=0.0342 learning_rate=0.001",
                    "sync_db_shard(us-east-1): committed 450 records",
                    "invoking_lambda: 'process-patient-metrics' (12ms)",
                    "secure_handshake: transmitting 256-bit AES key...",
                    "analyzing_graph: detected cycle in nodes [A -> B -> A]",
                    "governance_check: HIPAA_COMPLIANCE_PASS",
                    "rendering_frame: viewport size 1920x1080 (60fps)",
                    "network_ingress: 1.2 GB/s detected from endpoint /api/v1/stream",
                    "cache_miss: fetching from generic_bucket_s3...",
                    "rebalancing_load: node-7 overload, shifting traffic to node-3",
                    "compiling_wasm: optimization_level=3 target=browser",
                    "anomaly_detection: false_positive rate < 0.01%",
                    "deploying_hotfix: patch v2.1.4 applied successfully"
                ];
                const randomLog = `[SYSTEM] ${codeSnippets[Math.floor(Math.random() * codeSnippets.length)]}`;

                // Keep last 50 logs
                setSystemLogs(prev => [randomLog, ...prev].slice(0, 50));
            }, 100); // 100ms = 10 logs per second (fast)
        }
        return () => clearInterval(logInterval);
    }, [isActive]);

    // The Game Loop (1s Tick) - Scoring & Stats
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && gameTime < 60) {
            interval = setInterval(() => {
                setGameTime((prev) => prev + 1);

                // Update Teams Logic with Scripted Lead Changes
                setTeams((prevTeams) => prevTeams.map(team => {
                    // Generate realistic system log (Team specific)
                    const logTypes = [
                        `[${team.id.toUpperCase()}] Container k8s-pod-${Math.random().toString(36).substring(2, 6)} scaled to 3 replicas`,
                        `[${team.id.toUpperCase()}] GPU cluster us-east-2a allocated 8x A100`,
                        `[${team.id.toUpperCase()}] Model checkpoint saved: /mnt/models/v${gameTime}.pt`,
                        `[${team.id.toUpperCase()}] Inference latency: ${(50 + Math.random() * 30).toFixed(1)}ms avg`,
                        `[${team.id.toUpperCase()}] Database sync: 1.2M rows committed`,
                        `[${team.id.toUpperCase()}] Network egress: ${(Math.random() * 500 + 100).toFixed(0)} Mbps`,
                    ];

                    const shouldLog = Math.random() > 0.6;
                    // We can also add these team logs to the main systemLogs if desired, 
                    // but for now they stay on the team object for individual display if needed.
                    // Actually, let's push them to systemLogs too for the "Master Log" view.
                    const newLog = shouldLog ? logTypes[Math.floor(Math.random() * logTypes.length)] : null;

                    if (newLog) {
                        setSystemLogs(prev => [newLog, ...prev].slice(0, 50));
                    }

                    // ====== SCRIPTED LEAD CHANGES ======
                    // These create dramatic position swaps at specific times
                    let scoreBoost = 0;
                    let boostLog: string | null = null;

                    // T+8s: Beta surges ahead
                    if (gameTime === 8 && team.id === 'beta') {
                        scoreBoost = 15;
                        boostLog = `[${team.id.toUpperCase()}] 🚀 BREAKTHROUGH: Novel algorithm deployed!`;
                    }
                    // T+15s: Epsilon takes the lead
                    if (gameTime === 15 && team.id === 'epsilon') {
                        scoreBoost = 20;
                        boostLog = `[${team.id.toUpperCase()}] 🚀 BREAKTHROUGH: Patent-pending technique activated!`;
                    }
                    // T+22s: Alpha recovers
                    if (gameTime === 22 && team.id === 'alpha') {
                        scoreBoost = 18;
                        boostLog = `[${team.id.toUpperCase()}] 🚀 BREAKTHROUGH: Emergency optimization complete!`;
                    }
                    // T+30s: Gamma makes a comeback
                    if (gameTime === 30 && team.id === 'gamma') {
                        scoreBoost = 22;
                        boostLog = `[${team.id.toUpperCase()}] 🚀 BREAKTHROUGH: Infrastructure upgrade live!`;
                    }
                    // T+38s: Delta surprise surge
                    if (gameTime === 38 && team.id === 'delta') {
                        scoreBoost = 25;
                        boostLog = `[${team.id.toUpperCase()}] 🚀 BREAKTHROUGH: Secret weapon deployed!`;
                    }
                    // T+45s: Beta strikes again
                    if (gameTime === 45 && team.id === 'beta') {
                        scoreBoost = 15;
                        boostLog = `[${team.id.toUpperCase()}] 🚀 BREAKTHROUGH: Final push initiated!`;
                    }
                    // T+52s: Final showdown - random leader
                    if (gameTime === 52) {
                        // Randomizer
                        scoreBoost = Math.floor(Math.random() * 30);
                    }

                    if (boostLog) {
                        setSystemLogs(prev => [boostLog!, ...prev].slice(0, 50));
                    }

                    // Update Velocity and Score
                    const newVelocity = [...team.velocity.slice(1), 50 + scoreBoost + Math.random() * 20 - 10];
                    return {
                        ...team,
                        velocity: newVelocity,
                        score: team.score + (scoreBoost > 0 ? scoreBoost : Math.random() > 0.5 ? 1 : 0),
                        logs: newLog ? [newLog, ...team.logs].slice(0, 10) : team.logs
                    };
                }));

            }, 1000);
        } else if (gameTime >= 60) {
            // End Game
            setTeams(prev => prev.map(t => ({ ...t, status: 'winner' }))); // Simplified winner logic
        }

        return () => clearInterval(interval);
    }, [isActive, gameTime]);

    return (
        <SimulationContext.Provider value={{ isActive, gameTime, teams, bids, viewerCount, systemLogs, startSimulation, stopSimulation }}>
            {children}
        </SimulationContext.Provider>
    );
};

export const useSimulation = () => {
    const context = useContext(SimulationContext);
    if (context === undefined) {
        throw new Error("useSimulation must be used within a SimulationProvider");
    }
    return context;
};
