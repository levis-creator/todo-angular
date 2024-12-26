import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditmodelComponent } from './editmodel.component';
import { EditdataService } from './editdata.service';
import { TodoItem } from '../../lib/type';
import { CommonModule } from '@angular/common';
import { TodoformComponent } from '../todoform/todoform.component';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('EditmodelComponent', () => {
  let component: EditmodelComponent;
  let fixture: ComponentFixture<EditmodelComponent>;
  let editDataService: EditdataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, TodoformComponent, EditmodelComponent, CommonModule],

      providers: [
        EditdataService,
        provideRouter([]), // Provide router configuration
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditmodelComponent);
    component = fixture.componentInstance;
    editDataService = TestBed.inject(EditdataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize `isOpen` and `data` signals based on `EditdataService`', () => {
    expect(component.isOpen()).toBe(editDataService.isOpen);
    expect(component.data()).toEqual(editDataService.data);
  });

  it('should toggle `isOpen` when `handleModelvisibility` is called', () => {
    // Initial state
    expect(component.isOpen()).toBeFalse();

    // Call the method
    component.handleModelvisibility();
    fixture.detectChanges();

    // Check the state
    expect(component.isOpen()).toBeTrue();
    expect(editDataService.isOpen).toBeTrue();

    // Call the method again
    component.handleModelvisibility();
    fixture.detectChanges();

    // Check the state
    expect(component.isOpen()).toBeFalse();
    expect(editDataService.isOpen).toBeFalse();
  });

  it('should update `data` when `EditdataService` data is updated', () => {
    const mockData: TodoItem = {
      taskName: 'Updated Task Name',
      taskDescription: 'Updated Task Description',
      isCompleted: true,
    };

    editDataService.handleDataSetting(mockData);
    component.data.set(editDataService.data);

    fixture.detectChanges();

    expect(component.data()).toEqual(mockData);
    expect(editDataService.data).toEqual(mockData);
  });

  it('should call `handleModelvisibility` and toggle the visibility of the model', () => {
    // Initial state should be closed
    expect(component.isOpen()).toBeFalse();

    // Simulate opening the model
    component.handleModelvisibility();
    fixture.detectChanges();

    expect(component.isOpen()).toBeTrue();

    // Simulate closing the model
    component.handleModelvisibility();
    fixture.detectChanges();

    expect(component.isOpen()).toBeFalse();
  });
});
