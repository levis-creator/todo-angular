import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TodosServicesService } from './todos-services.service';
import { TodoItem } from '../lib/type';

describe('TodosServicesService', () => {
  let service: TodosServicesService;
  let httpMock: HttpTestingController;

  const mockTodos: TodoItem[] = [
    {
      itemId: 1,
      taskName: 'Test Task 1',
      taskDescription: 'Description for Task 1',
      isCompleted: false,
    },
    {
      itemId: 2,
      taskName: 'Test Task 2',
      taskDescription: 'Description for Task 2',
      isCompleted: true,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        TodosServicesService,
      ],
    });

    service = TestBed.inject(TodosServicesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all todos', () => {
    service.getTodos().subscribe((todos) => {
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne(service['usedApiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('should fetch a single todo by ID', () => {
    const todoId = 1;
    const mockTodo: TodoItem = {
      itemId: todoId,
      taskName: 'Test Task 1',
      taskDescription: 'Description for Task 1',
      isCompleted: false,
    };

    service.getTodoById(todoId).subscribe((todo) => {
      expect(todo).toEqual(mockTodo);
    });

    const req = httpMock.expectOne(`${service['usedApiUrl']}/${todoId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodo);
  });

  it('should add a new todo', () => {
    const newTodo: TodoItem = {
      taskName: 'New Task',
      taskDescription: 'Description for new task',
      isCompleted: false,
    };

    const createdTodo: TodoItem = { ...newTodo, itemId: 3 };

    service.addTodo(newTodo).subscribe((todo) => {
      expect(todo).toEqual(createdTodo);
    });

    const req = httpMock.expectOne(service['usedApiUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTodo);
    req.flush(createdTodo);
  });

  it('should update an existing todo', () => {
    const updatedTodo: TodoItem = {
      itemId: 1,
      taskName: 'Updated Task',
      taskDescription: 'Updated description',
      isCompleted: true,
    };

    service.updateTodo(updatedTodo.itemId!, updatedTodo).subscribe((todo) => {
      expect(todo).toEqual(updatedTodo);
    });

    const req = httpMock.expectOne(`${service['usedApiUrl']}/${updatedTodo.itemId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTodo);
    req.flush(updatedTodo);
  });

  it('should delete a todo by ID', () => {
    const todoId = 1; // The ID of the todo to delete

    service.deleteTodo(todoId).subscribe((response) => {
      // The response is expected to be void (undefined)
      expect(response).toBeNull();
    });

    // Verify that the correct DELETE request was made
    const req = httpMock.expectOne(`${service['usedApiUrl']}/${todoId}`);
    expect(req.request.method).toBe('DELETE'); // The method should be DELETE

    // Simulate a successful server response (void/empty)
    req.flush(null);
  });

});
