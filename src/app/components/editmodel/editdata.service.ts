import { Injectable } from '@angular/core';
import { TodoItem } from '../../lib/type';

@Injectable({
  providedIn: 'root',
})
export class EditdataService {
  public isOpen: boolean = false;
  public data: TodoItem = {
    taskDescription: '',
    taskName: '',
    isCompleted: false,
  };
  constructor() {}
  handleModelvisibilitY() {
    this.isOpen = !this.isOpen;
  }
  handleDataSeting(data:TodoItem){
    this.data=data
  }
}
