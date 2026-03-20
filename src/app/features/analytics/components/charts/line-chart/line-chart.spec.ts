import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineChart } from './line-chart';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';

describe('LineChart', () => {
  let component: LineChart;
  let fixture: ComponentFixture<LineChart>;

  const mockData = [
    { label: 'Jan', value: 100 },
    { label: 'Feb', value: 200 },
    { label: 'Mar', value: 150 }
  ];

  beforeAll(() => {
    Chart.register(...registerables);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineChart],
    }).compileComponents();

    fixture = TestBed.createComponent(LineChart);
    component = fixture.componentInstance;
    component.data = mockData as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default title', () => {
    expect(component.title).toBe('Line Chart');
  });

  it('should update chart data on ngOnChanges', () => {
    component.ngOnChanges();

    expect(component.lineChartData.labels).toEqual(['Jan', 'Feb', 'Mar']);
    expect(component.lineChartData.datasets[0].data).toEqual([100, 200, 150]);
  });

  it('should fallback to 0 when value is undefined', () => {
    component.data = [
      { label: 'Jan', value: undefined }
    ] as any;

    component.ngOnChanges();

    expect(component.lineChartData.datasets[0].data).toEqual([0]);
  });

  it('should call chart.update() if chart is available', () => {
    const mockChart = {
      update: jasmine.createSpy('update')
    } as unknown as BaseChartDirective;

    component.chart = mockChart;

    component.ngOnChanges();

    expect(mockChart.update).toHaveBeenCalled();
  });

  it('should not throw if chart is undefined', () => {
    component.chart = undefined;

    expect(() => component.ngOnChanges()).not.toThrow();
  });

  it('should format tooltip label correctly', () => {
    const tooltipFn =
      component.lineChartOptions?.plugins?.tooltip?.callbacks?.label as any;

    const result = tooltipFn({
      parsed: { y: 1234 }
    });

    expect(result).toBe('Users: 1,234');
  });

  it('should handle null tooltip values', () => {
    const tooltipFn =
      component.lineChartOptions?.plugins?.tooltip?.callbacks?.label as any;

    const result = tooltipFn({
      parsed: { y: null }
    });

    expect(result).toBe('Users: 0');
  });
});
