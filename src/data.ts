import { Club, SocialPost, FAQItem } from './types';

export const ACADEMIC_PROGRAMS = [
  { id: 'arts', name: 'Arts & Humanities', depts: ['Classical Studies', 'Fine Arts', 'English Literature', 'Philosophy'], lead: 'Dr. Helen Parker', desc: 'Developing critical inquiry, cultural fluency, and artistic expression through classical and modern disciplines.' },
  { id: 'stem', name: 'STEM (Science, Tech, Engineering & Math)', depts: ['Computer Science', 'Robotics', 'Advanced Calculus', 'Biophysics'], lead: 'Dr. Arthur Vance', desc: 'Fostering discovery, algorithmic logical reasoning, and industrial engineering excellence with state-of-the-art lab research.' },
  { id: 'social', name: 'Social Sciences & History', depts: ['Global Politics', 'Economics', 'World History', 'Anthropology'], lead: 'Prof. Marcus Wright', desc: 'Investigating human behavior, global governance, and historical events that shape today’s socio-economic conditions.' },
  { id: 'business', name: 'Business & Entrepreneurship', depts: ['Financial markets', 'Business Dev', 'Marketing Strategy', 'Ethics'], lead: 'Dr. Sarah Jenkins', desc: 'Empowering future founders and executive leaders with sound financial acumen, strategic vision, and corporate integrity.' }
];

export const INITIAL_CLUBS: Club[] = [
  {
    id: 'club_1',
    name: 'Aerospace Society',
    category: 'Tech & Innovation',
    iconName: 'rocket_launch',
    description: 'Designing and launching high-altitude rockets and drones for international competitions.',
    membersCount: 42,
    featuredImg: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=600&auto=format&fit=crop&q=80',
    longDescription: 'The Aerospace Society at My School pushes the limits of amateur rocketry. Our members analyze aerodynamics, compute trajectories, program guidance systems, and assemble carbon-composite airframes. Annually, we represent the school at the International Rocketry Contest, giving students real-world engineering challenges.'
  },
  {
    id: 'club_2',
    name: 'Canvas & Coffee',
    category: 'Creative Arts',
    iconName: 'palette',
    description: 'A community of visual artists hosting weekly workshops and gallery showcases.',
    membersCount: 18,
    featuredImg: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80',
    longDescription: 'Canvas & Coffee matches hot brewing coffee with expressive paint strokes. We gather every Tuesday afternoon in the North Studio to sketch, paint, sculpt, and peer-review our portfolios. We organize quarterly open-mic nights and curated gallery walks that celebrate visual expression.'
  },
  {
    id: 'club_3',
    name: 'Eco-Warriors',
    category: 'Advocacy',
    iconName: 'globe',
    description: 'Leading school sustainability initiatives and local environmental conservation projects.',
    membersCount: 35,
    featuredImg: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
    longDescription: 'Dedicated to local conservation, Eco-Warriors runs our school-wide composting network, coordinates community clean-up hikes, and runs energy audits. We manage the school organic greenhouse, donating fresh vegetables to local pantries while educating fellow peers on bio-diverse gardening.'
  },
  {
    id: 'club_4',
    name: 'Model United Nations',
    category: 'Academic',
    iconName: 'gavel',
    description: 'Engaging with international diplomacy, global security, and legislative drafting.',
    membersCount: 50,
    featuredImg: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
    longDescription: 'Model UN simulates committee chambers of the United Nations. Students act as delegates representing diverse member countries, negotiating treaties, forming coalitions, and resolving simulated geopolitical crises using rules of procedure.'
  },
  {
    id: 'club_5',
    name: 'Varsity Rowing & Sailing',
    category: 'Athletics',
    iconName: 'rowing',
    description: 'Challenging ourselves physically on the regional rivers in structured shells.',
    membersCount: 28,
    featuredImg: 'https://images.unsplash.com/photo-1481018085669-2bc6e4f00edd?w=600&auto=format&fit=crop&q=80',
    longDescription: 'Rowing is our flagship aquatic sport. We practice daily on the scenic Westlake river, training for state regattas. Our teammates foster supreme discipline, synchronicity, and mental fortitude.'
  }
];

export const INITIAL_SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'post_1',
    platform: 'Instagram',
    time: '2 hours ago',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB70cQI8r7gO01myg1Ydplg7o4Tl2n8QE8tloUjuvV8h4CNaARKoqD_JxjgmIzQ2fLMedmJVNL66ys1wxkaSE2qKRzqPuPYxAKKAp2xrqCMcBYmg_PpWqonuSo_a15SxwQDpA_NexyuPDyPBBr-8GFDdfX2CbAJcJM_HxEP1eGnDtoXOhbQQxCC3UrECOfxA-ZXZMOnhI_Jhb0Axb9VP1Fg_j1eCdjG5ko3m0drciP2JW4Z8e6PcJ7LOG2OB1DYuymuDAiHwNfT5p5b6g',
    text: 'Highlighting the incredible performance by our theater department last night. Bravo to the cast and crew!',
    likes: 312,
    comments: ['Incredible show!', 'The set design was amazing!', 'So proud of everyone ❤️']
  },
  {
    id: 'post_2',
    platform: 'Twitter/X',
    time: 'Yesterday',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjx2dWqowBFiahB2bOLkAMz9g34x-7qyb6lJVuofsD2syCx9fTxM1E0dSy0Ys9hUhFBp5Ky0kDhyzD_xp6Y8SGEzjn4DRhTWpXytPqq9cSoX_4nDP3W691cltKlWe0-vMiL7C8vBZe1dPyqiiyuxec9skvBUc0uiDGIOpElbJVjWbUXEywlE_mvWqii7-AC0MikfaZbefyxegUbgoUa8ilAwQHNYqxaq3DXJrxj6G_7W1WMt3m3v6G9O7_MVpGdVvk6cWO3DVQqxk',
    text: 'Congratulations to our Debate Team for their outstanding performance at the Regional Championships!',
    likes: 194,
    comments: ['Brilliant job!', 'Best school debate team in the state!🏆', 'Well deserved arguments!']
  },
  {
    id: 'post_3',
    platform: 'Facebook',
    time: '2 days ago',
    image: 'https://images.unsplash.com/photo-1545231027-63b3f1626093?w=600&auto=format&fit=crop&q=80',
    text: 'A beautiful autumn morning on campus. We love seeing our students enjoying the outdoor study spaces and collaborative yards.',
    likes: 423,
    comments: ['Looks so peaceful', 'Reminds me of my school days!', 'Lovely view']
  },
  {
    id: 'post_4',
    platform: 'Instagram',
    time: '3 days ago',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoP-C90NEyPEJiAYG6XEpA37GjoJ_mbxLr1fPfMM7XQrultgIJXN9nHPd_4wjOFKnXmb8wRove20ZpGQs2HfarwbNK4JktCjs08Zd1BS6BCPaAnMt-pJGwdV2BcTLEw7mZoecoZSNPB-iI2idkCXq-Buk94_qZ_weRTbIURHCt24iZKBy1aeS-Q6_8G7HB2u2PynOx8j4HuZufMpJoTk6-5xw0PcwmItPwk25LgzQgZzDZqk4x_PVTWJ_Q8eGmBKgve6uMdGMgPKM',
    text: 'The Canvas & Coffee workshop was a hit! Check out some of the amazing work created by our students during the weekend session.',
    likes: 288,
    comments: ['Wow, very creative!', 'My favorite painting is the center one!', 'Can parents join these workshops?']
  }
];

export const STUDENT_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq_1',
    question: 'What are the application deadlines for the next school year?',
    answer: 'Our Fall semester early enrollment deadline is November 15, and our regular decision deadline is January 31. Late admissions are considered on a rolling space-available basis until April 1.',
    category: 'Admissions'
  },
  {
    id: 'faq_2',
    question: 'How do I submit letters of recommendation?',
    answer: 'Letters of recommendation can be uploaded directly inside our Online Admissions Portal using your applicant dashboard, or they can be sent securely by your secondary counselors to admissions@myschool.edu.',
    category: 'Admissions'
  },
  {
    id: 'faq_3',
    question: 'Is financial aid available for incoming students?',
    answer: 'Yes! Over 65% of My School students receive merit-based or need-based financial aid. You can request aid consideration at the time of your application. The FAFSA and our proprietary CSS application forms are required for eligibility audits.',
    category: 'Financial'
  },
  {
    id: 'faq_4',
    question: 'Can I choose multiple student clubs, or are there restrictions?',
    answer: 'Students can participate in as many clubs as their schedule permits. We generally recommend choosing 2 or 3 core activities (e.g., an academic society, a creative art group, and a physical team sport) to balance workload and social life.',
    category: 'Student Life'
  },
  {
    id: 'faq_5',
    question: 'Are class shadows available to all applicants?',
    answer: 'Class shadow visits are available to all middle and secondary applicants who have completed Step 1 (Inquiry) of our Admissions loop. Simply submit a booking in the "Book Your Tour" module.',
    category: 'General'
  }
];
