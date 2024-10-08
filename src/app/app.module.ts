import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importez FormsModule ici
import { HttpClientModule } from '@angular/common/http'; // Ajoutez ceci
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObjectiveComponent } from './objective/objective.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';
import { PermisComponent } from './permis/permis.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ObjectiveComponent,
    ContactInfoComponent,
    VehicleInfoComponent,
    PermisComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Ajoutez FormsModule ici
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
