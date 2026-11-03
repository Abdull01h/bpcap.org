import React, { useState } from 'react';
import {
  Search,
  X,
  User,
  Briefcase,
  BookOpen,
  Calendar,
  Bell,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import {
  MemberProfile,
  JobItem,
  RecipeItem,
  TrainingItem,
  EventItem,
  NewsNoticeItem,
  BpcabPage,
} from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: BpcabPage) => void;
  members: MemberProfile[];
  jobs: JobItem[];
  recipes: RecipeItem[];
  trainings: TrainingItem[];
  events: EventItem[];
  news: NewsNoticeItem[];
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  members,
  jobs,
  recipes,
  trainings,
  events,
  news,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedMembers = q
    ? members.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.speciality.toLowerCase().includes(q) ||
          m.workplace.toLowerCase().includes(q) ||
          m.memberId.toLowerCase().includes(q)
      )
    : [];

  const matchedJobs = q
    ? jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.country.toLowerCase().includes(q)
      )
    : [];

  const matchedRecipes = q
    ? recipes.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.chef.toLowerCase().includes(q)
      )
    : [];

  const matchedEvents = q
    ? events.filter(
        (e) => e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)
      )
    : [];

  const matchedNews = q
    ? news.filter(
        (n) => n.title.toLowerCase().includes(q) || n.category.toLowerCase().includes(q)
      )
    : [];

  const totalMatches =
    matchedMembers.length +
    matchedJobs.length +
    matchedRecipes.length +
    matchedEvents.length +
    matchedNews.length;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center pt-20 p-4 overflow-y-auto">
      <div className="bg-[#141824] border border-amber-400/40 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 text-white animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-3 flex-1">
            <Search className="w-5 h-5 text-amber-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="সার্চ করুন (শেফ, চাকরি, রেসিপি, ওয়ার্কশপ, নোটিশ)..."
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none font-medium"
            />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!q && (
          <div className="py-4 space-y-2 text-xs text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
              জনপ্রিয় সার্চ:
            </span>
            <div className="flex flex-wrap gap-2">
              {['Croissant', 'Fondant', 'Jobs in Dubai', 'NSDA Certificate', 'Westin', 'Sourdough'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Container */}
        {q && (
          <div className="max-h-96 overflow-y-auto space-y-4 pr-1 text-xs">
            {totalMatches === 0 ? (
              <div className="text-center py-8 text-slate-400">
                "{query}" দিয়ে কোনো ফলাফল পাওয়া যায়নি। অন্য কোনো কি-ওয়ার্ড দিয়ে চেষ্টা করুন।
              </div>
            ) : (
              <>
                {/* Members */}
                {matchedMembers.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> শেফ ডিরেক্টরি ({matchedMembers.length})
                    </span>
                    {matchedMembers.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          onNavigate('directory');
                          onClose();
                        }}
                        className="w-full p-2.5 rounded-xl bg-black/40 hover:bg-white/10 border border-white/5 flex items-center justify-between text-left transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={m.photo} alt={m.name} className="w-7 h-7 rounded-lg object-cover" />
                          <div>
                            <strong className="text-white block">{m.name}</strong>
                            <span className="text-[10px] text-slate-400">{m.workplace} · {m.speciality}</span>
                          </div>
                        </div>
                        <span className="font-mono text-[10px] text-amber-400">{m.memberId}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Jobs */}
                {matchedJobs.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" /> চাকরি ও নিয়োগ ({matchedJobs.length})
                    </span>
                    {matchedJobs.map((j) => (
                      <button
                        key={j.id}
                        onClick={() => {
                          onNavigate('jobs');
                          onClose();
                        }}
                        className="w-full p-2.5 rounded-xl bg-black/40 hover:bg-white/10 border border-white/5 flex items-center justify-between text-left transition"
                      >
                        <div>
                          <strong className="text-white block">{j.title}</strong>
                          <span className="text-[10px] text-slate-400">{j.company} · {j.city}, {j.country}</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-bold">{j.salary}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Recipes */}
                {matchedRecipes.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> রেসিপি লাইব্রেরি ({matchedRecipes.length})
                    </span>
                    {matchedRecipes.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          onNavigate('learning');
                          onClose();
                        }}
                        className="w-full p-2.5 rounded-xl bg-black/40 hover:bg-white/10 border border-white/5 flex items-center justify-between text-left transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={r.image} alt={r.title} className="w-7 h-7 rounded-lg object-cover" />
                          <div>
                            <strong className="text-white block">{r.title}</strong>
                            <span className="text-[10px] text-slate-400">By {r.chef} · {r.categoryBn}</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-amber-400 font-bold">{r.difficulty}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* News & Notices */}
                {matchedNews.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider flex items-center gap-1">
                      <Bell className="w-3.5 h-3.5" /> অফিসিয়াল নোটিশ ({matchedNews.length})
                    </span>
                    {matchedNews.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => {
                          onNavigate('news');
                          onClose();
                        }}
                        className="w-full p-2.5 rounded-xl bg-black/40 hover:bg-white/10 border border-white/5 flex items-center justify-between text-left transition"
                      >
                        <div>
                          <strong className="text-white block">{n.title}</strong>
                          <span className="text-[10px] text-slate-400">{n.category} · {n.date}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
