import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { TodoItem } from '../../lib/type';
import { TodosServicesService } from '../../services/todos-services.service';
import { EditdataService } from '../editmodel/editdata.service';
import { EditmodelComponent } from "../editmodel/editmodel.component";
@Component({
  selector: 'app-todoitem',
  imports: [FeatherModule, CommonModule, EditmodelComponent],
  templateUrl: './todoitem.component.html',
  styleUrl: './todoitem.component.css',
})
export class TodoitemComponent {
  @Input() data: TodoItem = {
    taskName: '',
    isCompleted: false,
    taskDescription: '',
  };
  @Output() removeFromList = new EventEmitter<number>();
  @Output() editList=new EventEmitter<TodoItem>()
  dropDown = false;
  isOpen=signal(false)
  constructor(
    private todoService: TodosServicesService,
    private editService:EditdataService
  ) {
    this.isOpen.set(this.editService.isOpen)
  }


  handleDropDown() {
    this.dropDown = !this.dropDown;
  }

  handleEditModel(){
    this.editService.handleModelVisibility()
    this.editService.handleDataSetting(this.data)
    this.isOpen.set(this.editService.isOpen)
  }
  async handleDelete(id: number) {
    console.log(this.data);
    await this.todoService.deleteTodo(id).subscribe(() => {
      this.removeFromList.emit(id);
    });
  }
}
