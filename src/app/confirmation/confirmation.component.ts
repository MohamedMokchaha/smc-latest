import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeService } from '../demande.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  confirmationVisible: boolean = false;
  additionalInfo: string = ''; // Pour stocker les informations complémentaires
  comment: string = ''; // Pour stocker le commentaire
  formData: any; // Déclarez formData ici

  constructor(private router: Router, private demandeService: DemandeService) {}

  ngOnInit() {
    // Récupérer les données combinées du localStorage
    const combinedData = localStorage.getItem('combinedData');
    this.formData = combinedData ? JSON.parse(combinedData) : {}; // Initialiser formData avec les données combinées
  }

  sendRequest() {
    // Valider si 'additionalInfo' et 'comment' sont vides
    const additionalInfoToSend = this.additionalInfo || 'Non renseigné';
    const commentToSend = this.comment || 'Non renseigné';

    // Créez un objet pour les données de confirmation
    const confirmationData = {
      additionalInfo: additionalInfoToSend,
      comment: commentToSend,
      ...this.formData // Inclure les données du formulaire
    };

    // Poster les données à l'API
    this.demandeService.saveDemande(confirmationData).subscribe(
      response => {
        console.log('Demande sauvegardée avec succès:', response);
        this.confirmationVisible = true; // Afficher le message de confirmation
      },
      error => {
        console.error('Erreur lors de la sauvegarde de la demande:', error);
        alert('Une erreur est survenue lors de la sauvegarde de votre demande. Veuillez réessayer.'); // Alerte pour l'utilisateur
      }
    );
  }

  goBack() {
    this.router.navigate(['/permis']); // Redirection vers la page de permis
  }
}
