import { TestBed } from '@angular/core/testing';

import { TodosServicesService } from './todos-services.service';

describe('TodosServicesService', () => {
  let service: TodosServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodosServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
