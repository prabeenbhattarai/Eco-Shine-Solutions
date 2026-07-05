import {
  Building2,
  GraduationCap,
  UtensilsCrossed,
  HeartPulse,
  Landmark,
  SprayCan,
  HardHat,
  ShieldCheck,
  Leaf,
  BadgeCheck,
  ThumbsUp,
  LayoutGrid,
  Factory,
  ShoppingBag,
  PartyPopper,
  Home,
  Dumbbell,
  Trees,
  Droplets,
  Wrench,
  Trash2,
  Waves,
  Truck,
  Server,
  Mountain,
  Info,
  BookOpen,
  Users,
  HeartHandshake,
  MapPin,
  Mail,
  Newspaper,
  Briefcase,
  Images,
  HelpCircle,
  Lock,
  FileText,
  Award,
  UserCheck,
  SlidersHorizontal,
  CalendarCheck,
  ClipboardList,
  FileCheck2,
  Gauge,
  AlertCircle,
  Repeat,
  type LucideIcon,
} from "lucide-react";

export const site = {
  name: "Ecoshine Solution",
  legalName: "Ecoshine Solutions Pty Ltd",
  tagline: "Eco-Friendly Commercial Cleaning Across Australia",
  description:
    "Trusted eco-friendly commercial cleaning across NSW, Tasmania, WA and ACT. Office, strata, builders and detailing cleans by insured, police-checked teams. Free quotes, no lock-in contracts.",
  url: "https://www.ecoshinesolution.com.au",
  phone: "0451 930 257",
  phoneHref: "tel:+61451930257",
  phoneSecondary: "0403 036 265",
  email: "info@ecoshinesolution.com.au",
  whatsapp: "https://wa.me/61451930257",
  abn: "Registered Australian business",
  address: "Sydney, NSW, Australia",
  hours: [
    { day: "Monday to Friday", time: "7:00am to 6:00pm" },
    { day: "Saturday", time: "8:00am to 4:00pm" },
    { day: "Sunday", time: "Closed" },
  ],
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

/* Filter tabs on /services - order here is the tab order (before "All" is
   prepended in the UI). Each service below is tagged with one of these. */
export const serviceCategories = [
  "Sector Programs",
  "Facilities Support",
  "Grounds & Outdoor Services",
  "Cleaning & Hygiene",
  "Specialised & Project Cleaning",
] as const;
export type ServiceCategory = (typeof serviceCategories)[number];

export type Service = {
  title: string;
  short: string;
  slug: string;
  href: string;
  icon: LucideIcon;
  category: ServiceCategory;
  blurb: string;
  image: string;
  imageAlt: string;
  keyword: string;
};

export const services: Service[] = [
  {
    title: "Commercial & Corporate Cleaning",
    short: "Commercial & Corporate",
    slug: "commercial-corporate-cleaning",
    href: "/services/commercial-corporate-cleaning",
    icon: Building2,
    category: "Sector Programs",
    blurb: "Comprehensive daily cleaning with transparent reporting for corporate environments.",
    image: "/images/commercial-window-cleaning-sydney.jpg",
    imageAlt: "Ecoshine cleaner servicing a commercial office building",
    keyword: "commercial cleaning",
  },
  {
    title: "Integrated Facility Services",
    short: "Integrated Facility Services",
    slug: "integrated-facility-services",
    href: "/services/integrated-facility-services",
    icon: LayoutGrid,
    category: "Facilities Support",
    blurb: "Seamless integration of logistics, waste coordination and common area maintenance.",
    image: "/images/ecoshine-cleaning-team.jpg",
    imageAlt: "Ecoshine facility services team coordinating a site clean",
    keyword: "facility management cleaning",
  },
  {
    title: "Industrial & Manufacturing Cleaning",
    short: "Industrial & Manufacturing",
    slug: "industrial-manufacturing-cleaning",
    href: "/services/industrial-manufacturing-cleaning",
    icon: Factory,
    category: "Sector Programs",
    blurb: "Safety-first SOPs covering all plant, warehouse and production zoning.",
    image: "/images/ecoshine-brand-culture.jpg",
    imageAlt: "Ecoshine cleaner on an industrial site clean",
    keyword: "industrial cleaning",
  },
  {
    title: "Healthcare & Medical Centre Cleaning",
    short: "Healthcare & Medical Centre",
    slug: "healthcare-medical-centre-cleaning",
    href: "/services/healthcare-medical-centre-cleaning",
    icon: HeartPulse,
    category: "Sector Programs",
    blurb: "Clinical regimes and risk-based zoning aligned with strict medical standards.",
    image: "/images/window-cleaning-opera-house.jpg",
    imageAlt: "Ecoshine cleaner sanitising clinical glass surfaces",
    keyword: "medical cleaning",
  },
  {
    title: "Childcare & School Cleaning",
    short: "Childcare & School",
    slug: "childcare-school-cleaning",
    href: "/services/childcare-school-cleaning",
    icon: GraduationCap,
    category: "Sector Programs",
    blurb: "Specialised cleaning adhering to child safety practices and term schedules.",
    image: "/images/strata-cleaning-sydney.jpg",
    imageAlt: "Ecoshine cleaner sanitising an education facility interior",
    keyword: "school cleaning",
  },
  {
    title: "Hotels, Hospitality & Leisure Cleaning",
    short: "Hotels, Hospitality & Leisure",
    slug: "hotels-hospitality-leisure-cleaning",
    href: "/services/hotels-hospitality-leisure-cleaning",
    icon: UtensilsCrossed,
    category: "Sector Programs",
    blurb: "Specialised cleaning for hotels, pubs, clubs and restaurants.",
    image: "/images/ecoshine-uniform-harbour-bridge.jpg",
    imageAlt: "Ecoshine cleaner detailing a hospitality venue",
    keyword: "hospitality cleaning",
  },
  {
    title: "Retail Cleaning",
    short: "Retail Cleaning",
    slug: "retail-cleaning",
    href: "/services/retail-cleaning",
    icon: ShoppingBag,
    category: "Sector Programs",
    blurb: "Routine cleaning and high-touch sanitisation for all customer-facing spaces.",
    image: "/images/commercial-floor-cleaning-sydney.jpg",
    imageAlt: "Ecoshine cleaner polishing a retail store floor",
    keyword: "retail cleaning",
  },
  {
    title: "Event & Venue Cleaning",
    short: "Event & Venue",
    slug: "event-venue-cleaning",
    href: "/services/event-venue-cleaning",
    icon: PartyPopper,
    category: "Sector Programs",
    blurb: "Rapid response and routine cleaning for all event and venue needs.",
    image: "/images/hospitality-cleaning-sydney.jpg",
    imageAlt: "Ecoshine cleaner preparing a venue for an event",
    keyword: "event cleaning",
  },
  {
    title: "Strata & Residential Cleaning",
    short: "Strata & Residential",
    slug: "strata-residential-cleaning",
    href: "/services/strata-residential-cleaning",
    icon: Home,
    category: "Sector Programs",
    blurb: "Cleaning and maintenance of residential common areas and property precincts.",
    image: "/images/ecoshine-staff-portrait.jpg",
    imageAlt: "Ecoshine cleaner maintaining a strata common area",
    keyword: "strata cleaning",
  },
  {
    title: "Gym & Fitness Facility Cleaning",
    short: "Gym & Fitness Facility",
    slug: "gym-fitness-facility-cleaning",
    href: "/services/gym-fitness-facility-cleaning",
    icon: Dumbbell,
    category: "Sector Programs",
    blurb: "Targeted sanitisation and daily upkeep of high-contact fitness equipment.",
    image: "/images/ecoshine-team-member.jpg",
    imageAlt: "Ecoshine cleaner sanitising fitness equipment",
    keyword: "gym cleaning",
  },
  {
    title: "Grounds & Garden Maintenance",
    short: "Grounds & Garden",
    slug: "grounds-garden-maintenance",
    href: "/services/grounds-garden-maintenance",
    icon: Trees,
    category: "Grounds & Outdoor Services",
    blurb: "Complete maintenance, including mowing, trimming, seasonal programs and litter removal.",
    image: "/images/office-cleaning-sydney.jpg",
    imageAlt: "Ecoshine grounds team maintaining an outdoor precinct",
    keyword: "grounds maintenance",
  },
  {
    title: "Hygiene & Consumable Supply",
    short: "Hygiene & Consumable Supply",
    slug: "hygiene-consumable-supply",
    href: "/services/hygiene-consumable-supply",
    icon: Droplets,
    category: "Cleaning & Hygiene",
    blurb: "Supply of consumables, dispensers and complete washroom hygiene services.",
    image: "/images/hospitality-cleaning-sydney.jpg",
    imageAlt: "Ecoshine cleaner restocking washroom hygiene supplies",
    keyword: "washroom hygiene",
  },
  {
    title: "Minor Repairs & Maintenance",
    short: "Minor Repairs & Maintenance",
    slug: "minor-repairs-maintenance",
    href: "/services/minor-repairs-maintenance",
    icon: Wrench,
    category: "Facilities Support",
    blurb: "Maintenance of common areas, focusing on rapid response and ongoing upkeep.",
    image: "/images/commercial-window-cleaning-sydney.jpg",
    imageAlt: "Ecoshine facilities team completing minor site repairs",
    keyword: "facility maintenance",
  },
  {
    title: "End of Build & Construction Cleaning",
    short: "End of Build & Construction",
    slug: "end-of-build-construction-cleaning",
    href: "/services/end-of-build-construction-cleaning",
    icon: HardHat,
    category: "Specialised & Project Cleaning",
    blurb: "Final defect removal and meticulous handover cleaning after construction.",
    image: "/images/window-cleaning-opera-house.jpg",
    imageAlt: "Ecoshine cleaner on a post-construction handover clean",
    keyword: "construction cleaning",
  },
  {
    title: "Carpet & Hard Floor Restoration",
    short: "Carpet & Hard Floor Restoration",
    slug: "carpet-hard-floor-restoration",
    href: "/services/carpet-hard-floor-restoration",
    icon: SprayCan,
    category: "Specialised & Project Cleaning",
    blurb: "Restoration services including strip, seal, scrub and deep carpet extraction.",
    image: "/images/strata-cleaning-sydney.jpg",
    imageAlt: "Ecoshine cleaner restoring a hard floor surface",
    keyword: "carpet cleaning",
  },
  {
    title: "Deep Cleaning & Disinfection",
    short: "Deep Cleaning & Disinfection",
    slug: "deep-cleaning-disinfection",
    href: "/services/deep-cleaning-disinfection",
    icon: ShieldCheck,
    category: "Cleaning & Hygiene",
    blurb: "Scheduled deep cleaning programs, high dusting and targeted disinfection.",
    image: "/images/ecoshine-uniform-harbour-bridge.jpg",
    imageAlt: "Ecoshine cleaner performing a scheduled deep clean",
    keyword: "deep cleaning",
  },
  {
    title: "Bin Management & Waste Removal",
    short: "Bin Management & Waste Removal",
    slug: "bin-management-waste-removal",
    href: "/services/bin-management-waste-removal",
    icon: Trash2,
    category: "Grounds & Outdoor Services",
    blurb: "Coordination and collection of internal and seasonal bulk waste streams.",
    image: "/images/commercial-floor-cleaning-sydney.jpg",
    imageAlt: "Ecoshine team coordinating waste and bin removal",
    keyword: "waste removal",
  },
  {
    title: "Specialist & High Pressure Services",
    short: "Specialist & High Pressure",
    slug: "specialist-high-pressure-services",
    href: "/services/specialist-high-pressure-services",
    icon: Waves,
    category: "Specialised & Project Cleaning",
    blurb: "High-access facade work and pressure washing of hard external surfaces.",
    image: "/images/ecoshine-brand-culture.jpg",
    imageAlt: "Ecoshine cleaner pressure washing an exterior facade",
    keyword: "pressure washing",
  },
];

export const founders: {
  name: string;
  role: string;
  quote: string;
  image?: string;
  initials: string;
  linkedin: string;
}[] = [
  {
    name: "Bikas Subedi",
    role: "Founder and CEO",
    quote:
      "Our mission has always been simple: to provide exceptional cleaning services that exceed expectations. Every client deserves a spotless environment where they can thrive, and that is exactly what we deliver.",
    image: "/images/founder-bikas-subedi.jpg",
    initials: "BS",
    linkedin: "#",
  },
  {
    name: "Sandip Adhikari",
    role: "Founder and Managing Director",
    quote:
      "Quality and reliability are at the heart of everything we do. We have built our reputation on trust, and our team takes pride in maintaining the highest standards of cleanliness and customer service.",
    initials: "SA",
    linkedin: "#",
  },
];

/* Industries Ecoshine tailors cleaning programs for. Individual sector pages
   are not built yet - cards and mega-menu entries all point at /sectors. */
export type Sector = {
  name: string;
  slug: string;
  icon: LucideIcon;
  blurb: string;
  image: string;
  imageAlt: string;
};

export const sectors: Sector[] = [
  {
    name: "Corporate Offices & Commercial",
    slug: "corporate-offices-commercial",
    icon: Building2,
    blurb: "Daily and periodic cleaning programs for corporate offices and commercial premises.",
    image: "/images/commercial-floor-cleaning-sydney.jpg",
    imageAlt: "Ecoshine cleaner in a corporate office space",
  },
  {
    name: "Transport & Logistics",
    slug: "transport-logistics",
    icon: Truck,
    blurb: "Depot, fleet touchpoint and warehouse cleaning that keeps logistics moving.",
    image: "/images/ecoshine-brand-culture.jpg",
    imageAlt: "Ecoshine cleaner servicing a transport and logistics site",
  },
  {
    name: "Education & Childcare",
    slug: "education-childcare",
    icon: GraduationCap,
    blurb: "Term-aligned cleaning built around child safety and school schedules.",
    image: "/images/ecoshine-cleaning-team.jpg",
    imageAlt: "Ecoshine cleaner in an education facility",
  },
  {
    name: "Industrial & Manufacturing",
    slug: "industrial-manufacturing",
    icon: Factory,
    blurb: "Safety-first cleaning across plants, warehouses and production floors.",
    image: "/images/ecoshine-staff-portrait.jpg",
    imageAlt: "Ecoshine cleaner at an industrial manufacturing site",
  },
  {
    name: "Fitness & Lifestyle",
    slug: "fitness-lifestyle",
    icon: Dumbbell,
    blurb: "Daily sanitisation of gyms, studios and high-contact fitness equipment.",
    image: "/images/ecoshine-team-member.jpg",
    imageAlt: "Ecoshine cleaner sanitising a fitness facility",
  },
  {
    name: "Retail & Hospitality",
    slug: "retail-hospitality",
    icon: ShoppingBag,
    blurb: "Customer-facing cleaning for retail stores, pubs, clubs and restaurants.",
    image: "/images/office-cleaning-sydney.jpg",
    imageAlt: "Ecoshine cleaner in a retail and hospitality venue",
  },
  {
    name: "Healthcare & Aged Care",
    slug: "healthcare-aged-care",
    icon: HeartPulse,
    blurb: "Hospitals, clinics, aged care facilities, and medical centres.",
    image: "/images/hospitality-cleaning-sydney.jpg",
    imageAlt: "Ecoshine cleaner in a healthcare facility",
  },
  {
    name: "Infrastructure & Data Centre",
    slug: "infrastructure-data-centre",
    icon: Server,
    blurb: "Controlled, compliant cleaning for critical infrastructure and data centres.",
    image: "/images/commercial-window-cleaning-sydney.jpg",
    imageAlt: "Ecoshine cleaner at an infrastructure and data centre site",
  },
  {
    name: "Strata & Buildings",
    slug: "strata-buildings",
    icon: Home,
    blurb: "Common area cleaning and maintenance for strata and residential buildings.",
    image: "/images/window-cleaning-opera-house.jpg",
    imageAlt: "Ecoshine cleaner maintaining a strata building common area",
  },
  {
    name: "Mining & Energy",
    slug: "mining-energy",
    icon: Mountain,
    blurb: "Site-based cleaning and facility support for mining and energy operations.",
    image: "/images/strata-cleaning-sydney.jpg",
    imageAlt: "Ecoshine cleaner at a mining and energy site",
  },
  {
    name: "Government & Defense",
    slug: "government-defense",
    icon: Landmark,
    blurb: "Vetted teams delivering compliant cleaning for government and defence sites.",
    image: "/images/ecoshine-uniform-harbour-bridge.jpg",
    imageAlt: "Ecoshine cleaner at a government building",
  },
  {
    name: "Events & Venue Cleaning",
    slug: "events-venue-cleaning",
    icon: PartyPopper,
    blurb: "Rapid turnaround cleaning for events, venues and function spaces.",
    image: "/images/commercial-floor-cleaning-sydney.jpg",
    imageAlt: "Ecoshine cleaner preparing an events venue",
  },
];

/* Company/overview mega-menu links. "Our Story", "Our Founders" and "Our
   Values" jump to anchored sections on the About page rather than separate
   routes we haven't built yet. */
export const overviewLinks: {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
}[] = [
  {
    label: "About Us",
    href: "/about",
    icon: Info,
    description: "Who we are and what Ecoshine Solution stands for.",
  },
  {
    label: "Our Story",
    href: "/about#story",
    icon: BookOpen,
    description: "How a small Sydney team grew into a trusted national operation.",
  },
  {
    label: "Our Founders",
    href: "/about#founders",
    icon: Users,
    description: "Meet the people leading Ecoshine Solution.",
  },
  {
    label: "Our Values",
    href: "/about#values",
    icon: HeartHandshake,
    description: "The standards our clients can count on, every clean.",
  },
  {
    label: "Service Areas",
    href: "/service-areas",
    icon: MapPin,
    description: "Where we currently operate across Australia.",
  },
  {
    label: "Contact Us",
    href: "/contact",
    icon: Mail,
    description: "Get in touch with our team.",
  },
];

/* Explore mega-menu links - blog, careers and other utility pages. Blog and
   Careers are coming-soon stubs for now (real content lands later). */
export const exploreLinks: {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
}[] = [
  {
    label: "Blog",
    href: "/blog",
    icon: Newspaper,
    description: "Cleaning tips, industry news and updates from Ecoshine.",
  },
  {
    label: "Careers",
    href: "/careers",
    icon: Briefcase,
    description: "Join our team of eco-certified, police-checked cleaners.",
  },
  {
    label: "Gallery",
    href: "/gallery",
    icon: Images,
    description: "Photos of our uniformed teams at work across Australia.",
  },
  {
    label: "FAQs",
    href: "/#faq",
    icon: HelpCircle,
    description: "Quick answers to the questions we hear most.",
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
    icon: Lock,
    description: "How we collect, use and protect your information.",
  },
  {
    label: "Terms & Conditions",
    href: "/terms",
    icon: FileText,
    description: "The terms that apply when you book a clean with us.",
  },
];

export const nav: NavItem[] = [
  {
    label: "Overview",
    href: "/",
    children: overviewLinks.map((l) => ({
      label: l.label,
      href: l.href,
      description: l.description,
    })),
  },
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({
      label: s.short,
      href: s.href,
      description: s.blurb,
    })),
  },
  {
    label: "Sectors",
    href: "/sectors",
    children: sectors.map((s) => ({
      label: s.name,
      href: `/sectors/${s.slug}`,
      description: s.blurb,
    })),
  },
  {
    label: "Explore",
    href: "/gallery",
    children: exploreLinks.map((l) => ({
      label: l.label,
      href: l.href,
      description: l.description,
    })),
  },
];

/* States and territories Ecoshine services. Coordinates (cx, cy) are placement
   anchors on the stylised Australia map in /components/home/australia-coverage. */
export type ServedState = {
  code: string;
  name: string;
  status: "active" | "launching";
  launchDate?: string;
  isHq?: boolean;
  tagline: string;
  cities: string[];
  cx: number;
  cy: number;
  labelDx: number;
  labelDy: number;
};

export const states: ServedState[] = [
  {
    code: "WA",
    name: "Western Australia",
    status: "active",
    tagline: "Commercial and office cleaning across the Perth metro.",
    cities: ["Perth", "Fremantle", "Joondalup", "Rockingham", "Mandurah"],
    cx: 188,
    cy: 430,
    labelDx: -8,
    labelDy: -18,
  },
  {
    code: "NSW",
    name: "New South Wales",
    status: "active",
    isHq: true,
    tagline: "Our home base, serving Sydney and the wider state since day one.",
    cities: [
      "Sydney",
      "Parramatta",
      "North Sydney",
      "Newcastle",
      "Wollongong",
      "Inner West",
    ],
    cx: 792,
    cy: 452,
    labelDx: 22,
    labelDy: -10,
  },
  {
    code: "ACT",
    name: "Australian Capital Territory",
    status: "launching",
    launchDate: "1 July 2026",
    tagline: "Now launching in Canberra. Be among our first ACT clients.",
    cities: ["Canberra", "Belconnen", "Gungahlin", "Woden", "Tuggeranong"],
    cx: 762,
    cy: 502,
    labelDx: 26,
    labelDy: 14,
  },
  {
    code: "TAS",
    name: "Tasmania",
    status: "active",
    tagline: "Reliable eco cleaning for Hobart, Launceston and beyond.",
    cities: ["Hobart", "Launceston", "Devonport", "Burnie"],
    cx: 762,
    cy: 706,
    labelDx: 24,
    labelDy: 10,
  },
];

export const trustPoints: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Leaf,
    title: "Eco-Certified Products",
    text: "Plant-based, non-toxic supplies that are safe for kids, pets and staff.",
  },
  {
    icon: ShieldCheck,
    title: "Fully Insured",
    text: "Comprehensive public liability cover on every single job.",
  },
  {
    icon: BadgeCheck,
    title: "Police-Checked Staff",
    text: "Vetted, uniformed and trained cleaners you can trust in your space.",
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction Guarantee",
    text: "Not happy with a clean? We come back and put it right at no cost.",
  },
  {
    icon: Award,
    title: "Experienced",
    text: "8+ years of industry experience, our trained teams deliver reliable cleaning with a sharp eye for detail.",
  },
  {
    icon: UserCheck,
    title: "Professional",
    text: "Uniformed, trained cleaners who take full ownership of every job, every time.",
  },
  {
    icon: SlidersHorizontal,
    title: "Tailored & Flexible",
    text: "We design cleaning schedules and scopes of work that fit your business, not the other way around.",
  },
  {
    icon: CalendarCheck,
    title: "Reliable & Consistent",
    text: "Punctual service, clear communication and consistent results on every single visit.",
  },
];

/* How every Ecoshine program is run - shown on each service and sector detail
   page. Generic on purpose: these capabilities apply to every engagement. */
export const expertisePoints: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ClipboardList,
    title: "Documented Cleaning Scopes",
    text: "Every area of your site is covered by a clear, written scope that sets tasks, frequency and standards, so nothing is left to guesswork.",
  },
  {
    icon: FileCheck2,
    title: "Audit-Ready Reporting",
    text: "Inspections, findings and completed actions are logged, giving you records that stand up to internal audits and compliance reviews.",
  },
  {
    icon: Gauge,
    title: "KPI-Tracked Performance",
    text: "Service quality is measured against agreed KPIs, with trends and exceptions flagged to you before they become problems.",
  },
  {
    icon: ShieldCheck,
    title: "WHS & Hygiene Compliance",
    text: "Cleaning processes align with Australian WHS regulations and the hygiene requirements of your industry.",
  },
  {
    icon: AlertCircle,
    title: "Fast Issue Escalation",
    text: "A defined escalation path with clear response times keeps small issues from ever disrupting your operations.",
  },
  {
    icon: Repeat,
    title: "Consistency Across Sites",
    text: "Standards and reporting are coordinated across multiple sites and floors, so every location gets the same level of service.",
  },
];

/* Reasons we win against other Australian cleaning companies. */
export const advantages = [
  "No lock-in contracts, ever",
  "Free quotes within 2 hours",
  "Eco-certified, low-tox products",
  "Fully insured and police-checked",
  "Same-day and after-hours options",
  "Trusted across four states and territories",
];

/* Honest, verifiable stats for the "Our Difference" homepage banner. */
export const differenceStats: { value: string; label: string; text: string }[] = [
  {
    value: "4.9/5",
    label: "Average Rating",
    text: "From 300+ verified customer reviews.",
  },
  {
    value: "4",
    label: "States & Territories",
    text: "NSW, WA, TAS and ACT from July 2026.",
  },
  {
    value: "2hr",
    label: "Average Quote Turnaround",
    text: "Fast, free quotes during business hours.",
  },
  {
    value: "100%",
    label: "Eco-Certified Products",
    text: "Plant-based and safe for kids, pets and staff.",
  },
];

export const serviceAreas = [
  "Sydney",
  "Parramatta",
  "Newcastle",
  "Wollongong",
  "Perth",
  "Fremantle",
  "Hobart",
  "Launceston",
  "Canberra",
  "Belconnen",
];

/* Real Ecoshine work photography, shared between the homepage gallery teaser
   and the full /gallery page. */
export const galleryShots: { src: string; alt: string }[] = [
  {
    src: "/images/window-cleaning-opera-house.jpg",
    alt: "Ecoshine cleaner polishing glass with the Sydney Opera House behind",
  },
  {
    src: "/images/hospitality-cleaning-sydney.jpg",
    alt: "Ecoshine cleaner detailing a restaurant table by the harbour",
  },
  {
    src: "/images/ecoshine-uniform-harbour-bridge.jpg",
    alt: "Ecoshine team member in uniform by the Sydney Harbour Bridge",
  },
  {
    src: "/images/ecoshine-brand-culture.jpg",
    alt: "Ecoshine staff member wearing the branded team shirt",
  },
  {
    src: "/images/ecoshine-staff-portrait.jpg",
    alt: "Portrait of an Ecoshine cleaning team member in Sydney",
  },
  {
    src: "/images/office-cleaning-sydney.jpg",
    alt: "Ecoshine cleaner sanitising an office interior",
  },
  {
    src: "/images/commercial-floor-cleaning-sydney.jpg",
    alt: "Ecoshine cleaner polishing a commercial floor",
  },
  {
    src: "/images/commercial-window-cleaning-sydney.jpg",
    alt: "Ecoshine cleaner servicing a commercial office building",
  },
  {
    src: "/images/ecoshine-cleaning-team.jpg",
    alt: "The Ecoshine Solution cleaning team in uniform by the Sydney Harbour Bridge",
  },
  {
    src: "/images/ecoshine-team-member.jpg",
    alt: "Ecoshine cleaner sanitising fitness equipment",
  },
  {
    src: "/images/strata-cleaning-sydney.jpg",
    alt: "Ecoshine cleaner maintaining a strata common area",
  },
  {
    src: "/images/hero-window-cleaning-sydney.jpg",
    alt: "Ecoshine cleaner with squeegee and bucket in front of the Sydney Opera House",
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Book Online",
    text: "Request a free quote in under a minute and tell us what you need cleaned.",
  },
  {
    step: "02",
    title: "We Clean",
    text: "Our insured, eco-equipped team arrives on time and gets the job done right.",
  },
  {
    step: "03",
    title: "You Enjoy",
    text: "Relax in a spotless space, backed by our satisfaction guarantee.",
  },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "Which areas does Ecoshine Solution service?",
    answer:
      "We currently service New South Wales, Western Australia and Tasmania, with the Australian Capital Territory launching 1 July 2026. See our Service Areas page for the specific cities and suburbs we cover.",
  },
  {
    question: "Are your cleaning products actually eco-friendly?",
    answer:
      "Yes. We use plant-based, non-toxic, eco-certified products on every job, so they are safe for kids, pets and staff without compromising on results.",
  },
  {
    question: "Do I need to sign a long-term contract?",
    answer:
      "No. We operate with no lock-in contracts, so you can start, pause or cancel your cleaning schedule at any time.",
  },
  {
    question: "Are your cleaners insured and background-checked?",
    answer:
      "Every Ecoshine cleaner is fully insured, police-checked and uniformed, and we carry comprehensive public liability cover on every job.",
  },
  {
    question: "What happens if I'm not happy with a clean?",
    answer:
      "We back every job with a satisfaction guarantee. If something is not up to standard, we will come back and put it right at no extra cost.",
  },
  {
    question: "How quickly can I get a quote?",
    answer:
      "Most quote requests are answered within 2 hours during business hours. Same-day and after-hours cleans can also be arranged.",
  },
  {
    question: "What types of properties and sectors do you clean?",
    answer:
      "We service childcare and education, healthcare and aged care, hospitality, retail, corporate offices, industrial and manufacturing sites, strata and residential buildings, government and public spaces, and more. See our Services and Sectors pages for the full list.",
  },
  {
    question: "Do you only do recurring contracts, or one-off cleans too?",
    answer:
      "Both. Alongside ongoing commercial contracts, we handle one-off deep cleans, post-construction and builders cleans, and specialist project work.",
  },
  {
    question: "What are your operating hours?",
    answer:
      "We're available Monday to Friday 7:00am to 6:00pm and Saturday 8:00am to 4:00pm. We're closed Sundays, with after-hours arrangements available on request.",
  },
  {
    question: "How do I book a clean?",
    answer:
      "Request a free quote online and our team will confirm the details and get you booked in, usually within 2 hours during business hours.",
  },
];

export const testimonials = [
  {
    name: "Sarah M.",
    role: "Office Manager, Sydney NSW",
    service: "Commercial Cleaning",
    rating: 5,
    text: "Ecoshine transformed our office. The team is reliable and thorough, and the eco products mean no harsh smells for staff. We could not recommend them more.",
  },
  {
    name: "David T.",
    role: "Strata Manager, Perth WA",
    service: "Strata Cleaning",
    rating: 5,
    text: "Finally a cleaner that actually shows up and does the job properly. Our common areas have never looked better and residents have noticed the difference.",
  },
  {
    name: "Priya K.",
    role: "Homeowner, Hobart TAS",
    service: "Home Detailing",
    rating: 5,
    text: "Booked a deep clean before a family event and they were incredible. Every room sparkled, and I love that the products are safe for my kids.",
  },
  {
    name: "James R.",
    role: "Site Manager, Newcastle NSW",
    service: "Post-Construction",
    rating: 5,
    text: "Handed over a renovation on time thanks to their builders clean. Professional, fast, and the completion records made the handover seamless.",
  },
];

/* High-intent Australian cleaning search terms used across page metadata. */
export const seoKeywords = [
  "commercial cleaning",
  "office cleaning",
  "industrial cleaning",
  "strata cleaning",
  "school cleaning",
  "childcare cleaning",
  "hospitality cleaning",
  "medical centre cleaning",
  "gym cleaning",
  "government cleaning",
  "carpet cleaning",
  "strip and seal",
  "construction cleaning",
  "builders clean",
  "eco friendly cleaning",
  "cleaning services near me",
  "commercial cleaning sydney",
  "office cleaning canberra",
  "commercial cleaning perth",
  "cleaning services hobart",
];
