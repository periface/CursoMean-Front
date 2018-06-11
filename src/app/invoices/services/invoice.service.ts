import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice, InvoicesPaginationResponse } from '../models/invoice';
const BASE_URL = 'http://localhost:3000/api';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(private httpClient: HttpClient) {}

  getInvoices({
    page = 1,
    perPage = 10,
    sortField,
    sortDir,
    filter= ''
  }): Observable<InvoicesPaginationResponse> {
    let queryString = `${BASE_URL}/invoices?page=${page +
      1}&perPage=${perPage}`;
    if (sortField && sortDir) {
      queryString = `${queryString}&sortField=${sortField}&sortDir=${sortDir}`;
    }

    if (filter) {
      queryString = `${queryString}&filter=${filter}`;
    }

    return this.httpClient.get<InvoicesPaginationResponse>(queryString);
  }
  createInvoice(body: Invoice): Observable<Invoice> {
    return this.httpClient.post<Invoice>(`${BASE_URL}/invoices`, body);
  }
  deleteInvoice(id: string): Observable<Invoice> {
    return this.httpClient.delete<Invoice>(`${BASE_URL}/invoices/${id}`);
  }
  findById(id: string) {
    return this.httpClient.get<Invoice>(`${BASE_URL}/invoices/${id}`);
  }
  update(id: string, body: Invoice) {
    return this.httpClient.put<Invoice>(`${BASE_URL}/invoices/${id}`, body);
  }
}
