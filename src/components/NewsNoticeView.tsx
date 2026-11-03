import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  Tag,
  ArrowRight,
  ShieldAlert,
  FileText,
  X,
  Share2,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { NewsNoticeItem, Language } from '../types';

interface NewsNoticeViewProps {
  news: NewsNoticeItem[];
  lang: Language;
}

export const NewsNoticeView: React.FC<NewsNoticeViewProps> = ({ news, lang }) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [selectedNews, setSelectedNews] = useState<NewsNoticeItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Notices', labelBn: 'সকল নোটিশ' },
    { id: 'NSDA Notice', label: 'NSDA Notices', labelBn: 'সরকারি এনএসডিএ নোটিশ' },
    { id: 'BPCAB Announcement', label: 'BPCAB Announcements', labelBn: 'বিপিসিএবি ঘোষণা' },
    { id: 'Training Circular', label: 'Training Circulars', labelBn: 'ট্রেনিং সার্কুলার' },
    { id: 'Industry News', label: 'Industry News', labelBn: 'শিল্প খবর' },
  ];

  const filteredNews = news.filter((n) => {
    return selectedCat === 'all' || n.category === selectedCat;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171b26] via-[#12151e] to-[#0c0e14] border border-amber-400/30 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
            <Bell className="w-4 h-4" />
            <span>OFFICIAL PRESS &amp; REGULATORY NOTICE BOARD</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
            {lang === 'bn' ? (
              <>
                বিপিসিএবি <span className="text-amber-400">নোটিশ বোর্ড</span> ও শিল্প সংবাদ
              </>
            ) : (
              <>
                BPCAB Official Notices &amp; <span className="text-amber-400">Industry News</span>
              </>
            )}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {lang === 'bn'
              ? 'প্রধানমন্ত্রীর কার্যালয়ের আওতাধীন জাতীয় দক্ষতা উন্নয়ন কর্তৃপক্ষ (NSDA) সার্কুলার, বিপিসিএবি নির্বাহী আদেশ, ট্রেনিং নোটিশ ও আন্তর্জাতিক আপডেট।'
              : 'Official regulatory directives from the National Skills Development Authority (NSDA), executive guild announcements, and global pastry news.'}
          </p>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap items-center gap-2 p-2 bg-[#12151e] rounded-2xl border border-white/10 text-xs font-bold">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCat(c.id)}
            className={`px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              selectedCat === c.id
                ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{lang === 'bn' ? c.labelBn : c.label}</span>
          </button>
        ))}
      </div>

      {/* News Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className={`bg-[#131620] border rounded-3xl p-6 shadow-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl ${
              item.featured ? 'border-amber-400/60 shadow-amber-500/5' : 'border-white/10 hover:border-white/25'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                    item.category === 'NSDA Notice'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                  }`}
                >
                  {item.category}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  <span>{item.date}</span>
                </span>
              </div>

              {item.image && (
                <div className="h-44 rounded-2xl overflow-hidden bg-black">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}

              <h3 className="font-black text-lg text-white font-['Montserrat'] leading-snug line-clamp-2">
                {lang === 'bn' ? item.titleBn : item.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {lang === 'bn' ? item.summaryBn : item.summary}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-amber-400 font-bold">Official Document</span>
              <button
                onClick={() => setSelectedNews(item)}
                className="px-4 py-2 rounded-xl gold-gradient text-slate-950 font-black text-xs shadow hover:brightness-110 transition flex items-center gap-1 cursor-pointer"
              >
                <span>সম্পূর্ণ পড়ুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141824] border border-amber-400/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  {selectedNews.category}
                </span>
                <h3 className="font-black text-xl text-white font-['Montserrat'] mt-2">
                  {lang === 'bn' ? selectedNews.titleBn : selectedNews.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>ইস্যুর তারিখ: {selectedNews.date} · BPCAB সচিবালয়, ঢাকা</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedNews(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedNews.image && (
              <div className="h-56 rounded-2xl overflow-hidden bg-black">
                <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed bg-black/30 p-5 rounded-2xl border border-white/5">
              <p className="font-bold text-white text-sm">
                {lang === 'bn' ? selectedNews.summaryBn : selectedNews.summary}
              </p>
              <p>{lang === 'bn' ? selectedNews.contentBn : selectedNews.content}</p>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>সরকারি রেকর্ড হিসেবে সংরক্ষিত</span>
              </div>
              <button
                onClick={() => setSelectedNews(null)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
