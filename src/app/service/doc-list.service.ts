import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocListService {

  private http!: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  private baseUrl = "http://localhost:8081/api/v1/documents";

  getAll():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl)
  }
}
