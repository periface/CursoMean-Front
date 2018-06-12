import { Invoice } from './../models/invoice';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { InvoiceService } from './invoice.service';
import { take } from 'rxjs/internal/operators/take';
import { map } from 'rxjs/internal/operators/map';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EditInvoiceResolverService implements Resolve<Invoice> {
  constructor(private invoiceService: InvoiceService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Invoice> {
    const id = route.paramMap.get('id');
    return this.invoiceService.findById(id).pipe(
      take(1),
      map(invoice => {
        if (invoice) {
          return invoice;
        } else {
          this.router.navigate(['/dashboard', 'invoices']);
          return null;
        }
      })
    );
  }
}
