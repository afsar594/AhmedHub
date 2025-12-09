import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buy-now',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css']
})
export class BuyNowComponent {

  deliveryForm: any;

  constructor(private fb: FormBuilder) {
    this.deliveryForm = this.fb.group({
      fullName: ['', Validators.required],
      province: ['', Validators.required],
      house: ['', Validators.required],
      area: ['', Validators.required],
      colony: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  save() {
    if (this.deliveryForm.invalid) {
      this.deliveryForm.markAllAsTouched();
      return;
    }

    alert("Form Submitted Successfully!");
  }
}
