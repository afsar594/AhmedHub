import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,AlertModalComponent ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  email = 'support@ahmedhub.shop';
  phone = '+92 300 1234567';
  whatsapp = '+92 300 1234567';
  location = 'Pakistan';

  contactForm: FormGroup;

  showModal = false;
modalTitle = '';
modalMessage = '';
modalAction: (() => void) | null = null;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

sendMessage() {
  if (this.contactForm.invalid) return;

  const payload = this.contactForm.value;
  console.log('Contact Message:', payload);

  this.modalTitle = 'Success';
  this.modalMessage = 'Your message has been sent successfully!';

  this.showModal = true;
}

handleOk() {
  this.showModal = false;
  this.contactForm.reset();
}
}
