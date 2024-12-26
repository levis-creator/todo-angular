import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoItem } from '../lib/type';
import { Observable } from 'rxjs';
import { apiUrl } from '../lib/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class TodosServicesService {
  private appApiUrl = apiUrl
  private usedApiUrl=`${this.appApiUrl}/todoitems`

  constructor(private http:HttpClient) { }
  // GET: Fetch all todos
  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.usedApiUrl);
  }

  // GET: Fetch a single todo by ID
  getTodoById(id: number): Observable<TodoItem> {
    return this.http.get<TodoItem>(`${this.usedApiUrl}/${id}`);
  }

  // POST: Add a new todo
  addTodo(todo: TodoItem): Observable<TodoItem>{
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<TodoItem>(this.usedApiUrl, todo, { headers })
  }

  // PUT: Update an existing todo by ID
  updateTodo(id: number, todo: TodoItem){
    return this.http.put<TodoItem>(`${this.usedApiUrl}/${id}`, todo);
  }

  // DELETE: Remove a todo by ID
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.usedApiUrl}/${id}`);
  }
}
