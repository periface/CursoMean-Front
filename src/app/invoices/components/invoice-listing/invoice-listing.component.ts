import { startWith, switchMap, map, catchError } from 'rxjs/internal/operators';
import { remove } from 'lodash';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import {
  MatSnackBar,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { Router } from '@angular/router';
import {of, merge} from 'rxjs';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit, AfterViewInit {
  resultLength = 0;
  displayedColumns = ['item', 'date', 'due', 'qty', 'rate', 'tax', 'action'];
  dataSource: MatTableDataSource<Invoice> = new MatTableDataSource<Invoice>();
  loading = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private invoiceService: InvoiceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  saveBtnHandler() {
    this.router.navigate(['dashboard', 'invoices', 'new']);
  }
  ngOnInit() {}
  filterValue(value: string) {
    this.loading = true;
    this.paginator.pageIndex = 0;
    value = value.trim();
    this.invoiceService
      .getInvoices({
        page: this.paginator.pageIndex,
        perPage: this.paginator.pageSize,
        sortField: this.sort.active,
        sortDir: this.sort.direction,
        filter: value
      })
      .subscribe(
        data => {
          this.dataSource.data = data.docs;
          this.resultLength = data.total;
          this.loading = false;
        },
        error => {
          this.snackBar.open(
            'Ocurrio un error, no se pudieron obtener los datos...',
            'Cerrar',
            {
              duration: 3000
            }
          );
        }
      );
  }
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;
          return this.invoiceService.getInvoices({
            page: this.paginator.pageIndex,
            perPage: this.paginator.pageSize,
            sortField: this.sort.active,
            sortDir: this.sort.direction
          });
        }),
        map(data => {
          this.loading = false;
          this.resultLength = data.total;
          return data.docs;
        }),
        catchError(err => {
          this.loading = false;
          this.snackBar.open(
            'Ocurrio un error, no se pudieron obtener los datos...',
            'Cerrar',
            {
              duration: 3000
            }
          );
          console.log(err);
          return [];
        })
      )
      .subscribe(data => {
        this.loading = false;
        this.dataSource.data = data;
      });
  }
  delete(id) {
    this.invoiceService.deleteInvoice(id).subscribe(invoice => {
      remove(this.dataSource.data, item => {
        return item._id === invoice._id;
      });
      this.dataSource.data = [...this.dataSource.data];
      this.snackBar.open(`Invoice ${invoice.item} deleted...`, 'Close', {
        duration: 3000
      });
    });
  }
  edit(id) {
    this.router.navigate(['dashboard', 'invoices', id]);
  }
}
