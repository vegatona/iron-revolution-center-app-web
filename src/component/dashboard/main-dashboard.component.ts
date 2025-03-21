import { Component, OnInit } from '@angular/core';

import { ModuleModule } from '../../app/module.module';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [ModuleModule],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css'
})
export class MainDashboardComponent implements OnInit {
  constructor () {
  }

  ngOnInit() {
    this.createBarChart();
    this.createPieChart();
  }

  createBarChart(): void {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    const barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'], 
        datasets: [{
          label: 'Estudiante',
          data: [10, 15, 7, 8, 12, 10, 9, 11, 13, 14, 12, 15],
          backgroundColor: '#232323',
          borderColor: '#232323',
          borderWidth: 1 
        },
        {
          label: 'Anual', 
          data: [5, 8, 6, 7, 9, 10, 8, 7, 6, 5, 4, 3], 
          backgroundColor: '#666666',
          borderColor: '#666666',
          borderWidth: 1 
        },
        {
          label: 'Mensual', 
          data: [20, 18, 22, 25, 23, 20, 19, 21, 22, 24, 23, 25], 
          backgroundColor: '#AAAAAA', 
          borderColor: '#AAAAAA', 
          borderWidth: 1 
        },
        {
          label: 'Semanal', 
          data: [30, 28, 32, 35, 33, 30, 29, 31, 32, 34, 33, 35], 
          backgroundColor: '#DEDEDE',
          borderColor: '#DEDEDE', 
          borderWidth: 1 
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createPieChart(): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    const pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Estudiante', 'Anual', 'Mensual', 'Semanal'],
        datasets: [{
          label: 'Membresías populares',
          data: [89, 50, 100, 34],
          backgroundColor: [
            '#232323',
            '#666666',
            '#AAAAAA',
            '#DEDEDE'
          ],
          borderColor: [
            '#232323',
            '#666666',
            '#AAAAAA',
            '#DEDEDE'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    });
  }
}
