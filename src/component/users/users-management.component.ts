import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

interface User {
  nip: string;
  name: string;
  role: string;
  photo: string;
  password: string;
  repeatPassword: string;
  hasNIP: boolean;
}

interface Role {
  nip: string;
  role: string;
}

@Component({
  selector: 'app-users-management',
  standalone: true,
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
  ],
})
export class UsersManagementComponent {
  displayedColumns: string[] = ['photo', 'nip', 'name', 'role', 'actions'];
  users: User[] = [
    {
      photo: 'assets/images/user1.jpg',
      nip: 'E000001',
      name: 'Aimara',
      role: 'Cliente',
      password: '',
      repeatPassword: '',
      hasNIP: false,
    },
    {
      photo: 'assets/images/user2.jpg',
      nip: 'E340013',
      name: 'Oswaldo',
      role: 'Cliente',
      password: '',
      repeatPassword: '',
      hasNIP: false,
    },
    {
      photo: 'assets/images/user3.jpg',
      nip: 'E130266',
      name: 'JuanDa Monki',
      role: 'Empleado',
      password: '',
      repeatPassword: '',
      hasNIP: false,
    },
    {
      photo: 'assets/images/user4.jpg',
      nip: 'E130468',
      name: 'RubencitoSiuu',
      role: 'Administrador',
      password: '',
      repeatPassword: '',
      hasNIP: false,
    },
  ];
  

  filteredUsers: User[] = [...this.users];
  searchQuery: string = '';
  selectedRole: string = '';
  roles: string[] = ['Cliente', 'Empleado', 'Administrador'];

  // Variables para modales
  isAddUserModalOpen: boolean = false;
  isEditUserModalOpen: boolean = false;
  isDeleteUserModalOpen: boolean = false;
  isAssignRoleModalOpen: boolean = false;

  // Datos para nuevos usuarios y edición
  newUser: User = { nip: '', name: '', role: '', photo: '', password: '', repeatPassword: '', hasNIP: false };
  editUserData: User = { nip: '', name: '', role: '', photo: '', password: '', repeatPassword: '', hasNIP: false };
  selectedUser: User | null = null;
  userToDelete: User | null = null;

  // Variables para asignar roles
  selectedRoleForAssignment: string = '';
  userToAssignRole: User | null = null;
  // Método para aplicar el filtro
  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(filterValue) &&
        (this.selectedRole === '' || user.role === this.selectedRole)
    );
  }

  // Datos y columnas para la tabla de roles
  rolesDisplayedColumns: string[] = ['nip', 'role']; // Solo NIP y Nombre del Rol
  rolesData: Role[] = [
    { nip: 'R001', role: 'Cliente' },
    { nip: 'R002', role: 'Empleado' },
    { nip: 'R003', role: 'Administrador' },
  ];

  // Método para limpiar el filtro
  clear() {
    this.searchQuery = '';
    this.selectedRole = '';
    this.filteredUsers = [...this.users];
  }

  

  // Método para abrir el modal de agregar usuario
  openAddUserModal() {
    this.isAddUserModalOpen = true;
  }

  // Método para cerrar el modal de agregar usuario
  closeAddUserModal() {
    this.isAddUserModalOpen = false;
    this.newUser = { nip: '', name: '', role: '', photo: '', password: '', repeatPassword: '', hasNIP: false };
  }

  // Método para guardar el nuevo usuario
  saveUser() {
    if (this.newUser.password !== this.newUser.repeatPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.newUser.nip = 'E' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    this.users.push(this.newUser);
    this.filteredUsers = [...this.users];
    this.closeAddUserModal();
  }

  // Método para abrir el modal de editar usuario
  editUser(user: User) {
    this.selectedUser = user;
    this.editUserData = { nip: '', name: '', role: '', photo: '', password: '', repeatPassword: '', hasNIP: false }; // Campos vacíos
    this.isEditUserModalOpen = true;
  }

  // Método para cerrar el modal de editar usuario
  closeEditUserModal() {
    this.isEditUserModalOpen = false;
    this.editUserData = { nip: '', name: '', role: '', photo: '', password: '', repeatPassword: '', hasNIP: false };
    this.selectedUser = null;
  }

  // Método para actualizar el usuario
  updateUser() {
    if (this.selectedUser) {
      const index = this.users.findIndex((u) => u.nip === this.selectedUser!.nip);
      if (index !== -1) {
        // Actualiza solo los campos modificados
        this.users[index].name = this.editUserData.name || this.users[index].name;
        this.users[index].role = this.editUserData.role || this.users[index].role;
        this.users[index].photo = this.editUserData.photo || this.users[index].photo;
        this.filteredUsers = [...this.users]; // Actualiza la lista filtrada
      }
    }
    this.closeEditUserModal(); // Cierra el modal
  }

  // Método para abrir el modal de eliminar usuario
  deleteUser(user: User) {
    this.userToDelete = user;
    this.isDeleteUserModalOpen = true;
  }

  // Método para confirmar la eliminación del usuario
  confirmDelete() {
    if (this.userToDelete) {
      this.users = this.users.filter((u) => u.nip !== this.userToDelete!.nip);
      this.filteredUsers = [...this.users];
    }
    this.closeDeleteUserModal();
  }

  // Método para cerrar el modal de eliminar usuario
  closeDeleteUserModal() {
    this.isDeleteUserModalOpen = false;
    this.userToDelete = null;
  }

  // Método para abrir el modal de asignar rol
  assignRole(user: User) {
    this.userToAssignRole = user;
    this.isAssignRoleModalOpen = true;
  }

  // Método para cerrar el modal de asignar rol
  closeAssignRoleModal() {
    this.isAssignRoleModalOpen = false;
    this.userToAssignRole = null;
  }
}