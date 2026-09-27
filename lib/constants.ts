export const THEME_COOKIE = "theme";
export const THEME_COOKIE_MAX_AGE = 31_536_000;

export const THEMES = ["light", "dark", "system"] as const;
export type Theme = (typeof THEMES)[number];
export type ResolvedTheme = Exclude<Theme, "system">;

export function isTheme(value: string | undefined): value is Theme {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

export const APP_NAME = "ComPilot";

export type NavItem = {
  label: string;
  href: string;
  icon: "dashboard" | "projects" | "create" | "notifications" | "profile" | "form";
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Projects", href: "/projects", icon: "projects" },
  { label: "Create", href: "/projects/create", icon: "create" },
  { label: "Form template", href: "/example/form", icon: "form" },
  { label: "Notifications", href: "#notifications", icon: "notifications" },
  { label: "Profile", href: "#profile", icon: "profile" },
];

export type StatCardData = {
  label: string;
  value: string;
  change: number;
  tone: "blue" | "violet" | "cyan" | "lavender";
};

export const DASHBOARD_STATS: StatCardData[] = [
  { label: "Revenue", value: "$128,430", change: 12.4, tone: "blue" },
  { label: "Active Users", value: "18,204", change: 8.1, tone: "violet" },
  { label: "Sessions", value: "94,512", change: -2.3, tone: "cyan" },
  { label: "Conversion", value: "4.86%", change: 1.9, tone: "lavender" },
];

export type TrafficPoint = { label: string; value: number };

export const TRAFFIC_SERIES: TrafficPoint[] = [
  { label: "Mon", value: 42 },
  { label: "Tue", value: 58 },
  { label: "Wed", value: 51 },
  { label: "Thu", value: 74 },
  { label: "Fri", value: 88 },
  { label: "Sat", value: 63 },
  { label: "Sun", value: 47 },
];

export type MetricRow = { label: string; value: number; meta: string };

export const TOP_PAGES: MetricRow[] = [
  { label: "/dashboard", value: 38, meta: "18,204 views" },
  { label: "/projects", value: 26, meta: "12,480 views" },
  { label: "/projects/create", value: 17, meta: "8,150 views" },
  { label: "/auth/login", value: 12, meta: "5,760 views" },
  { label: "/pricing", value: 7, meta: "3,360 views" },
];

export const DEVICES: MetricRow[] = [
  { label: "Desktop", value: 54, meta: "54%" },
  { label: "Mobile", value: 36, meta: "36%" },
  { label: "Tablet", value: 10, meta: "10%" },
];

export const BROWSERS: MetricRow[] = [
  { label: "Chrome", value: 62, meta: "62%" },
  { label: "Safari", value: 21, meta: "21%" },
  { label: "Edge", value: 11, meta: "11%" },
  { label: "Firefox", value: 6, meta: "6%" },
];

export const COUNTRIES: MetricRow[] = [
  { label: "United States", value: 44, meta: "44%" },
  { label: "Germany", value: 18, meta: "18%" },
  { label: "Japan", value: 15, meta: "15%" },
  { label: "Brazil", value: 13, meta: "13%" },
  { label: "India", value: 10, meta: "10%" },
];

export const SOURCES: MetricRow[] = [
  { label: "Organic search", value: 41, meta: "+6.2%" },
  { label: "Direct", value: 27, meta: "+1.4%" },
  { label: "Referral", value: 19, meta: "-0.8%" },
  { label: "Social", value: 13, meta: "+3.1%" },
];

export type Transaction = {
  id: string;
  customer: string;
  plan: string;
  amount: number;
  status: "paid" | "pending" | "refunded";
  date: string;
};

export const TRANSACTIONS: Transaction[] = [
  { id: "TRX-4021", customer: "Ava Whitfield", plan: "Scale", amount: 480, status: "paid", date: "2026-09-24" },
  { id: "TRX-4020", customer: "Noah Lindqvist", plan: "Growth", amount: 190, status: "pending", date: "2026-09-24" },
  { id: "TRX-4019", customer: "Mira Fujimoto", plan: "Enterprise", amount: 1240, status: "paid", date: "2026-09-23" },
  { id: "TRX-4018", customer: "Diego Alarcón", plan: "Growth", amount: 190, status: "refunded", date: "2026-09-22" },
  { id: "TRX-4017", customer: "Elliot Greer", plan: "Scale", amount: 480, status: "paid", date: "2026-09-21" },
];

export type Project = {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "active" | "draft" | "archived";
  members: number;
  updatedAt: string;
  accent: "blue" | "violet" | "cyan" | "lavender";
};

export const PROJECTS: Project[] = [
  {
    id: "prj-01",
    name: "Aurora Analytics",
    description: "Realtime product analytics dashboard for the growth team.",
    category: "Analytics",
    status: "active",
    members: 12,
    updatedAt: "2026-09-24",
    accent: "blue",
  },
  {
    id: "prj-02",
    name: "Nimbus Billing",
    description: "Usage based billing with invoices and dunning flows.",
    category: "Finance",
    status: "active",
    members: 6,
    updatedAt: "2026-09-22",
    accent: "violet",
  },
  {
    id: "prj-03",
    name: "Helio Onboarding",
    description: "Guided onboarding checklist and product tours.",
    category: "Growth",
    status: "draft",
    members: 4,
    updatedAt: "2026-09-19",
    accent: "cyan",
  },
  {
    id: "prj-04",
    name: "Lumen Design Tokens",
    description: "Shared glass design tokens across marketing and app.",
    category: "Design",
    status: "active",
    members: 9,
    updatedAt: "2026-09-15",
    accent: "lavender",
  },
  {
    id: "prj-05",
    name: "Cobalt Notifications",
    description: "Omnichannel notification service with digests.",
    category: "Platform",
    status: "archived",
    members: 3,
    updatedAt: "2026-08-30",
    accent: "blue",
  },
];

export const PROJECT_CATEGORIES = ["Analytics", "Finance", "Growth", "Design", "Platform", "Marketing"] as const;

export const PROJECT_TEMPLATES = [
  { value: "blank", label: "Blank project" },
  { value: "analytics", label: "Analytics starter" },
  { value: "commerce", label: "Commerce starter" },
  { value: "docs", label: "Docs site" },
] as const;

export const VISIBILITY_OPTIONS = [
  { value: "private", label: "Private", description: "Only invited members can open this project." },
  { value: "team", label: "Team", description: "Everyone in your workspace gets access." },
  { value: "public", label: "Public", description: "Anyone with the link can view the project." },
] as const;

export const FEATURE_OPTIONS = [
  { value: "realtime", label: "Realtime sync" },
  { value: "audit", label: "Audit log" },
  { value: "webhooks", label: "Webhooks" },
  { value: "exports", label: "Scheduled exports" },
] as const;

export const MEMBER_OPTIONS = [
  { value: "ava", label: "Ava Whitfield" },
  { value: "noah", label: "Noah Lindqvist" },
  { value: "mira", label: "Mira Fujimoto" },
  { value: "diego", label: "Diego Alarcón" },
  { value: "elliot", label: "Elliot Greer" },
] as const;

export const UPCOMING_EVENTS = [
  { date: "Sep 25", label: "Design system review", time: "09:30" },
  { date: "Sep 26", label: "Billing migration", time: "14:00" },
  { date: "Sep 29", label: "Growth experiment sync", time: "11:15" },
  { date: "Oct 02", label: "Q4 roadmap planning", time: "16:00" },
];
