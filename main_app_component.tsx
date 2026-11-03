import React, { useState, useEffect, useRef } from 'react';
import { 
  Database, 
  FileSpreadsheet, 
  BarChart3, 
  Terminal, 
  Award, 
  GraduationCap, 
  MapPin, 
  CheckCircle, 
  Mail, 
  ChevronRight, 
  Layers, 
  Filter, 
  Cpu, 
  Activity, 
  User, 
  Copy, 
  Check,
  X,
  ExternalLink,
  Code2,
  TrendingUp,
  FileText,
  Phone,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Download
} from 'lucide-react';

const USER_PROFILE = {
  name: "Sakib Munshi",
  title: "Aspiring Data Analyst | Business Analytics Enthusiast",
  role: "Data Analyst / Business Intelligence Enthusiast",
  location: "Dhaka, Bangladesh",
  institution: "American International University-Bangladesh (AIUB)",
  degree: "BBA Student",
  avatar: "https://lh3.googleusercontent.com/d/1CXfE-cgLeVon68Ry6mjusa4gBBX0YrlC",
  cvUrl: "https://drive.google.com/file/d/1tf5Cs_IGxOjtYvgwG-4jiwQ2DfDlrTjg/view?usp=sharing",
  contact: {
    phone: "+880 1918-546635",
    whatsapp: "https://wa.me/8801918546635",
    email: "munshisakib094@gmail.com",
    linkedin: "https://www.linkedin.com/in/shakib-munshi-321513403/",
    facebook: "https://www.facebook.com/share/19jNJdfaDw/",
    instagram: "https://www.instagram.com/munshi_shakib_/",
    x: "https://x.com/sakibmunshi07",
    github: "https://github.com/munshi-sakib"
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [activeNav, setActiveNav] = useState('hero');

  const canvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollProgress(currentProgress);

      const sections = ['hero', 'about', 'skills', 'certifications', 'projects', 'workflow', 'contact', 'cv'];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveNav(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'BUTTON' || 
        e.target.tagName === 'A' || 
        e.target.closest('button') || 
        e.target.closest('a')
      ) {
        setCursorHovered(true);
      } else {
        setCursorHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 65);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.8 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#A855F7';
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 217, 255, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const copyToClipboard = (text, type = 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const metrics = [
    { label: "SQL Queries Written", count: "450+", icon: <Database className="w-5 h-5 text-cyan-400" /> },
    { label: "Excel Dashboards Built", count: "25+", icon: <FileSpreadsheet className="w-5 h-5 text-purple-400" /> },
    { label: "Python Analytics Scripts", count: "80+", icon: <Terminal className="w-5 h-5 text-cyan-400" /> },
    { label: "Data Accuracy Focus", count: "100%", icon: <Award className="w-5 h-5 text-purple-400" /> },
  ];

  const certifications = [
    {
      title: "Microsoft Excel for Data Analysis",
      issuer: "Simplilearn",
      year: "2026",
      icon: <FileSpreadsheet className="w-5 h-5 text-purple-400" />,
      skills: ["Advanced Excel", "Pivot Tables", "Power Query", "Data Modeling"],
      certUrl: "https://media.licdn.com/dms/image/v2/D562DAQF15ICQjSX3dQ/profile-treasury-document-images_1280/B56Z3aJ5qcJwAU-/1/1777481524651?e=1794441600&v=beta&t=Q31ClyfGZ_9JeXG2oMoUnKkzKgHTjNtuDt7wkMFXmDE"
    },
    {
      title: "Power BI Job-Ready Program",
      issuer: "Simplilearn",
      year: "2026",
      icon: <BarChart3 className="w-5 h-5 text-cyan-400" />,
      skills: ["DAX Measures", "Star Schema", "Dashboard UX", "Business Intelligence"],
      certUrl: "https://media.licdn.com/dms/image/v2/D562DAQFHGxzSnPj8Lg/profile-treasury-image-shrink_1280_1280/B56Z.kXgbBHYAY-/0/1785169053645?e=1794315600&v=beta&t=oXUjFcf1SmS6uKMbJKG8QHNS6GmZmfJkHlKhRR94XVQ"
    },
    {
      title: "SQL Database Management",
      issuer: "Simplilearn",
      year: "2026",
      icon: <Database className="w-5 h-5 text-purple-400" />,
      skills: ["MySQL", "CTEs & Joins", "Aggregations", "Query Optimization"],
      certUrl: "https://media.licdn.com/dms/image/v2/D562DAQHXIzWjP-oRXQ/profile-treasury-document-images_1280/B56aEaeJ27G4Ag-/1/1791445476427?e=1794441600&v=beta&t=IqBLl-iZYuLvov73gTIEgKEuhMiGTkhWKad5R6y0htc"
    },
    {
      title: "Python for Data Analysis",
      issuer: "Simplilearn",
      year: "2026",
      icon: <Terminal className="w-5 h-5 text-cyan-400" />,
      skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn EDA"],
      certUrl: "https://media.licdn.com/dms/image/v2/D562DAQGvnVHejQAMXg/profile-treasury-document-images_1280/B56aEatM14HAAg-/1/1791449420840?e=1794441600&v=beta&t=MI-UnL4xLJ39pEOJ9653F0qPirJzNCzps_JacYhqDiw"
    }
  ];

  const skillCategories = [
    {
      id: "excel",
      title: "Spreadsheet Powerhouse",
      icon: <FileSpreadsheet className="w-6 h-6 text-purple-400" />,
      skills: [
        { name: "Microsoft Excel", level: 92 },
        { name: "Advanced Excel Formulas", level: 90 },
        { name: "Power Query & ETL", level: 85 },
        { name: "Pivot Tables & Charts", level: 95 },
        { name: "Excel Dashboard Design", level: 88 },
      ]
    },
    {
      id: "sql",
      title: "Database & Querying",
      icon: <Database className="w-6 h-6 text-cyan-400" />,
      skills: [
        { name: "SQL (MySQL)", level: 85 },
        { name: "Data Aggregation & Joins", level: 90 },
        { name: "Subqueries & CTEs", level: 82 },
        { name: "Data Cleaning & Wrangling", level: 88 },
        { name: "Schema Fundamentals", level: 78 },
      ]
    },
    {
      id: "bi",
      title: "BI & Visualization",
      icon: <BarChart3 className="w-6 h-6 text-purple-400" />,
      skills: [
        { name: "Power BI", level: 84 },
        { name: "DAX Measures", level: 78 },
        { name: "Interactive Visualizations", level: 90 },
        { name: "Business Data Storytelling", level: 86 },
        { name: "KPI Tracking Systems", level: 85 },
      ]
    },
    {
      id: "python",
      title: "Python Analytics",
      icon: <Terminal className="w-6 h-6 text-cyan-400" />,
      skills: [
        { name: "Python Core", level: 80 },
        { name: "Pandas DataFrames", level: 85 },
        { name: "NumPy Operations", level: 78 },
        { name: "Matplotlib Visuals", level: 82 },
        { name: "Seaborn Charts", level: 84 },
      ]
    }
  ];

  const projects = [
    {
      id: 1,
      category: "powerbi",
      title: "Blinkit Sales Analysis",
      subtitle: "Product Performance, Outlet Trends & Revenue Distribution",
      tags: ["Power BI", "SQL", "DAX", "Data Modeling"],
      github: "https://github.com/munshi-sakib/BlinKit-Bi-Project",
      shortDesc: "Analyzed 50,000+ sales records using Power BI and SQL to evaluate product performance, outlet trends, and revenue distribution across location tiers.",
      problem: "Blinkit required clear visibility into outlet performance metrics, item category sales, and regional revenue breakdown across different tier cities.",
      solution: "Engineered SQL aggregation queries and an interactive Power BI dashboard tracking $1.2M total sales, unit volume (8.52K items), and location tier profitability.",
      insights: [
        "Tracked $1.2M in total sales across 8.52K total items sold.",
        "Identified Tier 3 outlets as top revenue contributors ($472.13K, representing 39.34% of total sales).",
        "Highlighted key growth opportunities in high-volume, low-margin product categories."
      ],
      metrics: { primary: "$1.2M Sales", label: "Tracked in Power BI" },
      type: "Power BI & SQL Analytics"
    },
    {
      id: 2,
      category: "excel",
      title: "Walmart Sales Analysis",
      subtitle: "3-Year Multi-Category Sales & Payment Performance Dashboard",
      tags: ["Microsoft Excel", "Pivot Tables", "PivotCharts", "Dynamic Slicers"],
      github: "https://github.com/munshi-sakib/Walmart-Sales-Analysis",
      shortDesc: "Designed an interactive Excel dashboard tracking sales performance, product categories, and payment methods across 3 years of transaction history.",
      problem: "Lack of a centralized visual report to quickly filter and examine multi-year sales velocity, payment channel preference, and product line growth.",
      solution: "Built dynamic Pivot Tables, interconnected PivotCharts, custom KPI summary blocks, and multi-field slicers for real-time manager filtering.",
      insights: [
        "Uncovered multi-year purchasing trends across product categories to optimize inventory stocking.",
        "Mapped customer payment preferences across credit card, e-wallet, and cash channels.",
        "Streamlined quarterly sales reporting with dynamic interactive slicer controls."
      ],
      metrics: { primary: "3 Years Data", label: "Interactive Reporting" },
      type: "Microsoft Excel Dashboard"
    },
    {
      id: 3,
      category: "sql",
      title: "E-Commerce Customer & Transaction Analytics",
      subtitle: "Relational Querying, Segmentation & Cohort Analysis in MySQL",
      tags: ["MySQL", "Joins & Aggregations", "CTE & Subqueries", "Window Functions"],
      github: "https://github.com/munshi-sakib",
      shortDesc: "Analyzed 75,000+ relational database records using MySQL to uncover customer purchasing behavior, repeat order rates, and order fulfillment bottlenecks.",
      problem: "E-commerce platform lacked actionable insights on customer retention rates and high-value purchaser segments across geographical regions.",
      solution: "Wrote optimized SQL queries using CTEs, Window Functions (DENSE_RANK, LEAD/LAG), and complex joins to aggregate user retention cohorts.",
      insights: [
        "Discovered that repeat buyers made up 24% of user base but generated 58% of total gross revenue.",
        "Identified 14-day post-purchase re-engagement window as the optimal cross-selling inflection point.",
        "Highlighted critical fulfillment delays in 3 specific shipping zones via timestamp diff queries."
      ],
      metrics: { primary: "75K+ Records", label: "SQL Queries Executed" },
      type: "SQL / MySQL Analytics"
    },
    {
      id: 4,
      category: "python",
      title: "Telecom Customer Churn Analytics & EDA",
      subtitle: "Exploratory Data Analysis & Behavioral Pattern Modeling",
      tags: ["Python", "Pandas", "NumPy", "Seaborn", "Matplotlib"],
      github: "https://github.com/munshi-sakib",
      shortDesc: "In-depth exploratory data analysis using Python's data science stack to isolate key demographic and behavioral indicators driving subscription cancellations.",
      problem: "High annual subscriber drop-off rates without clear visibility into customer friction points or service plan dissatisfaction.",
      solution: "Constructed Python data processing pipelines using Pandas for handling missing data/outliers and Seaborn/Matplotlib for multi-variate statistical visualization.",
      insights: [
        "Month-to-month contract holders exhibited a 42% higher churn rate compared to annual plan subscribers.",
        "Customers without tech support add-ons had a 3.1x higher probability of canceling subscriptions within 6 months.",
        "Formulated data-backed retention recommendations presented in a clean executive visual deck."
      ],
      metrics: { primary: "25+ Visuals", label: "EDA Graphs Generated" },
      type: "Python EDA Project"
    }
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Data Extraction & Querying",
      desc: "Sourcing structured data from relational databases (SQL) and raw files (CSV/Excel). Querying and aggregating datasets with precision.",
      icon: <Database className="w-6 h-6 text-purple-400" />
    },
    {
      step: "02",
      title: "Data Cleaning & Wrangling",
      desc: "Transforming messy, incomplete data using Power Query and Python (Pandas). Removing anomalies, handling missing values, and validating data integrity.",
      icon: <Filter className="w-6 h-6 text-cyan-400" />
    },
    {
      step: "03",
      title: "Exploratory Analysis & BI Modeling",
      desc: "Analyzing statistical patterns, modeling star-schemas, writing DAX measures, and discovering non-obvious correlations.",
      icon: <Cpu className="w-6 h-6 text-purple-400" />
    },
    {
      step: "04",
      title: "Visual Storytelling & Insights",
      desc: "Designing intuitive dashboards in Power BI and Excel that empower decision-makers to transform numbers into actionable strategic growth.",
      icon: <Activity className="w-6 h-6 text-cyan-400" />
    }
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <div className="bg-[#08090D] text-[#F5F5F7] min-h-screen relative overflow-x-hidden">
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-400 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div 
        className={`hidden md:block fixed pointer-events-none z-50 rounded-full border border-cyan-400/50 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 ${
          cursorHovered ? 'w-14 h-14 bg-purple-500/10 border-purple-400 scale-110 shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'w-8 h-8 bg-cyan-400/5 shadow-[0_0_10px_rgba(0,217,255,0.2)]'
        }`}
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />
      <div 
        className="hidden md:block fixed pointer-events-none z-50 w-2 h-2 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />

      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-0 opacity-60"
      />

      <header className="fixed top-0 left-0 w-full z-40 backdrop-blur-md bg-[#08090D]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1px] shadow-lg shadow-purple-500/20">
              <div className="w-full h-full bg-[#10131B] rounded-[7px] flex items-center justify-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                SM
              </div>
            </div>
            <span className="font-bold tracking-wider text-sm hidden sm:inline text-white">
              MUNSHI <span className="text-cyan-400 font-mono text-xs">/ ANALYTICS</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#9298A5]">
            {[
              { id: 'hero', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'certifications', label: 'Certifications' },
              { id: 'projects', label: 'Projects' },
              { id: 'workflow', label: 'Workflow' },
              { id: 'contact', label: 'Contact' },
              { id: 'cv', label: 'Download CV' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`hover:text-white transition-colors relative py-1 ${
                  activeNav === link.id ? 'text-cyan-400 font-semibold' : ''
                }`}
              >
                {link.label}
                {activeNav === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#10131B] border border-cyan-500/30 px-3 py-1.5 rounded-full shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs text-slate-300 font-medium">Available</span>
            </div>
          </div>
        </div>
      </header>

      <section id="hero" className="pt-24 pb-16 px-6 max-w-7xl mx-auto relative z-10">
        <div className="bg-gradient-to-r from-[#10131B] via-[#0D0F17] to-[#10131B] border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative group w-full max-w-sm">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-600 opacity-60 group-hover:opacity-100 transition duration-500 blur-md" />
                <div className="relative rounded-2xl bg-[#08090D] p-3 border border-white/10 overflow-hidden shadow-2xl">
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-900">
                    <img 
                      src={USER_PROFILE.avatar} 
                      alt={USER_PROFILE.name} 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono">
                <User className="w-3.5 h-3.5 text-cyan-400" /> PERSONAL PROFILE & IDENTITY
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">{USER_PROFILE.name}</h1>
              <p className="text-lg font-mono text-cyan-300/90 font-medium">{USER_PROFILE.role}</p>
              <p className="text-[#9298A5] leading-relaxed text-base">
                Driven by curiosity for data and business optimization. I combine statistical analysis with real business context to make data accessible, intuitive, and actionable for decision-makers.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold"><GraduationCap className="w-4 h-4" /> EDUCATION</div>
                  <div className="text-sm font-semibold text-white">{USER_PROFILE.degree}</div>
                  <div className="text-xs text-[#9298A5]">{USER_PROFILE.institution}</div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold"><MapPin className="w-4 h-4" /> LOCATION</div>
                  <div className="text-sm font-semibold text-white">{USER_PROFILE.location}</div>
                  <div className="text-xs text-[#9298A5]">Remote & On-site</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <button onClick={() => scrollToSection('contact')} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs font-mono flex items-center gap-2 shadow-lg">
                  Contact Sakib <Mail className="w-4 h-4" />
                </button>
                <button onClick={() => scrollToSection('projects')} className="px-6 py-3 rounded-xl bg-white/5 text-white font-bold text-xs font-mono border border-white/10 flex items-center gap-2">
                  View Projects <ChevronRight className="w-4 h-4 text-cyan-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono">BACKGROUND & ACADEMICS</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Bridging Business Sense With Analytical Precision.</h2>
            <p className="text-[#9298A5] leading-relaxed">
              Currently pursuing a Bachelor of Business Administration (BBA) at <strong className="text-white">American International University-Bangladesh (AIUB)</strong> in Dhaka. My academic journey provides deep insight into operational workflows, marketing metrics, and strategic growth.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {metrics.map((m, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[#10131B] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-4">{m.icon}</div>
                  <div className="text-3xl font-extrabold text-white font-mono">{m.count}</div>
                  <div className="text-xs font-medium text-[#9298A5] mt-1 font-mono">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono">TECHNICAL CAPABILITIES</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Core Skill Matrix & Tools</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((cat) => (
            <div key={cat.id} className="bg-[#10131B] border border-white/10 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">{cat.icon}</div>
                <h3 className="text-xl font-bold text-white tracking-wide">{cat.title}</h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map((skill, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300 font-medium">{skill.name}</span>
                      <span className="text-cyan-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-0.5">
                      <div className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="certifications" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono">VERIFIED CREDENTIALS</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Certifications & Industry Training</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, idx) => (
            <div key={idx} className="bg-[#10131B] border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">{cert.icon}</div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-950/50 text-purple-300 border border-purple-500/30">{cert.year}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{cert.title}</h3>
                <p className="text-xs font-mono text-cyan-400 mb-4">Issued by {cert.issuer}</p>
                {cert.certUrl && (
                  <div className="mb-4">
                    <a href={cert.certUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 text-xs font-mono">
                      <span>View Verified Certificate</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {cert.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-slate-300 border border-white/5">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">PORTFOLIO SHOWCASE</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Dedicated Analytics Projects</h2>
          </div>
          <div className="flex flex-wrap gap-2 bg-[#10131B] p-1.5 rounded-xl border border-white/5">
            {[
              { id: 'all', label: 'All', count: projects.length },
              { id: 'excel', label: 'Excel', count: projects.filter(p => p.category === 'excel').length },
              { id: 'sql', label: 'SQL', count: projects.filter(p => p.category === 'sql').length },
              { id: 'powerbi', label: 'Power BI', count: projects.filter(p => p.category === 'powerbi').length },
              { id: 'python', label: 'Python', count: projects.filter(p => p.category === 'python').length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold' : 'text-[#9298A5]'}`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-[#10131B] border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 text-cyan-300 border border-white/10">{project.type}</span>
                  <div className="text-xs font-mono font-bold text-purple-400">{project.metrics.primary}</div>
                </div>
                <h3 onClick={() => setSelectedProject(project)} className="text-xl font-bold text-white hover:text-cyan-300 transition-colors mb-2 cursor-pointer">{project.title}</h3>
                <p className="text-xs font-mono text-purple-300/80 mb-4">{project.subtitle}</p>
                <p className="text-sm text-[#9298A5] leading-relaxed mb-6">{project.shortDesc}</p>
              </div>
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((t, idx) => (<span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-slate-400 border border-white/5">{t}</span>))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setSelectedProject(project)} className="py-2.5 rounded-xl bg-white/5 text-xs font-mono font-semibold text-white flex items-center justify-center gap-1.5 border border-white/5">
                    Case Study <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="py-2.5 rounded-xl bg-purple-950/40 text-xs font-mono font-semibold text-purple-200 flex items-center justify-center gap-1.5 border border-purple-500/30">
                    GitHub Repo <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/45 border border-purple-500/30 text-purple-300 text-xs font-mono">METHODOLOGY</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">4-Step Analytics Workflow</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((w, idx) => (
            <div key={idx} className="bg-[#10131B] border border-white/10 rounded-2xl p-6">
              <div className="text-4xl font-extrabold font-mono text-white/10 mb-4">{w.step}</div>
              <div className="mb-4">{w.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{w.title}</h3>
              <p className="text-xs text-[#9298A5] leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="bg-gradient-to-r from-[#10131B] via-[#0D0F17] to-[#10131B] border border-white/10 rounded-3xl p-8 lg:p-12 text-center max-w-4xl mx-auto shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono mb-6">GET IN TOUCH</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Let's Connect & Collaborate</h2>
          <p className="text-[#9298A5] text-sm leading-relaxed mb-10 max-w-xl mx-auto">Open to data analysis roles, business intelligence internships, and collaborative data projects.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left max-w-2xl mx-auto">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-500/30 text-purple-300"><Phone className="w-5 h-5" /></div>
                <div>
                  <div className="text-[10px] font-mono text-[#9298A5]">PHONE / WHATSAPP</div>
                  <a href={USER_PROFILE.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-white hover:text-purple-300 font-mono flex items-center gap-1.5">
                    {USER_PROFILE.contact.phone} <ExternalLink className="w-3 h-3 text-cyan-400" />
                  </a>
                </div>
              </div>
              <button onClick={() => copyToClipboard(USER_PROFILE.contact.phone, 'phone')} className="p-2 rounded-lg bg-white/5 text-slate-300">
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-cyan-300"><Mail className="w-5 h-5" /></div>
                <div className="overflow-hidden">
                  <div className="text-[10px] font-mono text-[#9298A5]">GMAIL / DIRECT MAIL</div>
                  <a href={`mailto:${USER_PROFILE.contact.email}`} className="text-xs font-semibold text-white truncate block font-mono">{USER_PROFILE.contact.email}</a>
                </div>
              </div>
              <button onClick={() => copyToClipboard(USER_PROFILE.contact.email, 'email')} className="p-2 rounded-lg bg-white/5 text-slate-300 shrink-0">
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5">
            <div className="text-xs font-mono text-purple-300 mb-4">SOCIAL & PROFESSIONAL NETWORK</div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { name: "LinkedIn", href: USER_PROFILE.contact.linkedin, icon: <Linkedin className="w-4 h-4" /> },
                { name: "GitHub", href: USER_PROFILE.contact.github, icon: <Code2 className="w-4 h-4" /> },
                { name: "Facebook", href: USER_PROFILE.contact.facebook, icon: <Facebook className="w-4 h-4" /> },
                { name: "Instagram", href: USER_PROFILE.contact.instagram, icon: <Instagram className="w-4 h-4" /> },
                { name: "X (Twitter)", href: USER_PROFILE.contact.x, icon: <Twitter className="w-4 h-4" /> }
              ].map((social, idx) => (
                <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-semibold text-slate-300 flex items-center gap-2">
                  {social.icon} <span>{social.name}</span> <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="cv" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="bg-gradient-to-r from-[#10131B] via-[#0D0F17] to-[#10131B] border border-[#A855F7]/30 rounded-3xl p-8 lg:p-12 text-center max-w-4xl mx-auto shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-6">
            <FileText className="w-4 h-4" /> CURRICULUM VITAE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Download My Official CV</h2>
          <p className="text-[#9298A5] text-sm leading-relaxed mb-8 max-w-xl mx-auto">Get a comprehensive copy of my skills in Power BI, SQL, Excel, and Python.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={USER_PROFILE.cvUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm font-mono flex items-center gap-3 shadow-lg">
              <Download className="w-5 h-5 animate-bounce" /> <span>Download CV (PDF)</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-white/5 text-center text-xs font-mono text-[#9298A5]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Sakib Munshi. Aspiring Data Analyst.</div>
          <button onClick={() => scrollToSection('hero')} className="hover:text-cyan-400 transition-colors">Back to Top ↑</button>
        </div>
      </footer>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#10131B] border border-white/15 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative shadow-2xl">
            <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30">{selectedProject.type}</span>
              <h3 className="text-2xl font-bold text-white mt-3">{selectedProject.title}</h3>
              <p className="text-xs font-mono text-cyan-400 mt-1">{selectedProject.subtitle}</p>
            </div>
            <div className="space-y-4 text-sm text-[#9298A5] leading-relaxed">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <h4 className="text-xs font-mono text-purple-400 font-bold">THE PROBLEM STATEMENT</h4>
                <p className="text-white text-xs">{selectedProject.problem}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <h4 className="text-xs font-mono text-cyan-400 font-bold">ANALYTICAL APPROACH & SOLUTION</h4>
                <p className="text-white text-xs">{selectedProject.solution}</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-slate-200 font-bold">KEY INSIGHTS DELIVERED</h4>
                <ul className="space-y-2">
                  {selectedProject.insights.map((insight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl bg-white/5 text-xs font-mono text-cyan-300 border border-white/10">GitHub Repository</a>
              <button onClick={() => setSelectedProject(null)} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-mono text-xs font-bold">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}