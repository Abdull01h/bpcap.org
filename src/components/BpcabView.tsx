import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import JSZip from 'jszip';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Download,
  Globe,
  Home,
  Info,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  Star,
  UserCheck,
  Users,
  X,
  Cake,
  Image as ImageIcon,
  ArrowLeft,
  ShieldCheck,
  Coffee,
  Lock,
  ExternalLink,
  Briefcase,
  Search,
  Bell,
  Check,
  FileText,
  DollarSign,
  GraduationCap,
  Building,
} from 'lucide-react';

import {
  BpcabPage,
  Language,
  Theme,
  MemberProfile,
  JobItem,
  RecipeItem,
  TrainingItem,
  CertificateItem,
  CommunityGalleryItem,
  CakeOfTheMonthItem,
  ForumQuestion,
  EventItem,
  SupplierItem,
  NewsNoticeItem,
  PaymentRecord,
  NotificationItem,
} from '../types';

import {
  INITIAL_MEMBERS,
  INITIAL_JOBS,
  INITIAL_RECIPES,
  INITIAL_TRAININGS,
  INITIAL_CERTIFICATES,
  INITIAL_GALLERY,
  INITIAL_CAKE_COMPETITION,
  INITIAL_FORUM_QUESTIONS,
  INITIAL_EVENTS,
  INITIAL_SUPPLIERS,
  INITIAL_NEWS,
  INITIAL_PAYMENTS,
  INITIAL_NOTIFICATIONS,
} from '../data/bpcabData';

import { Navbar } from './Navbar';
import { ChefDirectoryView } from './ChefDirectoryView';
import { MembershipView } from './MembershipView';
import { JobPortalView } from './JobPortalView';
import { LearningView } from './LearningView';
import { CommunityView } from './CommunityView';
import { AboutView } from './AboutView';
import { NewsNoticeView } from './NewsNoticeView';
import { ContactView } from './ContactView';
import { GlobalSearchModal } from './GlobalSearchModal';
import { MemberDashboardModal } from './MemberDashboardModal';
import { AdminDashboardModal } from './AdminDashboardModal';
import { FloatingWhatsApp } from './FloatingWhatsApp';

interface BpcabViewProps {
  lang: Language;
  onToggleLang: (lang: Language) => void;
}

export const BpcabView: React.FC<BpcabViewProps> = ({ lang, onToggleLang }) => {
  const [activePage, setActivePage] = useState<BpcabPage>('home');
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('bpcab_theme') as Theme) || 'dark';
  });

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMemberDashboardOpen, setIsMemberDashboardOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [selectedMemberForCard, setSelectedMemberForCard] = useState<MemberProfile | null>(null);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);

  // Core Persistent State
  const [members, setMembers] = useState<MemberProfile[]>(() => {
    try {
      const s = localStorage.getItem('bpcab_members');
      if (s) return JSON.parse(s);
    } catch (e) {}
    return INITIAL_MEMBERS;
  });

  const [jobs, setJobs] = useState<JobItem[]>(() => {
    try {
      const s = localStorage.getItem('bpcab_jobs');
      if (s) return JSON.parse(s);
    } catch (e) {}
    return INITIAL_JOBS;
  });

  const [recipes] = useState<RecipeItem[]>(INITIAL_RECIPES);
  const [trainings] = useState<TrainingItem[]>(INITIAL_TRAININGS);

  const [certificates, setCertificates] = useState<CertificateItem[]>(() => {
    try {
      const s = localStorage.getItem('bpcab_certificates');
      if (s) return JSON.parse(s);
    } catch (e) {}
    return INITIAL_CERTIFICATES;
  });

  const [gallery, setGallery] = useState<CommunityGalleryItem[]>(() => {
    try {
      const s = localStorage.getItem('bpcab_community_gallery');
      if (s) return JSON.parse(s);
    } catch (e) {}
    return INITIAL_GALLERY;
  });

  const [cakeComp, setCakeComp] = useState<CakeOfTheMonthItem[]>(() => {
    try {
      const s = localStorage.getItem('bpcab_cake_comp');
      if (s) return JSON.parse(s);
    } catch (e) {}
    return INITIAL_CAKE_COMPETITION;
  });

  const [forum, setForum] = useState<ForumQuestion[]>(() => {
    try {
      const s = localStorage.getItem('bpcab_forum_threads');
      if (s) return JSON.parse(s);
    } catch (e) {}
    return INITIAL_FORUM_QUESTIONS;
  });

  const [events] = useState<EventItem[]>(INITIAL_EVENTS);
  const [suppliers] = useState<SupplierItem[]>(INITIAL_SUPPLIERS);

  const [news, setNews] = useState<NewsNoticeItem[]>(() => {
    try {
      const s = localStorage.getItem('bpcab_news');
      if (s) return JSON.parse(s);
    } catch (e) {}
    return INITIAL_NEWS;
  });

  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    try {
      const s = localStorage.getItem('bpcab_payments');
      if (s) return JSON.parse(s);
    } catch (e) {}
    return INITIAL_PAYMENTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('bpcab_members', JSON.stringify(members));
    } catch (e) {}
  }, [members]);

  useEffect(() => {
    try {
      localStorage.setItem('bpcab_jobs', JSON.stringify(jobs));
    } catch (e) {}
  }, [jobs]);

  useEffect(() => {
    try {
      localStorage.setItem('bpcab_certificates', JSON.stringify(certificates));
    } catch (e) {}
  }, [certificates]);

  useEffect(() => {
    try {
      localStorage.setItem('bpcab_community_gallery', JSON.stringify(gallery));
    } catch (e) {}
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem('bpcab_cake_comp', JSON.stringify(cakeComp));
    } catch (e) {}
  }, [cakeComp]);

  useEffect(() => {
    try {
      localStorage.setItem('bpcab_forum_threads', JSON.stringify(forum));
    } catch (e) {}
  }, [forum]);

  useEffect(() => {
    try {
      localStorage.setItem('bpcab_news', JSON.stringify(news));
    } catch (e) {}
  }, [news]);

  useEffect(() => {
    try {
      localStorage.setItem('bpcab_payments', JSON.stringify(payments));
    } catch (e) {}
  }, [payments]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('bpcab_theme', nextTheme);
  };

  // ZIP Download Generator
  const handleDownloadZip = async () => {
    setIsDownloadingZip(true);
    try {
      const zip = new JSZip();

      const [indexRes, adminRes, configRes, galleryRes, logoRes] = await Promise.all([
        fetch('/index.html'),
        fetch('/admin.html').catch(() => null),
        fetch('/config.json').catch(() => null),
        fetch('/gallery.json').catch(() => null),
        fetch('/logo.png').catch(() => null),
      ]);

      const indexText = await indexRes.text();
      zip.file('index.html', indexText);

      if (adminRes && adminRes.ok) {
        const adminText = await adminRes.text();
        zip.file('admin.html', adminText);
      }
      if (configRes && configRes.ok) {
        const configText = await configRes.text();
        zip.file('config.json', configText);
      }
      if (galleryRes && galleryRes.ok) {
        const galleryText = await galleryRes.text();
        zip.file('gallery.json', galleryText);
      }
      if (logoRes && logoRes.ok) {
        const logoBlob = await logoRes.blob();
        zip.file('logo.png', logoBlob);
      }

      zip.file(
        'README.md',
        `# BPCAB - Bakery & Pastry Chefs Assembly Of Bangladesh\n\nOfficial Website & Admin Portal Package for GitHub Pages.\n\n- **index.html**: Public Website\n- **admin.html**: Secret Admin Portal (PIN: 2019)\n- **config.json**: Live site settings\n- **gallery.json**: Pastry gallery entries\n- **logo.png**: High-resolution emblem\n\nUploaded to https://abdull01h.github.io/BPCAB---Bakery-and-Pastry-Chefs-Assembly-Of-Bangladesh/\n`
      );

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'BPCAB-Full-Website-Files.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      confetti({ particleCount: 70, spread: 70 });
    } catch (err) {
      alert('Error generating zip: ' + (err as Error).message);
    } finally {
      setIsDownloadingZip(false);
    }
  };

  const handleLikeGallery = (id: string) => {
    setGallery((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  const handleVoteCake = (id: string) => {
    setCakeComp((prev) =>
      prev.map((c) => (c.id === id ? { ...c, votes: c.votes + 1 } : c))
    );
  };

  const handleAddForumQuestion = (q: ForumQuestion) => {
    setForum((prev) => [q, ...prev]);
  };

  const handleAddForumAnswer = (qId: string, answer: any) => {
    setForum((prev) =>
      prev.map((q) =>
        q.id === qId ? { ...q, answers: [...q.answers, answer] } : q
      )
    );
  };

  const handleAddGalleryItem = (item: CommunityGalleryItem) => {
    setGallery((prev) => [item, ...prev]);
  };

  const handleAddMember = (m: MemberProfile) => {
    setMembers((prev) => [m, ...prev]);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `New member applied: ${m.name}`,
        titleBn: `নতুন সদস্য আবেদন করেছেন: ${m.nameBn}`,
        time: 'Just now',
        read: false,
        type: 'membership',
      },
      ...prev,
    ]);
  };

  const handleAddPayment = (p: PaymentRecord) => {
    setPayments((prev) => [p, ...prev]);
  };

  const handleAddJob = (job: JobItem) => {
    setJobs((prev) => [job, ...prev]);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `New job posted: ${job.title}`,
        titleBn: `নতুন চাকরির বিজ্ঞপ্তি: ${job.titleBn}`,
        time: 'Just now',
        read: false,
        type: 'job',
      },
      ...prev,
    ]);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-['Quicksand',sans-serif] selection:bg-amber-400 selection:text-slate-950 ${
        theme === 'dark' ? 'bg-[#0b0d11] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* 1. EXECUTIVE NAVBAR */}
      <Navbar
        activePage={activePage}
        onNavigate={(p) => setActivePage(p)}
        lang={lang}
        onToggleLang={onToggleLang}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMemberDashboard={() => setIsMemberDashboardOpen(true)}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
        notifications={notifications}
      />

      {/* 2. DYNAMIC MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {/* ================= PAGE 1: HOME ================= */}
        {activePage === 'home' && (
          <div className="space-y-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#131620] via-[#0d1017] to-[#07090d] border border-amber-400/30 p-8 sm:p-14 shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10">
                <div className="flex-1 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-black tracking-widest uppercase">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>ESTABLISHED 2019 · DHAKA BANGLADESH</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-['Montserrat'] tracking-tight leading-tight">
                    {lang === 'bn' ? (
                      <>
                        বেকারি ও প্যাস্ট্রি শেফদের{' '}
                        <span className="text-amber-400 underline decoration-amber-400/40">জাতীয় গৌরব</span>
                      </>
                    ) : (
                      <>
                        The National Guild of{' '}
                        <span className="text-amber-400">Pastry &amp; Bakery Masters</span>
                      </>
                    )}
                  </h1>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                    {lang === 'bn'
                      ? 'বাংলাদেশের শীর্ষ পাঁচতারকা হোটেলের এক্সিকিউটিভ প্যাস্ট্রি শেফ, মাস্টার বেকার, চকলেট কারিগর ও হোম বেকারদের একমাত্র জাতীয় প্ল্যাটফর্ম। আন্তর্জাতিক সার্টিফিকেশন, জব পোর্টাল ও শেফ ডিরেক্টরি।'
                      : 'Uniting executive pastry chefs, artisan sourdough bakers, master chocolatiers, and passionate cake artists across Bangladesh with certified credentials, career boards, and culinary masterclasses.'}
                  </p>

                  {/* Hero Quick CTA */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                    <button
                      onClick={() => setActivePage('membership')}
                      className="px-6 py-3.5 rounded-2xl gold-gradient text-slate-950 font-black text-xs sm:text-sm shadow-xl hover:scale-105 transition cursor-pointer flex items-center gap-2"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'সদস্যপদ আবেদন ও আইডি' : 'Apply for Membership'}</span>
                    </button>

                    <button
                      onClick={() => setActivePage('directory')}
                      className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/15 transition cursor-pointer flex items-center gap-2"
                    >
                      <Users className="w-4 h-4 text-amber-400" />
                      <span>{lang === 'bn' ? 'শেফ ডিরেক্টরি খুঁজুন' : 'Explore Chef Directory'}</span>
                    </button>

                    <button
                      onClick={() => setActivePage('jobs')}
                      className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-amber-300 font-bold text-xs sm:text-sm border border-amber-400/20 transition cursor-pointer flex items-center gap-2"
                    >
                      <Briefcase className="w-4 h-4 text-amber-400" />
                      <span>{lang === 'bn' ? 'চাকরি বিজ্ঞপ্তি' : 'Job Portal'}</span>
                    </button>
                  </div>

                  {/* Live Stats Counter */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-left">
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                      <div className="text-2xl font-black text-amber-400 font-mono">৮৫০+</div>
                      <div className="text-[11px] text-slate-400 font-semibold">নিবন্ধিত শেফ ও বেকার</div>
                    </div>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                      <div className="text-2xl font-black text-amber-400 font-mono">৪৫+</div>
                      <div className="text-[11px] text-slate-400 font-semibold">দেশি ও বিদেশি চাকরি</div>
                    </div>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                      <div className="text-2xl font-black text-amber-400 font-mono">১২০+</div>
                      <div className="text-[11px] text-slate-400 font-semibold">মাস্টারক্লাস রেসিপি</div>
                    </div>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                      <div className="text-2xl font-black text-amber-400 font-mono">১০০%</div>
                      <div className="text-[11px] text-slate-400 font-semibold">যাচাইকৃত আইডি কার্ড</div>
                    </div>
                  </div>
                </div>

                {/* Right Circular Emblem with Halo */}
                <div className="shrink-0 relative">
                  <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-700 shadow-[0_0_80px_rgba(217,119,6,0.4)]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden border-2 border-black">
                      <img
                        src="/logo.png"
                        alt="BPCAB Official Emblem"
                        className="w-full h-full object-cover rounded-full filter contrast-110"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-slate-900 border border-amber-400 text-amber-300 font-black text-xs uppercase tracking-wider shadow-xl whitespace-nowrap">
                    OFFICIAL GUILD SEAL
                  </div>
                </div>
              </div>
            </section>

            {/* Quick 7 Core Modules Feature Hub */}
            <section className="space-y-6">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-widest text-amber-400 block mb-1">
                  জাতীয় সমাবেশ সেবা পোর্টাল
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat']">
                  বিপিসিএবি সমন্বিত ডিজিটাল প্ল্যাটফর্ম
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-2">
                  সদস্যপদ নিবন্ধন, ডিজিটাল আইডি কার্ড, দেশি-বিদেশি চাকরি, রেসিপি ব্যাংক ও লাইভ কমিউনিটি।
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 1. Membership & ID Card */}
                <div
                  onClick={() => setActivePage('membership')}
                  className="p-6 rounded-3xl bg-[#141824] border border-white/10 hover:border-amber-400/50 transition cursor-pointer group space-y-4 shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-['Montserrat'] group-hover:text-amber-400 transition-colors">
                      মেম্বারশিপ ও ডিজিটাল আইডি কার্ড
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      অনলাইন আবেদন ফরম, বিকাশ/নগদ পেমেন্ট স্লিপ, কিউআর কোডসহ লাইভ পিএনজি ও প্রিন্ট ফরম্যাট আইডি কার্ড।
                    </p>
                  </div>
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1">
                    <span>আবেদন করুন ও কার্ড ডাউনলোড</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* 2. Chef Directory */}
                <div
                  onClick={() => setActivePage('directory')}
                  className="p-6 rounded-3xl bg-[#141824] border border-white/10 hover:border-amber-400/50 transition cursor-pointer group space-y-4 shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-['Montserrat'] group-hover:text-blue-400 transition-colors">
                      জাতীয় শেফ ডিরেক্টরি
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      ৮৫০+ শেফের প্রোফাইল, ফন্ড্যান্ট, সাওয়ারডো, চকলেট দক্ষতা অনুযায়ী ফিল্টার ও যোগাযোগ।
                    </p>
                  </div>
                  <div className="text-xs font-bold text-blue-400 flex items-center gap-1">
                    <span>ডিরেক্টরি ব্রাউজ করুন</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* 3. Job Portal */}
                <div
                  onClick={() => setActivePage('jobs')}
                  className="p-6 rounded-3xl bg-[#141824] border border-white/10 hover:border-amber-400/50 transition cursor-pointer group space-y-4 shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-['Montserrat'] group-hover:text-emerald-400 transition-colors">
                      চাকরি ও ক্যারিয়ার পোর্টাল
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      বাংলাদেশি ৫-স্টার হোটেল ও মধ্যপ্রাচ্য, ইউরোপের ভিসা ইনফোসহ পেস্ট্রি শেফ চাকরির বিজ্ঞপ্তি।
                    </p>
                  </div>
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <span>চাকরিতে আবেদন বা পোস্ট করুন</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* 4. Recipe Library & Training */}
                <div
                  onClick={() => setActivePage('learning')}
                  className="p-6 rounded-3xl bg-[#141824] border border-white/10 hover:border-amber-400/50 transition cursor-pointer group space-y-4 shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-['Montserrat'] group-hover:text-purple-400 transition-colors">
                      লার্নিং ও সার্টিফিকেট যাচাই
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      ফ্রেঞ্চ প্যাস্ট্রি রেসিপি ব্যাংক, আপকামিং ওয়ার্কশপ সিট বুকিং ও সরকারি সার্টিফিকেট ট্র্যাকার।
                    </p>
                  </div>
                  <div className="text-xs font-bold text-purple-400 flex items-center gap-1">
                    <span>রেসিপি ও একাডেমি দেখুন</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* 5. Community & Cake of Month */}
                <div
                  onClick={() => setActivePage('community')}
                  className="p-6 rounded-3xl bg-[#141824] border border-white/10 hover:border-amber-400/50 transition cursor-pointer group space-y-4 shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                    <Cake className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-['Montserrat'] group-hover:text-pink-400 transition-colors">
                      কমিউনিটি ও সেরা কেক প্রতিযোগিতা
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      শেফ আর্ট গ্যালারি, লাইভ ভোট দিয়ে কেক অব দ্য মান্থ নির্বাচন, প্রশ্নোত্তর ফোরাম ও সাপ্লায়ার তালিকা।
                    </p>
                  </div>
                  <div className="text-xs font-bold text-pink-400 flex items-center gap-1">
                    <span>লাইভ ভোট ও ফোরাম</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* 6. Notices & Secretariat */}
                <div
                  onClick={() => setActivePage('news')}
                  className="p-6 rounded-3xl bg-[#141824] border border-white/10 hover:border-amber-400/50 transition cursor-pointer group space-y-4 shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-['Montserrat'] group-hover:text-amber-400 transition-colors">
                      এনএসডিএ ও অফিসিয়াল নোটিশ
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      সরকারি দক্ষতা উন্নয়ন সার্কুলার, বিপিসিএবি নির্বাহী আদেশ, সেমিনার ও প্রেস বিজ্ঞপ্তি।
                    </p>
                  </div>
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1">
                    <span>নোটিশ বোর্ড দেখুন</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </section>

            {/* President's Executive Message Card */}
            <section className="p-8 sm:p-10 rounded-3xl bg-[#141824] border border-white/10 shadow-2xl flex flex-col md:flex-row items-center gap-8">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&auto=format&fit=crop&q=80"
                alt="President"
                className="w-32 h-32 rounded-2xl object-cover border-2 border-amber-400 shrink-0 shadow-lg"
              />
              <div className="space-y-3">
                <span className="text-amber-400 text-xs font-black uppercase tracking-wider block">
                  সভাপতির নির্বাহী বার্তা
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-['Montserrat']">
                  “পেশাদার শেফ ও স্বাধীন হোম বেকারদের মিলনমেলা”
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  বিপিসিএবি ২০১৯ সালে যাত্রা শুরু করে বাংলাদেশের বেকিং শিল্পকে মর্যাদাপূর্ণ জায়গায় পৌঁছে দিয়েছে।
                  আমাদের প্রতিটি সদস্যের হাতে তুলে দিচ্ছি আন্তর্জাতিক সমমানের ডিজিটাল আইডি কার্ড, কারিগরি স্বীকৃতি ও
                  উচ্চ বেতনের চাকরির সুযোগ।
                </p>
                <div className="text-xs font-semibold text-slate-400 flex items-center gap-3">
                  <span className="text-white font-bold font-['Montserrat']">
                    Chef Kazi Anowar Hossain
                  </span>
                  <span>·</span>
                  <span className="text-amber-400">President, BPCAB</span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================= PAGE 2: ABOUT US ================= */}
        {activePage === 'about' && <AboutView lang={lang} />}

        {/* ================= PAGE 3: MEMBERSHIP & ID CARD ================= */}
        {activePage === 'membership' && (
          <MembershipView
            lang={lang}
            members={members}
            onAddMember={handleAddMember}
            selectedMemberForCard={selectedMemberForCard}
            payments={payments}
            onAddPayment={handleAddPayment}
          />
        )}

        {/* ================= PAGE 4: CHEF DIRECTORY ================= */}
        {activePage === 'directory' && (
          <ChefDirectoryView
            members={members}
            lang={lang}
            onSelectMemberForIdCard={(m) => {
              setSelectedMemberForCard(m);
              setActivePage('membership');
            }}
          />
        )}

        {/* ================= PAGE 5: JOB PORTAL ================= */}
        {activePage === 'jobs' && (
          <JobPortalView jobs={jobs} lang={lang} onAddJob={handleAddJob} />
        )}

        {/* ================= PAGE 6: LEARNING & RECIPES & CERTIFICATES ================= */}
        {activePage === 'learning' && (
          <LearningView
            recipes={recipes}
            trainings={trainings}
            certificates={certificates}
            lang={lang}
          />
        )}

        {/* ================= PAGE 7: COMMUNITY ================= */}
        {activePage === 'community' && (
          <CommunityView
            gallery={gallery}
            cakeComp={cakeComp}
            forum={forum}
            events={events}
            suppliers={suppliers}
            lang={lang}
            onLikeGalleryItem={handleLikeGallery}
            onVoteCake={handleVoteCake}
            onAddForumQuestion={handleAddForumQuestion}
            onAddForumAnswer={handleAddForumAnswer}
            onAddGalleryItem={handleAddGalleryItem}
          />
        )}

        {/* ================= PAGE 8: EVENTS CALENDAR ================= */}
        {activePage === 'events' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171b26] via-[#12151e] to-[#0c0e14] border border-amber-400/30 p-8 sm:p-12 shadow-2xl">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
                  <Calendar className="w-4 h-4" />
                  <span>ANNUAL CONVENTIONS &amp; MASTER EXPOS</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
                  {lang === 'bn' ? (
                    <>
                      বিপিসিএবি <span className="text-amber-400">ইভেন্ট ক্যালেন্ডার</span> ২০২৬
                    </>
                  ) : (
                    <>
                      BPCAB Official <span className="text-amber-400">Events Calendar</span> 2026
                    </>
                  )}
                </h1>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  আন্তর্জাতিক এক্সপো, কেক শো, বার্ষিক গালা ডিনার এবং জাতীয় পেস্ট্রি প্রতিযোগিতার সময়সূচী।
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-[#141824] rounded-3xl overflow-hidden border border-white/10 shadow-xl flex flex-col justify-between"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-400 border border-amber-400/40">
                      {evt.type}
                    </div>
                  </div>
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white font-['Montserrat']">
                        {lang === 'bn' ? evt.titleBn : evt.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        {lang === 'bn' ? evt.descriptionBn : evt.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-white/10 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-400" />
                        <span>{evt.date} · {evt.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        <span>{lang === 'bn' ? evt.locationBn : evt.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-emerald-400" />
                        <span>{evt.attendees}+ Registered Delegates</span>
                      </div>
                    </div>

                    <button
                      onClick={() => alert('Event registration confirmed! Your pass will be sent via SMS/Email.')}
                      className="w-full py-2.5 rounded-xl gold-gradient text-slate-950 font-black text-xs shadow hover:opacity-90 transition cursor-pointer"
                    >
                      {lang === 'bn' ? 'ইভেন্টে নিবন্ধন করুন' : 'Register for Event'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= PAGE 9: NEWS & NOTICES ================= */}
        {activePage === 'news' && <NewsNoticeView news={news} lang={lang} />}

        {/* ================= PAGE 10: CONTACT & HQ ================= */}
        {activePage === 'contact' && <ContactView lang={lang} />}
      </main>

      {/* 3. EXECUTIVE FOOTER */}
      <footer className="mt-16 bg-[#0a0d14] border-t border-white/10 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-amber-400 p-0.5 bg-black">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain rounded-full" />
              </div>
              <span className="text-lg font-black text-white font-['Montserrat']">BPCAB GUILD</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              বেকারি অ্যান্ড প্যাস্ট্রি শেফস অ্যাসেম্বলি অব বাংলাদেশ (বিপিসিএবি)। ২০১৯ সালে প্রতিষ্ঠিত জাতীয় পেশাদার সমিতি।
            </p>
            <p className="text-[11px] text-amber-400 font-mono">EST. 2019 · DHAKA BANGLADESH</p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm mb-3">দ্রুত লিঙ্কসমূহ</h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => setActivePage('directory')} className="hover:text-amber-400 cursor-pointer">
                  শেফ ডিরেক্টরি (Chef Directory)
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('membership')} className="hover:text-amber-400 cursor-pointer">
                  আইডি কার্ড জেনারেটর (Digital ID Card)
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('jobs')} className="hover:text-amber-400 cursor-pointer">
                  চাকরির বিজ্ঞপ্তি (Job Board)
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('learning')} className="hover:text-amber-400 cursor-pointer">
                  মাস্টার রেসিপি ও ওয়ার্কশপ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm mb-3">কমিউনিটি ও আইনি</h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => setActivePage('community')} className="hover:text-amber-400 cursor-pointer">
                  কেক অব দ্য মান্থ ভোট
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('news')} className="hover:text-amber-400 cursor-pointer">
                  এনএসডিএ ও সরকারি নোটিশ
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-amber-400 cursor-pointer">
                  বিপিসিএবি পরিচালনা পর্ষদ
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('contact')} className="hover:text-amber-400 cursor-pointer">
                  সচিবালয় ও হটলাইন
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm mb-1">অ্যাডমিন ও গিটহাব এক্সপোর্ট</h4>
            <p className="text-[11px] text-slate-400">
              সমস্ত ওয়েবসাইট কোড জিপ করে গিটহাবে আপলোড করতে নিচের বাটনে ক্লিক করুন।
            </p>
            <button
              onClick={handleDownloadZip}
              disabled={isDownloadingZip}
              className="w-full py-2.5 px-3 rounded-xl gold-gradient text-slate-950 font-black text-xs shadow flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>{isDownloadingZip ? 'জিপ তৈরি হচ্ছে...' : 'সম্পূর্ণ ওয়েবসাইট জিপ (.ZIP)'}</span>
            </button>
            <div className="pt-1">
              <button
                onClick={() => setIsAdminDashboardOpen(true)}
                className="text-[11px] text-amber-400/80 hover:text-amber-300 font-mono flex items-center gap-1 cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>সিক্রেট এডমিন পোর্টাল (PIN: 2019)</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 py-4 text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} Bakery and Pastry Chefs Assembly Of Bangladesh (BPCAB). All Rights Reserved.
        </div>
      </footer>

      {/* 4. MODALS & FLOATING WIDGETS */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(p) => setActivePage(p)}
        members={members}
        jobs={jobs}
        recipes={recipes}
        trainings={trainings}
        events={events}
        news={news}
      />

      <MemberDashboardModal
        isOpen={isMemberDashboardOpen}
        onClose={() => setIsMemberDashboardOpen(false)}
        currentMember={members[0]}
        payments={payments}
        lang={lang}
      />

      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        lang={lang}
        members={members}
        onUpdateMembers={(m) => setMembers(m)}
        jobs={jobs}
        onUpdateJobs={(j) => setJobs(j)}
        payments={payments}
        onUpdatePayments={(p) => setPayments(p)}
        recipes={recipes}
        trainings={trainings}
        certificates={certificates}
        onUpdateCertificates={(c) => setCertificates(c)}
        gallery={gallery}
        onUpdateGallery={(g) => setGallery(g)}
        news={news}
        onUpdateNews={(n) => setNews(n)}
        onDownloadZip={handleDownloadZip}
      />

      <FloatingWhatsApp />
    </div>
  );
};
