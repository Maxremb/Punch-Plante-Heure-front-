import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DetailJardinComponent } from './content/jardin/detail-jardin/detail-jardin.component';
import { CreateJardinComponent } from './content/jardin/create-jardin/create-jardin.component';
import { AllJardinComponent } from './content/jardin/all-jardin/all-jardin.component';
import { PlanningJardinComponent } from './content/jardin/planning-jardin/planning-jardin.component';
import { DashboardComponent } from './content/dashboard/dashboard/dashboard.component';
import { AllPlantComponent } from './content/plant/all-plant/all-plant.component';
import { CreatePlantComponent } from './content/plant/create-plant/create-plant.component';
import { DetailedPlantComponent } from './content/plant/detailed-plant/detailed-plant.component';
import { DetailJardinAddPlanteComponent } from './content/jardin/detail-jardin-add-plante/detail-jardin-add-plante.component';
import { DetailJardinUpdatePlanteComponent } from './content/jardin/detail-jardin-update-plante/detail-jardin-update-plante.component';
import { UpdateJardinComponent } from './content/jardin/update-jardin/update-jardin.component';
import { AccueilHorsConnexionComponent } from './content/dashboard/accueil-hors-connexion/accueil-hors-connexion.component';
import { AllPeriodeComponent } from './content/periode/all-periode/all-periode.component';
import { UpdatePeriodeComponent } from './content/periode/update-periode/update-periode/update-periode.component';
import { BlogComponent } from './content/blog/blog.component';
import { CreatePeriodeComponent } from './content/periode/create-periode/create-periode.component';
import { UserviewAllPlantComponent } from './content/plant/userview-all-plant/userview-all-plant.component';
import { AboutComponent } from './content/about/about.component';
import { ContactComponent } from './content/contact/contact.component';
import { UserviewDetailedPlantComponent } from './content/plant/userview-detailed-plant/userview-detailed-plant.component';
import { DashboardAdminComponent } from './content/dashboard/dashboard-admin/dashboard-admin.component';
import { UserviewKeysearchPlantComponent } from './content/plant/userview-keysearch-plant/userview-keysearch-plant.component';
import { AllDepartementsComponent } from './content/departement/all-departements/all-departements.component';
import { CreateDepartementComponent } from './content/departement/create-departement/create-departement.component';
import { DetailedDepartementComponent } from './content/departement/detailed-departement/detailed-departement.component';
import { GraphiqueJardinComponent } from './content/jardin/graphique-jardin/graphique-jardin.component';
import { MeteoDepComponent } from './content/meteo/meteo-dep/meteo-dep.component';


const routes: Routes = [
  { path : '' , component :  AccueilHorsConnexionComponent },
  { path : 'dashboard' , component :  DashboardComponent },
  { path : 'admin' , component :  DashboardAdminComponent },
  { path : 'jardin' , component :  AllJardinComponent},
  { path : 'jardin/create' , component : CreateJardinComponent },
  { path : 'jardin/detail', component : DetailJardinComponent },
  { path : 'jardin/update', component : UpdateJardinComponent },
  { path : 'jardin/detail/addplante', component : DetailJardinAddPlanteComponent },
  { path : 'jardin/detail/updateplante', component : DetailJardinUpdatePlanteComponent },
  { path : 'plant/vadmin', component : AllPlantComponent },
  { path : 'plant/create', component : CreatePlantComponent },
  { path : 'plant/update/:id', component : DetailedPlantComponent },
  { path : 'periode', component : AllPeriodeComponent},
  { path : 'periode/create', component : CreatePeriodeComponent},
  { path : 'periode/update', component : UpdatePeriodeComponent},
  { path : 'blog' , component : BlogComponent },
  { path : 'plant/vuser', component: UserviewAllPlantComponent },
  { path : 'plant/vuser/:id', component: UserviewDetailedPlantComponent },
  { path : 'about' , component : AboutComponent },
  { path : 'contact' , component : ContactComponent },
  { path : 'plant/key/:key' , component : UserviewKeysearchPlantComponent },
  { path : 'departement/vadmin' , component : AllDepartementsComponent },
  { path : 'departement/create' , component : CreateDepartementComponent },
  { path : 'departement/update/:name', component : DetailedDepartementComponent },
  { path : 'jardin/graphique', component : GraphiqueJardinComponent}, 
  { path : 'planning' , component : PlanningJardinComponent },
  { path : 'meteo/:id' , component : MeteoDepComponent }
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
