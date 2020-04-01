import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DetailJardinComponent } from './content/jardin/detail-jardin/detail-jardin.component';
import { CreateJardinComponent } from './content/jardin/create-jardin/create-jardin.component';
import { AllJardinComponent } from './content/jardin/all-jardin/all-jardin.component';
import { DashboardComponent } from './content/dashboard/dashboard/dashboard.component';
import { AllPlantComponent } from './content/plant/all-plant/all-plant.component';
import { CreatePlantComponent } from './content/plant/create-plant/create-plant.component';
import { DetailedPlantComponent } from './content/plant/detailed-plant/detailed-plant.component';
import { DetailJardinAddPlanteComponent } from './content/jardin/detail-jardin-add-plante/detail-jardin-add-plante.component';
import { DetailJardinUpdatePlanteComponent } from './content/jardin/detail-jardin-update-plante/detail-jardin-update-plante.component';


const routes: Routes = [
  { path : '' , component :  DashboardComponent },
  { path : 'jardin' , component :  AllJardinComponent},
  { path : 'jardin/create' , component : CreateJardinComponent },
  { path : 'jardin/detail', component : DetailJardinComponent },
  { path : 'jardin/detail/addplante', component : DetailJardinAddPlanteComponent },
  { path : 'jardin/detail/updateplante', component : DetailJardinUpdatePlanteComponent },
  { path : 'plant', component : AllPlantComponent },
  { path : 'plant/create', component : CreatePlantComponent },
  { path : 'plant/detail', component : DetailedPlantComponent },
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
