import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllPlantComponent } from './content/plant/all-plant/all-plant.component';
import { CreatePlantComponent } from './content/plant/create-plant/create-plant.component';
import { DetailedPlantComponent } from './content/plant/detailed-plant/detailed-plant.component';
import { DetailJardinComponent } from './content/jardin/detail-jardin/detail-jardin.component';
import { AllJardinComponent } from './content/jardin/all-jardin/all-jardin.component';
import { CreateJardinComponent } from './content/jardin/create-jardin/create-jardin.component';
import { UpdateJardinComponent } from './content/jardin/update-jardin/update-jardin.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { FooterComponent } from './footer/footer/footer.component';
import { DashboardComponent } from './content/dashboard/dashboard/dashboard.component';
import { DetailJardinAddPlanteComponent } from './content/jardin/detail-jardin-add-plante/detail-jardin-add-plante.component';
import { ContentComponent } from './content/content/content.component';
import { DetailJardinUpdatePlanteComponent } from './content/jardin/detail-jardin-update-plante/detail-jardin-update-plante.component';

@NgModule({
  declarations: [
    AppComponent,
    AllPlantComponent,
    CreatePlantComponent,
    DetailedPlantComponent,
    DetailJardinComponent,
    AllJardinComponent,
    CreateJardinComponent,
    UpdateJardinComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    DetailJardinAddPlanteComponent,
    ContentComponent,
    DetailJardinUpdatePlanteComponent,
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
