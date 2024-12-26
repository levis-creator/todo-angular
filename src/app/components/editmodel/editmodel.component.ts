import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, signal } from '@angular/core';
import { EditdataService } from './editdata.service';
import { TodoformComponent } from "../todoform/todoform.component";
import { TodoItem } from '../../lib/type';

@Component({
  selector: 'app-editmodel',
  imports: [CommonModule, TodoformComponent],
  templateUrl: './editmodel.component.html',
  styleUrl: './editmodel.component.css',
})
export class EditmodelComponent implements OnInit {
  isOpen = signal(false)
  data=signal<TodoItem>({ taskName:"",
    taskDescription:"",
    isCompleted:false,})
  constructor(private editService:EditdataService) {
  
  }
  ngOnInit(): void {
    this.isOpen.set(this.editService.isOpen)
    this.data.set(this.editService.data)
  }
    
  handleModelvisibility() {

    this.editService.handleModelvisibilitY()
    this.isOpen.set(this.editService.isOpen)
  }
}
