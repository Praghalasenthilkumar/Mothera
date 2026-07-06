import { createContext, useContext, useState } from "react";

export type Language = "en" | "ta";

const translations: Record<Language, Record<string, string>> = {
  en: {
    helpTitle: "How can Mothera help you today?",
    helpSubtitle: "Choose the option that best describes you",
    pregnancyTitle: "I'm in Pregnancy",
    pregnancySubtitle: "Track your pregnancy journey week by week",
    babyTitle: "Already Having Baby",
    babySubtitle: "Track your newborn's health and wellness",
    helpFooter: "Your journey to motherhood begins here",
    chooseLanguage: "Choose Your Language",
    selectLanguageSub: "Select your preferred language",
    continueBtn: "Continue",
    dashboard: "Dashboard",
    timeline: "Timeline",
    health: "Health",
    reminders: "Reminders",
    emergency: "Emergency",
    home: "Home",
    music: "Music",
    chat: "Chat with Tina",
    goodMorning: "Good Morning",
    goodAfternoon: "Good Afternoon",
    goodEvening: "Good Evening",
    pregnancyWeek: "Pregnancy Week",
    dueDate: "Due Date",
    bloodGroup: "Blood Group",
    weekProgress: "Week Progress",
  },
  ta: {
    helpTitle: "மதேரா இன்று உங்களுக்கு எப்படி உதவ முடியும்?",
    helpSubtitle: "உங்களை சிறப்பாக விவரிக்கும் விருப்பத்தை தேர்ந்தெடுங்கள்",
    pregnancyTitle: "நான் கர்ப்பமாக இருக்கிறேன்",
    pregnancySubtitle: "வாரந்தோறும் உங்கள் கர்ப்ப பயணத்தை கண்காணிக்கவும்",
    babyTitle: "ஏற்கனவே குழந்தை இருக்கிறது",
    babySubtitle: "உங்கள் புதிய குழந்தையின் ஆரோக்கியத்தை கண்காணிக்கவும்",
    helpFooter: "தாய்மைக்கான உங்கள் பயணம் இங்கே தொடங்குகிறது",
    chooseLanguage: "மொழியை தேர்ந்தெடுங்கள்",
    selectLanguageSub: "உங்கள் விருப்பமான மொழியை தேர்ந்தெடுங்கள்",
    continueBtn: "தொடரவும்",
    dashboard: "டாஷ்போர்டு",
    timeline: "காலவரிசை",
    health: "ஆரோக்கியம்",
    reminders: "நினைவூட்டல்கள்",
    emergency: "அவசரநிலை",
    home: "முகப்பு",
    music: "இசை",
    chat: "டினாவுடன் பேசுங்கள்",
    goodMorning: "காலை வணக்கம்",
    goodAfternoon: "மதிய வணக்கம்",
    goodEvening: "மாலை வணக்கம்",
    pregnancyWeek: "கர்ப்ப வாரம்",
    dueDate: "பிரசவ தேதி",
    bloodGroup: "இரத்த வகை",
    weekProgress: "வார முன்னேற்றம்",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
