import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-widget-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './widget-chart.component.html',
  styleUrls: ['./widget-chart.component.css']
})
export class WidgetChartComponent implements AfterViewInit {

  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() chartType: string = 'bar';

  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  ngAfterViewInit(): void {
    new Chart(this.chartCanvas.nativeElement, {
      type: this.chartType as any,
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Sales',
          data: this.data,
          borderColor: '#ff6600',
          backgroundColor: '#ff660080',
          borderWidth: 2,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  }
}
