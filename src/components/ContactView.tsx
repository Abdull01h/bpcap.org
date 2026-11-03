import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  Clock,
  Building,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../types';

interface ContactViewProps {
  lang: Language;
}

export const ContactView: React.FC<ContactViewProps> = ({ lang }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 50, spread: 60 });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171b26] via-[#12151e] to-[#0c0e14] border border-amber-400/30 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
            <Mail className="w-4 h-4" />
            <span>NATIONAL SECRETARIAT &amp; ADVISORY HQ</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
            {lang === 'bn' ? (
              <>
                যোগাযোগ ও <span className="text-amber-400">সচিবালয় সচিবালয়</span> সহায়তা
              </>
            ) : (
              <>
                Contact &amp; <span className="text-amber-400">Headquarters Secretariat</span>
              </>
            )}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {lang === 'bn'
              ? 'সদস্যপদ নবায়ন, সার্টিফিকেট যাচাই, এনএসডিএ সংক্রান্ত যেকোনো পরামর্শ বা জরুরি সহযোগিতার জন্য বনানী প্রধান কার্যালয়ে সরাসরি যোগাযোগ করুন।'
              : 'Reach our executive secretariat in Banani, Dhaka for membership queries, certification authentication, or workshop registrations.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Office Address */}
          <div className="bg-[#131620] border border-white/10 rounded-3xl p-6 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/15 text-rose-400 flex items-center justify-center border border-rose-500/30">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-white text-base font-['Montserrat']">
              {lang === 'bn' ? 'প্রধান সচিবালয় কার্যালয়' : 'National Secretariat Office'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              House 42, Road 11, Block D, Banani / Gulshan-2, Dhaka 1213, Bangladesh
            </p>
            <p className="text-[11px] text-amber-300 font-semibold">
              বাড়ি ৪২, রোড ১১, ব্লক ডি, বনানী / গুলশান-২, ঢাকা ১২১৩
            </p>
          </div>

          {/* Card 2: Phone & WhatsApp */}
          <div className="bg-[#131620] border border-white/10 rounded-3xl p-6 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/15 text-amber-400 flex items-center justify-center border border-amber-400/30">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-white text-base font-['Montserrat']">
              {lang === 'bn' ? 'জরুরি ফোন হটলাইন' : 'Helpline & Official Phone'}
            </h3>
            <p className="text-sm font-mono font-bold text-amber-400">+880 1711-234567</p>
            <p className="text-xs text-slate-400">শনিবার থেকে বৃহস্পতিবার: সকাল ১০:০০ - সন্ধ্যা ০৭:০০</p>

            <a
              href="https://wa.me/8801711234567?text=Hello%20BPCAB%20Secretariat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition mt-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>সরাসরি হোয়াটসঅ্যাপে মেসেজ করুন</span>
            </a>
          </div>

          {/* Card 3: Official Email */}
          <div className="bg-[#131620] border border-white/10 rounded-3xl p-6 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-white text-base font-['Montserrat']">
              {lang === 'bn' ? 'অফিসিয়াল ইমেইল' : 'Official Secretariat Email'}
            </h3>
            <p className="text-xs font-mono text-slate-300">secretariat@bpcab.org.bd</p>
            <p className="text-xs font-mono text-slate-400">info@bpcab.org.bd</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#131620] border border-amber-400/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-white font-['Montserrat']">
              {lang === 'bn' ? 'সরাসরি বার্তা পাঠান (Contact Form)' : 'Send an Official Inquiry'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              যেকোনো প্রশ্ন বা সহযোগিতার জন্য নিচের ফর্মটি পূরণ করুন, সচিবালয় টিম দ্রুত উত্তর দিবে।
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3 animate-in zoom-in-95">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">আপনার বার্তা সফলভাবে পাঠানো হয়েছে!</h3>
              <p className="text-xs text-slate-300">
                আমাদের সচিবালয় প্রতিনিধি ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবেন।
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2 rounded-xl gold-gradient text-slate-950 font-bold text-xs"
              >
                আরেকটি বার্তা পাঠান
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">আপনার পূর্ণ নাম *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 17XX-XXXXXX"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">ইমেইল ঠিকানা *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">বিষয় (Subject)</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Membership">মেম্বারশিপ ও আইডি কার্ড সম্পর্কিত</option>
                    <option value="Certificate">সার্টিফিকেট যাচাই সংক্রান্ত</option>
                    <option value="Training">মাস্টারক্লাস ও ওয়ার্কশপ</option>
                    <option value="Job Board">চাকরি ও নিয়োগ বিজ্ঞপ্তি</option>
                    <option value="Other">অন্যান্য তথ্য</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">আপনার বিস্তারিত বার্তা *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="আপনার বার্তা বা প্রশ্নের বিস্তারিত লিখুন..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl gold-gradient text-slate-950 font-black text-sm shadow-xl hover:brightness-110 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>বার্তা জমা দিন ➔</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
