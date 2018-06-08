import { ClientsModule } from './../clients/clients.module';
import { DashboardComponent } from './dashboard.component';
import { InvoicesModule } from './../invoices/invoices.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainContentComponent } from './components/main-content/main-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from '../shared/material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    InvoicesModule,
    ClientsModule
  ],
  declarations: [
    MainContentComponent,
    SideNavComponent,
    ToolbarComponent,
    DashboardComponent
  ],
  exports: []
})
export class DashboardModule {}
