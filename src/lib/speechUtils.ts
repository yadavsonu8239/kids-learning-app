// Type declarations for Web Speech API
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionConstructor {
  new(): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

// Text-to-Speech utilities
export class TextToSpeech {
  private synthesis: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[];

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.voices = [];
    this.loadVoices();
  }

  private loadVoices() {
    this.voices = this.synthesis.getVoices();
    if (this.voices.length === 0) {
      // Wait for voices to load
      setTimeout(() => this.loadVoices(), 100);
    }
  }

  speak(text: string, options: { rate?: number; pitch?: number; volume?: number } = {}) {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find a suitable voice (prefer child-friendly voices)
    const preferredVoice = this.voices.find(voice => 
      voice.lang.startsWith('en') && 
      (voice.name.includes('child') || voice.name.includes('kid') || voice.name.includes('young'))
    ) || this.voices.find(voice => voice.lang.startsWith('en')) || this.voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = options.rate || 0.8; // Slower for kids
    utterance.pitch = options.pitch || 1.2; // Higher pitch for kids
    utterance.volume = options.volume || 1;

    this.synthesis.speak(utterance);
  }

  stop() {
    this.synthesis.cancel();
  }

  pause() {
    this.synthesis.pause();
  }

  resume() {
    this.synthesis.resume();
  }

  isSupported() {
    return 'speechSynthesis' in window;
  }
}

// Speech-to-Text utilities
export class SpeechToText {
  private recognition: SpeechRecognition | null;
  private isListening: boolean = false;
  private onResult: ((transcript: string, confidence: number) => void) | null = null;
  private onError: ((error: string) => void) | null = null;

  constructor() {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
    } else if ('SpeechRecognition' in window) {
      this.recognition = new (window as any).SpeechRecognition();
    } else {
      this.recognition = null;
    }

    if (this.recognition) {
      this.setupRecognition();
    }
  }

  private setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0];
      if (result.isFinal && this.onResult) {
        this.onResult(result[0].transcript, result[0].confidence);
      }
    };

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      this.isListening = false;
      if (this.onError) {
        this.onError(event.error);
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };
  }

  startListening(
    onResult: (transcript: string, confidence: number) => void,
    onError?: (error: string) => void
  ) {
    if (!this.recognition) {
      onError?.('Speech recognition not supported');
      return;
    }

    this.onResult = onResult;
    this.onError = onError || null;

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (error) {
      onError?.('Failed to start speech recognition');
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  isSupported() {
    return this.recognition !== null;
  }

  getIsListening() {
    return this.isListening;
  }
}

// Helper function to format time
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Helper function to check if answer is correct (for voice answers)
export function isAnswerCorrect(userAnswer: string, correctAnswer: string): boolean {
  const normalizedUser = userAnswer.toLowerCase().trim();
  const normalizedCorrect = correctAnswer.toLowerCase().trim();
  
  // Direct match
  if (normalizedUser === normalizedCorrect) return true;
  
  // Check if user answer contains the correct answer
  if (normalizedUser.includes(normalizedCorrect)) return true;
  
  // Check for common variations
  const variations: { [key: string]: string[] } = {
    'circle': ['round', 'circular'],
    'triangle': ['three sides', '3 sides'],
    'square': ['four sides', '4 sides'],
    'moo': ['moo moo', 'cow sound'],
    'five': ['5', 'five fingers'],
    'cheetah': ['fastest cat', 'spotted cat']
  };
  
  if (variations[normalizedCorrect]) {
    return variations[normalizedCorrect].some(variation => 
      normalizedUser.includes(variation)
    );
  }
  
  return false;
}

// Create singleton instances
export const textToSpeech = new TextToSpeech();
export const speechToText = new SpeechToText(); 