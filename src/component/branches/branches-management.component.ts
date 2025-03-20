import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ModuleModule } from '../../app/module.module';

interface Branch {
  nip: string;
  name: string;
  location: string;
}

@Component({
  selector: 'app-branches-management',
  standalone: true,
  templateUrl: './branches-management.component.html',
  styleUrls: ['./branches-management.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    ModuleModule
  ]
})
export class BranchesManagementComponent {
  displayedColumns: string[] = ['nip', 'name', 'location', 'actions'];
  branches: Branch[] = [
    { nip: 'S000001', name: 'Iron Revolution Center', location: 'Tabasco' },
    { nip: 'S240018', name: 'Iron Revolution Center', location: 'Tabasco' },
    { nip: 'S183666', name: 'Iron Revolution Center', location: 'Tabasco' },
    { nip: 'S128408', name: 'Iron Revolution Center', location: 'Tabasco' }
  ];
  
  filteredBranches: Branch[] = [...this.branches]; // Inicializamos con todas las sucursales
  searchQuery: string = ''; // Variable para el filtro de búsqueda
  isAddBranchModalOpen: boolean = false;
  isEditBranchModalOpen: boolean = false;
  isDeleteBranchModalOpen: boolean = false;
  newBranch: Branch = { nip: '', name: '', location: '' };
  editBranchData: Branch = { nip: '', name: '', location: '' };
  selectedBranch: Branch | null = null;
  branchToDelete: Branch | null = null;

  // Método para aplicar el filtro
  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.filteredBranches = this.branches.filter(branch =>
      branch.nip.toLowerCase().includes(filterValue) || 
      branch.name.toLowerCase().includes(filterValue)
    );
  }

  // Método para limpiar el filtro
  clear() {
    this.searchQuery = '';
    this.filteredBranches = [...this.branches]; // Mostrar todas las sucursales nuevamente
  }

  // Método para abrir el modal de editar sucursal
editBranch(branch: Branch) {
  this.selectedBranch = branch;
  this.editBranchData = { nip: branch.nip, name: '', location: '' }; 
  this.isEditBranchModalOpen = true;
}

  // Método para cerrar el modal de editar sucursal
  closeEditBranchModal() {
    this.isEditBranchModalOpen = false;
    this.editBranchData = { nip: '', name: '', location: '' }; // Limpiar el formulario
    this.selectedBranch = null;
  }

  // Método para actualizar la sucursal
updateBranch() {
  if (this.selectedBranch) {
    const index = this.branches.findIndex(b => b.nip === this.selectedBranch!.nip);
    if (index !== -1) {
      this.branches[index] = {
        ...this.selectedBranch,
        name: this.editBranchData.name, // Usar el nuevo nombre
        location: this.editBranchData.location // Usar la nueva ubicación
      };
      this.filteredBranches = [...this.branches]; // Actualizar la lista filtrada
    }
  }
  this.closeEditBranchModal();
}

  // Método para abrir el modal de eliminar sucursal
  deleteBranch(branch: Branch) {
    this.branchToDelete = branch;
    this.isDeleteBranchModalOpen = true;
  }

  // Método para confirmar la eliminación de la sucursal
  confirmDelete() {
    if (this.branchToDelete) {
      this.branches = this.branches.filter(b => b.nip !== this.branchToDelete!.nip);
      this.filteredBranches = [...this.branches]; // Actualizar la lista filtrada
    }
    this.closeDeleteBranchModal();
  }

  // Método para cerrar el modal de eliminar sucursal
  closeDeleteBranchModal() {
    this.isDeleteBranchModalOpen = false;
    this.branchToDelete = null;
  }

  // Método para abrir el modal de agregar sucursal
  openAddBranchModal() {
    this.isAddBranchModalOpen = true;
  }

  // Método para cerrar el modal de agregar sucursal
  closeAddBranchModal() {
    this.isAddBranchModalOpen = false;
    this.newBranch = { nip: '', name: '', location: '' }; // Limpiar el formulario
  }

  // Método para guardar la nueva sucursal
  saveBranch() {
    this.newBranch.nip = 'S' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    this.branches.push(this.newBranch);
    this.filteredBranches = [...this.branches]; // Actualizar la lista filtrada
    this.closeAddBranchModal();
  }
}
