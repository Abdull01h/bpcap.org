import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface FloatingWhatsAppProps {
  phone?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phone = '8801711234567',
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="bg-[#141924] border border-emerald-500/40 p-3 rounded-2xl shadow-2xl text-xs text-white max-w-xs animate-in slide-in-from-right-4 duration-200">
          <div className="flex items-center justify-between pb-1 border-b border-white/10 mb-1">
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              BPCAB হেল্পলাইন
            </span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-slate-300">
            যেকোনো প্রশ্ন বা সদস্যপদ সহায়তার জন্য সরাসরি সচিবালয়ে হোয়াটসঅ্যাপ করুন।
          </p>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={`https://wa.me/${phone}?text=Hello%20BPCAB%20Secretariat%2C%20I%20need%20information%20regarding%20membership`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/40 border-2 border-white/80 transition-all duration-300 hover:scale-110 group cursor-pointer"
        title="Chat on WhatsApp with BPCAB"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white transition-transform group-hover:scale-110" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-slate-950 animate-pulse" />
      </a>
    </div>
  );
};
