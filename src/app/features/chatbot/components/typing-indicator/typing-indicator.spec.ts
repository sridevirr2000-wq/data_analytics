import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypingIndicator } from './typing-indicator';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('TypingIndicator', () => {
  let component: TypingIndicator;
  let fixture: ComponentFixture<TypingIndicator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypingIndicator],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(TypingIndicator);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with 3 dots', () => {
    expect(component.dots.length).toBe(3);
  });

  it('should render 3 dot elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dots = compiled.querySelectorAll('.dot');
    expect(dots.length).toBe(3);
  });
});
