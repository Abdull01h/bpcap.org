import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  QrCode,
  Search,
  Filter,
  Clock,
  User,
  MapPin,
  ExternalLink,
  ChefHat,
  Sparkles,
  Play,
  X,
  FileCheck,
  Award,
  Video,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RecipeItem, TrainingItem, CertificateItem, Language } from '../types';

interface LearningViewProps {
  recipes: RecipeItem[];
  trainings: TrainingItem[];
  certificates: CertificateItem[];
  lang: Language;
}

export const LearningView: React.FC<LearningViewProps> = ({
  recipes,
  trainings,
  certificates,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'recipes' | 'workshops' | 'verify'>('recipes');

  // Recipe states
  const [recipeCategory, setRecipeCategory] = useState<string>('all');
  const [recipeSearch, setRecipeSearch] = useState<string>('');
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeItem | null>(null);

  // Workshop states
  const [selectedWorkshop, setSelectedWorkshop] = useState<TrainingItem | null>(null);
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  // Certificate Verification states
  const [certQuery, setCertQuery] = useState('');
  const [verifiedCert, setVerifiedCert] = useState<CertificateItem | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const categories = [
    { id: 'all', label: 'All Recipes', labelBn: 'সকল রেসিপি' },
    { id: 'pastry', label: 'French Pastry', labelBn: 'ফ্রেঞ্চ প্যাস্ট্রি' },
    { id: 'fondant', label: 'Fondant & Sugarcraft', labelBn: 'ফন্ড্যান্ট ও সুগারক্রাফট' },
    { id: 'chocolate', label: 'Chocolate & Truffles', labelBn: 'চকলেট ও বোনবোন' },
    { id: 'bread', label: 'Sourdough & Bread', labelBn: 'সাওয়ারডো ও ব্রেড' },
    { id: 'cake', label: 'Custom Cakes', labelBn: 'কাস্টম কেক' },
    { id: 'decorating', label: 'Decoration Techniques', labelBn: 'ডেকোরেশন টেকনিক' },
  ];

  const filteredRecipes = recipes.filter((r) => {
    const matchesCat = recipeCategory === 'all' || r.category === recipeCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(recipeSearch.toLowerCase()) ||
      r.titleBn.includes(recipeSearch) ||
      r.chef.toLowerCase().includes(recipeSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleVerifyCert = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const cleaned = certQuery.trim().toUpperCase();
    const found = certificates.find((c) => c.certificateId.toUpperCase() === cleaned);
    setVerifiedCert(found || null);
    if (found && found.status === 'Valid') {
      confetti({ particleCount: 60, spread: 50 });
    }
  };

  const handleWorkshopBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setRegSuccess(true);
    confetti({ particleCount: 70, spread: 60 });
    setTimeout(() => {
      setRegSuccess(false);
      setSelectedWorkshop(null);
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171b26] via-[#12151e] to-[#0c0e14] border border-amber-400/30 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
            <BookOpen className="w-4 h-4" />
            <span>{lang === 'bn' ? 'বিপিসিএবি কালিনারি একাডেমি' : 'BPCAB Culinary Academy'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
            {lang === 'bn' ? (
              <>
                প্যাস্ট্রি রেসিপি লাইব্রেরি, <span className="text-amber-400">মাস্টারক্লাস</span> ও সনদ যাচাই
              </>
            ) : (
              <>
                Recipe Library, Workshops &amp; <span className="text-amber-400">Certificate Verification</span>
              </>
            )}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {lang === 'bn'
              ? 'আন্তর্জাতিক মানের পরীক্ষিত রেসিপি, ফ্রেঞ্চ ল্যামিনেশন ও সুগার ফ্লাওয়ার কর্মশালা এবং কিউআর কোড স্ক্যান করে সরকারি এনএসডিএ স্বীকৃত সার্টিফিকেট যাচাই।'
              : 'Access master recipes with metric baker percentages, reserve seats in upcoming hands-on masterclasses, and verify credentials in real time.'}
          </p>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-[#12151e] rounded-2xl border border-white/10 text-xs font-bold">
        <button
          onClick={() => setActiveTab('recipes')}
          className={`px-5 py-3 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'recipes'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{lang === 'bn' ? '১. রেসিপি লাইব্রেরি (Recipe Library)' : '1. Recipe Library'}</span>
        </button>

        <button
          onClick={() => setActiveTab('workshops')}
          className={`px-5 py-3 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'workshops'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{lang === 'bn' ? '২. ট্রেনিং ও মাস্টারক্লাস (Workshops)' : '2. Training & Workshops'}</span>
        </button>

        <button
          onClick={() => setActiveTab('verify')}
          className={`px-5 py-3 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'verify'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>{lang === 'bn' ? '৩. সার্টিফিকেট যাচাই (Verify Certificate)' : '3. Verify Certificate'}</span>
        </button>
      </div>

      {/* ================= TAB 1: RECIPE LIBRARY ================= */}
      {activeTab === 'recipes' && (
        <div className="space-y-6">
          {/* Search & Category Filter */}
          <div className="bg-[#12151e] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={recipeSearch}
                onChange={(e) => setRecipeSearch(e.target.value)}
                placeholder={
                  lang === 'bn'
                    ? 'রেসিপির নাম বা শেফ দিয়ে খুঁজুন (যেমন: ক্রসেন্ট, ফন্ড্যান্ট)...'
                    : 'Search recipe name or chef...'
                }
                className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/10">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setRecipeCategory(c.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    recipeCategory === c.id
                      ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <span>{lang === 'bn' ? c.labelBn : c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="group bg-[#131620] border border-white/10 hover:border-amber-400/50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-black">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131620] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-amber-400 text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border border-amber-400/30">
                      {recipe.categoryBn}
                    </span>
                    <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                      {recipe.difficulty}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-black text-lg text-white font-['Montserrat'] line-clamp-1 group-hover:text-amber-300 transition-colors">
                      {lang === 'bn' ? recipe.titleBn : recipe.title}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5">
                      <ChefHat className="w-3.5 h-3.5 text-amber-400" />
                      <span>{recipe.chef}</span>
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-2 border-t border-white/10">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Prep Time:</span>
                        <strong className="text-slate-200">{recipe.prepTime}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Bake / Rest:</span>
                        <strong className="text-amber-400">{recipe.bakeTime}</strong>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {lang === 'bn' ? recipe.descriptionBn : recipe.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => setSelectedRecipe(recipe)}
                    className="w-full py-2.5 rounded-xl gold-gradient text-slate-950 font-black text-xs shadow hover:brightness-110 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{lang === 'bn' ? 'সম্পূর্ণ রেসিপি ও পদ্ধতি দেখুন' : 'View Full Recipe & Steps'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 2: TRAINING & WORKSHOPS ================= */}
      {activeTab === 'workshops' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainings.map((trn) => (
              <div
                key={trn.id}
                className="bg-[#131620] border border-amber-400/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 bg-black overflow-hidden">
                    <img src={trn.image} alt={trn.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131620] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-lg">
                      UPCOMING MASTERCLASS
                    </span>
                    <span className="absolute bottom-3 right-3 bg-rose-500/90 text-white text-[10px] font-black px-2.5 py-1 rounded-lg border border-black shadow animate-pulse">
                      Only {trn.availableSeats} Seats Left!
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="font-black text-lg text-white font-['Montserrat'] leading-tight">
                      {lang === 'bn' ? trn.titleBn : trn.title}
                    </h3>

                    <div className="space-y-2 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <ChefHat className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="font-semibold text-white">{trn.instructor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{trn.date} ({trn.duration})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span className="line-clamp-1">{trn.venue}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1.5">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                        মূল সিলেবাস হাইলাইটস:
                      </span>
                      {trn.syllabus.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-white/10 mt-4">
                  <div>
                    <span className="text-[10px] text-slate-500 block">কোর্স ফি:</span>
                    <strong className="text-amber-400 text-sm font-bold font-mono">{trn.fee}</strong>
                  </div>

                  <button
                    onClick={() => setSelectedWorkshop(trn)}
                    className="px-5 py-2.5 rounded-xl gold-gradient text-slate-950 font-black text-xs shadow hover:brightness-110 transition cursor-pointer"
                  >
                    সিট বুক করুন ➔
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 3: CERTIFICATION VERIFICATION ================= */}
      {activeTab === 'verify' && (
        <div className="bg-[#12151e] border border-amber-400/30 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30 mx-auto flex items-center justify-center">
              <QrCode className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white font-['Montserrat']">
              {lang === 'bn' ? 'অফিসিয়াল সার্টিফিকেট যাচাই পোর্টাল' : 'Official Certificate Verification'}
            </h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              সার্টিফিকেটে থাকা ইউনিক Certificate ID অথবা QR কোড স্ক্যান করে সঠিকতা ও বৈধতা যাচাই করুন।
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleVerifyCert} className="space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={certQuery}
                onChange={(e) => setCertQuery(e.target.value)}
                placeholder="e.g. BPCAB-CERT-2024-0089 বা BPCAB-CERT-2025-0142"
                className="w-full pl-12 pr-4 py-3.5 bg-black/60 border border-white/20 rounded-2xl text-white font-mono font-bold text-center text-sm sm:text-base focus:outline-none focus:border-amber-400 uppercase tracking-wider"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl gold-gradient text-slate-950 font-black text-sm shadow-xl hover:brightness-110 transition cursor-pointer"
            >
              সার্টিফিকেট অনুসন্ধান করুন ➔
            </button>
          </form>

          {/* Quick Test ID Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 pt-2">
            <span>পরীক্ষার জন্য নমুনা আইডি:</span>
            <button
              type="button"
              onClick={() => {
                setCertQuery('BPCAB-CERT-2024-0089');
                setHasSearched(false);
              }}
              className="font-mono text-amber-400 underline"
            >
              BPCAB-CERT-2024-0089
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => {
                setCertQuery('BPCAB-CERT-2025-0142');
                setHasSearched(false);
              }}
              className="font-mono text-amber-400 underline"
            >
              BPCAB-CERT-2025-0142
            </button>
          </div>

          {/* Result Card */}
          {hasSearched && (
            <div className="mt-6 pt-6 border-t border-white/10 animate-in zoom-in-95">
              {verifiedCert ? (
                <div
                  className={`p-6 sm:p-7 rounded-2xl border-2 space-y-4 text-xs ${
                    verifiedCert.status === 'Valid'
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      {verifiedCert.status === 'Valid' ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          <span className="text-white">সার্টিফিকেটটি সরকারিভাবে বৈধ ও স্বীকৃত</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-5 h-5 text-rose-400" />
                          <span className="text-white">সার্টিফিকেটের মেয়াদ শেষ হয়েছে</span>
                        </>
                      )}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full font-black text-xs ${
                        verifiedCert.status === 'Valid'
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-rose-500 text-white'
                      }`}
                    >
                      STATUS: {verifiedCert.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">সনদ গ্রহীতার নাম:</span>
                      <strong className="text-white font-bold text-sm">{verifiedCert.holderName} ({verifiedCert.holderNameBn})</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">কোর্স / মাস্টারক্লাস:</span>
                      <span className="text-amber-300 font-semibold">{verifiedCert.courseName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">মেম্বারশিপ আইডি:</span>
                      <span className="font-mono text-white">{verifiedCert.memberId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">ইস্যুর তারিখ ও মেয়াদ:</span>
                      <span className="font-mono text-slate-300">{verifiedCert.issueDate} - {verifiedCert.expiryDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">ফলাফল / গ্রেড:</span>
                      <strong className="text-amber-400 font-bold">{verifiedCert.grade}</strong>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-white/10">
                      <span className="text-slate-400">প্রদানকারী কর্তৃপক্ষ:</span>
                      <span className="text-slate-300 text-right">{verifiedCert.issuingAuthority}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-rose-950/40 border-2 border-rose-500/50 text-center space-y-2">
                  <XCircle className="w-8 h-8 text-rose-400 mx-auto" />
                  <h4 className="text-white font-bold text-sm">কোনো সার্টিফিকেট রেকর্ড পাওয়া যায়নি!</h4>
                  <p className="text-xs text-rose-300">
                    প্রদত্ত Certificate ID টি সঠিক কিনা পুনরায় যাচাই করুন অথবা BPCAB সচিবালয়ে যোগাযোগ করুন।
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141824] border border-amber-400/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  {selectedRecipe.categoryBn}
                </span>
                <h3 className="font-black text-2xl text-white font-['Montserrat'] mt-2">
                  {lang === 'bn' ? selectedRecipe.titleBn : selectedRecipe.title}
                </h3>
                <p className="text-xs text-amber-300 font-bold flex items-center gap-1.5 mt-1">
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>রেসিপি প্রস্তুতকারক: {selectedRecipe.chef}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative h-60 rounded-2xl overflow-hidden bg-black">
              <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full h-full object-cover" />
            </div>

            {/* Ingredients Table */}
            <div>
              <h4 className="font-black text-white text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-amber-400" />
                <span>উপকরণ ও মাপ (Ingredients with Exact Baker Measurements):</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedRecipe.ingredients.map((ing, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-black/40 border border-white/10 flex justify-between">
                    <span className="text-slate-200">{ing.item} ({ing.itemBn})</span>
                    <strong className="text-amber-400 font-mono">{ing.amount}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div>
              <h4 className="font-black text-white text-sm uppercase tracking-wider mb-3">
                ধাপ অনুযায়ী প্রস্তুত প্রণালী (Step-by-Step Instructions):
              </h4>
              <div className="space-y-3">
                {selectedRecipe.instructions.map((ins) => (
                  <div key={ins.step} className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-1">
                    <strong className="text-amber-400 text-xs block">
                      ধাপ {ins.step}: {ins.titleBn} ({ins.title})
                    </strong>
                    <p className="text-xs text-slate-300 leading-relaxed">{ins.descBn}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Workshop Booking Modal */}
      {selectedWorkshop && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141824] border border-amber-400/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 text-slate-200">
            <div className="flex items-start justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="font-black text-lg text-white font-['Montserrat']">
                  মাস্টারক্লাস সিট বুকিং
                </h3>
                <p className="text-xs text-amber-300 font-semibold mt-0.5">{selectedWorkshop.title}</p>
              </div>
              <button onClick={() => setSelectedWorkshop(null)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {regSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 mx-auto" />
                <h4 className="font-bold text-white">আপনার সিট সফলভাবে সংরক্ষিত হয়েছে!</h4>
                <p className="text-xs">বিকাশ পেমেন্ট কনফার্মেশনের জন্য সচিবালয় থেকে কল করা হবে।</p>
              </div>
            ) : (
              <form onSubmit={handleWorkshopBooking} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">আপনার পূর্ণ নাম *</label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Chef Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">মোবাইল নম্বর (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+880 17XX-XXXXXX"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono"
                  />
                </div>
                <div className="p-3 bg-black/40 rounded-xl text-[11px] text-slate-400 flex justify-between">
                  <span>নিবন্ধন ফি: <strong className="text-amber-400">{selectedWorkshop.fee}</strong></span>
                  <span>উপস্থিতি: সরাসরি ল্যাবে</span>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl gold-gradient text-slate-950 font-black text-xs shadow-lg cursor-pointer"
                >
                  কনফার্ম রেজিস্ট্রেশন ➔
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
