import { ArrowLeft, ArrowRight, Baby, Stethoscope, User } from "lucide-react";
import { useState } from "react";

const LOGO = "/assets/mothera-logo.jpeg";

interface HavingBabyInfoPageProps {
  onComplete: (info: Record<string, string>) => void;
}

type StepId = "mother" | "baby" | "doctor";

const STEPS: { id: StepId; label: string; icon: React.ReactNode }[] = [
  { id: "mother", label: "About You", icon: <User size={15} /> },
  { id: "baby", label: "Your Baby", icon: <Baby size={15} /> },
  { id: "doctor", label: "Doctor", icon: <Stethoscope size={15} /> },
];

const purpleInputStyle = {
  borderColor: "rgba(167,139,250,0.40)",
  background: "rgba(250,245,255,0.9)",
  color: "#3b0764",
};

export default function HavingBabyInfoPage({
  onComplete,
}: HavingBabyInfoPageProps) {
  const [step, setStep] = useState<StepId>("mother");
  const [form, setForm] = useState<Record<string, string>>({
    motherName: "",
    motherAge: "",
    bloodGroup: "",
    healthConditions: "",
    babyName: "",
    birthDate: "",
    birthWeight: "",
    birthHeight: "",
    doctorName: "",
    hospital: "",
    doctorPhone: "",
  });

  const set = (key: string, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleNext = () => {
    if (step === "mother") setStep("baby");
    else if (step === "baby") setStep("doctor");
    else onComplete(form);
  };

  const handleBack = () => {
    if (step === "baby") setStep("mother");
    else if (step === "doctor") setStep("baby");
  };

  const currentStepIndex = STEPS.findIndex((s) => s.id === step);

  const inputClass =
    "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 border";

  const focusStyle = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    e.currentTarget.style.borderColor = "#a855f7";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.12)";
    e.currentTarget.style.background = "#fff";
  };
  const blurStyle = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    e.currentTarget.style.borderColor = "rgba(167,139,250,0.40)";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.background = "rgba(250,245,255,0.9)";
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-6 px-4 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #faf5ff 0%, #f5f3ff 40%, #ede9fe 100%)",
      }}
    >
      {/* Decorative orbs — purple only */}
      <div
        className="fixed top-[-80px] right-[-60px] w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 65%)",
        }}
      />
      <div
        className="fixed bottom-[-60px] left-[-40px] w-[280px] h-[280px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 65%)",
        }}
      />
      <div
        className="fixed top-[45%] left-[-30px] w-[200px] h-[200px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(196,165,242,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-sm relative z-10">
        {/* Branding Header */}
        <div className="flex flex-col items-center mb-6 animate-fade-in">
          <div
            className="w-[72px] h-[72px] rounded-full overflow-hidden mb-3"
            style={{
              boxShadow: "0 6px 24px rgba(139,92,246,0.32)",
              border: "3px solid rgba(196,165,242,0.55)",
              outline: "5px solid rgba(196,165,242,0.12)",
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
          <p className="text-xs font-medium mt-1" style={{ color: "#9B7EC8" }}>
            Your baby companion
          </p>
        </div>

        {/* Step progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((s, i) => {
              const isActive = s.id === step;
              const isDone = i < currentStepIndex;
              return (
                <div key={s.id} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center mb-1.5 transition-all duration-300"
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)"
                        : isDone
                          ? "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)"
                          : "rgba(196,165,242,0.20)",
                      color: isActive || isDone ? "#fff" : "#9B7EC8",
                      boxShadow: isActive
                        ? "0 4px 12px rgba(124,58,237,0.32)"
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
                        ? "#7c3aed"
                        : isDone
                          ? "#7c3aed"
                          : "#9B7EC8",
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
            style={{ background: "rgba(196,165,242,0.25)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${((currentStepIndex + 1) / STEPS.length) * 100}%`,
                background: "linear-gradient(90deg, #7c3aed 0%, #a855f7 100%)",
                boxShadow: "0 0 8px rgba(124,58,237,0.35)",
              }}
            />
          </div>
        </div>

        {/* Step card */}
        <div
          className="rounded-2xl p-6 animate-fade-in"
          style={{
            background: "rgba(255,255,255,0.97)",
            boxShadow:
              "0 20px 60px rgba(124,58,237,0.12), 0 4px 20px rgba(124,58,237,0.07), 0 0 0 1px rgba(196,165,242,0.25)",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Mother step */}
          {step === "mother" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(139,92,246,0.12)" }}
                >
                  <User size={18} style={{ color: "#7c3aed" }} />
                </div>
                <div>
                  <h2
                    className="font-bold text-base"
                    style={{ color: "#4C1D95" }}
                  >
                    About You
                  </h2>
                  <p className="text-xs" style={{ color: "#9B7EC8" }}>
                    Your personal details
                  </p>
                </div>
              </div>
              <div>
                <label
                  htmlFor="motherName"
                  className="text-sm font-semibold block mb-1.5"
                  style={{ color: "#3b0764" }}
                >
                  Your Name
                </label>
                <input
                  id="motherName"
                  placeholder="Enter your name"
                  value={form.motherName}
                  onChange={(e) => set("motherName", e.target.value)}
                  className={inputClass}
                  style={purpleInputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  data-ocid="having_baby.mother_name_input"
                />
              </div>
              <div>
                <label
                  htmlFor="motherAge"
                  className="text-sm font-semibold block mb-1.5"
                  style={{ color: "#3b0764" }}
                >
                  Your Age
                </label>
                <input
                  id="motherAge"
                  type="number"
                  placeholder="e.g. 28"
                  value={form.motherAge}
                  onChange={(e) => set("motherAge", e.target.value)}
                  className={inputClass}
                  style={purpleInputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  data-ocid="having_baby.mother_age_input"
                />
              </div>
              <div>
                <label
                  htmlFor="bloodGroup"
                  className="text-sm font-semibold block mb-1.5"
                  style={{ color: "#3b0764" }}
                >
                  Blood Group
                </label>
                <select
                  id="bloodGroup"
                  value={form.bloodGroup}
                  onChange={(e) => set("bloodGroup", e.target.value)}
                  className={`${inputClass} cursor-pointer`}
                  style={{
                    ...purpleInputStyle,
                    color: form.bloodGroup ? "#3b0764" : "#9B7EC8",
                  }}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  data-ocid="having_baby.blood_group_select"
                >
                  <option value="">Select blood group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ),
                  )}
                </select>
              </div>
              <div>
                <label
                  htmlFor="healthConditions"
                  className="text-sm font-semibold block mb-1.5"
                  style={{ color: "#3b0764" }}
                >
                  Health Conditions{" "}
                  <span
                    className="font-normal text-xs"
                    style={{ color: "#9B7EC8" }}
                  >
                    (optional)
                  </span>
                </label>
                <textarea
                  id="healthConditions"
                  placeholder="e.g. diabetes, hypertension (or leave blank)"
                  value={form.healthConditions}
                  onChange={(e) => set("healthConditions", e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 border resize-none"
                  style={purpleInputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  data-ocid="having_baby.health_conditions_input"
                />
              </div>
            </div>
          )}

          {/* Baby step */}
          {step === "baby" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(139,92,246,0.12)" }}
                >
                  <Baby size={18} style={{ color: "#7c3aed" }} />
                </div>
                <div>
                  <h2
                    className="font-bold text-base"
                    style={{ color: "#4C1D95" }}
                  >
                    About Your Baby
                  </h2>
                  <p className="text-xs" style={{ color: "#9B7EC8" }}>
                    Your little one's details
                  </p>
                </div>
              </div>
              <div>
                <label
                  htmlFor="babyName"
                  className="text-sm font-semibold block mb-1.5"
                  style={{ color: "#3b0764" }}
                >
                  Baby's Name
                </label>
                <input
                  id="babyName"
                  placeholder="Enter baby's name"
                  value={form.babyName}
                  onChange={(e) => set("babyName", e.target.value)}
                  className={inputClass}
                  style={purpleInputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  data-ocid="having_baby.baby_name_input"
                />
              </div>
              <div>
                <label
                  htmlFor="birthDate"
                  className="text-sm font-semibold block mb-1.5"
                  style={{ color: "#3b0764" }}
                >
                  Date of Birth
                </label>
                <input
                  id="birthDate"
                  type="date"
                  value={form.birthDate}
                  onChange={(e) => set("birthDate", e.target.value)}
                  className={inputClass}
                  style={purpleInputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  data-ocid="having_baby.birth_date_input"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="birthWeight"
                    className="text-sm font-semibold block mb-1.5"
                    style={{ color: "#3b0764" }}
                  >
                    Birth Weight (kg)
                  </label>
                  <input
                    id="birthWeight"
                    placeholder="e.g. 3.2"
                    value={form.birthWeight}
                    onChange={(e) => set("birthWeight", e.target.value)}
                    className={inputClass}
                    style={purpleInputStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                    data-ocid="having_baby.birth_weight_input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="birthHeight"
                    className="text-sm font-semibold block mb-1.5"
                    style={{ color: "#3b0764" }}
                  >
                    Birth Height (cm)
                  </label>
                  <input
                    id="birthHeight"
                    placeholder="e.g. 50"
                    value={form.birthHeight}
                    onChange={(e) => set("birthHeight", e.target.value)}
                    className={inputClass}
                    style={purpleInputStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                    data-ocid="having_baby.birth_height_input"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Doctor step */}
          {step === "doctor" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(139,92,246,0.12)" }}
                >
                  <Stethoscope size={18} style={{ color: "#7c3aed" }} />
                </div>
                <div>
                  <h2
                    className="font-bold text-base"
                    style={{ color: "#4C1D95" }}
                  >
                    Your Doctor
                  </h2>
                  <p className="text-xs" style={{ color: "#9B7EC8" }}>
                    Medical care details
                  </p>
                </div>
              </div>
              <div>
                <label
                  htmlFor="doctorName"
                  className="text-sm font-semibold block mb-1.5"
                  style={{ color: "#3b0764" }}
                >
                  Doctor's Name
                </label>
                <input
                  id="doctorName"
                  placeholder="Dr. Priya Sharma"
                  value={form.doctorName}
                  onChange={(e) => set("doctorName", e.target.value)}
                  className={inputClass}
                  style={purpleInputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  data-ocid="having_baby.doctor_name_input"
                />
              </div>
              <div>
                <label
                  htmlFor="hospital"
                  className="text-sm font-semibold block mb-1.5"
                  style={{ color: "#3b0764" }}
                >
                  Hospital / Clinic
                </label>
                <input
                  id="hospital"
                  placeholder="e.g. Apollo Hospital"
                  value={form.hospital}
                  onChange={(e) => set("hospital", e.target.value)}
                  className={inputClass}
                  style={purpleInputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  data-ocid="having_baby.hospital_input"
                />
              </div>
              <div>
                <label
                  htmlFor="doctorPhone"
                  className="text-sm font-semibold block mb-1.5"
                  style={{ color: "#3b0764" }}
                >
                  Doctor's Phone
                </label>
                <input
                  id="doctorPhone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.doctorPhone}
                  onChange={(e) => set("doctorPhone", e.target.value)}
                  className={inputClass}
                  style={purpleInputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  data-ocid="having_baby.doctor_phone_input"
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center gap-3 mt-7">
            {currentStepIndex > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: "rgba(139,92,246,0.08)",
                  color: "#7c3aed",
                  border: "1.5px solid rgba(139,92,246,0.22)",
                }}
                data-ocid="having_baby.back_step_button"
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
                background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                color: "white",
                boxShadow: "0 8px 24px rgba(124,58,237,0.36)",
                letterSpacing: "0.03em",
              }}
              data-ocid="having_baby.next_button"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(124,58,237,0.46)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(124,58,237,0.36)";
              }}
            >
              {step === "doctor" ? (
                "Open Dashboard 🎉"
              ) : (
                <>
                  Next <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p
          className="text-center text-xs mt-6 font-medium"
          style={{ color: "#C084E0" }}
        >
          💜 Caring for you and your little one 💜
        </p>
      </div>
    </div>
  );
}
