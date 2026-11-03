import React, { useState } from 'react';
import {
  Briefcase,
  Globe,
  MapPin,
  Clock,
  DollarSign,
  PlusCircle,
  Building,
  Plane,
  ShieldCheck,
  CheckCircle2,
  X,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  Sparkles,
  FileCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { JobItem, Language } from '../types';

interface JobPortalViewProps {
  jobs: JobItem[];
  lang: Language;
  onAddJob: (job: JobItem) => void;
}

export const JobPortalView: React.FC<JobPortalViewProps> = ({ jobs, lang, onAddJob }) => {
  const [activeTab, setActiveTab] = useState<'domestic' | 'abroad' | 'post'>('domestic');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);

  // Apply Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantResume, setApplicantResume] = useState('');
  const [applicantNote, setApplicantNote] = useState('');

  // Post a Job Form State
  const [postTitle, setPostTitle] = useState('');
  const [postCompany, setPostCompany] = useState('');
  const [postType, setPostType] = useState<'domestic' | 'international'>('domestic');
  const [postCountry, setPostCountry] = useState('Bangladesh');
  const [postCity, setPostCity] = useState('Dhaka');
  const [postSalary, setPostSalary] = useState('');
  const [postExp, setPostExp] = useState('3-5 Years');
  const [postVisa, setPostVisa] = useState('');
  const [postDesc, setPostDesc] = useState('');
  const [postReqs, setPostReqs] = useState('');
  const [postEmail, setPostEmail] = useState('');
  const [postPackage, setPostPackage] = useState<'standard' | 'featured'>('featured');
  const [postTrxId, setPostTrxId] = useState('');
  const [postSuccess, setPostSuccess] = useState(false);

  const countries = [
    { id: 'all', label: 'All Overseas (সকল বিদেশ)' },
    { id: 'Saudi Arabia', label: 'Saudi Arabia (সৌদি আরব)' },
    { id: 'United Arab Emirates', label: 'UAE / Dubai (দুবাই)' },
    { id: 'Qatar', label: 'Qatar (কাতার)' },
    { id: 'Kuwait', label: 'Kuwait (কুয়েত)' },
    { id: 'Singapore', label: 'Singapore (সিঙ্গাপুর)' },
    { id: 'Malaysia', label: 'Malaysia (মালয়েশিয়া)' },
    { id: 'Germany', label: 'Germany / Europe (জার্মানি)' },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesTab =
      activeTab === 'domestic'
        ? job.type === 'domestic'
        : activeTab === 'abroad'
        ? job.type === 'international'
        : true;

    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.titleBn.includes(searchTerm) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCountry =
      activeTab !== 'abroad' ||
      selectedCountry === 'all' ||
      job.country.toLowerCase().includes(selectedCountry.toLowerCase());

    return matchesTab && matchesSearch && matchesCountry;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySuccess(true);
    confetti({ particleCount: 70, spread: 60 });
    setTimeout(() => {
      setApplySuccess(false);
      setSelectedJob(null);
    }, 2500);
  };

  const handlePostJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: JobItem = {
      id: `job-${Date.now()}`,
      title: postTitle,
      titleBn: postTitle,
      company: postCompany,
      type: postType,
      country: postType === 'domestic' ? 'Bangladesh' : postCountry,
      countryBn: postType === 'domestic' ? 'বাংলাদেশ' : postCountry,
      city: postCity,
      salary: postSalary,
      salaryBn: postSalary,
      experience: postExp,
      visaType: postVisa || (postType === 'international' ? 'Company Visa Support' : undefined),
      deadline: '2027-01-30',
      featured: postPackage === 'featured',
      status: 'active',
      description: postDesc,
      descriptionBn: postDesc,
      requirements: postReqs.split('\n').filter((r) => r.trim().length > 0),
      contactEmail: postEmail,
    };

    onAddJob(newJob);
    setPostSuccess(true);
    confetti({ particleCount: 90, spread: 70 });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171b26] via-[#12151e] to-[#0c0e14] border border-amber-400/30 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
            <Briefcase className="w-4 h-4" />
            <span>{lang === 'bn' ? 'বিপিসিএবি জব পোর্টাল' : 'BPCAB Culinary Career Portal'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
            {lang === 'bn' ? (
              <>
                দেশ ও বিদেশে <span className="text-amber-400">বেকারি ও প্যাস্ট্রি শেফদের</span> চাকরির সুযোগ
              </>
            ) : (
              <>
                Domestic &amp; Overseas <span className="text-amber-400">Pastry Chef Careers</span>
              </>
            )}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {lang === 'bn'
              ? 'বাংলাদেশের শীর্ষ ৫-তারকা হোটেল ও বেকারি থেকে শুরু করে সৌদি আরব, দুবাই, কাতার ও ইউরোপে দক্ষ প্যাস্ট্রি শেফ ও বেকারদের সার্টিফাইড নিয়োগ বিজ্ঞপ্তি।'
              : 'Explore verified domestic luxury hospitality openings and accredited international job circulars across the Gulf and Europe with visa sponsorship.'}
          </p>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-[#12151e] rounded-2xl border border-white/10 text-xs font-bold">
        <button
          onClick={() => setActiveTab('domestic')}
          className={`px-5 py-3 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'domestic'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>{lang === 'bn' ? '১. বাংলাদেশে চাকরি (Jobs in Bangladesh)' : '1. Jobs in Bangladesh'}</span>
        </button>

        <button
          onClick={() => setActiveTab('abroad')}
          className={`px-5 py-3 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'abroad'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Plane className="w-4 h-4" />
          <span>{lang === 'bn' ? '২. বিদেশে আন্তর্জাতিক চাকরি (Jobs Abroad)' : '2. Jobs Abroad (Overseas)'}</span>
        </button>

        <button
          onClick={() => setActiveTab('post')}
          className={`px-5 py-3 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'post'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>{lang === 'bn' ? '৩. নিয়োগ বিজ্ঞপ্তি পোস্ট করুন (Post a Job)' : '3. Post a Job (Employer)'}</span>
        </button>
      </div>

      {/* Search and Filters (for domestic & abroad) */}
      {activeTab !== 'post' && (
        <div className="bg-[#12151e] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  lang === 'bn'
                    ? 'চাকরির পদবি, কোম্পানি বা শহর দিয়ে খুঁজুন...'
                    : 'Search job title, hotel, or city...'
                }
                className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            {activeTab === 'abroad' && (
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-semibold"
                >
                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Job Cards Grid */}
      {activeTab !== 'post' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-slate-400 font-semibold">
              {lang === 'bn'
                ? `মোট ${filteredJobs.length} টি ভেরিফাইড চাকরির বিজ্ঞপ্তি পাওয়া গেছে`
                : `${filteredJobs.length} Verified Openings Found`}
            </span>
            <span className="text-[11px] text-amber-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>NSDA &amp; BPCAB Endorsed</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className={`bg-[#131620] border rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between ${
                  job.featured
                    ? 'border-amber-400/60 shadow-lg shadow-amber-500/5'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      {job.featured && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 mb-2">
                          <Sparkles className="w-3 h-3" /> FEATURED
                        </span>
                      )}
                      <h3 className="font-black text-lg text-white font-['Montserrat'] line-clamp-1">
                        {lang === 'bn' ? job.titleBn : job.title}
                      </h3>
                      <p className="text-xs text-amber-300 font-bold flex items-center gap-1.5 mt-0.5">
                        <Building className="w-3.5 h-3.5 text-amber-400" />
                        <span>{job.company}</span>
                      </p>
                    </div>

                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-xl bg-black/60 border border-white/15 text-slate-300 shrink-0">
                      {job.type === 'international' ? '✈️ ABROAD' : '🇧🇩 DOMESTIC'}
                    </span>
                  </div>

                  {/* Badges / Metrics */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 my-4 p-3 rounded-2xl bg-black/40 border border-white/5">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span className="line-clamp-1">{job.city}, {job.country}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <DollarSign className="w-3.5 h-3.5 shrink-0" />
                      <span className="line-clamp-1">{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{job.experience}</span>
                    </div>
                    {job.visaType && (
                      <div className="flex items-center gap-1.5 text-sky-400 font-semibold">
                        <FileCheck className="w-3.5 h-3.5 shrink-0" />
                        <span className="line-clamp-1">{job.visaType}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {lang === 'bn' ? job.descriptionBn : job.description}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500 font-mono">
                    Deadline: {job.deadline}
                  </span>

                  <button
                    onClick={() => setSelectedJob(job)}
                    className="px-5 py-2.5 rounded-xl gold-gradient text-slate-950 font-black text-xs shadow hover:brightness-110 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{lang === 'bn' ? 'বিস্তারিত ও আবেদন' : 'Details & Apply'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 3: POST A JOB (EMPLOYER PORTAL) ================= */}
      {activeTab === 'post' && (
        <div className="bg-[#12151e] border border-amber-400/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-black text-white font-['Montserrat']">
              {lang === 'bn' ? 'নিয়োগ বিজ্ঞপ্তি পোস্ট করুন (Employer Job Posting)' : 'Employer Job Posting Portal'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              হোটেল, বেকারি বা ওভারসিজ রিক্রুটিং এজেন্সির পক্ষ থেকে চাকরির বিজ্ঞপ্তি সরাসরি বিপিসিএবি পোর্টালে পোস্ট করুন।
            </p>
          </div>

          {postSuccess ? (
            <div className="p-8 rounded-3xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4 max-w-xl mx-auto animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white font-['Montserrat']">
                চাকরির বিজ্ঞপ্তি সফলভাবে পোস্ট হয়েছে!
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                আপনার পোস্টটি এডমিন রিভিউ এবং ভেরিফিকেশনের পর সরাসরি হোমপেজ ও জব বোর্ডে প্রদর্শিত হবে।
              </p>
              <button
                onClick={() => {
                  setPostSuccess(false);
                  setActiveTab('domestic');
                }}
                className="px-6 py-2.5 rounded-xl gold-gradient text-slate-950 font-black text-xs shadow cursor-pointer"
              >
                জব বোর্ডে ফিরে যান ➔
              </button>
            </div>
          ) : (
            <form onSubmit={handlePostJobSubmit} className="space-y-6 text-xs sm:text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    চাকরির পদবি (Job Title) *
                  </label>
                  <input
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="e.g. Pastry Sous Chef / Sourdough Baker"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    কোম্পানি / হোটেলের নাম (Company Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={postCompany}
                    onChange={(e) => setPostCompany(e.target.value)}
                    placeholder="e.g. Grand Sultan Resort / Artisan Pastry Co."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">কাজের ধরণ *</label>
                  <select
                    value={postType}
                    onChange={(e) => setPostType(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="domestic">বাংলাদেশে চাকরি (Domestic)</option>
                    <option value="international">বিদেশে চাকরি (International Abroad)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">দেশ (Country) *</label>
                  <input
                    type="text"
                    required
                    value={postCountry}
                    onChange={(e) => setPostCountry(e.target.value)}
                    placeholder="Bangladesh / Saudi Arabia / UAE"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">শহর / লোকেশন *</label>
                  <input
                    type="text"
                    required
                    value={postCity}
                    onChange={(e) => setPostCity(e.target.value)}
                    placeholder="Dhaka / Riyadh / Dubai"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">বেতন স্কেল (Salary) *</label>
                  <input
                    type="text"
                    required
                    value={postSalary}
                    onChange={(e) => setPostSalary(e.target.value)}
                    placeholder="e.g. ৳৭০,০০০ - ৳৯০,০০০ বা SAR 6,000"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">অভিজ্ঞতা *</label>
                  <input
                    type="text"
                    required
                    value={postExp}
                    onChange={(e) => setPostExp(e.target.value)}
                    placeholder="3-5 Years"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">ভিসা সুবিধা (যদি থাকে)</label>
                  <input
                    type="text"
                    value={postVisa}
                    onChange={(e) => setPostVisa(e.target.value)}
                    placeholder="Company Provided Visa & Air Ticket"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1.5">
                  চাকরির দায়িত্ব ও বিবরণ (Job Description) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={postDesc}
                  onChange={(e) => setPostDesc(e.target.value)}
                  placeholder="পদের দায়িত্ব ও কাজের বিবরণ লিখুন..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1.5">
                  প্রয়োজনীয় যোগ্যতা (প্রতি লাইনে একটি করে রিকোয়ারমেন্ট দিন) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={postReqs}
                  onChange={(e) => setPostReqs(e.target.value)}
                  placeholder="Diploma in Pastry Arts&#10;HACCP knowledge&#10;3 years 5-star experience"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400 font-mono text-xs"
                />
              </div>

              {/* Package & Payment */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                <h4 className="font-bold text-amber-400 text-xs uppercase tracking-wider">
                  জব পোস্টিং প্যাকেজ ও বিকাশ/নগদ ভেরিফিকেশন
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer ${
                      postPackage === 'featured'
                        ? 'border-amber-400 bg-amber-400/10 text-white font-bold'
                        : 'border-white/10 bg-black/30 text-slate-400'
                    }`}
                  >
                    <div>
                      <span className="block font-bold text-sm text-amber-300">
                        ভিআইপি ফিচার্ড জব (Featured VIP)
                      </span>
                      <span className="text-[11px] text-slate-400">হোমপেজ ও শীর্ষে প্রদর্শন (৳২,৫০০)</span>
                    </div>
                    <input
                      type="radio"
                      name="pkg"
                      checked={postPackage === 'featured'}
                      onChange={() => setPostPackage('featured')}
                      className="accent-amber-400"
                    />
                  </label>

                  <label
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer ${
                      postPackage === 'standard'
                        ? 'border-amber-400 bg-amber-400/10 text-white font-bold'
                        : 'border-white/10 bg-black/30 text-slate-400'
                    }`}
                  >
                    <div>
                      <span className="block font-bold text-sm text-slate-200">
                        স্ট্যান্ডার্ড লিস্টিং (Standard Listing)
                      </span>
                      <span className="text-[11px] text-slate-400">৩০ দিনের জন্য জব বোর্ডে (৳১,০০০)</span>
                    </div>
                    <input
                      type="radio"
                      name="pkg"
                      checked={postPackage === 'standard'}
                      onChange={() => setPostPackage('standard')}
                      className="accent-amber-400"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      সিভি গ্রহণের অফিশিয়াল ইমেইল *
                    </label>
                    <input
                      type="email"
                      required
                      value={postEmail}
                      onChange={(e) => setPostEmail(e.target.value)}
                      placeholder="hr@yourhotel.com"
                      className="w-full px-4 py-2 rounded-xl bg-black/60 border border-white/15 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      ফি পেমেন্টের বিকাশ/নগদ TrxID *
                    </label>
                    <input
                      type="text"
                      required
                      value={postTrxId}
                      onChange={(e) => setPostTrxId(e.target.value)}
                      placeholder="e.g. BK9A887766 (বিকাশ: 01711-234567)"
                      className="w-full px-4 py-2 rounded-xl bg-black/60 border border-white/15 text-amber-300 font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl gold-gradient text-slate-950 font-black text-sm shadow-xl hover:brightness-110 transition cursor-pointer"
              >
                নিয়োগ বিজ্ঞপ্তি প্রকাশ করুন ➔
              </button>
            </form>
          )}
        </div>
      )}

      {/* Job Details & Apply Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141824] border border-amber-400/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {selectedJob.type === 'international' ? '✈️ OVERSEAS OPENING' : '🇧🇩 BANGLADESH'}
                </span>
                <h3 className="font-black text-xl text-white font-['Montserrat'] mt-2">
                  {lang === 'bn' ? selectedJob.titleBn : selectedJob.title}
                </h3>
                <p className="text-xs text-amber-300 font-bold mt-0.5">{selectedJob.company}</p>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{selectedJob.city}, {selectedJob.country}</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Salary & Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-black/40 rounded-xl border border-white/10">
                <span className="text-slate-400 text-[10px] block">বেতন স্কেল:</span>
                <strong className="text-emerald-400 block mt-0.5 text-sm">{selectedJob.salary}</strong>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/10">
                <span className="text-slate-400 text-[10px] block">অভিজ্ঞতা:</span>
                <strong className="text-amber-400 block mt-0.5">{selectedJob.experience}</strong>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/10">
                <span className="text-slate-400 text-[10px] block">আবেদনের শেষ তারিখ:</span>
                <strong className="text-white block mt-0.5">{selectedJob.deadline}</strong>
              </div>
            </div>

            {/* Description & Requirements */}
            <div className="space-y-3 text-xs leading-relaxed">
              <h4 className="font-bold text-amber-400 uppercase tracking-wider">পদের বিবরণ:</h4>
              <p className="text-slate-300 bg-black/30 p-4 rounded-xl border border-white/5">
                {lang === 'bn' ? selectedJob.descriptionBn : selectedJob.description}
              </p>

              <h4 className="font-bold text-amber-400 uppercase tracking-wider pt-2">
                প্রয়োজনীয় যোগ্যতা ও শর্তাবলী:
              </h4>
              <ul className="space-y-1.5">
                {selectedJob.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Online Application Form */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                চাকরির জন্য সরাসরি অনলাইনে আবেদন করুন:
              </h4>

              {applySuccess ? (
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-center font-bold text-xs">
                  ✓ আপনার আবেদন সফলভাবে পাঠানো হয়েছে! নিয়োগকর্তা সরাসরি যোগাযোগ করবেন।
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="আপনার পূর্ণ নাম (Full Name) *"
                      className="px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white"
                    />
                    <input
                      type="tel"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      placeholder="মোবাইল নম্বর (Phone / WhatsApp) *"
                      className="px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white"
                    />
                  </div>

                  <input
                    type="url"
                    value={applicantResume}
                    onChange={(e) => setApplicantResume(e.target.value)}
                    placeholder="অনলাইন সিভি / লিঙ্কডইন / পোর্টফোলিও লিঙ্ক (ঐচ্ছিক)"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-xs"
                  />

                  <textarea
                    rows={2}
                    value={applicantNote}
                    onChange={(e) => setApplicantNote(e.target.value)}
                    placeholder="শেফ হিসেবে আপনার অভিজ্ঞতা বা সংক্ষিপ্ত বার্তা লিখুন..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white"
                  />

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-slate-400">
                      ইমেইল: <code className="text-amber-400">{selectedJob.contactEmail}</code>
                    </span>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl gold-gradient text-slate-950 font-black text-xs shadow-lg hover:brightness-110 transition cursor-pointer"
                    >
                      আবেদন পাঠান ➔
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
