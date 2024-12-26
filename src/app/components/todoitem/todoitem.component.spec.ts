import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoitemComponent } from './todoitem.component';
import { TodoItem } from '../../lib/type';
import { TodosServicesService } from '../../services/todos-services.service';
import { EditdataService } from '../editmodel/editdata.service';
import { FeatherModule } from 'angular-feather';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { EditmodelComponent } from '../editmodel/editmodel.component';
import { importProvidersFrom } from '@angular/core';
import { MoreHorizontal, MoreVertical } from 'angular-feather/icons';
import { provideHttpClient } from '@angular/common/http';

describe('TodoitemComponent', () => {
  let component: TodoitemComponent;
  let fixture: ComponentFixture<TodoitemComponent>;
  let todoServiceMock: jasmine.SpyObj<TodosServicesService>;
  let editServiceMock: jasmine.SpyObj<EditdataService>;

  const mockTodoItem: TodoItem = {
    itemId: 1,
    taskName: 'Test Task',
    taskDescription: 'Test Description',
    isCompleted: false,
  };

  beforeEach(async () => {
    todoServiceMock = jasmine.createSpyObj('TodosServicesService', [
      'deleteTodo',
    ]);
    editServiceMock = jasmine.createSpyObj('EditdataService', [
      'handleModelVisibility',
      'handleDataSetting',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        FeatherModule,
        CommonModule,
        EditmodelComponent,
        TodoitemComponent,
      ],
      providers: [
        { provide: TodosServicesService, useValue: todoServiceMock },
        { provide: EditdataService, useValue: editServiceMock },
        importProvidersFrom(
          FeatherModule.pick({ MoreHorizontal, MoreVertical })
        ),
        provideHttpClient(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoitemComponent);
    component = fixture.componentInstance;
    component.data = mockTodoItem;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render taskName and taskDescription', () => {
    // Mock input data
    component.data = {
      taskName: 'Test Task',
      taskDescription: 'Test Description',
      isCompleted: false,
    };

    // Trigger change detection
    fixture.detectChanges();

    // Query the DOM elements
    const taskNameElement = fixture.debugElement.query(By.css('.task-name'));
    const taskDescriptionElement = fixture.debugElement.query(
      By.css('.task-description')
    );

    // Assert that the elements exist and have the correct text
    expect(taskNameElement).toBeTruthy();
    expect(taskNameElement.nativeElement.textContent).toContain('Test Task');

    expect(taskDescriptionElement).toBeTruthy();
    expect(taskDescriptionElement.nativeElement.textContent).toContain(
      'Test Description'
    );
  });

  it('should toggle dropdown state when handleDropDown is called', () => {
    expect(component.dropDown).toBeFalse();
    component.handleDropDown();
    expect(component.dropDown).toBeTrue();
    component.handleDropDown();
    expect(component.dropDown).toBeFalse();
  });

  it('should interact with EditdataService when handleEditModel is called', () => {
    component.handleEditModel();

    expect(editServiceMock.handleModelVisibility).toHaveBeenCalled();
    expect(editServiceMock.handleDataSetting).toHaveBeenCalledWith(
      mockTodoItem
    );
    expect(component.isOpen()).toBe(editServiceMock.isOpen);
  });

  it('should call deleteTodo and emit removeFromList when handleDelete is called', fakeAsync(() => {
    todoServiceMock.deleteTodo.and.returnValue(of(undefined));

    spyOn(component.removeFromList, 'emit');

    component.handleDelete(mockTodoItem.itemId as number);
    tick(); // Simulates the passage of time to resolve the observable

    expect(todoServiceMock.deleteTodo).toHaveBeenCalledWith(
      mockTodoItem.itemId as number
    );
    expect(component.removeFromList.emit).toHaveBeenCalledWith(
      mockTodoItem.itemId
    );
  }));
});
