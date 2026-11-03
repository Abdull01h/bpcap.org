import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  Briefcase,
  DollarSign,
  BookOpen,
  Award,
  Image as ImageIcon,
  Bell,
  Settings,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  Trash2,
  Plus,
  Download,
  Upload,
  Globe,
  X,
  FileText,
  Key,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  MemberProfile,
  JobItem,
  PaymentRecord,
  RecipeItem,
  TrainingItem,
  CertificateItem,
  CommunityGalleryItem,
  NewsNoticeItem,
  AdminRole,
  Language,
} from '../types';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  members: MemberProfile[];
  onUpdateMembers: (members: MemberProfile[]) => void;
  jobs: JobItem[];
  onUpdateJobs: (jobs: JobItem[]) => void;
  payments: PaymentRecord[];
  onUpdatePayments: (payments: PaymentRecord[]) => void;
  recipes: RecipeItem[];
  trainings: TrainingItem[];
  certificates: CertificateItem[];
  onUpdateCertificates: (certs: CertificateItem[]) => void;
  gallery: CommunityGalleryItem[];
  onUpdateGallery: (items: CommunityGalleryItem[]) => void;
  news: NewsNoticeItem[];
  onUpdateNews: (news: NewsNoticeItem[]) => void;
  onDownloadZip: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  lang,
  members,
  onUpdateMembers,
  jobs,
  onUpdateJobs,
  payments,
  onUpdatePayments,
  recipes,
  trainings,
  certificates,
  onUpdateCertificates,
  gallery,
  onUpdateGallery,
  news,
  onUpdateNews,
  onDownloadZip,
}) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [currentRole, setCurrentRole] = useState<AdminRole>('Super Admin');
  const [activeTab, setActiveTab] = useState<
    'members' | 'jobs' | 'payments' | 'trainings' | 'certificates' | 'gallery' | 'news' | 'github'
  >('members');

  // Form states inside admin
  const [newCertId, setNewCertId] = useState('');
  const [newCertHolder, setNewCertHolder] = useState('');
  const [newCertCourse, setNewCertCourse] = useState('Executive Viennoiserie Masterclass');

  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCat, setNewNoticeCat] = useState<'NSDA Notice' | 'BPCAB Announcement' | 'Training Circular'>('BPCAB Announcement');
  const [newNoticeSummary, setNewNoticeSummary] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '2019' || pin === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
      confetti({ particleCount: 50, spread: 60 });
    } else {
      setPinError(true);
    }
  };

  // Roles Definition
  const roles: { role: AdminRole; desc: string; allowed: string[] }[] = [
    {
      role: 'Super Admin',
      desc: 'Full unfiltered access to all modules, financial payments & GitHub sync.',
      allowed: ['members', 'jobs', 'payments', 'trainings', 'certificates', 'gallery', 'news', 'github'],
    },
    {
      role: 'Admin',
      desc: 'System & user management, approvals and listings.',
      allowed: ['members', 'jobs', 'trainings', 'certificates', 'gallery', 'news'],
    },
    {
      role: 'Membership Manager',
      desc: 'Review membership applications, approve chef IDs & check fee dues.',
      allowed: ['members', 'payments'],
    },
    {
      role: 'Job Manager',
      desc: 'Approve employer job circulars, manage domestic & overseas listings.',
      allowed: ['jobs'],
    },
    {
      role: 'Content Manager',
      desc: 'Curate master recipes, announcements, NSDA notices and workshops.',
      allowed: ['trainings', 'news'],
    },
    {
      role: 'Moderator',
      desc: 'Moderate community gallery submissions, votes and member comments.',
      allowed: ['gallery'],
    },
  ];

  const currentRoleInfo = roles.find((r) => r.role === currentRole) || roles[0];

  // Actions
  const toggleMemberStatus = (id: string) => {
    const updated = members.map((m) =>
      m.id === id ? { ...m, status: m.status === 'Active' ? ('Pending' as const) : ('Active' as const) } : m
    );
    onUpdateMembers(updated);
  };

  const deleteJob = (id: string) => {
    onUpdateJobs(jobs.filter((j) => j.id !== id));
  };

  const togglePaymentVerify = (id: string) => {
    const updated = payments.map((p) =>
      p.id === id ? { ...p, status: p.status === 'Verified' ? ('Pending' as const) : ('Verified' as const) } : p
    );
    onUpdatePayments(updated);
  };

  const handleIssueCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertId || !newCertHolder) return;
    const newCert: CertificateItem = {
      certificateId: newCertId.toUpperCase(),
      holderName: newCertHolder,
      holderNameBn: newCertHolder,
      memberId: 'BPCAB-2026-REG',
      courseName: newCertCourse,
      courseNameBn: newCertCourse,
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: `${new Date().getFullYear() + 5}-12-31`,
      issuingAuthority: 'BPCAB National Pastry Examination Board',
      status: 'Valid',
      grade: 'Grade A+ (Distinction)',
    };
    onUpdateCertificates([newCert, ...certificates]);
    setNewCertId('');
    setNewCertHolder('');
    confetti({ particleCount: 50, spread: 60 });
  };

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeSummary) return;
    const item: NewsNoticeItem = {
      id: `news-${Date.now()}`,
      title: newNoticeTitle,
      titleBn: newNoticeTitle,
      category: newNoticeCat,
      date: new Date().toISOString().split('T')[0],
      featured: true,
      summary: newNoticeSummary,
      summaryBn: newNoticeSummary,
      content: newNoticeSummary,
      contentBn: newNoticeSummary,
    };
    onUpdateNews([item, ...news]);
    setNewNoticeTitle('');
    setNewNoticeSummary('');
    confetti({ particleCount: 50, spread: 60 });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121622] border-2 border-amber-400/50 rounded-3xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-xl text-white font-['Montserrat']">
                  BPCAB EXECUTIVE ADMIN MANAGEMENT
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                  RBAC v3.0
                </span>
              </div>
              <p className="text-xs text-amber-300">
                কেন্দ্রীয় প্রশাসনিক নিয়ন্ত্রণ ও ভূমিকাভিত্তিক এক্সেস কন্ট্রোল
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gate 1: PIN Protection */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto my-8 p-8 rounded-3xl bg-black/60 border border-amber-400/40 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-amber-400/10 text-amber-400 mx-auto flex items-center justify-center border border-amber-400/30">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white">অফিসিয়াল এডমিন সিকিউরিটি পিন</h4>
            <p className="text-xs text-slate-400">
              ড্যাশবোর্ড আনলক করতে ৪ সংখ্যার পিন প্রদান করুন (ডিফল্ট: <strong className="text-amber-400 font-mono">2019</strong>)
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                required
                autoFocus
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="w-full py-3 px-4 text-center text-2xl font-mono tracking-[0.4em] bg-black/80 border border-white/20 rounded-2xl text-amber-400 focus:outline-none focus:border-amber-400"
              />
              {pinError && (
                <p className="text-rose-400 text-xs font-bold">❌ ভুল পিন! সঠিক পিন টাইপ করুন।</p>
              )}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl gold-gradient text-slate-950 font-black text-sm shadow-xl hover:brightness-110 transition cursor-pointer"
              >
                ড্যাশবোর্ড আনলক করুন 🔓
              </button>
            </form>
          </div>
        ) : (
          /* Unlocked Admin Workspace */
          <div className="space-y-6">
            {/* Role Selector Bar */}
            <div className="p-4 rounded-2xl bg-black/60 border border-amber-400/30 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Admin Role (ভূমিকা):
                </span>
                <select
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value as AdminRole)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#1a2030] text-amber-300 font-bold text-xs border border-amber-400/40 focus:outline-none"
                >
                  {roles.map((r) => (
                    <option key={r.role} value={r.role}>
                      {r.role}
                    </option>
                  ))}
                </select>
              </div>

              <p className="text-[11px] text-slate-400 text-center md:text-right">
                {currentRoleInfo.desc}
              </p>
            </div>

            {/* Navigation Tabs based on Role */}
            <div className="flex flex-wrap gap-1.5 p-1.5 bg-black/40 rounded-2xl border border-white/10 text-xs font-bold">
              {currentRoleInfo.allowed.includes('members') && (
                <button
                  onClick={() => setActiveTab('members')}
                  className={`px-3.5 py-2 rounded-xl transition ${
                    activeTab === 'members' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  মেম্বারশিপ ({members.length})
                </button>
              )}

              {currentRoleInfo.allowed.includes('jobs') && (
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`px-3.5 py-2 rounded-xl transition ${
                    activeTab === 'jobs' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  চাকরি পোস্ট ({jobs.length})
                </button>
              )}

              {currentRoleInfo.allowed.includes('payments') && (
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`px-3.5 py-2 rounded-xl transition ${
                    activeTab === 'payments' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  পেমেন্ট ভেরিফাই ({payments.length})
                </button>
              )}

              {currentRoleInfo.allowed.includes('certificates') && (
                <button
                  onClick={() => setActiveTab('certificates')}
                  className={`px-3.5 py-2 rounded-xl transition ${
                    activeTab === 'certificates' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  সার্টিফিকেট ইস্যু ({certificates.length})
                </button>
              )}

              {currentRoleInfo.allowed.includes('gallery') && (
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`px-3.5 py-2 rounded-xl transition ${
                    activeTab === 'gallery' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  গ্যালারি অনুমোদন ({gallery.length})
                </button>
              )}

              {currentRoleInfo.allowed.includes('news') && (
                <button
                  onClick={() => setActiveTab('news')}
                  className={`px-3.5 py-2 rounded-xl transition ${
                    activeTab === 'news' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  নোটিশ ও ঘোষণা ({news.length})
                </button>
              )}

              {currentRoleInfo.allowed.includes('github') && (
                <button
                  onClick={() => setActiveTab('github')}
                  className={`px-3.5 py-2 rounded-xl transition ${
                    activeTab === 'github' ? 'bg-blue-600 text-white font-black' : 'text-blue-300 hover:text-white'
                  }`}
                >
                  ☁️ গিটহাব সিঙ্ক ও ZIP
                </button>
              )}
            </div>

            {/* TAB: MEMBERS */}
            {activeTab === 'members' && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">নিবন্ধিত শেফ ও সদস্য অনুমোদন তালিকা:</h4>
                  <span className="text-slate-400">স্ট্যাটাস পরিবর্তনে ক্লিক করুন</span>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {members.map((m) => (
                    <div
                      key={m.id}
                      className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img src={m.photo} alt={m.name} className="w-10 h-10 rounded-xl object-cover border border-amber-400" />
                        <div>
                          <strong className="text-white block font-bold text-sm">{m.name}</strong>
                          <span className="text-slate-400">{m.workplace} · <code className="text-amber-400">{m.memberId}</code></span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleMemberStatus(m.id)}
                          className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer ${
                            m.status === 'Active'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {m.status === 'Active' ? '✓ APPROVED ACTIVE' : '⏳ PENDING APPROVAL'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: JOBS */}
            {activeTab === 'jobs' && (
              <div className="space-y-4 text-xs">
                <h4 className="font-bold text-white text-sm">চাকরির বিজ্ঞাপন ব্যবস্থাপনা:</h4>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {jobs.map((j) => (
                    <div
                      key={j.id}
                      className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between"
                    >
                      <div>
                        <strong className="text-white block font-bold">{j.title}</strong>
                        <span className="text-slate-400">
                          {j.company} · {j.city}, {j.country} · <span className="text-emerald-400 font-bold">{j.salary}</span>
                        </span>
                      </div>
                      <button
                        onClick={() => deleteJob(j.id)}
                        className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30"
                        title="Delete Job"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PAYMENTS */}
            {activeTab === 'payments' && (
              <div className="space-y-4 text-xs">
                <h4 className="font-bold text-white text-sm">ফি ও ট্রানজেকশন আইডি ভেরিফিকেশন:</h4>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {payments.map((p) => (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between"
                    >
                      <div>
                        <strong className="text-white block font-bold">{p.memberName} ({p.memberId})</strong>
                        <span className="text-slate-400">
                          {p.method} · TrxID: <code className="text-amber-400 font-mono font-bold text-sm">{p.trxId}</code> · ৳{p.amount}
                        </span>
                      </div>
                      <button
                        onClick={() => togglePaymentVerify(p.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer ${
                          p.status === 'Verified'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {p.status === 'Verified' ? '✓ VERIFIED' : 'MARK VERIFIED'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: CERTIFICATES */}
            {activeTab === 'certificates' && (
              <div className="space-y-6 text-xs">
                <form onSubmit={handleIssueCert} className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <h4 className="font-bold text-amber-400 uppercase tracking-wider">নতুন সার্টিফিকেট রেকর্ড ইস্যু করুন:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      value={newCertId}
                      onChange={(e) => setNewCertId(e.target.value)}
                      placeholder="Certificate ID (e.g. BPCAB-CERT-2026-0301)"
                      className="px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white font-mono"
                    />
                    <input
                      type="text"
                      required
                      value={newCertHolder}
                      onChange={(e) => setNewCertHolder(e.target.value)}
                      placeholder="Holder Name (e.g. Chef Tanveer)"
                      className="px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl gold-gradient text-slate-950 font-black cursor-pointer"
                    >
                      ইস্যু করুন ➔
                    </button>
                  </div>
                </form>

                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {certificates.map((c) => (
                    <div key={c.certificateId} className="p-3 bg-black/40 rounded-xl border border-white/10 flex justify-between">
                      <div>
                        <strong className="text-white block">{c.holderName}</strong>
                        <span className="text-slate-400">{c.courseName} · <code className="text-amber-400">{c.certificateId}</code></span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                        {c.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: NEWS & NOTICES */}
            {activeTab === 'news' && (
              <div className="space-y-6 text-xs">
                <form onSubmit={handlePublishNotice} className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <h4 className="font-bold text-amber-400 uppercase tracking-wider">নতুন নোটিশ / সরকারি সার্কুলার প্রকাশ:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={newNoticeTitle}
                      onChange={(e) => setNewNoticeTitle(e.target.value)}
                      placeholder="নোটিশের শিরোনাম লিখুন..."
                      className="px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white"
                    />
                    <select
                      value={newNoticeCat}
                      onChange={(e) => setNewNoticeCat(e.target.value as any)}
                      className="px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white"
                    >
                      <option value="NSDA Notice">NSDA Notice (সরকারি এনএসডিএ)</option>
                      <option value="BPCAB Announcement">BPCAB Announcement (সাধারণ ঘোষণা)</option>
                      <option value="Training Circular">Training Circular (প্রশিক্ষণ সার্কুলার)</option>
                    </select>
                  </div>
                  <textarea
                    rows={2}
                    required
                    value={newNoticeSummary}
                    onChange={(e) => setNewNoticeSummary(e.target.value)}
                    placeholder="নোটিশের বিস্তারিত বিবরণ..."
                    className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white"
                  />
                  <button type="submit" className="px-5 py-2 rounded-xl gold-gradient text-slate-950 font-black cursor-pointer">
                    বিজ্ঞপ্তি প্রকাশ করুন ➔
                  </button>
                </form>
              </div>
            )}

            {/* TAB: GITHUB CLOUD SYNC & 1-CLICK ZIP */}
            {activeTab === 'github' && (
              <div className="p-6 rounded-3xl bg-blue-950/40 border border-blue-500/40 space-y-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">গিটহাব পেজেস সিঙ্ক ও ১-ক্লিকে ZIP এক্সপোর্ট</h4>
                    <p className="text-slate-300">
                      GitHub Pages-এ সম্পূর্ণ সাইট আপডেট করার জন্য নিচের বাটন দিয়ে জিপ ফাইল ডাউনলোড করুন।
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-black/50 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <strong className="text-white block font-bold text-sm">সম্পূর্ণ ওয়েবসাইট রিপোজিটরি প্যাকেজ</strong>
                    <span className="text-slate-400 text-xs">
                      index.html, admin.html, config.json, gallery.json এবং logo.png সংকলিত
                    </span>
                  </div>
                  <button
                    onClick={onDownloadZip}
                    className="px-6 py-3 rounded-2xl gold-gradient text-slate-950 font-black text-xs shadow-xl hover:brightness-110 transition flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>১-ক্লিকে ZIP ডাউনলোড</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
