"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    FileText,
    Shield,
    Scale,
    Brain,
    Users,
    AlertTriangle,
    CheckCircle,
    Mail,
    ExternalLink,
    Briefcase,
    Lock,
    Gavel,
    TrendingUp
} from "lucide-react";

const ipTiers = [
    {
        id: "mode-a",
        mode: "A",
        title: "Total Transfer",
        subtitle: "Commercialization Tier",
        color: "cyan",
        icon: <Scale className="h-6 w-6" />,
        prizeMultiplier: "2.0x",
        bestFor: "Production-ready components, CAD files, software modules intended for manufacturing and sale",
        description: "In exchange for the cash prize, the Winning Creator assigns 100% ownership of the IP to the Sponsor.",
        sponsorBenefits: [
            "Full Freedom to Operate (FTO)",
            "Can file patents in sponsor's name",
            "Modify designs without restriction",
            "Submit to FDA without further permission",
            "Exclusive commercial rights worldwide"
        ],
        creatorBenefits: [
            "Premium cash prize (2x base rate)",
            "Background IP Exception preserved",
            "Portfolio credit for work",
            "Potential for follow-on contracts"
        ],
        keyClause: "Background IP Exception: If the creator uses pre-existing tools (e.g., proprietary AI models, custom libraries) to generate the result, they retain ownership of the tool but grant the Sponsor a perpetual, irrevocable, royalty-free license to use the output."
    },
    {
        id: "mode-b",
        mode: "B",
        title: "Non-Exclusive License",
        subtitle: "Ideation Tier",
        color: "green",
        icon: <Brain className="h-6 w-6" />,
        prizeMultiplier: "1.0x",
        bestFor: "Early-stage concepts, blue sky problem solving, new clinical indications for existing technology",
        description: "The Creator retains ownership of the IP. The Sponsor receives a broad, royalty-free, non-exclusive license.",
        sponsorBenefits: [
            "Lower prize cost",
            "Access to diverse ideas",
            "No legal burden of ownership",
            "Can use for internal R&D",
            "Field-of-use restrictions available"
        ],
        creatorBenefits: [
            "Retain full IP ownership",
            "Can license to other industries",
            "Build portfolio value",
            "Publish after embargo period",
            "Multiple revenue streams possible"
        ],
        keyClause: "Non-Exclusive Terms: Sponsor cannot prevent creator from licensing to non-competing entities. Standard 6-month publication embargo applies."
    },
    {
        id: "mode-c",
        mode: "C",
        title: "Option Model",
        subtitle: "Startup Tier",
        color: "purple",
        icon: <TrendingUp className="h-6 w-6" />,
        prizeMultiplier: "0.5x + Negotiated",
        bestFor: "Complex systems, novel therapies, solutions with standalone startup potential",
        description: "The Prize buys the Sponsor an Exclusive Option Period (6 months) to negotiate a purchase or royalty license.",
        sponsorBenefits: [
            "First look without full commitment",
            "Evaluate regulatory pathway first",
            "Reduced upfront capital risk",
            "Option to negotiate equity stake",
            "Extendable option period available"
        ],
        creatorBenefits: [
            "Potential for royalties/equity",
            "Larger payout if idea succeeds",
            "Retain rights if option lapses",
            "Startup pathway preserved",
            "Negotiate from position of strength"
        ],
        keyClause: "Option Terms: 6-month exclusive option (extendable to 12 months at 25% additional fee). During Option Period, creator cannot license to competing entities. If option lapses, creator has full rights."
    }
];

const legalProtections = [
    {
        icon: <Gavel className="h-5 w-5" />,
        title: "Indemnification Clauses",
        description: "Creators warrant originality and clean title. Sponsors are indemnified against third-party IP claims arising from creator misrepresentation.",
        details: [
            "Creator certifies no prior encumbrances",
            "Warranty of non-infringement",
            "Hold harmless provisions",
            "Insurance-backed guarantees available"
        ]
    },
    {
        icon: <Lock className="h-5 w-5" />,
        title: "Escrow Mechanisms",
        description: "Prize funds are held in escrow until IP transfer documentation is complete and verified.",
        details: [
            "Third-party escrow agent",
            "Release upon signed IP assignment",
            "Dispute hold provisions",
            "30-day verification window"
        ]
    },
    {
        icon: <Scale className="h-5 w-5" />,
        title: "Dispute Resolution",
        description: "All disputes resolved through binding arbitration under established commercial rules.",
        details: [
            "JAMS or AAA arbitration",
            "Delaware law governs",
            "Confidential proceedings",
            "Expedited process for IP disputes"
        ]
    },
    {
        icon: <Shield className="h-5 w-5" />,
        title: "Insurance Coverage",
        description: "Platform maintains comprehensive insurance covering E&O and IP infringement claims.",
        details: [
            "Errors & Omissions coverage",
            "IP infringement defense",
            "$5M aggregate coverage",
            "Named insured options for sponsors"
        ]
    }
];

const riskMitigation = [
    {
        title: "Background IP Disclosure",
        description: "Before submission, creators must declare any third-party IP, university patents, open source code, or former employer proprietary information.",
        icon: <FileText className="h-5 w-5 text-cyan-400" />
    },
    {
        title: "AI Provenance Requirements",
        description: "Mandatory disclosure of generative AI usage. Solutions flagged as 'AI-Generated' receive adjusted IP strength assessment for patentability.",
        icon: <Brain className="h-5 w-5 text-purple-400" />
    },
    {
        title: "Black Box Submission Phase",
        description: "During competition, submissions visible only to Sponsor and Judges. Prevents IP contamination between creators.",
        icon: <Lock className="h-5 w-5 text-green-400" />
    },
    {
        title: "Third-Party IP Screening",
        description: "Automated scanning for known patent citations, open source license conflicts, and academic paper references.",
        icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />
    },
    {
        title: "Export Control Compliance",
        description: "ITAR/EAR screening for medical device technologies. Jurisdiction restrictions enforced at submission.",
        icon: <Shield className="h-5 w-5 text-red-400" />
    }
];

const investorAssurances = [
    {
        title: "Platform Liability Position",
        description: "Rockrun operates as a facilitator, not an IP owner or guarantor. Pass-through liability structure limits platform exposure.",
        highlight: "Terms of Service clearly establish facilitator status with no IP ownership claims."
    },
    {
        title: "IP Chain of Title",
        description: "Complete documentation trail from creator submission through sponsor assignment. Title insurance available for high-value transfers.",
        highlight: "Every transfer includes signed assignment, representations, and recorded chain of title."
    },
    {
        title: "FDA Pathway Considerations",
        description: "IP structure designed to support 510(k), PMA, and De Novo pathways. Clean ownership enables regulatory submission without encumbrances.",
        highlight: "Mode A transfers specifically structured for FDA submission requirements."
    },
    {
        title: "Exit & Acquisition Protections",
        description: "IP rights survive sponsor M&A. Successor entities inherit all rights and obligations under original terms.",
        highlight: "Assignment provisions include standard successor and assigns language."
    },
    {
        title: "Freedom to Operate Analysis",
        description: "Optional FTO analysis package available for sponsors. Includes prior art search, patent landscape review, and clearance opinion.",
        highlight: "Partner law firms provide discounted FTO opinions for platform transactions."
    }
];

const stakeholderTable = [
    { stakeholder: "Sponsor", concern: "IP ownership clarity", protection: "Total Transfer mode, indemnification, escrow" },
    { stakeholder: "Creator", concern: "Fair compensation", protection: "Tiered prize options, background IP retention" },
    { stakeholder: "Investor", concern: "Legal exposure", protection: "Pass-through liability, insurance, arbitration" },
    { stakeholder: "Platform", concern: "Dispute involvement", protection: "Facilitator status, arbitration clause" }
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/95 backdrop-blur">
                <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="gap-1 sm:gap-2 text-slate-400 hover:text-cyan-400 px-2 sm:px-3">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="hidden xs:inline">Back</span>
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded bg-cyan-500 font-bold text-slate-900 text-xs sm:text-base">
                            M
                        </div>
                        <span className="hidden sm:inline text-sm font-medium text-slate-300">MTCF</span>
                        <Badge variant="outline" className="border-cyan-500/50 text-cyan-400 text-[10px] sm:text-xs">
                            IP & Legal
                        </Badge>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-transparent to-purple-950/20" />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                                IP & Legal Framework
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                            Comprehensive intellectual property protections for sponsors, creators, and investors
                            in competitive medical device innovation.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Badge className="bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-4 py-2">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                FDA-Ready IP Transfers
                            </Badge>
                            <Badge className="bg-purple-950 text-purple-400 border border-purple-500/30 px-4 py-2">
                                <Shield className="h-4 w-4 mr-2" />
                                Investor Protected
                            </Badge>
                            <Badge className="bg-green-950 text-green-400 border border-green-500/30 px-4 py-2">
                                <Gavel className="h-4 w-4 mr-2" />
                                Legally Binding
                            </Badge>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Navigation */}
            <nav className="sticky top-[49px] sm:top-[57px] z-40 border-b border-slate-800 bg-slate-900/95 backdrop-blur">
                <div className="max-w-6xl mx-auto px-2 sm:px-6">
                    <div className="flex gap-0.5 sm:gap-1 overflow-x-auto py-2 scrollbar-hide -mx-2 px-2">
                        {["IP Tiers", "Legal", "Risk", "Investors", "Contact"].map((item, idx) => {
                            const fullLabels = ["IP Tiers", "Legal Framework", "Risk Mitigation", "Investor Assurances", "Contact"];
                            return (
                                <a
                                    key={item}
                                    href={`#${fullLabels[idx].toLowerCase().replace(/\s+/g, '-')}`}
                                    className="flex-shrink-0 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-colors whitespace-nowrap"
                                >
                                    {item}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">

                {/* IP Tiers Section */}
                <section id="ip-tiers">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-10 rounded-lg bg-cyan-950 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-100">IP Framework Tiers</h2>
                            <p className="text-sm text-slate-500">Sponsors select IP terms before challenge launch</p>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {ipTiers.map((tier, index) => (
                            <motion.div
                                key={tier.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className={`bg-slate-900 border-slate-800 overflow-hidden`}>
                                    <div className={`h-1 bg-gradient-to-r ${tier.color === 'cyan' ? 'from-cyan-500 to-cyan-400' :
                                        tier.color === 'green' ? 'from-green-500 to-green-400' :
                                            'from-purple-500 to-purple-400'
                                        }`} />
                                    <CardHeader className="pb-4 px-4 sm:px-6">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                            <div className="flex items-center gap-3 sm:gap-4">
                                                <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center flex-shrink-0 ${tier.color === 'cyan' ? 'bg-cyan-950 text-cyan-400' :
                                                    tier.color === 'green' ? 'bg-green-950 text-green-400' :
                                                        'bg-purple-950 text-purple-400'
                                                    }`}>
                                                    {tier.icon}
                                                </div>
                                                <div className="min-w-0">
                                                    <CardTitle className="flex flex-wrap items-center gap-1 sm:gap-2">
                                                        <span className={`text-xs sm:text-sm font-mono ${tier.color === 'cyan' ? 'text-cyan-400' :
                                                            tier.color === 'green' ? 'text-green-400' :
                                                                'text-purple-400'
                                                            }`}>MODE {tier.mode}</span>
                                                        <span className="text-slate-100 text-base sm:text-lg">{tier.title}</span>
                                                    </CardTitle>
                                                    <p className="text-xs sm:text-sm text-slate-500">{tier.subtitle}</p>
                                                </div>
                                            </div>
                                            <Badge variant="outline" className={`self-start text-xs ${tier.color === 'cyan' ? 'border-cyan-500/50 text-cyan-400' :
                                                tier.color === 'green' ? 'border-green-500/50 text-green-400' :
                                                    'border-purple-500/50 text-purple-400'
                                                }`}>
                                                Prize: {tier.prizeMultiplier}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
                                        <div>
                                            <p className="text-sm sm:text-base text-slate-300 mb-2">{tier.description}</p>
                                            <p className="text-xs sm:text-sm text-slate-500"><strong>Best for:</strong> {tier.bestFor}</p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
                                                    <Briefcase className="h-4 w-4" />
                                                    Sponsor Benefits
                                                </h4>
                                                <ul className="space-y-2">
                                                    {tier.sponsorBenefits.map((benefit, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                            {benefit}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
                                                    <Users className="h-4 w-4" />
                                                    Creator Benefits
                                                </h4>
                                                <ul className="space-y-2">
                                                    {tier.creatorBenefits.map((benefit, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                                            <CheckCircle className="h-4 w-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                                                            {benefit}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className={`p-4 rounded-lg ${tier.color === 'cyan' ? 'bg-cyan-950/30 border border-cyan-500/20' :
                                            tier.color === 'green' ? 'bg-green-950/30 border border-green-500/20' :
                                                'bg-purple-950/30 border border-purple-500/20'
                                            }`}>
                                            <p className="text-sm text-slate-400">
                                                <strong className="text-slate-300">Key Clause:</strong> {tier.keyClause}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Legal Framework Section */}
                <section id="legal-framework">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-10 rounded-lg bg-purple-950 flex items-center justify-center">
                            <Gavel className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-100">Legal Framework & Investor Protections</h2>
                            <p className="text-sm text-slate-500">Comprehensive legal safeguards for all stakeholders</p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {legalProtections.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="bg-slate-900 border-slate-800 h-full">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="flex items-center gap-3 text-lg">
                                            <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center text-purple-400">
                                                {item.icon}
                                            </div>
                                            {item.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-slate-400 mb-4">{item.description}</p>
                                        <ul className="space-y-2">
                                            {item.details.map((detail, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Risk Mitigation Section */}
                <section id="risk-mitigation">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-10 rounded-lg bg-yellow-950 flex items-center justify-center">
                            <AlertTriangle className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-100">Risk Mitigation</h2>
                            <p className="text-sm text-slate-500">Proactive measures to prevent IP issues</p>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {riskMitigation.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-start gap-4 p-4 rounded-lg bg-slate-900 border border-slate-800"
                            >
                                <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="font-medium text-slate-200 mb-1">{item.title}</h3>
                                    <p className="text-sm text-slate-400">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Investor Assurances Section */}
                <section id="investor-assurances">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-10 rounded-lg bg-green-950 flex items-center justify-center">
                            <Briefcase className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-100">Investor Assurances</h2>
                            <p className="text-sm text-slate-500">Protections designed for investment confidence</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {investorAssurances.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="bg-slate-900 border-slate-800">
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold text-slate-200 mb-2">{item.title}</h3>
                                        <p className="text-sm text-slate-400 mb-3">{item.description}</p>
                                        <div className="flex items-start gap-2 p-3 rounded bg-green-950/30 border border-green-500/20">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-green-300">{item.highlight}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Stakeholder Summary Table */}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-slate-200 mb-4">Stakeholder Protection Summary</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-slate-800">
                                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Stakeholder</th>
                                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Primary Concern</th>
                                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Protection Mechanism</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stakeholderTable.map((row, i) => (
                                        <tr key={i} className="border-b border-slate-800/50">
                                            <td className="py-3 px-4 text-slate-200 font-medium">{row.stakeholder}</td>
                                            <td className="py-3 px-4 text-slate-400">{row.concern}</td>
                                            <td className="py-3 px-4 text-slate-300">{row.protection}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="border-t border-slate-800 pt-12">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-100 mb-4">Questions About IP & Legal?</h2>
                        <p className="text-slate-400 mb-8">
                            Our legal team is available to discuss specific IP arrangements,
                            custom terms for enterprise sponsors, and investor due diligence requests.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="mailto:legal@rockrun.systems">
                                <Button className="gap-2 bg-cyan-600 hover:bg-cyan-500">
                                    <Mail className="h-4 w-4" />
                                    legal@rockrun.systems
                                </Button>
                            </a>
                            <Link href="/docs/ip_framework.md">
                                <Button variant="outline" className="gap-2 border-slate-700 text-slate-300 hover:bg-slate-800">
                                    <FileText className="h-4 w-4" />
                                    Full Documentation
                                    <ExternalLink className="h-3 w-3" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="border-t border-slate-800 bg-slate-900/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded bg-cyan-500 flex items-center justify-center font-bold text-slate-900 text-xs">M</div>
                            <span>MedTech Cognitive Foundry</span>
                        </div>
                        <div>
                            v0.1.0 ALPHA • Rockrun.systems • © 2026
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
