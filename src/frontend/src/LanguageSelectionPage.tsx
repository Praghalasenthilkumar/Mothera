import { Check, Globe, Languages } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "./LanguageContext";
import type { Language } from "./LanguageContext";

interface LanguageSelectionPageProps {
  onLanguageSelect: (lang: Language) => void;
}

const LOGO = "/assets/mothera-logo.jpeg";

const LANGUAGE_OPTIONS: {
  code: Language;
  nativeName: string;
  englishName: string;
  subtitle: string;
  flag: string;
  icon: React.ReactNode;
}[] = [
  {
    code: "en",
    nativeName: "English",
    englishName: "English",
    subtitle: "Continue in English",
    flag: "🇬🇧",
    icon: <Globe size={24} />,
  },
  {
    code: "ta",
    nativeName: "தமிழ்",
    englishName: "Tamil",
    subtitle: "தமிழில் தொடரவும்",
    flag: "🇮🇳",
    icon: <Languages size={24} />,
  },
];

export default function LanguageSelectionPage({
  onLanguageSelect,
}: LanguageSelectionPageProps) {
  const [selected, setSelected] = useState<Language>("en");
  const { setLanguage } = useLanguage();

  const handleContinue = () => {
    setLanguage(selected);
    onLanguageSelect(selected);
  };

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
        className="absolute top-[-120px] left-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(168,100,212,0.18) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-[-80px] right-[-60px] w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(240,180,220,0.22) 0%, transparent 65%)",
        }}
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
          padding: "36px 32px 32px",
        }}
      >
        {/* Logo + branding */}
        <div className="flex flex-col items-center mb-6">
          <div
            className="w-[76px] h-[76px] rounded-full overflow-hidden mb-3 animate-pulse-glow"
            style={{
              boxShadow: "0 8px 24px rgba(142,92,159,0.34)",
              border: "3px solid rgba(210,170,240,0.5)",
              outline: "5px solid rgba(210,170,240,0.10)",
            }}
          >
            <img
              src={LOGO}
              alt="Mothera Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1
            className="text-2xl font-extrabold tracking-tight"
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
            className="text-xs font-medium mt-1 tracking-wide"
            style={{ color: "#B090C8" }}
          >
            Your pregnancy companion
          </p>
        </div>

        <div
          className="w-full h-px mb-6"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(168,100,212,0.3) 50%, transparent 100%)",
          }}
        />

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold mb-1.5" style={{ color: "#4A2A6A" }}>
            Choose Your Language
          </h2>
          <p className="text-sm" style={{ color: "#A080B8" }}>
            Select how you'd like to continue
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {LANGUAGE_OPTIONS.map((opt) => {
            const isSelected = selected === opt.code;
            return (
              <button
                type="button"
                key={opt.code}
                onClick={() => setSelected(opt.code)}
                className="relative flex flex-col items-center gap-2.5 rounded-2xl p-5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                style={{
                  background: isSelected
                    ? "linear-gradient(145deg, #f3e8ff 0%, #faf0ff 100%)"
                    : "rgba(250,247,253,0.7)",
                  border: isSelected
                    ? "2px solid #a855f7"
                    : "2px solid rgba(200,170,230,0.4)",
                  boxShadow: isSelected
                    ? "0 4px 16px rgba(168,85,247,0.18), inset 0 1px 0 rgba(255,255,255,0.8)"
                    : "0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
                  transform: isSelected ? "scale(1.02)" : "scale(1)",
                }}
                data-ocid={`language.option_${opt.code}`}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <div
                    className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "#a855f7" }}
                    aria-hidden="true"
                  >
                    <Check size={11} color="white" strokeWidth={3} />
                  </div>
                )}
                <span
                  className="text-[2rem]"
                  role="img"
                  aria-label={opt.englishName}
                >
                  {opt.flag}
                </span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: isSelected
                      ? "rgba(168,85,247,0.14)"
                      : "rgba(168,85,247,0.07)",
                    color: isSelected ? "#7C3AED" : "#9B78B8",
                  }}
                >
                  {opt.icon}
                </div>
                <p
                  className="font-bold text-sm leading-tight text-center"
                  style={{ color: isSelected ? "#4A2A6A" : "#6B5080" }}
                >
                  {opt.nativeName}
                </p>
                <p
                  className="text-[11px] text-center leading-tight"
                  style={{ color: isSelected ? "#8B5CF6" : "#A090B8" }}
                >
                  {opt.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleContinue}
          className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200"
          style={{
            background:
              "linear-gradient(135deg, #7C3AED 0%, #a855f7 60%, #c084fc 100%)",
            color: "#fff",
            boxShadow: "0 8px 24px rgba(124,58,237,0.38)",
            letterSpacing: "0.04em",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 12px 32px rgba(124,58,237,0.48)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 8px 24px rgba(124,58,237,0.38)";
          }}
          data-ocid="language.continue_button"
        >
          {selected === "en" ? "Continue →" : "தொடரவும் →"}
        </button>
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
