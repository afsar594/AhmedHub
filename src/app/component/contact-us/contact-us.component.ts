import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  imports: [],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  email = 'support@ahmedhub.shop';
  phone = '+92 300 1234567';
  whatsapp = '+92 300 1234567';
  location = 'Pakistan';
}
