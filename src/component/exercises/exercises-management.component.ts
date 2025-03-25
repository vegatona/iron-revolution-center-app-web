import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

interface Exercise {
  nip: string;
  name: string;
  type: string;
  description: string;
  series: number;
  repetitions: number;
  photo: string;
}

@Component({
  selector: 'app-exercises-management',
  standalone: true,
  templateUrl: './exercises-management.component.html',
  styleUrls: ['./exercises-management.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ]
})
export class ExercisesManagementComponent {
  displayedColumns: string[] = [ 'photo','nip', 'name', 'type', 'description', 'series', 'repetitions', 'actions'];
  exercises: Exercise[] = [
    {
      photo: 'assets/images/pecho.jpg',
      nip: 'E001',
      name: 'Press plano',
      type: 'Pecho',
      description: '',
      series: 3,
      repetitions: 12
      
    },
    {
      photo: 'assets/images/equida.jpg',
      nip: 'E002',
      name: 'Jalon al pecho',
      type: 'Espalda',
      description: '',
      series: 3,
      repetitions: 12
      
    },
    {
      photo: 'assets/images/pierna.jpg',
      nip: 'E003',
      name: 'Prensa',
      type: 'Pierna',
      description: '',
      series: 3,
      repetitions: 12
    },
    {
      photo: 'assets/images/brazo.jpg',
      nip: 'E004',
      name: 'Curl martillo',
      type: 'Brazo',
      description: '',
      series: 3,
      repetitions: 12
    },
    {
      photo: 'assets/images/tricep.jpg',
      nip: 'E005',
      name: 'Press frances',
      type: 'Tricep',
      description: '',
      series: 3,
      repetitions: 12
    }
  ];

  filteredExercises: Exercise[] = [...this.exercises];
  searchQuery: string = '';
  selectedType: string = '';
  exerciseTypes: string[] = ['Pecho', 'Espalda', 'Pierna', 'Brazo','Tricep'];

  isAddExerciseModalOpen: boolean = false;
  isEditExerciseModalOpen: boolean = false;
  isDeleteExerciseModalOpen: boolean = false;
  newExercise: Exercise = { nip: '', name: '', type: '', description: '', series: 0, repetitions: 0, photo: '' };
  editExerciseData: Exercise = { nip: '', name: '', type: '', description: '', series: 0, repetitions: 0, photo: '' };
  selectedExercise: Exercise | null = null;
  exerciseToDelete: Exercise | null = null;

  // Método para aplicar el filtro
  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.filteredExercises = this.exercises.filter(exercise =>
      (exercise.name.toLowerCase().includes(filterValue) &&
      (this.selectedType === '' || exercise.type === this.selectedType)
    ));
  }

  // Método para limpiar el filtro
  clear() {
    this.searchQuery = '';
    this.selectedType = '';
    this.filteredExercises = [...this.exercises];
  }

  // Método para abrir el modal de agregar ejercicio
  openAddExerciseModal() {
    this.isAddExerciseModalOpen = true;
  }

  // Método para cerrar el modal de agregar ejercicio
  closeAddExerciseModal() {
    this.isAddExerciseModalOpen = false;
    this.newExercise = { nip: '', name: '', type: '', description: '', series: 0, repetitions: 0, photo: '' };
  }

  // Método para guardar el nuevo ejercicio
  saveExercise() {
    this.newExercise.nip = 'E' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.exercises.push(this.newExercise);
    this.filteredExercises = [...this.exercises];
    this.closeAddExerciseModal();
  }





// Función para validar el formulario
isFormValid(): boolean {
  return !!this.newExercise.name && 
         !!this.newExercise.type && 
         !!this.newExercise.description && 
         this.newExercise.series !== null && 
         this.newExercise.repetitions !== null;
}

// Función para manejar la selección de archivos (similar al código original)
onFileSelectedAdd(event: any) {
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.newExercise.photo = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}






  // Método para abrir el modal de editar ejercicio
  editExercise(exercise: Exercise) {
    this.selectedExercise = exercise;
    this.editExerciseData = { ...exercise };
    this.isEditExerciseModalOpen = true;
  }

  // Método para cerrar el modal de editar ejercicio
  closeEditExerciseModal() {
    this.isEditExerciseModalOpen = false;
    this.editExerciseData = { nip: '', name: '', type: '', description: '', series: 0, repetitions: 0, photo: '' };
    this.selectedExercise = null;
  }

  // Método para actualizar el ejercicio
  updateExercise() {
    if (this.selectedExercise) {
      const index = this.exercises.findIndex(e => e.nip === this.selectedExercise!.nip);
      if (index !== -1) {
        this.exercises[index] = { ...this.editExerciseData };
        this.filteredExercises = [...this.exercises];
      }
    }
    this.closeEditExerciseModal();
  }

  // Método para abrir el modal de eliminar ejercicio
  deleteExercise(exercise: Exercise) {
    this.exerciseToDelete = exercise;
    this.isDeleteExerciseModalOpen = true;
  }

  // Método para confirmar la eliminación del ejercicio
  confirmDelete() {
    if (this.exerciseToDelete) {
      this.exercises = this.exercises.filter(e => e.nip !== this.exerciseToDelete!.nip);
      this.filteredExercises = [...this.exercises];
    }
    this.closeDeleteExerciseModal();
  }

  // Método para cerrar el modal de eliminar ejercicio
  closeDeleteExerciseModal() {
    this.isDeleteExerciseModalOpen = false;
    this.exerciseToDelete = null;
  }
}