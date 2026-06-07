export interface ApplicationInput {
  firstName: string;
  lastName: string;
  email: string;
  program: string;
}

export interface TourBookingInput {
  tourType: 'daily' | 'shadow';
  date: string;
  timeSlot: string;
  visitorName: string;
  visitorEmail: string;
}

export interface CounselorInput {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
}

export interface Club {
  id: string;
  name: string;
  category: 'Tech & Innovation' | 'Creative Arts' | 'Advocacy' | 'Athletics' | 'Academic';
  iconName: string;
  description: string;
  membersCount: number;
  featuredImg: string;
  longDescription?: string;
}

export interface SocialPost {
  id: string;
  platform: 'Instagram' | 'Twitter/X' | 'Facebook';
  time: string;
  image: string;
  text: string;
  likes: number;
  comments: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Admissions' | 'Financial' | 'Student Life' | 'General';
}
