"use client";

import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Download, TerminalSquare, ArrowLeft } from "lucide-react";
import Link from 'next/link';

export default function TextEditor() {
    const [content, setContent] = useState("// MTCF SECURE TERMINAL v1.0\n// TYPE CLASSIFIED NOTES HERE...\n\n");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "classified_notes.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="h-screen w-full bg-black text-green-400 font-mono flex flex-col p-4 sm:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 border-b border-green-900/50 pb-2">
                <div className="flex items-center gap-2">
                    <TerminalSquare className="h-5 w-5 animate-pulse" />
                    <span className="text-sm font-bold tracking-widest">SECURE_EDITOR_ENV</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="h-8 text-green-600 hover:text-green-300 hover:bg-green-950/30">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            EXIT
                        </Button>
                    </Link>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                        className="h-8 border-green-700 text-green-400 hover:bg-green-900/30 hover:text-green-200"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        EXPORT
                    </Button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 relative rounded-lg border border-green-900/30 bg-black/50 shadow-[inset_0_0_20px_rgba(0,255,0,0.05)] overflow-hidden">
                <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-full bg-transparent p-4 outline-none resize-none placeholder-green-900/50 text-sm sm:text-base leading-relaxed"
                    spellCheck={false}
                />

                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,_rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-10" />
            </div>

            {/* StatusBar */}
            <div className="mt-2 flex justify-between text-[10px] text-green-700 uppercase">
                <span>CHARS: {content.length}</span>
                <span>STATUS: ENCRYPTED</span>
            </div>
        </div>
    );
}
