import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllJardinComponent } from './content/jardin/all-jardin/all-jardin.component';
import { CreateJardinComponent } from './content/jardin/create-jardin/create-jardin.component';
import { UpdateJardinComponent } from './content/jardin/update-jardin/update-jardin.component';

@NgModule({
  declarations: [
    AppComponent,
    AllJardinComponent,
    CreateJardinComponent,
    UpdateJardinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
