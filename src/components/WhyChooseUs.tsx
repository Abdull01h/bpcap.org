import React from 'react';
import { DollarSign, Sparkles, FileCheck, Clock3 } from 'lucide-react';
import { Language } from '../types';
import { UI_TEXT } from '../data/translations';

interface WhyChooseUsProps {
  lang: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ lang }) => {
  const t = UI_TEXT[lang];

  const items = [
    {
      icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      title: t.guarantee1Title,
      desc: t.guarantee1Desc,
    },
    {
      icon: <Sparkles className="w-6 h-6 text-sky-600" />,
      bg: 'bg-sky-50',
      border: 'border-sky-100',
      title: t.guarantee2Title,
      desc: t.guarantee2Desc,
    },
    {
      icon: <FileCheck className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      title: t.guarantee3Title,
      desc: t.guarantee3Desc,
    },
    {
      icon: <Clock3 className="w-6 h-6 text-rose-600" />,
      bg: 'bg-rose-50',
      border: 'border-rose-100',
      title: t.guarantee4Title,
      desc: t.guarantee4Desc,
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-['Montserrat']">
            {t.whyUsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl bg-white border ${item.border} shadow-sm hover:shadow-md transition`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4`}
              >
                {item.icon}
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2 font-['Montserrat']">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
