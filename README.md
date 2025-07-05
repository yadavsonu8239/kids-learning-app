# Kids Learning App 🚀

A fun and interactive educational app designed for children, featuring voice-enabled quizzes, educational videos, and gamification elements to make learning engaging and accessible.

## ✨ Features

### 🏠 Home Screen
- **Welcome Interface**: Clean, kid-friendly design with large, colorful buttons
- **Progress Tracking**: Shows user stats including completed quizzes, videos watched, and total points
- **Quick Access**: Direct navigation to Quizzes and Videos

### 🎯 Interactive Quizzes
- **Multiple Choice Questions**: Traditional quiz format with visual feedback
- **Voice-Enabled Questions**: Perfect for kids who can't read yet
  - Text-to-speech for reading questions aloud
  - Speech-to-text for voice answers
- **Real-time Feedback**: Immediate responses with explanations
- **Progress Tracking**: Visual progress bars and completion indicators

### 📺 Educational Videos
- **Video Library**: Categorized educational content
- **Age-Appropriate Filtering**: Content filtered by age groups (Pre-birth, 0-2, 3-5, 6-10)
- **Category Filtering**: DIY, Brain Development, Inventions
- **Search Functionality**: Find videos by title, description, or tags
- **Linked Learning**: Automatic quiz suggestions after video completion

### 🏆 Gamification System
- **Star Ratings**: Score-based star system for quiz performance
- **Badges & Achievements**: Unlock badges for various milestones
- **Celebration Animations**: Fun animations for completed activities
- **Progress Tracking**: Comprehensive stats and achievement history

### 🎤 Accessibility Features
- **Voice Support**: Full text-to-speech and speech-to-text integration
- **Large Touch Targets**: Kid-friendly button sizes
- **Visual Feedback**: Clear visual indicators for all interactions
- **Audio Feedback**: Sound effects and voice responses

### 📱 Navigation
- **Always-Visible Footer**: Easy navigation between main sections
- **Intuitive Icons**: Clear visual indicators for each section
- **Breadcrumb Navigation**: Easy way to track location in the app

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 with App Router
- **Styling**: Tailwind CSS for responsive design
- **State Management**: Zustand for global state
- **Icons**: Heroicons for consistent iconography
- **Voice Features**: Browser Web Speech API
- **Storage**: LocalStorage for user progress (MVP)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository** (if you haven't already created it)
```bash
git clone <your-repo-url>
cd kids-learning-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### First Time Setup

1. **Create a Profile**: On first visit, you'll be prompted to create a user profile
2. **Choose Age & Language**: Select appropriate age group and preferred language
3. **Start Learning**: Begin with quizzes or videos based on your age group

## 📱 App Structure

### Routes
- `/` - Home screen with main navigation
- `/quizzes` - Quiz category selection
- `/quiz/[id]` - Individual quiz taking interface
- `/quiz/[id]/result` - Quiz results with celebration
- `/videos` - Video library with filtering
- `/videos/[id]` - Video player with suggestions
- `/settings` - User profile and settings management

### Components
- **Button**: Reusable button with multiple variants and animations
- **QuizCard**: Interactive quiz preview cards
- **VideoCard**: Video preview with metadata
- **ScoreStars**: Star rating system with animations
- **FooterNav**: Always-visible bottom navigation
- **AgeFilterBar**: Age-based content filtering
- **CategoryFilterBar**: Category-based content filtering

## 🎮 How to Use

### Taking Quizzes
1. Navigate to **Quizzes** from the home screen
2. Choose a quiz category that interests you
3. For **Multiple Choice**: Select your answer from the options
4. For **Voice Questions**: 
   - Click "Listen" to hear the question
   - Click "Start Recording" to record your answer
   - Submit your voice response
5. Get immediate feedback and explanations
6. See your final score with star ratings

### Watching Videos
1. Go to **Videos** from the home screen
2. Use filters to find content by age or category
3. Click on any video to start watching
4. Track your progress with the built-in progress bar
5. Get suggested related quizzes after completion

### Earning Badges
- **First Quiz Complete**: Complete your first quiz
- **Quiz Master**: Complete 10 quizzes
- **High Scorer**: Earn 100 total points
- **Video Watcher**: Watch 5 videos
- **Learning Star**: Complete 5 quizzes and watch 3 videos

## 🔧 Customization

### Adding New Content

#### Adding Quizzes
Edit `src/data/mockData.ts` and add new quiz objects to the `mockQuizzes` array:

```javascript
{
  id: 'new-quiz',
  title: 'New Quiz Title',
  category: 'Category Name',
  description: 'Quiz description',
  ageGroup: '3-5', // or '0-2', '6-10', 'pre-birth'
  difficulty: 'easy', // or 'medium', 'hard'
  icon: '🎨',
  questions: [
    {
      id: 'q1',
      text: 'Question text here?',
      type: 'multiple-choice', // or 'voice'
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctAnswer: 'Option 1',
      explanation: 'Explanation of the correct answer'
    }
  ]
}
```

#### Adding Videos
Add new video objects to the `mockVideos` array:

```javascript
{
  id: 'new-video',
  title: 'Video Title',
  description: 'Video description',
  duration: 300, // in seconds
  category: 'Brain Dev', // or 'DIY', 'Inventions'
  ageGroup: '3-5',
  thumbnailUrl: '/thumbnails/video.jpg',
  videoUrl: 'https://youtube.com/embed/video-id',
  relatedQuizzes: ['quiz-id'],
  tags: ['tag1', 'tag2']
}
```

## 🎨 Styling Guide

The app uses Tailwind CSS with a kid-friendly color scheme:
- **Primary Colors**: Purple and Pink gradients
- **Secondary Colors**: Blue, Green, Yellow for categories
- **Interactive Elements**: Hover effects, scale animations
- **Fun Elements**: Floating animations, celebration effects

## 🔊 Voice Features

### Text-to-Speech
- Automatically reads quiz questions aloud
- Adjustable rate and pitch for kid-friendly voices
- Click "Listen" button on any quiz question

### Speech-to-Text
- Record voice answers for quiz questions
- Works in modern browsers with microphone access
- Confidence scoring for answer accuracy

### Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Limited speech recognition
- Safari: Basic support
- Mobile: Varies by device and browser

## 🚧 Future Enhancements

### Phase 2 Features
- **User Authentication**: Multi-user support with cloud sync
- **Advanced Analytics**: Detailed progress tracking and insights  
- **Adaptive Learning**: AI-powered content recommendations
- **Social Features**: Share achievements with friends
- **Offline Support**: Download content for offline learning
- **Parent Dashboard**: Progress monitoring for parents
- **More Languages**: Multi-language support expansion

### Technical Improvements
- **Real Video Player**: Integration with actual video hosting
- **Database Integration**: Replace mock data with real backend
- **Advanced Animations**: More sophisticated celebration effects
- **Progressive Web App**: Mobile app capabilities
- **Accessibility Enhancements**: Screen reader support, keyboard navigation

## 🤝 Contributing

This is a prototype/demo application. For production use, consider:
1. Implementing proper user authentication
2. Setting up a backend API
3. Adding comprehensive testing
4. Implementing proper video hosting
5. Adding error boundaries and loading states
6. Setting up analytics and monitoring

## 📄 License

This project is created as a demonstration/prototype for educational purposes.

## 🆘 Support & Troubleshooting

### Common Issues

**Voice features not working:**
- Ensure microphone permissions are granted
- Check browser compatibility
- Try using Chrome for best support

**App not loading:**
- Verify Node.js version (18+)
- Clear browser cache and try again
- Check console for any error messages

**Quiz progress not saving:**
- Check if localStorage is enabled in your browser
- Progress is currently stored locally and will reset if cache is cleared

---

**Enjoy learning and have fun! 🎉📚🌟**
#   t a s k  
 