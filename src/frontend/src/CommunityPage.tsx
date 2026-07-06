import {
  ArrowLeft,
  Baby,
  BookOpen,
  Clock,
  Heart,
  MessageCircle,
  PenLine,
  Search,
  Send,
  Share2,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

const LOGO = "/assets/mothera-logo.jpeg";

// ─── Avatar Photos ────────────────────────────────────────────────────────────
const AVATARS = [
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
  "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&q=80",
  "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=80&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80",
  "https://images.unsplash.com/photo-1614289371518-722f2615943d?w=80&q=80",
  "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=80&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80",
  "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?w=80&q=80",
];

// ─── Story Cover Photos ───────────────────────────────────────────────────────
const STORY_COVERS = [
  "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80",
  "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&q=80",
  "https://images.unsplash.com/photo-1529454753782-7ccf5ac8a9f0?w=400&q=80",
  "https://images.unsplash.com/photo-1520338801623-05e94e4d5b42?w=400&q=80",
  "https://images.unsplash.com/photo-1610552050890-fe99536c2615?w=400&q=80",
  "https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?w=400&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80",
  "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?w=400&q=80",
  "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80",
  "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&q=80",
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface CommunityMessage {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timeAgo: string;
  likes: number;
  replies: number;
  topic: string;
  isRecent?: boolean;
}

interface Story {
  id: string;
  title: string;
  excerpt: string;
  fullStory: string;
  author: string;
  avatar: string;
  cover: string;
  readTime: string;
  category: string;
  likes: number;
}

// ─── Mothers' Corner Messages ─────────────────────────────────────────────────
const MOTHERS_MESSAGES: CommunityMessage[] = [
  {
    id: "mc1",
    author: "Priya Mehta",
    avatar: AVATARS[0],
    text: "Week 12 and the morning sickness is real 😩 I've been nibbling on dry ginger biscuits every morning before getting out of bed and it actually helps! Anyone else found natural remedies that work?",
    timeAgo: "10 min ago",
    likes: 18,
    replies: 7,
    topic: "First Trimester",
    isRecent: true,
  },
  {
    id: "mc2",
    author: "Anjali Sharma",
    avatar: AVATARS[1],
    text: "My iron levels are low and my doctor recommended adding spinach and lentils. I made a dal with beetroot yesterday and honestly it was delicious! Sharing the recipe if anyone wants 💜",
    timeAgo: "32 min ago",
    likes: 24,
    replies: 12,
    topic: "Nutrition",
    isRecent: true,
  },
  {
    id: "mc3",
    author: "Deepa Krishnan",
    avatar: AVATARS[2],
    text: "Third trimester anxiety hit me hard this week. I keep wondering if I'm ready. My therapist told me that feeling unprepared is actually a sign you're taking it seriously. That helped me breathe a little easier 🧘‍♀️",
    timeAgo: "1h ago",
    likes: 41,
    replies: 15,
    topic: "Mental Health",
  },
  {
    id: "mc4",
    author: "Sunita Rao",
    avatar: AVATARS[3],
    text: "Can we talk about pregnancy insomnia? I'm 32 weeks and sleep has become a distant memory. I switched to a U-shaped pregnancy pillow and it changed my life! Highly recommend for any mamas in the third trimester.",
    timeAgo: "2h ago",
    likes: 35,
    replies: 9,
    topic: "Third Trimester",
  },
  {
    id: "mc5",
    author: "Kavitha Nair",
    avatar: AVATARS[4],
    text: "Had my 28-week scan today and baby is perfectly healthy ☀️ Such a relief after the scare last month. For those going through a high-risk pregnancy — stay strong. Every good news feels like a victory.",
    timeAgo: "3h ago",
    likes: 67,
    replies: 23,
    topic: "Pregnancy Scan",
  },
  {
    id: "mc6",
    author: "Meera Pillai",
    avatar: AVATARS[5],
    text: "Nutrition tip: I was told to eat 300 extra calories per day in the second trimester. I've been adding nut butter to smoothies and it's genuinely yummy. Banana + almond butter + milk = perfect snack 🥜",
    timeAgo: "5h ago",
    likes: 29,
    replies: 6,
    topic: "Nutrition",
  },
  {
    id: "mc7",
    author: "Lakshmi Iyer",
    avatar: AVATARS[6],
    text: "My birth story: I labored for 18 hours and at hour 12 I wanted to give up. My midwife held my hand and said 'you've already done the hardest part.' She was right. Baby Ananya arrived at dawn and it was worth every minute 🌅",
    timeAgo: "1d ago",
    likes: 93,
    replies: 31,
    topic: "Birth Story",
  },
  {
    id: "mc8",
    author: "Divya Suresh",
    avatar: AVATARS[7],
    text: "Is it normal to feel emotional when packing the hospital bag? I cried folding tiny onesies for an hour. My husband thought something was wrong. Turns out I'm just overwhelmed by how real this is becoming 💗",
    timeAgo: "1d ago",
    likes: 55,
    replies: 18,
    topic: "Third Trimester",
  },
];

// ─── Baby World Messages ──────────────────────────────────────────────────────
const BABY_MESSAGES: CommunityMessage[] = [
  {
    id: "bw1",
    author: "Radha Nambiar",
    avatar: AVATARS[8],
    text: "My 4-month-old just said 'mama' for the first time 😭 I know it's just sounds but I'm telling everyone. This is the best day of my life. Motherhood is WILD.",
    timeAgo: "5 min ago",
    likes: 72,
    replies: 28,
    topic: "Milestones",
    isRecent: true,
  },
  {
    id: "bw2",
    author: "Sindhu Venkat",
    avatar: AVATARS[9],
    text: "Sleep training update: Day 4 of the Ferber method. Last night we got a 5-hour stretch. I genuinely thought that wasn't possible for us anymore. There is hope, sleep-deprived mamas! 🌙",
    timeAgo: "45 min ago",
    likes: 48,
    replies: 19,
    topic: "Sleep",
    isRecent: true,
  },
  {
    id: "bw3",
    author: "Priya Mehta",
    avatar: AVATARS[0],
    text: "Breastfeeding schedule question — my 6-week-old feeds every 90 minutes. My pediatrician says it's normal but I feel like I'm living on a sofa. When did yours start stretching feeds? 🍼",
    timeAgo: "1h ago",
    likes: 33,
    replies: 14,
    topic: "Breastfeeding",
  },
  {
    id: "bw4",
    author: "Anjali Sharma",
    avatar: AVATARS[1],
    text: "Starting solids at 6 months felt overwhelming but we did it! Baby's first food was sweet potato purée. The face she made was priceless 😂 We're doing baby-led weaning alongside purees. Happy to share tips!",
    timeAgo: "2h ago",
    likes: 44,
    replies: 17,
    topic: "Solid Foods",
  },
  {
    id: "bw5",
    author: "Kavitha Nair",
    avatar: AVATARS[4],
    text: "Best baby product find: the Haakaa silicone breast pump. I collect milk effortlessly on the other side during feeds. Game changer for building a freezer stash. Someone put this on every registry!",
    timeAgo: "3h ago",
    likes: 61,
    replies: 11,
    topic: "Products",
  },
  {
    id: "bw6",
    author: "Deepa Krishnan",
    avatar: AVATARS[2],
    text: "My 9-month-old pulled herself to standing today 🥹 I ugly-cried for 15 minutes. She looked SO proud of herself. Every milestone feels like watching magic happen in slow motion.",
    timeAgo: "4h ago",
    likes: 88,
    replies: 26,
    topic: "Milestones",
  },
  {
    id: "bw7",
    author: "Meera Pillai",
    avatar: AVATARS[5],
    text: "For new mamas struggling with tummy time — try it on your chest instead of the floor. My baby hated the floor but loved 'snuggle time' on me. Gradually we moved to the floor and now she's happy doing it 🐣",
    timeAgo: "6h ago",
    likes: 52,
    replies: 8,
    topic: "Development",
  },
  {
    id: "bw8",
    author: "Sunita Rao",
    avatar: AVATARS[3],
    text: "Question: when did you introduce a bedtime routine? We started at 8 weeks — bath, massage, feeding, lullaby — and at 4 months our baby actually knows it's sleep time when the bath starts. Routines work! 🛁",
    timeAgo: "1d ago",
    likes: 39,
    replies: 13,
    topic: "Routines",
  },
];

// ─── Stories ──────────────────────────────────────────────────────────────────
const STORY_CATEGORIES = [
  "Birth Story",
  "Pregnancy Journey",
  "Baby Milestones",
  "Breastfeeding Journey",
  "Recovery Journey",
];

const CATEGORY_BADGE_COLORS: Record<
  string,
  { bg: string; text: string; dot: string }
> = {
  "Birth Story": { bg: "#FFE4EC", text: "#C0245C", dot: "#E85C8A" },
  "Pregnancy Journey": { bg: "#EDE3FF", text: "#6B35B5", dot: "#9B59D0" },
  "Baby Milestones": { bg: "#E3F5E8", text: "#27744A", dot: "#4CAF50" },
  "Breastfeeding Journey": { bg: "#FFF3E0", text: "#B45309", dot: "#F59E0B" },
  "Recovery Journey": { bg: "#E0F2FE", text: "#0369A1", dot: "#38BDF8" },
};

const INITIAL_STORIES: Story[] = [
  {
    id: "s1",
    title: "My Journey Through a High-Risk Pregnancy",
    excerpt:
      "When I found out I was pregnant at 35, I was overjoyed but nervous. My doctor classified me as high-risk, which sent me into a spiral of anxiety...",
    fullStory:
      "When I found out I was pregnant at 35, I was overjoyed but nervous. My doctor classified me as high-risk, which sent me into a spiral of anxiety. But month by month, with regular monitoring and incredible support from my care team, I learned to trust the process. I tracked every kick, attended every appointment, and found a wonderful online community of women in similar situations. My daughter Ananya was born healthy at 38 weeks via C-section, and holding her for the first time made every difficult moment worthwhile. To every high-risk mama out there — you are stronger than you know. Your body is doing something extraordinary. Trust it. 💜",
    author: "Lakshmi Iyer",
    avatar: AVATARS[6],
    cover: STORY_COVERS[0],
    readTime: "3 min read",
    category: "Pregnancy Journey",
    likes: 87,
  },
  {
    id: "s2",
    title: "The Most Unexpected Birth Story",
    excerpt:
      "At 36 weeks, I woke up at 2am with a feeling I couldn't quite describe. My husband thought I was overreacting, but something told me it was time...",
    fullStory:
      "At 36 weeks, I woke up at 2am with a feeling I couldn't quite describe — not contractions, just a certainty. We rushed to the hospital in the dark with our half-packed bag and three hours later, little Aarav entered the world, small but fierce at 5.4 lbs. The NICU days were the hardest of my life. I'd sit beside his incubator for hours, talking to him, playing soft music, doing kangaroo care. Watching him gain weight gram by gram was the most suspenseful story I've ever lived. He's now a healthy two-year-old who runs faster than both of us. Prematurity doesn't define the journey — love does.",
    author: "Divya Suresh",
    avatar: AVATARS[7],
    cover: STORY_COVERS[1],
    readTime: "5 min read",
    category: "Birth Story",
    likes: 112,
  },
  {
    id: "s3",
    title: "How Prenatal Yoga Changed My Pregnancy",
    excerpt:
      "I was skeptical about yoga at first. As someone who had never practiced, the idea of stretching in a room full of glowing pregnant women felt intimidating...",
    fullStory:
      "I was skeptical about yoga at first. As someone who had never practiced it, the idea felt intimidating. But my midwife insisted and by week 20 I was hooked. Prenatal yoga didn't just help with back pain — it gave me a community, a sense of calm, and a deep connection with my growing baby. I'd talk to her during Shavasana. I could swear she responded with kicks. My birth experience was three hours shorter than my first and significantly less traumatic. The breathing techniques I learned in class carried me through transition. I'm convinced yoga played a huge role.",
    author: "Meera Pillai",
    avatar: AVATARS[5],
    cover: STORY_COVERS[2],
    readTime: "4 min read",
    category: "Pregnancy Journey",
    likes: 64,
  },
  {
    id: "s4",
    title: "Finding My Village in a New City",
    excerpt:
      "Moving to a new city while pregnant was not something I planned for. I knew nobody, and my family was thousands of miles away...",
    fullStory:
      "Moving to Chennai at 20 weeks pregnant — knowing nobody, family thousands of miles away — was the loneliest I've ever felt. I found a local mothers' Facebook group out of desperation. I posted asking if anyone wanted to walk together on weekends. One woman replied. Then three. Then twelve. By the time my daughter was born, I had six women in my delivery waiting room who'd known me for only four months but felt like lifelong friends. They brought meals for two weeks, held my newborn so I could shower, celebrated every milestone. Motherhood isn't meant to be done alone. Find your village wherever you are — it exists, even in new places.",
    author: "Radha Nambiar",
    avatar: AVATARS[8],
    cover: STORY_COVERS[3],
    readTime: "4 min read",
    category: "Recovery Journey",
    likes: 95,
  },
  {
    id: "s5",
    title: "Breastfeeding Wasn't What I Expected",
    excerpt:
      "Nobody told me breastfeeding could be this hard. I had read every book, attended every class, and still felt completely unprepared when my daughter wouldn't latch...",
    fullStory:
      "Nobody told me breastfeeding could be this hard. I'd read every book, attended classes, watched YouTube videos. And still, when my daughter wouldn't latch properly in those first 48 hours, I felt like a complete failure. A lactation consultant changed everything. She sat with us for two hours, tried six different positions, showed me how to break the latch and try again without panic. By week three, we had it. By week six, it was second nature. If you're struggling — please reach out to a lactation consultant. It's not a luxury; it's a clinical resource. You are not failing. You are learning something that nobody is born knowing.",
    author: "Sindhu Venkat",
    avatar: AVATARS[9],
    cover: STORY_COVERS[4],
    readTime: "4 min read",
    category: "Breastfeeding Journey",
    likes: 78,
  },
  {
    id: "s6",
    title: "My Baby's First Year in Milestones",
    excerpt:
      "I started journaling every milestone when my son was born — first smile, first laugh, first roll. Looking back now, I'm so glad I captured these moments...",
    fullStory:
      "I started journaling every milestone when Kiran was born: first smile at 6 weeks (I may have imagined it but I'm counting it), first real laugh at 3 months that made the whole room stop, first roll at 4 months that terrified me, first solid food face at 6 months that made me ugly-cry. His first steps at 11 months — he fell, looked up at me with total confidence, and tried again immediately. I've learned more about courage from watching my baby learn to walk than from any book I've ever read. Document everything, mothers. One day you'll re-read those notes and your heart will shatter beautifully.",
    author: "Kavitha Nair",
    avatar: AVATARS[4],
    cover: STORY_COVERS[5],
    readTime: "5 min read",
    category: "Baby Milestones",
    likes: 101,
  },
  {
    id: "s7",
    title: "The Truth About Postpartum Recovery",
    excerpt:
      "Everyone talks about the baby. Barely anyone talks about what happens to your body and mind in the weeks after birth. I wish someone had prepared me...",
    fullStory:
      "Everyone talks about the baby. Barely anyone talks about what happens to your body and mind after birth. The first two weeks were the hardest of my life — not because of the baby, but because of me. Night sweats, hair falling out, a body I didn't recognize, emotions that swung wildly every hour. I cried in the shower every day for a week. My husband learned quickly that 'you look tired' was not an acceptable thing to say. What helped: accepting help without guilt, lowering every expectation, and a postpartum support group where other women said 'me too' in real time. Recovery is real. Take it seriously. You are not just a vessel for the baby — you matter too.",
    author: "Priya Mehta",
    avatar: AVATARS[0],
    cover: STORY_COVERS[6],
    readTime: "6 min read",
    category: "Recovery Journey",
    likes: 134,
  },
  {
    id: "s8",
    title: "Emergency C-Section: What Nobody Tells You",
    excerpt:
      "I had planned a natural birth. The birth plan was detailed and laminated. Then at 9 cm dilated, everything changed in under two minutes...",
    fullStory:
      "I had planned a natural birth. The birth plan was detailed and laminated. Then at 9 cm dilated, baby's heart rate dropped and everything changed in under two minutes. Cold operating table, bright lights, a curtain across my chest. My husband held my hand and didn't let go. My son was born healthy 11 minutes later. For months I grieved the birth I didn't get. A counselor helped me see that the birth plan was about the outcome — a healthy baby — and that outcome was achieved. The method was not the story. My son is three now and he has never once cared how he arrived. The grief was real and valid. So is the gratitude.",
    author: "Anjali Sharma",
    avatar: AVATARS[1],
    cover: STORY_COVERS[7],
    readTime: "5 min read",
    category: "Birth Story",
    likes: 119,
  },
  {
    id: "s9",
    title: "How Extended Breastfeeding Surprised Me",
    excerpt:
      "I said I'd nurse for six months. Then a year. Now my daughter is 18 months and we're still going. I never imagined this would become our story...",
    fullStory:
      "I said I'd nurse for six months. That felt ambitious and reasonable. Then six months came and we were thriving, so I said one year. One year came and stopping felt sudden and wrong for both of us. My daughter is 18 months and we nurse once in the morning. It's become our quiet ritual — five minutes of closeness before the day begins. Extended breastfeeding is still surrounded by stigma and I've heard opinions from strangers, relatives, even a doctor. What I've learned: this is a relationship between me and my child. Evidence supports it. My pediatrician supports it. My daughter tells me it makes her feel safe. That's enough.",
    author: "Deepa Krishnan",
    avatar: AVATARS[2],
    cover: STORY_COVERS[8],
    readTime: "4 min read",
    category: "Breastfeeding Journey",
    likes: 83,
  },
  {
    id: "s10",
    title: "Second Pregnancy After Miscarriage",
    excerpt:
      "After losing my first pregnancy at 10 weeks, I was terrified to try again. Every scan was a moment of held breath. Every milestone felt unreal...",
    fullStory:
      "After losing my first pregnancy at 10 weeks, I was terrified to try again. When I became pregnant six months later, joy was tangled with fear in ways I couldn't separate. Every scan was a moment of held breath. I asked for extra monitoring. I carried the scan photos everywhere. At 20 weeks, when the sonographer said 'everything looks perfect,' I cried so hard she handed me tissues. At 40 weeks, my daughter Priya was born, healthy and loud and furious about leaving the womb. Pregnancy after loss is one of the most quietly courageous things a person can do. If you're on that road — I see you. Your grief and your hope can coexist.",
    author: "Sunita Rao",
    avatar: AVATARS[3],
    cover: STORY_COVERS[9],
    readTime: "5 min read",
    category: "Pregnancy Journey",
    likes: 147,
  },
];

// ─── Props ────────────────────────────────────────────────────────────────────
interface CommunityPageProps {
  onBack: () => void;
}

// ─── Topic Badge Component ────────────────────────────────────────────────────
function TopicBadge({
  topic,
  channel,
}: { topic: string; channel: "mothers" | "baby" }) {
  const motherTopicColors: Record<string, { bg: string; text: string }> = {
    "First Trimester": { bg: "#F0E6FF", text: "#7B3FA0" },
    Nutrition: { bg: "#FFF0F9", text: "#B5006E" },
    "Mental Health": { bg: "#EDE3FF", text: "#5A2D7A" },
    "Third Trimester": { bg: "#F8E6FF", text: "#8B2FA0" },
    "Pregnancy Scan": { bg: "#F3E8FF", text: "#6B35B5" },
    "Birth Story": { bg: "#FFE4EC", text: "#C0245C" },
  };
  const babyTopicColors: Record<string, { bg: string; text: string }> = {
    Milestones: { bg: "#E8F5E9", text: "#2E7D32" },
    Sleep: { bg: "#E3F2FD", text: "#1565C0" },
    Breastfeeding: { bg: "#FFF3E0", text: "#E65100" },
    "Solid Foods": { bg: "#F9FBE7", text: "#558B2F" },
    Products: { bg: "#FCE4EC", text: "#AD1457" },
    Development: { bg: "#E0F7FA", text: "#00838F" },
    Routines: { bg: "#EDE7F6", text: "#4527A0" },
  };
  const colorMap = channel === "mothers" ? motherTopicColors : babyTopicColors;
  const color = colorMap[topic] ?? { bg: "#F3E8FF", text: "#6B35B5" };
  return (
    <span
      className="text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
      style={{ background: color.bg, color: color.text }}
    >
      {topic}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CommunityPage({ onBack }: CommunityPageProps) {
  const [tab, setTab] = useState<"mothers" | "baby" | "stories">("mothers");
  const [searchQuery, setSearchQuery] = useState("");

  // Community chat state
  const [motherMessages, setMotherMessages] =
    useState<CommunityMessage[]>(MOTHERS_MESSAGES);
  const [babyMessages, setBabyMessages] =
    useState<CommunityMessage[]>(BABY_MESSAGES);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const [motherInput, setMotherInput] = useState("");
  const [babyInput, setBabyInput] = useState("");

  // Stories state
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());
  const [expandedStory, setExpandedStory] = useState<string | null>(null);
  const [showShareStory, setShowShareStory] = useState(false);
  const [storyForm, setStoryForm] = useState({
    title: "",
    content: "",
    category: "Birth Story",
  });

  const motherInputRef = useRef<HTMLInputElement | null>(null);
  const babyInputRef = useRef<HTMLInputElement | null>(null);

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const sendMessage = (channel: "mothers" | "baby") => {
    const text = channel === "mothers" ? motherInput.trim() : babyInput.trim();
    if (!text) return;
    const msg: CommunityMessage = {
      id: `user-${Date.now()}`,
      author: "You",
      avatar: AVATARS[0],
      text,
      timeAgo: "Just now",
      likes: 0,
      replies: 0,
      topic: channel === "mothers" ? "General" : "General",
      isRecent: true,
    };
    if (channel === "mothers") {
      setMotherMessages((prev) => [msg, ...prev]);
      setMotherInput("");
      motherInputRef.current?.focus();
    } else {
      setBabyMessages((prev) => [msg, ...prev]);
      setBabyInput("");
      babyInputRef.current?.focus();
    }
  };

  const togglePostLike = (msgId: string, channel: "mothers" | "baby") => {
    const setter = channel === "mothers" ? setMotherMessages : setBabyMessages;
    const isLiked = likedPosts.has(msgId);
    setLikedPosts((prev) => {
      const next = new Set(prev);
      isLiked ? next.delete(msgId) : next.add(msgId);
      return next;
    });
    setter((prev) =>
      prev.map((m) =>
        m.id === msgId ? { ...m, likes: m.likes + (isLiked ? -1 : 1) } : m,
      ),
    );
  };

  const toggleStoryLike = (storyId: string) => {
    const isLiked = likedStories.has(storyId);
    setLikedStories((prev) => {
      const next = new Set(prev);
      isLiked ? next.delete(storyId) : next.add(storyId);
      return next;
    });
    setStories((prev) =>
      prev.map((s) =>
        s.id === storyId ? { ...s, likes: s.likes + (isLiked ? -1 : 1) } : s,
      ),
    );
  };

  const submitStory = () => {
    if (!storyForm.title.trim() || !storyForm.content.trim()) return;
    const newStory: Story = {
      id: `us-${Date.now()}`,
      title: storyForm.title,
      excerpt: `${storyForm.content.slice(0, 120)}...`,
      fullStory: storyForm.content,
      author: "You",
      avatar: AVATARS[0],
      cover: STORY_COVERS[0],
      readTime: `${Math.max(1, Math.ceil(storyForm.content.split(" ").length / 200))} min read`,
      category: storyForm.category,
      likes: 0,
    };
    setStories((prev) => [newStory, ...prev]);
    setStoryForm({ title: "", content: "", category: "Birth Story" });
    setShowShareStory(false);
  };

  // ─── Message Feed ─────────────────────────────────────────────────────────
  const renderMessageFeed = (
    messages: CommunityMessage[],
    channel: "mothers" | "baby",
    inputValue: string,
    setInput: (v: string) => void,
    inputRef: React.RefObject<HTMLInputElement | null>,
  ) => {
    const filtered = searchQuery.trim()
      ? messages.filter(
          (m) =>
            m.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.topic.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : messages;

    return (
      <div className="flex flex-col">
        {/* Channel description banner */}
        <div
          className="rounded-2xl p-4 mb-4 flex items-start gap-3"
          style={{
            background:
              channel === "mothers"
                ? "linear-gradient(135deg, #F5EEFF 0%, #FDE8F4 100%)"
                : "linear-gradient(135deg, #E8F8EE 0%, #E3F5FD 100%)",
            border: `1px solid ${channel === "mothers" ? "rgba(123,63,160,0.12)" : "rgba(46,125,50,0.12)"}`,
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl"
            style={{
              background:
                channel === "mothers"
                  ? "linear-gradient(135deg, rgba(123,63,160,0.15), rgba(192,112,208,0.15))"
                  : "linear-gradient(135deg, rgba(76,175,80,0.15), rgba(33,150,243,0.15))",
            }}
          >
            {channel === "mothers" ? "💜" : "🍼"}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="font-bold text-sm"
              style={{ color: channel === "mothers" ? "#5A2D7A" : "#1B5E20" }}
            >
              {channel === "mothers" ? "Mothers' Corner" : "Baby World"}
            </p>
            <p
              className="text-xs leading-relaxed mt-0.5"
              style={{ color: channel === "mothers" ? "#8E5C9F" : "#388E3C" }}
            >
              {channel === "mothers"
                ? "Pregnancy tips, maternal health, emotions, nutrition & birth stories — a safe space for you."
                : "Baby care, feeding schedules, milestones, sleep training & product finds for your little one."}
            </p>
          </div>
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0"
            style={{
              background:
                channel === "mothers"
                  ? "rgba(123,63,160,0.1)"
                  : "rgba(46,125,50,0.1)",
              color: channel === "mothers" ? "#7B3FA0" : "#2E7D32",
            }}
          >
            <TrendingUp size={10} />
            Active
          </div>
        </div>

        {/* Feed cards */}
        <div className="space-y-3 pb-32">
          {filtered.length === 0 ? (
            <div className="empty-state py-16">
              <div className="empty-state-icon">
                <Search size={24} />
              </div>
              <p className="font-semibold text-sm" style={{ color: "#5A2D7A" }}>
                No posts match your search
              </p>
              <p className="text-xs mt-1" style={{ color: "#B090C0" }}>
                Try a different keyword
              </p>
            </div>
          ) : (
            filtered.map((msg, idx) => (
              <div
                key={msg.id}
                className="bg-white rounded-2xl overflow-hidden animate-fade-in"
                style={{
                  border: "1px solid rgba(142,92,159,0.1)",
                  boxShadow: "0 2px 12px rgba(142,92,159,0.07)",
                  animationDelay: `${idx * 50}ms`,
                  animationFillMode: "backwards",
                  transition: "box-shadow 0.25s ease, transform 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 8px 24px rgba(142,92,159,0.14)";
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 2px 12px rgba(142,92,159,0.07)";
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(0)";
                }}
                data-ocid="community.message_card"
              >
                {/* Recent indicator stripe */}
                {msg.isRecent && (
                  <div
                    className="h-0.5 w-full"
                    style={{
                      background:
                        channel === "mothers"
                          ? "linear-gradient(90deg, #8E5C9F, #C070D0)"
                          : "linear-gradient(90deg, #4CAF50, #66BB6A)",
                    }}
                  />
                )}

                <div className="p-4">
                  {/* Header row */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative shrink-0">
                      <img
                        src={msg.avatar}
                        alt={msg.author}
                        className="w-10 h-10 rounded-full object-cover"
                        style={{
                          border: "2px solid",
                          borderColor:
                            channel === "mothers"
                              ? "rgba(123,63,160,0.25)"
                              : "rgba(76,175,80,0.25)",
                          boxShadow:
                            channel === "mothers"
                              ? "0 0 0 2px rgba(192,112,208,0.15)"
                              : "0 0 0 2px rgba(76,175,80,0.15)",
                        }}
                      />
                      {msg.isRecent && (
                        <span
                          className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
                          style={{
                            background:
                              channel === "mothers" ? "#A855F7" : "#4CAF50",
                          }}
                          aria-label="Recent post"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="font-bold text-sm"
                          style={{ color: "#2D1B4E" }}
                        >
                          {msg.author}
                        </span>
                        <TopicBadge topic={msg.topic} channel={channel} />
                      </div>
                      <span
                        className="text-xs mt-0.5 block"
                        style={{ color: "#C0A8D0" }}
                      >
                        {msg.timeAgo}
                      </span>
                    </div>
                  </div>

                  {/* Message body */}
                  <p
                    className="text-sm leading-relaxed clamp-3 mb-3"
                    style={{ color: "#4A3558" }}
                  >
                    {msg.text}
                  </p>

                  {/* Divider */}
                  <div
                    className="h-px mb-3"
                    style={{ background: "rgba(142,92,159,0.08)" }}
                  />

                  {/* Footer actions */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => togglePostLike(msg.id, channel)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                      style={{
                        background: likedPosts.has(msg.id)
                          ? "rgba(192,36,92,0.1)"
                          : "rgba(142,92,159,0.06)",
                        color: likedPosts.has(msg.id) ? "#C0245C" : "#B090C0",
                      }}
                      aria-pressed={likedPosts.has(msg.id)}
                      aria-label={`Like message by ${msg.author}`}
                      data-ocid="community.post_like_button"
                    >
                      <Heart
                        size={13}
                        fill={likedPosts.has(msg.id) ? "#C0245C" : "none"}
                        strokeWidth={likedPosts.has(msg.id) ? 0 : 2}
                        className={
                          likedPosts.has(msg.id) ? "animate-scale-in" : ""
                        }
                      />
                      <span>{msg.likes}</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                      style={{
                        background: "rgba(142,92,159,0.06)",
                        color: "#B090C0",
                      }}
                      aria-label="Reply to message"
                      data-ocid="community.post_reply_button"
                    >
                      <MessageCircle size={13} strokeWidth={2} />
                      <span>{msg.replies}</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ml-auto"
                      style={{
                        background: "rgba(142,92,159,0.06)",
                        color: "#B090C0",
                      }}
                      aria-label="Share message"
                      data-ocid="community.post_share_button"
                    >
                      <Share2 size={13} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Compose bar — sticky above bottom nav */}
        <div
          className="fixed bottom-16 left-0 right-0 px-4 py-2 z-30"
          style={{
            background:
              "linear-gradient(to top, rgba(253,246,255,1) 70%, rgba(253,246,255,0))",
          }}
        >
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-2xl"
            style={{
              background: "white",
              border: "1.5px solid rgba(123,63,160,0.2)",
              boxShadow:
                "0 4px 20px rgba(123,63,160,0.12), 0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <img
              src={AVATARS[0]}
              alt="You"
              className="w-8 h-8 rounded-full object-cover shrink-0"
              style={{ border: "2px solid rgba(123,63,160,0.2)" }}
            />
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage(channel);
              }}
              placeholder={
                channel === "mothers"
                  ? "Share with Mothers' Corner…"
                  : "Share in Baby World…"
              }
              className="flex-1 text-sm outline-none bg-transparent min-w-0"
              style={{ color: "#5A2D7A" }}
              data-ocid={`community.${channel}_message_input`}
            />
            <button
              type="button"
              onClick={() => sendMessage(channel)}
              disabled={!inputValue.trim()}
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all"
              style={{
                background: inputValue.trim()
                  ? "linear-gradient(135deg, #8E5C9F, #C070D0)"
                  : "rgba(142,92,159,0.12)",
                boxShadow: inputValue.trim()
                  ? "0 3px 10px rgba(142,92,159,0.35)"
                  : "none",
                transform: inputValue.trim() ? "scale(1)" : "scale(0.95)",
              }}
              aria-label="Send message"
              data-ocid={`community.${channel}_send_button`}
            >
              <Send
                size={14}
                color={inputValue.trim() ? "white" : "#B090C0"}
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ─── Stories Section ─────────────────────────────────────────────────────
  const renderStories = () => (
    <div className="space-y-6 pb-10">
      {/* Share CTA */}
      <button
        type="button"
        onClick={() => setShowShareStory(true)}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all"
        style={{
          background: "linear-gradient(135deg, #8E5C9F 0%, #C070D0 100%)",
          color: "white",
          boxShadow: "0 4px 18px rgba(142,92,159,0.35)",
        }}
        data-ocid="community.share_story_button"
      >
        <PenLine size={16} />
        Share Your Story with the Community
      </button>

      {/* Section heading */}
      <div className="section-header">
        <div>
          <p className="section-title flex items-center gap-2">
            <BookOpen
              size={18}
              className="inline"
              style={{ color: "#8E5C9F" }}
            />
            Stories from Mothers
          </p>
          <p className="section-subtitle">Real journeys from women like you</p>
        </div>
      </div>

      {/* Horizontal story scroll — magazine feel */}
      <div className="-mx-4">
        <div
          className="flex gap-4 overflow-x-auto px-4 py-2 hide-scrollbar"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {stories.slice(0, 6).map((story) => {
            const badge = CATEGORY_BADGE_COLORS[story.category] ?? {
              bg: "#EDE3FF",
              text: "#6B35B5",
              dot: "#9B59D0",
            };
            return (
              <div
                key={`scroll-${story.id}`}
                className="flex-none rounded-2xl overflow-hidden bg-white"
                style={{
                  width: "260px",
                  scrollSnapAlign: "start",
                  border: "1px solid rgba(142,92,159,0.1)",
                  boxShadow: "0 4px 16px rgba(142,92,159,0.1)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-3px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 10px 28px rgba(142,92,159,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 4px 16px rgba(142,92,159,0.1)";
                }}
                data-ocid="community.story_scroll_card"
              >
                {/* Cover */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={story.cover}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(20,5,40,0.65))",
                    }}
                  />
                  <span
                    className="absolute top-2.5 left-2.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: badge.bg, color: badge.text }}
                  >
                    {story.category}
                  </span>
                  <div className="absolute bottom-2.5 left-3 right-3">
                    <p className="text-white font-bold text-sm line-clamp-2 leading-tight">
                      {story.title}
                    </p>
                  </div>
                </div>
                {/* Footer */}
                <div className="p-3 flex items-center gap-2">
                  <img
                    src={story.avatar}
                    alt={story.author}
                    className="w-7 h-7 rounded-full object-cover shrink-0"
                    style={{ border: "2px solid rgba(142,92,159,0.2)" }}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs font-semibold truncate"
                      style={{ color: "#5A2D7A" }}
                    >
                      {story.author}
                    </p>
                  </div>
                  <span
                    className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full shrink-0"
                    style={{
                      background: "rgba(142,92,159,0.08)",
                      color: "#9E7AB5",
                    }}
                  >
                    <Clock size={9} />
                    {story.readTime}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full story list */}
      <div className="space-y-4">
        {stories.map((story) => {
          const badge = CATEGORY_BADGE_COLORS[story.category] ?? {
            bg: "#EDE3FF",
            text: "#6B35B5",
            dot: "#9B59D0",
          };
          const isLiked = likedStories.has(story.id);
          return (
            <div
              key={story.id}
              className="bg-white rounded-2xl overflow-hidden card-hover"
              style={{
                border: "1px solid rgba(142,92,159,0.1)",
                boxShadow: "0 2px 10px rgba(142,92,159,0.07)",
              }}
              data-ocid="community.story_card"
            >
              {/* Cover image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={story.cover}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 35%, rgba(20,5,40,0.6))",
                  }}
                />
                {/* Category badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: badge.bg, color: badge.text }}
                  >
                    {story.category}
                  </span>
                </div>
                {/* Author overlay */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2">
                  <img
                    src={story.avatar}
                    alt={story.author}
                    className="w-7 h-7 rounded-full object-cover border-2 border-white shrink-0"
                  />
                  <span className="text-white text-xs font-semibold truncate">
                    {story.author}
                  </span>
                  <span
                    className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ml-auto shrink-0"
                    style={{
                      background: "rgba(255,255,255,0.25)",
                      color: "white",
                    }}
                  >
                    <Clock size={9} />
                    {story.readTime}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3
                  className="font-bold text-base leading-snug mb-2"
                  style={{ color: "#1F1033" }}
                >
                  {story.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-3"
                  style={{ color: "#6B5A7B" }}
                >
                  {expandedStory === story.id ? story.fullStory : story.excerpt}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedStory(
                        expandedStory === story.id ? null : story.id,
                      )
                    }
                    className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
                    style={{ color: "#8E5C9F" }}
                    data-ocid="community.read_more_button"
                  >
                    <BookOpen size={12} />
                    {expandedStory === story.id
                      ? "Show less"
                      : "Read full story"}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="flex items-center gap-1 text-xs font-medium transition-all"
                      style={{ color: "#B090C0" }}
                      aria-label="Share story"
                    >
                      <Share2 size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleStoryLike(story.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                      style={{
                        background: isLiked
                          ? "rgba(192,36,92,0.1)"
                          : "rgba(142,92,159,0.08)",
                        color: isLiked ? "#C0245C" : "#B090C0",
                      }}
                      aria-pressed={isLiked}
                      data-ocid="community.story_like_button"
                    >
                      <Heart
                        size={12}
                        fill={isLiked ? "#C0245C" : "none"}
                        strokeWidth={isLiked ? 0 : 2}
                        className={isLiked ? "animate-heartbeat" : ""}
                      />
                      {story.likes}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(160deg, #FBF5FF 0%, #FFF8FD 50%, #F8F0FF 100%)",
      }}
    >
      {/* ── Hero Header ── */}
      <div
        className="sticky top-0 z-40"
        style={{
          background:
            "linear-gradient(135deg, #6B23A0 0%, #9B3FC0 50%, #C070D0 100%)",
          boxShadow: "0 4px 24px rgba(107,35,160,0.4)",
        }}
      >
        {/* Decorative shimmer overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 80% -10%, rgba(255,255,255,0.18) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />

        {/* Top row */}
        <div className="relative flex items-center gap-3 px-4 pt-3.5 pb-2">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all"
            style={{
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
            }}
            aria-label="Go back"
            data-ocid="community.back_button"
          >
            <ArrowLeft size={18} color="white" />
          </button>
          <img
            src={LOGO}
            alt="Mothera"
            className="w-8 h-8 rounded-full object-cover shrink-0"
            style={{ border: "2px solid rgba(255,255,255,0.45)" }}
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-bold text-base leading-tight">
              Community
            </h1>
            <p
              className="text-xs leading-tight"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Connect with mothers like you
            </p>
          </div>
          {/* Online badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full shrink-0"
            style={{
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                background: "#4ADE80",
                boxShadow: "0 0 6px rgba(74,222,128,0.9)",
              }}
              aria-hidden="true"
            />
            <Users size={12} color="white" />
            <span className="text-white text-xs font-bold">2,841</span>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative flex items-center gap-3 px-5 py-1.5">
          {[
            { icon: <Sparkles size={11} />, label: "4 posts today" },
            { icon: <TrendingUp size={11} />, label: "12 active" },
            { icon: <Heart size={11} />, label: "Supportive" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1 text-xs font-medium"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              {icon}
              {label}
            </div>
          ))}
        </div>

        {/* Search bar */}
        <div className="relative px-4 pb-2.5">
          <div
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.25)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Search size={14} color="rgba(255,255,255,0.7)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts, topics, members…"
              className="flex-1 text-xs outline-none bg-transparent"
              style={{ color: "white" }}
              data-ocid="community.search_input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X size={12} color="rgba(255,255,255,0.7)" />
              </button>
            )}
          </div>
        </div>

        {/* Tab row */}
        <div className="relative flex px-4 pb-3 gap-2">
          {(
            [
              {
                key: "mothers",
                label: "Mothers' Corner",
                icon: "💜",
                count: motherMessages.length,
              },
              {
                key: "baby",
                label: "Baby World",
                icon: "🍼",
                count: babyMessages.length,
              },
              {
                key: "stories",
                label: "Stories",
                icon: "📖",
                count: stories.length,
              },
            ] as const
          ).map(({ key, label, icon, count }) => (
            <button
              type="button"
              key={key}
              onClick={() => setTab(key)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: tab === key ? "white" : "rgba(255,255,255,0.15)",
                color: tab === key ? "#7B3FA0" : "rgba(255,255,255,0.9)",
                boxShadow: tab === key ? "0 3px 10px rgba(0,0,0,0.18)" : "none",
                transform: tab === key ? "scale(1.03)" : "scale(1)",
              }}
              data-ocid={`community.tab_${key}`}
              aria-pressed={tab === key}
            >
              <span aria-hidden="true">{icon}</span>
              {label}
              <span
                className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                style={{
                  background:
                    tab === key
                      ? "rgba(123,63,160,0.12)"
                      : "rgba(255,255,255,0.2)",
                  color: tab === key ? "#7B3FA0" : "rgba(255,255,255,0.85)",
                  fontSize: "10px",
                }}
              >
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-2xl mx-auto px-4 pt-4">
        {tab === "mothers" &&
          renderMessageFeed(
            motherMessages,
            "mothers",
            motherInput,
            setMotherInput,
            motherInputRef,
          )}
        {tab === "baby" &&
          renderMessageFeed(
            babyMessages,
            "baby",
            babyInput,
            setBabyInput,
            babyInputRef,
          )}
        {tab === "stories" && renderStories()}
      </div>

      {/* ── Share Story Modal ── */}
      {showShareStory && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
          style={{
            background: "rgba(10,0,30,0.6)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setShowShareStory(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setShowShareStory(false);
          }}
          role="presentation"
        >
          <dialog
            open
            className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl border-0 animate-slide-up overflow-hidden"
            style={{
              background: "white",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            aria-label="Share your story"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            data-ocid="community.share_story_modal"
          >
            {/* Modal header */}
            <div
              className="px-6 pt-6 pb-5 flex items-center justify-between"
              style={{
                background: "linear-gradient(135deg, #F5EEFF 0%, #FDE8F4 100%)",
                borderBottom: "1px solid rgba(142,92,159,0.12)",
              }}
            >
              <div>
                <h2 className="font-bold text-lg" style={{ color: "#5A2D7A" }}>
                  Share Your Story
                </h2>
                <p className="text-xs mt-0.5" style={{ color: "#9E7AB5" }}>
                  Inspire and support mothers on the same journey
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowShareStory(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{ background: "rgba(142,92,159,0.1)" }}
                aria-label="Close"
                data-ocid="community.close_story_modal"
              >
                <X size={16} color="#8E5C9F" />
              </button>
            </div>

            {/* Form */}
            <div className="px-6 py-5 space-y-4">
              <div>
                <label
                  htmlFor="story-title"
                  className="text-xs font-bold block mb-1.5"
                  style={{ color: "#8E5C9F" }}
                >
                  Story Title
                </label>
                <input
                  id="story-title"
                  type="text"
                  placeholder="Give your story a meaningful title"
                  value={storyForm.title}
                  onChange={(e) =>
                    setStoryForm((f) => ({ ...f, title: e.target.value }))
                  }
                  className="input-field"
                  data-ocid="community.story_title_input"
                />
              </div>
              <div>
                <label
                  htmlFor="story-category"
                  className="text-xs font-bold block mb-1.5"
                  style={{ color: "#8E5C9F" }}
                >
                  Category
                </label>
                <select
                  id="story-category"
                  value={storyForm.category}
                  onChange={(e) =>
                    setStoryForm((f) => ({ ...f, category: e.target.value }))
                  }
                  className="input-field"
                  data-ocid="community.story_category_select"
                >
                  {STORY_CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="story-content"
                  className="text-xs font-bold block mb-1.5"
                  style={{ color: "#8E5C9F" }}
                >
                  Your Story
                </label>
                <textarea
                  id="story-content"
                  placeholder="Share your experience, what you learned, and what you'd tell other mothers…"
                  value={storyForm.content}
                  onChange={(e) =>
                    setStoryForm((f) => ({ ...f, content: e.target.value }))
                  }
                  rows={6}
                  className="input-field resize-none"
                  style={{ lineHeight: "1.6" }}
                  data-ocid="community.story_content_input"
                />
              </div>
              <button
                type="button"
                onClick={submitStory}
                disabled={!storyForm.title.trim() || !storyForm.content.trim()}
                className="btn-primary w-full py-3.5 justify-center"
                style={{
                  opacity:
                    storyForm.title.trim() && storyForm.content.trim()
                      ? 1
                      : 0.5,
                  cursor:
                    storyForm.title.trim() && storyForm.content.trim()
                      ? "pointer"
                      : "not-allowed",
                }}
                data-ocid="community.submit_story_button"
              >
                <PenLine size={15} />
                Publish Your Story
              </button>
            </div>
          </dialog>
        </div>
      )}

      {/* Baby World accent FAB */}
      {tab === "baby" && (
        <div
          className="fixed bottom-20 right-4 w-11 h-11 rounded-full flex items-center justify-center pointer-events-none animate-float-soft"
          style={{
            background: "linear-gradient(135deg, #4CAF50, #81C784)",
            boxShadow: "0 4px 16px rgba(76,175,80,0.45)",
          }}
          aria-hidden="true"
        >
          <Baby size={19} color="white" />
        </div>
      )}
    </div>
  );
}
