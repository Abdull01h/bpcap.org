import React, { useState } from 'react';
import { BpcabView } from './components/BpcabView';

export default function App() {
  const [lang, setLang] = useState<'bn' | 'en'>('en');

  return (
    <div className="min-h-screen bg-[#0b0d11] text-slate-100 flex flex-col font-['Quicksand',sans-serif]">
      {/* 100% Pure BPCAB Website - Clean Public Interface */}
      <BpcabView
        lang={lang}
        onToggleLang={(l) => setLang(l)}
      />
    </div>
  );
}
