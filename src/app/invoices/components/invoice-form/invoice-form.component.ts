import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Invoice } from '../../models/invoice';
import { Client } from '../../../clients/models/client';
import { ClientService } from '../../../clients/services/client.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm: FormGroup;
  private invoice: Invoice;
  clients: Client[] = [];
  title = 'Create Invoice';
  constructor(
    private formBuilder: FormBuilder,
    private invoiceService: InvoiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.createForm();
    this.setInvoiceToForm();
    this.populateSelect();
  }
  populateSelect() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }
  private setInvoiceToForm() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.title = 'Edit Invoice';
        // this.invoiceService.findById(params['id']).subscribe(
        //   invoice => {
        //     this.invoice = invoice;
        //     this.invoiceForm.patchValue(this.invoice);
        //   },
        //   error => {
        //     this.errorHandler(error, 'Error finding invoice');
        //   }
        // );
        this.activatedRoute.data.subscribe((data: { invoice: Invoice }) => {

          this.invoice = data.invoice;
          this.invoiceForm.patchValue(this.invoice);
        });
      }
    });
  }
  createForm() {
    this.invoiceForm = this.formBuilder.group({
      item: ['', Validators.required],
      date: ['', Validators.required],
      due: ['', Validators.required],
      qty: ['', Validators.required],
      rate: [''],
      tax: [''],
      client: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.invoice) {
      this.invoiceService
        .update(this.invoice._id, this.invoiceForm.value)
        .subscribe(
          data => {
            this.snackBar.open(`Invoice updated`, 'Success', {
              duration: 3000
            });
            this.router.navigate(['dashboard', 'invoices']);
          },
          error => {
            this.errorHandler(error, 'Error updating invoice');
          }
        );
    } else {
      this.invoiceService.createInvoice(this.invoiceForm.value).subscribe(
        invoice => {
          this.snackBar.open(`Invoice: ${invoice.item} created`, 'Success', {
            duration: 3000
          });
          this.router.navigate(['dashboard', 'invoices']);
        },
        error => {
          this.errorHandler(error, 'Error creating invoice');
        }
      );
    }
  }
  private errorHandler(error, message) {
    this.snackBar.open(message, 'Error', {
      duration: 3000
    });
  }
  reset() {
    this.invoiceForm.reset();
  }
}
