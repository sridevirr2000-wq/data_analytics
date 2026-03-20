import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-typing-indicator',
  standalone: true,
  imports: [],
  templateUrl: './typing-indicator.html',
  styleUrl: './typing-indicator.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class TypingIndicator {
    dots = Array(3);
}
