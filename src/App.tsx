/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  BookOpen,
  Calendar,
  Users,
  MessageSquare,
  Award,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CheckCircle,
  Menu,
  X,
  Send,
  HelpCircle,
  Clock,
  ArrowUpRight,
  ArrowRight,
  BookMarked,
  Heart,
  ChevronDown,
  Star,
  MapPin,
  School,
  Palette,
  ArrowUp
} from 'lucide-react';

import {
  INITIAL_CLUBS,
  INITIAL_SOCIAL_POSTS,
  ACADEMIC_PROGRAMS,
  STUDENT_AVATARS,
  FAQS
} from './data';
import { Club, SocialPost, TourBookingInput, CounselorInput } from './types';

// Importing custom modular modals
import BookTourModal from './components/BookTourModal';
import CounselorModal from './components/CounselorModal';
import ClubDetailModal from './components/ClubDetailModal';
import SocialDetailModal from './components/SocialDetailModal';
import AdmissionQuickLinksModal from './components/AdmissionQuickLinksModal';

export default function App() {
  // Navigation & Page State
  const [activeTab, setActiveTab] = useState<'Home' | 'Admissions' | 'Academics' | 'Student Life'>('Home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 220) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Form States
  const [appForm, setAppForm] = useState({
    fullName: '',
    age: '',
    email: '',
    interestedClass: 'Primary'
  });
  const [appSubmitted, setAppSubmitted] = useState(false);
  const [generatedAppId, setGeneratedAppId] = useState('');

  // Newsletter Form State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Counselor Call State
  const [counselorsCallList, setCounselorsCallList] = useState<CounselorInput[]>([]);
  const [showCounselorModal, setShowCounselorModal] = useState(false);

  // Tour Booking State
  const [tourBookingList, setTourBookingList] = useState<TourBookingInput[]>([]);
  const [showTourModal, setShowTourModal] = useState(false);

  // Quick Links Modal States
  const [showQuickLinksModal, setShowQuickLinksModal] = useState(false);
  const [activeQuickLinkTab, setActiveQuickLinkTab] = useState<'documents' | 'deadlines' | 'faq'>('documents');

  // Clubs State (Student Life)
  const [clubs, setClubs] = useState<Club[]>(INITIAL_CLUBS);
  const [selectedClubCategory, setSelectedClubCategory] = useState<string>('All');
  const [showClubModal, setShowClubModal] = useState(false);
  const [activeClub, setActiveClub] = useState<Club | null>(null);
  const [joinedClubIds, setJoinedClubIds] = useState<string[]>([]);
  const [clubSearchQuery, setClubSearchQuery] = useState('');

  // Bulletin Board States
  const [bulletinClass, setBulletinClass] = useState('global');
  const [bulletinSearch, setBulletinSearch] = useState('');
  const [bulletinCategory, setBulletinCategory] = useState<'All' | 'Announcement' | 'Event' | 'Academic'>('All');
  const [bulletinSubscribed, setBulletinSubscribed] = useState(false);
  const [bulletinEmail, setBulletinEmail] = useState('');
  const [bulletinCards, setBulletinCards] = useState([
    {
      id: '1',
      tag: 'Academic',
      date: 'Oct 24, 2024',
      title: 'Semester Curriculum Update for Advanced Placement',
      desc: 'Detailed overview of the modified AP curriculum starting this spring semester, including new lab hours and faculty rotations for the Science department.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjpXkb7QMaouNLBwlEM_uQnlOSKpaDaeN8_uN0JlWnCwHLIhNZzYmEMyKtCnv4b-B_6dNajey-2g5TDVW4V1cF1dKtSlJrlx5c2euKXEeVn8CVZrH63tXVc09lVWfG8P55sj9eMarGx7M4bqHvbmAD-FKj-Fu7vLfa4u_vG7KcbYtz993fVAQ5hmvyvIsCdVHlBSq9l305MaRH7tGY2rWAA4xEojGGhUjK84tpcEFMoInSg8bXGeSvRMi4pM6H2kt6ZnMp5uWzz80',
      classes: ['ss-1', 'ss-2', 'ss-3']
    },
    {
      id: '2',
      tag: 'Event',
      date: 'Oct 20, 2024',
      title: 'Annual Autumn Gala and Fundraising Dinner',
      desc: 'Join us for a night of celebration and community as we raise funds for our new library project. Tickets are now available for parents and alumni.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzwToImN3mP-yVPOJgoORF6FL39HuGdLZs9J_xx0_aCafqiLM8Vm_FBcAF11QSDhTf8RoEw7K9Y4kTR0_zMvEiO8rCNXyf4IL930SyPZXj7tigHpF4D3bCkv5FnZnhMaaHxSqsqs8qVCrWp8fxUFNEFlrvOBhQ_0mN_KVLMdSm-fGfQJBHz32uoJbXNa9_sJ15SndAMUkQ5o2QI5QvBDiHrA_euUhMO77xjIuWC_yTrsiJT-DUxRk7an5MxIn05mvBAQRKIOEfUVI',
      classes: ['nursery-1', 'nursery-2', 'nursery-3', 'primary-1', 'primary-2', 'primary-3', 'primary-4', 'primary-5', 'primary-6']
    },
    {
      id: '3',
      tag: 'Announcement',
      date: 'Oct 18, 2024',
      title: 'New Leadership Appointments for the Arts Faculty',
      desc: 'We are pleased to introduce Dr. Helena Vance as the new Head of Performing Arts, bringing two decades of international experience to our campus.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkGCJPYb_nuDAjxs63oqeNcxBN10UAKzQDrgj9gRDNA13g4IP_ZLBzW9RH4Awx2YU9VFCuKHTUl1gIni2v-etqzI4scWX_XjY8GSKlGT_OHWHpCPV_cJZbxfvW061_t-f7rXEkeGC9vF0Q_qRPSuw6aJk0xzsS8a0C9FSzqyTPIb3QH0pGkihOS-TLJ1wLLOgvGa-kGY-mYs8y6KM5VMgroPF_lDxzPAcelV0UyfGJoq1dx7KvqUiMdo0rTT6cXInilTCirTsEY80',
      classes: ['jss-1', 'jss-2', 'jss-3']
    },
    {
      id: '4',
      tag: 'Academic',
      date: 'Oct 15, 2024',
      title: 'Science & Tech Fair: Project Submissions Open',
      desc: 'Calling all innovators! Students are invited to submit their STEM project proposals for the upcoming Winter Science & Technology exhibition.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDr6CaLHHgq2iZWUyQqkRNeNnx4GU37ueWncMOAcFBZh_LqfZSB4XJUqZugmoEqBGFOS7kSU53SQRJGUcnh-ZQPe2mc-h8J3Lng5xhtNUXAyzGG8ZvPMPFN38kHydQSbO0cpHBaPi9lNASXfSdQyl9pnFS8geLMGTIESKRBCm5CZYcji12-NRF7c3C6SgyjnNSYWM7bfsWdowAonYMp22CD2n93ucQn8zHnHtsA4bqi0xGw9NOYdv67zh4fg-Sh7gQK2kh4XTHuLAY',
      classes: ['jss-1', 'jss-2', 'jss-3', 'ss-1', 'ss-2', 'ss-3']
    }
  ]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [infinitePagesLoaded, setInfinitePagesLoaded] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScrollFeatures = () => {
      // Back to Top trigger
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Check for infinite scroll condition: active tab is Student Life and within threshold of the bottom of the document
      if (activeTab === 'Student Life' && !isLoadingMore && infinitePagesLoaded < 3) {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setBulletinCards(prev => [
              ...prev,
              {
                id: 'scroll-' + prev.length + '-1',
                tag: 'Event',
                date: 'Oct 12, 2024',
                title: 'School Sports Day Recap',
                desc: 'A look back at the record-breaking performances and incredible team spirit shown during our annual inter-house sports competition.',
                img: '/src/assets/images/school_sports_day_1780866015704.png',
                classes: ['global', 'nursery-1', 'nursery-2', 'nursery-3', 'primary-1', 'primary-2', 'primary-3', 'primary-4', 'primary-5', 'primary-6', 'jss-1', 'jss-2', 'jss-3', 'ss-1', 'ss-2', 'ss-3']
              },
              {
                id: 'scroll-' + prev.length + '-2',
                tag: 'Academic',
                date: 'Oct 10, 2024',
                title: 'Science Fair Winners Announced',
                desc: 'Congratulations to our junior innovators who took home the gold for their groundbreaking renewable energy projects this year.',
                img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
                classes: ['global', 'primary-1', 'primary-2', 'primary-3', 'primary-4', 'primary-5', 'primary-6']
              },
              {
                id: 'scroll-' + prev.length + '-3',
                tag: 'Announcement',
                date: 'Oct 05, 2024',
                title: 'New Campus Expansion Plans',
                desc: 'The Board of Trustees is excited to unveil the master plan for our state-of-the-art Creative Arts Center, scheduled to break ground next summer.',
                img: '/src/assets/images/campus_expansion_1780866032287.png',
                classes: ['global', 'jss-1', 'jss-2', 'jss-3', 'ss-1', 'ss-2', 'ss-3']
              },
              {
                id: 'scroll-' + prev.length + '-4',
                tag: 'Academic',
                date: 'Oct 01, 2024',
                title: 'Library Extended Hours for Finals',
                desc: 'To support our students during the exam season, the main library will remain open until midnight throughout the month of November.',
                img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800',
                classes: ['global', 'ss-1', 'ss-2', 'ss-3']
              }
            ]);
            setInfinitePagesLoaded(prev => prev + 1);
            setIsLoadingMore(false);
          }, 1500);
        }
      }
    };

    window.addEventListener('scroll', handleScrollFeatures, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollFeatures);
  }, [activeTab, isLoadingMore, infinitePagesLoaded]);

  // Social feed State (Student Life)
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>(INITIAL_SOCIAL_POSTS);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [activeSocialPost, setActiveSocialPost] = useState<SocialPost | null>(null);
  const [likedPostIds, setLikedPostIds] = useState<string[]>([]);

  // Academics States
  const [coursSearch, setCoursSearch] = useState('');
  const [expandedDeptId, setExpandedDeptId] = useState<string | null>(null);
  const [academicsSubTab, setAcademicsSubTab] = useState<'nursery' | 'primary' | 'secondary'>('nursery');

  // Home Bento Grid Modal States
  const [activeHomeModal, setActiveHomeModal] = useState<'stem' | 'science' | 'library' | null>(null);
  const [scienceRegForm, setScienceRegForm] = useState({ name: '', email: '', category: 'Software & Technology' });
  const [scienceRegistered, setScienceRegistered] = useState(false);
  const [scienceRegId, setScienceRegId] = useState('');

  // Interactive callbacks
  const handleScienceRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scienceRegForm.name.trim() || !scienceRegForm.email.trim()) return;
    const regId = 'SF-' + Math.floor(1000 + Math.random() * 9000);
    setScienceRegId(regId);
    setScienceRegistered(true);
  };

  const handleAppFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appForm.fullName.trim() || !appForm.email.trim() || !appForm.age) return;
    const randomId = 'MS-' + Math.floor(100000 + Math.random() * 900000);
    setGeneratedAppId(randomId);
    setAppSubmitted(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 3000);
  };

  const handleCounselorSubmit = (data: CounselorInput) => {
    setCounselorsCallList((prev) => [...prev, data]);
    // Optionally log or store
  };

  const handleTourSubmit = (data: TourBookingInput) => {
    setTourBookingList((prev) => [...prev, data]);
  };

  const handleJoinClub = (clubId: string) => {
    if (joinedClubIds.includes(clubId)) return;
    setJoinedClubIds((prev) => [...prev, clubId]);
    setClubs((prev) =>
      prev.map((c) => (c.id === clubId ? { ...c, membersCount: c.membersCount + 1 } : c))
    );
  };

  const handleLikeSocialPost = (postId: string) => {
    const isLiked = likedPostIds.includes(postId);
    if (isLiked) {
      setLikedPostIds((prev) => prev.filter((id) => id !== postId));
      setSocialPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, likes: p.likes - 1 } : p))
      );
      if (activeSocialPost && activeSocialPost.id === postId) {
        setActiveSocialPost((prev) => (prev ? { ...prev, likes: prev.likes - 1 } : null));
      }
    } else {
      setLikedPostIds((prev) => [...prev, postId]);
      setSocialPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
      );
      if (activeSocialPost && activeSocialPost.id === postId) {
        setActiveSocialPost((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
      }
    }
  };

  const handleCommentSocialPost = (postId: string, commentText: string) => {
    setSocialPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, commentText] } : p))
    );
    if (activeSocialPost && activeSocialPost.id === postId) {
      setActiveSocialPost((prev) =>
        prev ? { ...prev, comments: [...prev.comments, commentText] } : null
      );
    }
  };

  // Filter Clubs
  const filteredClubs = clubs.filter((c) => {
    const matchCategory = selectedClubCategory === 'All' || c.category === selectedClubCategory;
    const matchSearch =
      c.name.toLowerCase().includes(clubSearchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(clubSearchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col font-sans selection:bg-secondary-container selection:text-primary">
      {/* HEADER COMPONENT */}
      <header className={`absolute md:fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        (isScrolled || mobileMenuOpen)
          ? 'bg-white border-b border-surface-container shadow-sm'
          : 'bg-transparent border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('Home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className={`w-10 h-10 rounded flex items-center justify-center font-bold font-serif text-lg group-hover:bg-secondary group-hover:text-white transition-all ${
              (!isScrolled && !mobileMenuOpen)
                ? 'bg-white text-primary'
                : 'bg-primary text-on-primary'
            }`}>
              MS
            </div>
            <div>
              <span className={`font-serif text-xl sm:text-2xl font-bold tracking-tight block transition-colors duration-300 ${
                (!isScrolled && !mobileMenuOpen) ? 'text-white' : 'text-primary'
              }`}>
                My School
              </span>
              <span className={`text-[9px] font-mono tracking-widest block uppercase -mt-1 font-semibold transition-colors duration-300 ${
                (!isScrolled && !mobileMenuOpen) ? 'text-secondary-container' : 'text-secondary'
              }`}>
                Est. 1924 • Excellence
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8 items-center">
            {['Home', 'Admissions', 'Academics', 'Student Life'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab as any);
                  setMobileMenuOpen(false);
                }}
                className={`py-1 text-sm font-medium transition-all relative ${
                  activeTab === tab
                    ? (!isScrolled && !mobileMenuOpen) ? 'text-white font-semibold' : 'text-primary'
                    : (!isScrolled && !mobileMenuOpen) ? 'text-white/80 hover:text-white' : 'text-text-muted hover:text-primary'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className={`absolute bottom-0 left-0 right-0 h-[2px] ${
                      (!isScrolled && !mobileMenuOpen) ? 'bg-white' : 'bg-secondary'
                    }`}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-4">
            {/* Collapsible Search */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {showSearch && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 180, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    type="text"
                    placeholder="Search site..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-3 py-1 text-xs border border-surface-container rounded-sm outline-none bg-background text-primary focus:border-secondary transition-all mr-2"
                  />
                )}
              </AnimatePresence>
              <button
                onClick={() => setShowSearch(!showSearch)}
                className={`p-1.5 rounded transition-all duration-200 focus:outline-none ${
                  (!isScrolled && !mobileMenuOpen)
                    ? 'hover:bg-white/10 text-white hover:text-white'
                    : 'hover:bg-neutral-100 text-text-muted hover:text-primary'
                }`}
                id="search-toggle-btn"
                aria-label="Toggle site search"
              >
                <Search size={18} />
              </button>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => setActiveTab('Admissions')}
              className={`px-4 py-2 border rounded-sm text-xs font-semibold hover:shadow-sm transition-all uppercase tracking-wider hidden sm:block ${
                (!isScrolled && !mobileMenuOpen)
                  ? 'bg-white text-primary border-transparent hover:bg-neutral-100'
                  : 'bg-secondary-container text-primary border-transparent hover:bg-secondary-dim'
              }`}
              id="header-apply-btn"
            >
              Apply Now
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 -mr-1 md:hidden rounded outline-none transition-colors duration-300 ${
                (!isScrolled && !mobileMenuOpen)
                  ? 'hover:bg-white/10 text-white hover:text-white'
                  : 'hover:bg-neutral-50 text-text-muted hover:text-primary'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} className={(!isScrolled && !mobileMenuOpen) ? 'text-white' : 'text-primary'} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-surface-container bg-surface-container-lowest overflow-hidden shadow-lg"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {['Home', 'Admissions', 'Academics', 'Student Life'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab as any);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left py-2.5 px-3 rounded text-sm font-medium ${
                      activeTab === tab
                        ? 'bg-secondary/10 text-primary border-l-4 border-secondary'
                        : 'text-text-muted hover:bg-neutral-50 hover:text-primary'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setActiveTab('Admissions');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 px-4 bg-secondary-container text-primary font-semibold rounded text-xs uppercase tracking-wider shadow-sm mt-3"
                  id="mobile-apply-btn"
                >
                  Apply Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* RENDER PAGES DYNAMICALLY */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          
          {/* ==================== HOME TAB ==================== */}
          {activeTab === 'Home' && (
            <motion.div
              key="home-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-16 pb-16"
            >
              {/* Beautiful Hero Section */}
              <header className="relative min-h-[500px] h-[85vh] w-full overflow-hidden flex items-center">
                <div className="absolute inset-0 bg-primary-container/40 z-10"></div>
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed bg-no-repeat"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBzUZB4FC8bKpSuuYzYa2TuqewcrjJL9qI2T5YgKClGhEdhr-yi85dqfSEiAsdJl4xB5Ssww4so5wIRtDn3x3Wi5jNLTKcrlqw8sHi5ckHwK-8O7PU6dvDUGlJb_v-B69cGg0HjH6LyFUZdYRVl8g06c1b3e9ySNNnpEAnaQ2F2-s3rn0iRCn_u47Dt2xv_AFc9Qs9w_SLIaeyyNGMNd-2IWXsj2RxXJnTTDdyEffpulCDzSNt7ff7fwp44WhQZibzW4_q3BfmSjAt--A")`
                  }}
                  role="img"
                  aria-label="University Campus"
                />
                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center items-start text-on-primary">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-secondary-container text-primary font-semibold text-[10px] tracking-widest uppercase shadow mb-4">
                    <Sparkles size={12} />
                    Academic Legacy Since 1924
                  </span>
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight max-w-2xl">
                    Welcome to Excellence
                  </h1>
                  <p className="font-sans text-sm sm:text-base lg:text-lg mt-4 max-w-xl text-white/90 leading-relaxed">
                    Nurturing curiosity, fostering leadership, and empowering global citizens for a rapidly changing world.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <button
                      onClick={() => setActiveTab('Academics')}
                      className="bg-white text-primary px-6 py-3 rounded-sm font-semibold text-xs uppercase tracking-wider shadow-lg hover:bg-neutral-100 transition-all"
                      id="hero-explore-btn"
                    >
                      Explore School
                    </button>
                    <button
                      onClick={() => {
                        const welcomeSection = document.getElementById('why-choose-us');
                        if (welcomeSection) {
                          welcomeSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="border border-white text-white px-6 py-3 rounded-sm font-semibold text-xs uppercase tracking-wider hover:bg-white/10 transition-all"
                      id="hero-story-btn"
                    >
                      Our Story
                    </button>
                  </div>
                </div>
              </header>

              {/* Why Choose Us: Pillars */}
              <section id="why-choose-us" className="py-16 bg-white border-y border-surface-container/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12">
                    <span className="text-secondary font-mono text-xs font-semibold tracking-widest uppercase pb-1 border-b border-secondary/30">WHY CHOOSE US</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mt-4">A Foundation for the Future</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Innovation */}
                    <div className="group p-6 border border-surface-container rounded hover:shadow-md hover:border-primary transition-all duration-300 flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 bg-secondary/10 flex items-center justify-center rounded-full group-hover:bg-secondary-container transition-colors">
                        <Sparkles className="text-secondary text-2xl group-hover:scale-110 transition-transform duration-300" size={28} />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-primary">Innovation</h3>
                      <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                        Integrating cutting-edge technology and modern pedagogies to prepare students for the digital frontier.
                      </p>
                    </div>

                    {/* Community */}
                    <div className="group p-6 border border-surface-container rounded hover:shadow-md hover:border-primary transition-all duration-300 flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 bg-secondary/10 flex items-center justify-center rounded-full group-hover:bg-secondary-container transition-colors">
                        <Users className="text-secondary text-2xl group-hover:scale-110 transition-transform duration-300" size={28} />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-primary">Community</h3>
                      <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                        A diverse, inclusive environment where every voice is heard and every student belongs to something greater.
                      </p>
                    </div>

                    {/* Success */}
                    <div className="group p-6 border border-surface-container rounded hover:shadow-md hover:border-primary transition-all duration-300 flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 bg-secondary/10 flex items-center justify-center rounded-full group-hover:bg-secondary-container transition-colors">
                        <Award className="text-secondary text-2xl group-hover:scale-110 transition-transform duration-300" size={28} />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-primary">Success</h3>
                      <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                        Consistently ranking in the top tier for academic achievement and graduate placement in global universities.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Latest News & Events: Bento Grid */}
              <section className="py-16 bg-surface-card border-b border-surface-container/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
                    <div>
                      <span className="text-secondary font-mono text-xs font-semibold tracking-widest uppercase">The Pulse</span>
                      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mt-2">Latest News &amp; Events</h2>
                    </div>
                    <button
                      onClick={() => setActiveTab('Student Life')}
                      className="text-primary text-xs font-mono font-semibold flex items-center gap-1.5 hover:text-secondary group transition-colors"
                    >
                      View All Stories <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="md:grid md:grid-cols-4 md:grid-rows-2 gap-6 space-y-6 md:space-y-0">
                    {/* Large Feature Item - STEM Lab */}
                    <div
                      onClick={() => setActiveHomeModal('stem')}
                      className="col-span-2 row-span-2 relative min-h-[350px] rounded overflow-hidden group cursor-pointer border border-surface-container shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <img
                        alt="Robotics Lab"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src="/src/assets/images/classroom_students_1780864410690.png"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent flex flex-col justify-end p-6 z-10">
                        <span className="bg-secondary-container text-primary font-bold text-[9px] w-fit px-2 py-0.5 rounded-sm mb-2 shadow uppercase tracking-wider">
                          ACADEMICS
                        </span>
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-secondary-container transition-colors">
                          Innovation Wing Opening This Fall
                        </h3>
                        <p className="text-white/85 text-xs mt-1 leading-relaxed">
                          A new 50,000 sq ft facility dedicated to STEM and Entrepreneurship. Click to view details.
                        </p>
                      </div>
                    </div>

                    {/* Event Card - Science Fair */}
                    <div
                      onClick={() => setActiveHomeModal('science')}
                      className="bg-white p-6 rounded border border-surface-container shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group min-h-[170px]"
                    >
                      <div className="space-y-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-serif font-bold text-primary">24</span>
                          <span className="font-mono text-xs font-semibold text-text-muted uppercase">OCT</span>
                        </div>
                        <h4 className="font-serif text-sm sm:text-base font-bold text-primary group-hover:text-secondary transition-colors">
                          Annual Science Fair
                        </h4>
                        <p className="text-text-muted text-[11px] sm:text-xs leading-relaxed">
                          Join us for a display of student research and ingenuity across all grades.
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHomeModal('science');
                        }}
                        className="mt-6 text-primary font-bold text-xs text-left flex items-center gap-1 group/btn"
                      >
                        Register Interest <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform text-secondary font-bold" />
                      </button>
                    </div>

                    {/* News Item - Alumni Spotlight */}
                    <div
                      onClick={() => {
                        setActiveTab('Student Life');
                      }}
                      className="bg-primary text-white p-6 rounded border border-primary shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-center space-y-3 min-h-[170px]"
                    >
                      <span className="material-symbols-outlined text-secondary-container text-3xl">campaign</span>
                      <h4 className="font-serif text-sm sm:text-base font-bold text-secondary-container">Alumni Spotlight</h4>
                      <p className="text-white/85 text-[11px] sm:text-xs leading-relaxed">
                        Dr. Sarah Jenkins ('12) receives Nobel Prize in Medicine for genetic research. Click to explore Alumni stories.
                      </p>
                    </div>

                    {/* Small Image Grid Item - New Library */}
                    <div
                      onClick={() => setActiveHomeModal('library')}
                      className="relative rounded overflow-hidden group border border-surface-container shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer min-h-[170px]"
                    >
                      <img
                        alt="Library"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg8OvwDRMyifx_hZI1NssQf7XwItP84QKv8jC6kxtjlWJl64apXmka4BkbWokynmgVPwHSN2tH_r5mQzDfIb2jGkIMOGt8gcBw5vMtVN4QlIO-KMEoYMtdg038QmW1butRyy3X-7v1WzdthmLWr2KCfMOSx4-zAhDiZq35iLDUuCzfknUR2aZgINjwHMHWoEWEJNY222qh7biR5gE9fHzK2aMXBe_7OVShO9FtVZuTF_OHd6Zhm5jpxplDgSEYcwlKugvlagz9uCfcvg"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 z-10">
                        <span className="bg-secondary text-white font-mono text-[8px] px-1.5 py-0.5 tracking-wide rounded-sm uppercase font-semibold">
                          COLLECTIONS
                        </span>
                        <h4 className="text-white font-bold text-xs mt-1.5 drop-shadow">
                          New Library Collections
                        </h4>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* Student Testimonial Section */}
              <section className="py-16 bg-white overflow-hidden border-b border-surface-container/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                  <div className="absolute -top-12 -left-4 text-[180px] text-zinc-100 font-serif leading-none select-none -z-10">“</div>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    <div className="lg:col-span-7 space-y-6">
                      <span className="text-secondary font-mono text-xs font-semibold tracking-widest uppercase block">Student Perspective</span>
                      <blockquote className="space-y-4">
                        <p className="font-serif text-2xl sm:text-3xl italic text-primary leading-relaxed">
                          "My School isn't just a place to study; it's a place where I was challenged to think differently. The mentorship I received here gave me the confidence to pursue my dreams at Oxford."
                        </p>
                        <footer className="pt-4 border-t border-surface-container/60">
                          <cite className="not-italic">
                            <span className="block font-serif text-lg font-bold text-primary">Elena Rodriguez</span>
                            <span className="block text-text-muted text-xs font-mono font-medium mt-0.5">Class of 2023 | Pursuing Human Sciences at Oxford</span>
                          </cite>
                        </footer>
                      </blockquote>
                    </div>
                    
                    <div className="lg:col-span-5 relative h-[380px] sm:h-[450px] rounded shadow-2xl overflow-hidden border border-surface-container">
                      <img
                        alt="Student Portrait"
                        className="w-full h-full object-cover hover:scale-101 transition-transform duration-500"
                        src="/src/assets/images/student_portrait_1780865298051.png"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                  </div>
                </div>
              </section>

              {/* NEW Parent Perspective Section */}
              <section className="py-16 bg-surface-card">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12">
                    <span className="text-secondary font-mono text-xs font-semibold tracking-widest uppercase block">Parent Perspective</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mt-2">What Our Families Say</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Review 1 */}
                    <div className="bg-white p-6 rounded border border-surface-container shadow-sm hover:shadow-md hover:border-secondary/30 transition-all duration-300 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex text-secondary-container gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} className="fill-secondary-container text-secondary-container" />
                          ))}
                        </div>
                        <p className="font-serif text-sm sm:text-base italic text-primary leading-relaxed">
                          "The individual attention our son receives is remarkable. The teachers truly care about his personal and academic growth."
                        </p>
                      </div>
                      <div className="pt-4 border-t border-surface-container/60">
                        <span className="block font-bold text-primary text-xs sm:text-sm">Marcus Thompson</span>
                        <span className="block text-text-muted text-[10px] sm:text-xs uppercase font-mono font-semibold tracking-wider mt-0.5">Grade 11 Parent</span>
                      </div>
                    </div>

                    {/* Review 2 */}
                    <div className="bg-white p-6 rounded border border-surface-container shadow-sm hover:shadow-md hover:border-secondary/30 transition-all duration-300 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex text-secondary-container gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} className="fill-secondary-container text-secondary-container" />
                          ))}
                        </div>
                        <p className="font-serif text-sm sm:text-base italic text-primary leading-relaxed">
                          "We moved from abroad, and the community here made the transition seamless for our daughter. It's more than a school; it's a family."
                        </p>
                      </div>
                      <div className="pt-4 border-t border-surface-container/60">
                        <span className="block font-bold text-primary text-xs sm:text-sm">Sofia Rossi</span>
                        <span className="block text-text-muted text-[10px] sm:text-xs uppercase font-mono font-semibold tracking-wider mt-0.5">Grade 9 Parent</span>
                      </div>
                    </div>

                    {/* Review 3 */}
                    <div className="bg-white p-6 rounded border border-surface-container shadow-sm hover:shadow-md hover:border-secondary/30 transition-all duration-300 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex text-secondary-container gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} className="fill-secondary-container text-secondary-container" />
                          ))}
                        </div>
                        <p className="font-serif text-sm sm:text-base italic text-primary leading-relaxed">
                          "The focus on both innovation and traditional values creates a unique environment where students can truly find their path."
                        </p>
                      </div>
                      <div className="pt-4 border-t border-surface-container/60">
                        <span className="block font-bold text-primary text-xs sm:text-sm">David Chen</span>
                        <span className="block text-text-muted text-[10px] sm:text-xs uppercase font-mono font-semibold tracking-wider mt-0.5">Grade 12 Parent</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>



              {/* Action Prompt Banner */}
              <section className="bg-white border-y border-surface-container py-12">
                <div className="max-w-4xl mx-auto text-center px-4 space-y-6">
                  <h3 className="text-2xl font-serif font-bold text-primary">Ready to experience Academics and Life firsthand?</h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    Explore detailed timelines, download necessary evaluation packet forms, schedule diagnostic discussions with a counselor, or plan a campus tour with current student ambassadors.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setActiveTab('Admissions')}
                      className="bg-primary text-white border border-transparent px-5 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-all"
                      id="home-action-admissions"
                    >
                      Enter Admissions Hub
                    </button>
                    <button
                      onClick={() => {
                        setActiveQuickLinkTab('faq');
                        setShowQuickLinksModal(true);
                      }}
                      className="border border-surface-container bg-background hover:bg-neutral-50 px-5 py-2.5 rounded-sm text-xs font-semibold text-primary uppercase tracking-wider transition-all"
                      id="home-action-faqs"
                    >
                      Browse Call FAQs
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* ==================== ADMISSIONS TAB ==================== */}
          {activeTab === 'Admissions' && (
            <motion.div
              key="admissions-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-20 pb-20 animate-fade-in"
            >
              {/* Hero Section */}
              <header className="relative py-20 bg-primary text-on-primary overflow-hidden min-h-[500px] flex items-center">
                <div className="absolute inset-0 opacity-20">
                  <img
                    className="w-full h-full object-cover"
                    alt="A grand, historic academic building with stone architecture and ivy-covered walls, set against a bright, clear blue sky during the golden hour."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnJOMCPYgWph7IZTSmRs_FQ3-WrkUC6vYs56aJfAaEpNhF2FwjApGaY6CVdwNa-Eud7KcJrL4zJq4EGGlKVzoPamzit5vj3N5Hg-B3isXIMuWgJ_AOqB7JDcXXOoaO_IGPEnUfaqhV-VQ493lk2Egsg_1HMKxmnoYs3wbMNpPNrRtRZWWwHkcKKYK1i6I4uare0b8x9KP5sFo38PmDyhbWL1Q0KZlCU-RVgegN8klZcCgcehQDs8ANNRj1TP3jWuEg2HE5TcbQXZ0"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                  <div className="max-w-3xl">
                    <h1 className="font-serif text-5xl sm:text-6xl font-bold mb-6 text-white leading-tight">Your Journey to Excellence Starts Here</h1>
                    <p className="font-body-lg text-body-lg mb-12 text-zinc-100 opacity-90 leading-relaxed">
                      Join a community of scholars, innovators, and leaders. Discover how My School can help you unlock your full potential and shape your future.
                    </p>
                    <div className="flex flex-wrap gap-6">
                      <a
                        className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform text-xs uppercase tracking-wider block"
                        href="#apply"
                      >
                        Start Application
                      </a>
                      <a
                        className="bg-transparent border-2 border-on-primary text-on-primary px-8 py-4 rounded-xl font-semibold hover:bg-on-primary/10 transition-colors text-xs uppercase tracking-wider block"
                        href="#visit"
                      >
                        Visit School
                      </a>
                    </div>
                  </div>
                </div>
              </header>

              {/* Application Process (Steps) */}
              <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                  <h2 className="font-headline-lg text-headline-lg mb-1 text-primary">Application Process</h2>
                  <div className="w-20 h-1 bg-secondary mx-auto"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                  {/* Progress Line (Desktop) */}
                  <div className="hidden lg:block absolute top-12 left-0 w-full h-[2px] bg-outline-variant -z-10"></div>
                  
                  {/* Step 1 */}
                  <div className="step-card text-center group">
                    <div id="step-number-1" className="step-number w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 font-headline-sm transition-transform duration-300 group-hover:-translate-y-1">
                      1
                    </div>
                    <h3 className="font-headline-sm text-headline-sm mb-1 text-primary">Inquiry</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Request information and connect with an admissions counselor.</p>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="step-card text-center group">
                    <div id="step-number-2" className="step-number w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 font-headline-sm transition-transform duration-300 group-hover:-translate-y-1">
                      2
                    </div>
                    <h3 className="font-headline-sm text-headline-sm mb-1 text-primary">Visit</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Tour our school and experience the student life firsthand.</p>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="step-card text-center group">
                    <div id="step-number-3" className="step-number w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 font-headline-sm transition-transform duration-300 group-hover:-translate-y-1">
                      3
                    </div>
                    <h3 className="font-headline-sm text-headline-sm mb-1 text-primary">Apply</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Submit your online application and required documents.</p>
                  </div>
                  
                  {/* Step 4 */}
                  <div className="step-card text-center group">
                    <div id="step-number-4" className="step-number w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-6 font-headline-sm transition-transform duration-300 group-hover:-translate-y-1 font-bold">
                      4
                    </div>
                    <h3 className="font-headline-sm text-headline-sm mb-1 text-primary">Interview</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Complete your personal interview with our faculty team.</p>
                  </div>
                </div>
              </section>

              {/* Start Application Form (Bento Layout) */}
              <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="apply">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Large Form Card */}
                  <div className="col-span-12 lg:col-span-8 bg-primary-container text-on-primary-container p-8 sm:p-12 rounded-xl shadow-xl flex flex-col justify-center">
                    <h2 className="font-headline-lg text-headline-lg mb-6 text-white">Start Your Application</h2>
                    
                    {appSubmitted ? (
                      <div className="flex flex-col items-center justify-center text-center py-12 space-y-6 animate-scale-up">
                        <div className="w-16 h-16 bg-secondary-container text-primary rounded-full flex items-center justify-center shadow">
                          <CheckCircle size={32} className="animate-pulse" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-serif text-2xl font-bold text-white">Application Initiated!</h4>
                          <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                            Welcome, <span className="text-secondary-container font-semibold">{appForm.fullName}</span>! Your prospective applicant account has been securely instantiated.
                          </p>
                        </div>
                        <div className="bg-primary/50 px-6 py-4 rounded border border-white/10 font-mono text-center max-w-xs w-full shadow-lg">
                          <div className="text-[10px] text-zinc-400 uppercase tracking-widest mb-1 font-semibold">Your Reference ID</div>
                          <div className="text-xl font-bold text-secondary-container">{generatedAppId}</div>
                        </div>
                        <p className="text-xs text-zinc-400 max-w-sm">
                          We sent a verification package link to <span className="text-zinc-200">{appForm.email}</span>. Use your credentials to track requirements.
                        </p>
                        <button
                          onClick={() => {
                            setAppSubmitted(false);
                            setAppForm({ fullName: '', age: '', email: '', interestedClass: 'Primary' });
                          }}
                          className="px-4 py-2 border border-white/20 hover:border-white text-secondary-container hover:text-white rounded text-xs uppercase font-semibold transition-all mt-4"
                        >
                          New Application Account
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleAppFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block font-label-md mb-1.5 text-zinc-200 opacity-80 text-xs uppercase font-bold tracking-wider">Full Name</label>
                          <input
                            required
                            type="text"
                            placeholder="Jane Doe"
                            value={appForm.fullName}
                            onChange={(e) => setAppForm({ ...appForm, fullName: e.target.value })}
                            className="w-full bg-white/10 border border-white/20 text-white rounded-lg p-3 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none placeholder:text-white/40 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block font-label-md mb-1.5 text-zinc-200 opacity-80 text-xs uppercase font-bold tracking-wider">Age</label>
                          <input
                            required
                            type="number"
                            min="1"
                            max="100"
                            placeholder="8"
                            value={appForm.age}
                            onChange={(e) => setAppForm({ ...appForm, age: e.target.value })}
                            className="w-full bg-white/10 border border-white/20 text-white rounded-lg p-3 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none placeholder:text-white/40 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block font-label-md mb-1.5 text-zinc-200 opacity-80 text-xs uppercase font-bold tracking-wider">Email Address</label>
                          <input
                            required
                            type="email"
                            placeholder="jane.doe@example.com"
                            value={appForm.email}
                            onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                            className="w-full bg-white/10 border border-white/20 text-white rounded-lg p-3 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none placeholder:text-white/40 text-sm"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block font-label-md mb-1.5 text-zinc-200 opacity-80 text-xs uppercase font-bold tracking-wider">Interested Class</label>
                          <select
                            value={appForm.interestedClass}
                            onChange={(e) => setAppForm({ ...appForm, interestedClass: e.target.value })}
                            className="w-full bg-white/10 border border-white/20 text-white rounded-lg p-3 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none appearance-none text-sm cursor-pointer"
                          >
                            <option className="text-on-background" value="Nursery">Nursery</option>
                            <option className="text-on-background" value="Primary">Primary</option>
                            <option className="text-on-background" value="Secondary">Secondary</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <button
                            type="submit"
                            className="w-full bg-secondary-container text-on-secondary-container py-4 rounded-xl font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all mt-4"
                          >
                            Create Account &amp; Continue
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Support Card Column */}
                  <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    <div className="flex-1 bg-secondary-fixed text-on-secondary-fixed p-8 rounded-xl flex flex-col justify-between">
                      <div>
                        <HelpCircle size={36} className="text-primary mb-2" />
                        <h3 className="font-headline-sm text-headline-sm mb-1 text-primary">Need Help?</h3>
                        <p className="font-body-sm text-body-sm mb-4">Our admissions counselors are here to guide you through every step of the process.</p>
                      </div>
                      <button
                        onClick={() => setShowCounselorModal(true)}
                        className="font-label-md flex items-center gap-1 hover:gap-2 transition-all text-primary font-bold text-left text-xs uppercase tracking-wider"
                      >
                        Schedule a Call <ArrowRight size={16} />
                      </button>
                    </div>

                    <div className="flex-1 bg-surface-container-high p-8 rounded-xl border border-outline-variant flex flex-col justify-center">
                      <h3 className="font-label-md text-primary mb-4 font-bold text-xs uppercase tracking-wider">Quick Links</h3>
                      <ul className="space-y-4 font-body-sm text-on-surface-variant text-sm">
                        <li className="flex items-center">
                          <button
                            onClick={() => {
                              setActiveQuickLinkTab('documents');
                              setShowQuickLinksModal(true);
                            }}
                            className="flex items-center gap-2 hover:text-secondary hover:underline text-left font-medium"
                          >
                            <BookOpen size={16} className="text-secondary shrink-0" /> Admission Documents
                          </button>
                        </li>
                        <li className="flex items-center">
                          <button
                            onClick={() => {
                              setActiveQuickLinkTab('deadlines');
                              setShowQuickLinksModal(true);
                            }}
                            className="flex items-center gap-2 hover:text-secondary hover:underline text-left font-medium"
                          >
                            <Calendar size={16} className="text-secondary shrink-0" /> Key Deadlines
                          </button>
                        </li>
                        <li className="flex items-center">
                          <button
                            onClick={() => {
                              setActiveQuickLinkTab('faq');
                              setShowQuickLinksModal(true);
                            }}
                            className="flex items-center gap-2 hover:text-secondary hover:underline text-left font-medium"
                          >
                            <MessageSquare size={16} className="text-secondary shrink-0" /> FAQ
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Visit Campus Section */}
              <section className="py-20 bg-white" id="visit">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl border border-outline-variant">
                    <div className="md:w-1/2 min-h-[400px] relative">
                      <img
                        className="w-full h-full object-cover absolute inset-0"
                        alt="Students walking through a sun-drenched, modern campus courtyard with glass-fronted architecture and lush green lawns."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCScjkzCVbRaZ7lwi-888QZUE3B18R5D7WR0eD0r8XKkKa_ZeP30X6fKvFEvy7m7drKzV6_8NLi7a-towqhElmPMt7eSMSCLOkCooGFt89B6_k3a0gBEIPprZRTu58E9Er2no5X0qAzMZxLeDzfydH4ypXkkWt6UjrN44p5wNFo8AAJ8inP6rHJP0G-JIgLpYwqNd4qp4qPyHiWltfkpMePCZyP9eDffU4iZlIq5ieeG5-55SB9vW0fnqpKS2T8a_EMCYyh425DmEwcFw"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                        <p className="text-white font-headline-sm font-semibold">Experience our school community first-hand.</p>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
                      <h2 className="font-headline-lg text-headline-lg mb-4 text-primary leading-tight">Book a Tour of Our School</h2>
                      <p className="font-body-lg text-body-lg mb-8 text-on-surface-variant leading-relaxed">
                        Walking through our halls and meeting our community is the best way to see if we're the right fit for you. We offer personalized tours Monday through Friday.
                      </p>
                      <div className="space-y-6 mb-8">
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-lg text-primary shrink-0">
                            <MapPin size={18} />
                          </div>
                          <div>
                            <h4 className="font-label-md text-primary font-bold">Daily Tours</h4>
                            <p className="text-body-sm text-text-muted mt-0.5">Led by current student ambassadors.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-lg text-primary shrink-0">
                            <School size={18} />
                          </div>
                          <div>
                            <h4 className="font-label-md text-primary font-bold">Class Shadows</h4>
                            <p className="text-body-sm text-text-muted mt-0.5">Sit in on a lecture of your choice.</p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowTourModal(true)}
                        className="bg-primary text-white border border-transparent py-4 px-8 rounded-xl font-label-md hover:bg-primary/90 transition-all flex items-center justify-center gap-3 font-semibold text-xs uppercase tracking-wider"
                      >
                        Book Your Tour <Calendar size={16} className="text-secondary" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* ==================== ACADEMICS TAB ==================== */}
          {activeTab === 'Academics' && (
            <motion.div
              key="academics-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-0 pb-0"
            >
              {/* Hero Section */}
              <section className="relative min-h-[480px] md:h-[60vh] pt-28 pb-12 md:pt-0 md:pb-0 flex items-center overflow-hidden">
                <img
                  alt="Academic Excellence"
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmVBar2wWuTQ1cs-taX5wiobOTbu5MwFBYgx0braF4gPXdcBGgNcu5rGbtNskQZ4Fz4F8Q24TYkVe1JHNGBbfBVWgmfFcwa5erJxnUHag75hOqkTHk1TYkMVi8KmdhXYvCGheu3-YJJsOfecKPjkYKXOi2HLCqLcqDmQCESHSwztflFMMBel2Rset3L6EVmwTHAqheHHhXzfCGWaxyUdTMs-1VB1oFPFz3bOV8eLUugzarhjHSnU13Vca6VPq5jW6nwW8OsfDZT7A_Ig"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-on-primary">
                  <div className="max-w-2xl">
                    <span className="font-label-md text-label-md uppercase tracking-widest text-secondary-container mb-2 block font-semibold text-xs text-secondary-container">
                      Excellence in Education
                    </span>
                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-3xl font-bold tracking-tight text-white leading-tight mb-4">
                      Nurturing Minds, <br />Building Futures.
                    </h1>
                    <p className="font-body-lg text-body-lg text-zinc-100 opacity-90 max-w-lg mb-8 leading-relaxed">
                      At My School, we combine traditional academic rigor with innovative thinking to prepare our students for a rapidly changing world.
                    </p>
                    <div className="flex gap-4">
                      <a
                        href="#curriculum"
                        className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-lg font-semibold hover:bg-secondary-fixed transition-all text-xs uppercase tracking-wider block"
                      >
                        Explore Programs
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* Curriculum Tabbed Section */}
              <section id="curriculum" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
                <div className="text-center mb-16">
                  <h2 className="font-headline-lg text-headline-lg text-primary mb-1">Curriculum Overview</h2>
                  <div className="h-1 w-20 bg-secondary mx-auto mb-6"></div>
                  <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto text-sm text-text-muted">
                    Explore our progressive learning journey designed for every stage of development.
                  </p>
                </div>
                
                {/* Tabs Control */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                  <button
                    onClick={() => setAcademicsSubTab('nursery')}
                    className={`px-6 py-3 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-300 border-2 border-transparent ${
                      academicsSubTab === 'nursery'
                        ? 'bg-secondary-container text-on-secondary-container font-bold'
                        : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                    }`}
                  >
                    Nursery School
                  </button>
                  <button
                    onClick={() => setAcademicsSubTab('primary')}
                    className={`px-6 py-3 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-300 border-2 border-transparent ${
                      academicsSubTab === 'primary'
                        ? 'bg-secondary-container text-on-secondary-container font-bold'
                        : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                    }`}
                  >
                    Primary School
                  </button>
                  <button
                    onClick={() => setAcademicsSubTab('secondary')}
                    className={`px-6 py-3 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-300 border-2 border-transparent ${
                      academicsSubTab === 'secondary'
                        ? 'bg-secondary-container text-on-secondary-container font-bold'
                        : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                    }`}
                  >
                    Secondary School
                  </button>
                </div>

                {/* Tab Content Panes */}
                <div className="relative min-h-[500px]">
                  <AnimatePresence mode="wait">
                    {academicsSubTab === 'nursery' && (
                      <motion.div
                        key="nursery"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
                      >
                        <div className="rounded-2xl overflow-hidden shadow-xl aspect-square relative">
                          <img
                            alt="Nursery School"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTEZgw8c1qciQOHLbODzgMNpScom4tC5vev_guveAIviVZl_34OsRa7v0Ypfvywz6dFYJJpt3DskBGrhbxJ98GCwTqWk_7SJO62JHJaenirjQ_jS6dUrRLfuCU6e_IcUtbvFGF3b3MztTaqOe4nb8RHE-De3QBWg2TsXtSm7zclJ2778XLaRxFeji14XGPmEl0_8ifPiUCkdNcKJcsYy4X6ivcsIGq1YOUFnadAY08ven6CeSezKKse_YcP90ltJPjWNsYFJUcTTs"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="space-y-6">
                          <div className="w-16 h-16 bg-primary-container text-secondary-fixed rounded-2xl flex items-center justify-center mb-4">
                            <Sparkles size={32} className="text-secondary-fixed" />
                          </div>
                          <h3 className="font-serif text-3xl font-bold text-primary mb-4">The Joy of Discovery</h3>
                          <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 text-sm text-text-muted leading-relaxed">
                            Our Nursery program provides a nurturing environment where the youngest learners begin their journey through play-based exploration and social development.
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                              <Palette className="text-secondary shrink-0" size={18} />
                              <div>
                                <h4 className="font-semibold text-primary text-xs uppercase tracking-wider mb-1">Creative Expression</h4>
                                <p className="font-body-sm text-on-surface-variant text-xs text-text-muted font-normal leading-relaxed">Fostering imagination through art, music, and dramatic play.</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Heart className="text-secondary shrink-0" size={18} />
                              <div>
                                <h4 className="font-semibold text-primary text-xs uppercase tracking-wider mb-1">Sensory Learning</h4>
                                <p className="font-body-sm text-on-surface-variant text-xs text-text-muted font-normal leading-relaxed">Hands-on activities that develop fine motor skills and curiosity.</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Users className="text-secondary shrink-0" size={18} />
                              <div>
                                <h4 className="font-semibold text-primary text-xs uppercase tracking-wider mb-1">Social Emotional</h4>
                                <p className="font-body-sm text-on-surface-variant text-xs text-text-muted font-normal leading-relaxed">Building confidence and empathy in a collaborative setting.</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <BookOpen className="text-secondary shrink-0" size={18} />
                              <div>
                                <h4 className="font-semibold text-primary text-xs uppercase tracking-wider mb-1">Early Literacy</h4>
                                <p className="font-body-sm text-on-surface-variant text-xs text-text-muted font-normal leading-relaxed">Introducing the magic of stories and foundational language skills.</p>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setActiveTab('Admissions');
                              setTimeout(() => {
                                const formSec = document.getElementById('apply');
                                if (formSec) {
                                  formSec.scrollIntoView({ behavior: 'smooth' });
                                }
                              }, 100);
                            }}
                            className="mt-8 bg-primary text-on-primary px-6 py-3 rounded-lg hover:bg-primary-container transition-all font-semibold text-xs uppercase tracking-wider"
                          >
                            Learn More About Nursery
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {academicsSubTab === 'primary' && (
                      <motion.div
                        key="primary"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
                      >
                        <div className="rounded-2xl overflow-hidden shadow-xl aspect-square relative">
                          <img
                            alt="Primary School"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBYlNtaBRuebu3RzVG2RqcOSmE_qvbnCAUBkayY3OlWwHM9646U74I6Vdv8lawzrak9NV2NheohkabOReplwbkKWckTYata9Tz5W7VeRWd44CQziAQTw6PMmsF-coBOJyvlCN8POA-u5J19ZBF9Yx4dZ_TyEZf4vIW2ytieTbaX5INNaNef00cIHLUrTdkoYpVEZ4VNoH-8LCFFUu6VmHQExgLAYOYbWg44mGXB9eSNbfFz8tlyQvi96QEP2-7fr_41vcHWe6Uu0Y"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="space-y-6">
                          <div className="w-16 h-16 bg-primary-container text-secondary-fixed rounded-2xl flex items-center justify-center mb-4">
                            <BookOpen size={32} className="text-secondary-fixed" />
                          </div>
                          <h3 className="font-serif text-3xl font-bold text-primary mb-4">Building Foundations</h3>
                          <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 text-sm text-text-muted leading-relaxed">
                            Our Primary program focuses on developing core competencies in literacy and numeracy while fostering a love for lifelong learning through inquiry.
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                              <Star className="text-secondary shrink-0" size={18} />
                              <div>
                                <h4 className="font-semibold text-primary text-xs uppercase tracking-wider mb-1">Singapore Math</h4>
                                <p className="font-body-sm text-on-surface-variant text-xs text-text-muted font-normal leading-relaxed">Deepening conceptual understanding through concrete-pictorial-abstract methods.</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Sparkles className="text-secondary shrink-0" size={18} />
                              <div>
                                <h4 className="font-semibold text-primary text-xs uppercase tracking-wider mb-1">Discovery Science</h4>
                                <p className="font-body-sm text-on-surface-variant text-xs text-text-muted font-normal leading-relaxed">Cultivating scientific thinking through hands-on laboratory experiments.</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <BookMarked className="text-secondary shrink-0" size={18} />
                              <div>
                                <h4 className="font-semibold text-primary text-xs uppercase tracking-wider mb-1">Literacy Focus</h4>
                                <p className="font-body-sm text-on-surface-variant text-xs text-text-muted font-normal leading-relaxed">Building strong communicative foundations in English and literature.</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <MapPin className="text-secondary shrink-0" size={18} />
                              <div>
                                <h4 className="font-semibold text-primary text-xs uppercase tracking-wider mb-1">Global Studies</h4>
                                <p className="font-body-sm text-on-surface-variant text-xs text-text-muted font-normal leading-relaxed">Exploring world cultures and geography to broaden perspectives.</p>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setActiveTab('Admissions');
                              setTimeout(() => {
                                const formSec = document.getElementById('apply');
                                if (formSec) {
                                  formSec.scrollIntoView({ behavior: 'smooth' });
                                }
                              }, 100);
                            }}
                            className="mt-8 bg-primary text-on-primary px-6 py-3 rounded-lg hover:bg-primary-container transition-all font-semibold text-xs uppercase tracking-wider"
                          >
                            Learn More About Primary
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {academicsSubTab === 'secondary' && (
                      <motion.div
                        key="secondary"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
                      >
                        <div className="rounded-2xl overflow-hidden shadow-xl aspect-square relative">
                          <img
                            alt="Secondary School"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF7LRSTvEetTjqjKYlaOj7NZKFpw2PwkyM60mHBkSVvfG7p_foG0MtQmaWHykfHU7AcpJskARgCUDx0OGsZHa3IQoBBf2uuZvED3GXmIASU9ujZIIjNgkt5pBhkVBRPkDBYy86B3wRsz_pgzA1I9nAdb2USWvt9apVKCQLvYmLvpkEKQW1-BmP4OmVcO5caXpCgn-spCQ0bjUHrfpJGDngZdZzJTE485QWhPbRA2j5lHucBjPOKtfu1tEPEXB018t3_StrlEiEIvo"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="space-y-6">
                          <div className="w-16 h-16 bg-primary-container text-secondary-fixed rounded-2xl flex items-center justify-center mb-4">
                            <School size={32} className="text-secondary-fixed" />
                          </div>
                          <h3 className="font-serif text-3xl font-bold text-primary mb-4">Preparing for Excellence</h3>
                          <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 text-sm text-text-muted leading-relaxed">
                            Our Secondary program bridges the transition to adulthood with rigorous academic pathways designed for global university readiness.
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                              <Award className="text-secondary shrink-0" size={18} />
                              <div>
                                <h4 className="font-semibold text-primary text-xs uppercase tracking-wider mb-1">AP &amp; IB Pathways</h4>
                                <p className="font-body-sm text-on-surface-variant text-xs text-text-muted font-normal leading-relaxed">College-level rigor preparing students for top-tier global universities.</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Users className="text-secondary shrink-0" size={18} />
                              <div>
                                <h4 className="font-semibold text-primary text-xs uppercase tracking-wider mb-1">Leadership</h4>
                                <p className="font-body-sm text-on-surface-variant text-xs text-text-muted font-normal leading-relaxed">Cultivating critical thinking and personal responsibility in every student.</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Star className="text-secondary shrink-0" size={18} />
                              <div>
                                <h4 className="font-semibold text-primary text-xs uppercase tracking-wider mb-1">Digital Literacy</h4>
                                <p className="font-body-sm text-on-surface-variant text-xs text-text-muted font-normal leading-relaxed">Mastering technology ethically for the 21st-century workforce.</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Sparkles className="text-secondary shrink-0" size={18} />
                              <div>
                                <h4 className="font-semibold text-primary text-xs uppercase tracking-wider mb-1">Career Guidance</h4>
                                <p className="font-body-sm text-on-surface-variant text-xs text-text-muted font-normal leading-relaxed">Personalized counseling for university applications and career paths.</p>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setActiveTab('Admissions');
                              setTimeout(() => {
                                const formSec = document.getElementById('apply');
                                if (formSec) {
                                  formSec.scrollIntoView({ behavior: 'smooth' });
                                }
                              }, 100);
                            }}
                            className="mt-8 bg-primary text-on-primary px-6 py-3 rounded-lg hover:bg-primary-container transition-all font-semibold text-xs uppercase tracking-wider"
                          >
                            Learn More About Secondary
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </section>

              {/* Special Programs Showcase */}
              <section className="bg-surface-container-low py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                      <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Signature Clubs</h2>
                      <p className="font-body-lg text-body-lg text-on-surface-variant text-sm text-text-muted leading-relaxed">
                        Beyond the classroom, we offer specialized tracks that cultivate unique talents and prepare students for diverse career paths.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('Student Life');
                      }}
                      className="font-semibold text-xs uppercase tracking-wider text-primary flex items-center gap-1.5 hover:gap-3 transition-all pb-1.5 border-b border-primary"
                    >
                      View All Clubs <ArrowRight size={16} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Arts Club */}
                    <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant hover:shadow-xl hover:-translate-y-1 transition-all group duration-300">
                      <div className="h-64 overflow-hidden relative">
                        <img
                          alt="Arts Club"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuASvmCSoswX-3ssr3y27o0mplmiEkUsFTdcoKmL3IHUx6wYcfnJ5j0GDsThnaviS1sd5xENODhYsnzCv7UWxM1F5C27-x8PiSnEeCMwAs0xR51Y8G1VRM6cCy1IVdGvLkiVelkVCXmFY50Z1Pn9ibLx0boLdXILxtOYgcgvbXQgd9OuZ1mCRu-6Ut9UA_aM-wgHNQhMT2AX2dX7EDkTInmA8K98J3YRvKZE-TBy35wUfPIc-Bmwg5Iu20lJaOfmS78Ru7kFT9ARU9s"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded font-semibold text-[10px] text-on-primary uppercase tracking-wider">ARTS &amp; DESIGN</div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-serif text-xl font-bold text-primary mb-2">Arts Club</h4>
                        <p className="font-body-sm text-body-sm text-text-muted mb-4 text-xs leading-relaxed">Fostering creativity through various mediums, from classical painting to contemporary digital design.</p>
                        <div className="flex items-center gap-3 pt-3 border-t border-outline-variant text-secondary">
                          <Palette size={18} />
                          <Sparkles size={18} />
                          <Award size={18} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Chess Club */}
                    <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant hover:shadow-xl hover:-translate-y-1 transition-all group duration-300">
                      <div className="h-64 overflow-hidden relative">
                        <img
                          alt="Chess Club"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQtHWvMvcTYFwO5XZWBEND6KB26fyrya4T-9JwdC6QmaNsG_81XS7zE0d2h4itsQMr_7essfPnlCHv9z4yLJlVFZWFAXVZvSKK6fg-bTTgqpa4P813AMg8Jd3FwFsOOveiACKb2-A0c95IxHrBf0uezBFckBnsCEZhDra8z8oKMk6wOIOGbIxNsQ11WPVDt9BMZZRFQOXUiB9F-CM_5nRxr_DNiJEkiGXh_0V6oyBlyaVkQ7iVic3rbg4Ygu_evlehpL03BwUtFdY"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded font-semibold text-[10px] text-on-primary uppercase tracking-wider">STRATEGY &amp; LOGIC</div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-serif text-xl font-bold text-primary mb-2">Chess Club</h4>
                        <p className="font-body-sm text-body-sm text-text-muted mb-4 text-xs leading-relaxed">Developing critical thinking, patience, and strategic planning through the timeless game of kings.</p>
                        <div className="flex items-center gap-3 pt-3 border-t border-outline-variant text-secondary">
                          <Star size={18} />
                          <Award size={18} />
                          <Users size={18} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Karate Club */}
                    <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant hover:shadow-xl hover:-translate-y-1 transition-all group duration-300">
                      <div className="h-64 overflow-hidden relative">
                        <img
                          alt="Karate Club"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlccstpdUxa8HeNHSfkzmjkjb7fv0EBECsgAS9z9DEhCDW4TocC5MSJtGOonywRs4vllQ-EF6EiYwklP47O6p81W4x2f6_y34msx6olqHNW2_BqMQYqopeRsgOpFqvK22Xwr6eH2j2NvcDtVRb1SqJU--QtidoHc_yiKnTK_NKcLfHTjvB2mAx5_WIXLXJB6pqlcpJyfgB6Y3jnfZfZ7KR6mXUMIy565K7PX2nHkCOsM9k4_vcBSzQmwRpOF6VYLoY2dlgMICEkho"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded font-semibold text-[10px] text-on-primary uppercase tracking-wider">PHYSICAL DISCIPLINE</div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-serif text-xl font-bold text-primary mb-2">Karate Club</h4>
                        <p className="font-body-sm text-body-sm text-text-muted mb-4 text-xs leading-relaxed">Building strength, focus, and character through traditional martial arts training and discipline.</p>
                        <div className="flex items-center gap-3 pt-3 border-t border-outline-variant text-secondary">
                          <Heart size={18} />
                          <Award size={18} />
                          <Users size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Faculty Spotlight */}
              <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-primary rounded-2xl overflow-hidden flex flex-col lg:flex-row shadow-2xl">
                  <div className="lg:w-1/2 h-96 lg:h-auto overflow-hidden relative">
                    <img
                      alt="Faculty Member"
                      className="w-full h-full object-cover absolute inset-0"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQGXgiXI4mLkJZ2h6G0C39-9L5bZaC3Ot9A6oorDd_FO3LWXlQVx2lUAmXXDpBsOIB-THxSRoEgzrvg2zEBJo8OwpVIHRP4c7bnSbC6binolxVwDDr-t0n5qDE54bYQZUyZJXt8mrexGgPOShIpqPGhxPMB-RIODemjlY6jSd1J-wJ7jnnLzl61iz4xVBKDXRS3A3W0uZ-4zFrj5HXR6YkiKGRcCDsajVP_9C0j8GSgOFSAb6ZZmL3j4_g24Z-BXtBMH9bC1tLv286yA"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-on-primary">
                    <span className="font-semibold text-xs tracking-widest text-secondary-fixed uppercase mb-4 block">Faculty Spotlight</span>
                    <h3 className="font-serif text-3xl font-bold mb-6 text-white leading-tight">Dr. Elizabeth Vance</h3>
                    <p className="font-body-lg text-body-lg text-zinc-200/90 mb-8 italic text-sm leading-relaxed">
                      "Education is not the filling of a pail, but the lighting of a fire. Our goal at My School is to ignite a lifelong passion for discovery in every student who walks through our doors."
                    </p>
                    <div className="space-y-4 text-xs">
                      <div className="flex items-center gap-3">
                        <Award size={18} className="text-secondary-fixed" />
                        <span className="font-medium text-zinc-100">PhD in Educational Psychology, Harvard University</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <BookMarked size={18} className="text-secondary-fixed" />
                        <span className="font-medium text-zinc-100">15+ Years in International Curricula Design</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowCounselorModal(true)}
                      className="mt-8 self-start bg-secondary-container text-on-secondary-container px-6 py-3 rounded-lg font-semibold hover:bg-secondary-fixed transition-all text-xs uppercase tracking-wider"
                    >
                      Meet Our Faculty
                    </button>
                  </div>
                </div>
              </section>

              {/* Ready to Begin */}
              <section className="py-20 bg-surface">
                <div className="max-w-4xl mx-auto px-4 text-center">
                  <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Ready to Begin the Journey?</h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 text-sm leading-relaxed text-text-muted">
                    Discover how My School can help your child achieve their full potential. Download our full curriculum prospectus or schedule a school tour today.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                      onClick={() => {
                        setShowQuickLinksModal(true);
                        setActiveQuickLinkTab('documents');
                      }}
                      className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all text-xs uppercase tracking-wider"
                    >
                      Download Prospectus
                    </button>
                    <button
                      onClick={() => setShowTourModal(true)}
                      className="border border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary-container hover:text-on-primary-container transition-all text-xs uppercase tracking-wider"
                    >
                      Book a School Tour
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* ==================== STUDENT LIFE TAB ==================== */}
          {activeTab === 'Student Life' && (
            <motion.div
              key="student-life-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-12 animate-fade-in"
            >
              {/* Hero Section */}
              <header className="relative py-24 bg-primary text-on-primary overflow-hidden min-h-[420px] flex items-center">
                <div className="absolute inset-0 opacity-20">
                  <img
                    className="w-full h-full object-cover"
                    alt="Vibrant Student Life"
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                  <div className="max-w-3xl border-l-4 border-secondary pl-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-secondary-container text-primary font-semibold text-[10px] tracking-widest uppercase shadow mb-4">
                      Vibrant &amp; Connected
                    </span>
                    <h1 id="bulletin-heading" className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight">
                      {bulletinClass === 'global' ? 'Campus Bulletin Board' : `Announcements for ${
                        bulletinClass === 'nursery-1' ? 'Nursery 1' :
                        bulletinClass === 'nursery-2' ? 'Nursery 2' :
                        bulletinClass === 'nursery-3' ? 'Nursery 3' :
                        bulletinClass === 'primary-1' ? 'Primary 1' :
                        bulletinClass === 'primary-2' ? 'Primary 2' :
                        bulletinClass === 'primary-3' ? 'Primary 3' :
                        bulletinClass === 'primary-4' ? 'Primary 4' :
                        bulletinClass === 'primary-5' ? 'Primary 5' :
                        bulletinClass === 'primary-6' ? 'Primary 6' :
                        bulletinClass === 'jss-1' ? 'JSS 1' :
                        bulletinClass === 'jss-2' ? 'JSS 2' :
                        bulletinClass === 'jss-3' ? 'JSS 3' :
                        bulletinClass === 'ss-1' ? 'SS 1' :
                        bulletinClass === 'ss-2' ? 'SS 2' :
                        bulletinClass === 'ss-3' ? 'SS 3' : 'Selected Class'
                      }`}
                    </h1>
                    <p className="font-body-lg text-body-lg text-zinc-100 opacity-90 max-w-2xl leading-relaxed">
                      Stay updated with the latest news, academic milestones, and community events from My School's vibrant campus life.
                    </p>
                  </div>
                </div>
              </header>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="flex flex-col lg:flex-row gap-8 sm:gap-12">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-64 space-y-8 shrink-0">
                  {/* Class Dropdown Selection */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-xs text-primary uppercase tracking-wider">Select Your Class</h3>
                    <div className="relative flex items-center">
                      <select
                        value={bulletinClass}
                        onChange={(e) => setBulletinClass(e.target.value)}
                        className="w-full border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary p-3 pr-10 text-xs sm:text-sm appearance-none bg-background cursor-pointer text-primary"
                      >
                        <option value="global">View Global Announcements</option>
                        <option value="nursery-1">Nursery 1</option>
                        <option value="nursery-2">Nursery 2</option>
                        <option value="nursery-3">Nursery 3</option>
                        <option value="primary-1">Primary 1</option>
                        <option value="primary-2">Primary 2</option>
                        <option value="primary-3">Primary 3</option>
                        <option value="primary-4">Primary 4</option>
                        <option value="primary-5">Primary 5</option>
                        <option value="primary-6">Primary 6</option>
                        <option value="jss-1">JSS 1</option>
                        <option value="jss-2">JSS 2</option>
                        <option value="jss-3">JSS 3</option>
                        <option value="ss-1">SS 1</option>
                        <option value="ss-2">SS 2</option>
                        <option value="ss-3">SS 3</option>
                      </select>
                      <ChevronDown size={18} className="absolute right-3 text-text-muted pointer-events-none" />
                    </div>
                  </div>

                  {/* Search input */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-xs text-primary uppercase tracking-wider">Search Bulletin</h3>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        placeholder="Keywords..."
                        value={bulletinSearch}
                        onChange={(e) => setBulletinSearch(e.target.value)}
                        className="w-full border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary p-3 pr-10 text-xs sm:text-sm bg-background text-primary"
                      />
                      <Search size={18} className="absolute right-3 text-text-muted pointer-events-none" />
                    </div>
                  </div>

                  {/* Categories sidebar filter */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-xs text-primary uppercase tracking-wider">Categories</h3>
                    <ul className="space-y-2">
                      <li>
                        <button
                          onClick={() => setBulletinCategory('All')}
                          className={`w-full flex items-center justify-between p-3 rounded-lg text-xs font-semibold ${
                            bulletinCategory === 'All'
                              ? 'bg-primary-container text-white'
                              : 'hover:bg-surface-container text-on-surface-variant bg-transparent transition-colors'
                          }`}
                        >
                          <span>All Categories</span>
                          <span className={`${bulletinCategory === 'All' ? 'bg-primary text-white' : 'bg-outline-variant text-[#1c1b1b]'} px-2 py-0.5 rounded text-[10px]`}>
                            24
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setBulletinCategory('Announcement')}
                          className={`w-full flex items-center justify-between p-3 rounded-lg text-xs font-semibold ${
                            bulletinCategory === 'Announcement'
                              ? 'bg-primary-container text-white'
                              : 'hover:bg-surface-container text-on-surface-variant bg-transparent transition-colors'
                          }`}
                        >
                          <span>Announcement</span>
                          <span className={`${bulletinCategory === 'Announcement' ? 'bg-primary text-white' : 'bg-outline-variant text-[#1c1b1b]'} px-2 py-0.5 rounded text-[10px]`}>
                            12
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setBulletinCategory('Event')}
                          className={`w-full flex items-center justify-between p-3 rounded-lg text-xs font-semibold ${
                            bulletinCategory === 'Event'
                              ? 'bg-primary-container text-white'
                              : 'hover:bg-surface-container text-on-surface-variant bg-transparent transition-colors'
                          }`}
                        >
                          <span>Event</span>
                          <span className={`${bulletinCategory === 'Event' ? 'bg-primary text-white' : 'bg-outline-variant text-[#1c1b1b]'} px-2 py-0.5 rounded text-[10px]`}>
                            8
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setBulletinCategory('Academic')}
                          className={`w-full flex items-center justify-between p-3 rounded-lg text-xs font-semibold ${
                            bulletinCategory === 'Academic'
                              ? 'bg-primary-container text-white'
                              : 'hover:bg-surface-container text-on-surface-variant bg-transparent transition-colors'
                          }`}
                        >
                          <span>Academic</span>
                          <span className={`${bulletinCategory === 'Academic' ? 'bg-primary text-white' : 'bg-outline-variant text-[#1c1b1b]'} px-2 py-0.5 rounded text-[10px]`}>
                            4
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Newsletter subscribe sidebar card */}
                  <div className="p-6 bg-secondary-container/10 rounded-xl border border-secondary/20">
                    <h4 className="font-serif text-lg font-bold text-primary mb-2">Subscribe</h4>
                    <p className="text-xs text-on-surface-variant mb-4 leading-relaxed text-text-muted">
                      Get the latest school updates delivered directly to your inbox weekly.
                    </p>
                    {bulletinSubscribed ? (
                      <div className="text-xs text-secondary-container font-semibold p-3 bg-primary/95 border border-secondary-container/30 rounded-lg text-center">
                        Successfully Subscribed!
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (bulletinEmail.trim()) {
                            setBulletinSubscribed(true);
                          }
                        }}
                        className="space-y-3"
                      >
                        <input
                          required
                          type="email"
                          placeholder="Your email address"
                          value={bulletinEmail}
                          onChange={(e) => setBulletinEmail(e.target.value)}
                          className="w-full text-xs p-2.5 bg-white border border-outline-variant rounded-lg text-primary focus:outline-none focus:ring-1 focus:ring-primary outline-none"
                        />
                        <button
                          type="submit"
                          className="w-full bg-secondary text-white px-4 py-2.5 rounded-lg font-semibold text-xs uppercase tracking-wider hover:bg-opacity-95 transition-colors cursor-pointer"
                        >
                          Sign Up
                        </button>
                      </form>
                    )}
                  </div>
                </aside>

                {/* Announcements Grid */}
                <div className="flex-grow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="announcements-grid">
                    {bulletinCards
                      .filter(card => {
                        const matchesCategory = bulletinCategory === 'All' || card.tag === bulletinCategory;
                        const matchesSearch = bulletinSearch === '' || 
                          card.title.toLowerCase().includes(bulletinSearch.toLowerCase()) || 
                          card.desc.toLowerCase().includes(bulletinSearch.toLowerCase());
                        const matchesClass = bulletinClass === 'global' || card.classes.includes(bulletinClass);
                        return matchesCategory && matchesSearch && matchesClass;
                      })
                      .map((card, index) => (
                        <article key={card.id || index} className="announcement-card bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col hover:shadow-[0px_4px_20px_rgba(0,33,71,0.08)] hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer">
                          <div className="h-48 overflow-hidden relative">
                            <img
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              src={card.img}
                              alt={card.title}
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="p-6 flex flex-col flex-grow space-y-4">
                            <div className="flex items-center justify-between">
                              <span className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase ${
                                card.tag === 'Event' ? 'bg-secondary-container text-secondary' : 'bg-surface-container text-primary'
                              }`}>
                                {card.tag}
                              </span>
                              <time className="text-[11px] font-mono text-text-muted">{card.date}</time>
                            </div>
                            <h2 className="font-serif text-lg font-bold text-primary group-hover:text-secondary transition-colors leading-snug">
                              {card.title}
                            </h2>
                            <p className="text-xs text-text-muted leading-relaxed flex-grow">
                              {card.desc}
                            </p>
                            <div className="text-primary font-semibold text-xs uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all pt-2 border-t border-surface-container">
                              Read More <ArrowRight size={14} className="text-secondary shrink-0" />
                            </div>
                          </div>
                        </article>
                      ))
                    }
                  </div>

                  {/* Loading Spinner */}
                  {isLoadingMore && (
                    <div className="mt-12 flex flex-col items-center justify-center space-y-4" id="loading-container">
                      <div className="w-10 h-10 border-4 border-outline-variant border-t-primary rounded-full loading-spinner"></div>
                      <p className="text-xs text-on-surface-variant font-medium">Loading more stories...</p>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </motion.div>
        )}

        </AnimatePresence>
      </main>

      {/* FOOTER COMPONENT */}
      <footer className="bg-primary text-on-primary border-t border-primary-container">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Col 1: bio info */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-serif text-xl font-bold tracking-tight text-white">My School</h4>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Empowering the next generation of global citizens through rigorous academics, creative development, and ethical leadership. Serving scholars since 1924.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Twitter_X', 'Facebook'].map((p, idx) => (
                <a
                  key={idx}
                  href={`#social-${p}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('Student Life');
                  }}
                  className="text-zinc-400 hover:text-secondary-container transition-colors text-xs font-mono font-semibold"
                >
                  {p}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h6 className="text-[11px] font-bold text-secondary-container uppercase tracking-widest">Quick Links</h6>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button onClick={() => { setActiveQuickLinkTab('faq'); setShowQuickLinksModal(true); }} className="hover:text-white hover:underline block text-left bg-transparent border-0 outline-none p-0 cursor-pointer">
                  Directory Map
                </button>
              </li>
              <li>
                <button onClick={() => setShowCounselorModal(true)} className="hover:text-white hover:underline block text-left bg-transparent border-0 outline-none p-0 cursor-pointer">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveQuickLinkTab('deadlines'); setShowQuickLinksModal(true); }} className="hover:text-white hover:underline block text-left bg-transparent border-0 outline-none p-0 cursor-pointer">
                  Campus Deadlines
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: legal */}
          <div className="lg:col-span-2 space-y-4">
            <h6 className="text-[11px] font-bold text-secondary-container uppercase tracking-widest">Resources</h6>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button onClick={() => { setActiveQuickLinkTab('documents'); setShowQuickLinksModal(true); }} className="hover:text-white hover:underline block text-left bg-transparent border-0 outline-none p-0 cursor-pointer">
                  Admission Docs
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveQuickLinkTab('faq'); setShowQuickLinksModal(true); }} className="hover:text-white hover:underline block text-left bg-transparent border-0 outline-none p-0 cursor-pointer">
                  Policy Guidelines
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveQuickLinkTab('deadlines'); setShowQuickLinksModal(true); }} className="hover:text-white hover:underline block text-left bg-transparent border-0 outline-none p-0 cursor-pointer">
                  Terms of Enrollment
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h6 className="text-[11px] font-bold text-secondary-container uppercase tracking-widest">Newsletter</h6>
            <p className="text-[11px] text-zinc-400 leading-normal">
              Subscribe to capture academic briefs, student features, and tournament announcements.
            </p>
            {newsletterSuccess ? (
              <div className="p-3 bg-secondary-container text-primary rounded text-xs font-semibold animate-scale-up">
                Successfully Subscribed! Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex rounded overflow-hidden border border-zinc-700 bg-primary">
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-3 py-2 w-full text-xs text-white placeholder-zinc-500 bg-primary outline-none focus:bg-primary-container"
                  id="newsletter-email-input"
                />
                <button
                  type="submit"
                  className="bg-secondary-container text-primary px-3 hover:bg-secondary-dim transition-all focus:outline-none"
                  id="newsletter-submit-btn"
                  aria-label="Submit newsletter subscription"
                >
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* copyright line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-zinc-500">
          <div>© 2024 My School. All rights reserved. Registered Educational Institution.</div>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:underline">Privacy Statement</a>
            <a href="#terms" className="hover:underline">Terms of Use</a>
          </div>
        </div>

      </footer>

      {/* RENDER ACTIVE MODALS COMPONENT INSTANCES */}
      
      {/* Book Tour Modal */}
      <BookTourModal
        isOpen={showTourModal}
        onClose={() => setShowTourModal(false)}
        onSubmit={handleTourSubmit}
      />

      {/* Counselor Call Modal */}
      <CounselorModal
        isOpen={showCounselorModal}
        onClose={() => setShowCounselorModal(false)}
        onSubmit={handleCounselorSubmit}
      />

      {/* Quick Links details Modal */}
      <AdmissionQuickLinksModal
        isOpen={showQuickLinksModal}
        onClose={() => {
          setShowQuickLinksModal(false);
        }}
        tab={activeQuickLinkTab}
        faqs={FAQS}
      />

      {/* Club detail dialogue */}
      <ClubDetailModal
        club={activeClub}
        isOpen={showClubModal}
        onClose={() => {
          setShowClubModal(false);
          setActiveClub(null);
        }}
        onJoin={handleJoinClub}
        isJoinedAlready={activeClub ? joinedClubIds.includes(activeClub.id) : false}
      />

      {/* Social Announcement detailed lightbox overlay */}
      <SocialDetailModal
        post={activeSocialPost}
        isOpen={showSocialModal}
        onClose={() => {
          setShowSocialModal(false);
          setActiveSocialPost(null);
        }}
        onLike={handleLikeSocialPost}
        onComment={handleCommentSocialPost}
        likedPosts={likedPostIds}
      />

      {/* Home Bento Grid Interactive Modals */}
      <AnimatePresence>
        {activeHomeModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-sm border border-surface-container shadow-2xl max-w-lg w-full overflow-hidden p-6 relative"
            >
              <button
                onClick={() => {
                  setActiveHomeModal(null);
                  setScienceRegistered(false);
                }}
                className="absolute top-4 right-4 text-text-muted hover:text-primary transition-colors p-1 hover:bg-neutral-100 rounded"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {activeHomeModal === 'stem' && (
                <div className="space-y-4">
                  <span className="bg-secondary-container text-primary font-bold text-[9px] w-fit px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    STEM &amp; Innovation Wing
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-primary">Blueprints for the Future</h3>
                  <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                    Opening Fall 2026, our new state-of-the-art 50,000 sq ft facility is designed to serve as an intellectual incubation lab:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-text-muted border-l border-secondary/30 pl-4">
                    <li><strong>Autonomous Robotics Ring:</strong> Testing arena for ground and aerial student robotics.</li>
                    <li><strong>Fabrication Lab:</strong> Comprehensive 3D-printing and modeling tooling suites.</li>
                    <li><strong>Clean Energy Core:</strong> Solar &amp; wind micro-grid tracking systems for environmental chemistry.</li>
                    <li><strong>Entrepreneurship Hubs:</strong> Collaborative conference rooms and startup staging fields.</li>
                  </ul>
                  <div className="pt-4 flex gap-3">
                    <button
                      onClick={() => {
                        setActiveHomeModal(null);
                        setShowTourModal(true);
                      }}
                      className="bg-primary text-white border border-transparent px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-all flex items-center gap-1"
                    >
                      <Calendar size={14} className="text-secondary" /> Book Campus Tour
                    </button>
                    <button
                      onClick={() => setActiveHomeModal(null)}
                      className="border border-surface-container bg-background hover:bg-neutral-50 px-4 py-2 rounded-sm text-xs font-semibold text-primary uppercase tracking-wider transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

              {activeHomeModal === 'science' && (
                <div className="space-y-4">
                  <span className="bg-secondary-container text-primary font-bold text-[9px] w-fit px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    School Event
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-primary">Annual Science Fair 2026</h3>
                  
                  {scienceRegistered ? (
                    <div className="space-y-4 py-4 text-center animate-scale-up">
                      <div className="w-12 h-12 bg-secondary-container text-primary rounded-full flex items-center justify-center mx-auto shadow">
                        <CheckCircle size={24} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif text-lg font-bold text-primary">Registration Completed!</h4>
                        <p className="text-text-muted text-xs">
                          Thank you for registering <span className="text-primary font-semibold">{scienceRegForm.name}</span>.
                        </p>
                      </div>
                      <div className="bg-neutral-50 p-3 rounded border border-surface-container font-mono text-center max-w-xs mx-auto">
                        <div className="text-[10px] text-text-muted uppercase tracking-wider">Your Entry Code</div>
                        <div className="text-lg font-bold text-secondary font-serif">{scienceRegId}</div>
                      </div>
                      <p className="text-[11px] text-text-muted leading-tight">
                        We sent a verification ticket and agenda schedule details to <span className="text-primary">{scienceRegForm.email}</span>.
                      </p>
                      <button
                        onClick={() => {
                          setScienceRegistered(false);
                          setScienceRegForm({ name: '', email: '', category: 'Software & Technology' });
                        }}
                        className="text-secondary hover:underline text-xs font-semibold"
                      >
                        Register another participant
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleScienceRegister} className="space-y-3">
                      <p className="text-text-muted text-xs leading-relaxed">
                        Register as an attendee or participant. Discover student research projects and interact with interactive experiments on Oct 24th.
                      </p>
                      
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-primary uppercase tracking-wider">Your Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Elizabeth Bennett"
                          value={scienceRegForm.name}
                          onChange={(e) => setScienceRegForm({ ...scienceRegForm, name: e.target.value })}
                          className="w-full px-3 py-2 border border-surface-container rounded bg-background text-xs text-primary focus:outline-none focus:border-secondary transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-primary uppercase tracking-wider">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="elizabeth@example.com"
                          value={scienceRegForm.email}
                          onChange={(e) => setScienceRegForm({ ...scienceRegForm, email: e.target.value })}
                          className="w-full px-3 py-2 border border-surface-container rounded bg-background text-xs text-primary focus:outline-none focus:border-secondary transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-primary uppercase tracking-wider">Category of Interest</label>
                        <select
                          value={scienceRegForm.category}
                          onChange={(e) => setScienceRegForm({ ...scienceRegForm, category: e.target.value })}
                          className="w-full px-3 py-2 border border-surface-container rounded bg-background text-xs text-primary focus:outline-none focus:border-secondary transition-all"
                        >
                          <option>Software &amp; Technology</option>
                          <option>Physics &amp; Engineering</option>
                          <option>Environmental Science</option>
                          <option>Biological Research</option>
                          <option>General Attendee</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-secondary-container hover:bg-secondary-dim text-primary py-2.5 rounded-sm font-bold text-xs uppercase tracking-wider transition-all mt-4"
                      >
                        Confirm Free Registration
                      </button>
                    </form>
                  )}
                </div>
              )}

              {activeHomeModal === 'library' && (
                <div className="space-y-4">
                  <span className="bg-secondary-container text-primary font-bold text-[9px] w-fit px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    School Resources
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-primary">Chancellor's Library Collections</h3>
                  <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                    Designed as a center for deep concentration and scholarship, the campus library archives have been updated with premier research suites and resources:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-text-muted border-l border-secondary/30 pl-4">
                    <li><strong>75,000 Volume Physical Catalog:</strong> Extensive core holdings in Classical literature, Mathematics, Historiography, and Biology.</li>
                    <li><strong>Global Research Catalog Database:</strong> Active high-speed access to digital libraries, scientific archives, and international publishing houses.</li>
                    <li><strong>Quiet Writing Zones:</strong> Elegant wood-crafted desk setups overlooking the campus botanical collections.</li>
                    <li><strong>Private Seminar Chambers:</strong> Acoustically safe environments for study reviews and scholastic debate teams.</li>
                  </ul>
                  <div className="pt-4 flex gap-3">
                    <button
                      onClick={() => {
                        setActiveHomeModal(null);
                        setShowCounselorModal(true);
                      }}
                      className="bg-primary text-white border border-transparent px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-all"
                    >
                      Talk to Learning Lead
                    </button>
                    <button
                      onClick={() => setActiveHomeModal(null)}
                      className="border border-surface-container bg-background hover:bg-neutral-50 px-4 py-2 rounded-sm text-xs font-semibold text-primary uppercase tracking-wider transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-secondary/90 transition-all z-[60] active:scale-95"
          id="back-to-top"
          aria-label="Back to Top"
        >
          <ArrowUp size={24} />
        </button>
      )}

    </div>
  );
}
