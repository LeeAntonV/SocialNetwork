import { useEffect, useRef, useState } from "react";
import {useNavigate} from "react-router-dom";
import {FaEye, FaEyeSlash} from "react-icons/fa";

export default function Authorization() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [activeTab, setActiveTab] = useState<"login" | "register">("login");

    const loginRef = useRef<HTMLFormElement | null>(null);
    const registerRef = useRef<HTMLFormElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [logEmail, setLogEmail] = useState("");
    const [logPassword, setLogPassword] = useState("");

    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regCheckPassword, setRegCheckPassword] = useState("");

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
                body: JSON.stringify(
                    {
                        "email":logEmail,
                        "password":logPassword}
                ),
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status} - Failed to login`);
            }

            const data = await res.json();
            console.log(data);
            navigate("/feed");
        } catch (error) {
            console.error("Login error:", error);
        }
    }

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (regPassword !== regCheckPassword) {
            throw new Error("Passwords do not match");
        }

        try{
            const res = await fetch("http://localhost:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(
                    {
                        "email":regEmail,
                        "password":regPassword}
                ),
            })

            if (!res.ok) {
                throw new Error(`HTTP ${res.status} - Failed to register`);
            }

            const data = await res.json();
            console.log(data);
            navigate("/feed");
        } catch (error) {
            console.error("Register error:", error);
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
                            value={logEmail}
                            onChange={(e) => setLogEmail(e.target.value)}
                            placeholder="Email"
                            autoComplete="off"
                            className="p-2.5 text-sm rounded-lg bg-blue-900/40 border border-blue-700
                     text-white placeholder-white/60 focus:outline-none focus:border-blue-400 hover:border-white transition"
                            required
                        />
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={logPassword}
                                onChange={(e) => setLogPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full p-2.5 text-sm rounded-lg bg-blue-900/40 border border-blue-700
                     text-white placeholder-white/60 focus:outline-none focus:border-blue-400 hover:border-white transition"
                                required
                            />

                            <button
                                type="button"
                                className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs rounded-md transition"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>

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
                        onSubmit={handleRegisterSubmit}
                        className={`absolute inset-0 w-full flex flex-col gap-3 transition-all duration-500 ease-in-out
          ${
                            activeTab === "register"
                                ? "opacity-100 translate-x-0 pointer-events-auto"
                                : "opacity-0 translate-x-full pointer-events-none"
                        }`}
                    >
                        <input
                            type="email"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            placeholder="Email"
                            className="p-2.5 text-sm rounded-lg bg-blue-900/40 border border-blue-700
                     text-white placeholder-white/60 focus:outline-none focus:border-blue-400 hover:border-white transition"
                            required
                        />
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={regPassword}
                                onChange={(e) => setRegPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full p-2.5 text-sm rounded-lg bg-blue-900/40 border border-blue-700
                     text-white placeholder-white/60 focus:outline-none focus:border-blue-400 hover:border-white transition"
                                required
                            />

                            <button
                                type="button"
                                className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs rounded-md transition"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>

                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={regCheckPassword}
                                onChange={(e) => setRegCheckPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full p-2.5 text-sm rounded-lg bg-blue-900/40 border border-blue-700
                     text-white placeholder-white/60 focus:outline-none focus:border-blue-400 hover:border-white transition"
                                required
                            />

                            <button
                                type="button"
                                className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs rounded-md transition"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>

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
