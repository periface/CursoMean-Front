import { remove } from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { MatSnackBar, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {
  resultLength = 0;
  displayedColumns = ['item', 'date', 'due', 'qty', 'rate', 'tax', 'action'];
  dataSource: Invoice[] = [];
  loading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private invoiceService: InvoiceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  saveBtnHandler() {
    this.router.navigate(['dashboard', 'invoices', 'new']);
  }
  ngOnInit() {

    this.paginator.page.subscribe(data => {
      this.loading = true;
      this.invoiceService
        .getInvoices({ page: ++data.pageIndex, perPage: data.pageSize })
        .subscribe(
          result => {
            this.loading = false;
            this.dataSource = result.docs;
            this.resultLength = result.total;
          },
          err => {
            this.snackBar.open(
              'Ocurrio un error, no se pudieron obtener los datos...',
              'Cerrar',
              {
                duration: 3000
              }
            );
          }
        );
    });

    this.populateInvoices();
  }
  private populateInvoices() {
    this.loading = true;
    this.invoiceService.getInvoices({ page: 1, perPage: 10 }).subscribe(
      data => {
        this.dataSource = data.docs;
        this.resultLength = data.total;
        this.loading = false;
      },
      err => {
        this.loading = false;
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
  delete(id) {
    this.invoiceService.deleteInvoice(id).subscribe(invoice => {
      remove(this.dataSource, item => {
        return item._id === invoice._id;
      });
      this.dataSource = [...this.dataSource];
      this.snackBar.open(`Invoice ${invoice.item} deleted...`, 'Close', {
        duration: 3000
      });
    });
  }
  edit(id) {
    this.router.navigate(['dashboard', 'invoices', id]);
  }
}
