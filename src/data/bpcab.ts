export interface BpcabProgram {
  id: string;
  title: string;
  titleBn: string;
  badge: string;
  badgeBn: string;
  description: string;
  descriptionBn: string;
  image: string;
  duration: string;
  durationBn: string;
  highlights: string[];
  highlightsBn: string[];
}

export interface BpcabEvent {
  id: string;
  title: string;
  titleBn: string;
  date: string;
  dateBn: string;
  location: string;
  locationBn: string;
  type: string;
  image: string;
}

export interface BpcabLeader {
  name: string;
  title: string;
  titleBn: string;
  hotelOrBakery: string;
  image: string;
  bio: string;
  bioBn: string;
}

export const BPCAB_DATA = {
  name: 'BPCAB - Bakery and Pastry Chefs Assembly Of Bangladesh',
  nameBn: 'বেকারি অ্যান্ড প্যাস্ট্রি শেফস অ্যাসেম্বলি অব বাংলাদেশ (বিপিসিএবি)',
  shortName: 'BPCAB',
  established: '2019',
  estText: 'EST. 2019',
  tagline: 'The National Guild of Professional Pastry Chefs & Artisanal Bakers in Bangladesh',
  taglineBn: 'বাংলাদেশের পেশাদার প্যাস্ট্রি শেফ, কেক আর্টিস্ট ও আর্টিসানাল বেকারদের একমাত্র জাতীয় প্ল্যাটফর্ম',
  subtagline:
    'Dedicated to advancing the craft of baking, French patisserie, sugar sculpting, chocolate tempering, and international culinary hygiene standards across Bangladesh.',
  subtaglineBn:
    '২০১৯ সাল থেকে বাংলাদেশের ৫-তারকা হোটেল শেফ, হোম বেকার ও ক্যাফে উদ্যোক্তাদের ঐক্য, পেশাগত দক্ষতা বৃদ্ধি, আন্তর্জাতিক সার্টিফিকেশন ও খাদ্য নিরাপত্তার বিশ্বস্ত সংগঠন।',
  email: 'info@bpcab.org.bd',
  phone: '+880 1711-234567',
  whatsapp: '+8801711234567',
  address: 'Gulshan-2, Dhaka 1212, Bangladesh',
  logoUrl: '/logo.png',

  pillars: [
    {
      title: 'Global Pastry Standards',
      titleBn: 'আন্তর্জাতিক মানদণ্ড',
      desc: 'Promoting authentic French viennoiserie, sourdough fermentation, and European confectionery benchmarks.',
      descBn: 'ফ্রেঞ্চ প্যাস্ট্রি, খাঁটি সাওয়ারডো ফারমেন্টেশন এবং আন্তর্জাতিক রেসিপি ও হাইজিন স্ট্যান্ডার্ড প্রতিষ্ঠা।',
    },
    {
      title: 'Chef Certifications',
      titleBn: 'পেশাগত সার্টিফিকেশন',
      desc: 'Recognizing pastry masters, home bakers, and culinary arts students with accredited credentials.',
      descBn: 'পেশাদার প্যাস্ট্রি শেফ এবং হোম বেকারদের দক্ষতা যাচাইপূর্বক জাতীয় ও আন্তর্জাতিক ক্রেডেনশিয়াল।',
    },
    {
      title: 'Masterclasses & Workshops',
      titleBn: 'হাতে-কলমে মাস্টারক্লাস',
      desc: 'Hands-on intensive courses conducted by renowned national and visiting international master chefs.',
      descBn: 'দেশি ও বিদেশি মাস্টার শেফদের তত্ত্বাবধানে চকলেট, ফন্ড্যান্ট ও ক্রিসেন্ট বেকিং ওয়ার্কশপ।',
    },
    {
      title: 'National Bake Competitions',
      titleBn: 'জাতীয় প্রতিযোগিতা ও এক্সপো',
      desc: 'Annual pastry showcases, live cake sculpting battles, and international pastry cup qualifiers.',
      descBn: 'লাইভ কেক ডেকোরেশন ব্যাটল, জাতীয় বেক এক্সপো এবং আন্তর্জাতিক প্রতিযোগিতার দল গঠন।',
    },
  ],

  programs: [
    {
      id: 'french-patisserie',
      title: 'French Patisserie & Viennoiserie',
      titleBn: 'ফ্রেঞ্চ প্যাস্ট্রি ও বাটার ক্রস্যান্ট আর্ট',
      badge: 'Masterclass',
      badgeBn: 'মাস্টারক্লাস',
      description: 'Lamination techniques, flaky croissants, pain au chocolat, classic eclairs, and delicate fruit tarts.',
      descriptionBn: 'পারফেক্ট লেয়ার্ড বাটার ক্রস্যান্ট, পেইন ও চকোলেট, ক্ল্যাসিক এক্লেয়ার্স ও ফ্রেঞ্চ ফ্রুট টার্ট প্রশিক্ষণ।',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80',
      duration: '3 Days Intensive',
      durationBn: '৩ দিনের হ্যান্ডস-অন',
      highlights: [
        '82% European dry butter lamination',
        'Honeycomb interior crumb structure',
        'Pâte à Choux & glossy mirror glazes',
        'Official BPCAB Certificate of Completion',
      ],
      highlightsBn: [
        'ইউরোপিয়ান ড্রাই বাটার ল্যামিনেশন টেকনিক',
        'হানি-কম্ব ইন্টারিয়র লেয়ারিং সিক্রেট',
        'চকচকে মিরর গ্লেজ ও প্যাস্ট্রি ফিলিং',
        'বিপিসিএবি অফিশিয়াল সনদপত্র',
      ],
    },
    {
      id: 'artisanal-sourdough',
      title: 'Artisanal Sourdough & European Breads',
      titleBn: 'আর্টিসানাল সাওয়ারডো ও ইউরোপিয়ান ব্রেড',
      badge: 'Craft Bread',
      badgeBn: 'ন্যাচারাল বেকিং',
      description: 'Wild yeast sourdough starters, long cold fermentation, baguette shaping, open crumb hydration scoring.',
      descriptionBn: 'ন্যাচারাল ওয়াইল্ড ইস্ট স্টার্টার লালনপালন, কোল্ড ফারমেন্টেশন, ব্যাগেট ও বাটার ব্রিয়োশ মেকিং।',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
      duration: '2 Days Workshop',
      durationBn: '২ দিনের ওয়ার্কশপ',
      highlights: [
        '100-year heirloom starter cultivation',
        'High hydration (80%+) mixing & coil folds',
        'Lame razor scoring & Dutch oven baking',
        'Flour science: protein, ash & enzymes',
      ],
      highlightsBn: [
        'লাইভ সাওয়ারডো স্টার্টার কাল্টিভেশন',
        'হাই হাইড্রেশন ডো মিক্সিং ও কয়েল ফোল্ড',
        'রেজর স্কোরিং ও ক্রিস্পি ক্রাস্ট বেকিং',
        'ফ্লাওয়ার সায়েন্স ও গ্লুটেন ডেভেলপমেন্ট',
      ],
    },
    {
      id: 'wedding-cakes',
      title: 'Tiered Wedding Cakes & Sugar Flowers',
      titleBn: 'রয়্যাল ওয়েডিং কেক ও সুগার ফ্লাওয়ার স্কাল্পটিং',
      badge: 'Cake Artistry',
      badgeBn: 'কেক আর্ট',
      description: 'Internal dowel structural engineering, wafer paper florals, sharp ganache edges, and hand-painted fondant.',
      descriptionBn: 'বহুতল ওয়েডিং কেকের অভ্যন্তরীণ ব্যালান্স স্ট্রাকচার, ওয়েফার পেপার ফ্লাওয়ার ও শার্প গানাশ ফিনিশিং।',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&auto=format&fit=crop&q=80',
      duration: '4 Days Masterclass',
      durationBn: '৪ দিনের মাস্টারক্লাস',
      highlights: [
        'Multi-tier internal support structures',
        'Botanical realism sugar roses & peonies',
        'Silk-smooth ganache scraping method',
        'Moisture & humidity protection techniques',
      ],
      highlightsBn: [
        'বহুতল কেকের মজবুত ইন্টারনাল সাপোর্ট সিস্টেম',
        'হাতে তৈরি বাস্তবসম্মত সুগার রোজ ও পিওনি',
        'শার্প এজ হোয়াইট চকোলেট গানাশ মেথড',
        'আবহাওয়ায় গলে যাওয়া রোধের বিশেষ ফর্মুলা',
      ],
    },
    {
      id: 'chocolatier',
      title: 'Artisanal Chocolates & Bonbon Glazing',
      titleBn: 'চকলেট টেম্পারিং ও হ্যান্ডক্রাফটেড বনবন',
      badge: 'Chocolatier',
      badgeBn: 'চকলেটিয়ার',
      description: 'Precise marble slab seed tempering, airbrushed colored cocoa butter molds, ganache pipings and praline.',
      descriptionBn: 'মার্বেল স্ল্যাবে সঠিক ডিগ্রি টেম্পারিং, রঙিন কোকো বাটার এয়ারব্রাশ মোল্ড ও প্রিমিয়াম ট্রাফেলস।',
      image: 'https://images.unsplash.com/photo-1548907040-4ba428022ab2?w=800&auto=format&fit=crop&q=80',
      duration: '2 Days Workshop',
      durationBn: '২ দিনের ওয়ার্কশপ',
      highlights: [
        'Beta-5 crystal tempering science',
        'High-gloss polycarbonate mold preparation',
        'Exotic fruit purées & caramel fillings',
        'Shelf-life water activity stability',
      ],
      highlightsBn: [
        'বিটা-৫ ক্রিস্টাল চকলেট টেম্পারিং বিজ্ঞান',
        'চকচকে পলিকার্বোনেট মোল্ড এয়ারব্রাশ টেকনিক',
        'আম, প্যাশনফ্রুট ও সল্টেড ক্যারামেল ফিলিং',
        'শেলফ-লাইফ ও সংরক্ষণ প্রশিক্ষণ',
      ],
    },
  ],

  membershipTypes: [
    {
      id: 'professional-chef',
      title: 'Executive & Pastry Chef Member',
      titleBn: 'পেশাদার প্যাস্ট্রি শেফ সদস্যপদ',
      fee: '৳৩,০০০ / বছর',
      target: 'Hotels, Restaurants, Commercial Bakeries',
      targetBn: 'ফাইভ-স্টার হোটেল, রেস্টুরেন্ট ও কমার্শিয়াল বেকারিতে কর্মরত শেফদের জন্য',
      features: [
        'Official BPCAB Chef Lapel Pin & Certified ID Card',
        'Free entry to all National Pastry Expos',
        'Voting rights in BPCAB General Assembly',
        'National culinary delegation representation abroad',
        '50% discount on International Visiting Chef workshops',
      ],
      featuresBn: [
        'অফিশিয়াল বিপিসিএবি মেটাল শেফ পিন ও আইডি কার্ড',
        'জাতীয় বেকারি ও প্যাস্ট্রি এক্সপোতে ভিআইপি এন্ট্রি',
        'সাধারণ সভায় ভোটাধিকার ও নীতি নির্ধারণে অংশগ্রহণ',
        'আন্তর্জাতিক শেফ ডেলিগেশনে বাংলাদেশের প্রতিনিধিত্ব',
        'বিদেশি মাস্টার শেফদের ওয়ার্কশপে ৫০% ফি ডিসকাউন্ট',
      ],
    },
    {
      id: 'home-baker',
      title: 'Home Baker & Pastry Artist',
      titleBn: 'হোম বেকার ও কেক আর্টিস্ট সদস্যপদ',
      fee: '৳২,০০০ / বছর',
      target: 'Home Bakery Entrepreneurs & Cake Decorators',
      targetBn: 'হোম বেকিং উদ্যোক্তা, ফ্রিল্যান্স কেক মেকার ও উদ্যমীদের জন্য',
      features: [
        'Listing in BPCAB Verified Home Baker National Directory',
        'Access to wholesale bakery ingredients & tool suppliers',
        'Food safety, packaging & pricing strategy webinars',
        'Special certificate endorsing kitchen hygiene standards',
        'Exclusive WhatsApp and Mastermind chef community',
      ],
      featuresBn: [
        'বিপিসিএবি ভেরিফাইড জাতীয় ডিরেক্টরিতে নাম তালিকাভুক্তি',
        'পাইকারি মূল্যে কাঁচামাল ও প্রিমিয়াম টুলস সংগ্রহের সুযোগ',
        'ফুড সেফটি, প্যাকেজিং ও প্রাইসিং স্ট্র্যাটেজি ওয়েবিনার',
        'হাইজিন ও কোয়ালিটি এনডোর্সমেন্ট সার্টিফিকেট',
        'শেফ ও অভিজ্ঞ বেকারদের এক্সক্লুসিভ কমিউনিটি সাপোর্ট',
      ],
    },
    {
      id: 'student-apprentice',
      title: 'Student & Culinary Apprentice',
      titleBn: 'শিক্ষার্থী ও শিক্ষানবিস সদস্যপদ',
      fee: '৳১,২০০ / বছর',
      target: 'Culinary Students & Aspiring Bakers',
      targetBn: 'কালিনারি ইনস্টিটিউটের শিক্ষার্থী ও নতুন আগ্রহীদের জন্য',
      features: [
        'Internship placement assistance in leading hotels',
        'Mentorship by executive five-star pastry chefs',
        'Access to BPCAB digital library & pastry formula sheets',
        'Student competition entry and training camps',
      ],
      featuresBn: [
        'শীর্ষস্থানীয় হোটেল ও বেকারিতে ইন্টার্নশিপ সহায়তা',
        'অভিজ্ঞ পাঁচ তারকা শেফদের সরাসরি মেন্টরশিপ',
        'ডিজিটাল রেসিপি ব্যাংক ও প্যাস্ট্রি ফর্মুলা শীট অ্যাক্সেস',
        'বার্ষিক শিক্ষার্থী বেকিং কম্পিটিশন ক্যাম্প',
      ],
    },
  ],

  testimonials: [
    {
      name: 'Chef Tariqul Islam',
      role: 'Executive Pastry Chef',
      organization: '5-Star Luxury Hotel, Dhaka',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80',
      comment:
        'BPCAB has elevated the respect and technical standards of pastry professionals in Bangladesh. Through the assembly, our junior chefs are learning world-class French techniques and participating in international competitions.',
      commentBn:
        'বিপিসিএবি বাংলাদেশে প্যাস্ট্রি শেফদের সম্মান ও কারিগরি মান বহুগুণ বাড়িয়ে দিয়েছে। এই সংগঠনের মাধ্যমে আমাদের তরুণ শেফরা আন্তর্জাতিক মানের ফ্রেঞ্চ টেকনিক শিখছে এবং বিশ্ব দরবারে দেশের মান রাখছে।',
    },
    {
      name: 'Chef Nusrat Jahan',
      role: 'Master Cake Artist & Founder',
      organization: 'Vanilla Bean Patisserie, Gulshan',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&auto=format&fit=crop&q=80',
      comment:
        'As a home baker who transitioned into a boutique studio, BPCAB provided me with certified food hygiene credibility, premium chocolate supplier networks, and incredible camaraderie with top chefs.',
      commentBn:
        'একজন হোম বেকার হিসেবে শুরু করে আজ পূর্ণাঙ্গ স্টুডিও চালাতে পেরেছি বিপিসিএবি-র সহায়তায়। খাদ্য নিরাপত্তা সনদ, কাঁচামালের সঠিক সোর্স এবং সিনিয়র শেফদের আন্তরিক দিকনির্দেশনা পেয়েছি।',
    },
    {
      name: 'Chef S. M. Farhan',
      role: 'Head Artisan Baker',
      organization: 'The Crust Craft Bakery, Banani',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=80',
      comment:
        'BPCAB’s sourdough and viennoiserie workshops have set a benchmark. The exchange of knowledge and scientific bread fermentation techniques across the assembly is unmatched.',
      commentBn:
        'সাওয়ারডো ও ক্রস্যান্ট নিয়ে বিপিসিএবি-র ওয়ার্কশপগুলো ছিল যুগান্তকারী। বেকিং সায়েন্স ও ফারমেন্টেশন নিয়ে বাংলাদেশে এত উঁচু মানের প্রশিক্ষণ এর আগে কখনো হয়নি।',
    },
  ],

  gallery: [
    {
      id: 'g1',
      title: 'Artisan French Croissants',
      titleBn: 'আর্টিসান ফ্রেঞ্চ ক্রস্যান্ট',
      category: 'Viennoiserie',
      categoryBn: 'ভিয়েনোয়া জরি',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'g2',
      title: 'Multitiered Fondant Wedding Cake',
      titleBn: 'রয়্যাল ওয়েডিং ফন্ড্যান্ট কেক',
      category: 'Cake Art',
      categoryBn: 'কেক আর্ট',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'g3',
      title: 'Natural Sourdough Boule',
      titleBn: 'ন্যাচারাল সাওয়ারডো বোল',
      category: 'Artisan Bread',
      categoryBn: 'আর্টিসান ব্রেড',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'g4',
      title: 'Handcrafted Chocolate Bonbons',
      titleBn: 'হ্যান্ডক্রাফটেড চকলেট ট্রাফেলস',
      category: 'Chocolatier',
      categoryBn: 'চকলেটিয়ার',
      image: 'https://images.unsplash.com/photo-1548907040-4ba428022ab2?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'g5',
      title: 'Raspberry Glaze Fruit Tart',
      titleBn: 'ফ্রুট প্যাস্ট্রি টার্ট',
      category: 'Patisserie',
      categoryBn: 'প্যাস্ট্রি',
      image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'g6',
      title: 'National Bake Showcase 2026',
      titleBn: 'জাতীয় বেক প্রদর্শনী ২০২৬',
      category: 'Assembly Event',
      categoryBn: 'অ্যাসেম্বলি ইভেন্ট',
      image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&auto=format&fit=crop&q=80',
    },
  ],

  leaders: [
    {
      name: 'Chef Kazi Mamunur Rashid',
      title: 'President & Founder',
      titleBn: 'সভাপতি ও প্রতিষ্ঠাতা সভাপতি',
      hotelOrBakery: 'BPCAB Executive Committee',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80',
      bio: 'Over 20 years leading 5-star hotel pastry kitchens in Asia and the Middle East, dedicated to empowering Bangladeshi talent.',
      bioBn: 'এশিয়া ও মধ্যপ্রাচ্যের বিলাসবহুল পাঁচতারা হোটেলে ২০ বছরেরও বেশি সময় ধরে পেস্ট্রি শেফ হিসেবে অভিজ্ঞতা এবং বাংলাদেশী শেফদের এগিয়ে নেওয়ার স্বপ্নদ্রষ্টা।',
    },
    {
      name: 'Chef Nahid Akhter',
      title: 'General Secretary',
      titleBn: 'সাধারণ সম্পাদক',
      hotelOrBakery: 'Artisan Pastry Guild Dhaka',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&auto=format&fit=crop&q=80',
      bio: 'Award-winning master cake designer, pioneer in food-grade sugar crafting and culinary education standards.',
      bioBn: 'পুরস্কারপ্রাপ্ত মাস্টার কেক ডিজাইনার এবং নিরাপদ খাদ্য ও স্বাস্থ্যকর বেকিং স্ট্যান্ডার্ড প্রতিষ্ঠার অন্যতম সংগঠক।',
    },
    {
      name: 'Chef Mahfuzur Rahman',
      title: 'Director of Masterclasses',
      titleBn: 'পরিচালক (প্রশিক্ষণ ও আন্তর্জাতিক সম্পর্ক)',
      hotelOrBakery: 'Diplomat Pastry Studio',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=80',
      bio: 'Specialist in French laminated doughs and sourdough biology, trainer for national culinary competitors.',
      bioBn: 'ফ্রেঞ্চ ক্রস্যান্ট ও সাওয়ারডো ফারমেন্টেশন বিশেষজ্ঞ এবং আন্তর্জাতিক প্রতিযোগিতায় বাংলাদেশ দলের প্রধান কোচ।',
    },
  ],
};
