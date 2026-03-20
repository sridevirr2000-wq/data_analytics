import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KPI } from '../../../../shared/models/analytics.model';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.scss',
})
export class KpiCard {
  @Input({ required: true }) kpi!: KPI;
}
