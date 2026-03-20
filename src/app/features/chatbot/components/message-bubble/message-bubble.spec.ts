import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageBubble } from './message-bubble';
import { ChatMessage, MessageType } from '../../../../shared/models/message.model';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('MessageBubble', () => {
  let component: MessageBubble;
  let fixture: ComponentFixture<MessageBubble>;

  const userMessage: ChatMessage = {
    id: '1',
    content: 'Hello',
    type: MessageType.USER,
    timestamp: new Date()
  };

  const botMessage: ChatMessage = {
    id: '2',
    content: 'Hi there!',
    type: MessageType.BOT,
    timestamp: new Date()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageBubble],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageBubble);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.message = userMessage;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should return true for isUser when message type is USER', () => {
    component.message = userMessage;
    expect(component.isUser).toBeTrue();
    expect(component.isBot).toBeFalse();
  });

  it('should return true for isBot when message type is BOT', () => {
    component.message = botMessage;
    expect(component.isBot).toBeTrue();
    expect(component.isUser).toBeFalse();
  });

  it('should render message content', () => {
    component.message = userMessage;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Hello');
  });
});
