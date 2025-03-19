import { Component } from '@angular/core';

import { ModuleModule } from '../../app/module.module';

@Component({
  selector: 'app-statistics-overview',
  standalone: true,
  imports: [ModuleModule],
  templateUrl: './statistics-overview.component.html',
  styleUrl: './statistics-overview.component.css'
})
export class StatisticsOverviewComponent {

}
