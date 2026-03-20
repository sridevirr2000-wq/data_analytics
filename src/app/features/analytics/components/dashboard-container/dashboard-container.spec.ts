import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardContainer } from './dashboard-container';
import { AnalyticsService } from '../../services/analytics.service';
import { signal } from '@angular/core';
import { Chart, registerables } from 'chart.js';

describe('DashboardContainer', () => {
  let component: DashboardContainer;
  let fixture: ComponentFixture<DashboardContainer>;
  let mockService: jasmine.SpyObj<AnalyticsService>;

  const mockDashboardData = {
    kpis: [
      {
        title: 'Users',
        value: '10,000',
        change: 10,
        isPositive: true,
        icon: 'users',
        color: 'indigo'
      }
    ],
    lineChartData: [{ label: 'Jan', value: 100 }],
    barChartData: [{ label: 'Jan', Sales: 100, Marketing: 50, Support: 20 }],
    doughnutChartData: [{ label: 'Desktop', value: 60 }],
    tableRecords: [
      {
        id: '1',
        name: 'Test User',
        date: '01/01/2024',
        category: 'Sales',
        amount: 1000,
        status: 'completed'
      }
    ]
  };
  let dashboardSignal = signal(mockDashboardData);

  beforeAll(() => {
    Chart.register(...registerables);
  });

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('AnalyticsService', ['setDateRange'], {
      dateRange: signal('month'),
      dashboardData: dashboardSignal
    });

    await TestBed.configureTestingModule({
      imports: [DashboardContainer],
      providers: [
        { provide: AnalyticsService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose dashboardData from service', () => {
    const data = component.dashboardData();

    expect(data.kpis.length).toBe(1);
    expect(data.kpis[0].title).toBe('Users');

    expect(data.lineChartData[0].label).toBe('Jan');
    expect(data.barChartData[0]['Sales']).toBe(100);
    expect(data.doughnutChartData[0].value).toBe(60);
  });

  it('should expose dateRange signal', () => {
    expect(component.dateRange()).toBe('month');
  });

  it('should call setDateRange on change', () => {
    component.onDateRangeChange('week');
    expect(mockService.setDateRange).toHaveBeenCalledWith('week');
  });

  it('should update when dashboardData signal changes', () => {
    const newData = {
      ...mockDashboardData,
      kpis: [{ ...mockDashboardData.kpis[0], value: '20,000' }]
    };

    dashboardSignal.set(newData);
    fixture.detectChanges();
    expect(component.dashboardData().kpis[0].value).toBe('20,000');
  });

});
