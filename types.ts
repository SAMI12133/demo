
export interface Teacher {
  id: string;
  name: string;
  subject: string;
  experience: string;
  education: string;
  image: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'urgent' | 'general' | 'event';
}

export interface Book {
  id: string;
  title: string;
  class: string;
  format: string;
  thumbnail: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}
