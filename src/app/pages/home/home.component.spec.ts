import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { provideRouter, RouterLink, Routes } from '@angular/router';
import { TodosServicesService } from '../../services/todos-services.service';
import { TodoItem } from '../../lib/type';
import { of } from 'rxjs';
import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { FeatherModule } from 'angular-feather';
import { AlertCircle, CheckCircle } from 'angular-feather/icons'; // Import icons directly
import { By } from '@angular/platform-browser';

const routes: Routes = [{ path: '', component: HomeComponent }];
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockTodoService: jasmine.SpyObj<TodosServicesService>;
  const mockTodos: TodoItem[] = [
    {
      itemId: 1,
      taskName: 'Task 1',
      taskDescription: 'Description 1',
      isCompleted: false,
    },
    {
      itemId: 2,
      taskName: 'Task 2',
      taskDescription: 'Description 2',
      isCompleted: true,
    },
  ];

  beforeEach(waitForAsync(() => {
    mockTodoService = jasmine.createSpyObj('TodosServicesService', [
      'getTodos',
    ]);
    mockTodoService.getTodos.and.returnValue(of(mockTodos)); // Mock observable return value

    TestBed.configureTestingModule({
      imports: [HomeComponent, RouterLink],
      providers: [
        provideZoneChangeDetection({ eventCoalescing: true }), // Enable event coalescing for zone change detection
        provideRouter(routes), // Provide router configuration
        provideHttpClient(), // Provide HttpClient for testing
        importProvidersFrom(FeatherModule.pick({ AlertCircle, CheckCircle })), // Select specific icons or all
        { provide: TodosServicesService, useValue: mockTodoService }, // Mock service
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize `todoList` with data from the service', () => {
    expect(component.todoList).toEqual(mockTodos);
    expect(mockTodoService.getTodos).toHaveBeenCalledTimes(1);
  });
  it('should call `removeTodoById` and update `todoList` when `handleRemove` is called', () => {
    spyOn(component, 'removeTodoById').and.callThrough();

    // Call the method
    component.handleRemove(1);

    // Expect the helper function to be called
    expect(component.removeTodoById).toHaveBeenCalledWith(mockTodos, 1);

    // Check that the `todoList` has been updated
    expect(component.todoList).toEqual([
      {
        itemId: 2,
        taskName: 'Task 2',
        taskDescription: 'Description 2',
        isCompleted: true,
      },
    ]);
  });
  it('should remove a todo by ID using `removeTodoById`', () => {
    const updatedTodos = component.removeTodoById(mockTodos, 1);
    expect(updatedTodos).toEqual([
      {
        itemId: 2,
        taskName: 'Task 2',
        taskDescription: 'Description 2',
        isCompleted: true,
      },
    ]);
  });
  it('should render app-todoitem components when todoList has items', () => {
    // Set todoList to mockTodos (non-empty list)
    component.todoList = mockTodos;
    fixture.detectChanges(); // Trigger change detection

    // Check if the app-todoitem components are rendered
    const todoItems = fixture.debugElement.queryAll(By.css('app-todoitem'));
    expect(todoItems.length).toBe(mockTodos.length);
  });
  it('should render the "Add todo" link when todoList is empty', () => {
    // Set todoList to mockEmptyTodos (empty list)
    component.todoList = [];
    fixture.detectChanges(); // Trigger change detection

    // Check if the "Add todo" link is rendered
    const addTodoLink = fixture.debugElement.query(By.css('a'));
    expect(addTodoLink).toBeTruthy();
    expect(addTodoLink.nativeElement.textContent).toContain('Add todo');
  });
  it('should call handleRemove when removeFromList is emitted from app-todoitem', () => {
    // Set todoList to mockTodos
    component.todoList = mockTodos;
    fixture.detectChanges();

    // Spy on the handleRemove method
    spyOn(component, 'handleRemove');

    // Trigger the removeFromList event
    const todoItemComponent = fixture.debugElement.queryAll(By.css('app-todoitem'))[0];
    todoItemComponent.triggerEventHandler('removeFromList', mockTodos[0].itemId);

    // Expect handleRemove to have been called
    expect(component.handleRemove).toHaveBeenCalledWith(mockTodos[0].itemId as number);
  });
});
