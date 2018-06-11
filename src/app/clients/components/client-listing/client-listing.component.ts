import { ClientFormComponent } from './../client-form/client-form.component';
import { Client } from './../../models/client';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { filter, flatMap } from 'rxjs/internal/operators';
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
  displayedColumns = ['firstName', 'lastName', 'email', 'action'];
  dataSource: MatTableDataSource<Client> = new MatTableDataSource<Client>();
  ngOnInit() {}
  ngAfterViewInit(): void {
    this.clientService.getClients().subscribe(data => {
      this.dataSource.data = data;
    });
  }
  saveBtnHandler() {
    const dialogRef = this.dialog.open(ClientFormComponent);
    dialogRef
      .afterClosed()
      .pipe(filter(value => typeof value === 'object'))
      .pipe(
        flatMap(result => {
          return this.clientService.createClient(result);
        })
      )
      .subscribe(
        client => {
          this.snackBar.open('Client created', 'Success', { duration: 3000 });
          this.dataSource.data.push(client);

          this.dataSource.data = [...this.dataSource.data];
        },
        error => {
          this.errorHandler(error, 'Error creating client');
        }
      );
  }
  edit(id: string) {}
  delete(id: string) {}
  private errorHandler(error, message) {
    this.snackBar.open(message, 'Error', { duration: 3000 });
  }
}
