import { Calendar, Heart, LogOut, Pill, Syringe, Wind } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  BabyDoctorConnectInline,
  BabyWellnessCards,
  Footer,
  GlobalNotifications,
  MedicineReminderPanel,
  NewBottomNav,
  VaccineReminderInline,
} from "./App";
import type { DashboardScreen, NotificationItem } from "./App";
import AssistantPage from "./AssistantPage";
import ClassesPage from "./ClassesPage";
import CommunityPage from "./CommunityPage";
import ShoppingPage from "./ShoppingPage";

import type { UserInfo } from "./PersonalInfoPage";

const LOGO = "/assets/mothera-logo.jpeg";

interface HavingBabyDashboardProps {
  babyInfo: Record<string, string> | null;
  onLogout?: () => void;
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar({
  babyName,
  onLogout,
}: { babyName: string; onLogout?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}
      style={{
        background: "rgba(250,248,255,0.97)",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(192,132,252,0.14)",
      }}
      data-ocid="having_baby_navbar"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-full overflow-hidden shrink-0"
            style={{
              boxShadow: "0 2px 10px rgba(192,132,252,0.28)",
              border: "2px solid rgba(192,132,252,0.5)",
            }}
          >
            <img
              src={LOGO}
              alt="Mothera logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span
              className="font-extrabold text-base leading-none block"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Mothera
            </span>
            <span
              className="text-[10px] font-medium leading-none"
              style={{ color: "#A070C0" }}
            >
              Hello, {babyName}'s Mom! 💜
            </span>
          </div>
        </div>
        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:shadow-sm"
            style={{
              color: "#7C3AED",
              border: "1.5px solid rgba(124,58,237,0.3)",
              background: "rgba(124,58,237,0.06)",
            }}
            aria-label="Logout"
            data-ocid="having_baby_nav.logout_button"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        )}
      </div>
    </nav>
  );
}

// ─── BabySectionMenuBar ────────────────────────────────────────────────────────
const BABY_SECTION_TABS = [
  { id: "wellness-section", label: "Wellness Hub", icon: "🌸" },
  { id: "reminders-section", label: "Reminders", icon: "💊" },
  { id: "connect-section", label: "Connect", icon: "👩‍⚕️" },
  { id: "tips-section", label: "Tips", icon: "🏃‍♀️" },
];

function BabySectionMenuBar() {
  const [activeSection, setActiveSection] = useState("wellness-section");

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      for (const tab of [...BABY_SECTION_TABS].reverse()) {
        const el = document.getElementById(tab.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 130) {
            setActiveSection(tab.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="sticky z-30"
      style={{
        top: "56px",
        background: "rgba(250,248,255,0.97)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(192,132,252,0.12)",
        boxShadow: "0 2px 12px rgba(124,58,237,0.08)",
      }}
      data-ocid="baby_section_menu_bar"
    >
      <div className="max-w-2xl mx-auto flex items-center px-2 h-11 gap-1">
        {BABY_SECTION_TABS.map((tab) => {
          const isActive = activeSection === tab.id;
          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex-1 justify-center"
              style={{
                background: isActive
                  ? "linear-gradient(135deg, #8B5CF6, #A78BFA)"
                  : "transparent",
                color: isActive ? "white" : "#8B5CF6",
                boxShadow: isActive
                  ? "0 2px 10px rgba(139,92,246,0.30)"
                  : "none",
              }}
              data-ocid={`baby_section_menu.${tab.id}`}
              aria-current={isActive ? "true" : undefined}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── BabyHeader ────────────────────────────────────────────────────────────────
function BabyHeader({ babyInfo }: { babyInfo: Record<string, string> | null }) {
  const motherName = babyInfo?.motherName || "Mama";
  return (
    <section
      className="relative overflow-hidden py-8 px-4"
      style={{
        background:
          "linear-gradient(145deg, #EDE0FF 0%, #F3E8FF 35%, #EDE9FE 70%, #F5F3FF 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #C084FC, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-36 h-36 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #A78BFA, transparent 70%)",
          transform: "translate(-20%, 30%)",
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Heart
                size={16}
                className="shrink-0"
                style={{ color: "#8B5CF6" }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: "#8B5CF6" }}
              >
                Having Baby
              </span>
            </div>
            <h1
              className="text-2xl font-extrabold mb-2 leading-tight"
              style={{ color: "#3A1A5A" }}
            >
              Hello, {motherName}! 🌸
            </h1>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "#A070C0" }}
            >
              Every moment with your little one is a gift. You're doing an
              incredible job — take care of yourself too!
            </p>
            <div className="flex flex-wrap gap-2">
              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  color: "#7C3AED",
                  border: "1px solid rgba(124,58,237,0.2)",
                  backdropFilter: "blur(8px)",
                }}
              >
                ✨ Your wellness matters most
              </span>
              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  color: "#8E5C9F",
                  border: "1px solid rgba(142,92,159,0.2)",
                  backdropFilter: "blur(8px)",
                }}
              >
                💜 Recovery & Growth
              </span>
            </div>
          </div>
          <div
            className="shrink-0 w-20 h-20 rounded-2xl overflow-hidden shadow-lg"
            style={{ border: "3px solid rgba(255,255,255,0.8)" }}
          >
            <img
              src="https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=160&h=160&fit=crop&crop=face"
              alt="Mother and baby"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1559521783-1d1599583485?w=160&h=160&fit=crop";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section Header ─────────────────────────────────────────────────────────
function SectionHeader({
  icon,
  title,
  subtitle,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  gradient: string;
}) {
  return (
    <div
      className="px-5 py-4 flex items-center gap-3"
      style={{ background: gradient }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: "rgba(255,255,255,0.25)" }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <h2 className="font-extrabold text-lg text-white leading-tight truncate">
          {title}
        </h2>
        {subtitle && (
          <p className="text-white/80 text-xs mt-0.5 truncate">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

// ─── Running Tips Data ────────────────────────────────────────────────────────
const RUNNING_TIPS = [
  {
    icon: "🕐",
    title: "Wait for the Green Light",
    description:
      "Hold off running until at least 6–8 weeks postpartum, or until your doctor gives clearance. Your body needs time to heal ligaments, pelvic floor, and incision sites.",
    tag: "Week 6+",
    tagColor: "#7C3AED",
    tagBg: "#F3E8FF",
    bg: "#FAF5FF",
    border: "#DDD6FE",
  },
  {
    icon: "🚶‍♀️",
    title: "Start with Walking",
    description:
      "Begin with 20–30 minute brisk walks before attempting jogging. Gradually add 1-minute run intervals among 4-minute walks, then build from there.",
    tag: "Week 3+",
    tagColor: "#8E5C9F",
    tagBg: "#F5EEFF",
    bg: "#FAF7FF",
    border: "#E9D5FF",
  },
  {
    icon: "💪",
    title: "Strengthen Your Core First",
    description:
      "Prioritise pelvic floor exercises (Kegels) and gentle core activation before running. A strong foundation prevents injury and supports your organs.",
    tag: "Essential",
    tagColor: "#059669",
    tagBg: "#ECFDF5",
    bg: "#F6FEFB",
    border: "#BBF7D0",
  },
  {
    icon: "👂",
    title: "Listen to Your Body",
    description:
      "Stop immediately if you feel pain, pelvic pressure, leaking, or heaviness. These are signs your body needs more recovery time — there is no shame in slowing down.",
    tag: "Always",
    tagColor: "#D97706",
    tagBg: "#FFFBEB",
    bg: "#FFFEF4",
    border: "#FDE68A",
  },
  {
    icon: "💧",
    title: "Stay Hydrated",
    description:
      "Drink an extra 500ml of water before and after running. If breastfeeding, your fluid needs are even higher — dehydration affects milk supply and energy levels.",
    tag: "Daily",
    tagColor: "#2563EB",
    tagBg: "#EFF6FF",
    bg: "#F6F9FF",
    border: "#BFDBFE",
  },
  {
    icon: "👙",
    title: "Choose the Right Support",
    description:
      "Invest in a high-impact sports bra designed for postpartum or nursing moms. Proper support reduces discomfort and protects breast tissue during exercise.",
    tag: "Essential",
    tagColor: "#7C3AED",
    tagBg: "#F3E8FF",
    bg: "#FAF5FF",
    border: "#DDD6FE",
  },
  {
    icon: "😴",
    title: "Run During Baby's Nap",
    description:
      "Schedule short 20–30 minute runs during nap time. Consistency beats duration — three short runs a week is better than one long exhausting one.",
    tag: "Routine",
    tagColor: "#8E5C9F",
    tagBg: "#F5EEFF",
    bg: "#FAF7FF",
    border: "#E9D5FF",
  },
  {
    icon: "📈",
    title: "Track Your Progress",
    description:
      "Celebrate every small win — running 1 minute more each week is a major achievement. Use a running app or journal to see how far you've come.",
    tag: "Motivating",
    tagColor: "#059669",
    tagBg: "#ECFDF5",
    bg: "#F6FEFB",
    border: "#BBF7D0",
  },
  {
    icon: "🧘‍♀️",
    title: "Warm Up and Cool Down",
    description:
      "Spend 5–10 minutes doing gentle dynamic stretches before running. Cool down with hip flexor and calf stretches — postpartum hormones make joints more prone to injury.",
    tag: "Every Run",
    tagColor: "#7C3AED",
    tagBg: "#F3E8FF",
    bg: "#FAF5FF",
    border: "#DDD6FE",
  },
  {
    icon: "👯‍♀️",
    title: "Join a Running Group",
    description:
      "Connect with postnatal running groups in your area or online. Running alongside other new moms provides accountability, community, and understanding of the unique challenges.",
    tag: "Community",
    tagColor: "#D97706",
    tagBg: "#FFFBEB",
    bg: "#FFFEF4",
    border: "#FDE68A",
  },
];

// ─── RunningTipsSection ────────────────────────────────────────────────────────
function RunningTipsSection() {
  return (
    <section
      id="tips-section"
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid rgba(139,92,246,0.15)" }}
    >
      {/* Section header */}
      <div
        className="px-5 py-5"
        style={{
          background:
            "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 55%, #A78BFA 100%)",
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,255,255,0.22)" }}
          >
            <Wind size={18} color="white" />
          </div>
          <div>
            <h2 className="font-extrabold text-xl text-white leading-tight">
              Postpartum Running Tips
            </h2>
            <p className="text-white/80 text-sm mt-0.5">
              Safe, practical guidance to get you back moving — at your own pace
            </p>
          </div>
        </div>
      </div>

      {/* Motivational quote */}
      <div
        className="mx-4 mt-5 mb-4 px-4 py-3.5 rounded-2xl flex items-start gap-3"
        style={{
          background: "linear-gradient(135deg, #F3E8FF 0%, #EDE0FF 100%)",
          border: "1px solid rgba(139,92,246,0.15)",
        }}
      >
        <span className="text-2xl shrink-0">💬</span>
        <p
          className="text-sm font-semibold italic leading-relaxed"
          style={{ color: "#3A1A5A" }}
        >
          "Taking care of yourself is not selfish — it's the most powerful thing
          you can do for your baby. Every step forward is a victory."
        </p>
      </div>

      {/* Tips grid */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {RUNNING_TIPS.map((tip) => (
            <div
              key={tip.title}
              className="rounded-2xl p-4 flex flex-col gap-2 transition-all hover:shadow-md"
              style={{
                background: tip.bg,
                border: `1px solid ${tip.border}`,
              }}
              data-ocid="running_tip_card"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-2xl shrink-0">{tip.icon}</span>
                  <h3
                    className="font-bold text-sm leading-tight"
                    style={{ color: "#3A1A5A" }}
                  >
                    {tip.title}
                  </h3>
                </div>
                <span
                  className="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                  style={{
                    background: tip.tagBg,
                    color: tip.tagColor,
                    border: `1px solid ${tip.tagColor}33`,
                  }}
                >
                  {tip.tag}
                </span>
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#6A3A7A" }}
              >
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Having Baby Dashboard ────────────────────────────────────────────────────
export default function HavingBabyDashboard({
  babyInfo,
  onLogout,
}: HavingBabyDashboardProps) {
  const [activeTab, setActiveTab] = useState<DashboardScreen>("home");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const addNotification = useCallback((n: Omit<NotificationItem, "id">) => {
    const id = `${Date.now()}${Math.random()}`;
    setNotifications((prev) => {
      if (prev.some((p) => p.message === n.message)) return prev;
      return [...prev, { ...n, id }];
    });
    setTimeout(
      () => setNotifications((p) => p.filter((x) => x.id !== id)),
      5000,
    );
  }, []);

  const babyName = babyInfo?.babyName || "Baby";

  const userInfoLike = babyInfo
    ? ({
        firstName: babyInfo.motherName || "Mom",
        lastName: "",
        pregnancyWeek: "0",
        dueDate: "",
        bloodGroup: babyInfo.bloodGroup || "",
        doctorName: babyInfo.doctorName || "",
        hospitalName: babyInfo.hospital || "",
        emergencyName: "",
        emergencyPhone: babyInfo.doctorPhone || "",
        dob: "",
        phone: "",
        pregnancyConfirmDate: "",
        previousPregnancies: "0",
      } as UserInfo)
    : null;

  const renderContent = () => {
    if (activeTab === "assistant")
      return <AssistantPage onBack={() => setActiveTab("home")} />;
    if (activeTab === "community")
      return <CommunityPage onBack={() => setActiveTab("home")} />;
    if (activeTab === "shopping")
      return (
        <ShoppingPage
          onBack={() => setActiveTab("home")}
          dashboardType="having-baby"
        />
      );
    if (activeTab === "classes")
      return (
        <ClassesPage
          onBack={() => setActiveTab("home")}
          userInfo={userInfoLike}
        />
      );

    return (
      <>
        <BabyHeader babyInfo={babyInfo} />
        <div className="max-w-2xl mx-auto px-4 pt-5 space-y-5 pb-28">
          {/* ── 1. Mother's Wellness ────────────────────────────────────── */}
          <section
            id="wellness-section"
            className="rounded-2xl overflow-hidden shadow-sm"
            style={{ border: "1px solid rgba(139,92,246,0.15)" }}
          >
            <SectionHeader
              icon={<span className="text-lg">🌸</span>}
              title="Mother's Wellness"
              subtitle="After-birth care, newborn guidance & relaxation for new moms"
              gradient="linear-gradient(135deg, #8B5CF6 0%, #9D6FF2 50%, #B48AFA 100%)"
            />
            <div className="p-5" style={{ background: "white" }}>
              <BabyWellnessCards />
            </div>
          </section>

          {/* ── 2. Medicine Reminder ─────────────────────────────────────── */}
          <section
            id="reminders-section"
            className="rounded-2xl overflow-hidden shadow-sm"
            style={{ border: "1px solid rgba(124,58,237,0.15)" }}
          >
            <SectionHeader
              icon={<Pill size={18} color="white" />}
              title="Medicine Reminders"
              subtitle="Track your daily medications and timing"
              gradient="linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)"
            />
            <div className="p-5 bg-white">
              <MedicineReminderPanel addNotification={addNotification} />
            </div>
          </section>

          {/* ── 3. Vaccine Reminder ──────────────────────────────────────── */}
          <section
            className="rounded-2xl overflow-hidden shadow-sm"
            style={{ border: "1px solid rgba(167,139,250,0.18)" }}
          >
            <SectionHeader
              icon={<Syringe size={18} color="white" />}
              title="Vaccine Reminder"
              subtitle="Track your baby's immunisation schedule"
              gradient="linear-gradient(135deg, #8E5C9F 0%, #A78BFA 100%)"
            />
            <div className="p-5 bg-white">
              <VaccineReminderInline addNotification={addNotification} />
            </div>
          </section>

          {/* ── 4. Doctor Connect ────────────────────────────────────────── */}
          <section
            id="connect-section"
            className="rounded-2xl overflow-hidden shadow-sm"
            style={{ border: "1px solid rgba(124,58,237,0.15)" }}
          >
            <SectionHeader
              icon={<Calendar size={18} color="white" />}
              title="Doctor Connect"
              subtitle="Tap any card to call or WhatsApp your care team instantly"
              gradient="linear-gradient(135deg, #5B21B6 0%, #7C3AED 50%, #9D6FF2 100%)"
            />
            <div className="p-5 bg-white">
              <BabyDoctorConnectInline babyInfo={babyInfo} />
            </div>
          </section>

          {/* ── 5. Running Tips ──────────────────────────────────────────── */}
          <RunningTipsSection />
        </div>
        <Footer />
      </>
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(160deg, #FAF5FF 0%, #F3E8FF 50%, #FDF4FF 100%)",
      }}
    >
      {activeTab === "home" && (
        <>
          <NavBar babyName={babyName} onLogout={onLogout} />
          <BabySectionMenuBar />
        </>
      )}
      {renderContent()}
      <NewBottomNav active={activeTab} onChange={setActiveTab} />
      <GlobalNotifications
        items={notifications}
        onDismiss={(id) =>
          setNotifications((p) => p.filter((x) => x.id !== id))
        }
      />
    </div>
  );
}
