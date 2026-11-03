import React from 'react';
import {
  Award,
  BookOpen,
  Target,
  Sparkles,
  Users,
  CheckCircle2,
  Quote,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { Language } from '../types';

interface AboutViewProps {
  lang: Language;
}

export const AboutView: React.FC<AboutViewProps> = ({ lang }) => {
  const leaders = [
    {
      name: 'Chef Kazi Anowar Hossain',
      nameBn: 'শেফ কাজী আনোয়ার হোসেন',
      role: 'President, BPCAB',
      roleBn: 'সভাপতি, বিপিসিএবি',
      workplace: 'Executive Pastry Chef, InterContinental Dhaka',
      workplaceBn: 'এক্সিকিউটিভ প্যাস্ট্রি শেফ, ইন্টারকন্টিনেন্টাল ঢাকা',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&auto=format&fit=crop&q=80',
      message: 'Our sacred mission is to raise Bangladeshi pastry arts, viennoiserie, and sourdough baking to international Michelin-level benchmarks while empowering grassroots home baking pioneers.',
      messageBn: 'আমাদের মূল ব্রত হলো বাংলাদেশের প্যাস্ট্রি, ভিয়েনোয়াজরি ও বেকিং শিল্পকে আন্তর্জাতিক মানে উন্নীত করা এবং প্রান্তিক নারী ও তরুণ বেকিং উদ্যোক্তাদের পেশাগত মর্যাদা নিশ্চিত করা।',
    },
    {
      name: 'Chef Tariqul Islam',
      nameBn: 'শেফ তারিকুল ইসলাম',
      role: 'General Secretary, BPCAB',
      roleBn: 'সাধারণ সম্পাদক, বিপিসিএবি',
      workplace: 'Master Baker, The Westin Dhaka',
      workplaceBn: 'মাস্টার বেকার, দ্য ওয়েস্টিন ঢাকা',
      image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=600&auto=format&fit=crop&q=80',
      message: 'By partnering with the National Skills Development Authority (NSDA), we are standardizing vocational credentials and opening global high-paying career pathways for our members.',
      messageBn: 'জাতীয় দক্ষতা উন্নয়ন কর্তৃপক্ষের (NSDA) সাথে অংশীদারিত্বের মাধ্যমে আমরা কারিগরি সার্টিফিকেশন আন্তর্জাতিকীকরণ করেছি, যা আমাদের সদস্যদের বিশ্বমানের চাকরির দ্বার খুলে দিয়েছে।',
    },
    {
      name: 'Chef Nusrat Jahan',
      nameBn: 'শেফ নুসরাত জাহান',
      role: 'Vice President (Sugar Art & Community)',
      roleBn: 'সহ-সভাপতি (সুগার আর্ট ও কমিউনিটি)',
      workplace: 'Founder, Sugar Bloom Studio Banani',
      workplaceBn: 'প্রতিষ্ঠাতা, সুগার ব্লুম স্টুডিও বনানী',
      image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=600&auto=format&fit=crop&q=80',
      message: 'We champion women entrepreneurs and home cake decorators with structured business masterclasses, hygienic packaging, and tier cake engineering.',
      messageBn: 'আমরা নারী উদ্যোক্তা ও হোম বেকারদের ব্যবসায়িক প্রবৃদ্ধি, স্বাস্থ্যসম্মত প্যাকেজিং এবং নান্দনিক কেক ডেকোরেশন প্রশিক্ষণে নিরবচ্ছিন্ন সহায়তা দিচ্ছি।',
    },
    {
      name: 'Chef Aminul Islam Chowdhury',
      nameBn: 'শেফ আমিনুল ইসলাম চৌধুরী',
      role: 'Treasurer & Head of Chocolate Guild',
      roleBn: 'কোষাধ্যক্ষ ও প্রধান, চকলেট একাডেমি',
      workplace: 'Pastry Sous Chef, Radisson Blu Chattogram',
      workplaceBn: 'প্যাস্ট্রি সু শেফ, রেডিসন ব্লু চট্টগ্রাম',
      image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=600&auto=format&fit=crop&q=80',
      message: 'Ensuring absolute transparent governance, member welfare funds, and advanced laboratory equipment access for all regional chapters.',
      messageBn: 'সংগঠনের আর্থিক স্বচ্ছতা, সদস্যদের কল্যাণ তহবিল এবং বিভাগীয় পর্যায়ে আধুনিক ল্যাব সুবিধা নিশ্চিত করাই আমাদের প্রতিশ্রুতি।',
    },
  ];

  const objectives = [
    {
      title: 'Government NSDA Skill Standardization',
      titleBn: 'সরকারি এনএসডিএ (NSDA) দক্ষতা মানদণ্ড',
      desc: 'Formulating national competency benchmarks from Level 1 to Level 4 for pastry, bakery and cake sculpting.',
      descBn: 'প্যাস্ট্রি ও বেকিং পেশায় জাতীয় দক্ষতা মানদণ্ড লেভেল ১ থেকে ৪ প্রণয়ন ও মূল্যায়ন ব্যবস্থা।',
    },
    {
      title: 'Global Career & Work Visa Mobility',
      titleBn: 'আন্তর্জাতিক ক্যারিয়ার ও ভিসা সুবিধা',
      desc: 'Facilitating authenticated chef credentials for overseas employment in Saudi Arabia, UAE, Qatar, and Europe.',
      descBn: 'মধ্যপ্রাচ্য ও ইউরোপের দেশগুলোতে দক্ষ শেফ ভিসার জন্য ভেরিফাইড সনদ ও সুপারিশপত্র প্রদান।',
    },
    {
      title: 'Authentic Hands-on Masterclasses',
      titleBn: 'আন্তর্জাতিক মানের নিবিড় মাস্টারক্লাস',
      desc: 'Regular practical workshops led by visiting European pastry masters and Bangladesh five-star hotel chefs.',
      descBn: 'দেশি ও বিদেশি শীর্ষ মাস্টার শেফদের অধীনে ফ্রেঞ্চ প্যাস্ট্রি ও সাওয়ারডো কর্মশালা।',
    },
    {
      title: 'Food Safety & Halal Hygienic Standards',
      titleBn: 'খাদ্য নিরাপত্তা ও হালাল হাইজিন মান',
      desc: 'Enforcing HACCP compliance, food-grade packaging, and lab testing for raw bakery ingredients.',
      descBn: 'এইচএসিসিপি (HACCP) খাদ্য নিরাপত্তা ও খাঁটি হালাল উপাদানের নিশ্চয়তা বিধান।',
    },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171b26] via-[#12151e] to-[#0c0e14] border border-amber-400/30 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
            <Award className="w-4 h-4" />
            <span>ESTABLISHED 2019 · DHAKA, BANGLADESH</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
            {lang === 'bn' ? (
              <>
                আমাদের সম্পর্কে: <span className="text-amber-400">বিপিসিএবি-র ইতিহাস ও লক্ষ্য</span>
              </>
            ) : (
              <>
                About BPCAB: <span className="text-amber-400">National Guild History &amp; Mission</span>
              </>
            )}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {lang === 'bn'
              ? '২০১৯ সালে প্রতিষ্ঠিত Bakery & Pastry Chefs Assembly Of Bangladesh (BPCAB) হলো বাংলাদেশের পেশাদার প্যাস্ট্রি শেফ, কারিগর সাওয়ারডো বেকার এবং কেক আর্টিস্টদের একমাত্র জাতীয় প্রতিনিধিত্বশীল সংগঠন।'
              : 'Established in 2019, BPCAB is the apex national association uniting executive five-star pastry chefs, artisanal bakers, and cake entrepreneurs across Bangladesh.'}
          </p>
        </div>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#131620] border border-amber-400/30 rounded-3xl p-8 shadow-xl space-y-4 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/15 text-amber-400 flex items-center justify-center border border-amber-400/30">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-white font-['Montserrat']">
            {lang === 'bn' ? 'আমাদের ভিশন (Our Vision)' : 'Our Vision'}
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            {lang === 'bn'
              ? 'বাংলাদেশের বেকারি ও প্যাস্ট্রি শিল্পকে বিশ্বদরবারে মর্যাদাপূর্ণ স্থানে প্রতিষ্ঠিত করা, যাতে আমাদের দেশের শেফরা বৈশ্বিক প্রতিযোগিতায় অংশ নিয়ে দেশের মুখ উজ্জ্বল করতে পারেন।'
              : 'To establish Bangladesh as a globally recognized culinary hub of pastry excellence, where Bangladeshi artisanal bakers and cake sculptors stand shoulder-to-shoulder with international masters.'}
          </p>
        </div>

        <div className="bg-[#131620] border border-amber-400/30 rounded-3xl p-8 shadow-xl space-y-4 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/15 text-amber-400 flex items-center justify-center border border-amber-400/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-white font-['Montserrat']">
            {lang === 'bn' ? 'আমাদের মিশন (Our Mission)' : 'Our Mission'}
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            {lang === 'bn'
              ? 'পেশাগত সার্টিফিকেশন, কারিগরি কর্মশালা, খাদ্য নিরাপত্তা ও সরকারি স্বীকৃতির মাধ্যমে প্রতিটি শেফের কর্মসংস্থান ও আত্মমর্যাদা সুদৃঢ় করা।'
              : 'To elevate professional standards through accredited NSDA curriculum benchmarks, foster ethical culinary trade practices, and empower every baker with digital credentials.'}
          </p>
        </div>
      </div>

      {/* Association Objectives */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat']">
            {lang === 'bn' ? 'বিপিসিএবি-র ৪টি প্রধান উদ্দেশ্য' : 'Strategic Objectives'}
          </h2>
          <p className="text-xs text-slate-400">
            বাংলাদেশের রন্ধনশিল্পের টেকসই উন্নয়নের জন্য সুনির্দিষ্ট অঙ্গীকার
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {objectives.map((obj, i) => (
            <div
              key={i}
              className="bg-[#131620] border border-white/10 rounded-2xl p-6 space-y-3 shadow-lg hover:border-amber-400/40 transition"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs">
                0{i + 1}
              </div>
              <h4 className="font-extrabold text-white text-sm font-['Montserrat']">
                {lang === 'bn' ? obj.titleBn : obj.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {lang === 'bn' ? obj.descBn : obj.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Executive Committee & Leadership */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat']">
            {lang === 'bn' ? 'নির্বাহী পরিষদ ও নেতৃবৃন্দ' : 'Executive Leadership Committee'}
          </h2>
          <p className="text-xs text-slate-400">
            সংগঠন পরিচালনায় দেশের শীর্ষ পাঁচ তারকা হোটেলের এক্সিকিউটিভ শেফ ও একাডেমিশিয়ানবৃন্দ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leaders.map((leader, i) => (
            <div
              key={i}
              className="bg-[#131620] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row gap-6 items-start"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-400 p-0.5 bg-black shrink-0 shadow-lg mx-auto sm:mx-0">
                <img src={leader.image} alt={leader.name} className="w-full h-full object-cover rounded-xl" />
              </div>

              <div className="space-y-2 text-xs flex-1">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {lang === 'bn' ? leader.roleBn : leader.role}
                </span>
                <h3 className="font-black text-lg text-white font-['Montserrat']">
                  {lang === 'bn' ? leader.nameBn : leader.name}
                </h3>
                <p className="text-amber-300/90 font-semibold">
                  {lang === 'bn' ? leader.workplaceBn : leader.workplace}
                </p>

                <div className="p-3 bg-black/40 rounded-xl border border-white/5 relative mt-3">
                  <Quote className="w-4 h-4 text-amber-400/30 absolute -top-1.5 -left-1.5" />
                  <p className="text-slate-300 italic text-[11px] leading-relaxed">
                    "{lang === 'bn' ? leader.messageBn : leader.message}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
