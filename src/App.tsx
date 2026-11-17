import { useMemo, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  BarChart3,
  Bell,
  Bot,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleHelp,
  Clock3,
  Copy,
  Database,
  Download,
  ExternalLink,
  FileText,
  Filter,
  Globe2,
  Grip,
  KeyRound,
  LayoutDashboard,
  Link2,
  ListFilter,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  Paperclip,
  PenLine,
  Play,
  Plus,
  RefreshCw,
  Rocket,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Webhook,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

type Section =
  | "dashboard"
  | "assistant"
  | "leads"
  | "qualification"
  | "outreach"
  | "seo"
  | "keywords"
  | "content"
  | "integrations"
  | "settings";
type NavGroup = { id: Section; label: string; icon: LucideIcon; children: string[] };

const navGroups: NavGroup[] = [
  {
    id: "assistant",
    label: "AI Assistant",
    icon: Bot,
    children: ["New Chat", "Chat History", "Saved Conversations"],
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    children: ["Overview", "Performance", "Recent Activities"],
  },
  {
    id: "leads",
    label: "Lead Generation",
    icon: Users,
    children: [
      "Discover Companies",
      "Company Research",
      "Contact Research",
      "Import Leads",
      "Export Leads",
    ],
  },
  {
    id: "qualification",
    label: "Lead Qualification",
    icon: Target,
    children: [
      "ICP Profiles",
      "Lead Scoring",
      "Qualified Leads",
      "Hot Leads",
      "Warm Leads",
      "Cold Leads",
    ],
  },
  {
    id: "outreach",
    label: "Outreach Management",
    icon: Send,
    children: ["Message Generator", "Message Templates", "Follow-up Sequences", "Outreach Queue"],
  },
  {
    id: "seo",
    label: "SEO & AEO Analytics",
    icon: Globe2,
    children: [
      "Website Audit",
      "AI Visibility Analysis",
      "Technical SEO",
      "Sitemap Analysis",
      "Audit History",
    ],
  },
  {
    id: "keywords",
    label: "Keyword Research",
    icon: Search,
    children: ["Keyword Discovery", "Keyword Clustering", "Search Intent", "Content Briefs"],
  },
  {
    id: "content",
    label: "Content Studio",
    icon: FileText,
    children: ["Blog Generator", "Content Editor", "Generated Articles", "Content History"],
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Link2,
    children: ["Google Gemini", "Google Sheets", "Custom Webhooks"],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    children: ["My Profile", "API Keys", "Usage & Limits", "Security", "Preferences"],
  },
];

const companies = [
  {
    name: "Fable Labs",
    site: "fablelabs.io",
    industry: "SaaS",
    location: "Bengaluru, IN",
    score: 94,
    status: "Hot",
    desc: "Collaborative product research platform",
    research: "Complete",
  },
  {
    name: "Northstar AI",
    site: "northstar.ai",
    industry: "AI & Data",
    location: "Bengaluru, IN",
    score: 89,
    status: "Hot",
    desc: "AI infrastructure for operations teams",
    research: "Complete",
  },
  {
    name: "Kite Commerce",
    site: "kitecommerce.co",
    industry: "E-commerce",
    location: "Mumbai, IN",
    score: 82,
    status: "Warm",
    desc: "Headless commerce for growing brands",
    research: "Complete",
  },
  {
    name: "Cirrus Health",
    site: "cirrushealth.in",
    industry: "Healthtech",
    location: "Pune, IN",
    score: 76,
    status: "Warm",
    desc: "Patient engagement and care software",
    research: "In progress",
  },
  {
    name: "Harbor Stack",
    site: "harborstack.dev",
    industry: "Developer Tools",
    location: "Hyderabad, IN",
    score: 68,
    status: "Cold",
    desc: "Cloud observability for engineering teams",
    research: "Queued",
  },
];

const Badge = ({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "success" | "warning" | "danger" | "neutral" | "accent";
}) => <span className={`badge badge-${tone}`}>{children}</span>;

const Button = ({
  children,
  variant = "primary",
  icon: Icon,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <button className={`btn btn-${variant}`} onClick={onClick} disabled={disabled}>
    {Icon && <Icon size={15} />}
    {children}
  </button>
);

const PageHeader = ({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) => (
  <div className="page-heading">
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
    {action && <div className="heading-actions">{action}</div>}
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`card ${className}`}>{children}</section>
);

function MiniLineChart() {
  const values = [32, 38, 34, 48, 45, 62, 58, 69, 65, 81, 76, 92];
  const pts = values.map((v, i) => `${(i / 11) * 100},${100 - v}`).join(" ");
  return (
    <div className="line-chart">
      <div className="chart-grid">
        {[0, 1, 2, 3].map((i) => (
          <i key={i} />
        ))}
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          points={pts}
          fill="none"
          stroke="#438568"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="chart-labels">
        <span>May 1</span>
        <span>May 8</span>
        <span>May 15</span>
        <span>May 22</span>
        <span>May 30</span>
      </div>
    </div>
  );
}

function Dashboard({ navigate }: { navigate: (s: Section, child?: string) => void }) {
  const metrics = [
    ["Total Leads", "1,284", "+12.4%", "vs. previous month", Users],
    ["Qualified Leads", "846", "+8.2%", "vs. previous month", Target],
    ["Hot Leads", "124", "+18.9%", "vs. previous month", Zap],
    ["Websites Audited", "38", "+6.1%", "vs. previous month", Globe2],
  ] as const;
  return (
    <>
      <PageHeader
        title="Good morning, welcome back."
        subtitle="Here's what's happening with your growth activities."
        action={
          <Button icon={Plus} onClick={() => navigate("assistant")}>
            Start with AI
          </Button>
        }
      />
      <div className="metrics-grid">
        {metrics.map(([label, value, change, compare, Icon]) => (
          <Card className="metric" key={label}>
            <div className="metric-top">
              <span className="icon-box">
                <Icon size={17} />
              </span>
              <MoreHorizontal size={17} />
            </div>
            <strong>{value}</strong>
            <span className="metric-label">{label}</span>
            <div className="metric-change">
              <Badge tone="success">
                <ArrowUp size={11} />
                {change}
              </Badge>
              <span>{compare}</span>
            </div>
          </Card>
        ))}
      </div>
      <div className="dashboard-grid">
        <Card className="chart-card span-2">
          <div className="card-head">
            <div>
              <h2>Lead generation activity</h2>
              <p>Companies discovered over the last 30 days</p>
            </div>
            <select>
              <option>Last 30 days</option>
              <option>Last 7 days</option>
            </select>
          </div>
          <div className="chart-total">
            <strong>1,284</strong>
            <Badge tone="success">
              <ArrowUp size={11} />
              12.4%
            </Badge>
          </div>
          <MiniLineChart />
        </Card>
        <Card className="qualification-card">
          <div className="card-head">
            <div>
              <h2>Lead qualification</h2>
              <p>Current distribution</p>
            </div>
            <MoreHorizontal size={18} />
          </div>
          {[
            ["Hot leads", 124, 72, "hot"],
            ["Warm leads", 428, 58, "warm"],
            ["Cold leads", 332, 39, "cold"],
          ].map(([name, count, width, cls]) => (
            <div className="bar-row" key={name}>
              <div>
                <span>
                  <i className={`dot ${cls}`} />
                  {name}
                </span>
                <strong>{count}</strong>
              </div>
              <div className="bar-track">
                <i className={cls} style={{ width: `${width}%` }} />
              </div>
            </div>
          ))}
          <button className="text-link" onClick={() => navigate("qualification")}>
            View qualified leads <ChevronRight size={14} />
          </button>
        </Card>
        <Card className="activity-card">
          <div className="card-head">
            <div>
              <h2>Recent activity</h2>
              <p>Updates across your workspace</p>
            </div>
            <button className="text-link">View all</button>
          </div>
          {[
            [Building2, "24 companies discovered", "SaaS companies in Bengaluru", "8 min ago"],
            [Target, "Fable Labs qualified as Hot", "ICP score increased to 94", "32 min ago"],
            [Globe2, "Website audit completed", "opengtm.app · Score 86", "1 hr ago"],
            [FileText, "Blog article generated", "AI visibility for B2B brands", "3 hr ago"],
          ].map(([Icon, title, sub, time], i) => (
            <div className="activity-item" key={i}>
              <span className="activity-icon">
                <Icon size={15} />
              </span>
              <div>
                <strong>{title as string}</strong>
                <p>{sub as string}</p>
              </div>
              <time>{time as string}</time>
            </div>
          ))}
        </Card>
        <Card className="projects-card">
          <div className="card-head">
            <div>
              <h2>Recent projects</h2>
              <p>Continue where you left off</p>
            </div>
          </div>
          {[
            ["B2B SaaS lead discovery", "Lead discovery", "186 leads", 78],
            ["OpenGTM website audit", "Website audit", "86 score", 100],
            ["AI search visibility", "Keyword research", "42 keywords", 56],
          ].map(([n, type, meta, progress]) => (
            <div className="project-row" key={n as string}>
              <span className="file-icon">
                <FileText size={16} />
              </span>
              <div>
                <strong>{n}</strong>
                <p>
                  {type} · {meta}
                </p>
              </div>
              <div className="project-progress">
                <span>{progress}%</span>
                <i>
                  <b style={{ width: `${progress}%` }} />
                </i>
              </div>
              <MoreHorizontal size={17} />
            </div>
          ))}
        </Card>
        <Card className="quick-card span-2">
          <div className="card-head">
            <div>
              <h2>Quick actions</h2>
              <p>Jump into your most-used workflows</p>
            </div>
          </div>
          <div className="quick-grid">
            {[
              [Users, "Discover leads", "leads"],
              [Building2, "Research company", "leads"],
              [Globe2, "Audit website", "seo"],
              [FileText, "Generate blog", "content"],
              [Bot, "Open AI assistant", "assistant"],
            ].map(([Icon, label, section]) => (
              <button key={label as string} onClick={() => navigate(section as Section)}>
                <span>
                  <Icon size={18} />
                </span>
                {label}
                <ChevronRight size={15} />
              </button>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

function Assistant({ toast }: { toast: (s: string) => void }) {
  const [started, setStarted] = useState(false);
  const [input, setInput] = useState("");
  const [running, setRunning] = useState(false);
  const submit = () => {
    if (!input.trim()) return;
    setStarted(true);
    setRunning(true);
    setInput("");
    setTimeout(() => setRunning(false), 1400);
  };
  return (
    <div className="assistant-shell">
      <aside className="chat-history">
        <Button
          icon={Plus}
          onClick={() => {
            setStarted(false);
            setInput("");
          }}
        >
          New conversation
        </Button>
        <label>Today</label>
        <button className="active">
          <MessageSquareText size={15} />
          Bengaluru IT companies
        </button>
        <button>
          <MessageSquareText size={15} />
          Audit OpenGTM website
        </button>
        <label>Previous 7 days</label>
        <button>
          <MessageSquareText size={15} />
          SEO topic clusters
        </button>
        <button>
          <MessageSquareText size={15} />
          Research Fable Labs
        </button>
      </aside>
      <section className="chat-main">
        <div className="chat-title">
          <div>
            <strong>AI Growth Assistant</strong>
            <span>
              <i /> Ready to help
            </span>
          </div>
          <button>
            <MoreHorizontal size={18} />
          </button>
        </div>
        <div className={`messages ${!started ? "empty" : ""}`}>
          {!started ? (
            <div className="assistant-empty">
              <span className="assistant-mark">
                <Sparkles size={23} />
              </span>
              <h1>What would you like to accomplish today?</h1>
              <p>
                Your AI growth assistant can help you discover leads, research companies, optimize
                SEO and create content.
              </p>
              <div className="prompt-grid">
                {[
                  ["Find 20 SaaS companies in Bengaluru", Users],
                  ["Research this company and qualify it", Building2],
                  ["Audit my website for AI search visibility", Globe2],
                  ["Find SEO keywords for my business", Search],
                  ["Generate a blog article", FileText],
                  ["Create personalized outreach messages", Send],
                ].map(([text, Icon]) => (
                  <button
                    key={text as string}
                    onClick={() => {
                      setInput(text as string);
                    }}
                  >
                    <Icon size={17} />
                    <span>{text}</span>
                    <ArrowUp size={14} />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="conversation">
              <div className="message user">
                <div>
                  Find 20 IT companies in Bengaluru that may need website development services.
                </div>
                <span className="avatar small">AM</span>
              </div>
              <div className="message assistant">
                <span className="bot-avatar">
                  <Sparkles size={16} />
                </span>
                <div className="message-body">
                  <p>
                    I'll discover relevant companies, research their websites and evaluate their
                    suitability for your services.
                  </p>
                  <div className="execution">
                    <div className="execution-head">
                      <span>
                        <Activity size={15} />
                        Growth workflow
                      </span>
                      <Badge tone={running ? "warning" : "success"}>
                        {running ? "Running" : "Completed"}
                      </Badge>
                    </div>
                    {[
                      "Discovering companies",
                      "Researching websites",
                      "Evaluating ICP fit",
                      "Calculating lead scores",
                    ].map((step, i) => (
                      <div className="execution-step" key={step}>
                        {running && i === 3 ? (
                          <RefreshCw className="spin" size={14} />
                        ) : (
                          <Check size={14} />
                        )}
                        <span>{step}</span>
                        <small>
                          {i === 0
                            ? "20 found"
                            : i === 1
                              ? "20 reviewed"
                              : i === 2
                                ? "16 matched"
                                : "Scored"}
                        </small>
                      </div>
                    ))}
                  </div>
                  {!running && (
                    <div className="result-card">
                      <div className="result-head">
                        <div>
                          <strong>Company discovery results</strong>
                          <span>16 qualified companies · Bengaluru, India</span>
                        </div>
                        <Badge tone="success">Ready</Badge>
                      </div>
                      <div className="table-wrap">
                        <table>
                          <thead>
                            <tr>
                              <th>Company</th>
                              <th>Industry</th>
                              <th>ICP score</th>
                              <th>Status</th>
                              <th />
                            </tr>
                          </thead>
                          <tbody>
                            {companies.slice(0, 3).map((c) => (
                              <tr key={c.name}>
                                <td>
                                  <strong>{c.name}</strong>
                                  <span>{c.site}</span>
                                </td>
                                <td>{c.industry}</td>
                                <td>
                                  <b className="score">{c.score}</b>
                                </td>
                                <td>
                                  <Badge tone={c.status === "Hot" ? "danger" : "warning"}>
                                    {c.status}
                                  </Badge>
                                </td>
                                <td>
                                  <button className="icon-btn">
                                    <ExternalLink size={14} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="result-actions">
                        <Button
                          variant="secondary"
                          icon={Download}
                          onClick={() => toast("CSV export prepared")}
                        >
                          Export CSV
                        </Button>
                        <Button
                          variant="secondary"
                          icon={Check}
                          onClick={() => toast("16 leads saved to your workspace")}
                        >
                          Save leads
                        </Button>
                        <Button variant="ghost">
                          Open full results <ChevronRight size={14} />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="composer-wrap">
          <div className="composer">
            <textarea
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
              placeholder="Ask OpenGTM to research, analyze or create..."
            />
            <div>
              <span>
                <button className="icon-btn" title="Attach file">
                  <Paperclip size={17} />
                </button>
                <button className="model-select">
                  OpenGTM Pro <ChevronDown size={13} />
                </button>
                <button className="tool-pill">
                  <Zap size={13} /> All tools
                </button>
              </span>
              <button className="send-btn" onClick={submit} disabled={!input.trim()}>
                <ArrowUp size={17} />
              </button>
            </div>
          </div>
          <p>OpenGTM can make mistakes. Review generated research before using it.</p>
        </div>
      </section>
    </div>
  );
}

function DataTable({ selectable = true }: { selectable?: boolean }) {
  const [sortAsc, setSortAsc] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const data = useMemo(
    () =>
      [...companies].sort((a, b) =>
        sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    [sortAsc],
  );
  const toggle = (n: string) =>
    setSelected((s) => (s.includes(n) ? s.filter((x) => x !== n) : [...s, n]));
  return (
    <>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              {selectable && (
                <th>
                  <input
                    type="checkbox"
                    checked={selected.length === data.length}
                    onChange={() =>
                      setSelected(selected.length === data.length ? [] : data.map((c) => c.name))
                    }
                  />
                </th>
              )}
              <th>
                <button className="sort" onClick={() => setSortAsc(!sortAsc)}>
                  Company {sortAsc ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>
              </th>
              <th>Industry</th>
              <th>Location</th>
              <th>Description</th>
              <th>Research status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {data.map((c) => (
              <tr key={c.name}>
                {selectable && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(c.name)}
                      onChange={() => toggle(c.name)}
                    />
                  </td>
                )}
                <td>
                  <div className="company-cell">
                    <span>{c.name.slice(0, 1)}</span>
                    <div>
                      <strong>{c.name}</strong>
                      <a>{c.site}</a>
                    </div>
                  </div>
                </td>
                <td>{c.industry}</td>
                <td>{c.location}</td>
                <td className="desc-cell">{c.desc}</td>
                <td>
                  <Badge
                    tone={
                      c.research === "Complete"
                        ? "success"
                        : c.research === "Queued"
                          ? "neutral"
                          : "warning"
                    }
                  >
                    {c.research}
                  </Badge>
                </td>
                <td>
                  <button className="icon-btn">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <span>
          {selected.length ? `${selected.length} selected` : "Showing 1–5 of 42 companies"}
        </span>
        <div>
          <button className="icon-btn" disabled>
            <ChevronLeft size={16} />
          </button>
          <button className="page active">1</button>
          <button className="page">2</button>
          <button className="page">3</button>
          <button className="icon-btn">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

function Leads({ toast }: { toast: (s: string) => void }) {
  const [loading, setLoading] = useState(false);
  const discover = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast("42 matching companies discovered");
    }, 1100);
  };
  return (
    <>
      <PageHeader
        title="Discover Companies"
        subtitle="Find potential customers based on your ideal market."
        action={
          <Button variant="secondary" icon={Download} onClick={() => toast("Export started")}>
            Export CSV
          </Button>
        }
      />
      <Card className="filter-panel">
        <div className="field-grid">
          <label>
            Industry
            <select>
              <option>SaaS & Technology</option>
              <option>Professional services</option>
            </select>
          </label>
          <label>
            Location
            <div className="input-icon">
              <Search size={15} />
              <input defaultValue="Bengaluru, India" />
            </div>
          </label>
          <label>
            Company size
            <select>
              <option>11–200 employees</option>
              <option>201–500 employees</option>
            </select>
          </label>
          <label>
            Keywords
            <input placeholder="e.g. website redesign" />
          </label>
          <label>
            Number of companies
            <select>
              <option>50 companies</option>
              <option>100 companies</option>
            </select>
          </label>
          <label>
            Website
            <select>
              <option>Website available</option>
              <option>Any</option>
            </select>
          </label>
        </div>
        <div className="filter-actions">
          <span>
            <ListFilter size={15} />6 filters applied
          </span>
          <Button icon={loading ? RefreshCw : Search} onClick={discover}>
            {loading ? "Discovering..." : "Discover Companies"}
          </Button>
        </div>
      </Card>
      <Card className="table-card">
        <div className="table-toolbar">
          <div>
            <h2>Companies</h2>
            <Badge tone="neutral">42 results</Badge>
          </div>
          <div className="toolbar-actions">
            <div className="search-small">
              <Search size={15} />
              <input placeholder="Search results..." />
            </div>
            <Button variant="secondary" icon={Filter}>
              Filter
            </Button>
            <Button
              variant="secondary"
              icon={Check}
              onClick={() => toast("Selected companies saved")}
            >
              Save to leads
            </Button>
          </div>
        </div>
        <DataTable />
      </Card>
    </>
  );
}

function Qualification() {
  const criteria = [
    ["Company size", 20],
    ["Industry fit", 25],
    ["Digital maturity", 15],
    ["Pain signals", 20],
    ["Revenue signals", 10],
    ["Contact quality", 10],
  ];
  return (
    <>
      <PageHeader
        title="Lead Qualification"
        subtitle="Score, prioritize and manage leads that fit your ideal customer profile."
        action={<Button icon={Plus}>Create scoring profile</Button>}
      />
      <div className="mini-kpis">
        {[
          ["Total leads", "846"],
          ["Hot leads", "124"],
          ["Warm leads", "428"],
          ["Cold leads", "294"],
        ].map(([l, v], i) => (
          <Card key={l}>
            <span>{l}</span>
            <strong>{v}</strong>
            <small className={i === 0 ? "up" : ""}>
              {i === 0 ? "↑ 8.2%" : `${Math.round(+v / 8.46)}% of total`}
            </small>
          </Card>
        ))}
      </div>
      <div className="two-col">
        <Card>
          <div className="card-head">
            <div>
              <h2>Default ICP scoring profile</h2>
              <p>100 total points across 6 criteria</p>
            </div>
            <Button variant="ghost" icon={PenLine}>
              Edit profile
            </Button>
          </div>
          <div className="criteria">
            {criteria.map(([name, points]) => (
              <div key={name as string}>
                <span>{name}</span>
                <div>
                  <i>
                    <b style={{ width: `${(+points / 25) * 100}%` }} />
                  </i>
                  <strong>{points} pts</strong>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="score-preview">
          <div className="card-head">
            <div>
              <h2>Lead score preview</h2>
              <p>Fable Labs · fablelabs.io</p>
            </div>
            <Badge tone="danger">Hot lead</Badge>
          </div>
          <div className="score-ring">
            <div>
              <strong>94</strong>
              <span>/ 100</span>
            </div>
          </div>
          <div className="overall-progress">
            <span>Excellent ICP fit</span>
            <strong>94%</strong>
            <i>
              <b style={{ width: "94%" }} />
            </i>
          </div>
          <p className="insight">
            <Sparkles size={15} />
            Strong industry alignment and clear digital growth signals make this a high-priority
            lead.
          </p>
        </Card>
      </div>
      <Card className="table-card">
        <div className="table-toolbar">
          <div>
            <h2>Qualified leads</h2>
            <Badge tone="neutral">846 leads</Badge>
          </div>
          <div className="toolbar-actions">
            <div className="search-small">
              <Search size={15} />
              <input placeholder="Search leads..." />
            </div>
            <Button variant="secondary" icon={Filter}>
              All statuses
            </Button>
          </div>
        </div>
        <DataTable selectable={false} />
      </Card>
    </>
  );
}

function Outreach({ toast }: { toast: (s: string) => void }) {
  const [tab, setTab] = useState("Message Generator");
  const tabs = ["Message Generator", "Message Templates", "Follow-up Sequences", "Outreach Queue"];
  return (
    <>
      <PageHeader
        title="Outreach Management"
        subtitle="Create relevant, personalized messages and organize your outreach workflow."
        action={<Badge tone="warning">Sending integration not connected</Badge>}
      />
      <div className="tabs">
        {tabs.map((t) => (
          <button className={tab === t ? "active" : ""} onClick={() => setTab(t)} key={t}>
            {t}
          </button>
        ))}
      </div>
      {tab === "Message Generator" && (
        <div className="outreach-grid">
          <Card>
            <div className="card-head">
              <div>
                <h2>Generate a message</h2>
                <p>Use lead research to personalize every message.</p>
              </div>
            </div>
            <div className="form-stack">
              <label>
                Company
                <select>
                  <option>Fable Labs</option>
                  <option>Northstar AI</option>
                </select>
              </label>
              <label>
                Target contact
                <select>
                  <option>Aarav Mehta · VP of Growth</option>
                  <option>Priya Shah · Co-founder</option>
                </select>
              </label>
              <div className="form-row">
                <label>
                  Channel
                  <select>
                    <option>LinkedIn</option>
                    <option>Email</option>
                  </select>
                </label>
                <label>
                  Tone
                  <select>
                    <option>Warm & professional</option>
                    <option>Direct</option>
                  </select>
                </label>
              </div>
              <label>
                Goal
                <select>
                  <option>Start a conversation</option>
                  <option>Book a discovery call</option>
                </select>
              </label>
              <Button icon={Sparkles} onClick={() => toast("Personalized message generated")}>
                Generate personalized message
              </Button>
            </div>
          </Card>
          <Card className="message-preview">
            <div className="card-head">
              <div>
                <h2>Message preview</h2>
                <p>Personalized from company research</p>
              </div>
              <Badge tone="success">Generated</Badge>
            </div>
            <div className="generated-copy">
              <p>Hi Aarav,</p>
              <p>
                I noticed Fable Labs is expanding its product research platform for distributed
                teams. Your recent focus on turning customer insights into faster product decisions
                stood out.
              </p>
              <p>
                We help growing SaaS teams strengthen their digital acquisition with research-led
                website experiences. I put together a few ideas specific to Fable Labs—would it be
                useful if I sent them over?
              </p>
              <p>
                Best,
                <br />
                Alex
              </p>
            </div>
            <div className="preview-actions">
              <Button variant="secondary" icon={RefreshCw}>
                Regenerate
              </Button>
              <Button variant="secondary" icon={PenLine}>
                Edit
              </Button>
              <Button icon={Copy} onClick={() => toast("Message copied")}>
                Copy message
              </Button>
            </div>
          </Card>
        </div>
      )}
      {tab === "Message Templates" && (
        <div className="template-grid">
          {[
            "LinkedIn connection",
            "Warm introduction",
            "Value-led follow-up",
            "Post-demo follow-up",
          ].map((t, i) => (
            <Card key={t}>
              <span className="icon-box">
                <MessageSquareText size={17} />
              </span>
              <h3>{t}</h3>
              <p>
                {i % 2
                  ? "Friendly follow-up focused on one clear next step."
                  : "Concise, personalized opener for a new prospect."}
              </p>
              <small>Used {32 + i * 14} times</small>
              <Button variant="secondary">Use template</Button>
            </Card>
          ))}
        </div>
      )}
      {tab === "Follow-up Sequences" && (
        <Card>
          <div className="card-head">
            <div>
              <h2>Four-touch growth sequence</h2>
              <p>Draft sequence · sending requires a connected provider</p>
            </div>
            <label className="switch">
              <input type="checkbox" />
              <i />
            </label>
          </div>
          <div className="sequence">
            {[
              "Personalized introduction",
              "Share a useful observation",
              "Relevant customer outcome",
              "Close the loop",
            ].map((s, i) => (
              <div key={s}>
                <span>{i + 1}</span>
                <div>
                  <strong>{s}</strong>
                  <p>
                    {i ? `Wait ${i * 2 + 1} days after previous step` : "Send when sequence starts"}
                  </p>
                </div>
                <Badge tone="neutral">{i === 0 ? "LinkedIn" : "Email"}</Badge>
                <button className="icon-btn">
                  <PenLine size={15} />
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}
      {tab === "Outreach Queue" && (
        <Card className="empty-state">
          <span>
            <Send size={22} />
          </span>
          <h2>Your outreach queue is ready</h2>
          <p>
            Connect a sending provider or add approved messages to prepare your first outreach
            batch.
          </p>
          <Button icon={Plus}>Add messages</Button>
        </Card>
      )}
    </>
  );
}

function Seo({ toast }: { toast: (s: string) => void }) {
  const [url, setUrl] = useState("https://opengtm.app");
  const checks = [
    ["Page titles", "Passed", "Unique titles found on all key pages"],
    ["Meta descriptions", "Warning", "4 descriptions exceed 160 characters"],
    ["Heading structure", "Passed", "Clear H1–H3 hierarchy"],
    ["AI crawler access", "Passed", "GPTBot and ClaudeBot are permitted"],
    ["Organization schema", "Critical", "Organization structured data is missing"],
    ["FAQ schema", "Warning", "FAQ content exists without schema markup"],
  ];
  return (
    <>
      <PageHeader
        title="SEO & AEO Analytics"
        subtitle="Audit technical health and understand how discoverable your website is to AI search."
      />
      <Card className="audit-input">
        <div>
          <Globe2 size={18} />
          <input value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <Button icon={Play} onClick={() => toast("Simulated website audit started")}>
          Start Audit
        </Button>
      </Card>
      <div className="audit-kpis">
        {[
          ["Overall health", "86", "Good"],
          ["SEO score", "91", "+4 since last audit"],
          ["AEO score", "74", "Needs attention"],
          ["Critical issues", "3", "2 newly detected"],
        ].map(([l, v, s], i) => (
          <Card key={l}>
            <span>{l}</span>
            <div>
              <strong>
                {v}
                {i < 3 && <small>/100</small>}
              </strong>
              <Badge tone={i === 3 ? "danger" : i === 2 ? "warning" : "success"}>{s}</Badge>
            </div>
            <i>
              <b style={{ width: `${i === 3 ? 28 : v}%` }} />
            </i>
          </Card>
        ))}
      </div>
      <div className="tabs">
        <button className="active">Overview</button>
        <button>Technical SEO</button>
        <button>AI Search Readiness</button>
        <button>Issue Management</button>
        <button>Audit History</button>
      </div>
      <div className="two-col audit-results">
        <Card>
          <div className="card-head">
            <div>
              <h2>Technical SEO</h2>
              <p>Core website health checks</p>
            </div>
            <Badge tone="success">7 passed</Badge>
          </div>
          {checks.slice(0, 3).map(([n, status, detail]) => (
            <div className="check-row" key={n}>
              <span className={status.toLowerCase()}>
                {status === "Passed" ? (
                  <Check size={14} />
                ) : status === "Critical" ? (
                  <X size={14} />
                ) : (
                  "!"
                )}
              </span>
              <div>
                <strong>{n}</strong>
                <p>{detail}</p>
              </div>
              <ChevronRight size={15} />
            </div>
          ))}
        </Card>
        <Card>
          <div className="card-head">
            <div>
              <h2>AI search readiness</h2>
              <p>Visibility for AI answer engines</p>
            </div>
            <Badge tone="warning">2 issues</Badge>
          </div>
          {checks.slice(3).map(([n, status, detail]) => (
            <div className="check-row" key={n}>
              <span className={status.toLowerCase()}>
                {status === "Passed" ? (
                  <Check size={14} />
                ) : status === "Critical" ? (
                  <X size={14} />
                ) : (
                  "!"
                )}
              </span>
              <div>
                <strong>{n}</strong>
                <p>{detail}</p>
              </div>
              <ChevronRight size={15} />
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}

function Keywords({ toast }: { toast: (s: string) => void }) {
  const rows = [
    ["ai lead generation", "Commercial", "AI lead generation", "High", "Solution page"],
    ["b2b lead qualification", "Informational", "Lead qualification", "High", "Guide"],
    ["go to market automation", "Commercial", "GTM strategy", "High", "Comparison"],
    ["what is aeo", "Informational", "AI visibility", "Medium", "Educational article"],
    ["ai visibility audit", "Transactional", "AI visibility", "High", "Product page"],
  ];
  return (
    <>
      <PageHeader
        title="Keyword Research"
        subtitle="Find relevant topics, understand intent and organize your content strategy."
        action={
          <Button variant="secondary" icon={Download}>
            Export
          </Button>
        }
      />
      <Card className="keyword-search">
        <label>
          Website domain
          <div className="input-icon">
            <Globe2 size={15} />
            <input defaultValue="opengtm.app" />
          </div>
        </label>
        <label>
          Seed keyword
          <div className="input-icon">
            <Search size={15} />
            <input defaultValue="AI lead generation" />
          </div>
        </label>
        <Button icon={Sparkles} onClick={() => toast("Keyword opportunities generated")}>
          Discover keywords
        </Button>
      </Card>
      <div className="notice">
        <CircleHelp size={16} />
        <div>
          <strong>About keyword metrics</strong>
          <p>
            Relevance and opportunities are AI-estimated from your inputs. Live search volume and
            ranking data are unavailable in this prototype.
          </p>
        </div>
      </div>
      <div className="cluster-grid">
        {[
          ["AI lead generation", "12 keywords", "High relevance"],
          ["Lead qualification", "8 keywords", "High relevance"],
          ["AI visibility", "14 keywords", "Medium relevance"],
          ["GTM strategy", "8 keywords", "High relevance"],
        ].map(([n, count, rel], i) => (
          <Card key={n}>
            <div>
              <span className="cluster-icon">
                <Grip size={16} />
              </span>
              <Badge tone={i === 2 ? "warning" : "success"}>{rel}</Badge>
            </div>
            <h3>{n}</h3>
            <p>
              {count} · {i + 2} content opportunities
            </p>
            <button className="text-link">
              View cluster <ChevronRight size={14} />
            </button>
          </Card>
        ))}
      </div>
      <Card className="table-card">
        <div className="table-toolbar">
          <div>
            <h2>Keyword opportunities</h2>
            <Badge tone="neutral">42 estimated</Badge>
          </div>
          <Button variant="secondary" icon={Filter}>
            Filter
          </Button>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Keyword</th>
                <th>Search intent</th>
                <th>Cluster</th>
                <th>Relevance</th>
                <th>Content opportunity</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]}>
                  <td>
                    <strong>{r[0]}</strong>
                  </td>
                  <td>
                    <Badge tone="neutral">{r[1]}</Badge>
                  </td>
                  <td>{r[2]}</td>
                  <td>
                    <Badge tone={r[3] === "High" ? "success" : "warning"}>{r[3]}</Badge>
                  </td>
                  <td>{r[4]}</td>
                  <td>
                    <button className="icon-btn">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

function ContentStudio({ toast }: { toast: (s: string) => void }) {
  const [generated, setGenerated] = useState(true);
  return (
    <>
      <PageHeader
        title="Content Studio"
        subtitle="Create useful, search-ready content grounded in your business context."
        action={
          <Button variant="secondary" icon={Clock3}>
            Content history
          </Button>
        }
      />
      <div className="content-layout">
        <Card className="content-form">
          <div className="card-head">
            <div>
              <h2>Article brief</h2>
              <p>Define the direction for your draft.</p>
            </div>
          </div>
          <div className="form-stack">
            <label>
              Target keyword
              <input defaultValue="AI visibility for B2B brands" />
            </label>
            <label>
              Blog topic
              <textarea
                rows={3}
                defaultValue="How B2B brands can improve visibility in AI search engines"
              />
            </label>
            <label>
              Website domain
              <input defaultValue="opengtm.app" />
            </label>
            <div className="form-row">
              <label>
                Writing tone
                <select>
                  <option>Clear & authoritative</option>
                </select>
              </label>
              <label>
                Content length
                <select>
                  <option>1,500–2,000 words</option>
                </select>
              </label>
            </div>
            <label>
              Target audience
              <input defaultValue="B2B marketing and growth leaders" />
            </label>
            <Button
              icon={Sparkles}
              onClick={() => {
                setGenerated(true);
                toast("Article draft generated");
              }}
            >
              Generate Article
            </Button>
          </div>
        </Card>
        <Card className="editor-card">
          <div className="editor-toolbar">
            <div>
              <button>
                <strong>B</strong>
              </button>
              <button>
                <em>I</em>
              </button>
              <button>H1</button>
              <button>H2</button>
              <i />
              <button>
                <Link2 size={15} />
              </button>
              <button>
                <ListFilter size={15} />
              </button>
            </div>
            <span>Saved just now</span>
          </div>
          {generated ? (
            <article contentEditable suppressContentEditableWarning>
              <h1>How B2B Brands Can Improve Visibility in AI Search</h1>
              <p className="lede">
                Search is changing. Buyers increasingly ask AI assistants for recommendations,
                comparisons and advice—often before they visit a traditional search engine.
              </p>
              <h2>What AI visibility means for B2B teams</h2>
              <p>
                AI visibility is the likelihood that your brand, expertise and content will be
                found, understood and referenced by answer engines. It depends on clear information
                architecture, credible subject matter and machine-readable context.
              </p>
              <h2>Build a foundation answer engines can trust</h2>
              <p>
                Start with technically accessible pages, a consistent organization identity and
                useful content that answers the real questions your buyers ask. Structured data can
                clarify context, but it cannot replace first-hand expertise.
              </p>
              <blockquote>
                Focus on being the clearest, most useful source—not on writing for a machine.
              </blockquote>
              <h2>A practical improvement plan</h2>
              <p>
                Audit crawler access, strengthen topic clusters, add relevant schema and publish
                original points of view. Review visibility regularly as answer engines and buyer
                behavior evolve.
              </p>
            </article>
          ) : (
            <div className="empty-state">
              <FileText size={22} />
              <h2>No draft yet</h2>
            </div>
          )}
          <div className="editor-footer">
            <span>1,642 words · 8 min read</span>
            <div>
              <Button variant="secondary" icon={RefreshCw}>
                Regenerate section
              </Button>
              <Button variant="secondary" icon={Download}>
                Export Markdown
              </Button>
              <Button icon={Check} onClick={() => toast("Draft saved")}>
                Save draft
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

function Integrations({ toast }: { toast: (s: string) => void }) {
  const integrations = [
    {
      name: "Google Gemini",
      desc: "Power AI research and content generation with your own Gemini API key.",
      icon: Sparkles,
      status: "Not connected",
      fields: ["API key", "Model selection"],
    },
    {
      name: "Google Sheets",
      desc: "Sync qualified leads and project results to your team spreadsheets.",
      icon: Database,
      status: "Not connected",
      fields: ["Webhook URL", "Authentication token"],
    },
    {
      name: "Custom Webhooks",
      desc: "Send workspace events to your own tools and automated workflows.",
      icon: Webhook,
      status: "No endpoints",
      fields: ["Endpoint URL", "Signing secret"],
    },
  ];
  return (
    <>
      <PageHeader
        title="Integrations"
        subtitle="Connect OpenGTM with the tools your growth team already uses."
        action={
          <Button variant="secondary" icon={CircleHelp}>
            View documentation
          </Button>
        }
      />
      <div className="integration-grid">
        {integrations.map(({ name, desc, icon: Icon, status, fields }) => (
          <Card key={name} className="integration-card">
            <div className="integration-title">
              <span>
                <Icon size={20} />
              </span>
              <Badge tone="neutral">{status}</Badge>
            </div>
            <h2>{name}</h2>
            <p>{desc}</p>
            <div className="integration-fields">
              {fields.map((f, i) => (
                <label key={f}>
                  {f}
                  <div className="masked-input">
                    <input
                      type={i === 0 && name !== "Google Sheets" ? "password" : "text"}
                      placeholder={i === 0 ? "••••••••••••••••" : `Choose ${f.toLowerCase()}`}
                    />
                    <button className="icon-btn">
                      {i === 0 ? <KeyRound size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </label>
              ))}
            </div>
            <div className="integration-actions">
              <Button variant="secondary" onClick={() => toast(`${name} test simulated`)}>
                Test connection
              </Button>
              <Button onClick={() => toast(`${name} settings saved`)}>Save configuration</Button>
            </div>
          </Card>
        ))}
      </div>
      <Card className="webhook-history">
        <div className="card-head">
          <div>
            <h2>Recent delivery activity</h2>
            <p>Webhook attempts will appear here after an endpoint is configured.</p>
          </div>
        </div>
        <div className="empty-inline">
          <Webhook size={20} />
          <span>No deliveries yet</span>
        </div>
      </Card>
    </>
  );
}

function SettingsPage({
  activeChild,
  onTabChange,
  toast,
}: {
  activeChild: string;
  onTabChange: (tab: string) => void;
  toast: (s: string) => void;
}) {
  const tabs = ["My Profile", "Preferences", "API Keys", "Usage & Limits", "Security"];
  const tab = tabs.includes(activeChild) ? activeChild : "My Profile";
  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Manage your profile, workspace preferences and account security."
      />
      <div className="settings-layout">
        <aside>
          {tabs.map((t) => (
            <button className={tab === t ? "active" : ""} onClick={() => onTabChange(t)} key={t}>
              {t === "My Profile" ? (
                <Users size={16} />
              ) : t === "Security" ? (
                <ShieldCheck size={16} />
              ) : t === "API Keys" ? (
                <KeyRound size={16} />
              ) : (
                <Settings size={16} />
              )}
              {t}
            </button>
          ))}
        </aside>
        <div>
          {tab === "My Profile" && (
            <Card>
              <div className="settings-head">
                <h2>Personal information</h2>
                <p>Update your profile details and public workspace identity.</p>
              </div>
              <div className="profile-row">
                <span className="avatar large">AM</span>
                <div>
                  <Button variant="secondary">Change photo</Button>
                  <p>JPG, GIF or PNG. 2 MB maximum.</p>
                </div>
              </div>
              <div className="settings-form">
                <div className="form-row">
                  <label>
                    First name
                    <input defaultValue="Alex" />
                  </label>
                  <label>
                    Last name
                    <input defaultValue="Morgan" />
                  </label>
                </div>
                <label>
                  Email address
                  <input defaultValue="alex@opengtm.app" />
                </label>
                <label>
                  Job title
                  <input defaultValue="Growth Lead" />
                </label>
                <label>
                  Time zone
                  <select>
                    <option>(GMT+05:30) India Standard Time</option>
                  </select>
                </label>
              </div>
              <div className="settings-save">
                <Button onClick={() => toast("Profile changes saved")}>Save changes</Button>
              </div>
            </Card>
          )}
          {tab === "Preferences" && (
            <Card>
              <div className="settings-head">
                <h2>Account preferences</h2>
                <p>Customize how OpenGTM works for you.</p>
              </div>
              {[
                "Weekly activity summary",
                "Lead qualification alerts",
                "Product updates",
                "AI task completion",
              ].map((x, i) => (
                <div className="preference-row" key={x}>
                  <div>
                    <strong>{x}</strong>
                    <p>
                      {i % 2
                        ? "Receive an in-app notification when this occurs."
                        : "Receive this update by email."}
                    </p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked={i !== 2} />
                    <i />
                  </label>
                </div>
              ))}
            </Card>
          )}
          {tab === "API Keys" && (
            <Card>
              <div className="settings-head">
                <h2>API key management</h2>
                <p>Keys provide access to this prototype workspace. Never share them publicly.</p>
              </div>
              <div className="key-row">
                <span>
                  <KeyRound size={18} />
                </span>
                <div>
                  <strong>Development key</strong>
                  <p>ogtm_••••••••••••••8f2a · Created May 12, 2025</p>
                </div>
                <Badge tone="success">Active</Badge>
                <button className="icon-btn">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <Button icon={Plus}>Create API key</Button>
            </Card>
          )}
          {tab === "Usage & Limits" && (
            <Card>
              <div className="settings-head">
                <h2>Usage & limits</h2>
                <p>Simulated workspace usage for the current billing period.</p>
              </div>
              <div className="usage-summary">
                <div>
                  <span>Gemini API calls</span>
                  <strong>6,482</strong>
                  <p>of 10,000 monthly calls</p>
                  <i>
                    <b style={{ width: "65%" }} />
                  </i>
                </div>
                <div>
                  <span>Daily usage</span>
                  <strong>284</strong>
                  <p>calls today</p>
                </div>
                <div>
                  <span>API errors</span>
                  <strong>12</strong>
                  <p>0.18% error rate</p>
                </div>
              </div>
              <MiniLineChart />
            </Card>
          )}
          {tab === "Security" && (
            <Card>
              <div className="settings-head">
                <h2>Security</h2>
                <p>Manage your password and active account protections.</p>
              </div>
              <div className="security-item">
                <div>
                  <strong>Password</strong>
                  <p>Last changed 48 days ago</p>
                </div>
                <Button variant="secondary">Change password</Button>
              </div>
              <div className="security-item">
                <div>
                  <strong>Two-factor authentication</strong>
                  <p>Add an extra layer of security to your account.</p>
                </div>
                <Button>Enable 2FA</Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

function GenericSubPage({ section, child }: { section: Section; child: string }) {
  const group = navGroups.find((g) => g.id === section)!;
  return (
    <>
      <PageHeader
        title={child}
        subtitle={`Manage ${child.toLowerCase()} across your ${group.label.toLowerCase()} workspace.`}
        action={<Button icon={Plus}>Create new</Button>}
      />
      <Card className="subpage-card">
        <span className="icon-box">
          <group.icon size={20} />
        </span>
        <h2>{child}</h2>
        <p>
          This workspace is ready for your next {child.toLowerCase()} project. Use the primary
          section view to explore realistic demo data and interactions.
        </p>
        <Button variant="secondary">View all activity</Button>
      </Card>
    </>
  );
}

export default function App() {
  const [section, setSection] = useState<Section>("dashboard");
  const [activeChild, setActiveChild] = useState("Overview");
  const [expanded, setExpanded] = useState<Section[]>(["dashboard"]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [notifications, setNotifications] = useState(false);
  const toast = (s: string) => {
    setToastMsg(s);
    setTimeout(() => setToastMsg(""), 2800);
  };
  const navigate = (s: Section, child?: string) => {
    setSection(s);
    setActiveChild(child || navGroups.find((g) => g.id === s)!.children[0]);
    setExpanded((e) => (e.includes(s) ? e : [...e, s]));
    setMobileOpen(false);
  };
  const primaryChildren: Record<Section, string> = {
    dashboard: "Overview",
    assistant: "New Chat",
    leads: "Discover Companies",
    qualification: "Lead Scoring",
    outreach: "Message Generator",
    seo: "Website Audit",
    keywords: "Keyword Discovery",
    content: "Blog Generator",
    integrations: "Google Gemini",
    settings: "My Profile",
  };
  const showPrimary =
    activeChild === primaryChildren[section] ||
    (section === "qualification" && activeChild === "Qualified Leads");
  const render = () => {
    if (!showPrimary && section !== "settings")
      return <GenericSubPage section={section} child={activeChild} />;
    switch (section) {
      case "dashboard":
        return <Dashboard navigate={navigate} />;
      case "assistant":
        return <Assistant toast={toast} />;
      case "leads":
        return <Leads toast={toast} />;
      case "qualification":
        return <Qualification />;
      case "outreach":
        return <Outreach toast={toast} />;
      case "seo":
        return <Seo toast={toast} />;
      case "keywords":
        return <Keywords toast={toast} />;
      case "content":
        return <ContentStudio toast={toast} />;
      case "integrations":
        return <Integrations toast={toast} />;
      case "settings":
        return (
          <SettingsPage
            activeChild={activeChild}
            onTabChange={(child) => navigate("settings", child)}
            toast={toast}
          />
        );
    }
  };
  return (
    <div className="app-shell">
      {mobileOpen && <button className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand">
          <span>
            <Rocket size={18} />
          </span>
          <strong>OpenGTM</strong>
          <button className="mobile-close" onClick={() => setMobileOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <button className="workspace">
          <span className="workspace-logo">OG</span>
          <div>
            <strong>OpenGTM</strong>
            <small>Growth workspace</small>
          </div>
          <ChevronDown size={14} />
        </button>
        <Button icon={Plus} onClick={() => navigate("assistant")}>
          New Chat
        </Button>
        <nav>
          {navGroups.map((g) => {
            const Icon = g.icon;
            const open = expanded.includes(g.id);
            return (
              <div className="nav-group" key={g.id}>
                <button
                  className={`nav-parent ${section === g.id ? "active" : ""}`}
                  onClick={() =>
                    setExpanded((e) => (open ? e.filter((x) => x !== g.id) : [...e, g.id]))
                  }
                >
                  <Icon size={17} />
                  <span>{g.label}</span>
                  <ChevronDown className={open ? "rotated" : ""} size={14} />
                </button>
                {open && (
                  <div className="nav-children">
                    {g.children.map((c) => (
                      <button
                        key={c}
                        className={section === g.id && activeChild === c ? "active" : ""}
                        onClick={() => navigate(g.id, c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <button>
            <CircleHelp size={16} />
            <span>Help & documentation</span>
          </button>
          <div className="user-block">
            <span className="avatar">AM</span>
            <div>
              <strong>Alex Morgan</strong>
              <small>alex@opengtm.app</small>
            </div>
            <MoreHorizontal size={16} />
          </div>
        </div>
      </aside>
      <div className="app-main">
        <header className="topbar">
          <div>
            <button className="menu-btn" onClick={() => setMobileOpen(true)}>
              <Menu size={19} />
            </button>
            <span>{navGroups.find((g) => g.id === section)?.label}</span>
            <ChevronRight size={13} />
            <strong>{activeChild}</strong>
          </div>
          <div className="top-actions">
            <div className="global-search">
              <Search size={15} />
              <input placeholder="Search workspace..." />
              <kbd>⌘ K</kbd>
            </div>
            <button className="icon-btn" title="Help">
              <CircleHelp size={18} />
            </button>
            <div className="notification-wrap">
              <button className="icon-btn" onClick={() => setNotifications(!notifications)}>
                <Bell size={18} />
                <i />
              </button>
              {notifications && (
                <div className="popover">
                  <strong>Notifications</strong>
                  <div>
                    <CheckCircle2 size={16} />
                    <span>
                      <b>Audit complete</b>
                      <small>opengtm.app scored 86</small>
                    </span>
                  </div>
                  <div>
                    <Users size={16} />
                    <span>
                      <b>16 new leads found</b>
                      <small>2 minutes ago</small>
                    </span>
                  </div>
                </div>
              )}
            </div>
            <span className="avatar">AM</span>
          </div>
        </header>
        <main className={section === "assistant" ? "assistant-page" : ""}>{render()}</main>
      </div>
      {toastMsg && (
        <div className="toast">
          <CheckCircle2 size={17} />
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg("")}>
            <X size={15} />
          </button>
        </div>
      )}
      <SpeedInsights />
    </div>
  );
}
