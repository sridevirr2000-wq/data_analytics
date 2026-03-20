import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { ChartDataPoint } from '../../../../../shared/models/analytics.model';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './doughnut-chart.html',
  styleUrl: './doughnut-chart.scss',
})
export class DoughnutChart implements OnChanges {
  @Input({ required: true }) data!: ChartDataPoint[];
  @Input() title: string = 'Doughnut Chart';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#6366f1',
          '#8b5cf6',
          '#ec4899',
          '#f59e0b'
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverOffset: 10
      }
    ]
  };

  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: '#6b7280',
          padding: 15,
          font: {
            size: 12
          },
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels && data.datasets.length) {
              return (data.labels as string[]).map((label, i) => {
                const dataset = data.datasets[0];
                const dataArray = dataset.data as number[];
                const value = dataArray[i] ?? 0;
                const total = dataArray.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 1;
                const percentage = ((value / total) * 100).toFixed(0);
                
                const bgColors = dataset.backgroundColor as string[];
                const bgColor = Array.isArray(bgColors) ? bgColors[i] : '#6366f1';
                
                return {
                  text: `${label} (${percentage}%)`,
                  fillStyle: bgColor,
                  hidden: false,
                  index: i
                };
              });
            }
            return [];
          }
        }
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#111827',
        bodyColor: '#6b7280',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed ?? 0;
            const dataset = context.dataset.data as number[];
            const total = dataset.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 1;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${percentage}%`;
          }
        }
      }
    }
  };

  ngOnChanges(): void {
    this.updateChartData();
  }

  private updateChartData(): void {
    this.doughnutChartData.labels = this.data.map(d => d.label);
    this.doughnutChartData.datasets[0].data = this.data.map(d => d.value ?? 0);
    this.chart?.update();
  }

}
