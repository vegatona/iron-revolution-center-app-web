import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ModuleModule } from '../../app/module.module';

interface Membership {
  id: string;
  name: string;
  duration: number;
}

@Component({
  selector: 'app-memberships-management',
  standalone: true,
  templateUrl: './memberships-management.component.html',
  styleUrls: ['./memberships-management.component.css'],
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
export class MembershipsManagementComponent {
  displayedColumns: string[] = ['name', 'duration', 'actions'];
  memberships: Membership[] = [
    { id: '004', name: 'Anual', duration: 365 },
    { id: '001', name: 'Mensual', duration: 31 },
    { id: '002', name: 'Estudiantes (Mensual)', duration: 31 },
    { id: '003', name: 'Semanal', duration: 7 },
  ];
  
  filteredMemberships: Membership[] = [...this.memberships]; // Inicializamos con todas las membresías
  searchQuery: string = ''; // Variable para el filtro de búsqueda
  isAddMembershipModalOpen: boolean = false;
  isEditMembershipModalOpen: boolean = false;
  isDeleteMembershipModalOpen: boolean = false;
  newMembership: Membership = { id: '', name: '', duration: 0 };
  editMembershipData: Membership = { id: '', name: '', duration: 0 };
  selectedMembership: Membership | null = null;
  membershipToDelete: Membership | null = null;

  // Método para aplicar el filtro
  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.filteredMemberships = this.memberships.filter(membership =>
      membership.name.toLowerCase().includes(filterValue)
    );
  }

  // Método para limpiar el filtro
  clear() {
    this.searchQuery = '';
    this.filteredMemberships = [...this.memberships]; // Mostrar todas las membresías nuevamente
  }

  // Método para abrir el modal de editar membresía
editMembership(membership: Membership) {
  this.selectedMembership = membership;
  this.editMembershipData = { id: membership.id, name: '', duration: 0 }; 
  this.isEditMembershipModalOpen = true;
}

  // Método para cerrar el modal de editar membresía
  closeEditMembershipModal() {
    this.isEditMembershipModalOpen = false;
    this.editMembershipData = { id: '', name: '', duration: 0 }; // Limpiar el formulario
    this.selectedMembership = null;
  }

  // Método para actualizar la membresía
  updateMembership() {
    if (this.selectedMembership) {
      const index = this.memberships.findIndex(m => m.id === this.selectedMembership!.id);
      if (index !== -1) {
        this.memberships[index] = {
          ...this.selectedMembership,
          name: this.editMembershipData.name,
          duration: this.editMembershipData.duration
        };
        this.filteredMemberships = [...this.memberships]; // Actualizar la lista filtrada
      }
    }
    this.closeEditMembershipModal();
  }

  // Método para abrir el modal de eliminar membresía
  deleteMembership(membership: Membership) {
    this.membershipToDelete = membership;
    this.isDeleteMembershipModalOpen = true;
  }

  // Método para confirmar la eliminación de la membresía
  confirmDelete() {
    if (this.membershipToDelete) {
      this.memberships = this.memberships.filter(m => m.id !== this.membershipToDelete!.id);
      this.filteredMemberships = [...this.memberships]; // Actualizar la lista filtrada
    }
    this.closeDeleteMembershipModal();
  }

  // Método para cerrar el modal de eliminar membresía
  closeDeleteMembershipModal() {
    this.isDeleteMembershipModalOpen = false;
    this.membershipToDelete = null;
  }

  // Método para abrir el modal de agregar membresía
  openAddMembershipModal() {
    this.isAddMembershipModalOpen = true;
  }

  // Método para cerrar el modal de agregar membresía
  closeAddMembershipModal() {
    this.isAddMembershipModalOpen = false;
    this.newMembership = { id: '', name: '', duration: 0 }; // Limpiar el formulario
  }

  // Método para guardar la nueva membresía
  saveMembership() {
    this.newMembership.id = 'M' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    this.memberships.push(this.newMembership);
    this.filteredMemberships = [...this.memberships]; // Actualizar la lista filtrada
    this.closeAddMembershipModal();
  }
}
