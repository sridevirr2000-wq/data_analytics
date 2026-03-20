import { Component, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VoiceButton } from '../voice-button/voice-button';


@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [CommonModule, FormsModule, VoiceButton],
  templateUrl: './message-input.html',
  styleUrl: './message-input.scss',
})
export class MessageInput {
  @Output() messageSent = new EventEmitter<string>();

  messageText = signal<string>('');

  onSend(): void {
    const text = this.messageText().trim();
    if (text) {
      this.messageSent.emit(text);
      this.messageText.set('');
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSend();
    }
  }

  onTranscriptReady(transcript: string): void {
    this.messageText.set(transcript);
  }

}
