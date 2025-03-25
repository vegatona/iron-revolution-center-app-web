import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface Client {
  id: string;
  foto: string;
  nip: string;
  nombre: string;
  celular: string;
  Obsevacion?: string;
  membresia?: string;
  fechainicio?: string; // Formato: dd/MM/yyyy
  fechafin?: string;    // Formato: dd/MM/yyyy
  nameuser?: string;
}

@Component({
  selector: 'app-clients-management',
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
  templateUrl: './clients-management.component.html',
  styleUrls: ['./clients-management.component.css']
})
export class ClientsManagementComponent {
  displayedColumns: string[] = [
    'foto',
    'nip',
    'nombre',
    'celular',
    'membresia',
    'fechainicio',
    'fechafin',
    'actions'
  ];

  // Lista inicial de clientes
  clients: Client[] = [
    {
      id: '001',
      foto: 'assets/foto1.png',
      nip: 'E000001',
      nombre: 'Pablo Pérez',
      celular: '644 167 2837',
      membresia: 'Mensual',
      fechainicio: '08/12/2025',
      fechafin: '09/12/2025'
    },
    {
      id: '002',
      foto: 'assets/foto2.png',
      nip: 'E000002',
      nombre: 'Ana López',
      celular: '644 167 2838',
      membresia: 'Semanal',
      fechainicio: '13/01/2025',
      fechafin: '14/01/2025'
    },
    {
      id: '003',
      foto: 'assets/foto3.png',
      nip: 'E000003',
      nombre: 'Carlos García',
      celular: '644 167 2839',
      membresia: 'Anual',
      fechainicio: '18/02/2025',
      fechafin: '19/02/2025'
    }
  ];

  // Lista filtrada para la tabla
  filteredClients: Client[] = [...this.clients];

  // Filtros
  searchQuery: string = '';
  selectedMembership: string = '';
  startDate: string = '';
  endDate: string = '';

  // Modales
  isAddClientModalOpen: boolean = false;
  isEditClientModalOpen: boolean = false;
  isDeleteClientModalOpen: boolean = false;
  isMembershipModalOpen: boolean = false;

  // Cliente nuevo
  newClient: Client = {
    id: '',
    foto: '',
    nip: '',
    nombre: '',
    celular: '',
    Obsevacion: '',
    nameuser: ''
  };

  // Cliente a editar
  editClientData: Client = {
    id: '',
    foto: '',
    nip: '',
    nombre: '',
    celular: '',
    Obsevacion: '',
    nameuser: ''
  };
  selectedClient: Client | null = null;

  // Cliente a eliminar
  clientToDelete: Client | null = null;

  // Membresía
  selectedMembershipModal: string = '';
  clientForMembership: Client | null = null;

  // Checkbox “¿cuenta con usuario?” en Agregar
  modifyUsernameAdd: boolean = false;
  // Checkbox “¿Modificar usuario?” en Editar
  modifyUsernameEdit: boolean = false;

  // Filtros
  private parseDate(dateString: string): Date | null {
    if (!dateString) return null;
    const parts = dateString.split('/');
    if (parts.length !== 3) return null;
    const day = +parts[0];
    const month = +parts[1] - 1; // enero es 0
    const year = +parts[2];
    return new Date(year, month, day);
  }

  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    let temp = this.clients.filter(client =>
      client.nombre.toLowerCase().includes(filterValue) ||
      client.nip.toLowerCase().includes(filterValue)
    );

    if (this.selectedMembership) {
      temp = temp.filter(client =>
        client.membresia?.toLowerCase() === this.selectedMembership.toLowerCase()
      );
    }

    if (this.startDate) {
      const startDateAsDate = new Date(this.startDate);
      temp = temp.filter(client => {
        if (!client.fechainicio) return false;
        const clientDate = this.parseDate(client.fechainicio);
        return clientDate ? clientDate >= startDateAsDate : false;
      });
    }

    if (this.endDate) {
      const endDateAsDate = new Date(this.endDate);
      temp = temp.filter(client => {
        if (!client.fechafin) return false;
        const clientDate = this.parseDate(client.fechafin);
        return clientDate ? clientDate <= endDateAsDate : false;
      });
    }
    this.filteredClients = [...temp];
  }

  onMembershipFilterChange() {
    this.applyFilter();
  }


  clear() {
    this.searchQuery = '';
    this.selectedMembership = '';
    this.startDate = '';
    this.endDate = '';
    this.filteredClients = [...this.clients];
  }

  // Agregar
  openAddClientModal() {
    this.isAddClientModalOpen = true;
  }
  closeAddClientModal() {
    this.isAddClientModalOpen = false;
    this.newClient = {
      id: '',
      foto: '',
      nip: '',
      nombre: '',
      celular: '',
      Obsevacion: '',
      nameuser: ''
    };
    this.modifyUsernameAdd = false;
  }
  // guardar cliente
  saveClient() {
    // Ejemplo de generar NIP automáticamente:
    this.newClient.nip = 'E' + Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
      
    this.clients.push(this.newClient);
    this.filteredClients = [...this.clients];
    this.closeAddClientModal();
  }
  onFileSelectedAdd(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.newClient.foto = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Membresía
  onMembership(client: Client) {
    this.clientForMembership = client;
    this.selectedMembershipModal = client.membresia || '';
    this.isMembershipModalOpen = true;
  }
  confirmMembership() {
    if (this.clientForMembership) {
      this.clientForMembership.membresia = this.selectedMembershipModal;
      this.filteredClients = [...this.clients];
      this.clientForMembership = null;
      this.selectedMembershipModal = '';
      this.isMembershipModalOpen = false;
    }
  }
  closeMembershipModal() {
    this.isMembershipModalOpen = false;
    this.clientForMembership = null;
    this.selectedMembershipModal = '';
  }

  // Editar
  editClient(client: Client) {
    this.selectedClient = client;
    this.editClientData = { ...client };
    // Activar checkbox si ya existe un nameuser
    this.modifyUsernameEdit = !!client.nameuser;
    this.isEditClientModalOpen = true;
  }
  closeEditClientModal() {
    this.isEditClientModalOpen = false;
    this.editClientData = {
      id: '',
      foto: '',
      nip: '',
      nombre: '',
      celular: '',
      Obsevacion: '',
      nameuser: ''
    };
    this.modifyUsernameEdit = false;
    this.selectedClient = null;
  }
  updateClient() {
    if (this.selectedClient) {
      const index = this.clients.findIndex(c => c.id === this.selectedClient!.id);
      if (index !== -1) {
        // Si no se marca el checkbox, conservamos el nameuser anterior
        if (!this.modifyUsernameEdit) {
          this.editClientData.nameuser = this.selectedClient.nameuser;
        }
        this.clients[index] = { ...this.editClientData };
        this.filteredClients = [...this.clients];
      }
    }
    this.closeEditClientModal();
  }
  onFileSelectedEdit(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.editClientData.foto = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Eliminar
  deleteClient(client: Client) {
    this.clientToDelete = client;
    this.isDeleteClientModalOpen = true;
  }
  confirmDelete() {
    if (this.clientToDelete) {
      this.clients = this.clients.filter(c => c.id !== this.clientToDelete!.id);
      this.filteredClients = [...this.clients];
    }
    this.closeDeleteClientModal();
  }
  closeDeleteClientModal() {
    this.isDeleteClientModalOpen = false;
    this.clientToDelete = null;
  }
}