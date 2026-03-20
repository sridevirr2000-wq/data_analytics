import { Injectable, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// Declare WebKit Speech Recognition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  private recognition: any;
  private transcriptSubject = new Subject<string>();
  
  readonly isSupported = signal<boolean>(this.checkSupport());
  readonly isListening = signal<boolean>(false);

  constructor() {
    if (this.isSupported()) {
      this.initRecognition();
    }
  }

  private checkSupport(): boolean {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  }

  private initRecognition(): void {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.transcriptSubject.next(transcript);
      this.isListening.set(false);
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      this.isListening.set(false);
      
      if (event.error === 'no-speech') {
        this.transcriptSubject.error('No speech detected. Please try again.');
      } else {
        this.transcriptSubject.error(`Error: ${event.error}`);
      }
    };

    this.recognition.onend = () => {
      this.isListening.set(false);
    };
  }

  startListening(): Observable<string> {
    if (!this.isSupported()) {
      throw new Error('Speech recognition not supported in this browser');
    }

    this.isListening.set(true);
    this.recognition.start();
    
    return this.transcriptSubject.asObservable();
  }

  stopListening(): void {
    if (this.recognition && this.isListening()) {
      this.recognition.stop();
      this.isListening.set(false);
    }
  }
}
