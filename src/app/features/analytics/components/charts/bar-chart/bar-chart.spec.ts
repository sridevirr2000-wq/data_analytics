import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarChart } from './bar-chart';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';

describe('BarChart', () => {
  let component: BarChart;
  let fixture: ComponentFixture<BarChart>;

  const mockData = [
    { label: 'Jan', Sales: 100, Marketing: 200, Support: 50 },
    { label: 'Feb', Sales: 150, Marketing: 250, Support: 80 }
  ];

  beforeAll(() => {
    Chart.register(...registerables);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarChart],
    }).compileComponents();

    fixture = TestBed.createComponent(BarChart);
    component = fixture.componentInstance;

    component.data = mockData as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update chart data on ngOnChanges', () => {
    component.ngOnChanges();

    expect(component.barChartData.labels).toEqual(['Jan', 'Feb']);
    expect(component.barChartData.datasets.length).toBe(3);
  });

  it('should map labels correctly', () => {
    component.ngOnChanges();

    expect(component.barChartData.labels).toEqual(
      mockData.map(d => d.label)
    );
  });

  it('should map datasets correctly', () => {
    component.ngOnChanges();

    const datasets = component.barChartData.datasets;

    expect(datasets[0].label).toBe('Sales');
    expect(datasets[0].data).toEqual([100, 150]);

    expect(datasets[1].label).toBe('Marketing');
    expect(datasets[1].data).toEqual([200, 250]);

    expect(datasets[2].label).toBe('Support');
    expect(datasets[2].data).toEqual([50, 80]);
  });

  it('should fallback to 0 for missing values', () => {
    const incompleteData = [
      { label: 'Jan', Sales: 100 }
    ];

    component.data = incompleteData as any;
    component.ngOnChanges();

    const datasets = component.barChartData.datasets;

    expect(datasets[1].data).toEqual([0]);
    expect(datasets[2].data).toEqual([0]);
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

  it('should have default title', () => {
    expect(component.title).toBe('Bar Chart');
  });

});
