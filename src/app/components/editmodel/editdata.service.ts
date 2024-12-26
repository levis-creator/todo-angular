import { Injectable } from '@angular/core';
import { TodoItem } from '../../lib/type';

@Injectable({
  providedIn: 'root',
})
export class EditdataService {
  public isOpen= false;
  public data: TodoItem = {
    taskDescription: '',
    taskName: '',
    isCompleted: false,
  };

  handleModelVisibility() {
    this.isOpen = !this.isOpen;
  }

  handleDataSetting(data: TodoItem) {
    this.data = data;
  }
}
