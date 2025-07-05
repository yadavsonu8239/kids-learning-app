export interface User {
  id: string;
  name: string;
  age: number;
  ageGroup: 'pre-birth' | '0-2' | '3-5' | '6-10';
  language: 'en' | 'es' | 'fr';
  completedQuizzes: string[];
  completedVideos: string[];
  totalScore: number;
  badges: string[];
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  description: string;
  ageGroup: 'pre-birth' | '0-2' | '3-5' | '6-10';
  questions: Question[];
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'voice';
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  audioUrl?: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: 'DIY' | 'Brain Dev' | 'Inventions';
  ageGroup: 'pre-birth' | '0-2' | '3-5' | '6-10';
  thumbnailUrl: string;
  videoUrl: string;
  relatedQuizzes: string[];
  tags: string[];
}

export interface QuizResult {
  quizId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: Date;
  timeSpent: number;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
}

export interface AppState {
  user: User | null;
  currentQuiz: Quiz | null;
  currentVideo: Video | null;
  quizResults: QuizResult[];
  isLoading: boolean;
  error: string | null;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  isActive: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirements: string;
  earned: boolean;
}

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export interface FilterOptions {
  ageGroups: string[];
  categories: string[];
  difficulty?: string[];
} 