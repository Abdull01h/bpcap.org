import React, { useState } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  Award,
  Clock,
  Phone,
  Mail,
  X,
  ExternalLink,
  CreditCard,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { MemberProfile, Language } from '../types';

interface ChefDirectoryViewProps {
  members: MemberProfile[];
  lang: Language;
  onSelectMemberForIdCard?: (member: MemberProfile) => void;
}

export const ChefDirectoryView: React.FC<ChefDirectoryViewProps> = ({
  members,
  lang,
  onSelectMemberForIdCard,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('all');
  const [selectedExp, setSelectedExp] = useState('all');
  const [selectedMember, setSelectedMember] = useState<MemberProfile | null>(null);

  const specialities = [
    { id: 'all', label: 'All Specialities', labelBn: 'সকল দক্ষতা' },
    { id: 'pastry', label: 'French Pastry', labelBn: 'ফ্রেঞ্চ প্যাস্ট্রি' },
    { id: 'cake', label: 'Fondant & Cake Art', labelBn: 'ফন্ড্যান্ট ও কেক আর্ট' },
    { id: 'sourdough', label: 'Sourdough & Bread', labelBn: 'সাওয়ারডো ও ব্রেড' },
    { id: 'chocolate', label: 'Chocolate & Pralines', labelBn: 'চকলেট ও প্রালিন' },
    { id: 'dessert', label: 'Plated Desserts', labelBn: 'প্লেটেড ডেজার্ট' },
  ];

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.nameBn.includes(searchTerm) ||
      member.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.workplace.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.speciality.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpeciality =
      selectedSpeciality === 'all' ||
      (selectedSpeciality === 'pastry' && member.speciality.toLowerCase().includes('pastry')) ||
      (selectedSpeciality === 'cake' && (member.speciality.toLowerCase().includes('cake') || member.speciality.toLowerCase().includes('fondant'))) ||
      (selectedSpeciality === 'sourdough' && (member.speciality.toLowerCase().includes('sourdough') || member.speciality.toLowerCase().includes('bread'))) ||
      (selectedSpeciality === 'chocolate' && member.speciality.toLowerCase().includes('chocolate')) ||
      (selectedSpeciality === 'dessert' && member.speciality.toLowerCase().includes('dessert'));

    const expNum = parseInt(member.experience) || 0;
    const matchesExp =
      selectedExp === 'all' ||
      (selectedExp === '5' && expNum >= 5) ||
      (selectedExp === '10' && expNum >= 10) ||
      (selectedExp === '15' && expNum >= 15);

    return matchesSearch && matchesSpeciality && matchesExp;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171b26] via-[#12151e] to-[#0c0e14] border border-amber-400/30 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
            <Award className="w-4 h-4" />
            <span>{lang === 'bn' ? 'অফিসিয়াল শেফ ডিরেক্টরি' : 'Official Chef Directory'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
            {lang === 'bn' ? (
              <>
                বাংলাদেশের নিবন্ধিত <span className="text-amber-400">মাস্টার শেফ ও বেকার</span> তালিকা
              </>
            ) : (
              <>
                Registered Master Pastry Chefs &amp; <span className="text-amber-400">Bakers Guild</span>
              </>
            )}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {lang === 'bn'
              ? 'বিপিসিএবি-র নিবন্ধিত পাঁচ তারকা হোটেলের এক্সিকিউটিভ শেফ, কারিগর সাওয়ারডো বেকার এবং স্বনামধন্য কেক আর্টিস্টদের প্রোফাইল যাচাই করুন।'
              : 'Browse authenticated profiles of verified executive pastry chefs, artisan bread bakers, and award-winning sugar sculptors across Bangladesh.'}
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#12151d] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                lang === 'bn'
                  ? 'শেফের নাম, আইডি, কর্মস্থল বা দক্ষতা দিয়ে খুঁজুন...'
                  : 'Search by chef name, ID, hotel, or skill...'
              }
              className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 font-medium"
            />
          </div>

          {/* Experience Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-slate-400 shrink-0 font-bold">
              {lang === 'bn' ? 'অভিজ্ঞতা:' : 'Experience:'}
            </span>
            <select
              value={selectedExp}
              onChange={(e) => setSelectedExp(e.target.value)}
              className="px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-400 font-semibold"
            >
              <option value="all">{lang === 'bn' ? 'সকল অভিজ্ঞতা' : 'Any Experience'}</option>
              <option value="5">5+ Years</option>
              <option value="10">10+ Years</option>
              <option value="15">15+ Years (Master)</option>
            </select>
          </div>
        </div>

        {/* Speciality Segmented Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/10">
          {specialities.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSpeciality(s.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                selectedSpeciality === s.id
                  ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              <span>{lang === 'bn' ? s.labelBn : s.label}</span>
            </button>
          ))}
          <span className="ml-auto text-xs text-slate-400 font-semibold">
            {lang === 'bn' ? `মোট ${filteredMembers.length} জন শেফ` : `${filteredMembers.length} Chefs Found`}
          </span>
        </div>
      </div>

      {/* Chef Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="group bg-[#13161f] border border-white/10 hover:border-amber-400/50 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between"
          >
            <div>
              {/* Top Row: Photo & ID */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-400 p-0.5 bg-black shadow-lg">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full border border-black shadow">
                    VERIFIED
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/30 block">
                    {member.memberId}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1 block flex items-center justify-end gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{lang === 'bn' ? member.experienceBn : member.experience}</span>
                  </span>
                </div>
              </div>

              {/* Names & Designations */}
              <h3 className="font-black text-lg text-white font-['Montserrat'] group-hover:text-amber-300 transition-colors">
                {lang === 'bn' ? member.nameBn : member.name}
              </h3>
              <p className="text-xs text-amber-300/90 font-semibold mb-2">
                {lang === 'bn' ? member.designationBn : member.designation}
              </p>

              {/* Speciality and Workplace */}
              <div className="space-y-1.5 text-xs text-slate-300 my-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-medium line-clamp-1">
                    {lang === 'bn' ? member.specialityBn : member.speciality}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-slate-300 font-semibold line-clamp-1">
                    {lang === 'bn' ? member.workplaceBn : member.workplace}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{member.location}</span>
                </div>
              </div>

              {/* Signature items preview */}
              <div className="flex flex-wrap gap-1 mt-3">
                {member.signatureDishes.slice(0, 2).map((dish, i) => (
                  <span
                    key={i}
                    className="text-[10px] text-slate-400 bg-black/40 px-2 py-0.5 rounded-md border border-white/5"
                  >
                    • {dish}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedMember(member)}
                className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>{lang === 'bn' ? 'প্রোফাইল' : 'View Profile'}</span>
              </button>

              <button
                onClick={() => {
                  if (onSelectMemberForIdCard) {
                    onSelectMemberForIdCard(member);
                  } else {
                    setSelectedMember(member);
                  }
                }}
                className="py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs transition flex items-center justify-center gap-1 shadow cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'আইডি কার্ড' : 'Digital ID'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Chef Profile Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141824] border border-amber-400/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-400 p-0.5 bg-black shadow-xl shrink-0">
                  <img
                    src={selectedMember.photo}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-xl text-white font-['Montserrat']">
                      {lang === 'bn' ? selectedMember.nameBn : selectedMember.name}
                    </h3>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-amber-300 font-bold mt-0.5">
                    {lang === 'bn' ? selectedMember.designationBn : selectedMember.designation}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {lang === 'bn' ? selectedMember.workplaceBn : selectedMember.workplace} ·{' '}
                    <span className="font-mono text-amber-400 font-bold">{selectedMember.memberId}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chef Bio */}
            <div>
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
                {lang === 'bn' ? 'পেশাগত জীবনী ও অভিজ্ঞতা' : 'Professional Biography'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-black/30 p-4 rounded-2xl border border-white/5">
                {lang === 'bn' ? selectedMember.bioBn : selectedMember.bio}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-black/40 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px]">Speciality:</span>
                <strong className="text-white block mt-0.5">
                  {lang === 'bn' ? selectedMember.specialityBn : selectedMember.speciality}
                </strong>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px]">Experience:</span>
                <strong className="text-amber-400 block mt-0.5">
                  {lang === 'bn' ? selectedMember.experienceBn : selectedMember.experience}
                </strong>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px]">Valid Until:</span>
                <strong className="text-emerald-400 block mt-0.5">{selectedMember.expiryDate}</strong>
              </div>
            </div>

            {/* Signature Creations */}
            <div>
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                {lang === 'bn' ? 'সিগনেচার ক্রিয়েশনস ও পারদর্শিতা' : 'Signature Masterpieces'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedMember.signatureDishes.map((dish, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/20 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{dish}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Contact Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs">
                <a
                  href={`tel:${selectedMember.phone}`}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center gap-1.5 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{selectedMember.phone}</span>
                </a>
                <a
                  href={`mailto:${selectedMember.email}`}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center gap-1.5 transition"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>{selectedMember.email}</span>
                </a>
              </div>

              <button
                onClick={() => {
                  if (onSelectMemberForIdCard) {
                    onSelectMemberForIdCard(selectedMember);
                    setSelectedMember(null);
                  }
                }}
                className="px-5 py-2.5 rounded-xl gold-gradient text-slate-950 font-black text-xs shadow-lg hover:brightness-110 transition flex items-center gap-1.5 cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'ডিজিটাল আইডি কার্ড ডাউনলোড' : 'Download Digital ID'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
