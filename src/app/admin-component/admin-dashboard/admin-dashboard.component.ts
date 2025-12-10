import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetCardComponent } from '../widget-card/widget-card.component';
import { WidgetChartComponent } from '../widget-chart/widget-chart.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    WidgetCardComponent,
    WidgetChartComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  stats = {
    totalProducts: 150,
    totalSales: 4500,
    dailySales: 120,
    weeklySales: 700,
    monthlySales: 2600
  };

  productSalesLabels = ['Men’s Classic Warm Hoodie', 'Graphic Typography T-shirt', 'Denim Jacket', 'Bomber Jacket', 'Oversized T-shirt'];
  productSalesData = [15.99, 19.5, 15.49, 10.99, 15.49];

  weeklyLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  weeklySales = [50, 70, 95, 120, 15.49, 180, 110];

  products = [
    { id: 1, name: 'Men’s Classic Warm Hoodie', price: 15.99, sold: 120 },
    { id: 2, name: 'Graphic Typography T-shirt', price: 19.5, sold: 90 },
    { id: 3, name: 'Denim Jacket', price: 15.49, sold: 150 },
    { id: 4, name: 'Bomber Jacket', price: 10.99, sold: 60 },
    { id: 5, name: 'Oversized T-shirt', price: 15.49, sold: 110 }
  ];

  constructor(private router: Router){}

  navigatetoadminproduct(){
    this.router.navigate(['adminproductmanagement'])
  }

}
