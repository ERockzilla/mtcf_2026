"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
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

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
    const [isActive, setIsActive] = useState(false);
    const [gameTime, setGameTime] = useState(0);
    const [teams, setTeams] = useState<Team[]>(initialTeams);
    const [bids, setBids] = useState<Bid[]>([]);
    const router = useRouter();

    const startSimulation = () => {
        setIsActive(true);
        setGameTime(0);
        setTeams(initialTeams);
        setBids([]); // Reset bids
        router.push('/arena');
    };

    const stopSimulation = () => {
        setIsActive(false);
        setGameTime(0);
    };

    // The Game Loop (1s Tick)
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && gameTime < 60) {
            interval = setInterval(() => {
                setGameTime((prev) => prev + 1);

                // Update Teams Logic with Scripted Lead Changes
                setTeams((prevTeams) => prevTeams.map(team => {
                    // Generate realistic system log
                    const logTypes = [
                        `[${team.id.toUpperCase()}] Container k8s-pod-${Math.random().toString(36).substring(2, 6)} scaled to 3 replicas`,
                        `[${team.id.toUpperCase()}] GPU cluster us-east-2a allocated 8x A100`,
                        `[${team.id.toUpperCase()}] Model checkpoint saved: /mnt/models/v${gameTime}.pt`,
                        `[${team.id.toUpperCase()}] Inference latency: ${(50 + Math.random() * 30).toFixed(1)}ms avg`,
                        `[${team.id.toUpperCase()}] Database sync: 1.2M rows committed`,
                        `[${team.id.toUpperCase()}] Network egress: ${(Math.random() * 500 + 100).toFixed(0)} Mbps`,
                    ];

                    const shouldLog = Math.random() > 0.6;
                    const newLog = shouldLog ? logTypes[Math.floor(Math.random() * logTypes.length)] : null;

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
                        const finalBoostTeams = ['alpha', 'gamma', 'epsilon'];
                        if (finalBoostTeams.includes(team.id)) {
                            scoreBoost = Math.random() * 20;
                        }
                    }

                    // Random fluctuation (larger swings: ±5 instead of ±1)
                    const randomChange = (Math.random() * 10 - 5);

                    // Event Scripting (T+10s: Gamma gets flagged)
                    const isFlagEvent = gameTime === 10 && team.id === 'gamma';
                    const flagLog = isFlagEvent ? `[ALERT] Policy Engine: Unauthorized data access detected` : null;

                    // Clamp score between 0-100
                    const newScore = Math.min(100, Math.max(0, team.score + randomChange + scoreBoost));

                    return {
                        ...team,
                        velocity: [...team.velocity.slice(1), Math.max(0, team.velocity[9] + (Math.random() * 15 - 7))],
                        score: newScore,
                        status: isFlagEvent ? 'flagged' : team.status,
                        logs: [...team.logs, newLog, boostLog, flagLog].filter(Boolean).slice(-5) as string[]
                    };
                }));

                // Random Bid Generation (20% chance per tick)
                if (Math.random() > 0.8) {
                    const sponsors = ["Pfizer", "J&J", "Medtronic", "Google Health", "Neuralink"];
                    const randomTeam = initialTeams[Math.floor(Math.random() * initialTeams.length)];
                    const newBid: Bid = {
                        id: Math.random().toString(36).substring(7),
                        sponsor: sponsors[Math.floor(Math.random() * sponsors.length)],
                        amount: Math.floor(Math.random() * 50) * 1000 + 10000, // $10k - $60k
                        teamId: randomTeam.name,
                        timestamp: new Date().toLocaleTimeString()
                    };
                    setBids(prev => [newBid, ...prev].slice(0, 5)); // Keep last 5
                }

            }, 1000);
        } else if (gameTime >= 60) {
            setIsActive(false); // Game Over
        }
        return () => clearInterval(interval);
    }, [isActive, gameTime]);

    return (
        <SimulationContext.Provider value={{ isActive, gameTime, teams, bids, startSimulation, stopSimulation }}>
            {children}
        </SimulationContext.Provider>
    );
};

export const useSimulation = () => {
    const context = useContext(SimulationContext);
    if (!context) throw new Error("useSimulation must be used within a SimulationProvider");
    return context;
};
