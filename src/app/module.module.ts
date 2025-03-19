import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    MatSidenavModule, 
    MatIconModule, 
    MatButtonModule
  ], 
  exports: [
    DropdownModule,
    FormsModule,
    MatSidenavModule, 
    MatIconModule, 
    MatButtonModule
  ]
})
export class ModuleModule { }
