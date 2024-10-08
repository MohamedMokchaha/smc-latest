import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent implements OnInit {
  vehicleForm!: FormGroup;                // Formulaire pour les informations du véhicule
  submitted = false;                      // Indicateur de soumission
  acquisitionDateValid: boolean = true;   // Indicateur de validité de la date d'acquisition
  dropdownOpen: boolean = false;          // État du menu déroulant pour les marques
  combinedData: any;                      // Variable pour stocker les données combinées
  brands = [                              // Tableau pour stocker les marques de véhicules
    { name: 'Honda', logo: 'https://e7.pngegg.com/pngimages/444/697/png-clipart-honda-logo-honda-car-scooter-motorcycle-yamaha-motor-company-honda-logo-red-angle-text-thumbnail.png' },
    { name: 'Yamaha', logo: 'https://cdn-0.motorcycle-logos.com/wp-content/uploads/2016/10/Logo-Yamaha.png' },
    { name: 'Suzuki', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/500px-Suzuki_logo_2.svg.png' },
    { name: 'Kawasaki', logo: 'https://cdn-0.motorcycle-logos.com/wp-content/uploads/2016/10/Kawasaki-Logo.jpg' },
    { name: 'Ducati', logo: 'https://www.1min30.com/wp-content/uploads/2019/06/Ducati-embleme.jpg' },
    { name: 'Harley-Davidson', logo: 'https://cdn.room58.com/2024/04/26/fad430bba4969b27bcee42abe4f37d4f_6ed210840e81569d.png' },
    { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png' },
    { name: 'KTM', logo: 'https://w7.pngwing.com/pngs/389/669/png-transparent-ktm-motogp-racing-manufacturer-team-car-motorcycle-logo-car-angle-text-trademark.png' },
    { name: 'Triumph', logo: 'https://cdn.worldvectorlogo.com/logos/logo-triumph.svg' },
    { name: 'MV Agusta', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/37/MV_Agusta_Logo_1945_noBG.png' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.initializeForm();                // Initialisation du formulaire
    this.loadBrands();                    // Chargement des marques de véhicules
  }

  // Méthode pour initialiser le formulaire
  initializeForm() {
    this.vehicleForm = this.fb.group({
      vehicleBrand: ['', Validators.required], // Marque du véhicule (obligatoire)
      engineCapacity: ['', Validators.required], // Cylindrée (obligatoire)
      model: [''],                             // Modèle (optionnel)
      type: [''],                              // Type (optionnel)
      registrationNumber: [''],                // Numéro d'immatriculation (optionnel)
      firstRegistrationDate: ['', Validators.required], // Date de première mise en circulation (obligatoire)
      acquisitionDate: ['', Validators.required], // Date d'acquisition (obligatoire)
    });
  }

  // Méthode pour charger les marques de véhicules
  loadBrands() {
    // Les marques sont déjà définies dans la propriété `brands`
  }

  // Méthode pour basculer l'état du menu déroulant
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  

  // Méthode pour sélectionner une marque
  selectBrand(brand: string) {
    this.vehicleForm.patchValue({ vehicleBrand: brand }); // Met à jour le formulaire avec la marque sélectionnée
    this.dropdownOpen = false; // Ferme le menu déroulant après sélection
  }

  // Méthode pour gérer la soumission du formulaire
  onSubmit() {
    this.submitted = true; // Marque le formulaire comme soumis

    // Vérifie si le formulaire est valide ou si la date d'acquisition est valide
    if (this.vehicleForm.invalid || !this.acquisitionDateValid) {
      return; // Empêche la soumission si le formulaire est invalide
    }

    // Récupération des données stockées dans le localStorage
    const savedContactData = localStorage.getItem('contactData');
    const contactData = savedContactData ? JSON.parse(savedContactData) : {};

    const savedObjectiveData = localStorage.getItem('objectiveData');
    const objectiveData = savedObjectiveData ? JSON.parse(savedObjectiveData) : {};

    // Combine les données de contact, d'objectif et de véhicule
    this.combinedData = {
      contact: contactData,
      objective: objectiveData,
      vehicle: this.vehicleForm.value,
    };

    console.log('Données combinées:', JSON.stringify(this.combinedData, null, 2)); // Affiche les données combinées dans la console
    localStorage.setItem('vehicleData', JSON.stringify(this.vehicleForm.value)); // Enregistre les données du véhicule dans le localStorage

    // Redirection vers la page suivante
    this.router.navigate(['/permis']);
  }

  // Méthode pour revenir à la page précédente
  goBack() {
    this.router.navigate(['/contact-info']); // Redirection vers la page des informations de contact
  }
}
