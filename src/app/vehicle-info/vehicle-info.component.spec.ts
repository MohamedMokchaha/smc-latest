import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent implements OnInit {
  vehicleForm!: FormGroup;
  submitted = false;
  acquisitionDateValid: boolean = true;
  dropdownOpen: boolean = false;
  combinedData: any; // Variable pour stocker les données combinées

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.vehicleForm = this.fb.group({
      vehicleBrand: ['', Validators.required],
      engineCapacity: ['', Validators.required],
      model: [''],
      type: [''],
      registrationNumber: [''],
      firstRegistrationDate: ['', Validators.required],
      acquisitionDate: ['', Validators.required],
      // Ajoutez d'autres champs si nécessaire
    });
  }

  onSubmit() {
    this.submitted = true; // Marquer le formulaire comme soumis
    if (this.vehicleForm.invalid || !this.acquisitionDateValid) {
      return; // Empêcher la soumission si le formulaire est invalide
    }

    // Récupérer les données de contact
    const savedContactData = localStorage.getItem('contactData');
    const contactData = savedContactData ? JSON.parse(savedContactData) : {};

    // Récupérer les données d'objectif
    const savedObjectiveData = localStorage.getItem('objectiveData');
    const objectiveData = savedObjectiveData ? JSON.parse(savedObjectiveData) : {};

    // Combiner toutes les données
    this.combinedData = {
      contact: contactData,
      objective: objectiveData,
      vehicle: this.vehicleForm.value,
    };

    // Log des données combinées
    console.log('Données combinées:', JSON.stringify(this.combinedData, null, 2));

    // Enregistrer les données de véhicule
    localStorage.setItem('vehicleData', JSON.stringify(this.vehicleForm.value));

    // Naviguer vers la prochaine étape
    this.router.navigate(['/permis']); // Remplacez par la route de votre page suivante
  }

  goBack() {
    this.router.navigate(['/contact-info']); // Remplacez par la route de votre page précédente
  }
}
