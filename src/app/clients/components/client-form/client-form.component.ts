import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Client } from '../../models/client';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  client: Client;
  dialogTitle = 'New client';
  constructor(
    private dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    this.dialogRef.close(this.clientForm.value);
  }
  private initForm() {
    this.clientForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required]
    });
    if (this.data) {
      this.client = this.data;
      this.clientForm.patchValue(this.client);
      this.dialogTitle = `${this.client.firstName}`;
    }
  }
}
