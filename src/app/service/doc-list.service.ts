import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
  private uploadUrl = "http://localhost:8081/api/v1/upload";

  getAll(order: string, direction: string): Observable<any[]> {
    const params = new HttpParams()
      .set('orderBy', order)
      .set('direction', direction);

    return this.http.get<any[]>(`${this.baseUrl}`, { params });
  }

  deleteDocument(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  createDocument(document: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, document);
  }

  updateDocument(id: string, document: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, document);
  }

  submitDocument(id: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}/submit`, {});
  }

  obsoleteDocument(id: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}/obsolete`, {});
  }

  createNewVersion(id: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}/newVersion`, {});
  }

  exportDocuments(documentIds: string[]): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Blob>(`${this.baseUrl}/export`, documentIds, { responseType: 'blob' as 'json' });
  }

  uploadCsvFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.uploadUrl, formData);
  }

  filterDocuments(filters: any): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.baseUrl}/filter`, { params: filters });
  }

}
