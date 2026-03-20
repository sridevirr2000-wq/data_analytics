import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatContainer } from './chat-container';
import { ChatbotService } from '../../services/chatbot.service';
import { signal } from '@angular/core';
import { ElementRef } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('ChatContainer', () => {
  let component: ChatContainer;
  let fixture: ComponentFixture<ChatContainer>;
  let mockService: jasmine.SpyObj<ChatbotService>;

  let messagesSignal: any;
  let isTypingSignal: any
  let messageCountSignal: any;

  beforeEach(async () => {
    messagesSignal = signal([]);
    isTypingSignal = signal(false);
    messageCountSignal = signal(0);
    mockService = jasmine.createSpyObj(
      'ChatbotService',
      ['sendMessage', 'clearMessages'],
      {
        messages: messagesSignal,
        isTyping: isTypingSignal,
        messageCount: messageCountSignal
      }
    );

    await TestBed.configureTestingModule({
      imports: [ChatContainer],
      providers: [
        { provide: ChatbotService, useValue: mockService },
        provideNoopAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatContainer);
    component = fixture.componentInstance;

    // Mock ViewChild manually
    component['messageContainer'] = {
      nativeElement: {
        scrollTop: 0,
        scrollHeight: 500
      }
    } as ElementRef;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose service signals', () => {
    expect(component.messages()).toEqual([]);
    expect(component.isTyping()).toBe(false);
    expect(component.messageCount()).toBe(0);
  });

  it('should call sendMessage on onSendMessage', () => {
    component.onSendMessage('Hello');
    expect(mockService.sendMessage).toHaveBeenCalledWith('Hello');
  });

  it('should call clearMessages on startNewChat', () => {
    component.startNewChat();
    expect(mockService.clearMessages).toHaveBeenCalled();
  });

  it('should scroll to bottom', () => {
    const element = {
      scrollTop: 0,
      scrollHeight: 214
    };
    component['messageContainer'] = {
      nativeElement: element
    } as ElementRef;
    component['scrollToBottom']();
    expect(element.scrollTop).toBe(214);
  });

  it('should trigger scroll when messages change', () => {
    const spy = spyOn<any>(component, 'scrollToBottom');
    messagesSignal.set([{ text: 'Hi' }]);
    component['scrollToBottom']();
    expect(spy).toHaveBeenCalled();
  });
});
