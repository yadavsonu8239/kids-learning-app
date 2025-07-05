import { Quiz, Video } from '@/types';

export const mockQuizzes: Quiz[] = [
  {
    id: 'colors-quiz',
    title: 'Colors & Shapes',
    category: 'Basic Learning',
    description: 'Learn about colors and basic shapes',
    ageGroup: '3-5',
    difficulty: 'easy',
    icon: '🎨',
    questions: [
      {
        id: 'q1',
        text: 'What color do you get when you mix red and yellow?',
        type: 'multiple-choice',
        options: ['Orange', 'Purple', 'Green', 'Blue'],
        correctAnswer: 'Orange',
        explanation: 'Red and yellow make orange!'
      },
      {
        id: 'q2',
        text: 'How many sides does a triangle have?',
        type: 'multiple-choice',
        options: ['2', '3', '4', '5'],
        correctAnswer: '3',
        explanation: 'A triangle has 3 sides!'
      },
      {
        id: 'q3',
        text: 'What shape is a ball?',
        type: 'voice',
        correctAnswer: 'circle',
        explanation: 'A ball is round like a circle!'
      }
    ]
  },
  {
    id: 'animals-quiz',
    title: 'Animal Friends',
    category: 'Nature',
    description: 'Learn about different animals',
    ageGroup: '3-5',
    difficulty: 'easy',
    icon: '🦁',
    questions: [
      {
        id: 'q1',
        text: 'What sound does a cow make?',
        type: 'voice',
        correctAnswer: 'moo',
        explanation: 'Cows say moo!'
      },
      {
        id: 'q2',
        text: 'Which animal is known as the king of the jungle?',
        type: 'multiple-choice',
        options: ['Tiger', 'Lion', 'Elephant', 'Monkey'],
        correctAnswer: 'Lion',
        explanation: 'The lion is called the king of the jungle!'
      },
      {
        id: 'q3',
        text: 'How many legs does a spider have?',
        type: 'multiple-choice',
        options: ['6', '8', '10', '4'],
        correctAnswer: '8',
        explanation: 'Spiders have 8 legs!'
      }
    ]
  },
  {
    id: 'numbers-quiz',
    title: 'Fun with Numbers',
    category: 'Math',
    description: 'Basic counting and numbers',
    ageGroup: '3-5',
    difficulty: 'easy',
    icon: '🔢',
    questions: [
      {
        id: 'q1',
        text: 'What comes after 5?',
        type: 'multiple-choice',
        options: ['4', '6', '7', '3'],
        correctAnswer: '6',
        explanation: 'After 5 comes 6!'
      },
      {
        id: 'q2',
        text: 'How many fingers do you have on one hand?',
        type: 'voice',
        correctAnswer: 'five',
        explanation: 'You have 5 fingers on one hand!'
      },
      {
        id: 'q3',
        text: 'What is 2 + 2?',
        type: 'multiple-choice',
        options: ['3', '4', '5', '6'],
        correctAnswer: '4',
        explanation: '2 + 2 = 4!'
      }
    ]
  },
  {
    id: 'science-quiz',
    title: 'Little Scientists',
    category: 'Science',
    description: 'Fun science facts for kids',
    ageGroup: '6-10',
    difficulty: 'medium',
    icon: '🔬',
    questions: [
      {
        id: 'q1',
        text: 'What do plants need to grow?',
        type: 'multiple-choice',
        options: ['Water and sunlight', 'Only water', 'Only sunlight', 'Nothing'],
        correctAnswer: 'Water and sunlight',
        explanation: 'Plants need water and sunlight to grow!'
      },
      {
        id: 'q2',
        text: 'How many planets are in our solar system?',
        type: 'multiple-choice',
        options: ['7', '8', '9', '10'],
        correctAnswer: '8',
        explanation: 'There are 8 planets in our solar system!'
      },
      {
        id: 'q3',
        text: 'What is the fastest land animal?',
        type: 'voice',
        correctAnswer: 'cheetah',
        explanation: 'The cheetah is the fastest land animal!'
      }
    ]
  }
];

export const mockVideos: Video[] = [
  {
    id: 'colors-video',
    title: 'Learning Colors with Fun',
    description: 'A colorful adventure learning about different colors',
    duration: 300, // 5 minutes
    category: 'Brain Dev',
    ageGroup: '3-5',
    thumbnailUrl: 'https://img.youtube.com/vi/tkJDkZdtSjk/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/tkJDkZdtSjk?autoplay=1&rel=0&modestbranding=1',
    relatedQuizzes: ['colors-quiz'],
    tags: ['colors', 'basic learning', 'fun']
  },
  {
    id: 'animals-video',
    title: 'Animal Safari Adventure',
    description: 'Explore the wild and learn about amazing animals',
    duration: 420, // 7 minutes
    category: 'Brain Dev',
    ageGroup: '3-5',
    thumbnailUrl: 'https://img.youtube.com/vi/hFZFjoX2cGg/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/hFZFjoX2cGg?autoplay=1&rel=0&modestbranding=1',
    relatedQuizzes: ['animals-quiz'],
    tags: ['animals', 'nature', 'safari']
  },
  {
    id: 'numbers-video',
    title: 'Counting Fun with Numbers',
    description: 'Learn to count from 1 to 10 with fun activities',
    duration: 360, // 6 minutes
    category: 'Brain Dev',
    ageGroup: '3-5',
    thumbnailUrl: 'https://img.youtube.com/vi/DR-cfDsHCGA/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/DR-cfDsHCGA?autoplay=1&rel=0&modestbranding=1',
    relatedQuizzes: ['numbers-quiz'],
    tags: ['numbers', 'counting', 'math']
  },
  {
    id: 'diy-slime',
    title: 'Make Your Own Slime',
    description: 'Easy DIY slime recipe for kids',
    duration: 480, // 8 minutes
    category: 'DIY',
    ageGroup: '6-10',
    thumbnailUrl: 'https://img.youtube.com/vi/1HVfHLULaZE/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/1HVfHLULaZE?autoplay=1&rel=0&modestbranding=1',
    relatedQuizzes: ['science-quiz'],
    tags: ['DIY', 'slime', 'experiment']
  },
  {
    id: 'paper-airplane',
    title: 'Perfect Paper Airplane',
    description: 'Learn to fold the perfect paper airplane',
    duration: 240, // 4 minutes
    category: 'DIY',
    ageGroup: '6-10',
    thumbnailUrl: 'https://img.youtube.com/vi/JV2aMbGtmZE/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/JV2aMbGtmZE?autoplay=1&rel=0&modestbranding=1',
    relatedQuizzes: ['science-quiz'],
    tags: ['DIY', 'paper airplane', 'craft']
  },
  {
    id: 'solar-system',
    title: 'Journey Through Space',
    description: 'Explore planets and learn about our solar system',
    duration: 600, // 10 minutes
    category: 'Brain Dev',
    ageGroup: '6-10',
    thumbnailUrl: 'https://img.youtube.com/vi/libKVRa01L8/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/libKVRa01L8?autoplay=1&rel=0&modestbranding=1',
    relatedQuizzes: ['science-quiz'],
    tags: ['space', 'planets', 'science']
  },
  {
    id: 'inventions-video',
    title: 'Amazing Kid Inventions',
    description: 'Discover incredible inventions made by kids',
    duration: 540, // 9 minutes
    category: 'Inventions',
    ageGroup: '6-10',
    thumbnailUrl: 'https://img.youtube.com/vi/J7S6FZA8FPo/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/J7S6FZA8FPo?autoplay=1&rel=0&modestbranding=1',
    relatedQuizzes: ['science-quiz'],
    tags: ['inventions', 'creativity', 'innovation']
  }
];

export const quizCategories = [
  { id: 'basic-learning', name: 'Basic Learning', icon: '📚', color: 'bg-blue-500' },
  { id: 'nature', name: 'Nature', icon: '🌿', color: 'bg-green-500' },
  { id: 'math', name: 'Math', icon: '🔢', color: 'bg-purple-500' },
  { id: 'science', name: 'Science', icon: '🔬', color: 'bg-orange-500' },
  { id: 'arts', name: 'Arts & Crafts', icon: '🎨', color: 'bg-pink-500' },
  { id: 'music', name: 'Music', icon: '🎵', color: 'bg-yellow-500' }
];

export const videoCategories = [
  { id: 'brain-dev', name: 'Brain Dev', icon: '🧠', color: 'bg-indigo-500' },
  { id: 'diy', name: 'DIY', icon: '🔨', color: 'bg-red-500' },
  { id: 'inventions', name: 'Inventions', icon: '💡', color: 'bg-amber-500' }
];

export const ageGroups = [
  { id: 'pre-birth', name: 'Pre-birth', icon: '👶', color: 'bg-pink-200' },
  { id: '0-2', name: '0-2 years', icon: '🍼', color: 'bg-blue-200' },
  { id: '3-5', name: '3-5 years', icon: '🧸', color: 'bg-green-200' },
  { id: '6-10', name: '6-10 years', icon: '🎒', color: 'bg-yellow-200' }
];

export const badges = [
  { id: 'first-quiz', name: 'First Quiz Complete', icon: '🏆', description: 'Complete your first quiz!' },
  { id: 'quiz-master', name: 'Quiz Master', icon: '🎯', description: 'Complete 10 quizzes!' },
  { id: 'high-scorer', name: 'High Scorer', icon: '⭐', description: 'Earn 100 points!' },
  { id: 'video-watcher', name: 'Video Watcher', icon: '📺', description: 'Watch 5 videos!' },
  { id: 'learning-star', name: 'Learning Star', icon: '🌟', description: 'Complete 5 quizzes and watch 3 videos!' }
]; 