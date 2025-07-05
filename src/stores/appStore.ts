import { create } from 'zustand';
import { User, Quiz, Video, QuizResult, AppState } from '@/types';

interface AppStore extends AppState {
  // User actions
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  clearUser: () => void;
  
  // Quiz actions
  setCurrentQuiz: (quiz: Quiz) => void;
  addQuizResult: (result: QuizResult) => void;
  clearCurrentQuiz: () => void;
  
  // Video actions
  setCurrentVideo: (video: Video) => void;
  clearCurrentVideo: () => void;
  markVideoComplete: (videoId: string) => void;
  
  // UI state actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Progress tracking
  getCompletedQuizzes: () => string[];
  getCompletedVideos: () => string[];
  getTotalScore: () => number;
  getUserBadges: () => string[];
  
  // Achievements
  checkAndAwardBadges: () => void;
  awardBadge: (badgeId: string) => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  // Initial state
  user: null,
  currentQuiz: null,
  currentVideo: null,
  quizResults: [],
  isLoading: false,
  error: null,

  // User actions
  setUser: (user) => set({ user }),
  
  updateUser: (updates) => 
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null
    })),
  
  clearUser: () => set({ user: null }),

  // Quiz actions
  setCurrentQuiz: (quiz) => set({ currentQuiz: quiz }),
  
  addQuizResult: (result) => {
    set((state) => ({
      quizResults: [...state.quizResults, result]
    }));
    
    // Update user's completed quizzes and total score
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        completedQuizzes: [...currentUser.completedQuizzes, result.quizId],
        totalScore: currentUser.totalScore + result.score
      };
      set({ user: updatedUser });
    }
    
    // Check for new badges
    get().checkAndAwardBadges();
  },
  
  clearCurrentQuiz: () => set({ currentQuiz: null }),

  // Video actions
  setCurrentVideo: (video) => set({ currentVideo: video }),
  
  clearCurrentVideo: () => set({ currentVideo: null }),
  
  markVideoComplete: (videoId) => {
    const currentUser = get().user;
    if (currentUser && !currentUser.completedVideos.includes(videoId)) {
      const updatedUser = {
        ...currentUser,
        completedVideos: [...currentUser.completedVideos, videoId]
      };
      set({ user: updatedUser });
    }
  },

  // UI state actions
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),

  // Progress tracking
  getCompletedQuizzes: () => get().user?.completedQuizzes || [],
  
  getCompletedVideos: () => get().user?.completedVideos || [],
  
  getTotalScore: () => get().user?.totalScore || 0,
  
  getUserBadges: () => get().user?.badges || [],

  // Achievements
  checkAndAwardBadges: () => {
    const state = get();
    const user = state.user;
    if (!user) return;

    const completedQuizzes = user.completedQuizzes.length;
    const totalScore = user.totalScore;
    const completedVideos = user.completedVideos.length;

    // Define badge requirements
    const badgeRequirements = [
      { id: 'first-quiz', condition: completedQuizzes >= 1, name: 'First Quiz Complete' },
      { id: 'quiz-master', condition: completedQuizzes >= 10, name: 'Quiz Master' },
      { id: 'high-scorer', condition: totalScore >= 100, name: 'High Scorer' },
      { id: 'video-watcher', condition: completedVideos >= 5, name: 'Video Watcher' },
      { id: 'learning-star', condition: completedQuizzes >= 5 && completedVideos >= 3, name: 'Learning Star' }
    ];

    // Check and award new badges
    badgeRequirements.forEach(badge => {
      if (badge.condition && !user.badges.includes(badge.id)) {
        get().awardBadge(badge.id);
      }
    });
  },
  
  awardBadge: (badgeId) => {
    const currentUser = get().user;
    if (currentUser && !currentUser.badges.includes(badgeId)) {
      const updatedUser = {
        ...currentUser,
        badges: [...currentUser.badges, badgeId]
      };
      set({ user: updatedUser });
    }
  }
})); 