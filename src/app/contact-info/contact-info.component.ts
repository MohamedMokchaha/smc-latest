import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  postalCode: string = '';
  city: string = '';
  parkingAddress: boolean = false;
  birthDate: string = '';
  submitted: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    // Charger les données d'objectif si disponibles
    const savedObjectiveData = localStorage.getItem('objectiveData');
    if (savedObjectiveData) {
      const objectiveData = JSON.parse(savedObjectiveData);
      // Vous pouvez éventuellement afficher ou utiliser ces données ici
      console.log('Données de l\'objectif chargées:', objectiveData);
    }
  }

  isFormValid(): boolean {
    return !!this.firstName && !!this.lastName && !!this.email &&
      !!this.phone && !!this.address && !!this.postalCode &&
      !!this.city && !!this.birthDate;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.isFormValid()) {
      console.log('Tous les champs sont obligatoires.');
      return;
    }

    // Récupérer les données de contact
    const contactData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      address: this.address,
      postalCode: this.postalCode,
      city: this.city,
      parkingAddress: this.parkingAddress,
      birthDate: this.birthDate
    };

    // Récupérer les données d'objectif
    const savedObjectiveData = localStorage.getItem('objectiveData');
    let objectiveData: any = {};
    if (savedObjectiveData) {
      objectiveData = JSON.parse(savedObjectiveData);
    }

    // Combiner les données
    const combinedData = {
      contact: contactData,
      objective: objectiveData
    };

    // Afficher les données combinées en JSON dans la console
    console.log('Données combinées:', JSON.stringify(combinedData, null, 2));

    // Enregistrer les données de contact
    localStorage.setItem('contactData', JSON.stringify(contactData));

    // Naviguer vers la page suivante
    this.router.navigate(['/vehicule-info']); // Remplacez par la route de votre page suivante
  }

  goBack() {
    this.router.navigate(['/objective']); // Remplacez par la route de votre page précédente
  }
}
