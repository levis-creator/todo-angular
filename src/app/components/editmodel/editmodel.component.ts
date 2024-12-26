import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { TodoItem } from '../../lib/type';
import { TodoformComponent } from "../todoform/todoform.component";
import { EditdataService } from './editdata.service';

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

    this.editService.handleModelVisibility()
    this.isOpen.set(this.editService.isOpen)
  }
}
