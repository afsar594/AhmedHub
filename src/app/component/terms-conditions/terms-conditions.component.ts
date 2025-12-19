import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-terms-conditions',
  imports: [CommonModule],
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.css'
})
export class TermsConditionsComponent {
  effectiveDate: string = '05 December 2025';
  websiteName: string = 'Ahmed Hub';
  websiteURL: string = 'https://ahmedhub.shop';
  contactEmail: string = 'info@ahmedhub.shop';
termsContent=[
  {
    title:'Acceptance of Terms',
    description:'By using this Website, you agree to follow these Terms & Conditions and all applicable laws. If you do not agree, please do not use the Website.',
  },
 { title:'Use of Website',
  description:'You must be at least 18 years old to use the Website.You agree to use the Website only for lawful purposes. You must not post harmful, offensive, or illegal content. You must not attempt to gain unauthorized access to the Website.',
isList: true,
  listItems: [
        'You must be at least 18 years old to use the Website.',
        'You agree to use the Website only for lawful purposes.',
        'You must not post harmful, offensive, or illegal content.',
        'You must not attempt to gain unauthorized access to the Website.'
      ]
},
{
      title: 'Intellectual Property',
      description: `All content on this Website, including text, images, logos, videos, and software, is the property of ${this.websiteName} or its licensors. You may not copy, reproduce, or distribute any content without our prior written permission.`
    },
    {
      title: 'Products and Services',
      description: 'Product descriptions, prices, and availability are subject to change without notice. We reserve the right to refuse service or cancel orders at our discretion.'
    },
    {
      title: 'Limitation of Liability',
      description: 'We are not responsible for any direct, indirect, or consequential damages resulting from your use of the Website.'
    },
    {
      title: 'Third-Party Links',
      description: 'Our Website may contain links to third-party websites. We are not responsible for the content or practices of those websites.'
    },
    {
      title: 'Privacy',
      description: `Your use of the Website is also governed by our <a href="/privacypolicy">Privacy Policy</a>.`
    },
    {
      title: 'Changes to Terms',
      description: 'We may update these Terms & Conditions at any time. Your continued use of the Website constitutes acceptance of the updated terms.'
    },
    {
      title: 'Governing Law',
      description: 'These Terms & Conditions are governed by the laws of Pakistan. Any disputes will be resolved in the courts of Pakistan.'
    },
    {
      title: 'Contact Us',
      description: `If you have any questions about these Terms & Conditions, please contact us at: <a href="mailto:${this.contactEmail}">${this.contactEmail}</a>`
    }
]
}
