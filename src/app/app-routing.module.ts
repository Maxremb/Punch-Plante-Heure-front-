import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DetailJardinComponent } from './content/jardin/detail-jardin/detail-jardin.component';
import { CreateJardinComponent } from './content/jardin/create-jardin/create-jardin.component';
import { AllJardinComponent } from './content/jardin/all-jardin/all-jardin.component';
import { DashboardComponent } from './content/dashboard/dashboard/dashboard.component';


const routes: Routes = [
  { path :'' ,component :  DashboardComponent },
  { path :'jardin' ,component :  AllJardinComponent},
  { path :'jardin/create' ,component : CreateJardinComponent },
  {path : 'jardin/detail',component : DetailJardinComponent},
 // { path :'plante', component : }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
