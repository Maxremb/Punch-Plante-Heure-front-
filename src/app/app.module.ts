import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailJardinComponent } from './content/jardin/detail-jardin/detail-jardin.component';

import { AllJardinComponent } from './content/jardin/all-jardin/all-jardin.component';
import { CreateJardinComponent } from './content/jardin/create-jardin/create-jardin.component';
import { UpdateJardinComponent } from './content/jardin/update-jardin/update-jardin.component';
import { DashboardComponent } from './content/dashboard/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    DetailJardinComponent,
    AllJardinComponent,
    CreateJardinComponent,
    UpdateJardinComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
