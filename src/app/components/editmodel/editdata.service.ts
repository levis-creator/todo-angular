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

  handleModelVisibility() {
    this.isOpen = !this.isOpen;
  }

  handleDataSetting(data: TodoItem) {
    this.data = data;
  }
}
