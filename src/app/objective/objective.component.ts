import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.css']
})
export class ObjectiveComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      selectedOption: ['', Validators.required],
      motoOption: [''],
      annulation: [false],
      purchaseDate: ['', Validators.required],
      projectPurchase: [false]
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.myForm.valid) {
      this.saveObjectiveData();
      this.router.navigate(['/contact-info']);
    }
  }

  saveObjectiveData() {
    const objectiveData = this.myForm.value;
    // Enregistrer les données dans le localStorage
    localStorage.setItem('objectiveData', JSON.stringify(objectiveData));
  }
}
