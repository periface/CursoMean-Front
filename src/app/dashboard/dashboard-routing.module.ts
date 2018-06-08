import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { InvoiceListingComponent } from '../invoices/components/invoice-listing/invoice-listing.component';
import { ClientListingComponent } from '../clients/components/client-listing/client-listing.component';
import { InvoiceFormComponent } from '../invoices/components/invoice-form/invoice-form.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: MainContentComponent
      },
      {
        path: 'invoices',
        component: InvoiceListingComponent
      },
      {
        path: 'invoices/new',
        component: InvoiceFormComponent
      },
      {
        path: 'invoices/:id',
        component: InvoiceFormComponent
      },
      {
        path: 'clients',
        component: ClientListingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
