import { useState, useMemo, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import catalogData from "../data/catalog.json";

// ─── TYPES ──────────────────────────────────────────────────────────────────────
interface CatalogFile {
  name: string;
  path: string;
}

interface CatalogProduct {
  _files?: CatalogFile[];
  [key: string]: unknown;
}

interface CatalogIndustry {
  [productName: string]: CatalogProduct;
}

// ─── DATA ───────────────────────────────────────────────────────────────────────
const SHELL_FAMILIES = [
  {
    family: "Argina – Marine Engine Oil",
    icon: "🚢",
    desc: "Premium trunk piston engine oil designed for medium-speed marine diesel engines.",
    image: "/assets/shell/_industries/argina.png",
    products: [
      { name: "Argina X 40",  tds: "#", msds: "#" },
      { name: "Argina XL 40", tds: "#", msds: "#" },
    ],
    brochures: [
      { label: "Shell Argina Brochure", path: "/assets/shell/brochures/ARGINA/Shell Argina Brochure.pdf", type: "brochure" as const },
    ],
  },
  {
    family: "Corena – Compressor Oil",
    icon: "💨",
    desc: "High-performance air compressor oils to ensure long equipment life.",
    image: "/assets/shell/_industries/corena.png",
    products: [
      { name: "Shell Corena S2 P 100", tds: "#", msds: "#" },
      { name: "Shell Corena S2 P 150", tds: "#", msds: "#" },
      { name: "Shell Corena S3 R 68",  tds: "#", msds: "#" },
      { name: "Shell Corena S4 R 68",  tds: "#", msds: "#" },
    ],
    brochures: [
      { label: "Portfolio Brochure",    path: "/assets/shell/brochures/CORENA/Shell Corena Portfolio brochure.pdf", type: "brochure" as const },
      { label: "Corena S2 P Leaflet",   path: "/assets/shell/brochures/CORENA/Shell Corena S2 P Leaflet.pdf", type: "leaflet" as const },
      { label: "Corena S4 R Leaflet",   path: "/assets/shell/brochures/CORENA/Shell Corena S4 R Leaflet.pdf", type: "leaflet" as const },
      { label: "S2P Brochure",          path: "/assets/shell/brochures/Corena Air Compressor Oil/Brochures/S2P.pdf", type: "brochure" as const },
      { label: "S2R Brochure",          path: "/assets/shell/brochures/Corena Air Compressor Oil/Brochures/S2R.pdf", type: "brochure" as const },
      { label: "S3R Brochure",          path: "/assets/shell/brochures/Corena Air Compressor Oil/Brochures/S3R.pdf", type: "brochure" as const },
      { label: "S4P Brochure",          path: "/assets/shell/brochures/Corena Air Compressor Oil/Brochures/S4P.pdf", type: "brochure" as const },
      { label: "S4R Brochure",          path: "/assets/shell/brochures/Corena Air Compressor Oil/Brochures/S4R.pdf", type: "brochure" as const },
    ],
  },
  {
    family: "Gadus – Grease",
    icon: "⚙️",
    desc: "Lithium and specialty greases for enhanced wear protection in bearings and joints.",
    image: "/assets/shell/_industries/gadus.png",
    products: [
      { name: "Shell Gadus S1 V100 2.5",  tds: "#", msds: "#" },
      { name: "Shell Gadus S1 V150D 2",   tds: "#", msds: "#" },
      { name: "Shell Gadus S1 V160 3",    tds: "#", msds: null },
      { name: "Shell Gadus S2 U 1000D2",  tds: "#", msds: "#" },
      { name: "Shell Gadus S2 V100 2",    tds: "#", msds: "#" },
      { name: "Shell Gadus S2 V220 0",    tds: "#", msds: "#" },
      { name: "Shell Gadus S2 V220AC",    tds: "#", msds: null },
      { name: "Shell Gadus S3 T220 2",    tds: "#", msds: "#" },
      { name: "Shell Gadus S3 V220C2",    tds: "#", msds: "#" },
      { name: "Shell Gadus S3 V460D 2",   tds: "#", msds: "#" },
      { name: "Shell Gadus S5 V100 2",    tds: "#", msds: "#" },
    ],
    brochures: [
      { label: "Industrial Greases Brochure", path: "/assets/shell/brochures/GADUS/Industrial Greases Brochure.pdf", type: "brochure" as const },
      { label: "Portfolio Brochure",           path: "/assets/shell/brochures/GADUS/Shell Gadus Portfolio brochure.pdf", type: "brochure" as const },
      { label: "Gadus S2 V100 Leaflet",        path: "/assets/shell/brochures/GADUS/Shell Gadus S2 V100 leaflet.pdf", type: "leaflet" as const },
      { label: "Gadus S2 V220 AC Leaflet",     path: "/assets/shell/brochures/GADUS/Shell Gadus S2 V220 AC leaflet.pdf", type: "leaflet" as const },
      { label: "Gadus S2 V220 AD",             path: "/assets/shell/brochures/GADUS/Shell Gadus S2 V220 AD.pdf", type: "leaflet" as const },
      { label: "Gadus S2 V220 Leaflet",        path: "/assets/shell/brochures/GADUS/Shell Gadus S2 V220 leaflet.pdf", type: "leaflet" as const },
      { label: "Gadus S3 V100 Leaflet",        path: "/assets/shell/brochures/GADUS/Shell Gadus S3 V100 leaflet.pdf", type: "leaflet" as const },
      { label: "Gadus S3 V220 C Leaflet",      path: "/assets/shell/brochures/GADUS/Shell Gadus S3 V220 C leaflet.pdf", type: "leaflet" as const },
      { label: "Gadus S3 V460 D Leaflet",      path: "/assets/shell/brochures/GADUS/Shell Gadus S3 V460 D leaflet.pdf", type: "leaflet" as const },
      { label: "Gadus S3 V460 Leaflet",        path: "/assets/shell/brochures/GADUS/Shell Gadus S3 V460 leaflet.pdf", type: "leaflet" as const },
    ],
  },
  {
    family: "Mysella – Gas Engine Oil",
    icon: "🔥",
    desc: "Premium quality oil for stationary gas engines running on natural gas.",
    image: "/assets/shell/_industries/mysella.png",
    products: [
      { name: "Mysella S3 N 40", tds: "#", msds: null },
      { name: "Mysella S3 S 40", tds: "#", msds: null },
      { name: "Mysella S5 N 40", tds: "#", msds: null },
    ],
    brochures: [
      { label: "Mysella MA Leaflet",           path: "/assets/shell/brochures/MYSELLA/Shell Mysella MA leaflet.pdf", type: "leaflet" as const },
      { label: "Mysella Transition Chart",      path: "/assets/shell/brochures/MYSELLA/Shell_ Mysella_transistion_chart_low.pdf", type: "brochure" as const },
      { label: "Mysella Family Brochure",       path: "/assets/shell/brochures/MYSELLA/Shell_Mysella_family_brochure_low.pdf", type: "brochure" as const },
    ],
  },
  {
    family: "Rimula – Heavy Duty Engine Oil",
    icon: "🚚",
    desc: "Heavy-duty diesel engine oil designed for exceptional wear protection under harsh conditions.",
    image: "/assets/shell/_industries/rimula.png",
    products: [
      { name: "Shell Rimula R1 20W40",    tds: "#", msds: "#" },
      { name: "Shell Rimula R2 15W40",    tds: "#", msds: "#" },
      { name: "Shell Rimula R2 30",       tds: "#", msds: "#" },
      { name: "Shell Rimula R3 10W",      tds: "#", msds: "#" },
      { name: "Shell Rimula R3 X 15W40",  tds: "#", msds: "#" },
      { name: "Shell Rimula R4 15W40",    tds: "#", msds: "#" },
      { name: "Shell Rimula R6 M 10W40",  tds: "#", msds: "#" },
    ],
    brochures: [
      { label: "Rimula R5 LE One Pager",        path: "/assets/shell/brochures/RIMULA/Rimula R5 LE One Pager_B2B.pdf", type: "leaflet" as const },
      { label: "Rimula Product Portfolio",       path: "/assets/shell/brochures/RIMULA/Shell Rimula Brochure_VerB-Rimula Product Portfolio.pdf", type: "brochure" as const },
    ],
  },
  {
    family: "Tellus – Hydraulic Oil",
    icon: "🗜️",
    desc: "Premium hydraulic fluids that help maintain system efficiency and equipment life.",
    image: "/assets/shell/_industries/corena.png",
    products: [
      { name: "Shell Tellus S2 M 32",  tds: "#", msds: null },
      { name: "Shell Tellus S2 M 46",  tds: "#", msds: null },
      { name: "Shell Tellus S2 M 68",  tds: "#", msds: null },
      { name: "Shell Tellus S2 M 100", tds: "#", msds: null },
      { name: "Shell Tellus S2 MX 32", tds: "#", msds: null },
      { name: "Shell Tellus S2 MX 46", tds: "#", msds: "#" },
      { name: "Shell Tellus S2 MX 68", tds: "#", msds: "#" },
      { name: "Shell Tellus S3 M 46",  tds: "#", msds: null },
      { name: "Shell Tellus S3 V 46",  tds: "#", msds: null },
      { name: "Shell Tellus S4 ME 46", tds: "#", msds: "#" },
    ],
    brochures: [
      { label: "Tellus Portfolio Brochure",     path: "/assets/shell/brochures/TELLUS/Shell_Tellus_Potfolio_Brochure.pdf", type: "brochure" as const },
      { label: "Tellus Product Leaflets",       path: "/assets/shell/brochures/TELLUS/Shell_Tellus_Product_Leaflets.pdf", type: "leaflet" as const },
    ],
  },
  {
    family: "Omala – Gear Oil",
    icon: "⚙️",
    desc: "Advanced industrial gear oils designed to reduce friction and lower operating temperatures.",
    image: "/assets/shell/_industries/gadus.png",
    products: [
      { name: "Shell Omala S2 G 100",  tds: "#", msds: "#" },
      { name: "Shell Omala S2 G 150",  tds: "#", msds: "#" },
      { name: "Shell Omala S2 G 220",  tds: "#", msds: "#" },
      { name: "Shell Omala S2 G 320",  tds: "#", msds: "#" },
      { name: "Shell Omala S2 G 460",  tds: "#", msds: "#" },
      { name: "Shell Omala S4 GX 220", tds: "#", msds: "#" },
      { name: "Shell Omala S4 GX 320", tds: "#", msds: "#" },
      { name: "Shell Omala S4 WE 220", tds: "#", msds: "#" },
      { name: "Shell Omala S4 WE 320", tds: "#", msds: "#" },
    ],
    brochures: [
      { label: "Omala Brochure",           path: "/assets/shell/brochures/OMALA/Shell Omala Brochure.pdf", type: "brochure" as const },
      { label: "Omala Portfolio Brochure",  path: "/assets/shell/brochures/OMALA/Shell Omala Portfolio Brochure.pdf", type: "brochure" as const },
      { label: "Omala S2 G Leaflets",      path: "/assets/shell/brochures/OMALA/Shell Omala S2 G Leaflets.pdf", type: "leaflet" as const },
      { label: "Omala S4 GX Leaflet",      path: "/assets/shell/brochures/OMALA/Shell Omala S4 GX leaflet.pdf", type: "leaflet" as const },
      { label: "Omala S4 WE Leaflets",     path: "/assets/shell/brochures/OMALA/Shell Omala S4 WE Leaflets.pdf", type: "leaflet" as const },
    ],
  },
  {
    family: "Morlina – Bearing Oil",
    icon: "🔄",
    desc: "High quality bearing and circulating oils for industrial applications.",
    image: "/assets/shell/_industries/gadus.png",
    products: [
      { name: "Shell Morlina S1 B 100", tds: "#", msds: "#" },
      { name: "Shell Morlina S1 B 150", tds: "#", msds: "#" },
      { name: "Shell Morlina S1 B 220", tds: "#", msds: "#" },
      { name: "Shell Morlina S1 B 320", tds: "#", msds: "#" },
      { name: "Shell Morlina S2 B 220", tds: "#", msds: "#" },
    ],
    brochures: [
      { label: "Morlina Portfolio Brochure", path: "/assets/shell/brochures/MORLINA/Shell Morlina Portfolio brochure.pdf", type: "brochure" as const },
      { label: "Morlina S2 B Leaflet",      path: "/assets/shell/brochures/MORLINA/Shell Morlina S2 B leaflet.pdf", type: "leaflet" as const },
      { label: "Morlina S2 BA Leaflet",     path: "/assets/shell/brochures/MORLINA/Shell Morlina S2 BA leaflet.pdf", type: "leaflet" as const },
    ],
  },
  {
    family: "Turbin – Turbine Oil",
    icon: "⚡",
    desc: "Turbine oils formulated to protect against wear and bearing corrosion.",
    image: "/assets/shell/_industries/mysella.png",
    products: [
      { name: "Shell Turbo T 32", tds: "#", msds: "#" },
      { name: "Shell Turbo T 46", tds: "#", msds: "#" },
      { name: "Shell Turbo T 68", tds: "#", msds: "#" },
    ],
    brochures: [
      { label: "Turbo Family Brochure", path: "/assets/shell/brochures/TURBO/Shell Turbo Product Family Brochure.pdf", type: "brochure" as const },
      { label: "Turbo T Leaflet",       path: "/assets/shell/brochures/TURBO/Shell Turbo T leaflet.pdf", type: "leaflet" as const },
    ],
  },
  {
    family: "Spirax – Transmission Oil",
    icon: "🚘",
    desc: "Axle, gear, and automatic transmission fluids for heavy duty driveline components.",
    image: "/assets/shell/_industries/gadus.png",
    products: [
      { name: "Shell Spirax S2 A 85W140",   tds: "#", msds: "#" },
      { name: "Shell Spirax S2 G 80W90",    tds: "#", msds: "#" },
      { name: "Shell Spirax S6 AXME 75W90", tds: "#", msds: "#" },
      { name: "Spirax S1 ATF TASA",         tds: "#", msds: "#" },
    ],
    brochures: [
      { label: "Spirax Portfolio Brochure",  path: "/assets/shell/brochures/SPIREX/Shell Spirax Portfolio brochure.pdf", type: "brochure" as const },
      { label: "Spirax S2 A Leaflet",        path: "/assets/shell/brochures/SPIREX/Shell Spirax S2 A leaflet.pdf", type: "leaflet" as const },
      { label: "Spirax S2 G Leaflet",        path: "/assets/shell/brochures/SPIREX/Shell Spirax S2 G leaflet.pdf", type: "leaflet" as const },
      { label: "Spirax S5 ATF X Leaflet",    path: "/assets/shell/brochures/SPIREX/Shell Spirax S5 ATF X leaflet.pdf", type: "leaflet" as const },
      { label: "Spirax S6 ATF VM Leaflet",   path: "/assets/shell/brochures/SPIREX/Shell Spirax S6 ATF VM leaflet.pdf", type: "leaflet" as const },
      { label: "Spirax S6 AXME Leaflet",     path: "/assets/shell/brochures/SPIREX/Shell Spirax S6 AXME leaflet.pdf", type: "leaflet" as const },
    ],
  },
  {
    family: "Tonna – Slide Way Oil",
    icon: "🔧",
    desc: "Specially designed for the lubrication of machine tool slideways and feed mechanisms.",
    image: "/assets/shell/_industries/argina.png",
    products: [
      { name: "Shell Tonna S2 M 68", tds: "#", msds: "#" },
    ],
    brochures: [
      { label: "Tonna S2 Leaflet", path: "/assets/shell/brochures/TONNA/Shell Tonna S2 leaflet.pdf", type: "leaflet" as const },
    ],
  },
  {
    family: "Heat Transfer Oil",
    icon: "🌡️",
    desc: "High-performance heat transfer fluids for enclosed circulation systems.",
    image: "/assets/shell/_industries/corena.png",
    products: [
      { name: "Shell Heat Transfer Oil S2", tds: "#", msds: "#" },
    ],
    brochures: [
      { label: "Heat Transfer Oil Brochure",  path: "/assets/shell/brochures/HTO/Shell Heat transfer oil.pdf", type: "brochure" as const },
      { label: "Thermax Approval",             path: "/assets/shell/brochures/HTO/Thermax aproval.pdf", type: "brochure" as const },
    ],
  },
  {
    family: "Refrigeration Oil",
    icon: "❄️",
    desc: "Advanced refrigeration compressor oils suitable for varied refrigerants.",
    image: "/assets/shell/_industries/corena.png",
    products: [
      { name: "Shell Refrigeration Oil FR V 68", tds: "#", msds: "#" },
    ],
    brochures: [],
  },
];

// Tyrolit industry definitions — mapped to catalog.json keys and local images
const TYROLIT_INDUSTRIES = [
  {
    industry: "Automotive Industry",
    catalogKey: "Automotive Industry",
    icon: "🔩",
    desc: "Precision grinding solutions for the production of automotive parts with the highest dimensional accuracy.",
    image: "/assets/tyrolit/_industries/automotive.webp",
    imageDir: "automotive",
  },
  {
    industry: "Bearing Industry",
    catalogKey: "Bearing Industry",
    icon: "⚙️",
    desc: "Tailored grinding tools for cost-effective solutions across the entire bearing production process.",
    image: "/assets/tyrolit/_industries/bearing.webp",
    imageDir: "bearing",
  },
  {
    industry: "Precision Industry",
    catalogKey: "Precision Industry",
    icon: "🎯",
    desc: "Extensive range of tools and system solutions for precision engineering applications, including watchmaking and micro-grinding.",
    image: "/assets/tyrolit/_industries/precision.webp",
    imageDir: "precision",
  },
  {
    industry: "Steel & Foundry",
    catalogKey: "Steel and Foundry Industry",
    icon: "🏭",
    desc: "Market-leading solutions for machining high-alloyed steels with years of proven expertise.",
    image: "/assets/tyrolit/_industries/steel-foundry.webp",
    imageDir: "steel-foundry",
  },
  {
    industry: "Tooling Industry",
    catalogKey: "Tooling Industry",
    icon: "🔧",
    desc: "System supplier to tool manufacturers offering particularly versatile and durable grinding solutions.",
    image: "/assets/tyrolit/_industries/tooling.webp",
    imageDir: "tooling",
  },
  {
    industry: "Medical Technology",
    catalogKey: "Medical Technology",
    icon: "⚕️",
    desc: "Competent partner with numerous system solutions for the exacting demands of medical device manufacturing.",
    image: "/assets/tyrolit/_industries/medical.webp",
    imageDir: "medical",
  },
  {
    industry: "Turbine Industry",
    catalogKey: "Turbine Industry",
    icon: "✈️",
    desc: "Specialised high-precision grinding solutions for manufacturers of aircraft and industrial gas turbines.",
    image: "/assets/tyrolit/_industries/turbine.png",
    imageDir: "turbine",
  },
  {
    industry: "Technical Ceramics",
    catalogKey: "Technical Ceramics",
    icon: "🧱",
    desc: "Diamond and CBN grinding solutions for manufacturers of engineering ceramics, seals, and precision insulators.",
    image: "/assets/tyrolit/_industries/ceramics.png",
    imageDir: "ceramics",
  },
  {
    industry: "Foundry Industry",
    catalogKey: "Foundry Industry",
    icon: "🔥",
    desc: "Metal casting support — from melting iron and steel to mold-finishing of end products.",
    image: "/assets/tyrolit/_industries/foundry.webp",
    imageDir: "foundry",
  },
];

// Map product names from catalog.json to local image file paths
// Source: Mirrored from pjenterprise.in via Master Crawler V2 (April 2026)
const TYROLIT_PRODUCT_IMAGES: Record<string, Record<string, string>> = {
  "Automotive Industry": {
    "Chassis Components":                       "/assets/tyrolit/automotive/chassis-components.jpg",
    "Compressors And Turbocharger Components":   "/assets/tyrolit/automotive/compressors-and-turbocharger.jpg",
    "Con Rods":                                  "/assets/tyrolit/automotive/con-rods.jpg",
    "Crankshafts And Camshafts":                 "/assets/tyrolit/automotive/crankshafts-and-camshafts-hires.png",
    "Fuel Injection Components":                 "/assets/tyrolit/automotive/fuel-injection-components.jpg",
    "Transmission Components":                   "/assets/tyrolit/automotive/transmission-components.jpg",
    "Valves":                                    "/assets/tyrolit/automotive/valves-hires.png",
  },
  "Bearing Industry": {
    "Rolling Bearing Rings":           "/assets/tyrolit/bearing/rolling-bearing-rings-hires.png",
    "Taper Rollers":                   "/assets/tyrolit/bearing/taper-rollers.jpg",
    "Cylindrical Rollers And Needles": "/assets/tyrolit/bearing/cylindrical-rollers.jpg",
    "Spherical Rollers 2":             "/assets/tyrolit/bearing/spherical-rollers.jpg",
    "Guide Rails":                     "/assets/tyrolit/bearing/guide-rails.jpg",
  },
  "Foundry Industry": {
    "Automatic Fettling":             "/assets/tyrolit/foundry/automatic-fettling.png",
    "Off Hand Grinding":              "/assets/tyrolit/foundry/off-hand-grinding.jpg",
    "Off Hand Cutting":               "/assets/tyrolit/foundry/off-hand-cutting.jpg",
    "Pedestal And Pendular Grinding": "/assets/tyrolit/foundry/pedestal-pendular-grinding.jpg",
    "Stationary Cut Off Grinding":    "/assets/tyrolit/foundry/stationary-cut-off.jpg",
  },
  "Medical Technology": {
    "Grinding And Polishing Hip And Knee Joints": "/assets/tyrolit/medical/hip-knee-joints.jpg",
    "Implants And Medical Instruments":            "/assets/tyrolit/medical/implants-instruments.jpg",
    "Scissors And Scalpels":                       "/assets/tyrolit/medical/scissors-scalpels.jpg",
    "Scissors And Scalpels 2":                     "/assets/tyrolit/medical/scissors-scalpels.jpg",
  },
  "Steel and Foundry Industry": {
    "Centreless Grinding":   "/assets/tyrolit/steel-foundry/centreless-grinding.jpg",
    "Cut Off Grind":         "/assets/tyrolit/steel-foundry/cut-off-grinding.png",
    "High Pressure Grinding":"/assets/tyrolit/steel-foundry/high-pressure.jpg",
    "Roll Grinding":         "/assets/tyrolit/steel-foundry/roll-grinding.jpg",
  },
  "Tooling Industry": {
    "Bandsaws And Circular Saws": "/assets/tyrolit/tooling/bandsaws-circular.jpg",
    "Cutting Inserts":            "/assets/tyrolit/tooling/cutting-inserts.jpg",
    "Rotating Tools":             "/assets/tyrolit/tooling/rotating-tools.jpg",
  },
  // ── Newly unlocked industries (sourced from Master Crawler V2) ──────────────
  "Turbine Industry": {
    "Strato Ultra":  "/assets/tyrolit/turbine/strato-ultra.png",
    "Polaris LW":    "/assets/tyrolit/turbine/polaris-lw.png",
    "Secur XT":      "/assets/tyrolit/turbine/secur-xt.png",
    "Viper Ultra":   "/assets/tyrolit/turbine/strato-ultra.png",
    "Strato Alpha":  "/assets/tyrolit/turbine/polaris-lw.png",
    "Strato SA 2":   "/assets/tyrolit/turbine/secur-xt.png",
  },
  "Technical Ceramics": {
    "Diamond VIB Star":          "/assets/tyrolit/ceramics/diamond-vib.png",
    "Solotec":                   "/assets/tyrolit/ceramics/solotec.png",
    "Double Disc Grinding Wheels":"/assets/tyrolit/ceramics/solotec.png",
    "1A1R Diamond Wheel":        "/assets/tyrolit/ceramics/diamond-vib.png",
  },
  "Precision Industry": {
    "Centuria":                    "/assets/tyrolit/precision/centuria.png",
    "Columbia 2":                  "/assets/tyrolit/precision/columbia.png",
    "Elastic Wheel For Watchmaking":"/assets/tyrolit/precision/centuria.png",
    "CSS Regulator":               "/assets/tyrolit/precision/columbia.png",
  },
};

// ─── ENQUIRY MODAL ────────────────────────────────────────────────────────────
function EnquiryModal({ product, onClose }: { product: { name: string; family: string }; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", qty: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 pt-24"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden mt-16 sm:mt-0 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1">Product Enquiry</p>
            <h3 className="font-bold text-lg leading-tight">{product.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{product.family}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white mt-1 text-xl leading-none flex-shrink-0 cursor-pointer">✕</button>
        </div>

        {sent ? (
          <div className="px-6 py-10 text-center">
            <div className="text-4xl mb-3">✅</div>
            <h4 className="font-bold text-lg mb-1">Enquiry Sent!</h4>
            <p className="text-sm text-slate-500">We'll get back to you shortly.</p>
            <button onClick={onClose} className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-700 transition-colors cursor-pointer">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Your Name *</label>
                <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="Full name" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Company</label>
                <input value={form.company} onChange={e => setForm(f => ({...f, company: e.target.value}))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="Company name" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Email *</label>
              <input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="you@company.com" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Phone</label>
                <input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="+91 ..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Quantity (L / Kg)</label>
                <input value={form.qty} onChange={e => setForm(f => ({...f, qty: e.target.value}))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="e.g. 200 L" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Message</label>
              <textarea rows={3} value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none" placeholder="Any specific requirements..." />
            </div>
            <button type="submit"
              className="w-full bg-brand-500 hover:bg-brand-600 active:scale-[.98] cursor-pointer text-white font-bold py-2.5 rounded-lg text-sm transition-all focus:ring-2 focus:ring-brand-400 focus:outline-none">
              Send Enquiry →
            </button>
            <p className="text-center text-xs text-slate-400">or call us at <a href="tel:+919979856997" className="text-brand-600 font-semibold hover:text-brand-700">+91 99798 56997</a></p>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── SHELL PRODUCT CARD ───────────────────────────────────────────────────────
function ShellCard({ product, onEnquire }: { product: { name: string; family: string; tds: string | null; msds: string | null }; onEnquire: (p: any) => void }) {
  return (
    <div className="group bg-white border border-slate-100 rounded-xl p-4 hover:shadow-md hover:border-brand-300 transition-all duration-200 flex flex-col gap-3">
      <div>
        <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">{product.family}</p>
        <h3 className="font-bold text-slate-900 text-sm leading-snug">{product.name}</h3>
      </div>

      {/* Document buttons */}
      <div className="flex flex-wrap gap-1.5">
        {product.tds && (
          <a href={product.tds} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 transition-colors">
            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor"><path d="M4 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V5.5L9.5 0H4zm5 1.5L13.5 6H10a1 1 0 01-1-1V1.5z"/></svg>
            TDS
          </a>
        )}
        {product.msds && (
          <a href={product.msds} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100 transition-colors">
            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a1 1 0 110 2 1 1 0 010-2zm-.75 3h1.5v4h-1.5V7z"/></svg>
            MSDS
          </a>
        )}
      </div>

      {/* Enquire button */}
      <button
        onClick={() => onEnquire(product)}
        className="mt-auto w-full py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:border-brand-400 hover:text-brand-700 hover:bg-brand-50 transition-all cursor-pointer">
        Enquire about this product
      </button>
    </div>
  );
}

// ─── SHELL BROCHURE BAR ───────────────────────────────────────────────────────
function ShellBrochureBar({ brochures }: { brochures: { label: string; path: string; type: "brochure" | "leaflet" }[] }) {
  if (!brochures || brochures.length === 0) return null;

  const brochureItems = brochures.filter(b => b.type === "brochure");
  const leafletItems  = brochures.filter(b => b.type === "leaflet");

  return (
    <div className="mb-6 bg-gradient-to-br from-brand-50 via-white to-amber-50 border border-brand-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-brand-500 text-white flex items-center justify-center text-sm">
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><path d="M4 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V5.5L9.5 0H4zm5 1.5L13.5 6H10a1 1 0 01-1-1V1.5z"/></svg>
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Family Documents</h3>
          <p className="text-[11px] text-slate-500">Brochures, leaflets & product portfolios</p>
        </div>
      </div>

      {brochureItems.length > 0 && (
        <div className="mb-3">
          <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">Brochures & Portfolios</p>
          <div className="flex flex-wrap gap-2">
            {brochureItems.map((b, i) => (
              <a
                key={i}
                href={b.path}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg bg-brand-100 text-brand-800 border border-brand-200 hover:bg-brand-200 hover:border-brand-300 hover:shadow-sm transition-all group"
              >
                <svg className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 16 16" fill="currentColor"><path d="M4 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V5.5L9.5 0H4zm5 1.5L13.5 6H10a1 1 0 01-1-1V1.5z"/></svg>
                {b.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {leafletItems.length > 0 && (
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">Product Leaflets</p>
          <div className="flex flex-wrap gap-2">
            {leafletItems.map((b, i) => (
              <a
                key={i}
                href={b.path}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm transition-all group"
              >
                <svg className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a.5.5 0 01.5.5V11h3.793l-4.147 4.146a.5.5 0 01-.707 0L3.293 11.5H7V1.5A.5.5 0 018 1z"/></svg>
                {b.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SHELL FAMILY CARD (outer level) ──────────────────────────────────────────
function ShellFamilyCard({ item, onClick }: { item: typeof SHELL_FAMILIES[0]; onClick: () => void }) {
  const hasProducts = item.products.length > 0;
  return (
    <div
      className={`bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-lg hover:border-brand-300 transition-all duration-300 flex flex-col ${hasProducts ? "cursor-pointer" : ""}`}
      onClick={hasProducts ? onClick : undefined}
    >
      <div className="w-full h-40 bg-slate-100 overflow-hidden">
        <img
          src={item.image}
          alt={item.family}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center text-xl flex-shrink-0">{item.icon}</div>
          <div>
            <h3 className="font-bold text-slate-900 text-base leading-tight mb-1">{item.family.replace(/ – .*/, "")}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        </div>

        {hasProducts ? (
          <button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="mt-auto w-full py-2 rounded-lg border border-brand-500 text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-500 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2">
            View Products
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
          </button>
        ) : (
          <div className="mt-auto w-full py-2 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-400 text-center">
            Coming Soon
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TYROLIT INDUSTRY CARD (outer level) ──────────────────────────────────────
function TyrolitIndustryCard({ item, onClick }: { item: typeof TYROLIT_INDUSTRIES[0]; onClick: () => void }) {
  const hasProducts = item.catalogKey !== null;
  return (
    <div
      className={`bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col ${hasProducts ? "cursor-pointer" : ""}`}
      onClick={hasProducts ? onClick : undefined}
    >
      {/* Industry thumbnail image */}
      <div className="w-full h-40 bg-slate-100 overflow-hidden">
        <img
          src={item.image}
          alt={item.industry}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl flex-shrink-0">{item.icon}</div>
          <div>
            <h3 className="font-bold text-slate-900 text-base leading-tight mb-1">{item.industry}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        </div>

        {hasProducts ? (
          <button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="mt-auto w-full py-2 rounded-lg border border-slate-800 text-xs font-bold text-slate-800 bg-slate-50 hover:bg-slate-900 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2">
            View Products
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
          </button>
        ) : (
          <div className="mt-auto w-full py-2 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-400 text-center">
            Coming Soon
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TYROLIT PRODUCT CARD (inner level – uniform with ShellCard) ─────────────
function TyrolitProductCard({
  productName,
  industryName,
  image,
  files,
  onEnquire,
}: {
  productName: string;
  industryName: string;
  image: string | null;
  files: CatalogFile[];
  onEnquire: (p: any) => void;
}) {
  return (
    <div className="group bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col">
      {/* Product image */}
      {image && (
        <div className="w-full h-36 bg-slate-50 overflow-hidden">
          <img
            src={image}
            alt={productName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">{industryName}</p>
          <h3 className="font-bold text-slate-900 text-sm leading-snug">{productName}</h3>
        </div>

        {/* Brochure download badges */}
        {files.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {files.map((f, i) => (
              <a
                key={i}
                href={`/${f.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-100 hover:bg-amber-100 transition-colors"
              >
                <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor"><path d="M4 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V5.5L9.5 0H4zm5 1.5L13.5 6H10a1 1 0 01-1-1V1.5z"/></svg>
                {f.name.includes("Brochure") ? "Brochure" : f.name.split(" ").pop()}
              </a>
            ))}
          </div>
        )}

        {/* Enquire button */}
        <button
          onClick={() => onEnquire({ name: productName, family: industryName, tds: null, msds: null })}
          className="mt-auto w-full py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:border-slate-800 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer">
          Enquire about this product
        </button>
      </div>
    </div>
  );
}

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
function EmptyState({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm col-span-full">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4 text-slate-400 text-3xl">
        🔍
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">No products found</h3>
      <p className="text-slate-500">We couldn't find any matches for "{query}".</p>
      <button 
        onClick={onClear}
        className="mt-4 px-4 py-2 text-sm font-semibold text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 transition-colors cursor-pointer">
        Clear search
      </button>
    </div>
  );
}

// ─── MAIN CATALOG ─────────────────────────────────────────────────────────────
export default function Catalog() {
  const [searchParams] = useSearchParams();
  const initialBrandParam = searchParams.get('brand');
  
  const [brand, setBrand] = useState(initialBrandParam?.toLowerCase() === 'tyrolit' ? "tyrolit" : "shell");
  const [activeShellFamily, setActiveShellFamily] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [enquiryProduct, setEnquiryProduct] = useState<{ name: string; family: string } | null>(null);
  const [activeTyrolitIndustry, setActiveTyrolitIndustry] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Sync state with URL changes if navigation occurs
  useEffect(() => {
    const b = searchParams.get('brand');
    if (b) {
      setBrand(b.toLowerCase() === 'tyrolit' ? "tyrolit" : "shell");
      setActiveShellFamily(null);
      setActiveTyrolitIndustry(null);
    }
  }, [searchParams]);

  // Flat list of all Shell products for filtering
  const allShellProducts = useMemo(() =>
    SHELL_FAMILIES.flatMap(f => f.products.map(p => ({ ...p, family: f.family }))),
  []);

  const filteredShellProducts = useMemo(() => {
    let list = allShellProducts;
    if (activeShellFamily) list = list.filter(p => p.family === activeShellFamily);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.family.toLowerCase().includes(q));
    }
    return list;
  }, [allShellProducts, activeShellFamily, query]);

  const filteredShellFamilies = useMemo(() => {
    if (!query.trim()) return SHELL_FAMILIES;
    const q = query.toLowerCase();
    return SHELL_FAMILIES.filter(f => f.family.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q));
  }, [query]);

  const filteredTyrolit = useMemo(() => {
    if (!query.trim()) return TYROLIT_INDUSTRIES;
    const q = query.toLowerCase();
    return TYROLIT_INDUSTRIES.filter(t => t.industry.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q));
  }, [query]);

  // Tyrolit inner products for the selected industry
  const tyrolitInnerProducts = useMemo(() => {
    if (!activeTyrolitIndustry) return [];
    const industry = TYROLIT_INDUSTRIES.find(t => t.industry === activeTyrolitIndustry);
    if (!industry?.catalogKey) return [];

    const tyrolitCatalog = (catalogData as Record<string, Record<string, CatalogIndustry>>).Tyrolit;
    const industryData = tyrolitCatalog?.[industry.catalogKey];
    if (!industryData) return [];

    const products = Object.entries(industryData).map(([productName, productData]) => {
      const files = (productData as CatalogProduct)?._files || [];
      const imageMap = TYROLIT_PRODUCT_IMAGES[industry.catalogKey!];
      const image = imageMap?.[productName] || null;
      return { productName, files: files as CatalogFile[], image, industryName: activeTyrolitIndustry };
    });

    if (query.trim()) {
      const q = query.toLowerCase();
      return products.filter(p => p.productName.toLowerCase().includes(q));
    }

    return products;
  }, [activeTyrolitIndustry, query]);

  const switchBrand = (b: string) => {
    setBrand(b);
    setActiveShellFamily(null);
    setQuery("");
    setActiveTyrolitIndustry(null);
    searchRef.current?.focus();
  };

  const drillIntoIndustry = (industryName: string) => {
    setActiveTyrolitIndustry(industryName);
    setQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const drillIntoShellFamily = (familyName: string) => {
    setActiveShellFamily(familyName);
    setQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToGrid = () => {
    setActiveTyrolitIndustry(null);
    setActiveShellFamily(null);
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-24 pb-20">
      <SEO 
        title={`${brand === 'shell' ? 'Shell Lubricants' : 'Tyrolit Precision'} Catalog | PJ Enterprise`} 
        description="Browse our comprehensive product catalog for industrial lubricants, machining solutions, and more."
        path="/catalog"
      />

      {/* ── Brand tabs ── */}
      <div className="bg-white border-b border-slate-200 sticky top-[72px] z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex gap-4">
          {[
            { key: "shell",    label: "Shell Lubricants",   active: "border-brand-600 text-brand-600" },
            { key: "tyrolit",  label: "Tyrolit Precision",  active: "border-slate-800 text-slate-800" },
          ].map(({ key, label, active }) => (
            <button key={key} onClick={() => switchBrand(key)}
              className={`py-4 text-sm font-bold tracking-wide uppercase border-b-2 transition-all duration-150 cursor-pointer ${
                brand === key ? active : "border-transparent text-slate-400 hover:text-slate-700"
              }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-8">
        {/* ── Main content ── */}
        <main className="flex-1 min-w-0">

          {/* Search + meta */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/></svg>
              <input ref={searchRef} type="text" value={query} onChange={e => setQuery(e.target.value)}
                placeholder={
                  brand === "shell"
                    ? activeShellFamily
                      ? `Search in ${activeShellFamily}…`
                      : "Search families, grades…"
                    : activeTyrolitIndustry
                      ? `Search in ${activeTyrolitIndustry}…`
                      : "Search industries…"
                }
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white shadow-sm" />
            </div>
          </div>

          {/* Header + back navigation */}
          <div className="flex items-center justify-between mb-4">
            {brand === "tyrolit" && activeTyrolitIndustry ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={backToGrid}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer group"
                >
                  <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
                  All Industries
                </button>
                <span className="text-slate-300">/</span>
                <h1 className="text-2xl font-bold text-slate-900">{activeTyrolitIndustry}</h1>
              </div>
            ) : brand === "shell" && activeShellFamily ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={backToGrid}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer group"
                >
                  <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
                  All Families
                </button>
                <span className="text-slate-300">/</span>
                <h1 className="text-2xl font-bold text-slate-900">{activeShellFamily.replace(/ – .*/, "")}</h1>
              </div>
            ) : (
              <h1 className="text-2xl font-bold text-slate-900">
                {brand === "shell" ? "Shell Lubricants" : "Tyrolit Solutions"}
              </h1>
            )}
            <p className="text-sm text-slate-500 font-medium">
              {brand === "shell"
                ? activeShellFamily
                  ? <>{filteredShellProducts.length} product{filteredShellProducts.length !== 1 ? "s" : ""}</>
                  : <>{filteredShellFamilies.length} product famil{filteredShellFamilies.length !== 1 ? "ies" : "y"}</>
                : activeTyrolitIndustry
                  ? <>{tyrolitInnerProducts.length} product{tyrolitInnerProducts.length !== 1 ? "s" : ""}</>
                  : <>{filteredTyrolit.length} industr{filteredTyrolit.length !== 1 ? "ies" : "y"}</>
              }
            </p>
          </div>

          {/* Product grid */}
          {brand === "shell" ? (
            activeShellFamily ? (
              /* ── Shell inner product grid ── */
              <>
                {/* Brochure bar for the active family */}
                {(() => {
                  const fam = SHELL_FAMILIES.find(f => f.family === activeShellFamily);
                  return fam?.brochures ? <ShellBrochureBar brochures={fam.brochures} /> : null;
                })()}

                {filteredShellProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredShellProducts.map((p, i) => (
                      <ShellCard key={i} product={p} onEnquire={setEnquiryProduct} />
                    ))}
                  </div>
                ) : (
                  <EmptyState query={query} onClear={() => setQuery('')} />
                )}
              </>
            ) : (
              /* ── Shell family overview grid ── */
              filteredShellFamilies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredShellFamilies.map((f, i) => (
                    <ShellFamilyCard
                      key={i}
                      item={f}
                      onClick={() => drillIntoShellFamily(f.family)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState query={query} onClear={() => setQuery('')} />
              )
            )
          ) : activeTyrolitIndustry ? (
            /* ── Tyrolit inner product grid ── */
            tyrolitInnerProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tyrolitInnerProducts.map((p, i) => (
                  <TyrolitProductCard
                    key={i}
                    productName={p.productName}
                    industryName={p.industryName}
                    image={p.image}
                    files={p.files}
                    onEnquire={setEnquiryProduct}
                  />
                ))}
              </div>
            ) : (
              <EmptyState query={query} onClear={() => setQuery('')} />
            )
          ) : (
            /* ── Tyrolit industry overview grid ── */
            filteredTyrolit.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTyrolit.map((t, i) => (
                  <TyrolitIndustryCard
                    key={i}
                    item={t}
                    onClick={() => drillIntoIndustry(t.industry)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState query={query} onClear={() => setQuery('')} />
            )
          )}
        </main>
      </div>

      {/* Enquiry Modal */}
      {enquiryProduct && (
        <EnquiryModal product={enquiryProduct} onClose={() => setEnquiryProduct(null)} />
      )}
    </div>
  );
}
