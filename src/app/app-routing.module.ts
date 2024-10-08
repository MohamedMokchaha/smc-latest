import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjectiveComponent } from './objective/objective.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';
import { PermisComponent } from './permis/permis.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes = [
  { path: 'objective', component: ObjectiveComponent },
  { path: 'contact-info', component: ContactInfoComponent },
  { path: 'vehicule-info', component: VehicleInfoComponent },
  { path: 'permis', component: PermisComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: '', redirectTo: '/objective', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
