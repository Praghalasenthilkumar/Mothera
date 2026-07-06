import {
  AlertTriangle,
  Calendar,
  Check,
  Clock,
  GraduationCap,
  Home,
  LogOut,
  MapPin,
  MessageCircleHeart,
  Mic,
  MicOff,
  Pencil,
  Phone,
  Pill,
  Play,
  Plus,
  Send,
  ShoppingBag,
  Syringe,
  Trash2,
  Users,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import AssistantPage from "./AssistantPage";
import ClassesPage from "./ClassesPage";
import CommunityPage from "./CommunityPage";
import HavingBabyDashboard from "./HavingBabyDashboard";
import HavingBabyInfoPage from "./HavingBabyInfoPage";
import HelpSelectionPage from "./HelpSelectionPage";
import { LanguageProvider } from "./LanguageContext";
import type { Language } from "./LanguageContext";
import LanguageSelectionPage from "./LanguageSelectionPage";
import LoginPage from "./LoginPage";
import PersonalInfoPage from "./PersonalInfoPage";
import type { UserInfo } from "./PersonalInfoPage";
import ShoppingPage from "./ShoppingPage";

// ─── Constants ────────────────────────────────────────────────────────────────
const LOGO = "/assets/mothera-logo.jpeg";

// ─── SectionHeader ────────────────────────────────────────────────────────────
// Reusable section header with left accent bar + icon + title + optional subtitle
export function SectionHeader({
  icon,
  title,
  subtitle,
  accentColor = "#8E5C9F",
  iconBg = "rgba(142,92,159,0.12)",
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  accentColor?: string;
  iconBg?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div
        className="w-1 self-stretch rounded-full shrink-0"
        style={{ background: accentColor, minHeight: "36px" }}
      />
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <h2
          className="font-bold text-lg leading-tight"
          style={{ color: "#3A1A5A" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs mt-0.5" style={{ color: "#A080B8" }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
export interface MonthData {
  month: number;
  fruit: string;
  size: string;
  weight: string;
  bodyChanges: string[];
  tips: string[];
  dietPlan: string[];
}
export interface MedicineEntry {
  id: string;
  name: string;
  stock: number;
  beforeAfterFood: "before" | "after";
  morning: boolean;
  afternoon: boolean;
  night: boolean;
  morningTime: string;
  afternoonTime: string;
  nightTime: string;
  taken: Record<string, boolean>;
}
export interface NotificationItem {
  id: string;
  message: string;
  type: "medicine" | "checkup" | "info";
}

export const MONTH_DATA: MonthData[] = [
  {
    month: 1,
    fruit: "Poppy Seed",
    size: "0.1 cm",
    weight: "<1g",
    bodyChanges: [
      "Fatigue and tiredness",
      "Nausea and morning sickness",
      "Breast tenderness and swelling",
      "Frequent urination begins",
      "Mild cramping possible",
    ],
    tips: [
      "Start taking folic acid (400mcg) daily",
      "Avoid alcohol, smoking and caffeine",
      "Rest as much as possible",
      "Schedule your first prenatal appointment",
    ],
    dietPlan: [
      "Folate-rich foods: spinach, lentils, asparagus",
      "Whole grains for sustained energy",
      "Lean protein: chicken, eggs, beans",
      "Stay well hydrated — 8 glasses water daily",
    ],
  },
  {
    month: 2,
    fruit: "Blueberry",
    size: "1.6 cm",
    weight: "1g",
    bodyChanges: [
      "Morning sickness may peak",
      "Mood swings and emotional sensitivity",
      "Food aversions and cravings begin",
      "Increased saliva production",
      "Bloating and mild constipation",
    ],
    tips: [
      "Eat small, frequent meals every 2–3 hours",
      "Stay hydrated with water and ginger tea",
      "Take prenatal vitamins daily",
      "Avoid strong smells that trigger nausea",
    ],
    dietPlan: [
      "Ginger for nausea relief (tea or candies)",
      "Iron-rich foods: red meat, spinach, lentils",
      "Calcium: dairy, fortified plant milk",
      "Crackers and bland foods to ease sickness",
    ],
  },
  {
    month: 3,
    fruit: "Lime",
    size: "7.4 cm",
    weight: "23g",
    bodyChanges: [
      "Nausea may begin to ease",
      "Visible bump may start showing",
      "Frequent urination continues",
      "Heightened sense of smell",
      "First trimester fatigue may lift",
    ],
    tips: [
      "Begin gentle walking or prenatal exercise",
      "Start Kegel exercises for pelvic floor",
      "Schedule nuchal translucency scan",
      "Discuss birth preferences with your doctor",
    ],
    dietPlan: [
      "Fruits and vegetables of all colours",
      "Omega-3 sources: salmon, walnuts, flaxseed",
      "Vitamin D foods: eggs, fortified cereals",
      "Avoid raw fish and unpasteurised cheese",
    ],
  },
  {
    month: 4,
    fruit: "Avocado",
    size: "14 cm",
    weight: "99g",
    bodyChanges: [
      "Energy levels start to return",
      "Baby movements may first be felt (quickening)",
      "Round ligament pain as uterus grows",
      "Skin changes: glow or pigmentation",
      "Nasal congestion common",
    ],
    tips: [
      "Try prenatal yoga for flexibility and calm",
      "Sleep on your side for better circulation",
      "Stay well hydrated throughout the day",
      "Join a prenatal class or community",
    ],
    dietPlan: [
      "Protein-rich meals: fish, eggs, legumes",
      "Complex carbs: oats, brown rice, quinoa",
      "Healthy fats: avocado, olive oil, nuts",
      "Limit processed foods and excess sugar",
    ],
  },
  {
    month: 5,
    fruit: "Banana",
    size: "25 cm",
    weight: "300g",
    bodyChanges: [
      "Visible kicks and flutters felt regularly",
      "Stretch marks may begin to appear",
      "Lower back pain increases",
      "Baby's heartbeat detectable by stethoscope",
      "Hair and nails growing faster",
    ],
    tips: [
      "Use a belly support band for back pain",
      "Swimming is excellent low-impact exercise",
      "Book prenatal massage if available",
      "Apply moisturiser to belly to ease stretch marks",
    ],
    dietPlan: [
      "Calcium and Vitamin D for bone development",
      "Magnesium-rich foods: leafy greens, seeds",
      "Iron supplements as recommended by doctor",
      "Fibre-rich foods to prevent constipation",
    ],
  },
  {
    month: 6,
    fruit: "Mango",
    size: "30 cm",
    weight: "660g",
    bodyChanges: [
      "Braxton Hicks contractions may start",
      "Heartburn and acid reflux common",
      "Swelling in hands, feet and ankles",
      "Baby responds to sounds and light",
      "Increased appetite",
    ],
    tips: [
      "Elevate feet when resting to reduce swelling",
      "Eat smaller, more frequent meals",
      "Practice breathing exercises for labour prep",
      "Sleep with a pillow between your knees",
    ],
    dietPlan: [
      "Anti-inflammatory foods: berries, turmeric",
      "High-fibre foods for digestive health",
      "Limit sodium to reduce fluid retention",
      "Plenty of water and herbal teas",
    ],
  },
  {
    month: 7,
    fruit: "Cauliflower",
    size: "37 cm",
    weight: "1.1 kg",
    bodyChanges: [
      "Baby is very active with strong kicks",
      "Shortness of breath as uterus rises",
      "Hip and pelvic pain may increase",
      "Sleep becomes more difficult",
      "Baby opens eyes and has sleep cycles",
    ],
    tips: [
      "Pelvic floor exercises are essential now",
      "Practice relaxation and mindfulness techniques",
      "Start drafting your birth plan",
      "Attend a childbirth preparation class",
    ],
    dietPlan: [
      "DHA-rich foods for brain development: oily fish",
      "Vitamin K foods: broccoli, kale, spinach",
      "Zinc sources: pumpkin seeds, beef, chickpeas",
      "Avoid heavy meals before bedtime",
    ],
  },
  {
    month: 8,
    fruit: "Pineapple",
    size: "42 cm",
    weight: "1.9 kg",
    bodyChanges: [
      "Nesting instinct kicks in strongly",
      "Insomnia and difficulty finding comfort",
      "Frequent Braxton Hicks contractions",
      "Shortness of breath increases",
      "Baby is putting on fat layers",
    ],
    tips: [
      "Prepare your hospital bag now",
      "Practise perineal massage daily",
      "Rest whenever possible — listen to your body",
      "Finalise your birth plan with your doctor",
    ],
    dietPlan: [
      "Energy-dense foods for stamina",
      "Healthy snacks: nuts, yogurt, fruit",
      "Keep hydrated — dehydration can trigger contractions",
      "Iron and protein to support baby growth",
    ],
  },
  {
    month: 9,
    fruit: "Watermelon",
    size: "47 cm",
    weight: "2.9 kg",
    bodyChanges: [
      "Baby drops lower into pelvis",
      "Increased pelvic pressure and discomfort",
      "Mucus plug may release (show)",
      "Cervix begins softening and dilating",
      "Frequent bathroom trips increase",
    ],
    tips: [
      "Watch for labour signs: contractions, water breaking",
      "Stay close to home and your hospital",
      "Take gentle short walks daily",
      "Practice labour breathing techniques",
    ],
    dietPlan: [
      "Dates may help prepare cervix for labour",
      "Easy to digest foods: soups, rice, porridge",
      "Stay very well hydrated",
      "Small frequent meals to ease pressure",
    ],
  },
  {
    month: 10,
    fruit: "Pumpkin",
    size: "51 cm",
    weight: "3.4 kg",
    bodyChanges: [
      "Baby is full term and ready",
      "Cervix softening and effacing",
      "Increased Braxton Hicks intensity",
      "Baby's movements may slow slightly",
      "Your body is ready for labour",
    ],
    tips: [
      "Any time now — trust your body completely",
      "Hospital bag should be ready to go",
      "Know your route to the hospital",
      "Surround yourself with support and positivity",
    ],
    dietPlan: [
      "Light, easily digestible meals",
      "Stay very well hydrated for labour",
      "Energy foods for labour: dates, honey, bananas",
      "Avoid heavy or greasy food",
    ],
  },
];

const SEGMENT_COLORS = [
  "#D4A5E8",
  "#C48DD8",
  "#B475C8",
  "#A45DB8",
  "#9445A8",
  "#8435A0",
  "#742598",
  "#641590",
  "#540588",
  "#440080",
];
export const CURRENT_MONTH = 7;

// 2D animated illustration-style baby development images — M1 to M10
const BABY_IMAGES = [
  "/assets/generated/baby-m1-embryo-transparent.dim_200x200.png", // M1 tiny embryo
  "/assets/generated/baby-m2.dim_200x200.png", // M2 embryo with limb buds
  "/assets/generated/baby-m3.dim_200x200.png", // M3 fetus with head shape
  "/assets/generated/baby-m4.dim_200x200.png", // M4 defined fetus
  "/assets/generated/baby-m5.dim_200x200.png", // M5 fetus with limbs
  "/assets/generated/baby-m6.dim_200x200.png", // M6 fetus curled
  "/assets/generated/baby-m7.dim_200x200.png", // M7 larger fetus
  "/assets/generated/baby-m8.dim_200x200.png", // M8 nearly full-size
  "/assets/generated/baby-m9.dim_200x200.png", // M9 birth position
  "/assets/generated/baby-m10-newborn.dim_200x200.png", // M10 newborn
];

const QUICK_REPLIES = [
  "Morning sickness tips",
  "Baby kicks tracking",
  "Safe exercises",
  "Nutrition for pregnancy",
  "Labor signs",
  "Newborn care",
  "Breastfeeding tips",
  "Sleep positions",
];
const EXERCISE_VIDS = [
  "dFO8GBs4UQg",
  "Nrm8qvfMqIE",
  "pBjAP4WCEOQ",
  "EYTOaH3RMIU",
  "vBFjCaE6bMo",
];
const YOGA_VIDS = [
  "pGrJHJ1xPLY",
  "aOfwFJUoOT0",
  "4pKly2JojMw",
  "v7AYKMP6rOE",
  "k_bWkMdEWeo",
];
const MEDITATION_VIDS = [
  "inpok4MKVLM",
  "O-6f5wQXSu8",
  "ZToicYcHIOU",
  "1ZYbU82GVz4",
  "F28MGLlpP90",
];

const DEFAULT_MEDICINES: MedicineEntry[] = [
  {
    id: "1",
    name: "Folic Acid",
    stock: 14,
    beforeAfterFood: "after",
    morning: true,
    afternoon: false,
    night: false,
    morningTime: "08:00",
    afternoonTime: "13:00",
    nightTime: "22:00",
    taken: {},
  },
  {
    id: "2",
    name: "Iron Supplement",
    stock: 3,
    beforeAfterFood: "after",
    morning: false,
    afternoon: true,
    night: false,
    morningTime: "08:00",
    afternoonTime: "13:00",
    nightTime: "22:00",
    taken: {},
  },
];

const DOCTORS_DATA = [
  {
    name: "Dr. Priya Sharma",
    specialty: "OB-GYN",
    phone: "+919876543210",
    badge: "Obstetrician",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100",
  },
  {
    name: "Dr. Anjali Gupta",
    specialty: "Nutritionist",
    phone: "+919876543211",
    badge: "Nutrition Expert",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100",
  },
  {
    name: "Dr. Meera Patel",
    specialty: "Physiotherapist",
    phone: "+919876543212",
    badge: "Women's Health",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100",
  },
];

// ─── AI Chat Helper ──────────────────────────────────────────────────────────
export function getAIResponse(msg: string): string {
  const m = msg.toLowerCase();

  const nonPregnancyTopics =
    /\b(weather|news|sports|politics|cooking recipe|movie|music|technology|crypto|stock|finance|travel|history|science|math|coding|programming|software|game|sport)\b/;
  if (
    nonPregnancyTopics.test(m) &&
    !/pregnan|baby|birth|labor|feeding|newborn|trimester|morn|nausea|kick|breastfeed|maternal|fetal|womb|uterus|cervix|ovul|postpar|vaccin|recovery|mental|wellness/.test(
      m,
    )
  ) {
    return "I'm here to support your pregnancy and motherhood journey! Let me help with pregnancy tips, baby care, or wellness advice instead. 💜 What would you like to know about your pregnancy or newborn?";
  }

  if (/morning sickness|nausea|sick|vomit/.test(m))
    return `Morning sickness is very common and a sign your pregnancy is progressing — you're doing great, mama! 💜 Here's how to find gentle relief:\n\n**Eating & Diet Tips:**\n• Eat small, frequent meals every 2–3 hours instead of large ones\n• Try plain crackers, toast, or plain rice — bland foods are easier to keep down\n• Avoid spicy, fatty, or strongly-scented foods\n• Sip cold ginger tea, lemon water, or sparkling water throughout the day\n• Eat a few crackers before getting out of bed in the morning\n\n**Lifestyle Tips:**\n• Rest when you need to — fatigue makes nausea worse\n• Fresh air and gentle short walks can settle your stomach\n• Try acupressure wristbands (Sea-Bands) for natural relief\n• Cold foods tend to have less smell than hot foods\n\n**When to Call Your Doctor:**\n• If you can't keep any fluids down for 24+ hours\n• If you're losing weight rapidly\n• If you feel dizzy, faint, or see blood\n\nThis phase usually improves after week 12–14. Hang in there — you're amazing! 🌟`;

  if (/kick|movement|baby move/.test(m))
    return `Feeling your baby move is one of the most magical experiences of pregnancy! 💜 Here's everything you need to know:\n\n**When to Expect Movement:**\n• First movements (quickening) felt around weeks 16–25 — often described as flutters or bubbles\n• By week 28, movements become stronger and more regular\n• Every baby has their own pattern — some are more active than others\n\n**Kick Count Guide:**\n• After week 28, do daily kick counts\n• Aim for 10 movements within 2 hours\n• Count at the same time each day when baby is usually active\n• After a meal or sweet drink, baby tends to be more active\n\n**When to Contact Your Doctor:**\n• If you notice a sudden decrease in movement\n• If you count fewer than 10 movements in 2 hours\n• Trust your instincts — you know your baby's patterns best\n\nEvery kick and wiggle is your baby saying hello! Enjoy every precious moment. 🌸`;

  if (/contraction|labor sign|birth|deliver/.test(m))
    return `Understanding labor signs will help you feel prepared and confident when the big day arrives! 🏥 Here's your complete guide:\n\n**Early Signs of Labor:**\n• Braxton Hicks contractions become more frequent and regular\n• Bloody show — pink or brownish mucus discharge\n• Mucus plug release (clear or slightly bloody)\n• Lower back pressure and pelvic heaviness\n• Nesting instinct intensifies\n\n**True Labor Signs:**\n• Contractions coming every 5 minutes, lasting 60 seconds, for 1 hour (5-1-1 rule)\n• Contractions get stronger, longer, and closer together\n• Water breaking (a gush or steady trickle of fluid)\n• Pain doesn't go away when you change position\n\n**Go to the Hospital When:**\n• Your water breaks\n• Contractions follow the 5-1-1 rule\n• You notice heavy bleeding or decreased baby movement\n• Something feels wrong — always trust your instincts\n\n**Prepare Now:**\n• Have your hospital bag ready by week 36\n• Know your route to the hospital\n• Share your birth plan with your care team\n\nYou've got this, mama — your body knows exactly what to do! 💪`;

  if (/back pain|backache/.test(m))
    return `Back pain is one of the most common pregnancy discomforts — you're definitely not alone! 💜 Here's how to find relief:\n\n**Immediate Relief Tips:**\n• Apply a warm (not hot) compress to your lower back\n• Gentle stretching and prenatal yoga can ease tension\n• Use a pregnancy pillow for better sleep support\n• Elevate your feet when sitting to reduce lower back strain\n\n**Daily Habits That Help:**\n• Practice good posture — imagine a string pulling you upright\n• Avoid standing for long periods without breaks\n• Wear low-heeled, supportive shoes\n• Sleep on your left side with a pillow between your knees\n• Use a belly support band in the second and third trimester\n\n**Exercises That Help:**\n• Cat-cow stretches on hands and knees\n• Pelvic tilts lying on your back\n• Swimming and water exercises\n• Prenatal yoga specifically for back relief\n\n**When to See Your Doctor:**\n• Severe or sudden back pain\n• Pain radiating down your leg (sciatica)\n• Pain accompanied by fever or bleeding\n\nYour body is working hard to accommodate your growing baby — be gentle with yourself! 🌸`;

  if (/swelling|edema|puffy|ankles/.test(m))
    return `Some swelling during pregnancy is very normal — especially in your feet, ankles, and hands! 💜 Here's how to manage it:\n\n**Simple Relief Strategies:**\n• Elevate your feet whenever you sit or rest — prop them on a pillow\n• Avoid standing for long periods; take regular breaks to sit\n• Stay well hydrated — drinking more water actually reduces swelling\n• Reduce sodium (salt) in your diet\n• Wear comfortable, supportive footwear\n• Avoid tight socks or stockings that cut off circulation\n\n**Gentle Movement Helps:**\n• Take short walks throughout the day\n• Rotate your ankles and flex your feet regularly\n• Swimming is excellent — water pressure helps reduce swelling\n• Gentle leg exercises while seated\n\n**When to Contact Your Doctor Urgently:**\n• Sudden, severe, or asymmetric swelling\n• Swelling in your face or around your eyes\n• Swelling with headache, vision changes, or upper abdomen pain — these can be signs of preeclampsia\n• Swelling after week 37 that's rapidly worsening\n\nYou're doing beautifully — almost there! 💜`;

  if (/water|hydration|drink/.test(m))
    return `Staying well hydrated is one of the most important things you can do during pregnancy! 💧 Here's everything you need to know:\n\n**How Much to Drink:**\n• Aim for 8–10 glasses (2–2.5 litres) of water daily\n• In hot weather or after exercise, drink more\n• Your urine should be pale yellow — dark yellow means you need more water\n\n**Best Hydration Sources:**\n• Plain water is best — add lemon or cucumber slices if you prefer flavor\n• Coconut water is excellent — rich in electrolytes\n• Herbal teas (ginger, chamomile, peppermint) — check with your doctor\n• Fruits and vegetables count toward hydration (watermelon, cucumber, oranges)\n\n**Signs of Dehydration:**\n• Dark urine or infrequent urination\n• Headaches or dizziness\n• Braxton Hicks contractions can increase with dehydration\n• Fatigue, dry mouth, or feeling faint\n\n**What to Avoid:**\n• Limit caffeine to under 200mg daily (1 small coffee)\n• Avoid sugary drinks, sodas, and energy drinks\n• Skip alcohol completely throughout pregnancy\n\nKeep a water bottle with you everywhere you go — hydration is your superpower! 💜`;

  if (/pain|cramp|discomfort/.test(m))
    return `Some discomfort is a normal part of pregnancy as your body makes incredible changes! 💜 Here's what's usually normal and when to seek help:\n\n**Common Normal Discomforts:**\n• Round ligament pain — sharp or stabbing pain in lower abdomen when moving\n• Braxton Hicks — irregular "practice" contractions that don't intensify\n• Lower back pain as your centre of gravity shifts\n• Pelvic girdle pain as ligaments relax\n• Heartburn and acid reflux, especially in the third trimester\n\n**How to Find Relief:**\n• Warm baths (not hot) for muscle aches\n• Gentle prenatal yoga and stretching\n• Paracetamol is generally safe — avoid ibuprofen\n• Rest and change positions frequently\n• Wear a belly support band for back and pelvic pain\n\n**Seek Immediate Medical Help For:**\n• Severe abdominal pain that doesn't go away\n• Cramping with bleeding or spotting\n• Intense one-sided pain (could indicate ectopic issues early on)\n• Contractions before 37 weeks that become regular\n• Any pain with fever, chills, or dizziness\n\nAlways trust your instincts — you know your body best! 💙`;

  if (/diet|food|eat|nutrition/.test(m))
    return `Good nutrition is the foundation of a healthy pregnancy — you're nourishing two lives! 🍎 Here's your complete guide:\n\n**Key Nutrients to Focus On:**\n• Folic acid (400–800mcg) — prevents neural tube defects; found in leafy greens, lentils\n• Iron (27mg daily) — prevents anemia; found in red meat, spinach, beans\n• Calcium (1000mg) — builds baby's bones; found in dairy, fortified milk\n• DHA (200mg) — supports brain development; found in salmon, walnuts\n• Vitamin D — essential for immunity; eggs, fortified cereals, sunlight\n\n**Best Foods to Include Daily:**\n• Colorful fruits and vegetables — aim for a rainbow on your plate\n• Lean proteins: chicken, fish (low mercury), eggs, legumes, tofu\n• Whole grains: oats, brown rice, quinoa for sustained energy\n• Healthy fats: avocado, olive oil, nuts, seeds\n• Dairy or calcium-fortified alternatives\n\n**Foods to Avoid:**\n• Raw fish, sushi, and undercooked seafood\n• Unpasteurized cheese and deli meats\n• High-mercury fish (shark, swordfish, king mackerel)\n• Raw or undercooked eggs and meat\n• Alcohol — there is no safe amount during pregnancy\n• Limit caffeine to under 200mg daily\n\nEat small, frequent meals every 2–3 hours to keep energy up and reduce nausea. You're doing an incredible job! 🌟`;

  if (/sleep|insomnia|rest/.test(m))
    return `Good sleep can be challenging during pregnancy, but it's incredibly important for you and your baby! 🌙 Here's how to get better rest:\n\n**The Best Sleep Position:**\n• Sleep on your LEFT side from the second trimester onwards\n• Left-side sleeping improves blood flow to the placenta and baby\n• Use a pregnancy pillow (full-body U-shape or C-shape) for support\n• Place a pillow between your knees to ease hip and back pain\n\n**Evening Wind-Down Routine:**\n• Avoid screens 1 hour before bed — blue light disrupts melatonin\n• Take a warm (not hot) bath or shower to relax muscles\n• Try gentle prenatal yoga or stretching\n• Sip warm chamomile or lavender tea\n• Keep your bedroom cool, dark, and quiet\n\n**If You Wake at Night:**\n• Don't fight it — get up and do something calm, then return to bed\n• Avoid checking your phone\n• Elevate your head slightly if heartburn disturbs sleep\n• Avoid fluids 2 hours before bed to reduce bathroom trips\n\n**When to Mention Sleep Issues to Your Doctor:**\n• Persistent insomnia affecting your daily function\n• Loud snoring or breathing pauses (sleep apnea can develop)\n• Restless leg syndrome causing leg discomfort\n\nRest whenever you can — growing a human being is hard work! 💜`;

  if (/exercise|yoga|walk/.test(m))
    return `Staying active during pregnancy is wonderful for you and your baby! 🧘‍♀️ Here's your safe exercise guide:\n\n**Best Exercises During Pregnancy:**\n• Walking — 30 minutes daily is ideal, even short 10-minute walks\n• Prenatal yoga — improves flexibility, reduces back pain, calms the mind\n• Swimming and water aerobics — gentle on joints, excellent full-body workout\n• Stationary cycling — low impact and safe throughout pregnancy\n• Light strength training with proper guidance\n\n**Key Benefits of Staying Active:**\n• Reduces back pain and swelling\n• Improves sleep quality\n• Boosts mood and reduces anxiety\n• Helps prepare your body for labor\n• Supports healthy weight gain\n• Increases energy levels\n\n**Important Safety Rules:**\n• Avoid contact sports or activities with fall risk\n• No hot yoga — overheating is dangerous for baby\n• After 20 weeks, avoid exercises lying flat on your back\n• Stop immediately if you feel dizzy, short of breath, or have chest pain\n• Always stay well hydrated during exercise\n• Listen to your body — some days, a gentle walk is enough\n\n**Great Time to Start:**\n• Any time during pregnancy — even 10 minutes counts!\n• Always get your doctor's clearance before starting a new exercise program\n\nYou're building strength and resilience for labor — amazing work! 💪`;

  if (/breastfeed|nursing|milk|latch/.test(m))
    return `Breastfeeding is one of the most beautiful gifts you can give your baby — and you can absolutely do this! 🤱 Here's your comprehensive guide:\n\n**Getting Started:**\n• Aim for skin-to-skin contact immediately after birth — this stimulates milk production\n• Feed within the first hour after birth if possible\n• Nurse 8–12 times per day in the first weeks — on demand, not on a schedule\n• Your milk comes in 2–5 days after birth; before that, colostrum (liquid gold!) nourishes your baby\n\n**Achieving a Good Latch:**\n• Baby's mouth should cover the areola, not just the nipple\n• Listen for swallowing sounds — a gulping sound means baby is getting milk\n• A proper latch should not be painful after the first few seconds\n• Try different positions: cradle, cross-cradle, football hold, side-lying\n\n**Boosting Milk Supply:**\n• Nurse frequently — supply is driven by demand\n• Stay well hydrated — drink at least 12 glasses of water daily\n• Eat an extra 300–500 calories per day\n• Get as much rest as possible\n• Skin-to-skin contact stimulates prolactin (milk hormone)\n• Foods that may help: oats, fenugreek, lactation cookies\n\n**Common Challenges & Solutions:**\n• Sore nipples — check latch position, use lanolin cream\n• Engorgement — feed more frequently, use warm compress before, cold after\n• Low supply — increase feeding frequency, see a lactation consultant\n• Mastitis — continue feeding, rest, see a doctor if you have fever\n\nSeeking help from a lactation consultant is a sign of strength, not failure! 💜`;

  if (/newborn|infant|baby care|diaper|swaddle/.test(m))
    return `Welcome to the world's most important job — caring for your precious newborn! 👶 Here's your daily care guide:\n\n**Feeding:**\n• Breastfeed or formula-feed on demand, every 2–3 hours\n• Watch for hunger cues: rooting, sucking fists, turning head side to side\n• 6+ wet diapers per day = baby is well fed\n• Normal weight loss of up to 7–10% in the first week is expected\n\n**Sleep Safety:**\n• Always place baby on their BACK to sleep — reduces SIDS risk\n• Use a firm, flat mattress with no pillows, bumpers, or loose bedding\n• Keep baby's sleep area smoke-free\n• Room-sharing (not bed-sharing) is recommended for the first 6 months\n\n**Daily Care Routine:**\n• Sponge baths until the umbilical cord falls off (1–3 weeks)\n• Keep umbilical cord stump clean and dry — fold nappy below it\n• Apply baby moisturiser to dry skin after bath\n• Trim nails carefully while baby sleeps to avoid scratches\n• Tummy time when awake and supervised — essential for development\n\n**Recognizing Illness:**\n• Fever above 38°C in a newborn needs immediate medical attention\n• Jaundice (yellow skin or eyes) — mention to your doctor\n• Poor feeding, excessive crying, or unusual lethargy\n• Difficulty breathing or blue lips — call emergency services immediately\n\nYou're doing an incredible job — trust yourself and ask for help when you need it! 💜`;

  if (/vaccine|vaccination|immuniz/.test(m))
    return `Baby vaccines are one of the most important things you can do to protect your little one! 💉 Here's the essential schedule:\n\n**At Birth:**\n• BCG — protects against tuberculosis\n• Hepatitis B (first dose)\n• OPV 0 — oral polio vaccine\n\n**At 6 Weeks:**\n• DTwP/DTaP (1st dose) — diphtheria, tetanus, whooping cough\n• Hepatitis B (2nd dose)\n• Hib (1st dose) — Haemophilus influenzae\n• PCV (1st dose) — pneumococcal\n• Rotavirus (1st dose)\n\n**At 10 Weeks:**\n• DTwP/DTaP (2nd dose)\n• Hib (2nd dose)\n• PCV (2nd dose)\n• Rotavirus (2nd dose)\n\n**At 14 Weeks:**\n• DTwP/DTaP (3rd dose)\n• Hib (3rd dose)\n• PCV (3rd dose)\n• IPV — inactivated polio vaccine\n\n**At 6 Months:**\n• Hepatitis B (3rd dose)\n• Influenza vaccine (recommended annually)\n\n**At 9 Months:**\n• MMR (1st dose) — measles, mumps, rubella\n• Varicella (chickenpox)\n\n**Important Notes:**\n• Your doctor may adjust the schedule based on your location and guidelines\n• Some side effects (mild fever, soreness) are normal and show the immune system is responding\n• Keep a vaccination card to track all doses\n\nEvery vaccine is a shield of protection for your precious baby! 💜`;

  if (/postpar|after birth|recovery/.test(m))
    return `Postpartum recovery is a journey — and you deserve all the care and support in the world! 💜 Here's your complete recovery guide:\n\n**Physical Recovery (First 6 Weeks):**\n• Rest as much as possible — sleep when baby sleeps\n• Perineal care: warm sitz baths, ice packs, and gentle cleaning after vaginal birth\n• C-section recovery: avoid lifting anything heavier than your baby for 6 weeks\n• Gentle walking from day 1; gradually increase activity over 6 weeks\n• Pelvic floor exercises (Kegels) — start gently as soon as comfortable\n\n**Nutrition for Healing:**\n• Iron-rich foods to replenish blood loss: red meat, spinach, lentils\n• Protein for tissue repair: eggs, dairy, legumes, lean meat\n• Stay very well hydrated, especially if breastfeeding\n• Fibre-rich foods to prevent constipation — a common postpartum issue\n• Vitamin C to support healing: citrus, berries, bell peppers\n\n**Emotional Wellbeing:**\n• Baby blues (tearfulness, mood swings) in the first 2 weeks is normal\n• If feelings of sadness, emptiness, or anxiety persist beyond 2 weeks, seek help — postpartum depression is common and very treatable\n• Accept help from family and friends — you don't have to do this alone\n• Be patient with yourself — healing takes time and every day counts\n\n**Warning Signs — Contact Your Doctor If You Have:**\n• Heavy bleeding (soaking more than 1 pad per hour)\n• Signs of infection: fever, foul-smelling discharge, wound redness\n• Signs of postpartum depression or anxiety\n• Difficulty bonding with your baby\n\nYour body has done something extraordinary — honour it with patience and love! 🌸`;

  if (/mental health|anxiety|depress|stress|overwhelm|feeling/.test(m))
    return `Your emotional wellbeing matters just as much as your physical health — and it's okay to not be okay sometimes. 💜 Here's your guide to mental wellness:\n\n**Why It's Normal to Struggle:**\n• Hormonal changes during pregnancy and postpartum are immense\n• Life changes, sleeplessness, and new responsibilities are genuinely hard\n• Pregnancy anxiety affects up to 20% of women — you are not alone\n• Postpartum depression affects 1 in 7 mothers — it's not a weakness\n\n**Daily Mental Wellness Practices:**\n• Prenatal or postnatal yoga — proven to reduce anxiety and depression\n• Daily 10-minute mindfulness or meditation — apps like Calm work well\n• Journaling your thoughts and feelings each day\n• Connect with other mothers — community reduces isolation\n• Spend time in fresh air and natural light daily\n• Limit social media — comparison is the thief of joy\n\n**Grounding Techniques for Anxious Moments:**\n• 4-7-8 breathing: inhale 4 counts, hold 7, exhale 8\n• The 5-4-3-2-1 technique: notice 5 things you see, 4 you hear, 3 you can touch\n• A warm shower or bath can immediately calm your nervous system\n\n**When to Seek Professional Help:**\n• Persistent sadness or emptiness lasting more than 2 weeks\n• Difficulty caring for yourself or your baby\n• Intrusive or scary thoughts\n• Severe anxiety that interferes with daily life\n• Feeling detached from your baby or yourself\n\nAsking for help is the bravest, most loving thing you can do — for yourself and your baby. You are not alone! 💜`;

  if (/trimester/.test(m))
    return `Each trimester is a beautiful chapter in your pregnancy story! 📅 Here's your complete guide:\n\n**First Trimester (Weeks 1–12) — The Foundation:**\n• Baby's organs, brain, and spinal cord begin forming\n• Morning sickness and fatigue are very common\n• Start taking folic acid (400mcg) and prenatal vitamins immediately\n• Book your first prenatal appointment and nuchal scan\n• Your body is working incredibly hard even if you don't look pregnant yet\n\n**Second Trimester (Weeks 13–26) — The Sweet Spot:**\n• Energy returns, nausea usually fades — many call this the "golden trimester"\n• Your baby bump becomes visible around week 16–20\n• Feel baby's first movements (quickening) around week 18–22\n• Anatomy scan at weeks 18–20 reveals baby's development\n• Hair and nails growing faster; skin may glow\n• Start prenatal yoga and gentle exercise\n\n**Third Trimester (Weeks 27–40) — The Final Stretch:**\n• Baby puts on weight rapidly, preparing for birth\n• Shortness of breath, Braxton Hicks, and back pain increase\n• Nesting instinct kicks in strongly — trust it!\n• Prepare your hospital bag by week 36\n• Attend childbirth preparation classes\n• Baby drops lower into pelvis (lightening) in the final weeks\n• Each week past 37 weeks adds finishing touches — patience, mama!\n\nYou are growing a human being — every single week is a miracle! 💜`;

  if (/doctor|appointment|checkup|prenatal visit/.test(m))
    return `Your prenatal appointments are so important — and knowing what to ask makes them even more valuable! 🩺 Here's your guide:\n\n**Questions to Ask at Every Visit:**\n• How is my baby's growth and development progressing?\n• What is baby's current position?\n• Are my weight and blood pressure within a healthy range?\n• Are there any concerns from my last test results?\n• What symptoms should prompt me to call you?\n\n**First Trimester Questions:**\n• What prenatal vitamins do you recommend?\n• Are my current medications safe to continue?\n• When should I have my first ultrasound and genetic screening?\n• What foods and activities should I avoid?\n\n**Second Trimester Questions:**\n• Can we discuss my birth preferences and birth plan?\n• Should I take a glucose tolerance test?\n• When will we check baby's position?\n• What exercises are safe at this stage?\n\n**Third Trimester Questions:**\n• What are the signs that I should go to the hospital?\n• What is our plan if I go past my due date?\n• Can we discuss pain management options during labor?\n• What are the signs of preterm labor?\n\n**Always Mention:**\n• Any bleeding or spotting\n• Severe headaches, vision changes, or facial swelling\n• Reduced baby movements\n• Painful or burning urination\n• Any symptom that worries you — no question is too small!\n\nYour doctor is your partner in this journey — ask everything! 💜`;

  if (/weight|gain/.test(m))
    return `Healthy weight gain is an important part of a thriving pregnancy! 📊 Here's what to know:\n\n**Recommended Weight Gain by BMI:**\n• Normal BMI (18.5–24.9): 11–16 kg total\n• Underweight (under 18.5): 13–18 kg total\n• Overweight (25–29.9): 7–11 kg total\n• Obese (30+): 5–9 kg total\n• Twin pregnancy: 17–25 kg total\n\n**Healthy Gain Pattern:**\n• First trimester: 0.5–2 kg (baby is tiny, gain is mostly body changes)\n• Second trimester: approximately 0.5 kg per week\n• Third trimester: approximately 0.5 kg per week\n• Most weight gain is in the second and third trimesters\n\n**Where Does the Weight Go?**\n• Baby: approximately 3.4 kg\n• Placenta: approximately 0.7 kg\n• Amniotic fluid: approximately 0.9 kg\n• Increased blood volume: approximately 1.8 kg\n• Breast tissue growth: approximately 0.9 kg\n• Body fat stores for birth and breastfeeding: 2.7–3.6 kg\n\n**Tips for Healthy Weight Management:**\n• Focus on nutrient density, not calorie restriction\n• Eat regular, balanced meals with plenty of fruits and vegetables\n• Stay active with pregnancy-safe exercise\n• Avoid restrictive dieting — your baby needs steady nutrition\n• Your midwife or doctor will monitor your gain at each visit\n\nEvery body is different — gain is nourishment, not a number to fear! 💜`;

  if (/vitamin|supplement|folic|iron|calcium/.test(m))
    return `Getting the right nutrients is one of the most powerful things you can do for your baby's development! 💊 Here's your complete supplement guide:\n\n**Essential Supplements:**\n• Folic Acid (400–800mcg) — prevents neural tube defects; take from preconception through week 12\n• Iron (27mg daily) — prevents anemia and supports oxygen delivery to baby\n• Calcium (1000mg) — builds strong bones and teeth for baby\n• Vitamin D (600IU) — supports bone health, immunity, and mood\n• DHA (200mg) — omega-3 for baby's brain and eye development\n• Iodine (150mcg) — supports thyroid function and baby's brain development\n\n**Best Food Sources:**\n• Folic acid: spinach, lentils, asparagus, fortified cereals\n• Iron: lean red meat, beans, tofu, dark leafy greens + Vitamin C to aid absorption\n• Calcium: dairy, fortified plant milks, sardines, bok choy\n• Vitamin D: fatty fish, egg yolks, fortified foods, safe sun exposure\n• DHA: salmon, sardines, walnuts, flaxseed\n\n**Tips for Taking Supplements:**\n• Take prenatal vitamins with food to reduce nausea\n• Take iron with orange juice (vitamin C boosts absorption)\n• Don't take iron and calcium at the same time — they compete for absorption\n• Talk to your doctor before adding any additional supplements\n• A quality prenatal vitamin covers most of your needs\n\nYou're giving your baby the very best start in life! 🌟`;

  if (/mood|emotion|feeling sad|feeling|cry/.test(m))
    return `Pregnancy and motherhood come with a full spectrum of emotions — and every single one of them is valid. 💜 Here's some gentle support:\n\n**Why Emotions Are Heightened:**\n• Oestrogen and progesterone levels change dramatically during pregnancy\n• Physical discomfort, sleep changes, and life adjustments all affect mood\n• Anxiety about birth, parenting, and the future is completely normal\n• Your identity is evolving — this is called matrescence, and it's real\n\n**Nurturing Your Emotional Health:**\n• Name your feelings without judgment — "I feel anxious" is okay\n• Journaling: write freely for 5 minutes each morning\n• Move your body gently — movement releases mood-lifting endorphins\n• Connect with loved ones who make you feel safe and supported\n• Prenatal yoga and meditation can help calm an anxious mind\n• Limit news and social media — protect your mental space\n\n**What Your Partner or Support Person Can Do:**\n• Listen without trying to fix — sometimes you just need to be heard\n• Take on practical tasks without being asked\n• Celebrate small wins with you\n• Remind you how capable and loved you are\n\n**Seek Support If:**\n• Sadness, anxiety, or irritability persists for more than 2 weeks\n• You feel unable to bond with your baby\n• You're having thoughts of harming yourself\n\nYou are doing something extraordinary — give yourself the grace you'd give a friend. 💜`;

  if (/week|month|trimester/.test(m))
    return "Each trimester has its journey! First (weeks 1–12): organ formation, morning sickness common. Second (13–26): baby bump grows, energy returns, feel kicks. Third (27–40): baby positions for birth, frequent bathroom visits, nesting instinct kicks in. Each week is a milestone! 📅";

  if (/stress|anxiety|emotion|mood|depress/.test(m))
    return "Your emotional health is just as important as physical health during pregnancy! Prenatal yoga, meditation, and deep breathing really help. Connect with other moms in the community, talk to your partner, and don't hesitate to speak to your OB about pregnancy anxiety — it is very common and treatable. 🌸";

  if (/baby|development|fetal|womb|uterus/.test(m))
    return "Your baby is growing beautifully every single day! From a tiny poppy seed to a watermelon — the journey is incredible. At every stage, your baby is developing vital organs, hearing your voice, and responding to your touch. Trust the process and cherish each milestone! 👶";

  return `Hi! I'm Tina — your dedicated Pregnancy & Motherhood Companion. 💜 I'm here to support your journey every step of the way!\n\n**I can help you with:**\n• Pregnancy nutrition and what to eat each trimester\n• Baby development milestones and what to expect\n• Managing pregnancy symptoms like morning sickness and back pain\n• Safe exercises, yoga, and wellness during pregnancy\n• Labor signs and birth preparation\n• Newborn care and breastfeeding guidance\n• Postpartum recovery and mental wellness\n• Baby vaccine schedules and doctor appointment tips\n\nFeel free to ask me anything — no question is too small when it comes to your health and your baby's wellbeing. 💫`;
}

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="15"
    height="15"
    fill="white"
    aria-hidden="true"
  >
    <title>WhatsApp</title>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ─── GlobalNotifications ─────────────────────────────────────────────────────
export function GlobalNotifications({
  items,
  onDismiss,
}: { items: NotificationItem[]; onDismiss: (id: string) => void }) {
  const colors: Record<NotificationItem["type"], string> = {
    medicine: "border-purple-300 bg-purple-50 text-purple-800",
    checkup: "border-blue-300 bg-blue-50 text-blue-800",
    info: "border-green-300 bg-green-50 text-green-800",
  };
  if (!items.length) return null;
  return (
    <div
      className="fixed bottom-20 right-4 md:bottom-4 z-50 flex flex-col gap-2 max-w-xs"
      data-ocid="notifications"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={`flex items-start gap-2 rounded-xl border p-3 shadow-lg text-sm animate-fade-in ${colors[item.type]}`}
        >
          <span className="flex-1">{item.message}</span>
          <button
            type="button"
            onClick={() => onDismiss(item.id)}
            className="opacity-60 hover:opacity-100 transition-opacity shrink-0"
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── getSegmentPath ───────────────────────────────────────────────────────────
export function getSegmentPath(
  index: number,
  total: number,
  radius: number,
  cx: number,
  cy: number,
  gapDeg: number,
): string {
  const sweep = 360 / total - gapDeg;
  const startDeg = index * (360 / total) - 90;
  const endDeg = startDeg + sweep;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const x1 = cx + radius * Math.cos(toRad(startDeg));
  const y1 = cy + radius * Math.sin(toRad(startDeg));
  const x2 = cx + radius * Math.cos(toRad(endDeg));
  const y2 = cy + radius * Math.sin(toRad(endDeg));
  const inner = radius - 52;
  const xi1 = cx + inner * Math.cos(toRad(startDeg));
  const yi1 = cy + inner * Math.sin(toRad(startDeg));
  const xi2 = cx + inner * Math.cos(toRad(endDeg));
  const yi2 = cy + inner * Math.sin(toRad(endDeg));
  return `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} L ${xi2} ${yi2} A ${inner} ${inner} 0 0 0 ${xi1} ${yi1} Z`;
}

// ─── MonthDetailInline ────────────────────────────────────────────────────────
function MonthDetailInline({
  data,
  onClose,
}: { data: MonthData; onClose: () => void }) {
  const cols = [
    { title: "Body Changes", items: data.bodyChanges, emoji: "🌸" },
    { title: "Health Tips", items: data.tips, emoji: "💡" },
    { title: "Diet Plan", items: data.dietPlan, emoji: "🥗" },
  ];
  return (
    <div
      className="rounded-2xl overflow-hidden animate-inline-expand mt-4"
      style={{
        border: "1px solid rgba(142,92,159,0.2)",
        boxShadow: "0 8px 32px rgba(142,92,159,0.15)",
      }}
      data-ocid="timeline.month_detail_inline"
    >
      {/* Header */}
      <div
        className="relative flex flex-col items-center pt-5 pb-4 px-5"
        style={{
          background: "linear-gradient(135deg, #8E5C9F 0%, #C48DD8 100%)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.25)" }}
          aria-label="Close month detail"
          data-ocid="timeline.inline_close"
        >
          <X size={16} color="white" />
        </button>
        <div
          className="w-28 h-28 rounded-full overflow-hidden mb-3 animate-baby-center-pulse"
          style={{
            border: "4px solid rgba(255,255,255,0.5)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          }}
        >
          <img
            src={BABY_IMAGES[data.month - 1]}
            alt={`Baby development at month ${data.month}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=200&h=200&fit=crop";
            }}
          />
        </div>
        <h2 className="text-white font-extrabold text-xl">
          Month {data.month}
        </h2>
        <p className="text-purple-100 text-xs font-medium mt-0.5">
          {data.fruit} Stage
        </p>
      </div>
      {/* Content */}
      <div className="p-4 space-y-3" style={{ background: "white" }}>
        {cols.map((col) => (
          <div
            key={col.title}
            className="rounded-xl p-3"
            style={{
              background:
                col.title === "Body Changes"
                  ? "#F9F0FF"
                  : col.title === "Health Tips"
                    ? "#FFF5F0"
                    : "#F0FFF4",
              border: `1px solid ${col.title === "Body Changes" ? "rgba(142,92,159,0.15)" : col.title === "Health Tips" ? "rgba(251,146,60,0.15)" : "rgba(52,211,153,0.15)"}`,
            }}
          >
            <p
              className="font-bold text-xs mb-2 flex items-center gap-1.5"
              style={{
                color:
                  col.title === "Body Changes"
                    ? "#8E5C9F"
                    : col.title === "Health Tips"
                      ? "#C05A20"
                      : "#158C52",
              }}
            >
              {col.emoji} {col.title}
            </p>
            <ul className="space-y-1">
              {col.items.map((item) => (
                <li
                  key={item}
                  className="text-xs flex gap-2 items-start leading-snug"
                  style={{ color: "#3A2A4A" }}
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      background:
                        col.title === "Body Changes"
                          ? "#C88FE0"
                          : col.title === "Health Tips"
                            ? "#FB923C"
                            : "#34D399",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CircularTimeline ────────────────────────────────────────────────────────
export function CircularTimeline({
  totalMonths = 10,
  currentMonth = CURRENT_MONTH,
  monthImages = BABY_IMAGES,
}: { totalMonths?: number; currentMonth?: number; monthImages?: string[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const cx = 200;
  const cy = 200;
  const r = 175;
  const colors = SEGMENT_COLORS;

  const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelected(i);
    }
  };

  const months = Array.from({ length: totalMonths }, (_, i) => ({
    month: i + 1,
    color: colors[i % colors.length],
    image: monthImages[i],
    isCurrent: i + 1 === currentMonth,
  }));

  // Image position sits in the middle of each arc band (outer-r to inner-r)
  const outerR = r;
  const innerR = r - 52; // ring band is 52px wide

  const getBabyImgPos = (idx: number) => {
    const angle =
      ((idx * (360 / totalMonths) - 90 + 180 / totalMonths) * Math.PI) / 180;
    const midR = (outerR + innerR) / 2; // true mid of band
    return {
      x: cx + midR * Math.cos(angle),
      y: cy + midR * Math.sin(angle),
    };
  };

  const centerMonth = selected !== null ? selected + 1 : currentMonth;

  // Month names for display
  const MONTH_STAGE_NAMES = [
    "Embryo",
    "Fetus",
    "Head Forms",
    "Defined",
    "Limbs",
    "Curled",
    "Growing",
    "Full Size",
    "Birth Pos",
    "Newborn",
  ];

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full max-w-sm relative">
          <svg
            viewBox="0 0 400 400"
            className="w-full"
            style={{ filter: "drop-shadow(0 4px 28px rgba(142,92,159,0.18))" }}
            role="img"
            aria-label="Pregnancy timeline"
          >
            {/* Defs: clipPaths for each baby thumbnail + center */}
            <defs>
              {months.map((m) => {
                const pos = getBabyImgPos(m.month - 1);
                return (
                  <clipPath key={`clip-${m.month}`} id={`clip-m${m.month}`}>
                    <circle cx={pos.x} cy={pos.y} r="20" />
                  </clipPath>
                );
              })}
              <clipPath id="center-clip">
                <circle cx={cx} cy={cy} r={innerR - 10} />
              </clipPath>
            </defs>

            {/* Segments */}
            {months.map((m) => {
              const isHovered = hoveredIdx === m.month - 1;
              const isCurrent = m.isCurrent;
              const isSelected = selected === m.month - 1;
              return (
                <g key={`seg-g-${m.month}`}>
                  {/* Outer glow for current */}
                  {isCurrent && (
                    <path
                      d={getSegmentPath(
                        m.month - 1,
                        totalMonths,
                        r + 6,
                        cx,
                        cy,
                        2,
                      )}
                      fill="none"
                      stroke="#FFD700"
                      strokeWidth="3"
                      opacity="0.8"
                      style={{ filter: "blur(2px)" }}
                    />
                  )}
                  <path
                    key={`seg-m${m.month}`}
                    d={getSegmentPath(m.month - 1, totalMonths, r, cx, cy, 3)}
                    fill={m.color}
                    opacity={
                      isSelected
                        ? 1
                        : isHovered
                          ? 0.95
                          : isCurrent
                            ? 0.92
                            : 0.75
                    }
                    style={{
                      cursor: "pointer",
                      transition: "opacity 0.2s",
                      outline: "none",
                    }}
                    onClick={() => setSelected(m.month - 1)}
                    onMouseEnter={() => setHoveredIdx(m.month - 1)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onKeyDown={(e) => handleKeyDown(e, m.month - 1)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Month ${m.month}${isCurrent ? " (current)" : ""}`}
                    aria-pressed={selected === m.month - 1}
                    data-ocid={`timeline.segment_${m.month}`}
                  />
                  {/* Current month indicator ring */}
                  {isCurrent && (
                    <path
                      d={getSegmentPath(m.month - 1, totalMonths, r, cx, cy, 3)}
                      fill="none"
                      stroke="#FFD700"
                      strokeWidth="2.5"
                      opacity="0.9"
                      style={{ pointerEvents: "none" }}
                    />
                  )}
                  {/* Selected month highlight ring */}
                  {isSelected && (
                    <path
                      d={getSegmentPath(m.month - 1, totalMonths, r, cx, cy, 3)}
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      opacity="0.7"
                      style={{ pointerEvents: "none" }}
                    />
                  )}
                </g>
              );
            })}

            {/* Baby thumbnails in segments — animated 2D illustrations */}
            {months.map((m) => {
              const pos = getBabyImgPos(m.month - 1);
              const isSelected = selected === m.month - 1;
              const isCurrent = m.isCurrent;
              return (
                <g
                  key={`baby-img-${m.month}`}
                  style={{ pointerEvents: "none" }}
                >
                  {/* White backing circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="22"
                    fill="rgba(255,255,255,0.92)"
                    stroke={
                      isSelected
                        ? "#FFD700"
                        : isCurrent
                          ? "#FFD700"
                          : "rgba(255,255,255,0.5)"
                    }
                    strokeWidth={isSelected || isCurrent ? "2.5" : "1.5"}
                  />
                  {/* Baby illustration */}
                  <image
                    href={monthImages[m.month - 1]}
                    x={pos.x - 20}
                    y={pos.y - 20}
                    width="40"
                    height="40"
                    clipPath={`url(#clip-m${m.month})`}
                    preserveAspectRatio="xMidYMid slice"
                  />
                  {/* Month label below the image */}
                  <text
                    x={pos.x}
                    y={pos.y + 28}
                    textAnchor="middle"
                    fontSize="7.5"
                    fontWeight="800"
                    fill="white"
                    style={{
                      pointerEvents: "none",
                      userSelect: "none",
                      textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                    }}
                  >
                    M{m.month}
                  </text>
                </g>
              );
            })}

            {/* Center circle background */}
            <circle cx={cx} cy={cy} r={innerR - 4} fill="white" />
            <circle
              cx={cx}
              cy={cy}
              r={innerR - 8}
              fill="none"
              stroke="#EDD5F8"
              strokeWidth="2"
            />

            {/* Center baby image — animated pulse */}
            <image
              href={monthImages[centerMonth - 1]}
              x={cx - (innerR - 14)}
              y={cy - (innerR - 14)}
              width={(innerR - 14) * 2}
              height={(innerR - 14) * 2}
              clipPath="url(#center-clip)"
              preserveAspectRatio="xMidYMid slice"
              className="animate-baby-center-pulse"
            />

            {/* Center stage name */}
            <text
              x={cx}
              y={cy + (innerR - 16)}
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill="#8E5C9F"
            >
              {MONTH_STAGE_NAMES[centerMonth - 1] ?? `Month ${centerMonth}`}
            </text>

            {/* Center top label */}
            <text
              x={cx}
              y={cy - (innerR - 16)}
              textAnchor="middle"
              fontSize="8"
              fontWeight="700"
              fill="#FFB800"
            >
              {selected === null ? "✦ Now" : `Month ${centerMonth}`}
            </text>
          </svg>

          {/* Legend */}
          <div
            className="flex items-center justify-center gap-4 mt-1 text-xs"
            style={{ color: "#8E5C9F" }}
          >
            <span className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded-full inline-block border-2"
                style={{ background: "#8E5C9F", borderColor: "#FFD700" }}
              />
              Current Month
            </span>
            <span className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ background: "#D4A5E8" }}
              />
              Tap for details
            </span>
          </div>
        </div>
      </div>

      {/* Instruction hint */}
      <p className="text-center text-xs mt-2 mb-1" style={{ color: "#B090C0" }}>
        Tap any month to see baby growth details
      </p>

      {/* Inline month detail panel */}
      {selected !== null && MONTH_DATA[selected] && (
        <MonthDetailInline
          data={MONTH_DATA[selected]}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

// ─── New BottomNav ────────────────────────────────────────────────────────────
export type DashboardScreen =
  | "home"
  | "assistant"
  | "community"
  | "shopping"
  | "classes";

export function NewBottomNav({
  active,
  onChange,
}: { active: DashboardScreen; onChange: (s: DashboardScreen) => void }) {
  const tabs: { id: DashboardScreen; label: string; icon: React.ReactNode }[] =
    [
      { id: "home", label: "Home", icon: <Home size={20} /> },
      {
        id: "assistant",
        label: "Assistant",
        icon: <MessageCircleHeart size={20} />,
      },
      { id: "community", label: "Community", icon: <Users size={20} /> },
      { id: "shopping", label: "Shopping", icon: <ShoppingBag size={20} /> },
      { id: "classes", label: "Classes", icon: <GraduationCap size={20} /> },
    ];
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 safe-bottom"
      style={{
        background: "rgba(255,255,255,0.98)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(124,58,237,0.10)",
        boxShadow: "0 -6px 24px rgba(124,58,237,0.10)",
      }}
      data-ocid="bottom_nav"
      aria-label="Bottom navigation"
    >
      <div className="flex items-center justify-around px-1 py-2 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all min-w-0 relative"
              style={{
                background: isActive ? "rgba(124,58,237,0.10)" : "transparent",
                color: isActive ? "#7C3AED" : "#B0A0C8",
              }}
              data-ocid={`bottom_nav.${tab.id}`}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
            >
              {tab.icon}
              <span className="text-[9px] font-bold leading-none truncate">
                {tab.label}
              </span>
              {isActive && (
                <div
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                  style={{ background: "#7C3AED" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ─── SectionMenuBar ───────────────────────────────────────────────────────────
const SECTION_TABS = [
  { id: "timeline", label: "Timeline", icon: "🤰" },
  { id: "medicine", label: "Reminder", icon: "💊" },
  { id: "emergency", label: "Emergency", icon: "🚨" },
  { id: "wellness", label: "Wellness", icon: "🧘" },
  { id: "nearby", label: "Nearby", icon: "📍" },
];

function SectionMenuBar() {
  const [activeSection, setActiveSection] = useState("timeline");

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Highlight active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      for (const tab of [...SECTION_TABS].reverse()) {
        const el = document.getElementById(tab.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
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
        top: "64px", // below NavBar (h-16 = 64px)
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(142,92,159,0.10)",
        boxShadow: "0 2px 16px rgba(142,92,159,0.08)",
      }}
      data-ocid="section_menu_bar"
    >
      <div
        className="max-w-2xl mx-auto flex items-center px-3 h-11 gap-1 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {SECTION_TABS.map((tab) => {
          const isActive = activeSection === tab.id;
          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap shrink-0"
              style={{
                background: isActive
                  ? "linear-gradient(135deg, #7C3AED, #9D4EDD)"
                  : "transparent",
                color: isActive ? "white" : "#9D4EDD",
                boxShadow: isActive
                  ? "0 2px 10px rgba(124,58,237,0.30)"
                  : "none",
              }}
              data-ocid={`section_menu.${tab.id}`}
              aria-current={isActive ? "true" : undefined}
            >
              <span className="text-[11px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar({ onLogout }: { onLogout?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      className="sticky top-0 z-40 transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(142,92,159,0.12)",
        boxShadow: scrolled
          ? "0 4px 20px rgba(142,92,159,0.10)"
          : "0 1px 0 rgba(142,92,159,0.08)",
      }}
      data-ocid="navbar"
    >
      <div className="max-w-2xl mx-auto flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl overflow-hidden shrink-0"
            style={{
              boxShadow: "0 3px 12px rgba(142,92,159,0.30)",
              border: "2px solid rgba(200,164,230,0.5)",
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
              className="font-extrabold text-lg leading-none block tracking-tight"
              style={{
                background: "linear-gradient(135deg, #6B21A8, #9D4EDD)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Mothera
            </span>
            <span
              className="text-[10px] font-medium leading-none tracking-wide uppercase"
              style={{ color: "#C4A0DC" }}
            >
              Maternal Health Care
            </span>
          </div>
        </div>
        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
            style={{
              color: "#7A3A9A",
              border: "1.5px solid rgba(142,92,159,0.25)",
              background: "rgba(142,92,159,0.06)",
            }}
            aria-label="Logout"
            data-ocid="nav.logout_button"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        )}
      </div>
    </nav>
  );
}

// ─── MedicineReminderPanel ───────────────────────────────────────────────────
export function MedicineReminderPanel({
  addNotification,
}: { addNotification: (n: Omit<NotificationItem, "id">) => void }) {
  const [medicines, setMedicines] =
    useState<MedicineEntry[]>(DEFAULT_MEDICINES);
  const [form, setForm] = useState({
    name: "",
    stock: 30,
    beforeAfterFood: "before" as "before" | "after",
    morning: false,
    afternoon: false,
    night: false,
    morningTime: "08:00",
    afternoonTime: "13:00",
    nightTime: "22:00",
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const today = new Date().toISOString().split("T")[0];
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    for (const m of DEFAULT_MEDICINES) {
      if (m.stock < 5)
        addNotification({
          type: "medicine",
          message: `⚠️ Low stock: ${m.name} — only ${m.stock} left!`,
        });
    }
  }, [addNotification]);

  const getTimesForMed = (med: MedicineEntry) => {
    const times: string[] = [];
    if (med.morning) times.push(`Morning ${med.morningTime}`);
    if (med.afternoon) times.push(`Afternoon ${med.afternoonTime}`);
    if (med.night) times.push(`Night ${med.nightTime}`);
    return times;
  };

  const toggleTaken = (id: string, timeKey: string) => {
    setMedicines((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              taken: {
                ...m.taken,
                [`${today}_${timeKey}`]: !m.taken[`${today}_${timeKey}`],
              },
            }
          : m,
      ),
    );
  };

  const openEditForm = (med: MedicineEntry) => {
    setForm({
      name: med.name,
      stock: med.stock,
      beforeAfterFood: med.beforeAfterFood,
      morning: med.morning,
      afternoon: med.afternoon,
      night: med.night,
      morningTime: med.morningTime,
      afternoonTime: med.afternoonTime,
      nightTime: med.nightTime,
    });
    setEditingId(med.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setForm({
      name: "",
      stock: 30,
      beforeAfterFood: "before",
      morning: false,
      afternoon: false,
      night: false,
      morningTime: "08:00",
      afternoonTime: "13:00",
      nightTime: "22:00",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const saveMedicine = () => {
    if (!form.name) return;
    if (editingId) {
      setMedicines((prev) =>
        prev.map((m) =>
          m.id === editingId
            ? {
                ...m,
                name: form.name,
                stock: form.stock,
                beforeAfterFood: form.beforeAfterFood,
                morning: form.morning,
                afternoon: form.afternoon,
                night: form.night,
                morningTime: form.morningTime,
                afternoonTime: form.afternoonTime,
                nightTime: form.nightTime,
              }
            : m,
        ),
      );
    } else {
      const newMed: MedicineEntry = {
        id: Date.now().toString(),
        name: form.name,
        stock: form.stock,
        beforeAfterFood: form.beforeAfterFood,
        morning: form.morning,
        afternoon: form.afternoon,
        night: form.night,
        morningTime: form.morningTime,
        afternoonTime: form.afternoonTime,
        nightTime: form.nightTime,
        taken: {},
      };
      setMedicines((prev) => [...prev, newMed]);
    }
    resetForm();
  };

  const SLOT_LABELS = [
    { key: "morning" as const, label: "Morning", emoji: "🌅" },
    { key: "afternoon" as const, label: "Afternoon", emoji: "☀️" },
    { key: "night" as const, label: "Night", emoji: "🌙" },
  ];

  return (
    <div className="space-y-3">
      {medicines.map((med) => {
        const times = getTimesForMed(med);
        const isLowStock = med.stock < 5;
        return (
          <div
            key={med.id}
            className="rounded-2xl overflow-hidden"
            style={{
              border: isLowStock
                ? "1.5px solid rgba(251,146,60,0.4)"
                : "1px solid rgba(124,58,237,0.12)",
              boxShadow: isLowStock
                ? "0 4px 16px rgba(251,146,60,0.10)"
                : "0 4px 16px rgba(124,58,237,0.06)",
            }}
            data-ocid="medicine.card"
          >
            {/* Card header stripe */}
            <div
              className="px-4 pt-4 pb-3"
              style={{ background: isLowStock ? "#FFFBEB" : "#F8F4FF" }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span
                      className="font-bold text-sm"
                      style={{ color: "#3A1A5A" }}
                    >
                      💊 {med.name}
                    </span>
                    {isLowStock && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold"
                        style={{
                          background: "rgba(251,146,60,0.15)",
                          color: "#C05A20",
                          border: "1px solid rgba(251,146,60,0.3)",
                        }}
                      >
                        <AlertTriangle size={10} />
                        Low stock!
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    <span
                      className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                      style={{
                        background: "rgba(124,58,237,0.10)",
                        color: "#7C3AED",
                      }}
                    >
                      Stock: {med.stock}
                    </span>
                    <span
                      className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                      style={{
                        background:
                          med.beforeAfterFood === "before"
                            ? "rgba(251,146,60,0.12)"
                            : "rgba(52,211,153,0.12)",
                        color:
                          med.beforeAfterFood === "before"
                            ? "#C05A20"
                            : "#158C52",
                      }}
                    >
                      {med.beforeAfterFood === "before"
                        ? "🍽️ Before Food"
                        : "🍽️ After Food"}
                    </span>
                  </div>
                  {times.length > 0 && (
                    <p className="text-xs mt-1.5" style={{ color: "#9070A0" }}>
                      ⏰ {times.join(" · ")}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => openEditForm(med)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:opacity-90"
                    style={{ background: "rgba(124,58,237,0.10)" }}
                    aria-label={`Edit ${med.name}`}
                    data-ocid="medicine.edit_button"
                  >
                    <Pencil size={13} color="#7C3AED" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setMedicines((p) => p.filter((m) => m.id !== med.id))
                    }
                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:opacity-90"
                    style={{ background: "rgba(239,68,68,0.08)" }}
                    aria-label={`Remove ${med.name}`}
                    data-ocid="medicine.remove_button"
                  >
                    <Trash2 size={13} color="#DC2626" />
                  </button>
                </div>
              </div>
            </div>

            {/* Dose toggle row */}
            {times.length > 0 && (
              <div
                className="flex flex-wrap gap-2 px-4 py-3"
                style={{
                  background: "white",
                  borderTop: "1px solid rgba(124,58,237,0.08)",
                }}
              >
                {times.map((t) => {
                  const key = t.replace(" ", "_");
                  const done = !!med.taken[`${today}_${key}`];
                  return (
                    <button
                      type="button"
                      key={t}
                      onClick={() => toggleTaken(med.id, key)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                      style={{
                        background: done ? "#7C3AED" : "white",
                        color: done ? "white" : "#7C3AED",
                        border: `1.5px solid ${done ? "#7C3AED" : "rgba(124,58,237,0.25)"}`,
                        boxShadow: done
                          ? "0 2px 8px rgba(124,58,237,0.25)"
                          : "none",
                      }}
                      data-ocid="medicine.dose_toggle"
                      aria-label={`Mark ${t} as ${done ? "untaken" : "taken"}`}
                      aria-pressed={done}
                    >
                      {done ? <Check size={10} /> : <Clock size={10} />}
                      {t}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {showForm ? (
        <div
          className="rounded-2xl p-5 border space-y-4 animate-inline-expand"
          style={{
            background: "#F8F4FF",
            borderColor: "rgba(124,58,237,0.20)",
            boxShadow: "0 4px 20px rgba(124,58,237,0.08)",
          }}
          data-ocid="medicine.add_form"
        >
          <p
            className="text-sm font-bold flex items-center gap-2"
            style={{ color: "#3A1A5A" }}
          >
            <span
              className="w-6 h-6 rounded-lg flex items-center justify-center text-xs"
              style={{ background: "rgba(124,58,237,0.12)" }}
            >
              {editingId ? "✏️" : "➕"}
            </span>
            {editingId ? "Edit Medicine" : "Add Medicine"}
          </p>

          {/* Medicine name */}
          <div>
            <label
              htmlFor="med-name"
              className="text-xs font-semibold mb-1 block"
              style={{ color: "#8E5C9F" }}
            >
              Medicine Name
            </label>
            <input
              id="med-name"
              placeholder="e.g. Folic Acid"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none border"
              style={{ borderColor: "rgba(142,92,159,0.3)", color: "#5A2D7A" }}
              data-ocid="medicine.name_input"
            />
          </div>

          {/* Stock */}
          <div>
            <label
              htmlFor="med-stock"
              className="text-xs font-semibold mb-1 block"
              style={{ color: "#8E5C9F" }}
            >
              Stock (tablets/capsules)
            </label>
            <input
              id="med-stock"
              type="number"
              min="0"
              placeholder="30"
              value={form.stock}
              onChange={(e) =>
                setForm((f) => ({ ...f, stock: Number(e.target.value) }))
              }
              className="w-full px-3 py-2 rounded-lg text-sm outline-none border"
              style={{ borderColor: "rgba(142,92,159,0.3)", color: "#5A2D7A" }}
              data-ocid="medicine.stock_input"
            />
          </div>

          {/* Before / After Food */}
          <div>
            <p
              className="text-xs font-semibold mb-2"
              style={{ color: "#8E5C9F" }}
            >
              Before or After Food
            </p>
            <div className="flex gap-2">
              {(["before", "after"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() =>
                    setForm((f) => ({ ...f, beforeAfterFood: opt }))
                  }
                  className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background:
                      form.beforeAfterFood === opt
                        ? opt === "before"
                          ? "linear-gradient(135deg, #FB923C, #FD6F3B)"
                          : "linear-gradient(135deg, #34D399, #10B981)"
                        : "rgba(142,92,159,0.07)",
                    color: form.beforeAfterFood === opt ? "white" : "#8E5C9F",
                    border: `1px solid ${form.beforeAfterFood === opt ? "transparent" : "rgba(142,92,159,0.2)"}`,
                  }}
                  aria-pressed={form.beforeAfterFood === opt}
                  data-ocid={`medicine.food_${opt}`}
                >
                  {opt === "before" ? "🍽️ Before Food" : "🍽️ After Food"}
                </button>
              ))}
            </div>
          </div>

          {/* When to take — checkboxes + time pickers */}
          <div>
            <p
              className="text-xs font-semibold mb-2"
              style={{ color: "#8E5C9F" }}
            >
              When to Take
            </p>
            <div className="space-y-2">
              {SLOT_LABELS.map((slot) => (
                <div key={slot.key} className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setForm((f) => ({ ...f, [slot.key]: !f[slot.key] }))
                    }
                    className="flex items-center gap-2 flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all text-left"
                    style={{
                      background: form[slot.key]
                        ? "linear-gradient(135deg, #8E5C9F, #C48DD8)"
                        : "rgba(142,92,159,0.08)",
                      color: form[slot.key] ? "white" : "#8E5C9F",
                      border: `1px solid ${form[slot.key] ? "transparent" : "rgba(142,92,159,0.2)"}`,
                    }}
                    aria-pressed={form[slot.key]}
                    data-ocid={`medicine.slot_${slot.key}`}
                  >
                    <span>{slot.emoji}</span>
                    {slot.label}
                  </button>
                  {form[slot.key] && (
                    <input
                      type="time"
                      value={form[`${slot.key}Time`]}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          [`${slot.key}Time`]: e.target.value,
                        }))
                      }
                      className="px-2 py-1.5 rounded-lg text-xs border outline-none"
                      style={{
                        borderColor: "rgba(142,92,159,0.3)",
                        color: "#5A2D7A",
                        minWidth: "90px",
                      }}
                      aria-label={`${slot.label} time`}
                      data-ocid={`medicine.${slot.key}_time_input`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={saveMedicine}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{ background: "#8E5C9F", color: "white" }}
              data-ocid="medicine.save_button"
            >
              {editingId ? "Update Medicine" : "Add Medicine"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-lg text-sm"
              style={{
                background: "rgba(142,92,159,0.1)",
                color: "#8E5C9F",
              }}
              data-ocid="medicine.cancel_button"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setEditingId(null);
            setShowForm(true);
          }}
          className="w-full py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90"
          style={{
            background: "rgba(124,58,237,0.07)",
            color: "#7C3AED",
            border: "1.5px dashed rgba(124,58,237,0.30)",
          }}
          data-ocid="medicine.add_button"
        >
          <Plus size={16} />
          Add Medicine
        </button>
      )}
    </div>
  );
}

// ─── VideoCard ────────────────────────────────────────────────────────────────
export function VideoCard({
  videoId,
  title,
}: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div
      className="shrink-0 w-64 rounded-2xl overflow-hidden card-hover"
      style={{
        border: "1px solid rgba(142,92,159,0.12)",
        boxShadow: "0 4px 16px rgba(142,92,159,0.10)",
        background: "white",
      }}
      data-ocid="video.card"
    >
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          className="w-full aspect-video"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={title}
        />
      ) : (
        <button
          type="button"
          className="relative cursor-pointer aspect-video w-full block group"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={`Thumbnail for ${title}`}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-200 group-hover:opacity-90"
            style={{ background: "rgba(0,0,0,0.22)" }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
              style={{
                background: "rgba(124,58,237,0.9)",
                backdropFilter: "blur(4px)",
                boxShadow: "0 4px 16px rgba(124,58,237,0.40)",
              }}
            >
              <Play size={20} color="white" fill="white" />
            </div>
          </div>
        </button>
      )}
      <div className="px-3 py-2.5">
        <p
          className="text-xs font-semibold truncate leading-snug"
          style={{ color: "#3A1A5A" }}
        >
          {title}
        </p>
      </div>
    </div>
  );
}

// ─── Wellness Section ─────────────────────────────────────────────────────────
const WELLNESS_CARDS = [
  {
    key: "exercise",
    label: "Exercise",
    subtitle: "Stay active & strong",
    labelBg: "linear-gradient(135deg, #7C3AED 0%, #8E5C9F 100%)",
    borderColor: "#8E5C9F",
    bgColor: "#F5EDFF",
    photo:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=200&fit=crop",
    vids: EXERCISE_VIDS,
    titles: [
      "Prenatal Cardio",
      "Strength Training",
      "Stretching Routine",
      "Low Impact Workout",
      "Core & Balance",
    ],
  },
  {
    key: "yoga",
    label: "Yoga",
    subtitle: "Breathe, stretch & glow",
    labelBg: "linear-gradient(135deg, #EC4899 0%, #F472B6 100%)",
    borderColor: "#F472B6",
    bgColor: "#FFF0F6",
    photo:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop",
    vids: YOGA_VIDS,
    titles: [
      "Morning Flow",
      "Hip Opening",
      "Restorative Yoga",
      "Breathing & Poses",
      "Full Body Stretch",
    ],
  },
  {
    key: "meditation",
    label: "Meditation",
    subtitle: "Calm mind, happy baby",
    labelBg: "linear-gradient(135deg, #F97316 0%, #FB923C 100%)",
    borderColor: "#FB923C",
    bgColor: "#FFF7ED",
    photo:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=200&fit=crop",
    vids: MEDITATION_VIDS,
    titles: [
      "Body Scan",
      "Breath Awareness",
      "Loving Kindness",
      "Guided Visualization",
      "Sleep Meditation",
    ],
  },
];

export function HealthWellnessCards() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div className="space-y-4">
      {/* Pill tab buttons */}
      <div
        className="flex gap-2 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {WELLNESS_CARDS.map((card) => {
          const isActive = expanded === card.key;
          return (
            <button
              type="button"
              key={card.key}
              onClick={() => setExpanded(isActive ? null : card.key)}
              className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all overflow-hidden relative"
              style={{
                background: isActive ? card.labelBg : `${card.bgColor}`,
                color: isActive ? "white" : card.borderColor,
                border: `1.5px solid ${isActive ? "transparent" : `${card.borderColor}40`}`,
                boxShadow: isActive
                  ? `0 4px 16px ${card.borderColor}35`
                  : "none",
              }}
              data-ocid={`wellness.card_${card.key}`}
              aria-pressed={isActive}
            >
              <div
                className="w-8 h-8 rounded-lg overflow-hidden shrink-0"
                style={{
                  border: `1.5px solid ${isActive ? "rgba(255,255,255,0.35)" : `${card.borderColor}30`}`,
                }}
              >
                <img
                  src={card.photo}
                  alt={`Pregnant woman ${card.label.toLowerCase()}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-bold leading-tight">{card.label}</p>
                <p className="text-[9px] leading-tight mt-0.5 opacity-80">
                  {card.subtitle}
                </p>
              </div>
              {isActive && (
                <div
                  className="ml-1 w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(255,255,255,0.25)" }}
                >
                  <Check size={10} color="white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Expanded video area */}
      {expanded &&
        (() => {
          const card = WELLNESS_CARDS.find((c) => c.key === expanded);
          if (!card) return null;
          return (
            <div
              className="rounded-2xl p-4 animate-inline-expand"
              style={{
                background: card.bgColor,
                border: `1px solid ${card.borderColor}30`,
                boxShadow: `0 4px 20px ${card.borderColor}15`,
              }}
            >
              <p
                className="text-sm font-bold mb-3 flex items-center gap-2"
                style={{ color: card.borderColor }}
              >
                <span
                  className="w-1 h-4 rounded-full inline-block"
                  style={{ background: card.borderColor }}
                />
                {card.label} Videos
              </p>
              <div
                className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1"
                style={{ scrollbarWidth: "none" }}
              >
                {card.vids.map((vid, i) => (
                  <VideoCard key={vid} videoId={vid} title={card.titles[i]} />
                ))}
              </div>
            </div>
          );
        })()}
    </div>
  );
}

// ─── CheckUpReminderInline ───────────────────────────────────────────────────
export function CheckUpReminderInline({
  addNotification,
}: { addNotification: (n: Omit<NotificationItem, "id">) => void }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [scheduled, setScheduled] = useState(false);
  const daysLeft = date
    ? Math.ceil((new Date(date).getTime() - Date.now()) / 86400000)
    : null;
  const schedule = () => {
    if (!date) return;
    setScheduled(true);
    addNotification({
      type: "checkup",
      message: `✅ Checkup scheduled for ${new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} at ${time}`,
    });
  };
  const circumference = 2 * Math.PI * 44;
  const progress = daysLeft !== null ? Math.max(0, 1 - daysLeft / 30) : 0;
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center">
      <div className="flex-1 w-full">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label
              htmlFor="checkup-date"
              className="text-xs font-medium mb-1 block"
              style={{ color: "#6482DC" }}
            >
              Next Checkup Date
            </label>
            <input
              id="checkup-date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setScheduled(false);
              }}
              className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
              style={{ borderColor: "rgba(100,130,220,0.3)", color: "#2E3A7A" }}
              data-ocid="checkup.date_input"
            />
          </div>
          <div>
            <label
              htmlFor="checkup-time"
              className="text-xs font-medium mb-1 block"
              style={{ color: "#6482DC" }}
            >
              Time
            </label>
            <input
              id="checkup-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
              style={{ borderColor: "rgba(100,130,220,0.3)", color: "#2E3A7A" }}
              data-ocid="checkup.time_input"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={schedule}
          className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: "linear-gradient(135deg, #6482DC, #8E5C9F)",
            color: "white",
          }}
          data-ocid="checkup.schedule_button"
        >
          Schedule Reminder
        </button>
        {scheduled && daysLeft !== null && (
          <p
            className="text-center text-sm mt-3 font-medium animate-fade-in"
            style={{ color: "#6482DC" }}
          >
            {daysLeft <= 0
              ? "Your checkup is today! 🩺"
              : `${daysLeft} day${daysLeft !== 1 ? "s" : ""} until your next checkup 📅`}
          </p>
        )}
      </div>
      {daysLeft !== null && (
        <div className="shrink-0">
          <svg width="120" height="120" viewBox="0 0 120 120" role="img">
            <title>{`${daysLeft} days left for checkup`}</title>
            <circle
              cx="60"
              cy="60"
              r="44"
              fill="none"
              stroke="#EEF0FF"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="44"
              fill="none"
              stroke="#6482DC"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              style={{ transition: "stroke-dashoffset 1s ease" }}
            />
            <text
              x="60"
              y="56"
              textAnchor="middle"
              fontSize="24"
              fontWeight="800"
              fill="#2E3A7A"
            >
              {daysLeft}
            </text>
            <text
              x="60"
              y="72"
              textAnchor="middle"
              fontSize="10"
              fill="#6482DC"
            >
              days left
            </text>
          </svg>
        </div>
      )}
    </div>
  );
}

// ─── DoctorConnect ────────────────────────────────────────────────────────────
type DoctorType = (typeof DOCTORS_DATA)[0];

function DoctorModal({
  doc,
  onClose,
}: { doc: DoctorType; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="presentation"
    >
      <dialog
        open
        className="rounded-2xl p-6 w-full max-w-xs animate-fade-in border-0"
        style={{ background: "white" }}
        aria-label={`Contact ${doc.name}`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        data-ocid="doctor.modal"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold" style={{ color: "#5A2D7A" }}>
            {doc.name}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1"
            aria-label="Close doctor contact modal"
          >
            <X size={16} color="#8E5C9F" />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <a
            href={`tel:${doc.phone}`}
            className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all"
            style={{ background: "#8E5C9F", color: "white" }}
            data-ocid="doctor.call_button"
          >
            <Phone size={15} />
            Call Now
          </a>
          <a
            href={`https://wa.me/${doc.phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all"
            style={{ background: "#25D366", color: "white" }}
            data-ocid="doctor.whatsapp_button"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>
      </dialog>
    </div>
  );
}

export function DoctorConnectInline() {
  const [modal, setModal] = useState<DoctorType | null>(null);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {DOCTORS_DATA.map((doc) => (
          <div
            key={doc.name}
            className="rounded-2xl overflow-hidden card-hover"
            style={{
              border: "1px solid rgba(124,58,237,0.12)",
              boxShadow: "0 4px 16px rgba(124,58,237,0.08)",
            }}
            data-ocid="doctor.card"
          >
            {/* Gradient top bar */}
            <div
              className="h-1.5 w-full"
              style={{
                background: "linear-gradient(90deg, #7C3AED, #C084FC, #E879F9)",
              }}
            />
            <div
              className="p-4 text-center"
              style={{
                background: "linear-gradient(180deg, #F8F4FF 0%, #FDFAFF 100%)",
              }}
            >
              <div className="relative inline-block mb-3">
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="w-16 h-16 rounded-2xl object-cover mx-auto"
                  style={{
                    border: "2px solid rgba(124,58,237,0.20)",
                    boxShadow: "0 4px 12px rgba(124,58,237,0.15)",
                  }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                />
              </div>
              <h3
                className="font-bold text-sm mb-0.5"
                style={{ color: "#3A1A5A" }}
              >
                {doc.name}
              </h3>
              <p className="text-xs mb-2" style={{ color: "#9070B0" }}>
                {doc.specialty}
              </p>
              <span
                className="text-xs px-2.5 py-0.5 rounded-full inline-block mb-3 font-medium"
                style={{
                  background: "rgba(124,58,237,0.10)",
                  color: "#7C3AED",
                }}
              >
                {doc.badge}
              </span>
              <br />
              <button
                type="button"
                onClick={() => setModal(doc)}
                className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #9D4EDD)",
                  color: "white",
                  boxShadow: "0 4px 12px rgba(124,58,237,0.25)",
                }}
                data-ocid="doctor.contact_button"
              >
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
      {modal && <DoctorModal doc={modal} onClose={() => setModal(null)} />}
    </div>
  );
}

// ─── NearbyHelp ────────────────────────────────────────────────────────────────
function MapModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="presentation"
    >
      <dialog
        open
        className="rounded-2xl overflow-hidden w-full max-w-2xl animate-fade-in border-0 p-0"
        aria-label="Nearby hospitals map"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        data-ocid="nearby.map_modal"
      >
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ background: "#4A90D9" }}
        >
          <span className="text-white font-semibold text-sm">
            Nearby Hospitals & Pharmacies
          </span>
          <button type="button" onClick={onClose} aria-label="Close map modal">
            <X size={18} color="white" />
          </button>
        </div>
        <iframe
          src="https://maps.google.com/maps?q=hospital+near+me&output=embed"
          className="w-full h-80 sm:h-96"
          title="Nearby hospitals and pharmacies map"
        />
      </dialog>
    </div>
  );
}

export function NearbyHelpInline() {
  const [mapOpen, setMapOpen] = useState(false);
  return (
    <div className="flex flex-col sm:flex-row items-center gap-5">
      <div className="flex-1">
        <p className="font-semibold mb-1" style={{ color: "#2E3A7A" }}>
          Nearby Hospitals & Pharmacies
        </p>
        <p className="text-sm mb-4" style={{ color: "#6080B0" }}>
          Quickly find the nearest hospitals and pharmacies in your area.
        </p>
        <button
          type="button"
          onClick={() => setMapOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{ background: "#4A90D9", color: "white" }}
          data-ocid="nearby.open_map_button"
        >
          <MapPin size={15} />
          Open Map
        </button>
      </div>
      <button
        type="button"
        onClick={() => setMapOpen(true)}
        className="w-full sm:w-48 h-32 rounded-xl overflow-hidden cursor-pointer"
        aria-label="Open nearby hospitals map"
        style={{ background: "linear-gradient(135deg, #C8E0F8, #D0E8FF)" }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <MapPin size={40} color="#4A90D9" opacity={0.5} />
        </div>
      </button>
      {mapOpen && <MapModal onClose={() => setMapOpen(false)} />}
    </div>
  );
}

// ─── AIChat ───────────────────────────────────────────────────────────────────
interface ChatMsg {
  id: string;
  role: "user" | "tina";
  text: string;
}
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}
interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  interimResults: boolean;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}
type SpeechRecognitionCtor = new () => SpeechRecognitionInstance;
interface WindowWithSpeech extends Window {
  SpeechRecognition?: SpeechRecognitionCtor;
  webkitSpeechRecognition?: SpeechRecognitionCtor;
}

export function AIChat() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    {
      id: "0",
      role: "tina",
      text: "Hi! I'm Tina, your Pregnancy & Baby Care Expert. I'm here to support you every step of the way! 💜 Ask me about pregnancy tips, nutrition, baby development, or newborn care.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voiceReplyOn, setVoiceReplyOn] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const recogRef = useRef<SpeechRecognitionInstance | null>(null);

  const scrollToBottom = useCallback(
    () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
    [],
  );
  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

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
      setMsgs((p) => [...p, { id: uid, role: "user", text }]);
      setInput("");
      setTyping(true);
      setTimeout(() => {
        scrollToBottom();
      }, 50);
      setTimeout(() => {
        const reply = getAIResponse(text);
        setTyping(false);
        setMsgs((p) => [...p, { id: `${uid}r`, role: "tina", text: reply }]);
        setTimeout(() => scrollToBottom(), 50);
        if (voiceReplyOn) {
          speakText(reply);
        }
      }, 1200);
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
    if (voiceReplyOn) {
      stopSpeaking();
    }
    setVoiceReplyOn((v) => !v);
  };

  return (
    <div className="flex flex-col h-full">
      {(listening || speaking) && (
        <div
          className="flex items-center gap-2 px-4 py-2.5 mx-3 mt-2 rounded-xl animate-fade-in"
          style={{
            background: listening
              ? "rgba(220,38,38,0.08)"
              : "rgba(142,92,159,0.08)",
            border: `1px solid ${listening ? "rgba(220,38,38,0.2)" : "rgba(142,92,159,0.2)"}`,
          }}
          aria-live="assertive"
          role="alert"
        >
          {listening ? (
            <>
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{
                  background: "#DC2626",
                  animation: "pulse 1s infinite",
                }}
              />
              <span
                className="text-xs font-semibold"
                style={{ color: "#DC2626" }}
              >
                Listening… Speak your question
              </span>
            </>
          ) : (
            <>
              <Volume2
                size={14}
                color="#8E5C9F"
                className="shrink-0"
                style={{ animation: "pulse 1s infinite" }}
              />
              <span
                className="text-xs font-semibold"
                style={{ color: "#8E5C9F" }}
              >
                Tina is speaking…
              </span>
              <button
                type="button"
                onClick={stopSpeaking}
                className="ml-auto text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(142,92,159,0.15)",
                  color: "#8E5C9F",
                }}
                aria-label="Stop speaking"
              >
                Stop
              </button>
            </>
          )}
        </div>
      )}

      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0"
        role="log"
        aria-live="polite"
        aria-label="Chat with Tina"
      >
        {msgs.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-message-appear`}
            data-ocid="chat.message"
          >
            <div
              className="px-4 py-2.5 rounded-2xl text-sm max-w-[78%] leading-relaxed"
              style={{
                background:
                  msg.role === "user"
                    ? "linear-gradient(135deg, #8E5C9F, #B07CC6)"
                    : "white",
                color: msg.role === "user" ? "white" : "#5A2D7A",
                boxShadow: "0 2px 8px rgba(142,92,159,0.12)",
                border:
                  msg.role !== "user"
                    ? "1px solid rgba(142,92,159,0.12)"
                    : "none",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div
              className="px-4 py-3 rounded-2xl bg-white border"
              style={{ borderColor: "rgba(142,92,159,0.12)" }}
              aria-label="Tina is typing"
            >
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div
        className="shrink-0"
        style={{
          background: "rgba(255,255,255,0.97)",
          borderTop: "1px solid rgba(142,92,159,0.12)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          className="px-3 pt-3 pb-1 flex flex-wrap gap-1.5"
          aria-label="Quick replies"
        >
          {QUICK_REPLIES.map((q) => (
            <button
              type="button"
              key={q}
              onClick={() => send(q)}
              className="px-3 py-1 rounded-full text-xs font-medium transition-all"
              style={{
                background: "rgba(142,92,159,0.1)",
                color: "#8E5C9F",
                border: "1px solid rgba(142,92,159,0.2)",
              }}
              data-ocid="chat.quick_reply"
            >
              {q}
            </button>
          ))}
        </div>

        <div className="px-3 pb-3 pt-2 flex gap-2 items-center">
          <button
            type="button"
            onClick={toggleVoiceReply}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0"
            style={{
              background: voiceReplyOn
                ? "linear-gradient(135deg, #8E5C9F, #B07CC6)"
                : "rgba(142,92,159,0.1)",
              color: voiceReplyOn ? "white" : "#8E5C9F",
              boxShadow: voiceReplyOn
                ? "0 2px 8px rgba(142,92,159,0.3)"
                : "none",
            }}
            aria-label={
              voiceReplyOn ? "Turn off voice replies" : "Turn on voice replies"
            }
            aria-pressed={voiceReplyOn}
            data-ocid="chat.voice_reply_toggle"
          >
            {voiceReplyOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <label htmlFor="tina-chat-input" className="sr-only">
            Message Tina about pregnancy or baby care
          </label>
          <input
            id="tina-chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send(input)}
            placeholder="Ask about pregnancy, baby care…"
            className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none border min-w-0"
            style={{ borderColor: "rgba(142,92,159,0.25)", color: "#5A2D7A" }}
            data-ocid="chat.input"
          />

          <button
            type="button"
            onClick={toggleVoiceInput}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0"
            style={{
              background: listening ? "#DC2626" : "rgba(142,92,159,0.12)",
              color: listening ? "white" : "#8E5C9F",
              boxShadow: listening ? "0 0 0 3px rgba(220,38,38,0.2)" : "none",
              animation: listening ? "pulse 1.2s infinite" : "none",
            }}
            aria-label={listening ? "Stop voice input" : "Start voice input"}
            aria-pressed={listening}
            data-ocid="chat.voice_input_button"
          >
            {listening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>

          <button
            type="button"
            onClick={() => send(input)}
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all"
            style={{ background: "#8E5C9F", color: "white" }}
            aria-label="Send message"
            data-ocid="chat.send_button"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── BabyWellnessCards ────────────────────────────────────────────────────────
// New-mother–specific wellness: After Birth Care, Newborn Care, Wellness & Meditation
// Does NOT modify the existing HealthWellnessCards used by the pregnancy dashboard.

const BABY_WELLNESS_TABS = [
  {
    key: "afterbirth",
    label: "After Birth Care",
    emoji: "🤱",
    color: "#8E5C9F",
    bg: "#F5EDFF",
    gradient: "linear-gradient(135deg, #8E5C9F 0%, #C48DD8 100%)",
    videos: [
      {
        id: "kFo0LD1U8I4",
        title: "Postpartum Recovery Exercises",
        duration: "14 min",
        instructor: "Dr. Sarah Mitchell",
      },
      {
        id: "9bZkp7q19f0",
        title: "After Birth Body Care Tips",
        duration: "10 min",
        instructor: "Midwife Anna",
      },
      {
        id: "L_jWHffIx5E",
        title: "Postpartum Yoga for New Mothers",
        duration: "18 min",
        instructor: "Yoga With Adriene",
      },
      {
        id: "aB3Aml8ZAWY",
        title: "New Mom Self Care Routine",
        duration: "12 min",
        instructor: "MommaStrong",
      },
      {
        id: "3wHkcs9HBBo",
        title: "Breastfeeding Tips & Positions",
        duration: "15 min",
        instructor: "Lactation Specialist",
      },
      {
        id: "M0u41LnkFHk",
        title: "Healing After Delivery — Full Guide",
        duration: "20 min",
        instructor: "Dr. Priya Nair",
      },
    ],
  },
  {
    key: "newborn",
    label: "Newborn Care",
    emoji: "👶",
    color: "#E06AA0",
    bg: "#FFF0F8",
    gradient: "linear-gradient(135deg, #E06AA0 0%, #F9A8D4 100%)",
    videos: [
      {
        id: "MvFkgVz4BIg",
        title: "Newborn Baby Care Basics",
        duration: "16 min",
        instructor: "Dr. Karen Lee",
      },
      {
        id: "K7u-v3kW0u4",
        title: "How to Bathe Your Newborn",
        duration: "8 min",
        instructor: "Nurse Emma",
      },
      {
        id: "EO2r3FDPPIY",
        title: "Newborn Sleep Tips & Safe Sleep",
        duration: "11 min",
        instructor: "Sleep Coach",
      },
      {
        id: "fP-MiMmtcG4",
        title: "Baby Massage for Newborns",
        duration: "13 min",
        instructor: "Dr. Meena Sharma",
      },
      {
        id: "YOD5Z_kioA0",
        title: "Soothing a Crying Newborn",
        duration: "9 min",
        instructor: "Pediatric Nurse",
      },
      {
        id: "GBYPx0VJKBo",
        title: "Tummy Time & Development",
        duration: "7 min",
        instructor: "Child Therapist",
      },
    ],
  },
  {
    key: "postpartum",
    label: "Postpartum Fitness",
    emoji: "🏃‍♀️",
    color: "#059669",
    bg: "#ECFDF5",
    gradient: "linear-gradient(135deg, #059669 0%, #34D399 100%)",
    videos: [
      {
        id: "sTANio_2E0Q",
        title: "Gentle Postpartum Core Recovery",
        duration: "15 min",
        instructor: "MommaStrong",
      },
      {
        id: "Sn5m5N1KMWY",
        title: "Pelvic Floor Exercises for New Moms",
        duration: "12 min",
        instructor: "Physio Jane",
      },
      {
        id: "3kWTOq1nMcA",
        title: "Safe Postpartum Cardio — Week 6+",
        duration: "20 min",
        instructor: "FitMama Coach",
      },
      {
        id: "qULTwquOuT4",
        title: "Beginner Postpartum Yoga Flow",
        duration: "18 min",
        instructor: "Yoga With Adriene",
      },
      {
        id: "IvCIiW7AYtI",
        title: "Diastasis Recti Healing Workout",
        duration: "14 min",
        instructor: "Dr. Kelly Dean",
      },
      {
        id: "gZLn2pAXHC4",
        title: "Low-Impact Walk + Stretch Routine",
        duration: "25 min",
        instructor: "MommaStrong",
      },
    ],
  },
  {
    key: "mentalhealth",
    label: "Mental Health",
    emoji: "🌿",
    color: "#7C3AED",
    bg: "#F5F3FF",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
    videos: [
      {
        id: "inpok4MKVLM",
        title: "Meditation for New Mothers",
        duration: "10 min",
        instructor: "Calm App",
      },
      {
        id: "FMP_kSBs2h4",
        title: "Postpartum Mental Health & Wellness",
        duration: "16 min",
        instructor: "Dr. Amara Shah",
      },
      {
        id: "g_tea8L-GQc",
        title: "Managing Postpartum Anxiety",
        duration: "13 min",
        instructor: "Therapist Lisa",
      },
      {
        id: "j5yikHzkNs4",
        title: "Mindfulness for New Moms",
        duration: "8 min",
        instructor: "Headspace",
      },
      {
        id: "ZToicYcHIOU",
        title: "Overcoming Mom Guilt & Stress",
        duration: "11 min",
        instructor: "Dr. Tara Brach",
      },
      {
        id: "O-6f5wQXSu8",
        title: "Breathwork for Overwhelmed Moms",
        duration: "7 min",
        instructor: "Wellness Coach",
      },
    ],
  },
  {
    key: "nutrition",
    label: "Nutrition",
    emoji: "🥗",
    color: "#D97706",
    bg: "#FFFBEB",
    gradient: "linear-gradient(135deg, #D97706 0%, #FCD34D 100%)",
    videos: [
      {
        id: "9Kv3-zN7oUg",
        title: "Postpartum Nutrition for Recovery",
        duration: "14 min",
        instructor: "Dietitian Priya",
      },
      {
        id: "OAnKBMSUFaE",
        title: "Foods to Boost Breast Milk Supply",
        duration: "11 min",
        instructor: "Lactation Expert",
      },
      {
        id: "wAZZ-UWGVHI",
        title: "Easy Healthy Meals for New Moms",
        duration: "18 min",
        instructor: "Chef Nina",
      },
      {
        id: "VlQQouFmTEk",
        title: "Iron & Calcium Rich Foods After Birth",
        duration: "9 min",
        instructor: "Dietitian Sue",
      },
      {
        id: "yE3DAtGA0Cc",
        title: "Breastfeeding Diet — What to Eat",
        duration: "13 min",
        instructor: "Dr. Ritu Sharma",
      },
      {
        id: "P-DT3cGlYX8",
        title: "Smoothies & Snacks for Nursing Moms",
        duration: "10 min",
        instructor: "Nutritionist Kate",
      },
    ],
  },
  {
    key: "sleep",
    label: "Sleep & Recovery",
    emoji: "😴",
    color: "#2563EB",
    bg: "#EFF6FF",
    gradient: "linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)",
    videos: [
      {
        id: "kGpe7tYLuPk",
        title: "Sleep Strategies for New Moms",
        duration: "12 min",
        instructor: "Sleep Expert",
      },
      {
        id: "8HYLyGFBCk4",
        title: "How to Sleep When Baby Sleeps",
        duration: "9 min",
        instructor: "Dr. Harvey Karp",
      },
      {
        id: "Tz2zNuX1b_s",
        title: "Recovery & Rest After Birth",
        duration: "15 min",
        instructor: "Midwife Sarah",
      },
      {
        id: "r7-HCB2yXsg",
        title: "Coping with Sleep Deprivation",
        duration: "11 min",
        instructor: "Dr. Chris Winter",
      },
      {
        id: "OAnKBMSUFaE",
        title: "Napping Techniques for New Moms",
        duration: "8 min",
        instructor: "Sleep Coach Amy",
      },
      {
        id: "ZToicYcHIOU",
        title: "Evening Wind-Down Routine for Moms",
        duration: "13 min",
        instructor: "Wellness Coach",
      },
    ],
  },
];

export function BabyWellnessCards() {
  const [activeTab, setActiveTab] = useState<string>("afterbirth");
  const tab =
    BABY_WELLNESS_TABS.find((t) => t.key === activeTab) ??
    BABY_WELLNESS_TABS[0];

  return (
    <div>
      {/* Section title */}
      <div className="mb-4">
        <h3 className="text-lg font-extrabold" style={{ color: "#5A2D7A" }}>
          🌸 Mother's Wellness Hub
        </h3>
        <p className="text-xs mt-0.5" style={{ color: "#9B72B0" }}>
          Expert-curated videos for every stage of your motherhood journey
        </p>
      </div>

      {/* Tab pills */}
      <div
        className="flex gap-2 mb-4 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {BABY_WELLNESS_TABS.map((t) => {
          const isActive = activeTab === t.key;
          return (
            <button
              type="button"
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all"
              style={{
                background: isActive ? t.gradient : "rgba(142,92,159,0.08)",
                color: isActive ? "white" : "#8E5C9F",
                border: isActive ? "none" : "1px solid rgba(142,92,159,0.18)",
                boxShadow: isActive ? `0 3px 12px ${t.color}44` : "none",
              }}
              aria-pressed={isActive}
              data-ocid={`baby_wellness.tab_${t.key}`}
            >
              <span>{t.emoji}</span>
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active tab heading */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{tab.emoji}</span>
        <div>
          <p className="text-sm font-bold" style={{ color: tab.color }}>
            {tab.label}
          </p>
          <p className="text-xs" style={{ color: "#9B72B0" }}>
            {tab.videos.length} videos
          </p>
        </div>
      </div>

      {/* Video grid */}
      <div
        className="rounded-2xl p-4"
        style={{ background: tab.bg, border: `1px solid ${tab.color}22` }}
      >
        <div
          className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1"
          style={{ scrollbarWidth: "none" }}
          data-ocid={`baby_wellness.video_list_${tab.key}`}
        >
          {tab.videos.map((v) => (
            <div
              key={v.id}
              className="shrink-0 w-60 rounded-xl overflow-hidden shadow-sm"
              style={{ border: `1px solid ${tab.color}22` }}
              data-ocid="baby_wellness.video_card"
            >
              <a
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-video w-full"
                aria-label={`Watch: ${v.title}`}
              >
                <img
                  src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.22)" }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: `${tab.color}dd`,
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <Play size={18} color="white" fill="white" />
                  </div>
                </div>
                {/* Duration badge */}
                <div
                  className="absolute bottom-2 right-2 text-white text-xs font-semibold px-2 py-0.5 rounded-md"
                  style={{ background: "rgba(0,0,0,0.65)" }}
                >
                  {v.duration}
                </div>
              </a>
              <div className="px-3 py-2.5" style={{ background: "white" }}>
                <p
                  className="text-xs font-semibold leading-snug line-clamp-2 mb-1"
                  style={{ color: "#5A2D7A" }}
                >
                  {v.title}
                </p>
                <p className="text-xs" style={{ color: "#9B72B0" }}>
                  {v.instructor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── VaccineReminderInline ────────────────────────────────────────────────────
// Baby-flow specific — separate from the pregnancy CheckUpReminderInline.
// Asks for vaccine name, date, time, and optional notes.

interface VaccineEntry {
  id: string;
  name: string;
  date: string;
  time: string;
  notes: string;
  scheduled: boolean;
}

const VACCINE_SUGGESTIONS = [
  "BCG",
  "Hepatitis B",
  "DPT",
  "OPV / Polio",
  "Hib",
  "PCV",
  "Rotavirus",
  "MMR",
  "Varicella",
  "Typhoid",
  "Hepatitis A",
];

export function VaccineReminderInline({
  addNotification,
}: { addNotification: (n: Omit<NotificationItem, "id">) => void }) {
  const [vaccines, setVaccines] = useState<VaccineEntry[]>([
    {
      id: "v1",
      name: "BCG",
      date: "",
      time: "10:00",
      notes: "At birth — given in hospital",
      scheduled: true,
    },
    {
      id: "v2",
      name: "Hepatitis B",
      date: "",
      time: "10:00",
      notes: "First dose at birth",
      scheduled: true,
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "10:00",
    notes: "",
  });
  const [suggestion, setSuggestion] = useState(false);

  const scheduleVaccine = () => {
    if (!form.name || !form.date) return;
    const newEntry: VaccineEntry = {
      id: Date.now().toString(),
      name: form.name,
      date: form.date,
      time: form.time,
      notes: form.notes,
      scheduled: true,
    };
    setVaccines((prev) => [...prev, newEntry]);
    addNotification({
      type: "checkup",
      message: `💉 ${form.name} vaccine scheduled for ${new Date(form.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} at ${form.time}`,
    });
    setForm({ name: "", date: "", time: "10:00", notes: "" });
    setShowForm(false);
  };

  const getDaysLeft = (date: string) => {
    if (!date) return null;
    return Math.ceil((new Date(date).getTime() - Date.now()) / 86400000);
  };

  return (
    <div className="space-y-3">
      {/* Scheduled vaccines list */}
      {vaccines.map((v) => {
        const days = getDaysLeft(v.date);
        return (
          <div
            key={v.id}
            className="flex items-start gap-3 rounded-xl p-3.5 border"
            style={{
              background: "#F0F4FF",
              borderColor: "rgba(100,130,220,0.2)",
            }}
            data-ocid="vaccine.item"
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: "rgba(100,130,220,0.15)" }}
            >
              <Syringe size={16} color="#6482DC" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm" style={{ color: "#2E3A7A" }}>
                💉 {v.name}
              </p>
              {v.date && (
                <p className="text-xs mt-0.5" style={{ color: "#6482DC" }}>
                  {new Date(v.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  at {v.time}
                </p>
              )}
              {v.notes && (
                <p
                  className="text-xs mt-0.5 italic"
                  style={{ color: "#8090B0" }}
                >
                  {v.notes}
                </p>
              )}
              {days !== null && (
                <span
                  className="inline-block text-xs px-2 py-0.5 rounded-full mt-1.5 font-medium"
                  style={{
                    background:
                      days <= 0
                        ? "rgba(34,197,94,0.15)"
                        : days <= 7
                          ? "rgba(251,146,60,0.15)"
                          : "rgba(100,130,220,0.12)",
                    color:
                      days <= 0 ? "#158C52" : days <= 7 ? "#C05A20" : "#6482DC",
                  }}
                >
                  {days <= 0
                    ? "📅 Due today!"
                    : `${days} day${days !== 1 ? "s" : ""} away`}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setVaccines((p) => p.filter((x) => x.id !== v.id))}
              className="p-1 opacity-40 hover:opacity-70 transition-opacity shrink-0"
              aria-label={`Remove ${v.name}`}
              data-ocid="vaccine.remove_button"
            >
              <X size={14} color="#6482DC" />
            </button>
          </div>
        );
      })}

      {/* Add form */}
      {showForm ? (
        <div
          className="rounded-xl p-4 border space-y-3 animate-inline-expand"
          style={{
            background: "#F0F4FF",
            borderColor: "rgba(100,130,220,0.3)",
          }}
          data-ocid="vaccine.add_form"
        >
          <p className="text-sm font-bold" style={{ color: "#2E3A7A" }}>
            ➕ Add Vaccine Reminder
          </p>

          {/* Vaccine name */}
          <div className="relative">
            <label
              htmlFor="vaccine-name"
              className="text-xs font-semibold mb-1 block"
              style={{ color: "#6482DC" }}
            >
              Vaccine Name
            </label>
            <input
              id="vaccine-name"
              placeholder="e.g. BCG, Hepatitis B, DPT, Polio, MMR"
              value={form.name}
              onChange={(e) => {
                setForm((f) => ({ ...f, name: e.target.value }));
                setSuggestion(e.target.value.length > 0);
              }}
              onBlur={() => setTimeout(() => setSuggestion(false), 150)}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none border"
              style={{ borderColor: "rgba(100,130,220,0.3)", color: "#2E3A7A" }}
              data-ocid="vaccine.name_input"
            />
            {suggestion && (
              <div
                className="absolute left-0 right-0 rounded-xl overflow-hidden shadow-lg z-10 top-full mt-1"
                style={{
                  background: "white",
                  border: "1px solid rgba(100,130,220,0.2)",
                }}
              >
                {VACCINE_SUGGESTIONS.filter((s) =>
                  s.toLowerCase().includes(form.name.toLowerCase()),
                )
                  .slice(0, 5)
                  .map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="w-full text-left px-4 py-2 text-xs hover:bg-blue-50 transition-colors"
                      style={{ color: "#2E3A7A" }}
                      onMouseDown={() => {
                        setForm((f) => ({ ...f, name: s }));
                        setSuggestion(false);
                      }}
                    >
                      💉 {s}
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="vaccine-date"
                className="text-xs font-semibold mb-1 block"
                style={{ color: "#6482DC" }}
              >
                Due Date
              </label>
              <input
                id="vaccine-date"
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-lg text-sm outline-none border"
                style={{
                  borderColor: "rgba(100,130,220,0.3)",
                  color: "#2E3A7A",
                }}
                data-ocid="vaccine.date_input"
              />
            </div>
            <div>
              <label
                htmlFor="vaccine-time"
                className="text-xs font-semibold mb-1 block"
                style={{ color: "#6482DC" }}
              >
                Time
              </label>
              <input
                id="vaccine-time"
                type="time"
                value={form.time}
                onChange={(e) =>
                  setForm((f) => ({ ...f, time: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-lg text-sm outline-none border"
                style={{
                  borderColor: "rgba(100,130,220,0.3)",
                  color: "#2E3A7A",
                }}
                data-ocid="vaccine.time_input"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="vaccine-notes"
              className="text-xs font-semibold mb-1 block"
              style={{ color: "#6482DC" }}
            >
              Notes (optional)
            </label>
            <input
              id="vaccine-notes"
              placeholder="e.g. Visit pediatric clinic"
              value={form.notes}
              onChange={(e) =>
                setForm((f) => ({ ...f, notes: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-lg text-sm outline-none border"
              style={{ borderColor: "rgba(100,130,220,0.3)", color: "#2E3A7A" }}
              data-ocid="vaccine.notes_input"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={scheduleVaccine}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: "linear-gradient(135deg, #6482DC, #8E5C9F)",
                color: "white",
              }}
              data-ocid="vaccine.save_button"
            >
              Schedule Vaccine
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ background: "rgba(100,130,220,0.1)", color: "#6482DC" }}
              data-ocid="vaccine.cancel_button"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all"
          style={{
            background: "rgba(100,130,220,0.08)",
            color: "#6482DC",
            border: "1px dashed rgba(100,130,220,0.4)",
          }}
          data-ocid="vaccine.add_button"
        >
          <Plus size={16} />
          Add Vaccine Reminder
        </button>
      )}
    </div>
  );
}

// ─── BabyDoctorConnectInline ──────────────────────────────────────────────────
// Having Baby flow: enhanced doctor cards with pediatrician as first card.
// Separate from the pregnancy DoctorConnectInline.

const BABY_DOCTORS_DATA = [
  {
    name: "Dr. Ananya Krishnan",
    specialty: "Pediatrician & Child Specialist",
    phone: "+919876543220",
    badge: "Child Specialist",
    available: "Mon–Sat, 9AM–6PM",
    accentColor: "#0D9488",
    accentBg: "#F0FDFA",
    accentBorder: "rgba(13,148,136,0.25)",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100",
    emoji: "👶",
  },
  {
    name: "Dr. Priya Sharma",
    specialty: "OB-GYN",
    phone: "+919876543210",
    badge: "Obstetrician",
    available: "Mon–Fri, 9AM–5PM",
    accentColor: "#8E5C9F",
    accentBg: "#F8F0FF",
    accentBorder: "rgba(142,92,159,0.2)",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100",
    emoji: "🩺",
  },
  {
    name: "Dr. Anjali Gupta",
    specialty: "Nutritionist",
    phone: "+919876543211",
    badge: "Nutrition Expert",
    available: "Tue–Sat, 10AM–4PM",
    accentColor: "#EC4899",
    accentBg: "#FFF0F8",
    accentBorder: "rgba(236,72,153,0.2)",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100",
    emoji: "🥗",
  },
  {
    name: "Dr. Meera Patel",
    specialty: "Physiotherapist",
    phone: "+919876543212",
    badge: "Women's Health",
    available: "Mon–Sat, 8AM–3PM",
    accentColor: "#2563EB",
    accentBg: "#EFF6FF",
    accentBorder: "rgba(37,99,235,0.2)",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100",
    emoji: "💪",
  },
];

type BabyDoctorType = (typeof BABY_DOCTORS_DATA)[0];

function BabyDoctorModal({
  doc,
  onClose,
}: { doc: BabyDoctorType; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="presentation"
    >
      <dialog
        open
        className="rounded-2xl p-6 w-full max-w-xs animate-fade-in border-0"
        style={{ background: "white" }}
        aria-label={`Contact ${doc.name}`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        data-ocid="baby_doctor.modal"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-sm" style={{ color: "#2E3A7A" }}>
              {doc.name}
            </h3>
            <p className="text-xs" style={{ color: doc.accentColor }}>
              {doc.specialty}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1"
            aria-label="Close doctor contact modal"
          >
            <X size={16} color="#8E5C9F" />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <a
            href={`tel:${doc.phone}`}
            className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all"
            style={{ background: doc.accentColor, color: "white" }}
            data-ocid="baby_doctor.call_button"
          >
            <Phone size={15} />
            Call Now
          </a>
          <a
            href={`https://wa.me/${doc.phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all"
            style={{ background: "#25D366", color: "white" }}
            data-ocid="baby_doctor.whatsapp_button"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>
      </dialog>
    </div>
  );
}

export function BabyDoctorConnectInline({
  babyInfo,
}: { babyInfo: Record<string, string> | null }) {
  const [modal, setModal] = useState<BabyDoctorType | null>(null);

  // If babyInfo has a custom doctor name, show it on the pediatrician card
  const doctors = BABY_DOCTORS_DATA.map((d, i) =>
    i === 0 && babyInfo?.doctorName ? { ...d, name: babyInfo.doctorName } : d,
  );

  return (
    <div>
      <div className="grid grid-cols-1 gap-3">
        {doctors.map((doc, idx) => (
          <div
            key={doc.name}
            className="rounded-2xl overflow-hidden"
            style={{
              border: `1.5px solid ${doc.accentBorder}`,
              boxShadow: idx === 0 ? `0 4px 20px ${doc.accentColor}18` : "none",
            }}
            data-ocid="baby_doctor.card"
          >
            <div
              className="flex items-center gap-4 px-4 py-4"
              style={{ background: doc.accentBg }}
            >
              {/* Photo */}
              <div className="relative shrink-0">
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="w-16 h-16 rounded-full object-cover"
                  style={{ border: `3px solid ${doc.accentColor}44` }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                />
                {/* Emoji badge */}
                <span
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                  style={{
                    background: doc.accentColor,
                    boxShadow: `0 2px 6px ${doc.accentColor}55`,
                  }}
                >
                  {doc.emoji}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <h3
                    className="font-bold text-sm"
                    style={{ color: "#1A1A2E" }}
                  >
                    {doc.name}
                  </h3>
                  {idx === 0 && (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide"
                      style={{ background: doc.accentColor, color: "white" }}
                    >
                      Primary
                    </span>
                  )}
                </div>
                <p
                  className="text-xs font-medium mb-0.5"
                  style={{ color: doc.accentColor }}
                >
                  {doc.specialty}
                </p>
                <span
                  className="text-xs px-2 py-0.5 rounded-full inline-block mb-2"
                  style={{
                    background: `${doc.accentColor}18`,
                    color: doc.accentColor,
                  }}
                >
                  {doc.badge}
                </span>
                <p className="text-[10px]" style={{ color: "#8090B0" }}>
                  🕐 {doc.available}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div
              className="flex gap-2 px-4 py-3"
              style={{
                background: "white",
                borderTop: `1px solid ${doc.accentBorder}`,
              }}
            >
              <a
                href={`tel:${doc.phone}`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all"
                style={{ background: doc.accentColor, color: "white" }}
                data-ocid="baby_doctor.call_link"
                aria-label={`Call ${doc.name}`}
              >
                <Phone size={12} />📞 Call
              </a>
              <a
                href={`https://wa.me/${doc.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all"
                style={{ background: "#25D366", color: "white" }}
                data-ocid="baby_doctor.whatsapp_link"
                aria-label={`WhatsApp ${doc.name}`}
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setModal(doc)}
                className="flex-1 flex items-center justify-center py-2 rounded-xl text-xs font-semibold transition-all"
                style={{
                  background: `${doc.accentColor}12`,
                  color: doc.accentColor,
                  border: `1px solid ${doc.accentBorder}`,
                }}
                data-ocid="baby_doctor.contact_button"
                aria-label={`More options for ${doc.name}`}
              >
                More
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-xs mt-3" style={{ color: "#B090C8" }}>
        Tap any card to connect with your care team 💜
      </p>
      {modal && <BabyDoctorModal doc={modal} onClose={() => setModal(null)} />}
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  return (
    <footer
      className="py-10 px-4 text-center"
      style={{
        background: "linear-gradient(180deg, #F0E8FF 0%, #F5EDFF 100%)",
        borderTop: "1px solid rgba(124,58,237,0.10)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2.5 mb-3">
          <img
            src={LOGO}
            alt="Mothera logo"
            className="w-8 h-8 rounded-xl object-cover"
            style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.20)" }}
          />
          <span
            className="font-extrabold text-base tracking-tight"
            style={{
              background: "linear-gradient(135deg, #6B21A8, #9D4EDD)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Mothera
          </span>
        </div>
        <p className="text-xs" style={{ color: "#B090C8" }}>
          © {year}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:opacity-80 transition-opacity"
            style={{ color: "#7C3AED" }}
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

// ─── EmergencyAssistanceCard ──────────────────────────────────────────────────
function EmergencyAssistanceCard({ userInfo }: { userInfo: UserInfo | null }) {
  return (
    <div
      id="emergency"
      className="rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #EF4444 0%, #DC2626 50%, #B91C1C 100%)",
        boxShadow: "0 8px 32px rgba(239,68,68,0.30)",
      }}
      data-ocid="emergency_assistance_card"
    >
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,255,255,0.20)" }}
          >
            <AlertTriangle size={22} color="white" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-white leading-tight">
              Emergency Assistance
            </h3>
            <p className="text-red-200 text-xs mt-0.5">
              One tap to call ambulance and emergency contacts
            </p>
          </div>
        </div>

        {/* Pulsing SOS Button */}
        <a
          href="tel:102"
          className="block w-full text-center py-4 rounded-2xl font-extrabold text-lg text-white transition-all animate-pulse-red mb-3 tracking-widest"
          style={{
            background: "rgba(255,255,255,0.18)",
            border: "2px solid rgba(255,255,255,0.35)",
            letterSpacing: "0.15em",
          }}
          data-ocid="emergency.call_now_button"
        >
          🆘 CALL SOS — 102
        </a>

        <div className="flex items-center justify-between">
          <p className="text-red-200 text-xs">
            Tap to dial ambulance immediately
          </p>
          {userInfo?.emergencyPhone && (
            <a
              href={`tel:${userInfo.emergencyPhone}`}
              className="flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all"
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
              data-ocid="emergency.contact_link"
            >
              <Phone size={12} />
              {userInfo.emergencyName || "Emergency Contact"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Header ────────────────────────────────────────────────────────────────────
function Header({ userInfo }: { userInfo: UserInfo | null }) {
  const name = userInfo?.firstName || "Mama";
  const week = userInfo?.pregnancyWeek || "24";
  const due = userInfo?.dueDate
    ? new Date(userInfo.dueDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";
  const week_num = Number.parseInt(week, 10) || 24;
  const pct = Math.min((week_num / 40) * 100, 100);
  const trimester =
    week_num <= 12
      ? "1st Trimester"
      : week_num <= 26
        ? "2nd Trimester"
        : "3rd Trimester";
  const trimesterColor =
    week_num <= 12 ? "#7C3AED" : week_num <= 26 ? "#9D4EDD" : "#C048A0";

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-8 pb-10 px-4"
      style={{
        background:
          "linear-gradient(145deg, #EDE0FF 0%, #F5E8FF 35%, #FFE8F8 70%, #FFF0FB 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #C084FC 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #E879F9 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Greeting */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-1" style={{ color: "#A070C0" }}>
            Welcome back 👋
          </p>
          <h1
            className="text-4xl font-extrabold leading-tight mb-2 tracking-tight"
            style={{ color: "#3A1A5A" }}
          >
            Hello, {name}!
          </h1>
          <p className="text-sm" style={{ color: "#8060A0" }}>
            Your little one is growing beautifully. You're doing amazing! 💜
          </p>
        </div>

        {/* Progress card */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(192,132,252,0.25)",
            boxShadow: "0 8px 32px rgba(142,92,159,0.12)",
          }}
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <span
                className="text-3xl font-extrabold leading-none"
                style={{ color: "#3A1A5A" }}
              >
                Week {week_num}
              </span>
              <span className="text-sm ml-2" style={{ color: "#A080B8" }}>
                of 40
              </span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{
                  background: `${trimesterColor}18`,
                  color: trimesterColor,
                  border: `1px solid ${trimesterColor}30`,
                }}
              >
                {trimester}
              </span>
              <span className="text-xs" style={{ color: "#B090C8" }}>
                Due: {due}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div
              className="relative h-2.5 rounded-full overflow-hidden"
              style={{ background: "rgba(192,132,252,0.2)" }}
            >
              <div
                className="h-full rounded-full progress-bar-animated"
                style={
                  {
                    width: `${pct}%`,
                    background: "linear-gradient(90deg, #C084FC, #7C3AED)",
                    "--progress-width": `${pct}%`,
                  } as React.CSSProperties
                }
              />
            </div>
            <div className="flex justify-between">
              <span
                className="text-[10px] font-medium"
                style={{ color: "#C4A0DC" }}
              >
                Week 1
              </span>
              <span
                className="text-[10px] font-semibold"
                style={{ color: "#7C3AED" }}
              >
                {Math.round(pct)}% complete
              </span>
              <span
                className="text-[10px] font-medium"
                style={{ color: "#C4A0DC" }}
              >
                Week 40
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({
  userInfo,
  onLogout,
}: { userInfo: UserInfo | null; onLogout: () => void }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [activeTab, setActiveTab] = useState<DashboardScreen>("home");
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

  const renderContent = () => {
    if (activeTab === "assistant")
      return <AssistantPage onBack={() => setActiveTab("home")} />;
    if (activeTab === "community")
      return <CommunityPage onBack={() => setActiveTab("home")} />;
    if (activeTab === "shopping")
      return (
        <ShoppingPage
          onBack={() => setActiveTab("home")}
          dashboardType="pregnancy"
        />
      );
    if (activeTab === "classes")
      return (
        <ClassesPage onBack={() => setActiveTab("home")} userInfo={userInfo} />
      );
    return (
      <>
        <Header userInfo={userInfo} />
        <SectionMenuBar />
        <div className="max-w-2xl mx-auto px-4 pt-5 space-y-5 pb-28">
          {/* Timeline */}
          <div
            id="timeline"
            className="rounded-2xl p-5"
            style={{
              background: "white",
              border: "1px solid rgba(124,58,237,0.10)",
              boxShadow: "0 4px 20px rgba(124,58,237,0.07)",
            }}
          >
            <SectionHeader
              icon={<span className="text-lg">🤰</span>}
              title="Your Pregnancy Journey"
              subtitle="Tap any month to see your baby's growth"
              accentColor="#7C3AED"
              iconBg="rgba(124,58,237,0.10)"
            />
            <CircularTimeline />
          </div>

          {/* Medicine Reminder */}
          <div
            id="medicine"
            className="rounded-2xl p-5"
            style={{
              background: "white",
              border: "1px solid rgba(124,58,237,0.10)",
              boxShadow: "0 4px 20px rgba(124,58,237,0.07)",
            }}
          >
            <SectionHeader
              icon={<Pill size={18} color="#7C3AED" />}
              title="Medicine Reminders"
              subtitle="Track your daily supplements & medication"
              accentColor="#7C3AED"
              iconBg="rgba(124,58,237,0.10)"
            />
            <MedicineReminderPanel addNotification={addNotification} />
          </div>

          {/* Emergency */}
          <EmergencyAssistanceCard userInfo={userInfo} />

          {/* Wellness */}
          <div
            id="wellness"
            className="rounded-2xl p-5"
            style={{
              background: "white",
              border: "1px solid rgba(124,58,237,0.10)",
              boxShadow: "0 4px 20px rgba(124,58,237,0.07)",
            }}
          >
            <SectionHeader
              icon={<span className="text-lg">🧘</span>}
              title="Health & Wellness"
              subtitle="Curated exercise, yoga and meditation videos"
              accentColor="#9D4EDD"
              iconBg="rgba(157,78,221,0.10)"
            />
            <HealthWellnessCards />
          </div>

          {/* Checkup Reminder */}
          <div
            id="checkup"
            className="rounded-2xl p-5"
            style={{
              background: "white",
              border: "1px solid rgba(100,130,220,0.12)",
              boxShadow: "0 4px 20px rgba(100,130,220,0.07)",
            }}
          >
            <SectionHeader
              icon={<Calendar size={18} color="#6482DC" />}
              title="Checkup Reminder"
              subtitle="Schedule your next prenatal appointment"
              accentColor="#6482DC"
              iconBg="rgba(100,130,220,0.12)"
            />
            <CheckUpReminderInline addNotification={addNotification} />
          </div>

          {/* Nearby Help */}
          <div
            id="nearby"
            className="rounded-2xl p-5"
            style={{
              background: "white",
              border: "1px solid rgba(74,144,217,0.12)",
              boxShadow: "0 4px 20px rgba(74,144,217,0.07)",
            }}
          >
            <SectionHeader
              icon={<MapPin size={18} color="#4A90D9" />}
              title="Nearby Help"
              subtitle="Find hospitals & pharmacies near you"
              accentColor="#4A90D9"
              iconBg="rgba(74,144,217,0.12)"
            />
            <NearbyHelpInline />
          </div>

          {/* Doctor Connect */}
          <div
            id="doctors"
            className="rounded-2xl p-5"
            style={{
              background: "white",
              border: "1px solid rgba(124,58,237,0.10)",
              boxShadow: "0 4px 20px rgba(124,58,237,0.07)",
            }}
          >
            <SectionHeader
              icon={<span className="text-lg">🩺</span>}
              title="Doctor Connect"
              subtitle="Your care team — one tap away"
              accentColor="#7C3AED"
              iconBg="rgba(124,58,237,0.10)"
            />
            <DoctorConnectInline />
          </div>
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
          "linear-gradient(180deg, #EDE0FF 0%, #F5EDFF 15%, #FAFAFF 40%, #F9F5FF 100%)",
      }}
    >
      {activeTab === "home" && <NavBar onLogout={onLogout} />}
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

// ─── AppScreens ────────────────────────────────────────────────────────────────
type AppScreen =
  | "login"
  | "languageSelection"
  | "helpSelection"
  | "onboarding"
  | "dashboard"
  | "havingBabyInfo"
  | "havingBabyDashboard";

function AppScreens() {
  const [screen, setScreen] = useState<AppScreen>("login");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [havingBabyInfo, setHavingBabyInfo] = useState<Record<
    string,
    string
  > | null>(null);

  const handleLogout = () => {
    setScreen("login");
    setUserInfo(null);
    setHavingBabyInfo(null);
  };

  if (screen === "login")
    return <LoginPage onLogin={() => setScreen("languageSelection")} />;
  if (screen === "languageSelection")
    return (
      <LanguageSelectionPage
        onLanguageSelect={(_lang: Language) => setScreen("helpSelection")}
      />
    );
  if (screen === "helpSelection")
    return (
      <HelpSelectionPage
        onSelect={(choice) => {
          if (choice === "pregnancy") setScreen("onboarding");
          else setScreen("havingBabyInfo");
        }}
      />
    );
  if (screen === "onboarding")
    return (
      <PersonalInfoPage
        onComplete={(info) => {
          setUserInfo(info);
          setScreen("dashboard");
        }}
      />
    );
  if (screen === "havingBabyInfo")
    return (
      <HavingBabyInfoPage
        onComplete={(info) => {
          setHavingBabyInfo(info);
          setScreen("havingBabyDashboard");
        }}
      />
    );
  if (screen === "havingBabyDashboard")
    return (
      <HavingBabyDashboard babyInfo={havingBabyInfo} onLogout={handleLogout} />
    );
  return <Dashboard userInfo={userInfo} onLogout={handleLogout} />;
}

export default function App() {
  return (
    <LanguageProvider>
      <AppScreens />
    </LanguageProvider>
  );
}
