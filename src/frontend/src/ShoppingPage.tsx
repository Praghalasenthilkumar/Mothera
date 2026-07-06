import { Package, Search } from "lucide-react";
import { useMemo, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Product {
  id: string;
  name: string;
  price: number;
  category: "Mother Products" | "Baby Products";
  imageUrl: string;
}

// ─── Pregnancy Products ───────────────────────────────────────────────────────
const PREGNANCY_PRODUCTS: Product[] = [
  // Mother Products
  {
    id: "pm1",
    name: "Maternity Nursing Top – Soft Cotton Feeding Kurta for Pregnant Women",
    price: 649,
    category: "Mother Products",
    imageUrl: "https://picsum.photos/seed/maternity-top/300/300",
  },
  {
    id: "pm2",
    name: "Nursing Bra – Wireless Seamless Maternity Bra with Adjustable Straps",
    price: 499,
    category: "Mother Products",
    imageUrl: "https://picsum.photos/seed/nursing-bra/300/300",
  },
  {
    id: "pm3",
    name: "Belly Band – Breathable Pregnancy Support Band for Back & Bump",
    price: 349,
    category: "Mother Products",
    imageUrl: "https://picsum.photos/seed/belly-band/300/300",
  },
  {
    id: "pm4",
    name: "Pregnancy Pillow – Full Body U-Shaped Maternity Support Pillow",
    price: 1799,
    category: "Mother Products",
    imageUrl: "https://picsum.photos/seed/pregnancy-pillow/300/300",
  },
  {
    id: "pm5",
    name: "Maternity Leggings – Stretchable Over-Bump High-Waist Pants",
    price: 599,
    category: "Mother Products",
    imageUrl: "https://picsum.photos/seed/maternity-leggings/300/300",
  },
  {
    id: "pm6",
    name: "Nipple Cream – Lanolin-Free Soothing Balm for Breastfeeding Mothers",
    price: 299,
    category: "Mother Products",
    imageUrl: "https://picsum.photos/seed/nipple-cream/300/300",
  },
  {
    id: "pm7",
    name: "Compression Socks – Anti-Swelling Maternity Socks for Pregnancy",
    price: 399,
    category: "Mother Products",
    imageUrl: "https://picsum.photos/seed/compression-socks/300/300",
  },
  {
    id: "pm8",
    name: "Prenatal Vitamins – Folic Acid & Iron Supplement for Pregnant Women",
    price: 449,
    category: "Mother Products",
    imageUrl: "https://picsum.photos/seed/prenatal-vitamins/300/300",
  },
  {
    id: "pm9",
    name: "Maternity Support Belt – Adjustable Pelvic & Lower Back Support",
    price: 799,
    category: "Mother Products",
    imageUrl: "https://picsum.photos/seed/maternity-belt/300/300",
  },
  {
    id: "pm10",
    name: "Stretch Mark Cream – Bio-Oil Blend for Bump & Skin Elasticity",
    price: 549,
    category: "Mother Products",
    imageUrl: "https://picsum.photos/seed/stretch-mark-cream/300/300",
  },
  // Baby Products
  {
    id: "pb1",
    name: "Newborn Onesie Set – 100% Organic Cotton Bodysuits (Pack of 5)",
    price: 699,
    category: "Baby Products",
    imageUrl: "https://picsum.photos/seed/newborn-onesie/300/300",
  },
  {
    id: "pb2",
    name: "Baby Blanket – Super Soft Muslin Swaddle Receiving Blanket",
    price: 349,
    category: "Baby Products",
    imageUrl: "https://picsum.photos/seed/baby-blanket/300/300",
  },
  {
    id: "pb3",
    name: "Baby Mittens – Scratch-Free Newborn Hand Gloves (Set of 3 Pairs)",
    price: 199,
    category: "Baby Products",
    imageUrl: "https://picsum.photos/seed/baby-mittens/300/300",
  },
  {
    id: "pb4",
    name: "Baby Booties – Warm Knit Newborn Socks & Foot Covers",
    price: 249,
    category: "Baby Products",
    imageUrl: "https://picsum.photos/seed/baby-booties/300/300",
  },
  {
    id: "pb5",
    name: "Swaddle Wrap – Adjustable Velcro Swaddler for Newborns 0–3 Months",
    price: 449,
    category: "Baby Products",
    imageUrl: "https://picsum.photos/seed/swaddle-wrap/300/300",
  },
  {
    id: "pb6",
    name: "Baby Hat – Soft Jersey Knit Beanie for Newborns (Pack of 2)",
    price: 179,
    category: "Baby Products",
    imageUrl: "https://picsum.photos/seed/baby-hat/300/300",
  },
  {
    id: "pb7",
    name: "Newborn Diapers – Ultra-Thin Dry Feel Diapers Size NB (Pack of 72)",
    price: 549,
    category: "Baby Products",
    imageUrl: "https://picsum.photos/seed/newborn-diaper/300/300",
  },
  {
    id: "pb8",
    name: "Baby Wipes – 99% Pure Water Unscented Gentle Wipes (Pack of 3)",
    price: 399,
    category: "Baby Products",
    imageUrl: "https://picsum.photos/seed/baby-wipes/300/300",
  },
  {
    id: "pb9",
    name: "Baby Bath Towel – Hooded Organic Cotton Towel with Washcloth",
    price: 499,
    category: "Baby Products",
    imageUrl: "https://picsum.photos/seed/baby-towel/300/300",
  },
  {
    id: "pb10",
    name: "Baby Lotion – Tear-Free Moisturising Body Lotion for Sensitive Skin",
    price: 279,
    category: "Baby Products",
    imageUrl: "https://picsum.photos/seed/baby-lotion/300/300",
  },
];

// ─── Having Baby Products ─────────────────────────────────────────────────────
const HAVING_BABY_PRODUCTS: Product[] = [
  // Mother Products
  {
    id: "hm1",
    name: "Postpartum Recovery Belt – Abdominal Binder for After Birth Support",
    price: 899,
    category: "Mother Products",
    imageUrl: "https://picsum.photos/seed/postpartum-belt/300/300",
  },
  {
    id: "hm2",
    name: "Nursing Pads – Reusable Organic Cotton Breast Pads (Pack of 8)",
    price: 349,
    category: "Mother Products",
    imageUrl: "https://picsum.photos/seed/nursing-pads/300/300",
  },
  {
    id: "hm3",
    name: "Breast Pump – Electric Double Pump with Soft Silicone Flanges",
    price: 3499,
    category: "Mother Products",
    imageUrl: "https://picsum.photos/seed/breast-pump/300/300",
  },
  {
    id: "hm4",
    name: "Nipple Shields – Ultra-Thin Silicone Shields for Latch Difficulty",
    price: 449,
    category: "Mother Products",
    imageUrl: "https://picsum.photos/seed/nipple-shield/300/300",
  },
  {
    id: "hm5",
    name: "Postpartum Underwear – High-Waist Mesh Recovery Panties (Pack of 5)",
    price: 599,
    category: "Mother Products",
    imageUrl: "https://picsum.photos/seed/postpartum-underwear/300/300",
  },
  {
    id: "hm6",
    name: "Sitz Bath – Portable Perineal Soak Basin for Postpartum Healing",
    price: 499,
    category: "Mother Products",
    imageUrl: "https://picsum.photos/seed/sitz-bath/300/300",
  },
  {
    id: "hm7",
    name: "Perineal Spray – Herbal Cooling Spray for Postpartum Pain Relief",
    price: 349,
    category: "Mother Products",
    imageUrl: "https://picsum.photos/seed/perineal-spray/300/300",
  },
  {
    id: "hm8",
    name: "Lanolin Cream – 100% Pure Nipple Cream for Breastfeeding Mothers",
    price: 399,
    category: "Mother Products",
    imageUrl: "https://picsum.photos/seed/lanolin-cream/300/300",
  },
  {
    id: "hm9",
    name: "Postpartum Heating Pad – Reusable Microwavable Herbal Heat Pack",
    price: 699,
    category: "Mother Products",
    imageUrl: "https://picsum.photos/seed/heating-pad/300/300",
  },
  {
    id: "hm10",
    name: "Nursing Bra – Front-Open Wireless Bra for Easy Breastfeeding",
    price: 549,
    category: "Mother Products",
    imageUrl: "https://picsum.photos/seed/nursing-bra-2/300/300",
  },
  // Baby Products
  {
    id: "hb1",
    name: "Baby Formula – Stage 1 Infant Milk Formula for 0–6 Months",
    price: 1299,
    category: "Baby Products",
    imageUrl: "https://picsum.photos/seed/baby-formula/300/300",
  },
  {
    id: "hb2",
    name: "Baby Bottles – Anti-Colic Wide Neck Feeding Bottles (Set of 3)",
    price: 799,
    category: "Baby Products",
    imageUrl: "https://picsum.photos/seed/baby-bottle/300/300",
  },
  {
    id: "hb3",
    name: "Pacifier – Orthodontic Silicone Soother for Newborns (Pack of 2)",
    price: 299,
    category: "Baby Products",
    imageUrl: "https://picsum.photos/seed/pacifier/300/300",
  },
  {
    id: "hb4",
    name: "Baby Monitor – Portable Audio Baby Monitor with Night Light",
    price: 2499,
    category: "Baby Products",
    imageUrl: "https://picsum.photos/seed/baby-monitor/300/300",
  },
  {
    id: "hb5",
    name: "Baby Swing – Portable Electric Rocker with 5-Speed & Music",
    price: 3999,
    category: "Baby Products",
    imageUrl: "https://picsum.photos/seed/baby-swing/300/300",
  },
  {
    id: "hb6",
    name: "Diaper Rash Cream – Zinc Oxide Barrier Cream for Sensitive Baby Skin",
    price: 249,
    category: "Baby Products",
    imageUrl: "https://picsum.photos/seed/diaper-cream/300/300",
  },
  {
    id: "hb7",
    name: "Baby Carrier – Ergonomic 4-in-1 Infant Carrier with Lumbar Support",
    price: 1799,
    category: "Baby Products",
    imageUrl: "https://picsum.photos/seed/baby-carrier/300/300",
  },
  {
    id: "hb8",
    name: "Baby Nail File – Emery Board & Electric Nail Trimmer Set for Infants",
    price: 349,
    category: "Baby Products",
    imageUrl: "https://picsum.photos/seed/baby-nail-file/300/300",
  },
  {
    id: "hb9",
    name: "Infant Car Seat – Rear-Facing Safety Seat for Newborns 0–13 kg",
    price: 4999,
    category: "Baby Products",
    imageUrl: "https://picsum.photos/seed/car-seat/300/300",
  },
  {
    id: "hb10",
    name: "Baby Sleeping Bag – 2.5 TOG Wearable Blanket Sleep Sack (0–6 Months)",
    price: 899,
    category: "Baby Products",
    imageUrl: "https://picsum.photos/seed/sleeping-bag/300/300",
  },
];

const FILTER_TABS = ["All", "Mother Products", "Baby Products"] as const;
type FilterTab = (typeof FILTER_TABS)[number];

// ─── Component Props ──────────────────────────────────────────────────────────
interface ShoppingPageProps {
  onBack: () => void;
  dashboardType?: "pregnancy" | "having-baby";
}

// ─── Category Badge ───────────────────────────────────────────────────────────
function CategoryBadge({ category }: { category: Product["category"] }) {
  const isMother = category === "Mother Products";
  return (
    <span
      className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full leading-tight"
      style={{
        background: isMother ? "#7B3FA0" : "#EDE9FE",
        color: isMother ? "#ffffff" : "#5B21B6",
      }}
    >
      {category}
    </span>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const amazonUrl = `https://www.amazon.in/s?k=${encodeURIComponent(product.name)}`;

  return (
    <a
      href={amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-200 cursor-pointer hover:shadow-lg"
      style={{
        border: "1px solid #EDE9FE",
        boxShadow: "0 1px 4px rgba(91,41,135,0.08)",
      }}
      data-ocid="shopping.product_card"
      aria-label={`${product.name} – ₹${product.price} – Open on Amazon`}
    >
      {/* Product image */}
      <div
        className="aspect-square w-full overflow-hidden"
        style={{ background: "#F9F7FF" }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://picsum.photos/seed/product-placeholder/300/300";
          }}
        />
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 px-2.5 pb-3 pt-2 gap-1.5">
        {/* Category badge */}
        <CategoryBadge category={product.category} />

        {/* Product name */}
        <p
          className="text-xs font-medium leading-snug line-clamp-3"
          style={{ color: "#1a1a1a" }}
        >
          {product.name}
        </p>

        {/* Price */}
        <p
          className="font-bold text-sm leading-none"
          style={{ color: "#6D28D9" }}
        >
          ₹{product.price.toLocaleString("en-IN")}
        </p>

        {/* Amazon source */}
        <div className="flex items-center gap-1 mt-auto">
          <span
            className="font-extrabold text-xs leading-none"
            style={{ color: "#7B3FA0", fontFamily: "Arial, sans-serif" }}
            aria-hidden="true"
          >
            a
          </span>
          <span className="text-xs leading-none" style={{ color: "#9470B8" }}>
            amazon.in
          </span>
        </div>
      </div>
    </a>
  );
}

// ─── Main ShoppingPage ────────────────────────────────────────────────────────
export default function ShoppingPage({
  onBack,
  dashboardType = "pregnancy",
}: ShoppingPageProps) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("All");

  const baseProducts =
    dashboardType === "having-baby" ? HAVING_BABY_PRODUCTS : PREGNANCY_PRODUCTS;

  const filtered = useMemo(() => {
    return baseProducts.filter((p) => {
      const matchTab = activeTab === "All" || p.category === activeTab;
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      return matchTab && matchSearch;
    });
  }, [baseProducts, activeTab, search]);

  const motherCount = baseProducts.filter(
    (p) => p.category === "Mother Products",
  ).length;
  const babyCount = baseProducts.filter(
    (p) => p.category === "Baby Products",
  ).length;

  const tabCounts: Record<FilterTab, number> = {
    All: baseProducts.length,
    "Mother Products": motherCount,
    "Baby Products": babyCount,
  };

  return (
    <div className="min-h-screen pb-28" style={{ background: "#F5F0FF" }}>
      {/* ── STICKY HEADER ────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-40"
        style={{
          background:
            "linear-gradient(135deg, #5b2987 0%, #9b35b8 60%, #c060cc 100%)",
          boxShadow: "0 4px 24px rgba(91,41,135,0.35)",
        }}
      >
        {/* Title row */}
        <div className="flex items-center gap-3 px-4 pt-3.5 pb-2">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all hover:scale-110 active:scale-95"
            style={{ background: "rgba(255,255,255,0.18)" }}
            aria-label="Go back"
            data-ocid="shopping.back_button"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-bold text-base leading-tight">
              Shopping
            </h1>
            <p className="text-white/70 text-xs">
              {dashboardType === "having-baby"
                ? "Postpartum care & baby essentials"
                : "Maternity care & newborn essentials"}
            </p>
          </div>
          <div
            className="text-xs font-semibold px-3 py-1 rounded-full shrink-0"
            style={{ background: "rgba(255,255,255,0.18)", color: "white" }}
          >
            {filtered.length} items
          </div>
        </div>

        {/* Search bar */}
        <div className="px-4 pb-2.5">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "rgba(255,255,255,0.6)" }}
            />
            <input
              type="search"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "white",
                border: "1.5px solid rgba(255,255,255,0.2)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.22)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
              data-ocid="shopping.search_input"
            />
          </div>
        </div>

        {/* Category filter tabs */}
        <div className="flex gap-2 px-4 pb-3">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all"
              style={{
                background:
                  activeTab === tab ? "white" : "rgba(255,255,255,0.14)",
                color: activeTab === tab ? "#7B3FA0" : "rgba(255,255,255,0.9)",
                boxShadow:
                  activeTab === tab ? "0 2px 10px rgba(0,0,0,0.14)" : "none",
                transform: activeTab === tab ? "translateY(-1px)" : "none",
              }}
              data-ocid={`shopping.filter_${tab.toLowerCase().replace(/\s+/g, "_")}`}
              aria-pressed={activeTab === tab}
            >
              <span>{tab}</span>
              <span className="opacity-60">({tabCounts[tab]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── PRODUCT GRID ──────────────────────────────────────────── */}
      <div className="px-3 pt-4">
        {filtered.length === 0 ? (
          <div
            className="text-center py-16 rounded-2xl mt-2 bg-white"
            style={{ border: "1px solid #e5dff5" }}
            data-ocid="shopping.empty_state"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
              style={{ background: "#F3E8FF" }}
            >
              <Package size={24} style={{ color: "#8B5CF6" }} />
            </div>
            <p className="font-bold text-sm mb-1" style={{ color: "#3A1A5A" }}>
              No products found
            </p>
            <p className="text-xs" style={{ color: "#A080B8" }}>
              Try a different search or filter
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Footer note */}
        {filtered.length > 0 && (
          <p
            className="text-center text-xs mt-6 mb-2 pb-2"
            style={{ color: "#9470B8" }}
          >
            Tap any product to shop on Amazon.in
          </p>
        )}
      </div>
    </div>
  );
}
