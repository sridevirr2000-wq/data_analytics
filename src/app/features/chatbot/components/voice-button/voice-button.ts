import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeechRecognitionService } from '../../services/speech-recognition.service';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-voice-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voice-button.html',
  styleUrl: './voice-button.scss',
})
export class VoiceButton {
  private speechService = inject(SpeechRecognitionService);
  
  @Output() transcriptReady = new EventEmitter<string>();

  isSupported = this.speechService.isSupported;
  isListening = this.speechService.isListening;

  toggleVoiceInput(): void {
    if (!this.isSupported()) {
      alert('Speech recognition is not supported in your browser. Please try Chrome or Edge.');
      return;
    }

    if (this.isListening()) {
      this.speechService.stopListening();
    } else {
      this.speechService.startListening()
      .pipe(take(1))
      .subscribe({
        next: (transcript) => {
          this.transcriptReady.emit(transcript);
        },
        error: (error) => {
          console.error('Speech recognition error:', error);
          alert('Failed to recognize speech. Please try again.');
        }
      });
    }
  }

}
