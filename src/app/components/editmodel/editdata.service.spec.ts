import { TestBed } from '@angular/core/testing';
import { EditdataService } from './editdata.service';
import { TodoItem } from '../../lib/type';

describe('EditdataService', () => {
  let service: EditdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle `isOpen` when `handleModelVisibility` is called', () => {
    // Initial state
    expect(service.isOpen).toBeFalse();

    // Toggle state
    service.handleModelVisibility();
    expect(service.isOpen).toBeTrue();

    // Toggle again
    service.handleModelVisibility();
    expect(service.isOpen).toBeFalse();
  });

  it('should update `data` when `handleDataSetting` is called', () => {
    const mockData: TodoItem = {
      taskDescription: 'Test Task Description',
      taskName: 'Test Task Name',
      isCompleted: true,
    };

    // Update the data
    service.handleDataSetting(mockData);

    // Check if data is updated
    expect(service.data).toEqual(mockData);
  });

  it('should have default `data` values initially', () => {
    expect(service.data).toEqual({
      taskDescription: '',
      taskName: '',
      isCompleted: false,
    });
  });
});
