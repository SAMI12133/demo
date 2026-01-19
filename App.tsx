
import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  Users, 
  Info, 
  MessageSquare, 
  Bell, 
  BrainCircuit, 
  Search,
  Download,
  ChevronRight,
  Sparkles,
  Send,
  MapPin,
  Calendar,
  Award,
  Monitor,
  Trophy,
  History,
  Target,
  GraduationCap,
  ShieldCheck,
  Globe,
  Star,
  BookMarked,
  CheckCircle,
  Library
} from 'lucide-react';
import { TEACHERS, NOTICES, LIBRARY_BOOKS, QUIZ_QUESTIONS } from './constants';
import { geminiService } from './geminiService';

type Tab = 'home' | 'school' | 'teachers' | 'library' | 'quiz' | 'notice' | 'assistant';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot', text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleQuizAnswer = (index: number) => {
    if (index === QUIZ_QUESTIONS[quizStep].correctAnswer) {
      setQuizScore(prev => prev + 1);
    }
    
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);

    const response = await geminiService.askQuestion(userMsg);
    setChatHistory(prev => [...prev, { role: 'bot', text: response }]);
    setIsTyping(false);
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizScore(0);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Dynamic Header */}
      <header className="gradient-animate text-white py-24 px-4 relative overflow-hidden text-center shadow-xl">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-md px-6 py-1.5 rounded-full text-sm font-semibold mb-6 border border-white/30">
            ✨ উপজেলা বিজ্ঞান মেলা ২০২৬ ডেমো প্রজেক্ট
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight drop-shadow-2xl">
            বলইবুনিয়া <span className="text-pink-200">মাধ্যমিক বিদ্যালয়</span>
          </h1>
          <p className="text-xl md:text-3xl opacity-90 max-w-3xl mx-auto font-medium leading-relaxed">
            শিক্ষা, একতা ও প্রগতির মূলমন্ত্রে দীক্ষিত বাগেরহাটের এক অনন্য বিদ্যাপীঠ।
          </p>
          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setActiveTab('assistant')}
              className="bg-white text-indigo-700 px-10 py-4 rounded-2xl font-bold text-xl hover:scale-105 transition shadow-2xl flex items-center gap-3"
            >
              <Sparkles className="w-6 h-6" />
              স্মার্ট অ্যাসিস্ট্যান্টকে প্রশ্ন করুন
            </button>
            <button 
              onClick={() => setActiveTab('school')}
              className="bg-indigo-900/40 backdrop-blur-md border border-white/30 px-10 py-4 rounded-2xl font-bold text-xl hover:bg-white/10 transition"
            >
              বিদ্যালয় সম্পর্কে বিস্তারিত জানুন
            </button>
          </div>
        </div>
      </header>

      {/* Persistent Sticky Navbar */}
      <nav className="sticky top-0 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700 z-50 text-white shadow-lg overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          <div className="hidden lg:block font-black text-2xl py-4 pr-8 border-r border-slate-700 text-indigo-400">
            বলইবুনিয়া বিদ্যালয়
          </div>
          <div className="flex gap-2 py-3 overflow-x-auto">
            {[
              { id: 'home', icon: <Home />, label: 'হোম' },
              { id: 'school', icon: <Info />, label: 'বিদ্যালয় তথ্য' },
              { id: 'teachers', icon: <Users />, label: 'শিক্ষকবৃন্দ' },
              { id: 'library', icon: <BookOpen />, label: 'লাইব্রেরি' },
              { id: 'quiz', icon: <BrainCircuit />, label: 'কুইজ' },
              { id: 'notice', icon: <Bell />, label: 'নোটিশ' },
              { id: 'assistant', icon: <MessageSquare />, label: 'AI সাহায্য' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'hover:bg-white/10 text-slate-300'
                }`}
              >
                {React.cloneElement(tab.icon as React.ReactElement, { size: 18 })}
                <span className="font-bold text-sm md:text-base">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto w-full p-4 md:p-8">
        {activeTab === 'home' && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-slate-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full -mr-48 -mt-48 blur-3xl opacity-60"></div>
               <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                 <div>
                    <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest mb-6 inline-block">Welcome to our School</span>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.15]">
                      আলোকিত মানুষ গড়ার <br/>
                      <span className="text-indigo-600">এক অনন্য পাঠশালা</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
                      বলইবুনিয়া মাধ্যমিক বিদ্যালয় বাগেরহাট জেলার মোরলগঞ্জ উপজেলার একটি স্বনামধন্য শিক্ষা প্রতিষ্ঠান। আমরা প্রথাগত শিক্ষার পাশাপাশি নৈতিকতা ও শিক্ষার্থীদের সৃজনশীল মেধা বিকাশে বিশ্বাসী। এই ডিজিটাল ডেমো প্রজেক্টটি আমাদের বিদ্যালয়ের প্রযুক্তিগত অগ্রগতির একটি ক্ষুদ্র প্রতিফলন।
                    </p>
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-100 text-green-600 rounded-2xl">
                          <ShieldCheck size={28}/>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 leading-none mb-1">সুশৃঙ্খল ক্যাম্পাস</h4>
                          <p className="text-sm text-slate-500">নিরাপদ ও মনোমুগ্ধকর পরিবেশ</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                          <Globe size={28}/>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 leading-none mb-1">স্মার্ট লক্ষ্য</h4>
                          <p className="text-sm text-slate-500">ডিজিটাল যুগের চ্যালেঞ্জ মোকাবিলা</p>
                        </div>
                      </div>
                    </div>
                 </div>
                 <div className="relative">
                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 bg-slate-200 aspect-video md:aspect-square">
                      <img src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800" alt="Education" className="w-full h-full object-cover"/>
                    </div>
                 </div>
               </div>
            </section>
          </div>
        )}

        {activeTab === 'school' && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
             {/* Extended School Profile Section */}
             <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-slate-100 relative overflow-hidden">
               <div className="absolute -left-20 -top-20 w-80 h-80 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
               
               <div className="relative z-10 text-center mb-16">
                 <h2 className="text-4xl md:text-7xl font-black mb-6 text-slate-900">
                   বলইবুনিয়া <span className="text-indigo-600">মাধ্যমিক বিদ্যালয়</span>
                 </h2>
                 <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
                   বাগেরহাট জেলার একটি ঐতিহ্যের ধারক বিদ্যাপীঠ, যা দীর্ঘ সময় ধরে জ্ঞানের আলো ছড়িয়ে যাচ্ছে।
                 </p>
               </div>
               
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                 {/* Main Content Area */}
                 <div className="lg:col-span-8 space-y-12">
                   <div className="space-y-6">
                     <div className="flex items-center gap-4 text-indigo-600">
                        <History size={32} className="stroke-[2.5]"/>
                        <h3 className="text-3xl font-black">আমাদের সমৃদ্ধ ইতিহাস</h3>
                     </div>
                     <p className="text-xl text-slate-600 leading-[1.9] text-justify">
                       বলইবুনিয়া মাধ্যমিক বিদ্যালয় এই অঞ্চলের একটি প্রাচীন ও স্বনামধন্য শিক্ষা প্রতিষ্ঠান। স্থানীয় বিদ্যুৎসাহী ও সমাজসেবক ব্যক্তিবর্গের ঐকান্তিক প্রচেষ্টায় এই প্রতিষ্ঠানটি তার যাত্রা শুরু করে। প্রতিষ্ঠার পর থেকেই বিদ্যালয়টি মানসম্মত শিক্ষা প্রদানের মাধ্যমে অসংখ্য কৃতি শিক্ষার্থী তৈরি করেছে যারা দেশ ও জাতির উন্নয়নে গুরুত্বপূর্ণ অবদান রেখে চলেছেন। আমাদের বিদ্যালয়টি শুধুমাত্র পুঁথিগত বিদ্যা নয়, বরং শিক্ষার্থীদের চারিত্রিক উৎকর্ষ সাধনেও অগ্রণী ভূমিকা পালন করে আসছে।
                     </p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-4">
                        <div className="flex items-center gap-3 text-pink-600">
                           <Target size={28} className="stroke-[2.5]"/>
                           <h4 className="text-2xl font-bold">আমাদের লক্ষ্য ও উদ্দেশ্য</h4>
                        </div>
                        <ul className="space-y-4 text-lg text-slate-600">
                          <li className="flex gap-3">
                            <CheckCircle className="text-indigo-500 shrink-0 mt-1" size={20}/>
                            <span>আধুনিক বিজ্ঞানমনস্ক ও প্রযুক্তি নির্ভর শিক্ষা নিশ্চিত করা।</span>
                          </li>
                          <li className="flex gap-3">
                            <CheckCircle className="text-indigo-500 shrink-0 mt-1" size={20}/>
                            <span>নৈতিক মূল্যবোধ ও দেশপ্রেমে উদ্বুদ্ধ সুনাগরিক গড়ে তোলা।</span>
                          </li>
                          <li className="flex gap-3">
                            <CheckCircle className="text-indigo-500 shrink-0 mt-1" size={20}/>
                            <span>শিক্ষার্থীদের মাঝে সৃজনশীল চিন্তার বিকাশ ঘটানো।</span>
                          </li>
                        </ul>
                     </div>
                     <div className="space-y-4">
                        <div className="flex items-center gap-3 text-emerald-600">
                           <Award size={28} className="stroke-[2.5]"/>
                           <h4 className="text-2xl font-bold">শিক্ষার মনোরম পরিবেশ</h4>
                        </div>
                        <p className="text-lg text-slate-600 leading-relaxed">
                          আমাদের বিদ্যালয়ে রয়েছে বিশাল খেলার মাঠ, পর্যাপ্ত আলো-বাতাস সম্পন্ন শ্রেণিকক্ষ এবং অভিজ্ঞ একদল নিবেদিতপ্রাণ শিক্ষক। সুন্দর ও নিরিবিলি পরিবেশে শিক্ষার্থীরা পড়ালেখায় মনোনিবেশ করতে পারে, যা তাদের একাডেমিক ফলাফলে ইতিবাচক প্রভাব ফেলে।
                        </p>
                     </div>
                   </div>

                   <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-inner">
                     <div className="flex items-center gap-4 mb-6">
                        <Monitor size={28} className="text-indigo-600"/>
                        <h4 className="text-2xl font-bold text-slate-900">ডিজিটাল কার্যক্রম</h4>
                     </div>
                     <p className="text-lg text-slate-600 leading-relaxed">
                       যুগের চাহিদা মাথায় রেখে আমরা শ্রেণিকক্ষে প্রজেক্টর এবং মাল্টিমিডিয়া পদ্ধতিতে পাঠদান শুরু করেছি। আমাদের বিদ্যালয়ের তথ্য ও যোগাযোগ প্রযুক্তি (ICT) ল্যাবটি পর্যায়ক্রমে আরও আধুনিক করা হচ্ছে। শিক্ষার্থীদের অনলাইন উপস্থিতি এবং ফলাফল ব্যবস্থাপনা প্রক্রিয়াকে ডিজিটালাইজ করার লক্ষ্যে আমরা কাজ করছি।
                     </p>
                   </div>
                 </div>

                 {/* Sidebar Info Area */}
                 <div className="lg:col-span-4 space-y-8">
                    <div className="bg-indigo-600 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                       <div className="absolute right-0 bottom-0 opacity-10 -mr-10 -mb-10 group-hover:scale-110 transition-transform">
                          <Star size={200}/>
                       </div>
                       <h4 className="text-2xl font-black mb-8 border-b border-white/20 pb-4">বিদ্যালয় প্রোফাইল</h4>
                       <div className="space-y-6">
                          <div>
                             <p className="text-sm uppercase tracking-widest text-white/60 mb-1">EIIN নম্বর</p>
                             <p className="text-xl font-bold">১২৩৪৫৬৭৮৯০</p>
                          </div>
                          <div>
                             <p className="text-sm uppercase tracking-widest text-white/60 mb-1">প্রতিষ্ঠা</p>
                             <p className="text-xl font-bold">মোরলগঞ্জের প্রাচীনতম বিদ্যাপীঠ</p>
                          </div>
                          <div>
                             <p className="text-sm uppercase tracking-widest text-white/60 mb-1">অবস্থান</p>
                             <p className="text-xl font-bold">মোরলগঞ্জ, বাগেরহাট</p>
                          </div>
                          <div>
                             <p className="text-sm uppercase tracking-widest text-white/60 mb-1">বিভাগ</p>
                             <p className="text-xl font-bold">খুলনা</p>
                          </div>
                       </div>
                    </div>

                    <div className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white h-80 relative group">
                       <img src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=600" alt="Campus View" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                       <p className="absolute bottom-6 left-6 text-white font-bold">শান্ত ও নির্মল ক্যাম্পাস</p>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-100 flex flex-col items-center text-center">
                       <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-4">
                          <Trophy size={32}/>
                       </div>
                       <h5 className="font-bold text-slate-900">গৌরবময় ফলাফল</h5>
                       <p className="text-sm text-slate-500 mt-2">প্রতি বছর এসএসসি পরীক্ষায় আমাদের শিক্ষার্থীরা উপজেলার সেরা ফলাফল অর্জন করছে।</p>
                    </div>
                 </div>
               </div>

               {/* Vision Blocks Section */}
               <div className="mt-20 pt-20 border-t border-slate-100">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                    <div className="bg-indigo-50/50 p-10 rounded-[3rem] border border-indigo-100/50">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6 shadow-sm">
                        <Users size={32}/>
                      </div>
                      <h4 className="text-xl font-bold mb-4">অভিজ্ঞ শিক্ষক</h4>
                      <p className="text-slate-600">আমাদের বিদ্যালয়ে একদল দক্ষ ও আন্তরিক শিক্ষক রয়েছেন যারা প্রতিটি শিক্ষার্থীর উন্নয়নে ব্যক্তিগতভাবে নজর দেন।</p>
                    </div>
                    <div className="bg-pink-50/50 p-10 rounded-[3rem] border border-pink-100/50">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-pink-600 mx-auto mb-6 shadow-sm">
                        <BookMarked size={32}/>
                      </div>
                      <h4 className="text-xl font-bold mb-4">সমৃদ্ধ পাঠাগার</h4>
                      <p className="text-slate-600">শিক্ষার্থীদের জ্ঞানের পরিধি বাড়াতে বিদ্যালয়ে রয়েছে বিভিন্ন ধরনের বই সমৃদ্ধ একটি লাইব্রেরি ও পাঠ কক্ষ।</p>
                    </div>
                    <div className="bg-emerald-50/50 p-10 rounded-[3rem] border border-emerald-100/50">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-6 shadow-sm">
                        <Star size={32}/>
                      </div>
                      <h4 className="text-xl font-bold mb-4">সাংস্কৃতিক চর্চা</h4>
                      <p className="text-slate-600">বিতর্ক প্রতিযোগিতা, বার্ষিক ক্রীড়া ও সাংস্কৃতিক অনুষ্ঠানের মাধ্যমে শিক্ষার্থীদের মেধা বিকাশের সুযোগ দেওয়া হয়।</p>
                    </div>
                  </div>
               </div>
             </div>
          </div>
        )}

        {activeTab === 'teachers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in zoom-in-95">
            {TEACHERS.map(teacher => (
              <div key={teacher.id} className="bg-white rounded-3xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all border border-slate-100">
                <div className="h-72 overflow-hidden relative">
                  <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-slate-800 mb-1">{teacher.name}</h3>
                  <p className="text-indigo-600 font-bold mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                    {teacher.subject}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-500">
                       <GraduationCap size={18}/>
                       <span className="text-sm font-medium">{teacher.education}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                       <Award size={18}/>
                       <span className="text-sm font-medium">{teacher.experience}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'library' && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
              <h2 className="text-4xl font-black text-slate-900">ডিজিটাল লাইব্রেরি আর্কাইভ</h2>
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-4 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="বইয়ের নাম বা শ্রেণি দিয়ে খুঁজুন..." 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {LIBRARY_BOOKS.map(book => (
                <div key={book.id} className="bg-white p-5 rounded-[2rem] shadow-md hover:shadow-2xl transition-all border border-slate-100 group">
                  <div className="h-64 bg-slate-100 rounded-2xl mb-5 overflow-hidden relative">
                    <img src={book.thumbnail} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-indigo-900/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-xl">
                        <Download size={20} /> ডাউনলোড
                      </button>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 line-clamp-1 px-1">{book.title}</h3>
                  <div className="flex justify-between items-center mt-3 px-1">
                    <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full uppercase">{book.class} শ্রেণি</span>
                    <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase">{book.format}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto animate-in zoom-in-95 py-10">
            {!showResult ? (
              <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-indigo-50">
                <div className="flex justify-between items-center mb-10">
                  <span className="text-indigo-600 font-black text-lg">প্রশ্ন {quizStep + 1}/{QUIZ_QUESTIONS.length}</span>
                  <div className="w-40 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-600 to-pink-500 transition-all duration-700" 
                      style={{ width: `${((quizStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-10 leading-tight">{QUIZ_QUESTIONS[quizStep].question}</h2>
                <div className="space-y-4">
                  {QUIZ_QUESTIONS[quizStep].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuizAnswer(i)}
                      className="w-full text-left p-5 rounded-[1.5rem] border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all font-bold flex items-center group relative overflow-hidden"
                    >
                      <span className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-indigo-600 mr-5 group-hover:bg-indigo-600 group-hover:text-white transition-all text-xl">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-lg">{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white p-16 rounded-[3rem] shadow-2xl text-center border border-green-50">
                <div className="w-28 h-28 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <Trophy size={56} />
                </div>
                <h2 className="text-4xl font-black mb-4 text-slate-900">দারুণ খেলেছেন!</h2>
                <p className="text-slate-500 text-xl mb-10">আপনার অর্জিত স্কোর: <span className="font-black text-indigo-600 text-5xl">{quizScore}/{QUIZ_QUESTIONS.length}</span></p>
                <button 
                  onClick={resetQuiz}
                  className="bg-indigo-600 text-white px-12 py-4 rounded-2xl font-black text-xl hover:bg-indigo-700 transition shadow-xl"
                >
                  আবার চেষ্টা করুন
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'notice' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-6">
            <h2 className="text-4xl font-black text-slate-900 mb-10 flex items-center gap-4">
              <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg"><Bell /></div>
              নোটিশ বোর্ড
            </h2>
            {NOTICES.map(notice => (
              <div 
                key={notice.id} 
                className={`bg-white p-8 rounded-[2rem] shadow-md border-l-[12px] hover:translate-x-2 transition-all group ${
                  notice.type === 'urgent' ? 'border-red-500' : 
                  notice.type === 'event' ? 'border-indigo-500' : 'border-emerald-500'
                }`}
              >
                <div className="flex justify-between items-start mb-5">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${
                    notice.type === 'urgent' ? 'bg-red-50 text-red-600 border border-red-100' : 
                    notice.type === 'event' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  }`}>
                    {notice.type === 'urgent' ? 'জরুরি' : notice.type === 'event' ? 'ইভেন্ট' : 'সাধারণ'}
                  </span>
                  <span className="text-slate-400 text-sm font-bold flex items-center gap-2">
                    <Calendar size={14}/>
                    {notice.date}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors">{notice.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{notice.content}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'assistant' && (
          <div className="max-w-4xl mx-auto h-[700px] bg-white rounded-[3rem] shadow-2xl flex flex-col border border-indigo-50 overflow-hidden animate-in zoom-in-95">
            <div className="bg-indigo-600 text-white p-8 flex items-center justify-between shadow-lg relative z-10">
               <div className="flex items-center gap-4">
                 <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                   <Sparkles size={28}/>
                 </div>
                 <div>
                   <h3 className="font-black text-2xl leading-none mb-1">Smart Assistant</h3>
                   <span className="text-xs font-bold opacity-80 uppercase tracking-widest flex items-center gap-1">
                     <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                     Online AI Helper
                   </span>
                 </div>
               </div>
            </div>

            <div className="flex-grow p-8 overflow-y-auto space-y-6 bg-slate-50/50">
              {chatHistory.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center px-10">
                  <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 border border-indigo-100">
                    <MessageSquare size={48} className="text-indigo-200" />
                  </div>
                  <p className="text-2xl font-black text-slate-800 mb-2">আমি কিভাবে সাহায্য করতে পারি?</p>
                  <p className="text-slate-500 max-w-sm">বলইবুনিয়া বিদ্যালয়, লাইব্রেরি, শিক্ষকবৃন্দ বা পড়ালেখা নিয়ে যেকোনো প্রশ্ন জিজ্ঞাসা করুন।</p>
                </div>
              )}
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                  <div className={`max-w-[85%] px-6 py-4 rounded-[2rem] shadow-sm text-lg ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-100' 
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white px-6 py-4 rounded-[2rem] rounded-tl-none border border-slate-100 shadow-sm flex gap-1.5 items-center">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleChat} className="p-6 bg-white border-t border-slate-100 flex gap-3">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="আপনার প্রশ্নটি এখানে লিখুন..." 
                className="flex-grow px-8 py-5 bg-slate-50 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-medium text-lg border border-slate-200"
              />
              <button 
                type="submit"
                disabled={isTyping}
                className="bg-indigo-600 text-white w-16 h-16 rounded-2xl hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center shadow-lg hover:scale-105 active:scale-95"
              >
                <Send size={24} />
              </button>
            </form>
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-white py-20 px-4 mt-20 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full -mr-48 -mb-48 blur-[120px] opacity-20"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
          <div className="text-center md:text-left">
            <h4 className="text-3xl font-black mb-8 text-indigo-400 uppercase tracking-wider">বলইবুনিয়া বিদ্যালয়</h4>
            <p className="text-slate-400 text-lg leading-relaxed">বাগেরহাট জেলার একটি আদর্শ শিক্ষা প্রতিষ্ঠান। আমরা আগামী প্রজন্মের দক্ষ ও সুনাগরিক গড়ে তুলতে নিরলসভাবে কাজ করে যাচ্ছি।</p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-xl font-black mb-8 border-b border-slate-800 pb-2 inline-block">দ্রুত যোগাযোগ</h4>
            <div className="text-slate-400 space-y-4 text-lg">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <MapPin className="text-indigo-400" size={20}/>
                <span>মোরলগঞ্জ, বাগেরহাট, খুলনা</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Send className="text-indigo-400" size={20}/>
                <span>info@boloibunia-high.edu.bd</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Bell className="text-indigo-400" size={20}/>
                <span>+৮৮০ ১৭০০-০০০০০০</span>
              </div>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-xl font-black mb-8 border-b border-slate-800 pb-2 inline-block">বিজ্ঞান মেলা ২০২৬</h4>
            <p className="text-slate-400 mb-6">এই প্রজেক্টটি উপজেলা বিজ্ঞান মেলা ২০২৬-এর জন্য একটি আধুনিক ডিজিটাল প্ল্যাটফর্মের ডেমো হিসেবে তৈরি করা হয়েছে।</p>
            <div className="flex justify-center md:justify-start gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer"><Globe size={20}/></div>
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer"><Users size={20}/></div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-20 pt-10 text-center">
           <p className="text-slate-500 font-bold mb-2">© ২০২৬ বলইবুনিয়া মাধ্যমিক বিদ্যালয় • সর্বস্বত্ব সংরক্ষিত</p>
           <p className="text-slate-600 text-xs">প্রজেক্ট ডেভেলপমেন্ট: <span className="text-indigo-400 font-black">তালহা</span></p>
        </div>
      </footer>
    </div>
  );
};

export default App;
