import { Component, OnInit } from '@angular/core';

import { ModuleModule } from '../../app/module.module';

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
  }
}
