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
import { GraphiqueJardinAffichageComponent } from './content/jardin/graphique-jardin-affichage/graphique-jardin-affichage.component';
import { ArrosageComponent } from './content/jardin/arrosage/arrosage.component';
import { ConnexionComponent } from './content/connexion/connexion.component';
import { InscriptionComponent } from './content/inscription/inscription/inscription.component';
import { MeteoComponent } from './content/meteo/meteo/meteo.component';
import{ AuthGuard } from './helpers/auth.guard';
import { Role } from './enums/role.enum';
import { DetailUtilisateurComponent } from './content/dashboard/dashboard/detail-utilisateur/detail-utilisateur.component';
import { GestionAdminComponent } from './content/utilisateur/gestion-admin/gestion-admin.component'

import { DetailAdminComponent } from './content/dashboard/dashboard-admin/detail-admin/detail-admin.component';
import { IdGuard } from './helpers/id.guard';


const routes: Routes = [
  { path : '' , component :  AccueilHorsConnexionComponent },
  { path : 'dashboard' , component :  DashboardComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin, Role.Utilisateur]} },
  { path : 'admin' , component :  DashboardAdminComponent , canActivate: [AuthGuard], data:{roles: [Role.Admin]}},
  { path : 'jardin' , component :  AllJardinComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin, Role.Utilisateur]}},
  { path : 'jardin/create' , component : CreateJardinComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin, Role.Utilisateur]} },
  
  { path : 'plant/vadmin', component : AllPlantComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin]} },
  { path : 'plant/create', component : CreatePlantComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin]} },
  { path : 'plant/update/:id', component : DetailedPlantComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin]} },
  { path : 'periode/:id', component : AllPeriodeComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin]}},
  { path : 'periode/create', component : CreatePeriodeComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin]}},
  { path : 'periode/update', component : UpdatePeriodeComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin]}},

  { path : 'plant/vadmin', component : AllPlantComponent },
  { path : 'plant/create', component : CreatePlantComponent },
  { path : 'plant/update/:id', component : DetailedPlantComponent },
  { path : 'periode/:id', component : AllPeriodeComponent},
  { path : 'periode/create', component : CreatePeriodeComponent},
  { path : 'periode/update', component : UpdatePeriodeComponent},
  { path : 'blog' , component : BlogComponent },
  { path : 'plant/vuser', component: UserviewAllPlantComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin, Role.Utilisateur]} },
  { path : 'plant/vuser/:id', component: UserviewDetailedPlantComponent, canActivate: [AuthGuard, IdGuard], data:{roles: [Role.Admin, Role.Utilisateur]} },
  { path : 'about' , component : AboutComponent },
  { path : 'contact' , component : ContactComponent },
  { path : 'plant/key/:key' , component : UserviewKeysearchPlantComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin, Role.Utilisateur]} },
  { path : 'departement/vadmin' , component : AllDepartementsComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin]} },
  { path : 'departement/create' , component : CreateDepartementComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin]} },
  { path : 'departement/update/:depNum', component : DetailedDepartementComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin]} },
  { path : 'connexion', component : ConnexionComponent },

  { path : 'jardin/graphique/:id', component : GraphiqueJardinComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin, Role.Utilisateur]}},
  { path : 'planning/:id' , component : PlanningJardinComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin, Role.Utilisateur]} },
  { path : 'meteo', component : MeteoComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin, Role.Utilisateur]} },
  { path : 'meteo/:id' , component : MeteoDepComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin, Role.Utilisateur]} },
  { path : 'jardin/graphique/affichage', component : GraphiqueJardinAffichageComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin, Role.Utilisateur]}},
  { path : 'jardin/detail/arrosage', component : ArrosageComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin, Role.Utilisateur]}},

  { path: 'inscription', component: InscriptionComponent },
  { path: 'utilisateur/detail/:identifier', component: DetailUtilisateurComponent, canActivate: [AuthGuard, IdGuard], data:{roles: [Role.Admin, Role.Utilisateur]} },
  { path: 'utilisateur/gestion-admin', component: GestionAdminComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin]} },
  { path: 'admin/detail/:identifier', component: DetailAdminComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin]} },

  { path : 'jardin/detail/:id', component : DetailJardinComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin, Role.Utilisateur]} }, //detail d'un jardin par id
  { path : 'jardin/update/:id', component : UpdateJardinComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin, Role.Utilisateur]} }, //update d'un jardin par id
  { path : 'jardin/detail/addplante/:id', component : DetailJardinAddPlanteComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin, Role.Utilisateur]} },//add plante d'un jardin par  jardin id
  { path : 'jardin/detail/updateplante/:id', component : DetailJardinUpdatePlanteComponent, canActivate: [AuthGuard], data:{roles: [Role.Admin, Role.Utilisateur]} },//update d'une plante par son id

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled'
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
