import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoItem } from '../../lib/type';
import { TodosServicesService } from '../../services/todos-services.service';
import { EditdataService } from '../editmodel/editdata.service';
@Component({
  selector: 'app-todoform',
  imports: [FormsModule],
  templateUrl: './todoform.component.html',
  styleUrl: './todoform.component.css',
})
export class TodoformComponent {
  @Input() todoItem: TodoItem = {
    taskName: '',
    taskDescription: '',
    isCompleted: false,
  };
  @Input() editForm = false;
  @Input() closeModel=()=>{}
  message = '';
  constructor(
    private todoservice: TodosServicesService,
    private router: Router,
    private editService:EditdataService
   
  ) {}
  async addTodoItem() {
    if (!this.todoItem.taskName) {
      this.message = 'task name is empty!';
      return;
    }
    this.message = '';
    if (!this.editForm) {
      await this.todoservice.addTodo(this.todoItem).subscribe((res) => {
        if (res) {
          this.router.navigate(['/']);
        }
        return;
      });
    } else {
      await this.todoservice
        .updateTodo(this.todoItem.itemId as number, this.todoItem).subscribe(()=>{

          this.message="Todo Item edited successful!"
          this.editService.handleModelvisibilitY()
        })
    }
  }
}
2