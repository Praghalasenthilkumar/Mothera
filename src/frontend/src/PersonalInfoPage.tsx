import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Baby, Heart, Phone, User } from "lucide-react";
import { useState } from "react";

export interface UserInfo {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  bloodGroup: string;
  dueDate: string;
  pregnancyConfirmDate: string;
  pregnancyWeek: string;
  previousPregnancies: string;
  doctorName: string;
  emergencyName: string;
  emergencyPhone: string;
}

interface PersonalInfoPageProps {
  onComplete: (data: UserInfo) => void;
}

const LOGO = "/assets/mothera-logo.jpeg";

type StepId = "personal" | "pregnancy" | "emergency";

const STEPS: { id: StepId; label: string; icon: React.ReactNode }[] = [
  { id: "personal", label: "About You", icon: <User size={15} /> },
  { id: "pregnancy", label: "Pregnancy", icon: <Baby size={15} /> },
  { id: "emergency", label: "Emergency", icon: <Phone size={15} /> },
];

const inputStyle = {
  borderColor: "rgba(167,139,250,0.4)",
  background: "rgba(250,247,253,0.9)",
  color: "#2B1F3A",
};

export default function PersonalInfoPage({
  onComplete,
}: PersonalInfoPageProps) {
  const [step, setStep] = useState<StepId>("personal");
  const [form, setForm] = useState<UserInfo>({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    bloodGroup: "",
    dueDate: "",
    pregnancyConfirmDate: "",
    pregnancyWeek: "",
    previousPregnancies: "",
    doctorName: "",
    emergencyName: "",
    emergencyPhone: "",
  });
  const [warn, setWarn] = useState(false);

  const set = (field: keyof UserInfo, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (warn) setWarn(false);
  };

  const currentStepIndex = STEPS.findIndex((s) => s.id === step);

  const handleNext = () => {
    if (step === "personal") setStep("pregnancy");
    else if (step === "pregnancy") setStep("emergency");
    else {
      const hasAny = Object.values(form).some((v) => v.trim() !== "");
      if (!hasAny) {
        setWarn(true);
        return;
      }
      onComplete(form);
    }
  };

  const handleBack = () => {
    if (step === "pregnancy") setStep("personal");
    else if (step === "emergency") setStep("pregnancy");
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 border";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-6 px-4 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #ede9fe 0%, #f5e8ff 40%, #fdf2ff 100%)",
      }}
    >
      {/* Decorative orbs */}
      <div
        className="fixed top-[-80px] right-[-60px] w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 65%)",
        }}
      />
      <div
        className="fixed bottom-[-60px] left-[-40px] w-[280px] h-[280px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(196,165,242,0.18) 0%, transparent 65%)",
        }}
      />

      <div className="w-full max-w-lg relative z-10">
        {/* Branding Header */}
        <div className="flex flex-col items-center mb-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-14 h-14 rounded-full overflow-hidden animate-pulse-glow"
              style={{
                boxShadow: "0 4px 16px rgba(139,92,246,0.3)",
                border: "3px solid rgba(196,165,242,0.5)",
              }}
            >
              <img
                src={LOGO}
                alt="Mothera Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1
                className="text-2xl font-extrabold tracking-tight"
                style={{
                  background:
                    "linear-gradient(135deg, #6B21A8 0%, #a855f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Mothera
              </h1>
              <p className="text-xs font-medium" style={{ color: "#9B78B8" }}>
                Maternal Health Care
              </p>
            </div>
          </div>
          <h2
            className="text-lg font-bold text-center"
            style={{ color: "#4C1D95" }}
          >
            Welcome — Tell Us About You
          </h2>
          <p
            className="text-sm text-center mt-1 max-w-xs"
            style={{ color: "#9B78B8" }}
          >
            Personalise your journey. You can skip and fill in later.
          </p>
        </div>

        {/* Step progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((s, i) => {
              const isActive = s.id === step;
              const isDone = i < currentStepIndex;
              return (
                <div key={s.id} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center mb-1.5 transition-all duration-300 font-semibold text-sm"
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, #7C3AED 0%, #a855f7 100%)"
                        : isDone
                          ? "linear-gradient(135deg, #7C3AED 0%, #a855f7 100%)"
                          : "rgba(196,165,242,0.2)",
                      color: isActive || isDone ? "#fff" : "#9B78B8",
                      boxShadow: isActive
                        ? "0 4px 12px rgba(124,58,237,0.35)"
                        : "none",
                    }}
                  >
                    {isDone ? (
                      <svg
                        width="14"
                        height="11"
                        viewBox="0 0 14 11"
                        fill="none"
                      >
                        <title>Done</title>
                        <path
                          d="M1 5.5L5 9.5L13 1.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      s.icon
                    )}
                  </div>
                  <span
                    className="text-[11px] font-semibold"
                    style={{
                      color: isActive
                        ? "#7C3AED"
                        : isDone
                          ? "#7C3AED"
                          : "#C0A8D8",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Progress track */}
          <div
            className="h-1.5 rounded-full mt-1 mx-4 overflow-hidden"
            style={{ background: "rgba(196,165,242,0.2)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${((currentStepIndex + 1) / STEPS.length) * 100}%`,
                background: "linear-gradient(90deg, #7C3AED 0%, #a855f7 100%)",
                boxShadow: "0 0 8px rgba(124,58,237,0.4)",
              }}
            />
          </div>
        </div>

        {warn && (
          <div
            data-ocid="personal_info.error_state"
            className="mb-4 rounded-xl px-4 py-3 text-sm text-center"
            style={{
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              color: "#B91C1C",
            }}
          >
            ⚠️ Please fill in at least one field before continuing.
          </div>
        )}

        {/* Step card */}
        <div
          className="rounded-2xl p-6 animate-fade-in"
          style={{
            background: "rgba(255,255,255,0.97)",
            boxShadow:
              "0 20px 60px rgba(139,92,246,0.16), 0 4px 20px rgba(139,92,246,0.08), 0 0 0 1px rgba(196,165,242,0.2)",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Step: Personal Details */}
          {step === "personal" && (
            <div className="space-y-5">
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(139,92,246,0.12)" }}
                >
                  <User size={18} style={{ color: "#7C3AED" }} />
                </div>
                <div>
                  <h3
                    className="font-bold text-base"
                    style={{ color: "#4C1D95" }}
                  >
                    Personal Details
                  </h3>
                  <p className="text-xs" style={{ color: "#9B78B8" }}>
                    Tell us about yourself
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-semibold mb-1.5 block"
                    style={{ color: "#4A2A6A" }}
                  >
                    First Name
                  </Label>
                  <input
                    id="firstName"
                    data-ocid="personal_info.input"
                    placeholder="e.g. Priya"
                    className={inputClass}
                    style={inputStyle}
                    value={form.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#a855f7";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(168,85,247,0.10)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(167,139,250,0.4)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-semibold mb-1.5 block"
                    style={{ color: "#4A2A6A" }}
                  >
                    Last Name
                  </Label>
                  <input
                    id="lastName"
                    data-ocid="personal_info.input"
                    placeholder="e.g. Sharma"
                    className={inputClass}
                    style={inputStyle}
                    value={form.lastName}
                    onChange={(e) => set("lastName", e.target.value)}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#a855f7";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(168,85,247,0.10)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(167,139,250,0.4)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="dob"
                    className="text-sm font-semibold mb-1.5 block"
                    style={{ color: "#4A2A6A" }}
                  >
                    Date of Birth
                  </Label>
                  <input
                    id="dob"
                    type="date"
                    data-ocid="personal_info.input"
                    className={inputClass}
                    style={inputStyle}
                    value={form.dob}
                    onChange={(e) => set("dob", e.target.value)}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#a855f7";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(168,85,247,0.10)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(167,139,250,0.4)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-sm font-semibold mb-1.5 block"
                    style={{ color: "#4A2A6A" }}
                  >
                    Phone Number
                  </Label>
                  <input
                    id="phone"
                    type="tel"
                    data-ocid="personal_info.input"
                    placeholder="+91 98765 43210"
                    className={inputClass}
                    style={inputStyle}
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#a855f7";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(168,85,247,0.10)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(167,139,250,0.4)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="bloodGroup"
                    className="text-sm font-semibold mb-1.5 block"
                    style={{ color: "#4A2A6A" }}
                  >
                    Blood Group
                  </Label>
                  <Select onValueChange={(v) => set("bloodGroup", v)}>
                    <SelectTrigger
                      id="bloodGroup"
                      data-ocid="personal_info.select"
                      className="rounded-xl h-11 border"
                      style={inputStyle}
                    >
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                        (bg) => (
                          <SelectItem key={bg} value={bg}>
                            {bg}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="doctorName"
                    className="text-sm font-semibold mb-1.5 block"
                    style={{ color: "#4A2A6A" }}
                  >
                    Doctor Name
                  </Label>
                  <input
                    id="doctorName"
                    data-ocid="personal_info.input"
                    placeholder="Dr. Meena Kapoor"
                    className={inputClass}
                    style={inputStyle}
                    value={form.doctorName}
                    onChange={(e) => set("doctorName", e.target.value)}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#a855f7";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(168,85,247,0.10)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(167,139,250,0.4)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step: Pregnancy Details */}
          {step === "pregnancy" && (
            <div className="space-y-5">
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(236,72,153,0.10)" }}
                >
                  <Heart size={18} style={{ color: "#BE185D" }} />
                </div>
                <div>
                  <h3
                    className="font-bold text-base"
                    style={{ color: "#4C1D95" }}
                  >
                    Pregnancy Details
                  </h3>
                  <p className="text-xs" style={{ color: "#9B78B8" }}>
                    Your pregnancy journey
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="dueDate"
                    className="text-sm font-semibold mb-1.5 block"
                    style={{ color: "#4A2A6A" }}
                  >
                    Expected Due Date
                  </Label>
                  <input
                    id="dueDate"
                    type="date"
                    data-ocid="pregnancy_info.input"
                    className={inputClass}
                    style={inputStyle}
                    value={form.dueDate}
                    onChange={(e) => set("dueDate", e.target.value)}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#a855f7";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(168,85,247,0.10)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(167,139,250,0.4)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="pregnancyConfirmDate"
                    className="text-sm font-semibold mb-1.5 block"
                    style={{ color: "#4A2A6A" }}
                  >
                    Date of Confirmation
                  </Label>
                  <input
                    id="pregnancyConfirmDate"
                    type="date"
                    data-ocid="pregnancy_info.input"
                    className={inputClass}
                    style={inputStyle}
                    value={form.pregnancyConfirmDate}
                    onChange={(e) =>
                      set("pregnancyConfirmDate", e.target.value)
                    }
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#a855f7";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(168,85,247,0.10)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(167,139,250,0.4)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="pregnancyWeek"
                    className="text-sm font-semibold mb-1.5 block"
                    style={{ color: "#4A2A6A" }}
                  >
                    Current Week
                  </Label>
                  <input
                    id="pregnancyWeek"
                    type="number"
                    min={1}
                    max={42}
                    data-ocid="pregnancy_info.input"
                    placeholder="e.g. 20"
                    className={inputClass}
                    style={inputStyle}
                    value={form.pregnancyWeek}
                    onChange={(e) => set("pregnancyWeek", e.target.value)}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#a855f7";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(168,85,247,0.10)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(167,139,250,0.4)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="previousPregnancies"
                    className="text-sm font-semibold mb-1.5 block"
                    style={{ color: "#4A2A6A" }}
                  >
                    Previous Pregnancies
                  </Label>
                  <input
                    id="previousPregnancies"
                    type="number"
                    min={0}
                    data-ocid="pregnancy_info.input"
                    placeholder="e.g. 0"
                    className={inputClass}
                    style={inputStyle}
                    value={form.previousPregnancies}
                    onChange={(e) => set("previousPregnancies", e.target.value)}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#a855f7";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(168,85,247,0.10)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(167,139,250,0.4)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step: Emergency Contact */}
          {step === "emergency" && (
            <div className="space-y-5">
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(220,38,38,0.10)" }}
                >
                  <Phone size={18} style={{ color: "#DC2626" }} />
                </div>
                <div>
                  <h3
                    className="font-bold text-base"
                    style={{ color: "#4C1D95" }}
                  >
                    Emergency Contact
                  </h3>
                  <p className="text-xs" style={{ color: "#9B78B8" }}>
                    Who to call in an emergency
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="emergencyName"
                    className="text-sm font-semibold mb-1.5 block"
                    style={{ color: "#4A2A6A" }}
                  >
                    Contact Name
                  </Label>
                  <input
                    id="emergencyName"
                    data-ocid="emergency_info.input"
                    placeholder="e.g. Rahul Sharma"
                    className={inputClass}
                    style={inputStyle}
                    value={form.emergencyName}
                    onChange={(e) => set("emergencyName", e.target.value)}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#a855f7";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(168,85,247,0.10)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(167,139,250,0.4)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="emergencyPhone"
                    className="text-sm font-semibold mb-1.5 block"
                    style={{ color: "#4A2A6A" }}
                  >
                    Contact Number
                  </Label>
                  <input
                    id="emergencyPhone"
                    type="tel"
                    data-ocid="emergency_info.input"
                    placeholder="+91 98765 43210"
                    className={inputClass}
                    style={inputStyle}
                    value={form.emergencyPhone}
                    onChange={(e) => set("emergencyPhone", e.target.value)}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#a855f7";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(168,85,247,0.10)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(167,139,250,0.4)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center gap-3 mt-7">
            {currentStepIndex > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: "rgba(139,92,246,0.08)",
                  color: "#7C3AED",
                  border: "1.5px solid rgba(139,92,246,0.2)",
                }}
                data-ocid="personal_info.back_button"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(139,92,246,0.14)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(139,92,246,0.08)";
                }}
              >
                <ArrowLeft size={15} />
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #7C3AED 0%, #a855f7 100%)",
                color: "#fff",
                boxShadow: "0 8px 24px rgba(124,58,237,0.38)",
              }}
              data-ocid="personal_info.primary_button"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(124,58,237,0.48)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(124,58,237,0.38)";
              }}
            >
              {step === "emergency" ? "Continue to Dashboard" : "Next"}
              {step !== "emergency" && <ArrowRight size={15} />}
            </button>
          </div>

          {step === "emergency" && (
            <button
              type="button"
              data-ocid="personal_info.secondary_button"
              onClick={() => onComplete(form)}
              className="w-full text-center text-sm mt-3 transition-colors duration-200"
              style={{ color: "#A080C8" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#7C3AED";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#A080C8";
              }}
            >
              Skip for now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
