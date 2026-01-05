"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { TriangleAlert, Terminal, Activity, Shield, Cpu, Play, Home } from "lucide-react";
import dynamic from 'next/dynamic';
import { useSimulation } from "@/context/SimulationContext";

const GovernanceGraph = dynamic(() => import('@/components/GovernanceGraph'), { ssr: false });
const SolarSystem3D = dynamic(() => import('@/components/SolarSystem3D'), { ssr: false });

export default function ArenaPage() {
    const router = useRouter();
    const { isActive, teams, bids, gameTime, stopSimulation } = useSimulation();
    const [timeLeft, setTimeLeft] = useState(7200);
    const [focusedIndex, setFocusedIndex] = useState(2);

    // Determine Winner (Highest Score)
    const winner = [...teams].sort((a, b) => b.score - a.score)[0];

    // Handle Return to Hub
    const handleReturnToHub = () => {
        stopSimulation();
        router.push('/');
    };

    // Cycle Camera Feed every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setFocusedIndex((prev) => (prev + 1) % 5);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    // Asset Map
    const teamAssets = [
        { id: 'alpha', name: 'Team Alpha', type: 'video', src: '/Generating_Faceless_Coder_Video_Content.mp4' },
        { id: 'beta', name: 'Team Beta', type: 'image', src: '/team1.png' },
        { id: 'gamma', name: 'Team Gamma', type: 'video', src: '/Team_Gamma_Sci_Fi_Robot_Video.mp4' },
        { id: 'delta', name: 'Team Delta', type: 'image', src: '/team2.png' },
        { id: 'epsilon', name: 'Team Epsilon', type: 'image', src: '/team3.png' },
    ];

    // Derive Logs from Teams
    const logs = teams.flatMap((t: any) => t.logs).slice(-10).reverse();

    // Create Chart Data on the Fly (Simplified for Demo)
    // In a real app, you'd keep a history buffer in Context
    const velocityData = Array.from({ length: 10 }, (_, i) => {
        const point: any = { time: i };
        teams.forEach((t: any) => point[t.id] = t.velocity[i]);
        return point;
    });

    // Transform for Radar Chart
    const constraintData = [
        { subject: 'Clinical', A: teams[0]?.score || 0, B: teams[1]?.score || 0, fullMark: 100 },
        { subject: 'Regulatory', A: (teams[0]?.score || 0) - 10, B: (teams[1]?.score || 0) + 5, fullMark: 100 },
        { subject: 'Technical', A: (teams[0]?.score || 0) + 5, B: (teams[1]?.score || 0) - 5, fullMark: 100 },
    ];


    // Colors for 5 Teams
    const colors = ["#06b6d4", "#ec4899", "#22c55e", "#eab308", "#8b5cf6"];


    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // Simulate logs - Removed, now derived from useSimulation
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const newLog = `[${new Date().toLocaleTimeString()}] INFO: Team Alpha commit pushed (Hash: ${Math.random().toString(16).substring(2, 8)})`;
    //         setLogs(prev => [newLog, ...prev].slice(0, 10));
    //     }, 2000);
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <div className="flex h-screen w-full flex-col bg-slate-950 text-slate-50 overflow-hidden font-sans">

            {/* Game Over Overlay */}
            <AnimatePresence>
                {gameTime >= 60 && winner && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.5, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="text-center"
                        >
                            <h2 className="text-6xl font-bold text-cyan-400 mb-4">🏆 WINNER</h2>
                            <p className="text-4xl font-bold text-white">{winner.name}</p>
                            <p className="text-lg text-slate-400 mt-2">Final Score: {winner.score.toFixed(1)}</p>
                            <Badge className="mt-6 bg-green-600 text-white text-lg px-6 py-2">Episode Complete</Badge>

                            <Button
                                onClick={handleReturnToHub}
                                size="lg"
                                className="mt-8 gap-2 rounded-full border border-cyan-500/50 bg-cyan-950/50 px-8 text-cyan-50 hover:bg-cyan-900/70"
                            >
                                <Home className="h-5 w-5" />
                                Return to Hub
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <header className="flex h-14 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-cyan-500 font-bold text-slate-900">M</div>
                    <h1 className="text-lg font-semibold tracking-wide text-gray-200">MTCF <span className="text-cyan-500">ARENA</span></h1>
                    <Badge variant="outline" className="border-red-500 text-red-500 animate-pulse">LIVE • EPISODE 01</Badge>
                </div>
                <div className="text-sm text-slate-400 font-mono">
                    <span className="mr-2 text-slate-500">T-MINUS</span>
                    <span className="text-cyan-400 text-lg font-bold">{formatTime(timeLeft)}</span>
                </div>
            </header>

            {/* Main Content Grid */}
            <div className="flex flex-1 overflow-hidden">

                {/* LEFT PANEL: The Stream */}
                <div className="flex w-3/5 flex-col border-r border-slate-800 bg-black relative overflow-hidden">

                    {/* Main Focused Feed */}
                    <div className="flex-1 relative bg-black group">
                        <div className="absolute top-4 left-4 z-10 flex gap-2">
                            <Badge className="bg-red-600 text-white animate-pulse">LIVE</Badge>
                            <Badge className="bg-slate-900/80 text-white border-slate-700">Cam {focusedIndex + 1}: {teamAssets[focusedIndex].name}</Badge>
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={focusedIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1 }}
                                className="h-full w-full"
                            >
                                {teamAssets[focusedIndex].type === 'video' ? (
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="h-full w-full object-cover opacity-90"
                                    >
                                        <source src={teamAssets[focusedIndex].src} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img
                                        src={teamAssets[focusedIndex].src}
                                        alt={teamAssets[focusedIndex].name}
                                        className="h-full w-full object-cover opacity-90"
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* 4 Other Feeds Grid */}
                    <div className="h-48 grid grid-cols-4 border-t border-slate-800">
                        {teamAssets.map((asset, i) => {
                            if (i === focusedIndex) return null; // Skip currently focused
                            return (
                                <div key={i} className="border-r border-slate-800 bg-black relative group overflow-hidden first:border-l-0 last:border-r-0">
                                    <div className="absolute top-2 left-2 z-10">
                                        <Badge variant="outline" className="text-[10px] h-4 border-slate-700 text-slate-400">{asset.name}</Badge>
                                    </div>
                                    <div className="h-full w-full opacity-50 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => setFocusedIndex(i)}>
                                        {asset.type === 'video' ? (
                                            <video autoPlay loop muted playsInline className="h-full w-full object-cover">
                                                <source src={asset.src} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <img src={asset.src} alt={asset.name} className="h-full w-full object-cover" />
                                        )}
                                    </div>
                                </div>
                            );
                        }).filter(Boolean)} {/* Filter out nulls */}
                    </div>

                    {/* Bottom Ticker */}
                    <div className="h-8 bg-cyan-950 flex items-center px-4 overflow-hidden whitespace-nowrap border-t border-cyan-900">
                        <motion.div
                            animate={{ x: ["100%", "-100%"] }}
                            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                            className="flex gap-8 text-xs font-mono text-cyan-400 uppercase tracking-widest"
                        >
                            <span>+++ NEW BID: Pfizer places $50k on Team Alpha +++</span>
                            <span>+++ REGULATORY ALERT: Team Beta flagged for HIPAA check +++</span>
                            <span>+++ SYSTEM: GPU Cluster B re-routed to Inference Task +++</span>
                        </motion.div>
                    </div>
                </div>

                {/* RIGHT PANEL: Telemetry & Governance */}
                <div className="flex w-2/5 flex-col bg-slate-900">
                    <Tabs defaultValue="telemetry" className="flex-1 flex flex-col">
                        <div className="border-b border-slate-800 px-3 py-2">
                            <TabsList className="w-full h-10 bg-slate-950/50 rounded-md p-1 flex gap-1">
                                <TabsTrigger
                                    value="telemetry"
                                    className="flex-1 h-full text-xs font-medium rounded data-[state=active]:bg-cyan-600 data-[state=active]:text-white data-[state=inactive]:text-slate-400 data-[state=inactive]:hover:text-slate-200 transition-colors"
                                >
                                    Telemetry
                                </TabsTrigger>
                                <TabsTrigger
                                    value="governance"
                                    className="flex-1 h-full text-xs font-medium rounded data-[state=active]:bg-pink-600 data-[state=active]:text-white data-[state=inactive]:text-slate-400 data-[state=inactive]:hover:text-slate-200 transition-colors"
                                >
                                    Governance
                                </TabsTrigger>
                                <TabsTrigger
                                    value="market"
                                    className="flex-1 h-full text-xs font-medium rounded data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=inactive]:text-slate-400 data-[state=inactive]:hover:text-slate-200 transition-colors"
                                >
                                    Market
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <ScrollArea className="flex-1 p-4">
                            <TabsContent value="telemetry" className="space-y-4 data-[state=inactive]:hidden mt-0">
                                {/* Velocity Chart */}
                                <Card className="bg-slate-950 border-slate-800">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                            <Cpu className="h-4 w-4 text-blue-500" /> Breakthrough Velocity (CON/min)
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-[200px] w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={velocityData}>
                                                    <Line type="monotone" dataKey="alpha" stroke="#06b6d4" strokeWidth={2} dot={false} animationDuration={300} name="Alpha" />
                                                    <Line type="monotone" dataKey="beta" stroke="#ec4899" strokeWidth={2} dot={false} animationDuration={300} name="Beta" />
                                                    <Line type="monotone" dataKey="gamma" stroke="#22c55e" strokeWidth={2} dot={false} animationDuration={300} name="Gamma" />
                                                    <Line type="monotone" dataKey="delta" stroke="#eab308" strokeWidth={2} dot={false} animationDuration={300} name="Delta" />
                                                    <Line type="monotone" dataKey="epsilon" stroke="#8b5cf6" strokeWidth={2} dot={false} animationDuration={300} name="Epsilon" />
                                                    <XAxis hide />
                                                    <YAxis hide domain={['auto', 'auto']} />
                                                    <Tooltip
                                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                                        itemStyle={{ color: '#cbd5e1' }}
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* 3D Arena Visualization */}
                                <Card className="bg-slate-950 border-slate-800">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                            <Activity className="h-4 w-4 text-purple-500" /> 3D Arena Visualization
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-2">
                                        <SolarSystem3D height="280px" />
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="governance" className="data-[state=inactive]:hidden mt-0 space-y-4">
                                <GovernanceGraph height="400px" activeAlert={teams.some((t: any) => t.status === 'flagged')} />
                                <Card className="bg-slate-950 border-slate-800 overflow-hidden">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                            <Shield className="h-4 w-4 text-cyan-500" /> Regulatory Oversight Dashboard
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <img src="/oversight.png" alt="Regulatory Oversight" className="w-full h-auto opacity-80" />
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="market" className="data-[state=inactive]:hidden mt-0">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-slate-400">Live Bid Ticker</h3>
                                        <Badge variant="outline" className="text-green-500 border-green-500 animate-pulse">MARKET OPEN</Badge>
                                    </div>
                                    <AnimatePresence>
                                        {bids.map((bid) => (
                                            <motion.div
                                                key={bid.id}
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/50 p-3"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-200">{bid.sponsor}</span>
                                                    <span className="text-xs text-slate-500">Target: {bid.teamId}</span>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-sm font-bold text-green-400">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(bid.amount)}</span>
                                                    <span className="text-[10px] text-slate-600">{bid.timestamp}</span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    {bids.length === 0 && (
                                        <div className="text-center text-slate-600 text-sm py-8">Waiting for opening bell...</div>
                                    )}
                                </div>
                            </TabsContent>
                        </ScrollArea>

                        {/* Terminal / Logs Panel */}
                        <div className="h-48 border-t border-slate-800 bg-slate-950 p-2 font-mono text-xs">
                            <div className="flex items-center gap-2 mb-2 text-slate-500 px-2">
                                <Terminal className="h-3 w-3" /> System Logs
                            </div>
                            <div className="space-y-1 px-2 text-slate-400">
                                <AnimatePresence>
                                    {logs.map((log, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="truncate"
                                        >
                                            <span className="text-emerald-500">➜</span> {log}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                    </Tabs>
                </div>
            </div>
        </div>
    );
}
