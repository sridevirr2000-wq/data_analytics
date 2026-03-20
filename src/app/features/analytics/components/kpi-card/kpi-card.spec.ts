import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KpiCard } from './kpi-card';
import { KPI } from '../../../../shared/models/analytics.model';

describe('KpiCard', () => {
  let component: KpiCard;
  let fixture: ComponentFixture<KpiCard>;

  const mockKpi: KPI = {
    title: 'Total Users',
    value: '10,000',
    change: 12.5,
    isPositive: true,
    icon: 'users',
    color: 'indigo'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiCard]
    }).compileComponents();

    fixture = TestBed.createComponent(KpiCard);
    component = fixture.componentInstance;
    component.kpi = mockKpi;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept kpi input', () => {
    expect(component.kpi).toEqual(mockKpi);
  });

  it('should render KPI title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Total Users');
  });

  it('should render KPI value', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('10,000');
  });

  it('should reflect positive KPI', () => {
    expect(component.kpi.isPositive).toBeTrue();
  });
});
