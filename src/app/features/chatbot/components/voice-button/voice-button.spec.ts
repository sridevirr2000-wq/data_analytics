import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VoiceButton } from './voice-button';
import { SpeechRecognitionService } from '../../services/speech-recognition.service';
import { signal } from '@angular/core';
import { of, throwError } from 'rxjs';

describe('VoiceButton', () => {
  let component: VoiceButton;
  let fixture: ComponentFixture<VoiceButton>;
  let mockService: jasmine.SpyObj<SpeechRecognitionService>;

  let isSupportedSignal = signal(true);
  let isListeningSignal = signal(false);

  beforeEach(async () => {
    mockService = jasmine.createSpyObj(
      'SpeechRecognitionService',
      ['startListening', 'stopListening'],
      {
        isSupported: isSupportedSignal,
        isListening: isListeningSignal
      }
    );

    await TestBed.configureTestingModule({
      imports: [VoiceButton],
      providers: [
        { provide: SpeechRecognitionService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VoiceButton);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should alert if speech is not supported', () => {
    isSupportedSignal.set(false);
    spyOn(window, 'alert');
    component.toggleVoiceInput();

    expect(window.alert).toHaveBeenCalled();
    expect(mockService.startListening).not.toHaveBeenCalled();
  });

  it('should stop listening when already listening', () => {
    isSupportedSignal.set(true);
    isListeningSignal.set(true);
    component.toggleVoiceInput();
    expect(mockService.stopListening).toHaveBeenCalled();
  });

  it('should start listening and emit transcript', () => {
    spyOn(component.transcriptReady, 'emit');
    mockService.startListening.and.returnValue(of('Hello world'));
    component.toggleVoiceInput();

    expect(mockService.startListening).toHaveBeenCalled();
    expect(component.transcriptReady.emit).toHaveBeenCalledWith('Hello world');
  });

  it('should handle error from speech recognition', () => {
    isSupportedSignal.set(true);
    isListeningSignal.set(false);
    spyOn(console, 'error');
    spyOn(window, 'alert');
    mockService.startListening.and.returnValue(
      throwError(() => new Error('Mic error'))
    );
    component.toggleVoiceInput();

    expect(console.error).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      'Failed to recognize speech. Please try again.'
    );
  });
});
