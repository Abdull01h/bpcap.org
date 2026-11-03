import React, { useState } from 'react';
import {
  Users,
  Image as ImageIcon,
  Heart,
  Trophy,
  MessageSquare,
  Calendar,
  Building2,
  Plus,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  Globe,
  Share2,
  X,
  ExternalLink,
  MapPin,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  CommunityGalleryItem,
  CakeOfTheMonthItem,
  ForumQuestion,
  EventItem,
  SupplierItem,
  Language,
} from '../types';

interface CommunityViewProps {
  gallery: CommunityGalleryItem[];
  cakeComp: CakeOfTheMonthItem[];
  forum: ForumQuestion[];
  events: EventItem[];
  suppliers: SupplierItem[];
  lang: Language;
  onLikeGalleryItem: (id: string) => void;
  onVoteCake: (id: string) => void;
  onAddForumQuestion: (q: ForumQuestion) => void;
  onAddForumAnswer: (qId: string, answer: any) => void;
  onAddGalleryItem: (item: CommunityGalleryItem) => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  gallery,
  cakeComp,
  forum,
  events,
  suppliers,
  lang,
  onLikeGalleryItem,
  onVoteCake,
  onAddForumQuestion,
  onAddForumAnswer,
  onAddGalleryItem,
}) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'competition' | 'forum' | 'events' | 'suppliers'>('gallery');

  // Gallery upload state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [upTitle, setUpTitle] = useState('');
  const [upChef, setUpChef] = useState('');
  const [upCategory, setUpCategory] = useState('Cake Art');
  const [upImage, setUpImage] = useState('');

  // Forum state
  const [showAskModal, setShowAskModal] = useState(false);
  const [qTitle, setQTitle] = useState('');
  const [qAuthor, setQAuthor] = useState('');
  const [qCategory, setQCategory] = useState('Baking Science');

  // Answer state
  const [replyText, setReplyText] = useState<{ [qId: string]: string }>({});

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: CommunityGalleryItem = {
      id: `gal-${Date.now()}`,
      title: upTitle,
      chefName: upChef || 'Artisan Member',
      category: upCategory,
      image: upImage || 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80',
      likes: 1,
      isApproved: true,
    };
    onAddGalleryItem(newItem);
    setShowUploadModal(false);
    confetti({ particleCount: 50, spread: 60 });
  };

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newQ: ForumQuestion = {
      id: `q-${Date.now()}`,
      title: qTitle,
      author: qAuthor || 'Pastry Enthusiast',
      category: qCategory,
      createdAt: 'Just now',
      likes: 1,
      answers: [],
    };
    onAddForumQuestion(newQ);
    setShowAskModal(false);
    confetti({ particleCount: 40, spread: 50 });
  };

  const handleAddReply = (qId: string) => {
    const text = replyText[qId];
    if (!text || !text.trim()) return;

    onAddForumAnswer(qId, {
      id: `ans-${Date.now()}`,
      author: 'Member Chef',
      role: 'BPCAB Verified Member',
      content: text,
      createdAt: 'Just now',
      isExpert: true,
    });

    setReplyText((prev) => ({ ...prev, [qId]: '' }));
    confetti({ particleCount: 30, spread: 40 });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171b26] via-[#12151e] to-[#0c0e14] border border-amber-400/30 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
            <Users className="w-4 h-4" />
            <span>{lang === 'bn' ? 'বিপিসিএবি কমিউনিটি হাব' : 'BPCAB Culinary Community Hub'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
            {lang === 'bn' ? (
              <>
                প্যাস্ট্রি গ্যালারি, প্রতিযোগিতা, <span className="text-amber-400">ফোরাম ও সাপ্লায়ার</span>
              </>
            ) : (
              <>
                Showcase Gallery, Competitions, <span className="text-amber-400">Forum &amp; Suppliers</span>
              </>
            )}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {lang === 'bn'
              ? 'সদস্যদের তৈরি সেরা সৃষ্টিগুলোর গ্যালারি, কেক অফ দ্য মান্থ প্রতিযোগিতা, রন্ধনশিল্পীদের ফোরাম আলোচনা, ইভেন্ট ক্যালেন্ডার ও অনুমোদিত সাপ্লায়ার তালিকা।'
              : 'Discover artisanal cake showcases, vote in monthly baking competitions, get expert answers in the forum, and access certified equipment suppliers.'}
          </p>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-[#12151e] rounded-2xl border border-white/10 text-xs font-bold">
        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'gallery'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>{lang === 'bn' ? '১. প্যাস্ট্রি গ্যালারি (Gallery)' : '1. Showcase Gallery'}</span>
        </button>

        <button
          onClick={() => setActiveTab('competition')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'competition'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>{lang === 'bn' ? '২. কেক অফ দ্য মান্থ (Competition)' : '2. Cake of the Month'}</span>
        </button>

        <button
          onClick={() => setActiveTab('forum')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'forum'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>{lang === 'bn' ? '৩. ফোরাম / প্রশ্ন-উত্তর (Q&A)' : '3. Forum & Q&A'}</span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'events'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{lang === 'bn' ? '৪. ইভেন্ট ক্যালেন্ডার (Events)' : '4. Event Calendar'}</span>
        </button>

        <button
          onClick={() => setActiveTab('suppliers')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'suppliers'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>{lang === 'bn' ? '৫. সাপ্লায়ার ও ভেন্ডর তালিকা' : '5. Verified Suppliers'}</span>
        </button>
      </div>

      {/* ================= TAB 1: SHOWCASE GALLERY ================= */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-white font-['Montserrat']">
                {lang === 'bn' ? 'সদস্যদের সেরা সৃষ্টিসমূহ' : 'Master Creations by BPCAB Members'}
              </h2>
              <p className="text-xs text-slate-400">লাইক দিয়ে সদস্যদের উৎসাহিত করুন এবং নিজের কাজ যুক্ত করুন</p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2.5 rounded-xl gold-gradient text-slate-950 font-black text-xs shadow hover:brightness-110 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'bn' ? 'নিজের ছবি যোগ করুন' : 'Upload Creation'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="group bg-[#131620] border border-white/10 hover:border-amber-400/50 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131620] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-amber-300 text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border border-amber-400/30">
                    {item.category}
                  </span>
                </div>

                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm text-white font-['Montserrat'] line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-amber-300/90 font-semibold mt-0.5">
                      Chef: {item.chefName} {item.workplace ? `· ${item.workplace}` : ''}
                    </p>
                  </div>

                  <button
                    onClick={() => onLikeGalleryItem(item.id)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-rose-400 border border-white/10 hover:border-rose-500/30 transition flex items-center gap-1.5 cursor-pointer"
                    title="Like this item"
                  >
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    <span className="font-mono text-xs font-bold text-white">{item.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 2: CAKE OF THE MONTH COMPETITION ================= */}
      {activeTab === 'competition' && (
        <div className="space-y-8">
          {/* Active Competition Card */}
          <div className="bg-gradient-to-r from-amber-500/10 via-[#141824] to-black border-2 border-amber-400/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-amber-400/20">
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-400 text-slate-950 mb-2">
                  <Trophy className="w-3.5 h-3.5" /> LIVE NATIONAL COMPETITION
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat']">
                  কেক অফ দ্য মান্থ প্রতিযোগিতা: নভেম্বর ২০২৬
                </h2>
                <p className="text-xs text-amber-300 mt-1">
                  থিম: হেমন্তের রূপ ও রাজকীয় ওয়েডিং আভিজাত্য (Autumn Harvest &amp; Royal Wedding)
                </p>
              </div>

              <div className="text-right p-3 bg-black/60 rounded-2xl border border-amber-400/30">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">
                  ভোট দেওয়ার শেষ সময়
                </span>
                <span className="font-mono text-amber-400 text-sm font-bold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>০৭ দিন : ১৪ ঘণ্টা বাকি</span>
                </span>
              </div>
            </div>

            {/* Competitor Cake Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cakeComp.map((item) => (
                <div
                  key={item.id}
                  className={`relative rounded-3xl overflow-hidden border-2 bg-[#0e121a] flex flex-col justify-between transition-all duration-300 ${
                    item.isWinner
                      ? 'border-amber-400 shadow-2xl shadow-amber-500/10'
                      : 'border-white/10'
                  }`}
                >
                  {item.isWinner && (
                    <div className="absolute top-3 right-3 z-10 bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-lg flex items-center gap-1 shadow">
                      <Trophy className="w-3.5 h-3.5" /> LEADING WINNER
                    </div>
                  )}

                  <div>
                    <div className="h-56 bg-black overflow-hidden relative">
                      <img src={item.image} alt={item.cakeTitle} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e121a] via-transparent to-transparent" />
                    </div>

                    <div className="p-5 space-y-2">
                      <h3 className="font-extrabold text-base text-white font-['Montserrat'] line-clamp-1">
                        {item.cakeTitle}
                      </h3>
                      <p className="text-xs text-amber-300 font-semibold">{item.chefName}</p>
                      <p className="text-[11px] text-slate-400">{item.chefWorkplace}</p>
                      <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/5 line-clamp-3">
                        {item.story}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 mt-3 flex items-center justify-between border-t border-white/10 pt-4">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">মোট প্রাপ্ত ভোট:</span>
                      <strong className="text-amber-400 font-mono text-base">{item.votes} Votes</strong>
                    </div>

                    <button
                      onClick={() => onVoteCake(item.id)}
                      className="px-5 py-2.5 rounded-xl gold-gradient text-slate-950 font-black text-xs shadow hover:brightness-110 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-slate-950" />
                      <span>ভোট দিন</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: FORUM / Q&A ================= */}
      {activeTab === 'forum' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-white font-['Montserrat']">
                {lang === 'bn' ? 'বেকিং ও প্যাস্ট্রি ফোরাম (Q&A)' : 'Pastry Community Forum'}
              </h2>
              <p className="text-xs text-slate-400">
                অভিজ্ঞ মাস্টার শেফদের কাছে প্রশ্ন করুন এবং সমস্যার সমাধান পান
              </p>
            </div>
            <button
              onClick={() => setShowAskModal(true)}
              className="px-4 py-2.5 rounded-xl gold-gradient text-slate-950 font-black text-xs shadow hover:brightness-110 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'bn' ? 'নতুন প্রশ্ন করুন' : 'Ask Question'}</span>
            </button>
          </div>

          <div className="space-y-4">
            {forum.map((q) => (
              <div
                key={q.id}
                className="bg-[#131620] border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-amber-400/15 text-amber-300 border border-amber-400/20">
                      {q.category}
                    </span>
                    <h3 className="font-extrabold text-base text-white font-['Montserrat'] mt-1">
                      {q.title}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Asked by <span className="text-slate-200 font-semibold">{q.author}</span> · {q.createdAt}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-amber-400 bg-black/40 px-3 py-1 rounded-lg border border-white/10">
                    {q.answers.length} Answers
                  </span>
                </div>

                {/* Answers list */}
                <div className="space-y-3 pt-3 border-t border-white/10">
                  {q.answers.map((ans) => (
                    <div
                      key={ans.id}
                      className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <strong className="text-white font-bold">{ans.author}</strong>
                          {ans.isExpert && (
                            <span className="text-[9px] font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> VERIFIED EXPERT
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500">{ans.createdAt}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{ans.content}</p>
                    </div>
                  ))}
                </div>

                {/* Add Reply Input */}
                <div className="pt-2 flex gap-2">
                  <input
                    type="text"
                    value={replyText[q.id] || ''}
                    onChange={(e) => setReplyText({ ...replyText, [q.id]: e.target.value })}
                    placeholder="আপনার উত্তর বা পরামর্শ লিখুন..."
                    className="flex-1 px-4 py-2 bg-black/60 border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                  <button
                    onClick={() => handleAddReply(q.id)}
                    className="px-4 py-2 rounded-xl gold-gradient text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>উত্তর দিন</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 4: EVENT CALENDAR ================= */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="bg-[#131620] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="h-48 bg-black overflow-hidden relative">
                  <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131620] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-lg">
                    {evt.type}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-black text-lg text-white font-['Montserrat'] leading-snug">
                    {lang === 'bn' ? evt.titleBn : evt.title}
                  </h3>
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <p className="text-amber-300 font-semibold flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{evt.date} · {evt.time}</span>
                    </p>
                    <p className="text-slate-400 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>{evt.location}</span>
                    </p>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-white/5 line-clamp-3">
                    {lang === 'bn' ? evt.descriptionBn : evt.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-[11px] text-slate-400 font-mono">
                  {evt.attendees}+ Registered
                </span>
                <button
                  onClick={() => alert(`ইভেন্ট রেজিস্ট্রেশন সফল হয়েছে: ${evt.title}`)}
                  className="px-5 py-2.5 rounded-xl gold-gradient text-slate-950 font-black text-xs shadow hover:brightness-110 transition cursor-pointer"
                >
                  ইভেন্টে নিবন্ধন করুন
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= TAB 5: SUPPLIER & VENDOR DIRECTORY ================= */}
      {activeTab === 'suppliers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suppliers.map((sup) => (
            <div
              key={sup.id}
              className="bg-[#131620] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      {sup.category}
                    </span>
                    <h3 className="font-extrabold text-lg text-white font-['Montserrat'] mt-2">
                      {sup.name}
                    </h3>
                  </div>
                  {sup.verified && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                      ✓ VERIFIED SUPPLIER
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 flex items-center gap-1.5 my-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>{sup.address}</span>
                </p>

                <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1.5 my-3">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    উপলব্ধ পণ্য ও সামগ্রী:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sup.products.map((p, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300">
                        • {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
                <a
                  href={`tel:${sup.phone}`}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{sup.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${sup.whatsapp.replace('+', '')}?text=Hello%20${encodeURIComponent(sup.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow"
                >
                  <span>WhatsApp চ্যাট</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Creation Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141824] border border-amber-400/40 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-white text-base">গ্যালারিতে আপনার কাজের ছবি যোগ করুন</h3>
              <button onClick={() => setShowUploadModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">কেক / প্যাস্ট্রির শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={upTitle}
                  onChange={(e) => setUpTitle(e.target.value)}
                  placeholder="e.g. Royal Fondant Birthday Cake"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">আপনার নাম (Chef Name) *</label>
                <input
                  type="text"
                  required
                  value={upChef}
                  onChange={(e) => setUpChef(e.target.value)}
                  placeholder="Chef Name"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">ক্যাটেগরি</label>
                <select
                  value={upCategory}
                  onChange={(e) => setUpCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white"
                >
                  <option value="Cake Art">Cake Art (কেক আর্ট)</option>
                  <option value="Viennoiserie">Viennoiserie (ক্রসেন্ট ও পেস্ট্রি)</option>
                  <option value="Chocolate">Chocolate (চকলেট)</option>
                  <option value="Artisan Bread">Artisan Bread (সাওয়ারডো)</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">ছবির অনলাইন লিংক (URL)</label>
                <input
                  type="url"
                  value={upImage}
                  onChange={(e) => setUpImage(e.target.value)}
                  placeholder="https://.../my-cake.jpg"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl gold-gradient text-slate-950 font-black text-xs shadow-lg cursor-pointer"
              >
                গ্যালারিতে যুক্ত করুন ➔
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Ask Question Modal */}
      {showAskModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141824] border border-amber-400/40 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-white text-base">ফোরামে প্রশ্ন করুন</h3>
              <button onClick={() => setShowAskModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAskSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">আপনার প্রশ্ন *</label>
                <textarea
                  rows={3}
                  required
                  value={qTitle}
                  onChange={(e) => setQTitle(e.target.value)}
                  placeholder="বেকিং, ওভেন, তাপমাত্রা বা রেসিপি সম্পর্কিত সমস্যা বিস্তারিত লিখুন..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">আপনার নাম *</label>
                <input
                  type="text"
                  required
                  value={qAuthor}
                  onChange={(e) => setQAuthor(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">ক্যাটেগরি</label>
                <select
                  value={qCategory}
                  onChange={(e) => setQCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white"
                >
                  <option value="Baking Science">Baking Science & Chemistry</option>
                  <option value="Fondant & Humidity">Fondant & Humidity Control</option>
                  <option value="Ovens & Machinery">Ovens & Machinery Sourcing</option>
                  <option value="Pricing & Business">Bakery Pricing & Business</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl gold-gradient text-slate-950 font-black text-xs shadow-lg cursor-pointer"
              >
                প্রশ্ন পোস্ট করুন ➔
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
