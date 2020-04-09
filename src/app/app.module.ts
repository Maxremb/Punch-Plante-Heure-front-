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
import { AutoGenerateJardinComponent } from './content/jardin/auto-generate-jardin/auto-generate-jardin.component';
import { UserviewDetailedPlantComponent } from './content/plant/userview-detailed-plant/userview-detailed-plant.component';
import { UserviewAllPlantComponent } from './content/plant/userview-all-plant/userview-all-plant.component';
import { UpdatePeriodeComponent } from './content/periode/update-periode/update-periode/update-periode.component';
import { BlogComponent } from './content/blog/blog.component';
import { AssociationsPlantComponent } from './content/plant/associations-plant/associations-plant.component';
import { ContactComponent } from './content/contact/contact.component';
import { AboutComponent } from './content/about/about.component';
import { EnteteJardinComponent } from './content/jardin/entete-jardin/entete-jardin.component';
import { GraphiqueJardinComponent } from './content/jardin/graphique-jardin/graphique-jardin.component';
import { EntetePlantComponent } from './content/plant/entete-plant/entete-plant.component';
import { EntetePeriodeComponent } from './content/periode/entete-periode/entete-periode.component';
import { DashboardAdminComponent } from './content/dashboard/dashboard-admin/dashboard-admin.component';
import { EnteteDashboardComponent } from './content/dashboard/entete-dashboard/entete-dashboard.component';
import { UserviewKeysearchPlantComponent } from './content/plant/userview-keysearch-plant/userview-keysearch-plant.component';
import { AllDepartementsComponent } from './content/departement/all-departements/all-departements.component';
import { CreateDepartementComponent } from './content/departement/create-departement/create-departement.component';
import { DetailedDepartementComponent } from './content/departement/detailed-departement/detailed-departement.component';
import { EnteteDepartementComponent } from './content/departement/entete-departement/entete-departement.component';
import { PlanningJardinComponent } from './content/jardin/planning-jardin/planning-jardin.component';
import { MeteoDepComponent } from './content/meteo/meteo-dep/meteo-dep.component'; 
import { GoogleChartsModule } from 'angular-google-charts';
import { NotificationsComponent } from './content/notifications/notifications.component';
import { GraphiqueJardinAffichageComponent } from './content/jardin/graphique-jardin-affichage/graphique-jardin-affichage.component';
import { EntetePlantAdminComponent } from './content/plant/entete-plant-admin/entete-plant-admin.component';
import { ConnexionComponent } from './content/connexion/connexion.component';
import { EnteteConnexionComponent } from './content/connexion/entete-connexion/entete-connexion.component';
import { InscriptionComponent } from './content/inscription/inscription/inscription.component';
import { EnteteInscriptionComponent } from './content/inscription/entete-inscription/entete-inscription.component';


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
    AutoGenerateJardinComponent,
    UserviewDetailedPlantComponent,
    UserviewAllPlantComponent,
    UpdatePeriodeComponent,
    BlogComponent,
    AssociationsPlantComponent,
    ContactComponent,
    AboutComponent,
    EnteteJardinComponent,
    GraphiqueJardinComponent,
    EntetePlantComponent,
    EntetePeriodeComponent,
    DashboardAdminComponent,
    EnteteDashboardComponent,
    UserviewKeysearchPlantComponent,
    AllDepartementsComponent,
    CreateDepartementComponent,
    DetailedDepartementComponent,
    EnteteDepartementComponent,
    PlanningJardinComponent,
    MeteoDepComponent,
    NotificationsComponent,
    GraphiqueJardinAffichageComponent,
    ConnexionComponent,
    EnteteConnexionComponent,
    InscriptionComponent,
    EntetePlantAdminComponent,
    EnteteInscriptionComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule
  ],
  providers: [
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
