import { ArrowRight, Baby, Sparkles } from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface HelpSelectionPageProps {
  onSelect: (choice: "pregnancy" | "baby") => void;
}

const LOGO = "/assets/mothera-logo.jpeg";

const PREGNANCY_IMG =
  "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80";
const BABY_IMG =
  "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&q=80";

export default function HelpSelectionPage({
  onSelect,
}: HelpSelectionPageProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Full purple gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #ede9fe 0%, #f5f3ff 35%, #ede9fe 65%, #f0ebff 100%)",
        }}
      />

      {/* Decorative orbs — all purple */}
      <div
        className="absolute top-[-100px] left-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-[-80px] right-[-60px] w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(196,165,242,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Sparkle accents — purple only */}
      <Sparkles
        className="absolute top-[12%] right-[18%] pointer-events-none opacity-25"
        style={{ color: "#a855f7", width: 26, height: 26 }}
      />
      <Sparkles
        className="absolute bottom-[18%] left-[10%] pointer-events-none opacity-20"
        style={{ color: "#7c3aed", width: 20, height: 20 }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-[76px] h-[76px] rounded-full overflow-hidden mb-3 animate-pulse-glow"
            style={{
              boxShadow: "0 8px 28px rgba(142,92,159,0.32)",
              border: "3px solid rgba(210,170,240,0.55)",
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
          <p className="text-xs font-medium mt-1" style={{ color: "#B090C8" }}>
            Your pregnancy companion
          </p>
        </div>

        {/* Title section */}
        <div className="text-center mb-8">
          <h2
            className="text-[1.75rem] font-extrabold leading-tight mb-2"
            style={{ color: "#1F1033" }}
          >
            {t("helpTitle")}
          </h2>
          <p className="text-base" style={{ color: "#8B7099" }}>
            {t("helpSubtitle")}
          </p>
        </div>

        {/* Option cards */}
        <div className="space-y-4">
          {/* Pregnancy card — purple */}
          <button
            type="button"
            onClick={() => onSelect("pregnancy")}
            className="w-full rounded-2xl overflow-hidden transition-all duration-250 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            style={{
              background: "rgba(255,255,255,0.96)",
              border: "2px solid rgba(196,165,242,0.5)",
              boxShadow:
                "0 4px 20px rgba(139,92,246,0.10), 0 1px 4px rgba(0,0,0,0.04)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = "2px solid #a855f7";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(139,92,246,0.22), 0 2px 8px rgba(0,0,0,0.06)";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = "2px solid rgba(196,165,242,0.5)";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(139,92,246,0.10), 0 1px 4px rgba(0,0,0,0.04)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            data-ocid="help.pregnancy_card"
          >
            <div className="flex items-stretch">
              {/* Image */}
              <div className="w-[110px] shrink-0 relative overflow-hidden">
                <img
                  src={PREGNANCY_IMG}
                  alt="Pregnancy"
                  className="w-full h-full object-cover"
                  style={{ minHeight: "120px" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 40%, rgba(240,232,255,0.6) 100%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(139,92,246,0.10)",
                      color: "#7C3AED",
                    }}
                  >
                    Pregnancy
                  </span>
                </div>
                <p
                  className="font-extrabold text-[1.15rem] leading-snug mb-1"
                  style={{ color: "#4C1D95" }}
                >
                  {t("pregnancyTitle")}
                </p>
                <p
                  className="text-sm leading-relaxed mb-3"
                  style={{ color: "#8B7099" }}
                >
                  {t("pregnancySubtitle")}
                </p>
                <div
                  className="flex items-center gap-1.5 font-semibold text-sm"
                  style={{ color: "#7C3AED" }}
                >
                  Get started
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </div>
              </div>
            </div>
          </button>

          {/* Having Baby card — purple (not rose) */}
          <button
            type="button"
            onClick={() => onSelect("baby")}
            className="w-full rounded-2xl overflow-hidden transition-all duration-250 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            style={{
              background: "rgba(255,255,255,0.96)",
              border: "2px solid rgba(167,139,250,0.45)",
              boxShadow:
                "0 4px 20px rgba(124,58,237,0.10), 0 1px 4px rgba(0,0,0,0.04)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = "2px solid #7c3aed";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(124,58,237,0.22), 0 2px 8px rgba(0,0,0,0.06)";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = "2px solid rgba(167,139,250,0.45)";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(124,58,237,0.10), 0 1px 4px rgba(0,0,0,0.04)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            data-ocid="help.baby_card"
          >
            <div className="flex items-stretch">
              {/* Image */}
              <div className="w-[110px] shrink-0 relative overflow-hidden">
                <img
                  src={BABY_IMG}
                  alt="Having Baby"
                  className="w-full h-full object-cover"
                  style={{ minHeight: "120px" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 40%, rgba(237,233,254,0.6) 100%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(124,58,237,0.10)",
                      color: "#7c3aed",
                    }}
                  >
                    <Baby size={10} className="inline mr-1" />
                    New Mother
                  </span>
                </div>
                <p
                  className="font-extrabold text-[1.15rem] leading-snug mb-1"
                  style={{ color: "#4C1D95" }}
                >
                  {t("babyTitle")}
                </p>
                <p
                  className="text-sm leading-relaxed mb-3"
                  style={{ color: "#8B7099" }}
                >
                  {t("babySubtitle")}
                </p>
                <div
                  className="flex items-center gap-1.5 font-semibold text-sm"
                  style={{ color: "#7c3aed" }}
                >
                  Get started
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </div>
              </div>
            </div>
          </button>
        </div>

        <p
          className="text-center text-xs mt-7 font-medium"
          style={{ color: "#C084E0" }}
        >
          💜 {t("helpFooter")} 💜
        </p>
      </div>
    </div>
  );
}
