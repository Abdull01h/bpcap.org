import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Globe,
  User,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  Briefcase,
  BookOpen,
  Award,
  Users,
  Calendar,
  Mail,
  Home,
  CheckCircle2,
  Lock,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { BpcabPage, Language, Theme, NotificationItem } from '../types';

interface NavbarProps {
  activePage: BpcabPage;
  onNavigate: (page: BpcabPage) => void;
  lang: Language;
  onToggleLang: (lang: Language) => void;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onOpenMemberDashboard: () => void;
  onOpenAdminDashboard: () => void;
  notifications: NotificationItem[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  onOpenSearch,
  onOpenMemberDashboard,
  onOpenAdminDashboard,
  notifications,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems: { id: BpcabPage; label: string; labelEn: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'হোম', labelEn: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'about', label: 'আমাদের সম্পর্কে', labelEn: 'About BPCAB', icon: <Award className="w-3.5 h-3.5" /> },
    { id: 'membership', label: 'সদস্যপদ ও আইডি', labelEn: 'Membership', icon: <Award className="w-3.5 h-3.5" /> },
    { id: 'directory', label: 'শেফ ডিরেক্টরি', labelEn: 'Chef Directory', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'jobs', label: 'চাকরি ও ক্যারিয়ার', labelEn: 'Jobs', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'learning', label: 'রেসিপি ও একাডেমি', labelEn: 'Learning', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'community', label: 'কমিউনিটি ও ফোরাম', labelEn: 'Community', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'events', label: 'ইভেন্ট ক্যালেন্ডার', labelEn: 'Events', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'news', label: 'নোটিশ ও খবর', labelEn: 'News & Notices', icon: <Bell className="w-3.5 h-3.5" /> },
    { id: 'contact', label: 'যোগাযোগ', labelEn: 'Contact', icon: <Mail className="w-3.5 h-3.5" /> },
  ];

  const handlePageClick = (page: BpcabPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-2xl transition-colors duration-200">
      {/* 1. TOP GOLD SEAL BANNER */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 text-slate-950 text-xs py-1.5 px-4 font-black border-b border-amber-300/40 shadow-sm text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-wider font-extrabold">
            <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping"></span>
            <span>
              {lang === 'bn'
                ? 'জাতীয় বেকারি ও প্যাস্ট্রি শেফ সমাবেশ ২০১৯ থেকে সক্রিয় · EST. 2019'
                : 'National Assembly of Professional Pastry Chefs & Artisanal Bakers · Est. 2019'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] mx-auto sm:mx-0 font-bold">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>হটলাইন: +880 1711-234567</span>
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">বনানী / গুলশান-২ সচিবালয়, ঢাকা</span>
          </div>
        </div>
      </div>

      {/* 2. EXECUTIVE MAIN NAVBAR */}
      <div
        className={`${
          theme === 'dark' ? 'bg-[#0f121a]/95 text-white' : 'bg-white/95 text-slate-900'
        } backdrop-blur-md border-b border-white/10 px-4 py-2.5 transition-colors duration-200`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handlePageClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer shrink-0"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-amber-400 p-0.5 bg-black shadow-md flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
              <img
                src="/logo.png"
                alt="BPCAB Emblem"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-xl sm:text-2xl tracking-wider font-['Montserrat']">
                  BPCAB
                </span>
                <span className="text-amber-400 text-2xl font-black">.</span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-400 border border-amber-400/30 uppercase tracking-widest hidden sm:inline">
                  GUILD
                </span>
              </div>
              <span className="block text-[10px] sm:text-[11px] font-semibold text-amber-400/90 tracking-wide uppercase -mt-1 line-clamp-1">
                {lang === 'bn' ? 'বেকারি অ্যান্ড প্যাস্ট্রি শেফস অ্যাসেম্বলি' : 'Bakery & Pastry Chefs Assembly'}
              </span>
            </div>
          </button>

          {/* Desktop 10-Item Nav Menu */}
          <nav className="hidden xl:flex items-center gap-0.5 text-xs font-bold">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handlePageClick(item.id)}
                className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activePage === item.id
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                    : theme === 'dark'
                    ? 'text-slate-300 hover:text-white hover:bg-white/5'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                <span>{lang === 'bn' ? item.label : item.labelEn}</span>
              </button>
            ))}
          </nav>

          {/* Right Action Tools: Search, Notifs, Lang, Theme, Member/Admin Portal, Hamburger */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
              title="Search"
            >
              <Search className="w-4 h-4 text-amber-400" />
            </button>

            {/* Notification Bell with Badge */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition relative cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-amber-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-black text-[9px] flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#141824] border border-amber-400/40 rounded-2xl p-4 shadow-2xl text-xs space-y-3 z-50 animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="font-bold text-white text-xs">নোটিফিকেশন সেন্টার</span>
                    <span className="text-[10px] text-amber-400 font-mono">{unreadCount} unread</span>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          onNavigate('news');
                          setNotifDropdownOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-black/40 hover:bg-white/5 border border-white/5 cursor-pointer space-y-0.5"
                      >
                        <strong className="text-white block text-[11px] leading-snug">
                          {lang === 'bn' ? n.titleBn : n.title}
                        </strong>
                        <span className="text-[10px] text-slate-500 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => onToggleLang(lang === 'en' ? 'bn' : 'en')}
              className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold flex items-center gap-1.5 text-amber-300 cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="font-mono">{lang === 'en' ? 'EN' : 'বাং'}</span>
            </button>

            {/* Dark/Light Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition cursor-pointer"
              title="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Member Dashboard Button */}
            <button
              onClick={onOpenMemberDashboard}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 transition cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'bn' ? 'সদস্য পোর্টাল' : 'Member Portal'}</span>
            </button>

            {/* Discreet Admin Button */}
            <button
              onClick={onOpenAdminDashboard}
              className="hidden md:inline-flex items-center gap-1 px-2.5 py-2 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 font-bold text-xs border border-amber-400/30 transition cursor-pointer"
              title="Admin Dashboard (PIN: 2019)"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>এডমিন</span>
            </button>

            {/* Mobile Hamburger Drawer Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden p-2 rounded-xl bg-white/10 text-amber-400 border border-white/15 cursor-pointer"
              title="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. MOBILE SLIDE-OVER DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-[#11141c] h-full p-6 shadow-2xl border-l border-white/10 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-amber-400 p-0.5 bg-black">
                    <img src="/logo.png" alt="Logo" className="w-full h-full object-contain rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white font-['Montserrat']">BPCAB GUILD</h3>
                    <p className="text-[11px] text-amber-300">National Menu Navigation</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 10 Navigation Links */}
              <div className="py-4 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400/80 block px-2 mb-2">
                  মেন্যু লিঙ্কসমূহ (Navigation Pages)
                </span>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handlePageClick(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                      activePage === item.id
                        ? 'bg-amber-400 text-slate-950 font-black shadow'
                        : 'text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={activePage === item.id ? 'text-slate-950' : 'text-amber-400'}>
                        {item.icon}
                      </span>
                      <span>{lang === 'bn' ? item.label : item.labelEn}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Member & Admin Buttons */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <button
                  onClick={() => {
                    onOpenMemberDashboard();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/15"
                >
                  <User className="w-4 h-4 text-amber-400" />
                  <span>সদস্য পোর্টাল (Member Portal)</span>
                </button>

                <button
                  onClick={() => {
                    onOpenAdminDashboard();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl gold-gradient text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow"
                >
                  <Lock className="w-4 h-4 text-slate-950" />
                  <span>এডমিন কন্ট্রোল ড্যাশবোর্ড</span>
                </button>
              </div>
            </div>

            {/* Footer in Drawer */}
            <div className="pt-4 border-t border-white/10 text-center text-slate-500 text-[11px]">
              <p>BPCAB Bangladesh · Est. 2019</p>
              <p className="text-amber-400 font-mono mt-0.5">+880 1711-234567</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
