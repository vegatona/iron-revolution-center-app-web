import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ModuleModule } from './module.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
            RouterModule, 
            CommonModule, 
            ModuleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isOpen = true; 

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
