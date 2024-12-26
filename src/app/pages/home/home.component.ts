import { Component, OnInit } from '@angular/core';
import { TodoitemComponent } from "../../components/todoitem/todoitem.component";
import { TodoItem } from '../../lib/type';
import { RouterLink } from '@angular/router';
import { TodosServicesService } from '../../services/todos-services.service';
import { EditmodelComponent } from "../../components/editmodel/editmodel.component";

@Component({
  selector: 'app-home',
  imports: [TodoitemComponent, RouterLink, EditmodelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  todoList:TodoItem[]=[]
  constructor(private todoService:TodosServicesService) {
  }
  ngOnInit(): void {
    this.todoService.getTodos().subscribe((data:any[])=>{
      this.todoList=data
    })
  }
  handleRemove(id:number){
    const newItems=this.removeTodoById(this.todoList, id)
    this.todoList=newItems
  }
 protected removeTodoById(todos: TodoItem[], id: number): TodoItem[] {
    return todos.filter(todo => todo.itemId !== id);
  }
}
