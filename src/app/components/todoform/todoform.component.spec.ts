import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoformComponent } from './todoform.component';
import { TodosServicesService } from '../../services/todos-services.service';
import { provideRouter, Router } from '@angular/router';
import { EditdataService } from '../editmodel/editdata.service';
import { of } from 'rxjs';
import { TodoItem } from '../../lib/type';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('TodoformComponent', () => {
  let component: TodoformComponent;
  let fixture: ComponentFixture<TodoformComponent>;
  let mockTodoService: jasmine.SpyObj<TodosServicesService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockEditDataService: jasmine.SpyObj<EditdataService>;

  const mockTodo: TodoItem = {
    itemId: 1,
    taskName: 'Test Todo',
    taskDescription: 'Test Description',
    isCompleted: false,
  };

  const mockEmptyTodo: TodoItem = {
    taskName: '',
    taskDescription: '',
    isCompleted: false,
  };

  beforeEach(async () => {
    mockTodoService = jasmine.createSpyObj('TodosServicesService', [
      'addTodo',
      'updateTodo',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockEditDataService = jasmine.createSpyObj('EditdataService', [
      'handleModelVisibility',
    ]);

    await TestBed.configureTestingModule({
      imports: [TodoformComponent, CommonModule, FormsModule],
      providers: [
        provideHttpClient(),
        provideRouter([]),

        { provide: TodosServicesService, useValue: mockTodoService },
        { provide: Router, useValue: mockRouter },
        { provide: EditdataService, useValue: mockEditDataService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set message when taskName is empty', async () => {
    component.todoItem = mockEmptyTodo;
    await component.addTodoItem();
    expect(component.message).toBe('task name is empty!');
  });

  it('should call addTodo and navigate when not in edit mode', async () => {
    component.todoItem = mockTodo;
    component.editForm = false;

    mockTodoService.addTodo.and.returnValue(of(mockTodo));

    await component.addTodoItem();

    expect(mockTodoService.addTodo).toHaveBeenCalledWith(mockTodo);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    expect(component.message).toBe('');
  });

  it('should call updateTodo and show success message when in edit mode', async () => {
    component.todoItem = mockTodo;
    component.editForm = true;

    mockTodoService.updateTodo.and.returnValue(of(mockTodo));

    await component.addTodoItem();

    expect(mockTodoService.updateTodo).toHaveBeenCalledWith(
      mockTodo.itemId as number,
      mockTodo
    );
    expect(mockEditDataService.handleModelVisibility).toHaveBeenCalled();
    expect(component.message).toBe('Todo Item edited successful!');
  });

  it('should not call addTodo or updateTodo if taskName is empty', async () => {
    component.todoItem = mockEmptyTodo;
    await component.addTodoItem();
    expect(mockTodoService.addTodo).not.toHaveBeenCalled();
    expect(mockTodoService.updateTodo).not.toHaveBeenCalled();
  });

});
