import { ClientFormComponent } from './../client-form/client-form.component';
import { Client } from './../../models/client';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { filter, flatMap } from 'rxjs/internal/operators';
import { remove } from 'lodash';
@Component({
  selector: 'app-client-listing',
  templateUrl: './client-listing.component.html',
  styleUrls: ['./client-listing.component.scss']
})
export class ClientListingComponent implements OnInit, AfterViewInit {
  constructor(
    private clientService: ClientService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  loading = true;
  displayedColumns = ['firstName', 'lastName', 'email', 'action'];
  dataSource: MatTableDataSource<Client> = new MatTableDataSource<Client>();
  ngOnInit() {}
  ngAfterViewInit(): void {
    this.clientService.getClients().subscribe(data => {
      this.loading = false;
      this.dataSource.data = data;
    });
  }
  saveBtnHandler() {
    this.openDialog();
  }
  edit(clientData) {
    this.openDialog(clientData);
  }
  private openDialog(clientData: Client = null) {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      data: clientData
    });
    dialogRef
      .afterClosed()
      .pipe(filter(value => typeof value === 'object'))
      .pipe(
        flatMap(result => {
          this.loading = true;
          return clientData && clientData._id
            ? this.clientService.updateClient(clientData._id, result)
            : this.clientService.createClient(result);
        })
      )
      .subscribe(
        client => {
          this.loading = false;
          let successMsg = '';

          if (clientData && clientData._id) {
            const index = this.dataSource.data.findIndex(
              cl => cl._id === clientData._id
            );
            this.dataSource.data[index] = client;
            successMsg = 'Client updated';
          } else {
            this.dataSource.data.push(client);
            successMsg = 'Client created';
          }
          this.dataSource.data = [...this.dataSource.data];
          this.snackBar.open(successMsg, 'Success', { duration: 3000 });
        },
        error => {
          this.errorHandler(error, 'Error creating client');
        }
      );
  }
  delete(id: string) {
    this.clientService.deleteClient(id).subscribe(
      client => {
        remove(this.dataSource.data, item => {
          return item._id === client._id;
        });

        this.dataSource.data = [...this.dataSource.data];
        this.snackBar.open(
          `Invoice ${client.firstName} ${client.lastName} deleted...`,
          'Close',
          {
            duration: 3000
          }
        );
      },
      error => this.errorHandler(error, 'Error deleting')
    );
  }
  private errorHandler(error, message) {
    this.snackBar.open(message, 'Error', { duration: 3000 });
  }
}
