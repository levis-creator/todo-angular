import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { TodoformComponent } from '../../components/todoform/todoform.component';
import { AdditemComponent } from './additem.component';

describe('AdditemComponent', () => {
  let component: AdditemComponent;
  let fixture: ComponentFixture<AdditemComponent>;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      imports: [AdditemComponent, TodoformComponent],
      providers: [
                provideRouter([]), // Provide router configuration
                provideHttpClient(), // Provide HttpClient for testing
       ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(TodoformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
