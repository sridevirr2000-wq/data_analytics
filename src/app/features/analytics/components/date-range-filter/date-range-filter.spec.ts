import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateRangeFilter } from './date-range-filter';
import { DateRange } from '../../../../shared/models/analytics.model';

describe('DateRangeFilter', () => {
  let component: DateRangeFilter;
  let fixture: ComponentFixture<DateRangeFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateRangeFilter]
    }).compileComponents();

    fixture = TestBed.createComponent(DateRangeFilter);
    component = fixture.componentInstance;

    component.selectedRange = 'month';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct ranges', () => {
    expect(component.ranges).toEqual(['week', 'month', 'year']);
  });

  it('should accept selectedRange input', () => {
    expect(component.selectedRange).toBe('month');
  });

  it('should emit rangeChanged event when onRangeSelect is called', () => {
    spyOn(component.rangeChanged, 'emit');
    component.onRangeSelect('week');
    expect(component.rangeChanged.emit).toHaveBeenCalledWith('week');
  });

  it('should emit correct selected range', () => {
    let emittedValue: DateRange | null = null;
    component.rangeChanged.subscribe(value => {
      emittedValue = value;
    });
    component.onRangeSelect('year');
    expect(emittedValue).toBe('year' as any);
  });
  
});
