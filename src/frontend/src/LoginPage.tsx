import { Eye, EyeOff, Heart, Sparkles } from "lucide-react";
import { useState } from "react";

interface LoginPageProps {
  onLogin: () => void;
}

const LOGO = "/assets/mothera-logo.jpeg";

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    onLogin();
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #e8d5f5 0%, #f5e6fb 25%, #fce4ec 55%, #f8eaf6 75%, #ede0f8 100%)",
          backgroundSize: "300% 300%",
          animation: "gradientShift 12s ease infinite",
        }}
      />

      {/* Decorative orbs */}
      <div
        className="absolute top-[-120px] left-[-100px] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(168,100,212,0.18) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-[-100px] right-[-80px] w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(240,180,220,0.22) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute top-[35%] right-[-50px] w-[260px] h-[260px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(200,160,255,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[60%] left-[5%] w-[180px] h-[180px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,200,230,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Floating sparkles */}
      <Sparkles
        className="absolute top-[15%] right-[15%] opacity-20 pointer-events-none"
        style={{ color: "#a855f7", width: 28, height: 28 }}
      />
      <Sparkles
        className="absolute bottom-[20%] left-[12%] opacity-15 pointer-events-none"
        style={{ color: "#ec4899", width: 20, height: 20 }}
      />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-sm animate-fade-in"
        style={{
          background: "rgba(255,255,255,0.96)",
          borderRadius: "28px",
          boxShadow:
            "0 32px 80px rgba(140,80,180,0.22), 0 8px 32px rgba(140,80,180,0.10), 0 0 0 1px rgba(200,160,240,0.25)",
          backdropFilter: "blur(20px)",
          padding: "40px 36px 36px",
        }}
      >
        {/* Logo + Branding */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-[88px] h-[88px] rounded-full overflow-hidden mb-4 animate-pulse-glow"
            style={{
              boxShadow: "0 8px 28px rgba(142,92,159,0.36)",
              border: "3px solid rgba(210,170,240,0.55)",
              outline: "6px solid rgba(210,170,240,0.12)",
            }}
          >
            <img
              src={LOGO}
              alt="Mothera Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1
            className="text-[2.2rem] font-extrabold tracking-tight leading-none"
            style={{
              background: "linear-gradient(135deg, #6B21A8 0%, #a855f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Mothera
          </h1>
          <p
            className="text-xs font-semibold mt-1.5 tracking-widest uppercase"
            style={{ color: "#9B78B8" }}
          >
            Maternal Health Care
          </p>
          <p className="text-sm mt-2 font-medium" style={{ color: "#B090C8" }}>
            Your pregnancy companion
          </p>
        </div>

        {/* Gradient divider */}
        <div
          className="w-full h-px mb-7"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(168,100,212,0.3) 50%, transparent 100%)",
          }}
        />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label
              htmlFor="login-email"
              className="text-sm font-semibold block"
              style={{ color: "#4A2A6A" }}
            >
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-ocid="login.input"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
              style={{
                border: "1.5px solid #E0D0F0",
                background: "rgba(250,247,253,0.9)",
                color: "#2B1F3A",
              }}
              onFocus={(e) => {
                e.currentTarget.style.border = "1.5px solid #9333ea";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px rgba(147,51,234,0.10)";
                e.currentTarget.style.background = "#fff";
              }}
              onBlur={(e) => {
                e.currentTarget.style.border = "1.5px solid #E0D0F0";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.background = "rgba(250,247,253,0.9)";
              }}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="login-password"
              className="text-sm font-semibold block"
              style={{ color: "#4A2A6A" }}
            >
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-ocid="login.password_input"
                className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  border: "1.5px solid #E0D0F0",
                  background: "rgba(250,247,253,0.9)",
                  color: "#2B1F3A",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border = "1.5px solid #9333ea";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(147,51,234,0.10)";
                  e.currentTarget.style.background = "#fff";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = "1.5px solid #E0D0F0";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "rgba(250,247,253,0.9)";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors duration-200 hover:bg-purple-50"
                style={{ color: "#8E5C9F" }}
                aria-label={showPassword ? "Hide password" : "Show password"}
                data-ocid="login.toggle"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div
              className="text-xs font-medium px-4 py-2.5 rounded-xl flex items-center gap-2"
              style={{
                color: "#B91C1C",
                background: "#FEF2F2",
                border: "1px solid #FECACA",
              }}
              data-ocid="login.error_state"
            >
              <span className="text-base">⚠️</span>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 mt-1"
            style={{
              background:
                "linear-gradient(135deg, #7C3AED 0%, #a855f7 60%, #c084fc 100%)",
              color: "#fff",
              boxShadow: "0 8px 24px rgba(124,58,237,0.40)",
              letterSpacing: "0.04em",
            }}
            data-ocid="login.submit_button"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 12px 32px rgba(124,58,237,0.50)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(124,58,237,0.40)";
            }}
          >
            Sign In to Mothera
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 mt-7">
          <Heart
            className="w-3.5 h-3.5"
            style={{ color: "#D8A4F0", fill: "#D8A4F0" }}
          />
          <p className="text-xs font-medium" style={{ color: "#C0A8D4" }}>
            Your journey to motherhood begins here
          </p>
          <Heart
            className="w-3.5 h-3.5"
            style={{ color: "#D8A4F0", fill: "#D8A4F0" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
