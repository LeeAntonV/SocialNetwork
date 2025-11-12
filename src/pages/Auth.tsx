import { useEffect, useRef, useState } from "react";

export default function Authorization() {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");

    const loginRef = useRef<HTMLFormElement | null>(null);
    const registerRef = useRef<HTMLFormElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const container = containerRef.current;
        const form = activeTab === "login" ? loginRef.current : registerRef.current;
        if (!container || !form) return;

        const loginHeight = loginRef.current?.scrollHeight;
        const registerHeight = registerRef.current?.scrollHeight;
        requestAnimationFrame(() => {
            container.style.height = activeTab === "login" ? `${loginHeight}px` : `${registerHeight}px`;
        });

    }, [activeTab]);

    const handleTabChange = (tab: "login" | "register") => {
        if (tab === activeTab) return;

        setActiveTab(tab);
    };

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({email, password}),
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status} - Failed to login`);
            }

            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error("❌ Login error:", error);
        }
    }

    return (
        <div
            className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 bg-fixed text-white flex justify-center items-center">
            <div
                className="w-full max-w-md rounded-2xl border border-white/20 bg-blue-900/20 p-8 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-around border-b mb-6 border-white/30">
                    <button
                        onClick={() => handleTabChange("login")}
                        className={`pb-2 font-semibold transition-colors ${
                            activeTab === "login"
                                ? "underline text-white"
                                : "text-white/80 hover:text-white"
                        }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => handleTabChange("register")}
                        className={`pb-2 font-semibold transition-colors ${
                            activeTab === "register"
                                ? "underline text-white"
                                : "text-white/80 hover:text-white"
                        }`}
                    >
                        Registration
                    </button>
                </div>

                <div
                    ref={containerRef}
                    className="relative overflow-hidden transition-[height] duration-500 ease-in-out"
                    style={{height: 0}}
                >
                    <form
                        ref={loginRef}
                        onSubmit={handleLoginSubmit}
                        autoComplete="off"
                        className={`w-full flex flex-col gap-3 transition-all duration-500 ease-in-out
          ${
                            activeTab === "login"
                                ? "opacity-100 translate-x-0 pointer-events-auto"
                                : "opacity-0 -translate-x-full pointer-events-none"
                        }`}
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            autoComplete="off"
                            className="p-2.5 text-sm rounded-lg bg-blue-900/40 border border-blue-700
                     text-white placeholder-white/60 focus:outline-none focus:border-blue-400 hover:border-white transition"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="p-2.5 text-sm rounded-lg bg-blue-900/40 border border-blue-700
                     text-white placeholder-white/60 focus:outline-none focus:border-blue-400 hover:border-white transition"
                        />

                        <button
                            className="w-full bg-blue-800 hover:bg-blue-900 border border-white/20 rounded-lg py-2 font-semibold transition-colors">
                            Sign In
                        </button>

                        <div className="flex items-center gap-3 my-1.5">
                            <div className="flex-1 h-px bg-white/30"/>
                            <span className="text-xs text-white/70">or</span>
                            <div className="flex-1 h-px bg-white/30"/>
                        </div>

                        <button
                            className="w-full bg-blue-800 hover:bg-blue-900 border border-white/20 rounded-lg py-2 font-semibold transition-colors">
                            Sign In with Google
                        </button>
                    </form>

                    <form
                        ref={registerRef}
                        className={`absolute inset-0 w-full flex flex-col gap-3 transition-all duration-500 ease-in-out
          ${
                            activeTab === "register"
                                ? "opacity-100 translate-x-0 pointer-events-auto"
                                : "opacity-0 translate-x-full pointer-events-none"
                        }`}
                    >
                        <input
                            type="email"
                            placeholder="Email"
                            className="p-2.5 text-sm rounded-lg bg-blue-900/40 border border-blue-700
                     text-white placeholder-white/60 focus:outline-none focus:border-blue-400 hover:border-white transition"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="p-2.5 text-sm rounded-lg bg-blue-900/40 border border-blue-700
                     text-white placeholder-white/60 focus:outline-none focus:border-blue-400 hover:border-white transition"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="p-2.5 text-sm rounded-lg bg-blue-900/40 border border-blue-700
                     text-white placeholder-white/60 focus:outline-none focus:border-blue-400 hover:border-white transition"
                        />

                        <button
                            className="w-full bg-blue-800 hover:bg-blue-900 border border-white/20 rounded-lg py-2 font-semibold transition-colors">
                            Sign Up
                        </button>

                        <div className="flex items-center gap-3 my-1.5">
                            <div className="flex-1 h-px bg-white/30"/>
                            <span className="text-xs text-white/70">or</span>
                            <div className="flex-1 h-px bg-white/30"/>
                        </div>

                        <button
                            className="w-full bg-blue-800 hover:bg-blue-900 border border-white/20 rounded-lg py-2 font-semibold transition-colors">
                            Sign Up with Google
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
