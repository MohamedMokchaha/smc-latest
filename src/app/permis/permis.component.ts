import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permis',
  templateUrl: './permis.component.html',
  styleUrls: ['./permis.component.css']
})
export class PermisComponent implements OnInit {
  permisForm: FormGroup;  // Déclarez le groupe de formulaire
  combinedData: any;      // Variable pour stocker les données combinées

  constructor(private fb: FormBuilder, private router: Router) {
    this.permisForm = this.fb.group({
      permisA1: [''], // Rendre ce champ facultatif
      permisA2: [''], // Rendre ce champ facultatif
      permisA: [''],  // Rendre ce champ facultatif
      permisB: [''],  // Rendre ce champ facultatif
      acquisitionDate: [''], // Champ d'acquisition ajouté, facultatif
      annulationA1: [false], // Case à cocher pour permis A1
      annulationA2: [false], // Case à cocher pour permis A2
      annulationA: [false],  // Case à cocher pour permis A
      annulationB: [false]   // Case à cocher pour permis B
    });
  }

  ngOnInit() {
    // Vous pouvez ici restaurer des valeurs de formulaire si nécessaire
  }

  onSubmit() {
    if (this.permisForm.valid) {
      console.log('Form valid:', this.permisForm.valid); // Vérifiez si le formulaire est valide
      console.log('Form values:', this.permisForm.value); // Vérifiez les valeurs du formulaire

      // Récupérer les données stockées dans le localStorage
      const savedContactData = localStorage.getItem('contactData');
      const contactData = savedContactData ? JSON.parse(savedContactData) : {};

      const savedObjectiveData = localStorage.getItem('objectiveData');
      const objectiveData = savedObjectiveData ? JSON.parse(savedObjectiveData) : {};

      const savedVehicleData = localStorage.getItem('vehicleData');
      const vehicleData = savedVehicleData ? JSON.parse(savedVehicleData) : {};

      // Combiner les données de contact, d'objectif, de véhicule et de permis
      this.combinedData = {
        contact: contactData,
        objective: objectiveData,
        vehicle: vehicleData,
        permis: this.permisForm.value,
      };

      console.log('Données combinées:', JSON.stringify(this.combinedData, null, 2)); // Affiche les données combinées dans la console
      localStorage.setItem('combinedData', JSON.stringify(this.combinedData)); // Enregistre les données combinées dans le localStorage

      // Naviguer vers la page de confirmation
      this.router.navigate(['/confirmation']);
    } else {
      console.log('Formulaire invalide. Vérifiez les champs obligatoires.');
      this.permisForm.markAllAsTouched(); // Marquer tous les champs comme touchés pour afficher les erreurs
    }
  }

  goBack() {
    this.router.navigate(['/vehicule-info']); // Redirection vers la page des informations du véhicule
  }
}
