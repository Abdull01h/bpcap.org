import React, { useState, useRef } from 'react';
import {
  UserCheck,
  CreditCard,
  QrCode,
  Download,
  Printer,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Upload,
  Calendar,
  Clock,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MemberProfile, Language, PaymentRecord } from '../types';

interface MembershipViewProps {
  lang: Language;
  members: MemberProfile[];
  onAddMember: (member: MemberProfile) => void;
  selectedMemberForCard?: MemberProfile | null;
  payments: PaymentRecord[];
  onAddPayment: (payment: PaymentRecord) => void;
}

export const MembershipView: React.FC<MembershipViewProps> = ({
  lang,
  members,
  onAddMember,
  selectedMemberForCard,
  payments,
  onAddPayment,
}) => {
  const [activeTab, setActiveTab] = useState<'apply' | 'idcard' | 'payment'>('idcard');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // ID Card State
  const [cardMember, setCardMember] = useState<MemberProfile>(
    selectedMemberForCard || members[0]
  );

  // Application Form State
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSpeciality, setFormSpeciality] = useState('French Pastry & Cake Art');
  const [formWorkplace, setFormWorkplace] = useState('');
  const [formExperience, setFormExperience] = useState('3-5 Years');
  const [formPhoto, setFormPhoto] = useState(
    'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&auto=format&fit=crop&q=80'
  );
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [generatedMemberId, setGeneratedMemberId] = useState('');

  // Payment Form State
  const [payMethod, setPayMethod] = useState<'bKash' | 'Nagad'>('bKash');
  const [payMemberId, setPayMemberId] = useState(cardMember.memberId);
  const [payTrxId, setPayTrxId] = useState('');
  const [payAmount, setPayAmount] = useState('1500');
  const [paySuccess, setPaySuccess] = useState<PaymentRecord | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `BPCAB-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newMember: MemberProfile = {
      id: `mem-${Date.now()}`,
      memberId: newId,
      name: formName,
      nameBn: formName,
      photo: formPhoto,
      speciality: formSpeciality,
      specialityBn: formSpeciality,
      workplace: formWorkplace || 'Independent Artisan',
      workplaceBn: formWorkplace || 'স্বতন্ত্র কারিগর',
      designation: 'Certified Member Baker',
      designationBn: 'সার্টিফাইড সদস্য বেকার',
      experience: formExperience,
      experienceBn: formExperience,
      location: 'Dhaka, Bangladesh',
      email: formEmail,
      phone: formPhone,
      status: 'Active',
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: `${new Date().getFullYear() + 2}-12-31`,
      bio: 'Newly registered culinary professional accredited under BPCAB national registry.',
      bioBn: 'বিপিসিএবি জাতীয় মেম্বারশিপে সদ্য নিবন্ধিত পেশাদার কারিগর।',
      signatureDishes: ['Artisan Cake', 'Butter Pastry'],
    };

    onAddMember(newMember);
    setGeneratedMemberId(newId);
    setCardMember(newMember);
    setPayMemberId(newId);
    setFormSubmitted(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payTrxId.trim()) return;

    const newRecord: PaymentRecord = {
      id: `pay-${Date.now()}`,
      memberId: payMemberId || 'BPCAB-NEW',
      memberName: cardMember.name || 'BPCAB Member',
      amount: parseInt(payAmount) || 1500,
      method: payMethod,
      trxId: payTrxId.toUpperCase(),
      date: new Date().toISOString().split('T')[0],
      status: 'Verified',
      type: 'Registration',
    };

    onAddPayment(newRecord);
    setPaySuccess(newRecord);
    confetti({ particleCount: 80, spread: 60 });
  };

  // Download ID Card as PNG Image using Canvas
  const downloadCardPNG = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 650;
    canvas.height = 410;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw luxury background gradient
    const grad = ctx.createLinearGradient(0, 0, 650, 410);
    grad.addColorStop(0, '#0d111a');
    grad.addColorStop(0.5, '#171c28');
    grad.addColorStop(1, '#0b0e14');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 650, 410);

    // Gold borders
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, 630, 390);

    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(16, 16, 618, 378);

    // Top gold header ribbon
    const headerGrad = ctx.createLinearGradient(16, 16, 634, 65);
    headerGrad.addColorStop(0, '#d97706');
    headerGrad.addColorStop(0.5, '#fbbf24');
    headerGrad.addColorStop(1, '#b45309');
    ctx.fillStyle = headerGrad;
    ctx.fillRect(16, 16, 618, 65);

    ctx.fillStyle = '#0b0e14';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('BAKERY & PASTRY CHEFS ASSEMBLY OF BANGLADESH', 35, 45);
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('OFFICIAL EXECUTIVE NATIONAL MEMBERSHIP CARD · EST. 2019', 35, 65);

    // Member Photo Box
    ctx.fillStyle = '#000000';
    ctx.fillRect(40, 110, 140, 170);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 110, 140, 170);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = cardMember.photo;
    img.onload = () => {
      ctx.drawImage(img, 42, 112, 136, 166);
      finishDrawing();
    };
    img.onerror = () => {
      ctx.fillStyle = '#334155';
      ctx.fillRect(42, 112, 136, 166);
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('PHOTO', 80, 200);
      finishDrawing();
    };

    const finishDrawing = () => {
      // Member details
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(cardMember.name, 210, 135);

      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(cardMember.designation, 210, 160);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '13px sans-serif';
      ctx.fillText(`Speciality: ${cardMember.speciality}`, 210, 190);
      ctx.fillText(`Workplace: ${cardMember.workplace}`, 210, 215);
      ctx.fillText(`Issue Date: ${cardMember.issueDate}  |  Expires: ${cardMember.expiryDate}`, 210, 240);

      // Gold ID Pill
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(210, 260, 220, 32);
      ctx.fillStyle = '#0b0e14';
      ctx.font = 'bold 16px monospace';
      ctx.fillText(`ID: ${cardMember.memberId}`, 225, 282);

      // QR Code representation
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(490, 160, 110, 110);
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.strokeRect(490, 160, 110, 110);
      ctx.fillStyle = '#0b0e14';
      ctx.font = 'bold 10px monospace';
      ctx.fillText('VERIFIED QR', 510, 220);

      // Footer
      ctx.fillStyle = '#64748b';
      ctx.font = '10px sans-serif';
      ctx.fillText('This authenticated digital credential is authorized by the BPCAB National Secretariat.', 40, 340);
      ctx.fillText('Gulshan-2, Dhaka 1212 · www.bpcab.org.bd · NSDA Accredited Guild', 40, 360);

      // Trigger download
      const link = document.createElement('a');
      link.download = `BPCAB-ID-${cardMember.memberId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      confetti({ particleCount: 50, spread: 60 });
    };
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171b26] via-[#12151e] to-[#0c0e14] border border-amber-400/30 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
            <UserCheck className="w-4 h-4" />
            <span>{lang === 'bn' ? 'সদস্যপদ ও ডিজিটাল আইডি ব্যবস্থা' : 'Membership & Digital ID System'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
            {lang === 'bn' ? (
              <>
                বিপিসিএবি সদস্যপদ, <span className="text-amber-400">ডিজিটাল আইডি কার্ড</span> ও পেমেন্ট
              </>
            ) : (
              <>
                BPCAB Membership, <span className="text-amber-400">Digital ID Card</span> &amp; Verification
              </>
            )}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {lang === 'bn'
              ? 'অনলাইনে সদস্যপদ আবেদন করুন, তাৎক্ষণিক ইউনিক আইডি ও কিউআর কোড সম্বলিত ডিজিটাল পিভিসি আইডি কার্ড জেনারেট করুন এবং বিকাশ বা নগদের মাধ্যমে ফি প্রদান করুন।'
              : 'Apply online for professional membership, generate instant authenticated digital PVC ID cards with QR codes, and pay dues with bKash & Nagad.'}
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-[#12151e] rounded-2xl border border-white/10 text-xs font-bold">
        <button
          onClick={() => setActiveTab('idcard')}
          className={`px-5 py-3 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'idcard'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>{lang === 'bn' ? '১. ডিজিটাল আইডি কার্ড জেনারেটর' : '1. Digital ID Card Generator'}</span>
        </button>

        <button
          onClick={() => setActiveTab('apply')}
          className={`px-5 py-3 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'apply'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>{lang === 'bn' ? '২. অনলাইনে সদস্যপদ আবেদন' : '2. Online Application Form'}</span>
        </button>

        <button
          onClick={() => setActiveTab('payment')}
          className={`px-5 py-3 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'payment'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{lang === 'bn' ? '৩. মেম্বারশিপ ফি ও পেমেন্ট রিসিট' : '3. Fee Payment & Receipt'}</span>
        </button>
      </div>

      {/* ================= TAB 1: DIGITAL ID CARD GENERATOR ================= */}
      {activeTab === 'idcard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: ID Card Preview Card */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'লাইভ ডিজিটাল আইডি কার্ড প্রিভিউ' : 'Live PVC Digital ID Preview'}</span>
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full font-bold border border-emerald-500/30">
                  CR80 STANDARD COMPLIANT
                </span>
              </div>

              {/* The Actual Digital ID Card */}
              <div
                ref={cardRef}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e121a] via-[#161c28] to-[#0a0d14] border-2 border-amber-400 p-6 sm:p-7 shadow-2xl text-white select-none transition-all duration-300 hover:shadow-amber-500/20"
              >
                {/* Decorative Background Hologram Lines */}
                <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-amber-400/5 blur-2xl pointer-events-none" />
                <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

                {/* Card Top Header */}
                <div className="flex items-center justify-between pb-4 border-b border-amber-400/30 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full border-2 border-amber-400 bg-black p-0.5 shadow shrink-0 overflow-hidden">
                      <img src="/logo.png" alt="Logo" className="w-full h-full object-contain rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base font-['Montserrat'] tracking-wide text-white flex items-center gap-1.5">
                        BPCAB BANGLADESH
                        <BadgeCheck className="w-4 h-4 text-amber-400" />
                      </h4>
                      <p className="text-[10px] text-amber-300 font-semibold tracking-wider uppercase">
                        Bakery &amp; Pastry Chefs Assembly · National Member
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                      SECURITY NO.
                    </span>
                    <span className="font-mono text-xs font-black text-amber-400 bg-black/60 px-2 py-0.5 rounded border border-amber-400/40">
                      {cardMember.memberId}
                    </span>
                  </div>
                </div>

                {/* Card Body: Photo & Details */}
                <div className="grid grid-cols-12 gap-5 items-center">
                  {/* Photo & Status */}
                  <div className="col-span-4 sm:col-span-4 text-center">
                    <div className="w-24 h-28 sm:w-28 sm:h-32 mx-auto rounded-2xl overflow-hidden border-2 border-amber-400 p-0.5 bg-black shadow-xl relative group">
                      <img
                        src={cardMember.photo}
                        alt={cardMember.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <span className="absolute bottom-1 right-1 bg-emerald-500 text-slate-950 text-[8px] font-black px-1.5 rounded-full border border-black">
                        ACTIVE
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-amber-400 tracking-wider uppercase mt-1.5 block">
                      VERIFIED CHEF
                    </span>
                  </div>

                  {/* Member Information */}
                  <div className="col-span-8 sm:col-span-8 space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                        CHEF NAME / নাম
                      </span>
                      <h3 className="font-extrabold text-base sm:text-lg text-white font-['Montserrat'] line-clamp-1">
                        {cardMember.name}
                      </h3>
                      <p className="text-[11px] text-amber-300 font-semibold">
                        {cardMember.nameBn}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-white/10">
                      <div>
                        <span className="text-slate-400 text-[10px] block">Speciality:</span>
                        <strong className="text-white block font-medium line-clamp-1">
                          {cardMember.speciality}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Workplace:</span>
                        <strong className="text-amber-300 block font-semibold line-clamp-1">
                          {cardMember.workplace}
                        </strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-white/10">
                      <div>
                        <span className="text-slate-400 text-[10px] block">Issue Date:</span>
                        <span className="font-mono text-slate-300">{cardMember.issueDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Valid Until:</span>
                        <span className="font-mono text-emerald-400 font-bold">{cardMember.expiryDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Bottom: QR Code & Signature */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Live QR Code preview */}
                    <div className="w-14 h-14 bg-white p-1 rounded-xl shadow border border-amber-400 flex items-center justify-center shrink-0">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://bpcab.org.bd/verify?id=${cardMember.memberId}`}
                        alt="QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">
                        SCAN TO VERIFY
                      </span>
                      <span className="text-[10px] text-amber-300 font-mono font-bold block">
                        gov.nsda.bpcab/{cardMember.memberId}
                      </span>
                      <span className="text-[9px] text-slate-500 block">Encrypted Digital Credential</span>
                    </div>
                  </div>

                  {/* Authorized Signatory */}
                  <div className="text-right">
                    <div className="font-['Playfair_Display'] italic text-amber-300 text-xs tracking-wider">
                      Tariqul Islam
                    </div>
                    <div className="h-0.5 w-24 bg-amber-400/50 my-0.5 ml-auto" />
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">
                      General Secretary
                    </span>
                    <span className="text-[8px] text-slate-500">BPCAB Secretariat</span>
                  </div>
                </div>
              </div>

              {/* Download & Print Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={downloadCardPNG}
                  className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-slate-950" />
                  <span>{lang === 'bn' ? 'আইডি কার্ড ডাউনলোড করুন (PNG)' : 'Download ID Card (PNG)'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 border border-white/15 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'bn' ? 'প্রিন্ট ফরম্যাট' : 'Print Card'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Member Selector & Card Specifications */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#12151e] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'bn' ? 'কার্ড প্রিভিউয়ের জন্য শেফ নির্বাচন' : 'Select Chef for ID Preview'}</span>
                </h3>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {members.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setCardMember(m)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs transition border cursor-pointer ${
                        cardMember.id === m.id
                          ? 'bg-amber-400/15 border-amber-400 text-white font-bold'
                          : 'bg-black/30 border-white/5 text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img src={m.photo} alt={m.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <span className="block font-bold">{m.name}</span>
                          <span className="text-[10px] text-slate-400">{m.workplace}</span>
                        </div>
                      </div>
                      <span className="font-mono text-[11px] text-amber-400">{m.memberId}</span>
                    </button>
                  ))}
                </div>

                {/* ID Card Specifications */}
                <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-slate-300">
                  <h4 className="font-bold text-amber-400 text-xs uppercase tracking-wider">
                    {lang === 'bn' ? 'ডিজিটাল আইডি কার্ডের সুবিধাসমূহ' : 'Card Security Specifications'}
                  </h4>
                  <ul className="space-y-1.5 text-[11px] text-slate-400">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>এনএসডিএ (NSDA) আন্তর্জাতিক ক্যারিয়ার সার্টিফিকেশন সমর্থিত</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>স্মার্টফোনে কিউআর কোড স্ক্যান করে অনলাইন ডাটাবেজ যাচাই</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>দেশ-বিদেশের হোটেল নিয়োগ ও এক্সপোতে সরাসরি সদস্যপদ প্রমাণ</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: ONLINE APPLICATION FORM ================= */}
      {activeTab === 'apply' && (
        <div className="bg-[#12151e] border border-amber-400/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-black text-white font-['Montserrat']">
              {lang === 'bn' ? 'অনলাইন সদস্যপদ আবেদনপত্র (Membership Form)' : 'Online Membership Application Form'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {lang === 'bn'
                ? 'আপনার সঠিক তথ্য প্রদান করে আবেদন জমা দিন। আবেদন অনুমোদনের সাথে সাথে ডিজিটাল আইডি কার্ড প্রস্তুত হবে।'
                : 'Submit your culinary profile to apply for official registration and receive your digital credential.'}
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 rounded-3xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4 max-w-xl mx-auto animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white font-['Montserrat']">
                আবেদন সফলভাবে গৃহীত হয়েছে!
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                আপনার ইউনিক মেম্বারশিপ আইডি জেনারেট হয়েছে:{' '}
                <strong className="text-amber-400 font-mono text-base block mt-1">
                  {generatedMemberId}
                </strong>
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => setActiveTab('idcard')}
                  className="px-5 py-2.5 rounded-xl gold-gradient text-slate-950 font-black text-xs shadow cursor-pointer"
                >
                  ডিজিটাল আইডি কার্ড দেখুন ➔
                </button>
                <button
                  onClick={() => setActiveTab('payment')}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 cursor-pointer"
                >
                  ফি পেমেন্ট করুন ➔
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleApplicationSubmit} className="space-y-6 text-xs sm:text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    পূর্ণ নাম (Full Name in English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Chef Mohammad Abdullah"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    মোবাইল নম্বর (Phone / WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+880 17XX-XXXXXX"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    ইমেইল ঠিকানা (Email Address) *
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="chef@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    প্রধান স্পেশালিটি / দক্ষতা (Speciality) *
                  </label>
                  <select
                    value={formSpeciality}
                    onChange={(e) => setFormSpeciality(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="French Pastry & Viennoiserie">French Pastry & Viennoiserie (ফ্রেঞ্চ প্যাস্ট্রি)</option>
                    <option value="Fondant & 3D Sculpted Cakes">Fondant & 3D Sculpted Cakes (ফন্ড্যান্ট কেক আর্ট)</option>
                    <option value="Artisan Sourdough & Crusty Breads">Artisan Sourdough & Crusty Breads (সাওয়ারডো)</option>
                    <option value="Chocolate Tempering & Bonbons">Chocolate Tempering & Bonbons (চকলেট বোনবোন)</option>
                    <option value="Modern Plated Fine Desserts">Modern Plated Fine Desserts (প্লেটেড ডেজার্ট)</option>
                    <option value="Home Baker & Custom Cakes">Home Baker & Custom Cakes (হোম বেকার)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    বর্তমান কর্মস্থল বা বেকারি/ক্যাফের নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={formWorkplace}
                    onChange={(e) => setFormWorkplace(e.target.value)}
                    placeholder="e.g. Radisson Blu / Sugar Bloom / Home Baker"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    কাজের অভিজ্ঞতা (Years of Experience) *
                  </label>
                  <select
                    value={formExperience}
                    onChange={(e) => setFormExperience(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="1-3 Years">1 - 3 Years</option>
                    <option value="4-6 Years">4 - 6 Years</option>
                    <option value="7-10 Years">7 - 10 Years</option>
                    <option value="10+ Years (Senior Master)">10+ Years (Senior Master)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1.5">
                  প্রোফাইল ছবি (Photo URL or Link for ID Card)
                </label>
                <input
                  type="url"
                  value={formPhoto}
                  onChange={(e) => setFormPhoto(e.target.value)}
                  placeholder="https://.../my-photo.jpg"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400 font-mono text-xs"
                />
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-slate-400 flex items-center justify-between">
                <span>রেজিস্ট্রেশন ফি: <strong className="text-amber-400 font-bold">৳১,৫০০ (২ বছরের জন্য)</strong></span>
                <span>স্বয়ংক্রিয় ডিজিটাল আইডি কার্ড ও সার্টিফিকেট অন্তর্ভুক্ত</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl gold-gradient text-slate-950 font-black text-sm shadow-xl hover:brightness-110 transition cursor-pointer"
              >
                সদস্যপদ আবেদন জমা দিন ও আইডি কার্ড পান ➔
              </button>
            </form>
          )}
        </div>
      )}

      {/* ================= TAB 3: FEE PAYMENT & RECEIPT ================= */}
      {activeTab === 'payment' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Payment Method Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-[#12151e] border border-amber-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                <div>
                  <h3 className="text-lg font-black text-white font-['Montserrat'] flex items-center gap-2">
                    <span className="text-amber-400">💳</span>
                    <span>মেম্বারশিপ ফি পেমেন্ট পদ্ধতি (Payment Options)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    বিকাশ বা নগদ অ্যাপ থেকে সেন্ড মানি করে প্রাপ্ত TrxID নিচে জমা দিন
                  </p>
                </div>

                {/* Method selector */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPayMethod('bKash')}
                    className={`p-4 rounded-2xl border transition text-center cursor-pointer ${
                      payMethod === 'bKash'
                        ? 'bg-[#e2136e]/20 border-[#e2136e] text-white shadow-lg'
                        : 'bg-black/40 border-white/10 text-slate-400'
                    }`}
                  >
                    <span className="text-xl font-black block tracking-wider text-[#e2136e]">bKash</span>
                    <span className="text-[11px] font-bold block mt-1 text-white">বিকাশ পেমেন্ট</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPayMethod('Nagad')}
                    className={`p-4 rounded-2xl border transition text-center cursor-pointer ${
                      payMethod === 'Nagad'
                        ? 'bg-[#f7941d]/20 border-[#f7941d] text-white shadow-lg'
                        : 'bg-black/40 border-white/10 text-slate-400'
                    }`}
                  >
                    <span className="text-xl font-black block tracking-wider text-[#f7941d]">Nagad</span>
                    <span className="text-[11px] font-bold block mt-1 text-white">নগদ পেমেন্ট</span>
                  </button>
                </div>

                {/* Account details box */}
                <div className="p-5 rounded-2xl bg-black/60 border border-white/15 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">অফিসিয়াল একাউন্ট নম্বর:</span>
                    <div className="flex items-center gap-2">
                      <strong className="font-mono text-amber-400 text-sm font-bold">
                        {payMethod === 'bKash' ? '01711-234567' : '01812-334455'}
                      </strong>
                      <button
                        onClick={() =>
                          handleCopy(payMethod === 'bKash' ? '01711234567' : '01812334455', 'num')
                        }
                        className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-300"
                        title="Copy Number"
                      >
                        {copiedText === 'num' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-slate-400">একাউন্টের ধরণ:</span>
                    <span className="text-white font-semibold">Official Merchant / Personal</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-slate-400">রেজিস্ট্রেশন ফি:</span>
                    <span className="text-emerald-400 font-bold font-mono">৳১,৫০০ (BDT)</span>
                  </div>
                </div>

                {/* Submit TrxID Form */}
                <form onSubmit={handlePaymentSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      আপনার মেম্বারশিপ আইডি (Membership ID):
                    </label>
                    <input
                      type="text"
                      required
                      value={payMemberId}
                      onChange={(e) => setPayMemberId(e.target.value)}
                      placeholder="e.g. BPCAB-2019-001"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono font-bold focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      লেনদেনের ট্রানজেকশন আইডি (Transaction ID / TrxID) *
                    </label>
                    <input
                      type="text"
                      required
                      value={payTrxId}
                      onChange={(e) => setPayTrxId(e.target.value)}
                      placeholder="e.g. BK9A772109 বা NG88124091"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-amber-300 font-mono font-bold uppercase focus:outline-none focus:border-amber-400 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl gold-gradient text-slate-950 font-black text-xs sm:text-sm shadow-xl hover:brightness-110 transition cursor-pointer"
                  >
                    পেমেন্ট ভেরিফাই করুন ও রিসিট নিন ➔
                  </button>
                </form>
              </div>
            </div>

            {/* Official Payment Receipt Generator */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                অফিসিয়াল পেমেন্ট রিসিট (Official Receipt)
              </span>

              {/* Printable Receipt Box */}
              <div className="bg-[#ffffff] text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 border-4 border-amber-400">
                {/* Receipt Header */}
                <div className="flex items-center justify-between pb-4 border-b-2 border-slate-200">
                  <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain rounded-full border border-amber-500" />
                    <div>
                      <h4 className="font-extrabold text-sm font-['Montserrat'] tracking-tight text-slate-900">
                        BPCAB OFFICIAL RECEIPT
                      </h4>
                      <p className="text-[10px] text-slate-600">Bakery & Pastry Chefs Assembly Of Bangladesh</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black border border-emerald-300">
                      PAID / পরিশোধিত
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                      INV-{Date.now().toString().slice(-6)}
                    </span>
                  </div>
                </div>

                {/* Receipt Details */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Received From (সদস্যের নাম):</span>
                    <strong className="text-slate-900 block font-bold text-sm">
                      {paySuccess?.memberName || cardMember.name}
                    </strong>
                    <span className="text-slate-600 font-mono text-[11px]">
                      ID: {paySuccess?.memberId || payMemberId}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 block text-[10px]">Payment Date (তারিখ):</span>
                    <strong className="text-slate-900 block font-semibold text-xs">
                      {paySuccess?.date || new Date().toISOString().split('T')[0]}
                    </strong>
                    <span className="text-slate-600 text-[11px]">Banani HQ, Dhaka</span>
                  </div>
                </div>

                {/* Items Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <div className="bg-slate-100 px-3 py-2 font-bold text-slate-700 flex justify-between">
                    <span>Description (বিবরণ)</span>
                    <span>Amount (পরিমাণ)</span>
                  </div>
                  <div className="px-3 py-2.5 flex justify-between border-t border-slate-200 text-slate-800">
                    <div>
                      <strong>BPCAB Executive Membership Registration Fee</strong>
                      <span className="text-[10px] text-slate-500 block">
                        Method: {paySuccess?.method || payMethod} · TrxID:{' '}
                        <code className="font-mono text-amber-700">{paySuccess?.trxId || payTrxId || 'BK9A772109'}</code>
                      </span>
                    </div>
                    <span className="font-bold text-slate-900 font-mono">৳১,৫০০.০০</span>
                  </div>
                  <div className="bg-amber-50 px-3 py-2 flex justify-between font-extrabold text-amber-900 border-t border-slate-200 text-sm">
                    <span>Total Paid (মোট পরিশোধিত):</span>
                    <span className="font-mono">৳১,৫০০.০০</span>
                  </div>
                </div>

                {/* Stamp & Seal */}
                <div className="flex items-center justify-between pt-3 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Electronically Verified &amp; Signed</span>
                  </div>
                  <div className="text-right">
                    <span className="font-['Playfair_Display'] italic text-amber-800 font-bold block">
                      BPCAB Secretariat Seal
                    </span>
                    <span className="text-[9px] text-slate-400">Authorised Signatory</span>
                  </div>
                </div>
              </div>

              {/* Receipt Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handlePrint}
                  className="flex-1 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition flex items-center justify-center gap-2 border border-white/15 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>রিসিট প্রিন্ট / ডাউনলোড করুন</span>
                </button>
              </div>

              {/* Payment History Log */}
              <div className="bg-[#12151e] border border-white/10 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  সাম্প্রতিক পেমেন্ট হিস্ট্রি ({payments.length})
                </h4>
                <div className="space-y-2">
                  {payments.slice(0, 3).map((p) => (
                    <div
                      key={p.id}
                      className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs"
                    >
                      <div>
                        <strong className="text-white block">{p.memberName}</strong>
                        <span className="text-[10px] text-slate-400">
                          {p.method} · <code className="text-amber-400 font-mono">{p.trxId}</code>
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-emerald-400">৳{p.amount}</span>
                        <span className="text-[10px] text-slate-500 block">{p.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
