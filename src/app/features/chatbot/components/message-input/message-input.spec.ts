import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageInput } from './message-input';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('MessageInput', () => {
  let component: MessageInput;
  let fixture: ComponentFixture<MessageInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageInput],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageInput);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit messageSent when onSend is called with valid text', () => {
    spyOn(component.messageSent, 'emit');
    component.messageText.set('Hello');
    component.onSend();

    expect(component.messageSent.emit).toHaveBeenCalledWith('Hello');
    expect(component.messageText()).toBe('');
  });

  it('should not emit when message is empty or whitespace', () => {
    spyOn(component.messageSent, 'emit');
    component.messageText.set('   ');
    component.onSend();
    expect(component.messageSent.emit).not.toHaveBeenCalled();
  });

  it('should send message on Enter key press', () => {
    spyOn(component, 'onSend');
    const event = new KeyboardEvent('keydown', {
      key: 'Enter'
    });
    spyOn(event, 'preventDefault');
    component.onKeyPress(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.onSend).toHaveBeenCalled();
  });

  it('should not send message on Shift + Enter', () => {
    spyOn(component, 'onSend');
    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      shiftKey: true
    });
    component.onKeyPress(event);
    expect(component.onSend).not.toHaveBeenCalled();
  });

  it('should update messageText when transcript is ready', () => {
    component.onTranscriptReady('Voice message');
    expect(component.messageText()).toBe('Voice message');
  });
});
