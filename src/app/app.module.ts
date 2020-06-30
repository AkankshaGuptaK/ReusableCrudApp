import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { DatatableComponent } from './datatable/datatable.component';
import { DataAddEditComponent } from './datatable/data-add-edit/data-add-edit.component';
import { TableComponent } from './datatable/table/table.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ItemData } from './datatable/shared/fake-api/item-data.service';

const appRoutes: Routes=[
  {path:'add',component:DataAddEditComponent},
  {path:'edit/:id',component:DataAddEditComponent},
  {path:'',component:TableComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DatatableComponent,
    DataAddEditComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes ),
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(ItemData),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
