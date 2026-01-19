
import { Teacher, Notice, Book, QuizQuestion } from './types';

export const TEACHERS: Teacher[] = [
  {
    id: '1',
    name: 'জনাব রাকিব হাসান',
    subject: 'গণিত ও উচ্চতর গণিত',
    experience: '৮ বছরের অভিজ্ঞতা',
    education: 'BUET - CSE',
    image: 'https://images.unsplash.com/photo-1556155099-490a1ba16284?w=400'
  },
  {
    id: '2',
    name: 'শ্রীমতি ফারিয়া আক্তার',
    subject: 'ইংরেজি সাহিত্য',
    experience: '৬ বছরের অভিজ্ঞতা',
    education: 'ঢাকা বিশ্ববিদ্যালয়',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400'
  },
  {
    id: '3',
    name: 'মোঃ আশরাফুল আলম',
    subject: 'পদার্থবিজ্ঞান ও রসায়ন',
    experience: '১০ বছরের অভিজ্ঞতা',
    education: 'রাজশাহী বিশ্ববিদ্যালয়',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'
  }
];

export const NOTICES: Notice[] = [
  {
    id: '1',
    title: 'পরীক্ষার রুটিন প্রকাশ',
    content: 'আগামী মাসের প্রথম সপ্তাহ থেকে বার্ষিক পরীক্ষা শুরু হবে। বিস্তারিত রুটিন অফিস থেকে সংগ্রহ করুন।',
    date: '১৯ জানুয়ারি, ২০২৬',
    type: 'urgent'
  },
  {
    id: '2',
    title: 'নতুন বই বিতরণ উৎসব',
    content: 'সপ্তম ও অষ্টম শ্রেণির নতুন পাঠ্যপুস্তক আগামী রবিবার সকাল ১০টায় বিতরণ করা হবে।',
    date: '১৮ জানুয়ারি, ২০২৬',
    type: 'general'
  },
  {
    id: '3',
    title: 'উপজেলা বিজ্ঞান মেলা ২০২৬',
    content: 'বিজ্ঞান মেলায় আমাদের বিদ্যালয়ের স্টল পরিদর্শনের জন্য সকলকে আমন্ত্রণ জানানো হচ্ছে।',
    date: '১৫ জানুয়ারি, ২০২৬',
    type: 'event'
  }
];

export const LIBRARY_BOOKS: Book[] = [
  { id: 'b1', title: 'বিজ্ঞান - ৭ম শ্রেণি', class: '৭ম', format: 'PDF', thumbnail: 'https://picsum.photos/seed/science7/200/300' },
  { id: 'b2', title: 'ইংরেজি - ৭ম শ্রেণি', class: '৭ম', format: 'PDF', thumbnail: 'https://picsum.photos/seed/english7/200/300' },
  { id: 'b3', title: 'গণিত - ৮ম শ্রেণি', class: '৮ম', format: 'PDF', thumbnail: 'https://picsum.photos/seed/math8/200/300' },
  { id: 'b4', title: 'ডিজিটাল প্রযুক্তি', class: '৯ম', format: 'EPUB', thumbnail: 'https://picsum.photos/seed/tech9/200/300' }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'বাংলাদেশের জাতীয় স্মৃতিসৌধের স্থপতি কে?',
    options: ['মাইনুল হোসেন', 'হামিদুর রহমান', 'শামসুল ইসলাম', 'আব্দুর রউফ'],
    correctAnswer: 0
  },
  {
    id: 2,
    question: 'সূর্য থেকে পৃথিবীতে আলো আসতে কত সময় লাগে?',
    options: ['৫ মিনিট', '৮ মিনিট ২০ সেকেন্ড', '১০ মিনিট', '৩ মিনিট'],
    correctAnswer: 1
  },
  {
    id: 3,
    question: 'কম্পিউটারের মস্তিষ্ক বলা হয় কোন অংশকে?',
    options: ['RAM', 'Monitor', 'CPU', 'Hard Disk'],
    correctAnswer: 2
  }
];
