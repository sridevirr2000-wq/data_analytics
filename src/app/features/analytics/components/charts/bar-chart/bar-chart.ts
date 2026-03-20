import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { ChartDataPoint } from '../../../../../shared/models/analytics.model';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.scss',
})
export class BarChart implements OnChanges {
  @Input({ required: true }) data!: ChartDataPoint[];
  @Input() title: string = 'Bar Chart';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  private readonly seriesKeys = ['Sales', 'Marketing', 'Support'];
  private readonly seriesColors: Record<string, string> = {
    Sales: '#6366f1',
    Marketing: '#8b5cf6',
    Support: '#ec4899'
  };


  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#6b7280',
          padding: 15,
          font: {
            size: 12
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
            const label = context.dataset.label || '';
            const value = context.parsed?.y ?? 0;
            return `${label}: ${value.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6'
        },
        ticks: {
          color: '#6b7280'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6b7280'
        }
      }
    }
  };

  ngOnChanges(): void {
    this.updateChartData();
  }

  private updateChartData(): void {
    this.barChartData.labels = this.data.map(d => d.label);

    this.barChartData.datasets = this.seriesKeys.map((key) => ({
      label: key,
      data: this.data.map(d => (typeof d[key] === 'number' ? d[key] : 0)),
      backgroundColor: this.seriesColors[key],
      borderRadius: 4,
      borderSkipped: false
    }));

    this.chart?.update();
  }

}
