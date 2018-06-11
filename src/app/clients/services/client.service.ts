import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client';
import { Observable } from 'rxjs';
const BASE_URL = 'http://localhost:3000/api';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private httpClient: HttpClient) {}
  getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${BASE_URL}/clients`);
  }
  getClientById(id: string): Observable<Client> {
    return this.httpClient.get<Client>(`${BASE_URL}/clients/${id}`);
  }
  createClient(body: Client): Observable<Client> {
    return this.httpClient.post<Client>(`${BASE_URL}/clients`, body);
  }
  updateClient(id: string, body: any) {
    return this.httpClient.put<Client>(`${BASE_URL}/clients/${id}`, body);
  }
  deleteClient(id: string): Observable<Client> {
    return this.httpClient.delete<Client>(`${BASE_URL}/clients/${id}`);
  }
}
