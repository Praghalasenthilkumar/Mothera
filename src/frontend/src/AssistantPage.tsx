import {
  ArrowLeft,
  Heart,
  Mic,
  MicOff,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { getAIResponse } from "./App";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ChatMsg {
  id: string;
  role: "user" | "tina";
  text: string;
  time: string;
}

interface SpeechRecognitionResult {
  readonly [index: number]: SpeechRecognitionAlternative;
  readonly length: number;
}
interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}
interface SpeechRecognitionEvent extends Event {
  readonly results: { [index: number]: SpeechRecognitionResult };
}
interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  interimResults: boolean;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}
interface WindowWithSpeech extends Window {
  SpeechRecognition?: new () => SpeechRecognitionInstance;
  webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const LOGO = "/assets/mothera-logo.jpeg";

const QUICK_REPLIES = [
  "Pregnancy nutrition 🍎",
  "Morning sickness 🤢",
  "Baby kicks 👣",
  "Safe exercises 🧘‍♀️",
  "Labor signs 🏥",
  "Newborn care 👶",
  "Breastfeeding tips 🤱",
  "Postpartum recovery 💪",
  "Sleep during pregnancy 🌙",
  "Baby vaccines 💉",
  "Mental wellness 🧠",
  "Doctor questions ❓",
];

function getTimeStr() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── TinaMessageContent ───────────────────────────────────────────────────────
// Renders Tina's structured responses with bold headers and bullet points
function TinaMessageContent({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/);
  return (
    <div className="space-y-2.5">
      {paragraphs.map((para) => {
        const lines = para.split("\n");
        const paraKey = para.slice(0, 32);
        return (
          <div key={paraKey}>
            {lines.map((line) => {
              const lineKey = line.slice(0, 40) || Math.random().toString();
              // Bold section header: **text:**
              const boldHeader = line.match(/^\*\*(.+)\*\*:?\s*$/);
              if (boldHeader) {
                return (
                  <p
                    key={lineKey}
                    className="font-bold text-sm leading-snug mt-1"
                    style={{ color: "#5A2D7A" }}
                  >
                    {boldHeader[1]}
                  </p>
                );
              }
              // Bullet point: starts with •
              if (line.startsWith("•")) {
                return (
                  <div key={lineKey} className="flex items-start gap-2 pl-1">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: "oklch(0.52 0.19 290)" }}
                    />
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: "#3D1A55" }}
                    >
                      {line.slice(1).trim()}
                    </span>
                  </div>
                );
              }
              // Regular line
              if (line.trim()) {
                return (
                  <p
                    key={lineKey}
                    className="text-sm leading-relaxed"
                    style={{ color: "#3D1A55" }}
                  >
                    {line}
                  </p>
                );
              }
              return null;
            })}
          </div>
        );
      })}
    </div>
  );
}

// ─── AssistantPage ────────────────────────────────────────────────────────────
interface AssistantPageProps {
  onBack: () => void;
}

export default function AssistantPage({ onBack }: AssistantPageProps) {
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voiceReplyOn, setVoiceReplyOn] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const recogRef = useRef<SpeechRecognitionInstance | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const speakText = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.95;
    utt.pitch = 1.1;
    utt.lang = "en-US";
    setSpeaking(true);
    utt.onend = () => setSpeaking(false);
    utt.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utt);
  }, []);

  const stopSpeaking = useCallback(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, []);

  const send = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      const uid = Date.now().toString();
      setMsgs((p) => [
        ...p,
        { id: uid, role: "user", text, time: getTimeStr() },
      ]);
      setInput("");
      setTyping(true);
      setTimeout(scrollToBottom, 50);
      setTimeout(
        () => {
          const reply = getAIResponse(text);
          setTyping(false);
          setMsgs((p) => [
            ...p,
            { id: `${uid}r`, role: "tina", text: reply, time: getTimeStr() },
          ]);
          setTimeout(scrollToBottom, 50);
          if (voiceReplyOn) speakText(reply);
        },
        1200 + Math.random() * 400,
      );
    },
    [voiceReplyOn, speakText, scrollToBottom],
  );

  const toggleVoiceInput = () => {
    const win = window as WindowWithSpeech;
    const SR = win.SpeechRecognition ?? win.webkitSpeechRecognition;
    if (!SR) {
      alert(
        "Speech recognition not supported in this browser. Please type your message.",
      );
      return;
    }
    if (listening) {
      recogRef.current?.stop();
      setListening(false);
      return;
    }
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.onresult = (e) => {
      const t = e.results[0][0].transcript;
      setInput(t);
      send(t);
    };
    rec.onend = () => setListening(false);
    recogRef.current = rec;
    rec.start();
    setListening(true);
  };

  const toggleVoiceReply = () => {
    if (voiceReplyOn) stopSpeaking();
    setVoiceReplyOn((v) => !v);
  };

  const isEmpty = msgs.length === 0;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "oklch(0.98 0.015 290)",
        backgroundImage:
          "radial-gradient(oklch(0.52 0.19 290 / 0.04) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 shrink-0"
        style={{
          background:
            "linear-gradient(150deg, oklch(0.45 0.22 290) 0%, oklch(0.60 0.19 305) 55%, oklch(0.72 0.15 320) 100%)",
          boxShadow: "0 4px 32px oklch(0.45 0.22 290 / 0.40)",
        }}
        data-ocid="assistant.header"
      >
        {/* Top row */}
        <div className="flex items-center gap-3 px-4 pt-safe pt-4 pb-3 relative">
          {/* Back button */}
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-95 shrink-0"
            style={{ background: "rgba(255,255,255,0.18)" }}
            aria-label="Go back to home"
            data-ocid="assistant.back_button"
          >
            <ArrowLeft size={18} color="white" />
          </button>

          {/* Center identity */}
          <div className="flex-1 flex flex-col items-center min-w-0">
            {/* Avatar with glow ring */}
            <div className="relative inline-flex mb-1">
              <div
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  background: "rgba(255,255,255,0.20)",
                  transform: "scale(1.25)",
                  borderRadius: "50%",
                }}
              />
              <div
                className="w-14 h-14 rounded-full overflow-hidden shrink-0 relative z-10"
                style={{
                  border: "2.5px solid rgba(255,255,255,0.60)",
                  boxShadow:
                    "0 0 0 5px rgba(255,255,255,0.15), 0 4px 20px rgba(0,0,0,0.30)",
                }}
              >
                <img
                  src={LOGO}
                  alt="Tina AI avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center z-20"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #C084FC)",
                  border: "2px solid white",
                }}
              >
                <Sparkles size={9} color="white" />
              </span>
            </div>
            <p className="text-white font-extrabold text-base leading-tight tracking-tight">
              Tina 💜
            </p>
            <p className="text-white/80 text-xs font-medium leading-none mt-0.5">
              Your Pregnancy & Motherhood Companion
            </p>
          </div>

          {/* Voice reply toggle */}
          <button
            type="button"
            onClick={toggleVoiceReply}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-95 shrink-0"
            style={{
              background: voiceReplyOn
                ? "rgba(255,255,255,0.35)"
                : "rgba(255,255,255,0.18)",
              border: voiceReplyOn
                ? "1.5px solid rgba(255,255,255,0.75)"
                : "1.5px solid rgba(255,255,255,0.25)",
            }}
            aria-label={
              voiceReplyOn ? "Disable voice replies" : "Enable voice replies"
            }
            aria-pressed={voiceReplyOn}
            data-ocid="assistant.voice_reply_toggle"
          >
            {voiceReplyOn ? (
              <Volume2 size={16} color="white" />
            ) : (
              <VolumeX size={16} color="rgba(255,255,255,0.75)" />
            )}
          </button>
        </div>

        {/* Status bar */}
        <div
          className="px-4 py-2 flex items-center gap-3"
          style={{ background: "rgba(0,0,0,0.15)" }}
        >
          {/* Online indicator */}
          <span className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: "oklch(0.72 0.19 145)",
                boxShadow: "0 0 0 3px oklch(0.72 0.19 145 / 0.30)",
                animation: "pulse 2s infinite",
              }}
            />
            <span className="text-xs font-semibold text-white/90">Online</span>
          </span>
          <span className="text-white/30 text-xs">·</span>
          {/* Voice status */}
          {speaking ? (
            <span className="flex items-center gap-1.5">
              <span className="flex gap-0.5 items-end" aria-label="Speaking">
                {(["3a", "5b", "4c", "6d", "3e"] as const).map((bar) => (
                  <span
                    key={bar}
                    className="rounded-full"
                    style={{
                      width: "3px",
                      height: `${Number.parseInt(bar)}px`,
                      background: "rgba(255,255,255,0.85)",
                      animation: `pulse ${0.6 + "abcde".indexOf(bar.slice(-1)) * 0.1}s ease-in-out infinite alternate`,
                    }}
                  />
                ))}
              </span>
              <span className="text-xs text-white/90 font-semibold ml-1">
                Tina is speaking…
              </span>
              <button
                type="button"
                onClick={stopSpeaking}
                className="text-[10px] px-2 py-0.5 rounded-full ml-1 font-semibold"
                style={{ background: "rgba(255,255,255,0.25)", color: "white" }}
                aria-label="Stop speaking"
              >
                Stop
              </button>
            </span>
          ) : listening ? (
            <span className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full flex items-center justify-center"
                style={{
                  background: "oklch(0.55 0.22 25)",
                  boxShadow: "0 0 0 4px oklch(0.55 0.22 25 / 0.30)",
                  animation: "pulse 0.7s infinite",
                }}
              />
              <span className="text-xs text-white font-bold tracking-wide uppercase">
                Listening…
              </span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Heart
                size={11}
                color="rgba(255,255,255,0.75)"
                fill="rgba(255,255,255,0.4)"
              />
              <span className="text-xs text-white/75">
                Pregnancy & motherhood tips
              </span>
            </span>
          )}
        </div>
      </header>

      {/* ── Chat Area ──────────────────────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0"
        style={{ paddingBottom: "148px" }}
        role="log"
        aria-live="polite"
        aria-label="Chat with Tina"
        data-ocid="assistant.chat_area"
      >
        {isEmpty ? (
          /* ── Welcome / Empty State ─────────────────────────────────────── */
          <div
            className="flex flex-col pt-6 animate-fade-in"
            data-ocid="assistant.welcome_state"
          >
            {/* Tina's welcome message — styled exactly like a chat message */}
            <div className="flex items-end gap-2 animate-message-appear">
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full overflow-hidden shrink-0 mb-5"
                style={{
                  border: "1.5px solid oklch(0.52 0.19 290 / 0.35)",
                  boxShadow:
                    "0 0 0 3px oklch(0.52 0.19 290 / 0.10), 0 2px 10px oklch(0.52 0.19 290 / 0.18)",
                }}
              >
                <img
                  src={LOGO}
                  alt="Tina"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bubble + timestamp */}
              <div className="flex flex-col max-w-[82%] gap-1">
                {/* Name tag */}
                <span
                  className="text-[11px] font-semibold pl-1 mb-0.5"
                  style={{ color: "oklch(0.55 0.19 290)" }}
                >
                  Tina 💜
                </span>

                {/* Message bubble */}
                <div
                  className="px-4 py-3.5"
                  style={{
                    background: "white",
                    borderRadius: "1.25rem 1.25rem 1.25rem 0.25rem",
                    boxShadow: "0 2px 16px oklch(0.52 0.19 290 / 0.13)",
                    border: "1px solid oklch(0.52 0.19 290 / 0.13)",
                    borderLeft: "3.5px solid oklch(0.52 0.19 290 / 0.55)",
                  }}
                >
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#3D1A55" }}
                  >
                    Hello, I'm{" "}
                    <strong style={{ color: "#5A2D7A" }}>Tina</strong> 💜 Your
                    Maternal Health Assistant. Tell me what help you need — I'm
                    here for you!
                  </p>
                </div>

                {/* Timestamp */}
                <span
                  className="text-[10px] px-1"
                  style={{ color: "#B090C8", alignSelf: "flex-start" }}
                >
                  {getTimeStr()}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* ── Messages ──────────────────────────────────────────────────── */
          <>
            {msgs.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 animate-message-appear ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
                data-ocid="chat.message"
              >
                {/* Tina avatar (left side only) */}
                {msg.role === "tina" && (
                  <div
                    className="w-8 h-8 rounded-full overflow-hidden shrink-0 mb-5"
                    style={{
                      border: "1.5px solid oklch(0.52 0.19 290 / 0.30)",
                      boxShadow: "0 2px 8px oklch(0.52 0.19 290 / 0.15)",
                    }}
                  >
                    <img
                      src={LOGO}
                      alt="Tina"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-col max-w-[80%] gap-1">
                  <div
                    className="px-4 py-3"
                    style={
                      msg.role === "user"
                        ? {
                            background:
                              "linear-gradient(135deg, oklch(0.48 0.21 290), oklch(0.62 0.17 308))",
                            color: "white",
                            borderRadius: "1.25rem 1.25rem 0.25rem 1.25rem",
                            boxShadow: "0 4px 16px oklch(0.48 0.21 290 / 0.30)",
                            fontSize: "0.875rem",
                            lineHeight: "1.6",
                          }
                        : {
                            background: "white",
                            borderRadius: "1.25rem 1.25rem 1.25rem 0.25rem",
                            boxShadow: "0 2px 16px oklch(0.52 0.19 290 / 0.12)",
                            border: "1px solid oklch(0.52 0.19 290 / 0.12)",
                            borderLeft:
                              "3.5px solid oklch(0.52 0.19 290 / 0.55)",
                            padding: "0.875rem 1rem",
                          }
                    }
                  >
                    {msg.role === "user" ? (
                      <span className="text-sm leading-relaxed">
                        {msg.text}
                      </span>
                    ) : (
                      <TinaMessageContent text={msg.text} />
                    )}
                  </div>
                  {/* Timestamp */}
                  <span
                    className="text-[10px] px-1"
                    style={{
                      color: "#B090C8",
                      alignSelf:
                        msg.role === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex items-end gap-2 animate-message-appear">
                <div
                  className="w-8 h-8 rounded-full overflow-hidden shrink-0 mb-5"
                  style={{
                    border: "1.5px solid oklch(0.52 0.19 290 / 0.30)",
                    boxShadow: "0 2px 8px oklch(0.52 0.19 290 / 0.15)",
                  }}
                >
                  <img
                    src={LOGO}
                    alt="Tina"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="px-5 py-3.5"
                  style={{
                    background: "white",
                    borderRadius: "1.25rem 1.25rem 1.25rem 0.25rem",
                    boxShadow: "0 2px 16px oklch(0.52 0.19 290 / 0.12)",
                    border: "1px solid oklch(0.52 0.19 290 / 0.12)",
                    borderLeft: "3.5px solid oklch(0.52 0.19 290 / 0.55)",
                  }}
                  aria-label="Tina is typing"
                >
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
          </>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input Bar (fixed above bottom nav) ────────────────────────────── */}
      <div
        className="fixed left-0 right-0 z-30 shrink-0"
        style={{ bottom: "64px" }}
        data-ocid="assistant.input_bar"
      >
        {/* Quick reply chips */}
        <div
          className="px-3 pt-3 pb-1.5 flex gap-2 overflow-x-auto"
          aria-label="Quick reply suggestions"
          style={{
            background: "oklch(0.98 0.015 290 / 0.97)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid oklch(0.52 0.19 290 / 0.10)",
            scrollbarWidth: "none",
          }}
        >
          {QUICK_REPLIES.map((q) => (
            <button
              type="button"
              key={q}
              onClick={() => send(q.replace(/ [^\w\s]/gu, "").trim())}
              className="shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap active:scale-95 hover:shadow-sm"
              style={{
                background: "white",
                color: "oklch(0.48 0.21 290)",
                border: "1.5px solid oklch(0.52 0.19 290 / 0.22)",
                boxShadow: "0 1px 4px oklch(0.52 0.19 290 / 0.10)",
              }}
              data-ocid="chat.quick_reply"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input row */}
        <div
          className="px-3 py-2.5 flex items-center gap-2"
          style={{
            background: "white",
            borderTop: "1px solid oklch(0.52 0.19 290 / 0.10)",
            boxShadow: "0 -4px 24px oklch(0.52 0.19 290 / 0.12)",
            paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom, 0px))",
          }}
        >
          {/* Mic button — voice input */}
          <button
            type="button"
            onClick={toggleVoiceInput}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all shrink-0 active:scale-95"
            style={
              listening
                ? {
                    background: "oklch(0.55 0.22 25)",
                    color: "white",
                    boxShadow: "0 0 0 5px oklch(0.55 0.22 25 / 0.22)",
                    animation: "pulse 1.5s infinite",
                  }
                : {
                    background: "oklch(0.52 0.19 290 / 0.10)",
                    color: "oklch(0.52 0.19 290)",
                    border: "1.5px solid oklch(0.52 0.19 290 / 0.20)",
                  }
            }
            aria-label={listening ? "Stop voice input" : "Start voice input"}
            aria-pressed={listening}
            data-ocid="chat.voice_input_button"
          >
            {listening ? <MicOff size={17} /> : <Mic size={17} />}
          </button>

          {/* Text input */}
          <label htmlFor="tina-chat-input" className="sr-only">
            Message Tina about pregnancy or baby care
          </label>
          <input
            id="tina-chat-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Ask Tina anything about pregnancy or baby care…"
            className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none min-w-0 transition-all"
            style={{
              background: "oklch(0.97 0.02 290)",
              color: "#3D1A55",
              border: "1.5px solid oklch(0.52 0.19 290 / 0.18)",
            }}
            data-ocid="chat.input"
          />

          {/* Send button */}
          <button
            type="button"
            onClick={() => send(input)}
            disabled={!input.trim()}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all shrink-0 active:scale-95 disabled:opacity-40"
            style={{
              background: input.trim()
                ? "linear-gradient(135deg, oklch(0.48 0.21 290), oklch(0.62 0.17 308))"
                : "oklch(0.52 0.19 290 / 0.15)",
              color: input.trim() ? "white" : "oklch(0.52 0.19 290)",
              boxShadow: input.trim()
                ? "0 4px 16px oklch(0.48 0.21 290 / 0.38)"
                : "none",
            }}
            aria-label="Send message"
            data-ocid="chat.send_button"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
