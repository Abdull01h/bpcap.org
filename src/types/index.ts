export type BpcabPage =
  | 'home'
  | 'about'
  | 'membership'
  | 'directory'
  | 'jobs'
  | 'learning'
  | 'community'
  | 'events'
  | 'news'
  | 'contact';

export type Language = 'bn' | 'en';
export type Theme = 'dark' | 'light';

export type AdminRole =
  | 'Super Admin'
  | 'Admin'
  | 'Membership Manager'
  | 'Job Manager'
  | 'Content Manager'
  | 'Moderator';

export interface MemberProfile {
  id: string;
  memberId: string;
  name: string;
  nameBn: string;
  photo: string;
  speciality: string;
  specialityBn: string;
  workplace: string;
  workplaceBn: string;
  designation: string;
  designationBn: string;
  experience: string;
  experienceBn: string;
  location: string;
  email: string;
  phone: string;
  status: 'Active' | 'Pending' | 'Expired';
  issueDate: string;
  expiryDate: string;
  bio: string;
  bioBn: string;
  signatureDishes: string[];
}

export interface JobItem {
  id: string;
  title: string;
  titleBn: string;
  company: string;
  companyLogo?: string;
  type: 'domestic' | 'international';
  country: string;
  countryBn: string;
  city: string;
  salary: string;
  salaryBn: string;
  experience: string;
  visaType?: string;
  deadline: string;
  featured: boolean;
  status: 'active' | 'pending' | 'expired';
  description: string;
  descriptionBn: string;
  requirements: string[];
  contactEmail: string;
}

export interface RecipeItem {
  id: string;
  title: string;
  titleBn: string;
  category: 'fondant' | 'cake' | 'chocolate' | 'bread' | 'pastry' | 'decorating';
  categoryBn: string;
  chef: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Master';
  prepTime: string;
  bakeTime: string;
  servings: string;
  image: string;
  videoUrl?: string;
  description: string;
  descriptionBn: string;
  ingredients: { item: string; itemBn: string; amount: string }[];
  instructions: { step: number; title: string; titleBn: string; desc: string; descBn: string }[];
}

export interface TrainingItem {
  id: string;
  title: string;
  titleBn: string;
  instructor: string;
  instructorTitle: string;
  date: string;
  duration: string;
  durationBn: string;
  venue: string;
  venueBn: string;
  fee: string;
  totalSeats: number;
  availableSeats: number;
  image: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  syllabus: string[];
  syllabusBn: string[];
}

export interface CertificateItem {
  certificateId: string;
  holderName: string;
  holderNameBn: string;
  memberId: string;
  courseName: string;
  courseNameBn: string;
  issueDate: string;
  expiryDate: string;
  issuingAuthority: string;
  status: 'Valid' | 'Revoked' | 'Expired';
  grade: string;
}

export interface CommunityGalleryItem {
  id: string;
  title: string;
  titleBn?: string;
  chefName: string;
  workplace?: string;
  category: string;
  image: string;
  likes: number;
  isApproved: boolean;
}

export interface CakeOfTheMonthItem {
  id: string;
  theme: string;
  themeBn: string;
  month: string;
  chefName: string;
  chefWorkplace: string;
  cakeTitle: string;
  image: string;
  votes: number;
  isWinner: boolean;
  story: string;
}

export interface ForumQuestion {
  id: string;
  title: string;
  author: string;
  category: string;
  createdAt: string;
  likes: number;
  answers: {
    id: string;
    author: string;
    role: string;
    content: string;
    createdAt: string;
    isExpert: boolean;
  }[];
}

export interface EventItem {
  id: string;
  title: string;
  titleBn: string;
  type: string;
  date: string;
  time: string;
  location: string;
  locationBn: string;
  attendees: number;
  image: string;
  description: string;
  descriptionBn: string;
}

export interface SupplierItem {
  id: string;
  name: string;
  category: string;
  categoryBn: string;
  address: string;
  addressBn: string;
  phone: string;
  whatsapp: string;
  website: string;
  products: string[];
  verified: boolean;
}

export interface NewsNoticeItem {
  id: string;
  title: string;
  titleBn: string;
  category: 'NSDA Notice' | 'BPCAB Announcement' | 'Training Circular' | 'Industry News';
  date: string;
  featured: boolean;
  summary: string;
  summaryBn: string;
  content: string;
  contentBn: string;
  image?: string;
}

export interface PaymentRecord {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  method: 'bKash' | 'Nagad';
  trxId: string;
  date: string;
  status: 'Verified' | 'Pending';
  type: 'Registration' | 'Renewal' | 'Job Post' | 'Workshop';
}

export interface NotificationItem {
  id: string;
  title: string;
  titleBn: string;
  time: string;
  read: boolean;
  type: 'membership' | 'job' | 'training' | 'notice';
}
