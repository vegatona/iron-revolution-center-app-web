import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface Employee {
  nip: string;
  nombre: string;
  celular: string;
  sucursal: string;
  foto: string;
  username?: string;
}

@Component({
  selector: 'app-employees-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './employees-management.component.html',
  styleUrls: ['./employees-management.component.css']
})
export class EmployeesManagementComponent {
  displayedColumns: string[] = [
    'foto',
    'nip',
    'nombre',
    'celular',
    'sucursal',
    'actions'
  ];

  employees: Employee[] = [
    {
      nip: 'E000001',
      nombre: 'Juan Pérez',
      celular: '1234567890',
      sucursal: 'Tabasco 378, Ciudad Obregon',
      foto: 'assets/foto1.png'
    },
    {
      nip: 'E000002',
      nombre: 'Ana Gómez',
      celular: '0987654321',
      sucursal: 'Boulevard 225, Ciudad Obregon',
      foto: 'assets/foto2.png'
    },
    {
      nip: 'E000003',
      nombre: 'Vanessa Mendoza',
      celular: '6441313134',
      sucursal: 'Tabasco 378, Ciudad Obregon',
      foto: 'assets/foto3.png'
    }
  ];

  // Lista filtrada para la tabla
  filteredEmployees: Employee[] = [...this.employees];

  // Filtros
  searchQuery: string = '';
  selectedSucursal: string = '';

  // Modals
  isAddEmployeeModalOpen: boolean = false;
  isEditEmployeeModalOpen: boolean = false;
  isDeleteEmployeeModalOpen: boolean = false;

  // propiedad para controlar el checkbox en "Agregar"
  modifyUsernameAdd: boolean = false;
  // propiedad para controlar el checkbox en "Editar"
  modifyUsernameEdit: boolean = false;

  // Agregar
  newEmployee: Employee = {
    nip: '',
    nombre: '',
    celular: '',
    sucursal: '',
    username: '',
    foto: ''
  };

  // Editar
  editEmployeeData: Employee = {
    nip: '',
    nombre: '',
    celular: '',
    sucursal: '',
    username: '',
    foto: ''
  };
  selectedEmployee: Employee | null = null;

  // Eliminar
  employeeToDelete: Employee | null = null;

  /* Aplica el filtro por búsqueda y sucursal */
  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();

    // Filtrar por nombre o NIP
    let tempEmployees = this.employees.filter(employee =>
      employee.nombre.toLowerCase().includes(filterValue) ||
      employee.nip.toLowerCase().includes(filterValue)
    );

    // Filtrar por sucursal
    if (this.selectedSucursal) {
      tempEmployees = tempEmployees.filter(employee =>
        employee.sucursal.toLowerCase() === this.selectedSucursal.toLowerCase()
      );
    }

    this.filteredEmployees = tempEmployees;
  }

  /* Limpia filtros */
  clear() {
    this.searchQuery = '';
    this.selectedSucursal = '';
    this.filteredEmployees = [...this.employees];
  }

  // ABRIR / CERRAR AGREGAR
  openAddEmployeeModal() {
    this.isAddEmployeeModalOpen = true;
  }

  closeAddEmployeeModal() {
    this.isAddEmployeeModalOpen = false;

    // Reinicia el modal y el checkbox
    this.newEmployee = {
      nip: '',
      nombre: '',
      celular: '',
      sucursal: '',
      username: '',
      foto: ''
    };
    this.modifyUsernameAdd = false;
  }

  // guardar empleado
  saveEmployee() {
    // Ejemplo de generar NIP automáticamente:
    this.newEmployee.nip = 'E' + Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');

    this.employees.push({ ...this.newEmployee });
    this.filteredEmployees = [...this.employees];
    this.closeAddEmployeeModal();
  }

  // subir foto (Agregar)
  onFileSelectedAdd(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.newEmployee.foto = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // editar
  editEmployee(employee: Employee) {
    this.selectedEmployee = employee;
    this.editEmployeeData = { ...employee };

    // Si ya existe username, podríamos decidir
    // que se active el checkbox por defecto o no:
    this.modifyUsernameEdit = !!employee.username;

    this.isEditEmployeeModalOpen = true;
  }

  closeEditEmployeeModal() {
    this.isEditEmployeeModalOpen = false;

    // Reinicia el modal y el checkbox
    this.editEmployeeData = {
      nip: '',
      nombre: '',
      celular: '',
      sucursal: '',
      username: '',
      foto: ''
    };
    this.modifyUsernameEdit = false;
    this.selectedEmployee = null;
  }

  updateEmployee() {
    if (this.selectedEmployee) {
      const index = this.employees.findIndex(
        emp => emp.nip === this.selectedEmployee!.nip
      );
      if (index !== -1) {
        // Actualizamos los datos en el array original
        // Si el checkbox "¿Modificar usuario?" está desmarcado,
        // podrías elegir NO sobreescribir el username:
        if (!this.modifyUsernameEdit) {
          // Conserva el username anterior
          this.editEmployeeData.username = this.selectedEmployee.username;
        }

        this.employees[index] = { ...this.editEmployeeData };
        this.filteredEmployees = [...this.employees];
      }
    }
    this.closeEditEmployeeModal();
  }

  // subir foto (Editar)
  onFileSelectedEdit(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.editEmployeeData.foto = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // eliminar
  deleteEmployee(employee: Employee) {
    this.employeeToDelete = employee;
    this.isDeleteEmployeeModalOpen = true;
  }

  confirmDelete() {
    if (this.employeeToDelete) {
      this.employees = this.employees.filter(
        emp => emp.nip !== this.employeeToDelete!.nip
      );
      this.filteredEmployees = [...this.employees];
    }
    this.closeDeleteEmployeeModal();
  }

  closeDeleteEmployeeModal() {
    this.isDeleteEmployeeModalOpen = false;
    this.employeeToDelete = null;
  }
}
