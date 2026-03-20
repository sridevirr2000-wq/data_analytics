import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessage, MessageType } from '../../../../shared/models/message.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-message-bubble',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-bubble.html',
  styleUrl: './message-bubble.scss',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class MessageBubble {
  @Input({ required: true }) message!: ChatMessage;

  get isUser(): boolean {
    return this.message.type === MessageType.USER;
  }

  get isBot(): boolean {
    return this.message.type === MessageType.BOT;
  }
}
