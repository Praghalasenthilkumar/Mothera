import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Clock,
  GraduationCap,
  Play,
  Star,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import type { UserInfo } from "./PersonalInfoPage";

const LOGO = "/assets/mothera-logo.jpeg";

interface ClassItem {
  id: string;
  title: string;
  instructor: string;
  credentials: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  photo: string;
  instructorPhoto: string;
  category: string;
  videoId: string;
  enrolled: string;
  rating: number;
  popular?: boolean;
}

const CLASSES: ClassItem[] = [
  // ── Exercises ──────────────────────────────────────────────────────────────
  {
    id: "c1",
    title: "Prenatal Core Strength",
    instructor: "Sarah Johnson",
    credentials: "Certified Prenatal Fitness Trainer",
    duration: "45 min",
    level: "Beginner",
    description:
      "Safe core exercises designed to support your growing bump and reduce back pain throughout pregnancy. Each move is adapted to protect your pelvic floor and joints.",
    photo:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    category: "Exercises",
    videoId: "dFO8GBs4UQg",
    enrolled: "2,340",
    rating: 4.9,
    popular: true,
  },
  {
    id: "c2",
    title: "Low-Impact Cardio for Moms",
    instructor: "Dr. Priya Nair",
    credentials: "Women's Health Physiotherapist",
    duration: "40 min",
    level: "Beginner",
    description:
      "Heart-healthy cardio routines that keep you energised without over-stressing your joints. Suitable for all three trimesters with safe progressions.",
    photo:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    category: "Exercises",
    videoId: "Nrm8qvfMqIE",
    enrolled: "1,870",
    rating: 4.7,
  },
  {
    id: "c3",
    title: "Strength Training in Pregnancy",
    instructor: "Tanya Richards",
    credentials: "NSCA Certified Strength Coach",
    duration: "60 min",
    level: "Intermediate",
    description:
      "Progressive resistance training modified for pregnancy, focusing on glutes, back, and upper body. Includes postpartum recovery modifications.",
    photo:
      "https://images.unsplash.com/photo-1549476464-37392f717541?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&q=80",
    category: "Exercises",
    videoId: "4pKly2JojMw",
    enrolled: "980",
    rating: 4.6,
  },

  // ── Yoga ────────────────────────────────────────────────────────────────────
  {
    id: "c4",
    title: "Prenatal Yoga Flow",
    instructor: "Meera Krishnan",
    credentials: "Certified Prenatal Yoga Instructor (RPYT)",
    duration: "60 min",
    level: "Beginner",
    description:
      "A gentle, flowing yoga practice that connects breath, body and baby through all trimesters. Poses are carefully sequenced to ease discomfort and cultivate calm.",
    photo:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    category: "Yoga",
    videoId: "pGrJHJ1xPLY",
    enrolled: "3,120",
    rating: 5.0,
    popular: true,
  },
  {
    id: "c5",
    title: "Gentle Yoga for Third Trimester",
    instructor: "Anjali Sharma",
    credentials: "RYT-500, Prenatal Specialist",
    duration: "45 min",
    level: "Beginner",
    description:
      "Restorative yoga postures specifically tailored for third trimester comfort, targeting hip opening, lower back relief, and mental relaxation.",
    photo:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&q=80",
    category: "Yoga",
    videoId: "aOfwFJUoOT0",
    enrolled: "2,010",
    rating: 4.8,
  },
  {
    id: "c6",
    title: "Postpartum Yoga & Restore",
    instructor: "Deepa Suresh",
    credentials: "Postnatal Yoga Teacher, RYT-200",
    duration: "50 min",
    level: "Beginner",
    description:
      "A nurturing yoga session for new mothers, rebuilding strength while releasing tension from feeding, holding, and sleep deprivation. Safe from 6 weeks postpartum.",
    photo:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=150&q=80",
    category: "Yoga",
    videoId: "v7AYKMP6rOE",
    enrolled: "1,540",
    rating: 4.7,
  },

  // ── Breastfeeding ───────────────────────────────────────────────────────────
  {
    id: "c7",
    title: "Breastfeeding Basics",
    instructor: "Dr. Kavitha Rajan",
    credentials: "IBCLC, Registered Lactation Consultant",
    duration: "60 min",
    level: "Beginner",
    description:
      "Everything you need to know before your baby arrives — positions, latch, supply building, and common challenges. Covers both exclusive breastfeeding and combination feeding.",
    photo:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&q=80",
    category: "Breastfeeding",
    videoId: "inpok4MKVLM",
    enrolled: "4,250",
    rating: 5.0,
    popular: true,
  },
  {
    id: "c8",
    title: "Latch Techniques & Troubleshooting",
    instructor: "Nurse Sunita Reddy",
    credentials: "Certified Lactation Specialist, RN",
    duration: "45 min",
    level: "Intermediate",
    description:
      "Advanced latch techniques and evidence-based solutions for engorgement, blocked ducts, and low supply. Includes live latch demonstrations.",
    photo:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&q=80",
    category: "Breastfeeding",
    videoId: "O-6f5wQXSu8",
    enrolled: "1,680",
    rating: 4.8,
  },
  {
    id: "c9",
    title: "Pumping & Milk Storage Guide",
    instructor: "Dr. Ananya Pillai",
    credentials: "IBCLC, Paediatric Nurse Practitioner",
    duration: "35 min",
    level: "Beginner",
    description:
      "A practical guide to pump selection, establishing an effective pumping schedule, and safely storing breast milk for working mothers.",
    photo:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
    category: "Breastfeeding",
    videoId: "k_bWkMdEWeo",
    enrolled: "2,190",
    rating: 4.9,
    popular: true,
  },

  // ── Baby Connection ─────────────────────────────────────────────────────────
  {
    id: "c10",
    title: "Infant Massage Basics",
    instructor: "Radha Menon",
    credentials: "Certified Infant Massage Therapist (CIMI)",
    duration: "45 min",
    level: "Beginner",
    description:
      "Learn gentle massage techniques to soothe your baby, strengthen your bond, and improve sleep and digestion for your newborn.",
    photo:
      "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    category: "Baby Connection",
    videoId: "ZToicYcHIOU",
    enrolled: "1,920",
    rating: 4.8,
  },
  {
    id: "c11",
    title: "Baby Sensory Play (0–6 months)",
    instructor: "Dr. Lakshmi Iyer",
    credentials: "Child Development Specialist, PhD",
    duration: "30 min",
    level: "Beginner",
    description:
      "Age-appropriate sensory activities that support your newborn's brain development, vision tracking, and motor skills from the very first weeks.",
    photo:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&q=80",
    category: "Baby Connection",
    videoId: "1ZYbU82GVz4",
    enrolled: "2,700",
    rating: 4.9,
    popular: true,
  },
  {
    id: "c12",
    title: "Bonding Through Babywearing",
    instructor: "Deepa Suresh",
    credentials: "Babywearing Educator, Child Psychologist",
    duration: "45 min",
    level: "Beginner",
    description:
      "Safe babywearing techniques using wraps and carriers for closeness, convenience, and healthy baby development — including hip safety guidelines.",
    photo:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&q=80",
    category: "Baby Connection",
    videoId: "F28MGLlpP90",
    enrolled: "1,340",
    rating: 4.6,
  },

  // ── Nutrition ────────────────────────────────────────────────────────────────
  {
    id: "c13",
    title: "Pregnancy Nutrition Essentials",
    instructor: "Dr. Anita Ravi",
    credentials: "Registered Dietitian, Maternal Nutrition",
    duration: "60 min",
    level: "Beginner",
    description:
      "Evidence-based nutrition guidance covering macros, key supplements (folic acid, iron, DHA), and meal planning strategies for every trimester.",
    photo:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=150&q=80",
    category: "Nutrition",
    videoId: "4pKly2JojMw",
    enrolled: "3,560",
    rating: 4.9,
    popular: true,
  },
  {
    id: "c14",
    title: "Iron-Rich Meal Planning",
    instructor: "Chef Meena Varghese",
    credentials: "Maternal Nutrition Specialist, BSc Dietetics",
    duration: "45 min",
    level: "Intermediate",
    description:
      "Delicious iron-rich recipes and weekly meal plans to combat pregnancy anemia naturally, with South Asian and Mediterranean options.",
    photo:
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    category: "Nutrition",
    videoId: "v7AYKMP6rOE",
    enrolled: "1,230",
    rating: 4.7,
  },
  {
    id: "c15",
    title: "Postpartum Recovery Nutrition",
    instructor: "Dr. Sindhu Krishnamurthy",
    credentials: "MBBS, Nutritionist, Lactation Advisor",
    duration: "45 min",
    level: "Beginner",
    description:
      "Healing foods, anti-inflammatory recipes, and nutrition strategies for postpartum recovery, energy restoration, and breastfeeding support.",
    photo:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
    category: "Nutrition",
    videoId: "k_bWkMdEWeo",
    enrolled: "1,890",
    rating: 4.8,
  },

  // ── Birth Preparation ────────────────────────────────────────────────────────
  {
    id: "c16",
    title: "Calming Birth Anxiety",
    instructor: "Dr. Nisha Thomas",
    credentials: "Perinatal Psychologist, CBT Practitioner",
    duration: "50 min",
    level: "Beginner",
    description:
      "Evidence-based breathing, visualisation, and mindfulness techniques to manage fear of childbirth. Helps you build confidence and a positive birth mindset.",
    photo:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&q=80",
    category: "Birth Preparation",
    videoId: "pGrJHJ1xPLY",
    enrolled: "2,870",
    rating: 4.9,
    popular: true,
  },
  {
    id: "c17",
    title: "Epidural vs Natural Birth",
    instructor: "Dr. Shalini Mehta",
    credentials: "OB-GYN, MBBS, MD, FRCOG",
    duration: "45 min",
    level: "Beginner",
    description:
      "An unbiased, medically accurate comparison of epidural, natural, and water birth options — helping you make an informed birth plan that suits you.",
    photo:
      "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
    category: "Birth Preparation",
    videoId: "aOfwFJUoOT0",
    enrolled: "3,450",
    rating: 5.0,
    popular: true,
  },
  {
    id: "c18",
    title: "Hypnobirthing Foundations",
    instructor: "Claire Morrison",
    credentials: "KG Hypnobirthing Practitioner",
    duration: "75 min",
    level: "Beginner",
    description:
      "Learn self-hypnosis, deep relaxation, and positive language tools that replace fear with calm, helping your body work with — not against — labour.",
    photo:
      "https://images.unsplash.com/photo-1574279606130-09958dc756f7?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&q=80",
    category: "Birth Preparation",
    videoId: "dFO8GBs4UQg",
    enrolled: "1,670",
    rating: 4.8,
  },

  // ── Postpartum Recovery ──────────────────────────────────────────────────────
  {
    id: "c19",
    title: "Postpartum Belly Binding",
    instructor: "Dr. Priya Nair",
    credentials: "Women's Health Physiotherapist, DPT",
    duration: "35 min",
    level: "Beginner",
    description:
      "Traditional and modern belly binding techniques to support abdominal recovery after vaginal and C-section births, with safety guidelines for diastasis recti.",
    photo:
      "https://images.unsplash.com/photo-1597271392976-c3c0ccb37f49?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    category: "Postpartum Recovery",
    videoId: "Nrm8qvfMqIE",
    enrolled: "2,100",
    rating: 4.8,
    popular: true,
  },
  {
    id: "c20",
    title: "Pelvic Floor Recovery",
    instructor: "Jessica Hall",
    credentials: "Pelvic Floor Physiotherapist, MSPT",
    duration: "55 min",
    level: "Intermediate",
    description:
      "A progressive rehabilitation programme for pelvic floor healing after childbirth — addressing leakage, prolapse risk, and returning to exercise safely.",
    photo:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    category: "Postpartum Recovery",
    videoId: "4pKly2JojMw",
    enrolled: "1,780",
    rating: 4.9,
    popular: true,
  },
  {
    id: "c21",
    title: "C-Section Recovery Exercises",
    instructor: "Dr. Priya Nair",
    credentials: "Women's Health Physiotherapist, DPT",
    duration: "40 min",
    level: "Beginner",
    description:
      "Gentle guided exercises to restore core function, reduce scar tissue, and rebuild strength safely following a Caesarean section.",
    photo:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    category: "Postpartum Recovery",
    videoId: "v7AYKMP6rOE",
    enrolled: "1,320",
    rating: 4.7,
  },

  // ── Mental Wellness ──────────────────────────────────────────────────────────
  {
    id: "c22",
    title: "Mindfulness for New Mothers",
    instructor: "Dr. Nisha Thomas",
    credentials: "Perinatal Psychologist, MBSR Teacher",
    duration: "45 min",
    level: "Beginner",
    description:
      "Practical mindfulness and stress-reduction techniques designed for the chaos of new motherhood — even in 5-minute windows between feeds.",
    photo:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&q=80",
    category: "Mental Wellness",
    videoId: "pGrJHJ1xPLY",
    enrolled: "3,210",
    rating: 5.0,
    popular: true,
  },
  {
    id: "c23",
    title: "Managing Postpartum Depression",
    instructor: "Dr. Rekha Chandran",
    credentials: "Psychiatrist, MD, Perinatal Mental Health",
    duration: "60 min",
    level: "Intermediate",
    description:
      "Recognising PPD symptoms, coping strategies, and when to seek professional support. Covers mood tracking, CBT tools, and partner communication.",
    photo:
      "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
    category: "Mental Wellness",
    videoId: "aOfwFJUoOT0",
    enrolled: "1,950",
    rating: 4.9,
    popular: true,
  },
  {
    id: "c24",
    title: "Breathing for Labour & Anxiety",
    instructor: "Anjali Sharma",
    credentials: "Certified Breathwork Coach, RYT-500",
    duration: "30 min",
    level: "Beginner",
    description:
      "Structured breathing exercises (Lamaze, box breathing, surge breathing) that reduce anxiety in pregnancy and provide pain relief during labour.",
    photo:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&q=80",
    category: "Mental Wellness",
    videoId: "dFO8GBs4UQg",
    enrolled: "2,430",
    rating: 4.8,
  },

  // ── Baby Massage ─────────────────────────────────────────────────────────────
  {
    id: "c25",
    title: "Baby Massage for Colic Relief",
    instructor: "Radha Menon",
    credentials: "CIMI, Paediatric Physiotherapist",
    duration: "30 min",
    level: "Beginner",
    description:
      "Targeted abdominal massage strokes and leg-cycling techniques that help relieve colic, gas, and constipation in babies aged 0–6 months.",
    photo:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    category: "Baby Massage",
    videoId: "ZToicYcHIOU",
    enrolled: "2,650",
    rating: 4.9,
    popular: true,
  },
  {
    id: "c26",
    title: "Newborn Head & Face Massage",
    instructor: "Radha Menon",
    credentials: "CIMI, Paediatric Physiotherapist",
    duration: "25 min",
    level: "Beginner",
    description:
      "Gentle cranial and facial massage techniques to soothe a fussy newborn, ease nasal congestion, and promote healthy sleep patterns.",
    photo:
      "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    category: "Baby Massage",
    videoId: "1ZYbU82GVz4",
    enrolled: "1,480",
    rating: 4.7,
  },
  {
    id: "c27",
    title: "Full Body Baby Massage Routine",
    instructor: "Dr. Lakshmi Iyer",
    credentials: "Child Development Specialist, CIMI",
    duration: "40 min",
    level: "Beginner",
    description:
      "A complete head-to-toe massage routine using safe oils, building parent-infant bonding while supporting neurological and physical development.",
    photo:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&q=80",
    category: "Baby Massage",
    videoId: "F28MGLlpP90",
    enrolled: "2,010",
    rating: 4.8,
  },

  // ── Sleep Training ───────────────────────────────────────────────────────────
  {
    id: "c28",
    title: "Sleep Training Methods Explained",
    instructor: "Dr. Pooja Krishnan",
    credentials: "Paediatric Sleep Consultant, MD",
    duration: "55 min",
    level: "Beginner",
    description:
      "An honest comparison of Ferber, Weissbluth, No-Cry, and chair methods — helping you choose the approach that aligns with your parenting style and baby's temperament.",
    photo:
      "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=150&q=80",
    category: "Sleep Training",
    videoId: "k_bWkMdEWeo",
    enrolled: "3,780",
    rating: 5.0,
    popular: true,
  },
  {
    id: "c29",
    title: "Newborn Sleep Foundations",
    instructor: "Dr. Pooja Krishnan",
    credentials: "Paediatric Sleep Consultant, MD",
    duration: "45 min",
    level: "Beginner",
    description:
      "Setting safe sleep habits from day one — safe sleep environment, wake windows, day-night confusion, and gentle scheduling for 0–12 week babies.",
    photo:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=150&q=80",
    category: "Sleep Training",
    videoId: "O-6f5wQXSu8",
    enrolled: "2,290",
    rating: 4.8,
  },
  {
    id: "c30",
    title: "Toddler Sleep Regression Survival",
    instructor: "Dr. Pooja Krishnan",
    credentials: "Paediatric Sleep Consultant, MD",
    duration: "40 min",
    level: "Intermediate",
    description:
      "Strategies to navigate the 18-month and 2-year sleep regressions, manage night wakings, and transition from cot to bed with confidence.",
    photo:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=150&q=80",
    category: "Sleep Training",
    videoId: "inpok4MKVLM",
    enrolled: "1,640",
    rating: 4.7,
  },

  // ── Baby Development ─────────────────────────────────────────────────────────
  {
    id: "c31",
    title: "Introduction to Baby Signs",
    instructor: "Dr. Lakshmi Iyer",
    credentials: "Child Development Specialist, PhD",
    duration: "45 min",
    level: "Beginner",
    description:
      "Teach your baby to communicate before they can talk using simple sign language. Reduces frustration, boosts vocabulary, and strengthens your bond.",
    photo:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&q=80",
    category: "Baby Development",
    videoId: "1ZYbU82GVz4",
    enrolled: "2,120",
    rating: 4.9,
    popular: true,
  },
  {
    id: "c32",
    title: "Tummy Time Techniques",
    instructor: "Sarah Johnson",
    credentials: "Certified Pediatric Physiotherapist",
    duration: "30 min",
    level: "Beginner",
    description:
      "Make tummy time enjoyable and effective — positioning tips, engagement strategies, and milestone progressions from newborn to crawling.",
    photo:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    category: "Baby Development",
    videoId: "ZToicYcHIOU",
    enrolled: "2,890",
    rating: 4.9,
    popular: true,
  },
  {
    id: "c33",
    title: "Language & Talking Milestones",
    instructor: "Dr. Ananya Pillai",
    credentials: "Paediatric Speech Therapist, MSc",
    duration: "50 min",
    level: "Beginner",
    description:
      "Understand language development milestones from cooing to first words, and learn daily activities that naturally support speech and communication.",
    photo:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
    category: "Baby Development",
    videoId: "F28MGLlpP90",
    enrolled: "1,760",
    rating: 4.7,
  },

  // ── Toddler Activities ────────────────────────────────────────────────────────
  {
    id: "c34",
    title: "Toddler Sensory Play",
    instructor: "Dr. Lakshmi Iyer",
    credentials: "Child Development Specialist, PhD",
    duration: "35 min",
    level: "Beginner",
    description:
      "Simple, budget-friendly sensory bins, texture play, and water activities that stimulate cognitive development and fine motor skills in toddlers aged 1–3.",
    photo:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&q=80",
    category: "Toddler Activities",
    videoId: "dFO8GBs4UQg",
    enrolled: "2,340",
    rating: 4.8,
    popular: true,
  },
  {
    id: "c35",
    title: "Creative Art for Little Hands",
    instructor: "Preethi Nair",
    credentials: "Early Childhood Educator, MEd",
    duration: "40 min",
    level: "Beginner",
    description:
      "Introduce painting, stamping, and collage to toddlers using safe materials, building creativity, hand-eye coordination, and self-expression.",
    photo:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=150&q=80",
    category: "Toddler Activities",
    videoId: "Nrm8qvfMqIE",
    enrolled: "1,450",
    rating: 4.6,
  },
  {
    id: "c36",
    title: "Outdoor Play & Movement for Toddlers",
    instructor: "Tanya Richards",
    credentials: "Paediatric Occupational Therapist",
    duration: "45 min",
    level: "Beginner",
    description:
      "Structured outdoor activities that build gross motor skills, balance, and spatial awareness while nurturing a love of nature in children aged 12–36 months.",
    photo:
      "https://images.unsplash.com/photo-1551009175-15bdf9dcb580?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&q=80",
    category: "Toddler Activities",
    videoId: "aOfwFJUoOT0",
    enrolled: "1,180",
    rating: 4.7,
  },

  // ── Partner Support ───────────────────────────────────────────────────────────
  {
    id: "c37",
    title: "Partner Support During Labour",
    instructor: "Dr. Shalini Mehta",
    credentials: "OB-GYN, Childbirth Educator",
    duration: "60 min",
    level: "Beginner",
    description:
      "Equip your birth partner with hands-on skills — counter-pressure techniques, coaching breathing, understanding labour stages, and advocating for you in hospital.",
    photo:
      "https://images.unsplash.com/photo-1565608438257-fac3c27bdbf6?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
    category: "Partner Support",
    videoId: "pGrJHJ1xPLY",
    enrolled: "1,920",
    rating: 4.8,
    popular: true,
  },
  {
    id: "c38",
    title: "Newborn Care for Partners",
    instructor: "Nurse Sunita Reddy",
    credentials: "Paediatric Nurse, IBCLC",
    duration: "45 min",
    level: "Beginner",
    description:
      "A practical class for partners covering nappy changes, safe bathing, swaddling, winding, and supporting a breastfeeding mother through the first weeks.",
    photo:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&q=80",
    category: "Partner Support",
    videoId: "O-6f5wQXSu8",
    enrolled: "1,540",
    rating: 4.7,
  },
  {
    id: "c39",
    title: "Supporting Your Partner Through PPD",
    instructor: "Dr. Rekha Chandran",
    credentials: "Psychiatrist, MD, Perinatal Mental Health",
    duration: "50 min",
    level: "Beginner",
    description:
      "Understand the signs of postpartum depression, how to have supportive conversations, practical ways to help at home, and when to encourage professional help.",
    photo:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
    category: "Partner Support",
    videoId: "inpok4MKVLM",
    enrolled: "1,150",
    rating: 4.9,
    popular: true,
  },

  // ── Prenatal Care ─────────────────────────────────────────────────────────────
  {
    id: "c40",
    title: "First Trimester Essentials",
    instructor: "Dr. Shalini Mehta",
    credentials: "OB-GYN, MBBS, MD, FRCOG",
    duration: "60 min",
    level: "Beginner",
    description:
      "Everything to expect in weeks 1–12: scans, blood tests, managing nausea, safe medications, and lifestyle adjustments for a healthy first trimester.",
    photo:
      "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
    category: "Prenatal Care",
    videoId: "4pKly2JojMw",
    enrolled: "4,100",
    rating: 5.0,
    popular: true,
  },
  {
    id: "c41",
    title: "Understanding Your Scan & Test Results",
    instructor: "Dr. Shalini Mehta",
    credentials: "OB-GYN, MBBS, MD, FRCOG",
    duration: "50 min",
    level: "Beginner",
    description:
      "A clear guide to anatomy scans, NIPT, glucose tolerance tests, and other common prenatal tests — what they check, when to do them, and how to read results.",
    photo:
      "https://images.unsplash.com/photo-1574279606130-09958dc756f7?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
    category: "Prenatal Care",
    videoId: "v7AYKMP6rOE",
    enrolled: "2,660",
    rating: 4.9,
    popular: true,
  },
  {
    id: "c42",
    title: "Managing Pregnancy Discomforts",
    instructor: "Dr. Priya Nair",
    credentials: "Women's Health Physiotherapist, DPT",
    duration: "45 min",
    level: "Beginner",
    description:
      "Practical remedies and exercises for common pregnancy complaints — round ligament pain, heartburn, swelling, leg cramps, and sleep challenges.",
    photo:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    category: "Prenatal Care",
    videoId: "Nrm8qvfMqIE",
    enrolled: "2,890",
    rating: 4.8,
  },

  // ── Lactation Support ─────────────────────────────────────────────────────────
  {
    id: "c43",
    title: "Increasing Milk Supply Naturally",
    instructor: "Dr. Kavitha Rajan",
    credentials: "IBCLC, Registered Lactation Consultant",
    duration: "45 min",
    level: "Beginner",
    description:
      "Evidence-based strategies to boost and protect your milk supply — power pumping, galactagogue foods, hydration, and cluster feeding explained.",
    photo:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&q=80",
    category: "Lactation Support",
    videoId: "inpok4MKVLM",
    enrolled: "3,320",
    rating: 5.0,
    popular: true,
  },
  {
    id: "c44",
    title: "Weaning Gently & Gradually",
    instructor: "Dr. Ananya Pillai",
    credentials: "Paediatric Nurse Practitioner, IBCLC",
    duration: "40 min",
    level: "Beginner",
    description:
      "Compassionate weaning strategies for when you and your baby are ready — partial weaning, comfort weaning, and managing emotional transitions for both of you.",
    photo:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
    category: "Lactation Support",
    videoId: "O-6f5wQXSu8",
    enrolled: "1,640",
    rating: 4.7,
  },
  {
    id: "c45",
    title: "Breastfeeding & Returning to Work",
    instructor: "Nurse Sunita Reddy",
    credentials: "Certified Lactation Specialist, RN",
    duration: "50 min",
    level: "Intermediate",
    description:
      "A practical roadmap for maintaining breastfeeding when you return to work — building a freezer stash, choosing a workplace pump, and communicating with your employer.",
    photo:
      "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=600&q=80",
    instructorPhoto:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&q=80",
    category: "Lactation Support",
    videoId: "k_bWkMdEWeo",
    enrolled: "1,980",
    rating: 4.8,
    popular: true,
  },
];

const CATEGORY_TABS = [
  "All",
  "Prenatal Care",
  "Birth Preparation",
  "Exercises",
  "Yoga",
  "Breastfeeding",
  "Lactation Support",
  "Postpartum Recovery",
  "Baby Connection",
  "Baby Massage",
  "Baby Development",
  "Sleep Training",
  "Mental Wellness",
  "Nutrition",
  "Toddler Activities",
  "Partner Support",
];

// Category color map: bg color + text color (as inline style strings)
const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Exercises: { bg: "rgba(124,58,237,0.12)", text: "#7C3AED" },
  Yoga: { bg: "rgba(13,148,136,0.12)", text: "#0D9488" },
  Breastfeeding: { bg: "rgba(236,72,153,0.12)", text: "#DB2777" },
  "Baby Connection": { bg: "rgba(249,115,22,0.12)", text: "#EA580C" },
  Nutrition: { bg: "rgba(22,163,74,0.12)", text: "#16A34A" },
  "Birth Preparation": { bg: "rgba(59,130,246,0.12)", text: "#2563EB" },
  "Postpartum Recovery": { bg: "rgba(245,158,11,0.12)", text: "#D97706" },
  "Mental Wellness": { bg: "rgba(99,102,241,0.12)", text: "#4F46E5" },
  "Baby Massage": { bg: "rgba(236,72,153,0.10)", text: "#BE185D" },
  "Sleep Training": { bg: "rgba(16,185,129,0.12)", text: "#059669" },
  "Baby Development": { bg: "rgba(139,92,246,0.12)", text: "#7C3AED" },
  "Toddler Activities": { bg: "rgba(249,115,22,0.12)", text: "#C2410C" },
  "Partner Support": { bg: "rgba(20,184,166,0.12)", text: "#0F766E" },
  "Prenatal Care": { bg: "rgba(168,85,247,0.12)", text: "#9333EA" },
  "Lactation Support": { bg: "rgba(244,63,94,0.12)", text: "#E11D48" },
};

const LEVEL_STYLE: Record<string, { bg: string; text: string }> = {
  Beginner: { bg: "rgba(22,163,74,0.10)", text: "#16A34A" },
  Intermediate: { bg: "rgba(217,119,6,0.10)", text: "#D97706" },
  Advanced: { bg: "rgba(220,38,38,0.10)", text: "#DC2626" },
};

// Deduplicated instructors for spotlight
const INSTRUCTORS = [
  {
    name: "Dr. Shalini Mehta",
    credentials: "OB-GYN, MBBS MD FRCOG",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
    classes: 5,
    rating: 4.9,
  },
  {
    name: "Dr. Kavitha Rajan",
    credentials: "IBCLC, Lactation Consultant",
    photo:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&q=80",
    classes: 3,
    rating: 5.0,
  },
  {
    name: "Meera Krishnan",
    credentials: "Prenatal Yoga Instructor RPYT",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    classes: 3,
    rating: 4.9,
  },
  {
    name: "Dr. Priya Nair",
    credentials: "Women's Health Physio, DPT",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    classes: 4,
    rating: 4.8,
  },
  {
    name: "Dr. Nisha Thomas",
    credentials: "Perinatal Psychologist, MBSR",
    photo:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&q=80",
    classes: 3,
    rating: 5.0,
  },
  {
    name: "Dr. Pooja Krishnan",
    credentials: "Paediatric Sleep Consultant",
    photo:
      "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=150&q=80",
    classes: 3,
    rating: 4.8,
  },
  {
    name: "Radha Menon",
    credentials: "Infant Massage Therapist CIMI",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    classes: 3,
    rating: 4.9,
  },
  {
    name: "Dr. Lakshmi Iyer",
    credentials: "Child Development PhD",
    photo:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&q=80",
    classes: 4,
    rating: 4.9,
  },
];

// Featured class: highest rated popular one
const FEATURED =
  CLASSES.find((c) => c.popular && c.rating === 5.0) ?? CLASSES[0];

interface ClassesPageProps {
  onBack: () => void;
  userInfo: UserInfo | null;
}

function CategoryBadge({ category }: { category: string }) {
  const colors = CATEGORY_COLORS[category] ?? {
    bg: "rgba(142,92,159,0.12)",
    text: "#8E5C9F",
  };
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold leading-none"
      style={{ background: colors.bg, color: colors.text }}
    >
      {category}
    </span>
  );
}

function StarRating({ rating, size = 11 }: { rating: number; size?: number }) {
  return (
    <span
      className="flex items-center gap-0.5"
      aria-label={`Rating: ${rating}`}
    >
      <Star size={size} fill="#F59E0B" color="#F59E0B" />
      <span className="text-xs font-bold" style={{ color: "#92400E" }}>
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

export default function ClassesPage({ onBack, userInfo }: ClassesPageProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);

  const filtered =
    activeCategory === "All"
      ? CLASSES
      : CLASSES.filter((c) => c.category === activeCategory);

  return (
    <div
      className="min-h-screen pb-28"
      style={{
        background:
          "linear-gradient(160deg, #F5F0FF 0%, #FDF4FF 50%, #F8F4FF 100%)",
      }}
    >
      {/* ── Sticky Top Bar ───────────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-40"
        style={{
          background:
            "linear-gradient(135deg, #5B21B6 0%, #7C3AED 50%, #9333EA 100%)",
          boxShadow: "0 4px 24px rgba(91,33,182,0.35)",
        }}
      >
        <div className="flex items-center gap-3 px-4 pt-3 pb-2">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-smooth active:scale-95"
            style={{ background: "rgba(255,255,255,0.18)" }}
            aria-label="Go back"
            data-ocid="classes.back_button"
          >
            <ArrowLeft size={18} color="white" />
          </button>
          <img
            src={LOGO}
            alt="Mothera"
            className="w-8 h-8 rounded-full object-cover shrink-0"
            style={{ border: "2px solid rgba(255,255,255,0.4)" }}
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-bold text-base leading-tight tracking-tight">
              Motherhood Classes
            </h1>
            <p className="text-white/65 text-xs leading-tight">
              {CLASSES.length} classes · {CATEGORY_TABS.length - 1} categories
            </p>
          </div>
          {userInfo && (
            <div
              className="flex items-center gap-1.5 shrink-0"
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: 20,
                padding: "4px 10px 4px 4px",
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "rgba(255,255,255,0.28)" }}
              >
                {userInfo.firstName?.charAt(0) ?? "M"}
              </div>
              <span className="text-white text-xs font-medium">
                {userInfo.firstName ?? "Mom"}
              </span>
            </div>
          )}
        </div>

        {/* Category Filter Chips */}
        <div
          className="flex gap-2 px-4 pb-3 overflow-x-auto hide-scrollbar"
          role="tablist"
          aria-label="Class categories"
        >
          {CATEGORY_TABS.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap active:scale-95"
              style={{
                background:
                  activeCategory === cat ? "white" : "rgba(255,255,255,0.18)",
                color:
                  activeCategory === cat ? "#7C3AED" : "rgba(255,255,255,0.9)",
                boxShadow:
                  activeCategory === cat
                    ? "0 2px 8px rgba(0,0,0,0.15)"
                    : "none",
              }}
              data-ocid={`classes.category_${cat.toLowerCase().replace(/[\s&/–]+/g, "_")}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        {/* ── Page Hero (shown only on "All") ──────────────────────────────── */}
        {activeCategory === "All" && (
          <>
            {/* Hero Text */}
            <div className="pt-5 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap size={18} style={{ color: "#7C3AED" }} />
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "#7C3AED" }}
                >
                  Expert-Led Learning
                </span>
              </div>
              <h2
                className="text-2xl font-extrabold leading-tight tracking-tight"
                style={{ color: "#2D1B69" }}
              >
                Learn at Every Stage
              </h2>
              <p
                className="text-sm mt-1 leading-relaxed"
                style={{ color: "#6B5A7B" }}
              >
                Pregnancy, birth, newborn care & beyond — taught by certified
                specialists.
              </p>
            </div>

            {/* Featured Class Banner */}
            <button
              type="button"
              className="relative rounded-3xl overflow-hidden mb-6 cursor-pointer group animate-fade-in w-full text-left"
              style={{ aspectRatio: "16/7" }}
              onClick={() => setSelectedClass(FEATURED)}
              aria-label={`Featured class: ${FEATURED.title}`}
              data-ocid="classes.featured_banner"
            >
              <img
                src={FEATURED.photo}
                alt={FEATURED.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(45,27,105,0.88) 0%, rgba(91,33,182,0.55) 55%, rgba(0,0,0,0.2) 100%)",
                }}
              />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <div className="mb-1.5">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.3)",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {FEATURED.category}
                  </span>
                </div>
                <h3 className="text-white font-extrabold text-lg leading-tight mb-1.5 drop-shadow-sm">
                  {FEATURED.title}
                </h3>
                <p className="text-white/75 text-xs mb-3 leading-relaxed line-clamp-2">
                  with {FEATURED.instructor} · {FEATURED.credentials}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-smooth active:scale-95"
                    style={{
                      background: "white",
                      color: "#7C3AED",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
                    }}
                  >
                    <Play size={12} fill="#7C3AED" />
                    Start Learning
                  </button>
                  <div className="flex items-center gap-1">
                    <Star size={12} fill="#FBBF24" color="#FBBF24" />
                    <span className="text-white text-xs font-bold">
                      {FEATURED.rating.toFixed(1)}
                    </span>
                    <span className="text-white/60 text-xs">
                      · {FEATURED.enrolled} enrolled
                    </span>
                  </div>
                </div>
              </div>
              {/* Popular badge */}
              <div
                className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                style={{ background: "#FBBF24", color: "#78350F" }}
              >
                <Trophy size={10} />
                Featured
              </div>
            </button>

            {/* Stats strip */}
            <div
              className="grid grid-cols-3 rounded-2xl overflow-hidden mb-6 border"
              style={{
                borderColor: "rgba(124,58,237,0.15)",
                background: "white",
              }}
            >
              {[
                {
                  icon: BookOpen,
                  label: "Classes",
                  value: `${CLASSES.length}+`,
                },
                {
                  icon: GraduationCap,
                  label: "Instructors",
                  value: `${INSTRUCTORS.length}+`,
                },
                { icon: Users, label: "Enrolled", value: "45K+" },
              ].map(({ icon: Icon, label, value }, i) => (
                <div
                  key={label}
                  className={`flex flex-col items-center py-3 ${i < 2 ? "border-r" : ""}`}
                  style={{ borderColor: "rgba(124,58,237,0.1)" }}
                >
                  <Icon
                    size={16}
                    style={{ color: "#7C3AED" }}
                    className="mb-0.5"
                  />
                  <span
                    className="text-base font-extrabold leading-tight"
                    style={{ color: "#2D1B69" }}
                  >
                    {value}
                  </span>
                  <span className="text-xs" style={{ color: "#9B8AC4" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Results Count ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold" style={{ color: "#9B8AC4" }}>
            <span style={{ color: "#7C3AED" }}>{filtered.length}</span>{" "}
            {filtered.length === 1 ? "class" : "classes"}{" "}
            {activeCategory !== "All" && (
              <span>
                in <span style={{ color: "#5B21B6" }}>{activeCategory}</span>
              </span>
            )}
          </p>
          {activeCategory !== "All" && (
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className="text-xs font-semibold transition-smooth"
              style={{ color: "#7C3AED" }}
            >
              View all
            </button>
          )}
        </div>

        {/* ── Class Cards Grid ──────────────────────────────────────────────── */}
        <div className="space-y-4">
          {filtered.map((cls, idx) => (
            <ClassCard
              key={cls.id}
              cls={cls}
              idx={idx}
              onSelect={setSelectedClass}
            />
          ))}
        </div>

        {/* ── Instructor Spotlight ──────────────────────────────────────────── */}
        {activeCategory === "All" && (
          <div className="mt-8 mb-2">
            <div className="section-header mb-4">
              <span className="section-title">Meet Your Instructors</span>
            </div>
            <ul
              className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar list-none m-0 p-0"
              aria-label="Instructor profiles"
            >
              {INSTRUCTORS.map((instructor) => (
                <InstructorCard key={instructor.name} instructor={instructor} />
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ── Class Detail Modal ────────────────────────────────────────────────── */}
      {selectedClass && (
        <ClassModal
          cls={selectedClass}
          onClose={() => setSelectedClass(null)}
        />
      )}
    </div>
  );
}

/* ─── ClassCard sub-component ──────────────────────────────────────────────── */
interface ClassCardProps {
  cls: ClassItem;
  idx: number;
  onSelect: (cls: ClassItem) => void;
}

function ClassCard({ cls, onSelect }: ClassCardProps) {
  const lvlStyle = LEVEL_STYLE[cls.level] ?? LEVEL_STYLE.Beginner;

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden card-elevated"
      data-ocid="classes.class_card"
    >
      {/* Thumbnail – clickable button */}
      <button
        type="button"
        className="relative w-full overflow-hidden block"
        style={{ aspectRatio: "16/9" }}
        onClick={() => onSelect(cls)}
        aria-label={`Play ${cls.title}`}
      >
        <img
          src={cls.photo}
          alt={cls.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 40%, rgba(15,5,40,0.75))",
          }}
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-smooth">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-elevated"
            style={{ background: "rgba(255,255,255,0.95)" }}
          >
            <Play
              size={20}
              fill="#7C3AED"
              color="#7C3AED"
              style={{ marginLeft: 2 }}
            />
          </div>
        </div>
        {/* Popular badge */}
        {cls.popular && (
          <div
            className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
            style={{ background: "#FBBF24", color: "#78350F" }}
          >
            <Star size={9} fill="#78350F" color="#78350F" />
            Popular
          </div>
        )}
        {/* Bottom text on image */}
        <div className="absolute bottom-0 left-0 right-0 px-3.5 pb-3 text-left">
          <CategoryBadge category={cls.category} />
          <h3 className="text-white font-bold text-sm leading-snug mt-1 clamp-2 drop-shadow">
            {cls.title}
          </h3>
        </div>
      </button>

      {/* Card body */}
      <div className="p-3.5">
        {/* Instructor row */}
        <div className="flex items-center gap-2.5 mb-2.5">
          <img
            src={cls.instructorPhoto}
            alt={cls.instructor}
            className="w-7 h-7 rounded-full object-cover shrink-0"
            style={{
              border: "2px solid rgba(124,58,237,0.2)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            }}
          />
          <div className="min-w-0 flex-1">
            <p
              className="font-semibold text-xs leading-tight truncate"
              style={{ color: "#1F0D4F" }}
            >
              {cls.instructor}
            </p>
            <p
              className="text-xs truncate leading-tight"
              style={{ color: "#9B8AC4" }}
            >
              {cls.credentials}
            </p>
          </div>
          <StarRating rating={cls.rating} />
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span
            className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ background: "rgba(124,58,237,0.08)", color: "#7C3AED" }}
          >
            <Clock size={10} aria-hidden="true" />
            {cls.duration}
          </span>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: lvlStyle.bg, color: lvlStyle.text }}
          >
            {cls.level}
          </span>
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: "#9B8AC4" }}
          >
            <Users size={10} aria-hidden="true" />
            {cls.enrolled}
          </span>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(cls);
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-smooth active:scale-95"
          style={{
            background: "linear-gradient(135deg, #7C3AED, #9333EA)",
            color: "white",
            boxShadow: "0 4px 12px rgba(124,58,237,0.35)",
          }}
          data-ocid="classes.join_button"
        >
          <Play size={13} fill="white" />
          Start Class
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}

/* ─── InstructorCard sub-component ─────────────────────────────────────────── */
function InstructorCard({
  instructor,
}: {
  instructor: {
    name: string;
    credentials: string;
    photo: string;
    classes: number;
    rating: number;
  };
}) {
  return (
    <li
      className="shrink-0 flex flex-col items-center text-center p-4 rounded-2xl bg-white shadow-card hover-lift list-none"
      style={{ width: 130, border: "1px solid rgba(124,58,237,0.1)" }}
    >
      <div className="relative mb-2">
        <img
          src={instructor.photo}
          alt={instructor.name}
          className="w-16 h-16 rounded-full object-cover"
          style={{
            border: "2.5px solid rgba(124,58,237,0.25)",
            boxShadow: "0 4px 12px rgba(124,58,237,0.15)",
          }}
        />
        <div
          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: "#7C3AED", border: "2px solid white" }}
        >
          <GraduationCap size={10} color="white" />
        </div>
      </div>
      <p
        className="font-bold text-xs leading-tight clamp-2 mb-0.5"
        style={{ color: "#1F0D4F" }}
      >
        {instructor.name}
      </p>
      <p
        className="text-xs clamp-2 leading-tight mb-2"
        style={{ color: "#9B8AC4" }}
      >
        {instructor.credentials}
      </p>
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ background: "rgba(124,58,237,0.1)", color: "#7C3AED" }}
        >
          {instructor.classes} classes
        </span>
        <StarRating rating={instructor.rating} size={10} />
      </div>
    </li>
  );
}

/* ─── ClassModal sub-component ──────────────────────────────────────────────── */
function ClassModal({ cls, onClose }: { cls: ClassItem; onClose: () => void }) {
  const catColor = CATEGORY_COLORS[cls.category] ?? {
    bg: "rgba(142,92,159,0.12)",
    text: "#8E5C9F",
  };
  const lvlStyle = LEVEL_STYLE[cls.level] ?? LEVEL_STYLE.Beginner;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      style={{ background: "rgba(15,5,40,0.7)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="presentation"
    >
      <dialog
        open
        className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl border-0 overflow-hidden animate-slide-up"
        style={{ background: "white", maxHeight: "92vh", padding: 0 }}
        aria-label={`Class: ${cls.title}`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        data-ocid="classes.class_modal"
      >
        {/* Modal Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{
            background: "linear-gradient(135deg, #5B21B6, #7C3AED, #9333EA)",
          }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <GraduationCap size={18} color="white" className="shrink-0" />
            <div className="min-w-0">
              <p className="text-white font-bold text-sm truncate leading-tight">
                {cls.title}
              </p>
              <p className="text-white/65 text-xs">{cls.category}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close class modal"
            className="shrink-0 ml-2 w-8 h-8 flex items-center justify-center rounded-full transition-smooth active:scale-95"
            style={{ background: "rgba(255,255,255,0.18)" }}
          >
            <X size={16} color="white" />
          </button>
        </div>

        <div className="overflow-y-auto" style={{ maxHeight: "78vh" }}>
          {/* Video */}
          <div className="w-full" style={{ aspectRatio: "16/9" }}>
            <iframe
              src={`https://www.youtube.com/embed/${cls.videoId}?autoplay=1`}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={cls.title}
            />
          </div>

          <div className="p-5">
            {/* Instructor */}
            <div
              className="flex items-center gap-3 mb-4 p-3 rounded-2xl"
              style={{
                background: "rgba(124,58,237,0.06)",
                border: "1px solid rgba(124,58,237,0.1)",
              }}
            >
              <img
                src={cls.instructorPhoto}
                alt={cls.instructor}
                className="w-12 h-12 rounded-full object-cover shrink-0"
                style={{ border: "2.5px solid rgba(124,58,237,0.25)" }}
              />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-sm" style={{ color: "#1F0D4F" }}>
                  {cls.instructor}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#9B8AC4" }}
                >
                  {cls.credentials}
                </p>
              </div>
              <StarRating rating={cls.rating} size={13} />
            </div>

            {/* Description */}
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "#4C3B6B" }}
            >
              {cls.description}
            </p>

            {/* Stats chips */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: "rgba(124,58,237,0.1)", color: "#7C3AED" }}
              >
                <Clock size={12} />
                {cls.duration}
              </span>
              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: lvlStyle.bg, color: lvlStyle.text }}
              >
                {cls.level}
              </span>
              <span
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: "rgba(124,58,237,0.1)", color: "#7C3AED" }}
              >
                <Users size={12} />
                {cls.enrolled} enrolled
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: "#FFFBEB", color: "#92400E" }}
              >
                <Star size={12} fill="#F59E0B" color="#F59E0B" />
                {cls.rating.toFixed(1)}
              </span>
              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: catColor.bg, color: catColor.text }}
              >
                {cls.category}
              </span>
            </div>

            {/* Enroll CTA */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-smooth active:scale-95"
              style={{
                background: "linear-gradient(135deg, #5B21B6, #9333EA)",
                color: "white",
                boxShadow: "0 6px 20px rgba(91,33,182,0.4)",
              }}
              data-ocid="classes.enroll_button"
            >
              <GraduationCap size={16} />
              Enroll Now — Free
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
