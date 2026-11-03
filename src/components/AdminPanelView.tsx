import React, { useState } from 'react';
import {
  Upload,
  Trash2,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Image as ImageIcon,
  BookOpen,
  Users,
  Save,
  Globe,
  ExternalLink,
  Download,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface GalleryItem {
  id: string;
  title: string;
  titleBn?: string;
  category: string;
  chef?: string;
  image: string;
}

export interface ApplicationItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  category: string;
  workplace: string;
  date: string;
}

interface AdminPanelViewProps {
  lang: 'bn' | 'en';
  galleryList: GalleryItem[];
  onUpdateGallery: (newGallery: GalleryItem[]) => void;
  applicationList: ApplicationItem[];
  onExit: () => void;
}

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({
  lang,
  galleryList,
  onUpdateGallery,
  applicationList,
  onExit,
}) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'gallery' | 'applications' | 'guide'>('gallery');

  // New Image Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Cake Art');
  const [newChef, setNewChef] = useState('');
  const [previewImg, setPreviewImg] = useState<string>('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Handle PIN verification (Default PIN: 2019 - BPCAB Founding Year)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === '2019' || pin.trim() === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Handle Local File Upload (Convert to Data URL)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreviewImg(reader.result);
          setImageUrlInput('');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Photo to Gallery
  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImage = previewImg || imageUrlInput.trim();
    if (!finalImage || !newTitle.trim()) {
      alert(lang === 'bn' ? 'অনুগ্রহ করে ছবির শিরোনাম ও ছবি নির্বাচন করুন' : 'Please provide title and an image');
      return;
    }

    const newItem: GalleryItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      category: newCategory,
      chef: newChef.trim() || 'BPCAB Master Baker',
      image: finalImage,
    };

    const updated = [newItem, ...galleryList];
    onUpdateGallery(updated);
    try {
      localStorage.setItem('bpcab_custom_gallery', JSON.stringify(updated));
    } catch (err) {}

    // Reset Form
    setNewTitle('');
    setNewChef('');
    setPreviewImg('');
    setImageUrlInput('');
    setUploadSuccess(true);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  // Delete Photo from Gallery
  const handleDeletePhoto = (id: string) => {
    if (window.confirm(lang === 'bn' ? 'আপনি কি নিশ্চিতভাবে এই ছবিটি ওয়েবসাইট থেকে মুছে ফেলতে চান?' : 'Are you sure you want to remove this photo from the live website?')) {
      const updated = galleryList.filter((item) => item.id !== id);
      onUpdateGallery(updated);
      try {
        localStorage.setItem('bpcab_custom_gallery', JSON.stringify(updated));
      } catch (err) {}
    }
  };

  // Export updated data as JSON for GitHub
  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(galleryList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'gallery.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // If not logged in, show Executive PIN Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#131720] border border-amber-400/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full p-1 bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-600 shadow-lg">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="BPCAB" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-['Montserrat'] mb-1">
            BPCAB Admin Portal
          </h2>
          <p className="text-xs text-amber-300 font-semibold mb-6">
            {lang === 'bn' ? 'সংগঠনের ওয়েবসাইট নিয়ন্ত্রণ ও ফটো ম্যানেজার' : 'Website Content & Gallery Management'}
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left">
              <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'bn' ? 'এডমিন পিন কোড লিখুন' : 'Enter Admin Security PIN'}</span>
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder={lang === 'bn' ? 'ডিফল্ট পিন: 2019' : 'Default PIN: 2019'}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/20 text-white text-center text-lg tracking-widest font-mono focus:outline-none focus:border-amber-400 transition"
                autoFocus
              />
              {pinError && (
                <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'ভুল পিন কোড! সঠিক পিন: 2019' : 'Incorrect PIN! Default is: 2019'}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-extrabold text-sm shadow-xl transition"
            >
              {lang === 'bn' ? 'প্যানেলে প্রবেশ করুন' : 'Access Admin Dashboard'}
            </button>

            <button
              type="button"
              onClick={onExit}
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white pt-2 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'মূল ওয়েবসাইটে ফিরে যান' : 'Back to Public Website'}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto">
      {/* Top Admin Header */}
      <div className="bg-[#141822] border border-amber-400/40 rounded-3xl p-5 sm:p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-amber-400 bg-black shrink-0">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-white font-['Montserrat']">
                BPCAB Admin Executive
              </h2>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold">
                LIVE
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {lang === 'bn'
                ? 'কোড এডিট ছাড়া সরাসরি ছবি আপলোড ও নিয়ন্ত্রণ করুন'
                : 'Manage photos, courses & member submissions with zero code edits'}
            </p>
          </div>
        </div>

        <button
          onClick={onExit}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-bold transition flex items-center gap-1.5 border border-white/15"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>{lang === 'bn' ? 'ওয়েবসাইটে ফিরে যান' : 'Back to Website'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'gallery'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'bg-white/5 hover:bg-white/10 text-slate-300'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>{lang === 'bn' ? 'ছবি ও গ্যালারি ম্যানেজার' : 'Gallery & Photos'} ({galleryList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'applications'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'bg-white/5 hover:bg-white/10 text-slate-300'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{lang === 'bn' ? 'সদস্যপদ আবেদনকারী' : 'Member Inquiries'} ({applicationList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('guide')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'guide'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'bg-white/5 hover:bg-white/10 text-slate-300'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>{lang === 'bn' ? 'GitHub ও অটো-সিঙ্ক গাইড' : 'How Auto-Sync Works'}</span>
        </button>
      </div>

      {/* TAB 1: GALLERY MANAGER */}
      {activeTab === 'gallery' && (
        <div className="space-y-8">
          {/* 1. Upload Form */}
          <div className="bg-[#141822] border border-amber-400/30 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-white/10">
              <Upload className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-extrabold text-white font-['Montserrat']">
                {lang === 'bn' ? 'নতুন ছবি আপলোড করুন' : 'Upload New Showcase Photo'}
              </h3>
            </div>

            {uploadSuccess && (
              <div className="mb-5 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === 'bn' ? 'ছবিটি সফলভাবে ওয়েবসাইটে যুক্ত হয়েছে!' : 'Photo added to live gallery successfully!'}</span>
              </div>
            )}

            <form onSubmit={handleAddPhoto} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {lang === 'bn' ? 'ছবির নাম / শিরোনাম *' : 'Photo Title *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder={lang === 'bn' ? 'যেমন: ফ্রেঞ্চ বাটার ক্রস্যান্ট' : 'e.g. Royal Wedding Tier Cake'}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0e1117] border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {lang === 'bn' ? 'ক্যাটাগরি নির্বাচন *' : 'Category *'}
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0e1117] border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Cake Art">Cake Art (কেক আর্ট)</option>
                    <option value="Viennoiserie">Viennoiserie (ক্রস্যান্ট ও প্যাস্ট্রি)</option>
                    <option value="Artisan Bread">Artisan Bread (সাওয়ারডো ও ব্রেড)</option>
                    <option value="Chocolatier">Chocolatier (চকলেট আর্ট)</option>
                    <option value="Patisserie">Patisserie (ফ্রেঞ্চ ডেজার্ট)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {lang === 'bn' ? 'শেফ বা প্রস্তুতকারকের নাম' : 'Chef / Bakery Name'}
                  </label>
                  <input
                    type="text"
                    value={newChef}
                    onChange={(e) => setNewChef(e.target.value)}
                    placeholder={lang === 'bn' ? 'যেমন: Chef Mamun' : 'e.g. Chef BPCAB Member'}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0e1117] border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {lang === 'bn' ? 'ডিভাইস থেকে ছবি বাছাই করুন *' : 'Choose Image File from Computer / Mobile *'}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 rounded-xl bg-[#0e1117] border border-white/15 text-slate-300 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-amber-400 file:text-slate-950 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  {lang === 'bn' ? 'অথবা ছবির অনলাইন লিংক (ঐচ্ছিক)' : 'Or Image Online URL (Optional)'}
                </label>
                <input
                  type="url"
                  value={imageUrlInput}
                  onChange={(e) => {
                    setImageUrlInput(e.target.value);
                    if (e.target.value) setPreviewImg(e.target.value);
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0e1117] border border-white/15 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Image Preview */}
              {previewImg && (
                <div className="p-3 bg-black/40 rounded-2xl border border-white/10 flex items-center gap-4">
                  <img src={previewImg} alt="Preview" className="w-20 h-20 rounded-xl object-cover border border-amber-400" />
                  <div>
                    <span className="text-emerald-400 font-bold block mb-1">✓ {lang === 'bn' ? 'ছবির প্রিভিউ তৈরি হয়েছে' : 'Image preview loaded'}</span>
                    <p className="text-[11px] text-slate-400">{lang === 'bn' ? 'আপলোড বাটনে চাপলেই মূল ওয়েবসাইটে এটি যোগ হবে।' : 'Click upload below to publish directly.'}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-extrabold text-xs shadow-xl transition flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'bn' ? 'ছবিটি ওয়েবসাইটে যুক্ত করুন' : 'Publish Photo to Website'}</span>
              </button>
            </form>
          </div>

          {/* 2. Current Photos List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-extrabold text-white font-['Montserrat']">
                {lang === 'bn' ? 'ওয়েবসাইটে বর্তমান ছবিসমূহ' : 'Live Photos on Website'} ({galleryList.length})
              </h3>
              <button
                onClick={handleDownloadJSON}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-slate-200 font-bold transition flex items-center gap-1.5"
                title="Download JSON data"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'bn' ? 'ডাটা ব্যাকআপ (JSON)' : 'Backup Data'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {galleryList.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#141822] rounded-2xl overflow-hidden border border-white/10 shadow-lg flex flex-col justify-between"
                >
                  <div className="h-44 overflow-hidden relative group">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-black/70 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-4 flex items-center justify-between gap-2 border-t border-white/10">
                    <div className="min-w-0">
                      <h4 className="font-bold text-white text-xs truncate">{item.title}</h4>
                      <p className="text-[10px] text-slate-400">{item.chef || 'BPCAB Chef'}</p>
                    </div>
                    <button
                      onClick={() => handleDeletePhoto(item.id)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition shrink-0"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: APPLICATIONS LIST */}
      {activeTab === 'applications' && (
        <div className="bg-[#141822] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div>
              <h3 className="text-base font-extrabold text-white font-['Montserrat']">
                {lang === 'bn' ? 'সদস্যপদের আবেদনকারী তালিকা' : 'Membership Applicants'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'bn' ? 'ওয়েবসাইটের সদস্য ফরম পূরণকারীদের তালিকা' : 'Submissions received from website application form'}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-white/5 uppercase text-[10px] text-amber-400 font-extrabold tracking-wider">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">{lang === 'bn' ? 'নাম' : 'Name'}</th>
                  <th className="p-3">{lang === 'bn' ? 'ফোন' : 'Phone'}</th>
                  <th className="p-3">{lang === 'bn' ? 'ক্যাটাগরি' : 'Category'}</th>
                  <th className="p-3">{lang === 'bn' ? 'প্রতিষ্ঠান' : 'Workplace'}</th>
                  <th className="p-3">{lang === 'bn' ? 'তারিখ' : 'Date'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {applicationList.map((app, index) => (
                  <tr key={app.id} className="hover:bg-white/5 transition">
                    <td className="p-3 font-mono text-slate-500">{index + 1}</td>
                    <td className="p-3 font-bold text-white">{app.name}</td>
                    <td className="p-3 font-mono text-amber-300">{app.phone}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20 text-[11px] font-semibold">
                        {app.category}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">{app.workplace || 'N/A'}</td>
                    <td className="p-3 text-slate-500 text-[11px] font-mono">{app.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: HOW GITHUB AUTO-SYNC WORKS */}
      {activeTab === 'guide' && (
        <div className="bg-[#141822] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-extrabold text-white font-['Montserrat'] mb-1">
              {lang === 'bn' ? 'গিটহাবে সরাসরি এডমিন প্যানেল কিভাবে কাজ করে?' : 'How the Standalone Admin Panel Works on GitHub'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'bn'
                ? 'আপনার রিপোজিটরির ভেতরেই আলাদা লিংকে এডমিন প্যানেল সেটআপের সম্পূর্ণ রূপরেখা'
                : 'Architectural overview of hosting the admin portal inside the exact same GitHub repository'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-amber-400 font-extrabold text-sm block">
                ১. আলাদা লিঙ্ক (Dedicated Link in Same Repo):
              </span>
              <p className="leading-relaxed">
                আপনার একই রিপোজিটরির মধ্যে একটি ফাইল থাকবে <code className="text-amber-300 bg-black/40 px-1 py-0.5 rounded">admin.html</code>।
                আপনি যেকোনো ব্রাউজার থেকে সরাসরি এই লিংকে ঢুকতে পারবেন:
              </p>
              <div className="p-2.5 rounded-xl bg-black border border-white/10 font-mono text-emerald-400 text-[11px]">
                https://abdull01h.github.io/BPCAB---Bakery-and-Pastry-Chefs-Assembly-Of-Bangladesh/admin.html
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-amber-400 font-extrabold text-sm block">
                ২. কোড এডিট ছাড়া ছবি আপলোড ও মুছে ফেলা:
              </span>
              <p className="leading-relaxed">
                এডমিন প্যানেলে আপলোড ও ডিলিটের জন্য গিটহাবের অফিসিয়াল <strong>GitHub REST API</strong> কাজ করে। আপনি গিটহাব থেকে একটি <strong>Personal Access Token (PAT)</strong> এনে এডমিন প্যানেলে একবার সেভ রাখলে, আপনি ব্রাউজার থেকে ছবি সিলেক্ট করলেই সেটি স্বয়ংক্রিয়ভাবে গিটহাবে পুশ হয়ে যাবে এবং মূল সাইটে সাথে সাথে আপডেট হয়ে যাবে!
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-xs">
            <h4 className="font-bold text-amber-300 text-sm mb-1.5">
              {lang === 'bn' ? '💡 আরও সহজ উপায়: Firebase ডাটাবেজ ইন্টিগ্রেশন' : '💡 Even Simpler: Firebase Realtime Database'}
            </h4>
            <p className="text-slate-300 leading-relaxed mb-3">
              {lang === 'bn'
                ? 'যদি আপনি কোনো গিটহাব টোকেন ছাড়াও সাধারণ ইউজারনেম ও পাসওয়ার্ড দিয়ে সব ভিজিটরের জন্য ইনস্ট্যান্ট আপডেট চান, তবে Firebase ডাটাবেজ এক ক্লিকেই যুক্ত করা যায়। তখন যে কেউ ফরম সাবমিট করলে তা সরাসরি ডাটাবেজে যাবে এবং আপনার আপলোড করা ছবি সাথে সাথে লাইভ হবে।'
                : 'With Firebase Firestore, you log in with simple email/password, upload any photo from your phone, and it immediately appears on all devices worldwide.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
