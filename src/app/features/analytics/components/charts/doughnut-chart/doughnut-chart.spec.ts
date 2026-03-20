import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoughnutChart } from './doughnut-chart';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';

describe('DoughnutChart', () => {
  let component: DoughnutChart;
  let fixture: ComponentFixture<DoughnutChart>;

  const mockData = [
    { label: 'Desktop', value: 45 },
    { label: 'Mobile', value: 35 },
    { label: 'Tablet', value: 20 }
  ];

  beforeAll(() => {
    Chart.register(...registerables);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoughnutChart]
    }).compileComponents();

    fixture = TestBed.createComponent(DoughnutChart);
    component = fixture.componentInstance;

    component.data = mockData as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default title', () => {
    expect(component.title).toBe('Doughnut Chart');
  });

  it('should update chart data on ngOnChanges', () => {
    component.ngOnChanges();
    expect(component.doughnutChartData.labels).toEqual([
      'Desktop', 'Mobile', 'Tablet'
    ]);
    expect(component.doughnutChartData.datasets[0].data).toEqual([
      45, 35, 20
    ]);
  });

  it('should fallback to 0 when value is undefined', () => {
    component.data = [
      { label: 'Desktop', value: undefined }
    ] as any;

    component.ngOnChanges();
    expect(component.doughnutChartData.datasets[0].data).toEqual([0]);
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

  it('should generate legend labels with percentages', () => {
    component.ngOnChanges();

    const legendFn =
      component.doughnutChartOptions?.plugins?.legend?.labels?.generateLabels;

    const mockChartObj: any = {
      data: component.doughnutChartData
    };

    const labels = legendFn!(mockChartObj);

    expect(labels.length).toBe(3);
    expect(labels[0].text).toContain('Desktop');
    expect(labels[0].text).toContain('%');
  });

  it('should calculate tooltip percentage correctly', () => {
    const tooltipFn =
      component.doughnutChartOptions?.plugins?.tooltip?.callbacks?.label as any;

    const result = tooltipFn({
      label: 'Desktop',
      parsed: 45,
      dataset: { data: [45, 35, 20] }
    });

    expect(result).toContain('Desktop');
    expect(result).toContain('%');
  });
});
