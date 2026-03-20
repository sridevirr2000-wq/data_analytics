import { Component, ViewChild, ElementRef, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotService } from '../../services/chatbot.service';
import { MessageBubble } from '../message-bubble/message-bubble';
import { MessageInput } from '../message-input/message-input';
import { TypingIndicator } from '../typing-indicator/typing-indicator';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [
    CommonModule,
    MessageBubble,
    MessageInput,
    TypingIndicator
  ],
  templateUrl: './chat-container.html',
  styleUrl: './chat-container.scss',
})
export class ChatContainer {
    private chatbotService = inject(ChatbotService);
  
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  messages = this.chatbotService.messages;
  isTyping = this.chatbotService.isTyping;
  messageCount = this.chatbotService.messageCount;

  constructor() {
    // Auto-scroll when messages change
    effect(() => {
      this.messages();
      this.isTyping();
      
      setTimeout(() => this.scrollToBottom(), 100);
    });
  }

  onSendMessage(content: string): void {
    this.chatbotService.sendMessage(content);
  }

  startNewChat(): void {
    this.chatbotService.clearMessages();
  }

  private scrollToBottom(): void {
    if (this.messageContainer) {
      const element = this.messageContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }
}
