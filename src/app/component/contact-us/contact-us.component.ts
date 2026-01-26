import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  email = 'support@ahmedhub.shop';
  phone = '+92 300 1234567';
  whatsapp = '+92 300 1234567';
  location = 'Pakistan';

  contactForm: FormGroup;

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

    // 🔴 yahan backend API lagay gi
    // this.api.sendContactMessage(payload).subscribe()

    alert('Your message has been sent successfully!');
    this.contactForm.reset();
  }
}
