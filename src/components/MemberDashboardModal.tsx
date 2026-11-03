import React, { useState } from 'react';
import {
  User,
  CreditCard,
  FileText,
  Calendar,
  Briefcase,
  X,
  LogOut,
  Download,
  CheckCircle2,
  Lock,
  Sparkles,
} from 'lucide-react';
import { MemberProfile, PaymentRecord, Language } from '../types';

interface MemberDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMember: MemberProfile;
  payments: PaymentRecord[];
  lang: Language;
}

export const MemberDashboardModal: React.FC<MemberDashboardModalProps> = ({
  isOpen,
  onClose,
  currentMember,
  payments,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'card' | 'payments' | 'activities'>('profile');

  if (!isOpen) return null;

  const myPayments = payments.filter(
    (p) => p.memberId === currentMember.memberId || p.memberName.includes(currentMember.name)
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#141824] border border-amber-400/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400 p-0.5 bg-black shrink-0">
              <img src={currentMember.photo} alt={currentMember.name} className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-white font-['Montserrat']">
                  {currentMember.name}
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                  {currentMember.status}
                </span>
              </div>
              <p className="text-xs text-amber-300 font-mono">ID: {currentMember.memberId}</p>
              <p className="text-[11px] text-slate-400">{currentMember.workplace}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex flex-wrap gap-2 p-1 bg-black/40 rounded-xl border border-white/10 text-xs font-bold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === 'profile' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-300 hover:text-white'
            }`}
          >
            প্রোফাইল বিবরণ
          </button>
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === 'card' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-300 hover:text-white'
            }`}
          >
            ডিজিটাল আইডি কার্ড
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === 'payments' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-300 hover:text-white'
            }`}
          >
            পেমেন্ট হিস্ট্রি ({myPayments.length})
          </button>
        </div>

        {/* Tab 1: Profile Details */}
        {activeTab === 'profile' && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 space-y-1">
                <span className="text-slate-400 block text-[10px]">পেশাগত স্পেশালিটি:</span>
                <strong className="text-white text-sm">{currentMember.speciality}</strong>
              </div>
              <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 space-y-1">
                <span className="text-slate-400 block text-[10px]">কাজের অভিজ্ঞতা:</span>
                <strong className="text-amber-400 text-sm">{currentMember.experience}</strong>
              </div>
              <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 space-y-1">
                <span className="text-slate-400 block text-[10px]">ইমেইল:</span>
                <strong className="text-white font-mono">{currentMember.email}</strong>
              </div>
              <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 space-y-1">
                <span className="text-slate-400 block text-[10px]">মোবাইল:</span>
                <strong className="text-white font-mono">{currentMember.phone}</strong>
              </div>
            </div>

            <div className="p-4 bg-black/30 rounded-xl border border-white/5 space-y-1">
              <span className="text-amber-400 font-bold block text-[11px]">পেশাগত পরিচিতি (Bio):</span>
              <p className="text-slate-300 leading-relaxed">{currentMember.bio}</p>
            </div>
          </div>
        )}

        {/* Tab 2: ID Card View */}
        {activeTab === 'card' && (
          <div className="p-6 rounded-2xl bg-black/60 border border-amber-400/40 text-center space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>BPCAB Official Member Card</span>
              <span className="text-emerald-400 font-bold">Expires: {currentMember.expiryDate}</span>
            </div>
            <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden border-2 border-amber-400 p-0.5 bg-black">
              <img src={currentMember.photo} alt={currentMember.name} className="w-full h-full object-cover rounded-xl" />
            </div>
            <h4 className="text-lg font-bold text-white font-['Montserrat']">{currentMember.name}</h4>
            <p className="text-xs text-amber-300 font-semibold">{currentMember.designation}</p>
            <p className="font-mono text-sm text-amber-400 font-bold bg-white/5 py-1 px-3 rounded-lg inline-block border border-amber-400/30">
              {currentMember.memberId}
            </p>
          </div>
        )}

        {/* Tab 3: Payment History */}
        {activeTab === 'payments' && (
          <div className="space-y-3 text-xs">
            {myPayments.length === 0 ? (
              <div className="p-6 text-center text-slate-400 bg-black/30 rounded-xl">
                কোনো পেমেন্ট রেকর্ড এখনও পাওয়া যায়নি।
              </div>
            ) : (
              myPayments.map((p) => (
                <div key={p.id} className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex justify-between items-center">
                  <div>
                    <strong className="text-white block font-bold text-sm">৳{p.amount} ({p.type})</strong>
                    <span className="text-slate-400">{p.method} · TrxID: <code className="text-amber-400">{p.trxId}</code></span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    VERIFIED
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
          >
            বন্ধ করুন (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
