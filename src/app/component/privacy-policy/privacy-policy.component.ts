import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  imports: [CommonModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent {
effectiveDate: string = '05 December 2025';
  websiteName: string = 'Ahmed Hub';
  websiteURL: string = 'https://AhmedHub.shop';
  contactEmail: string = 'info@ahmedhub.shop';

  policyIntro: string = `
    Welcome to <strong>Ahmed Hub</strong>. We are committed to protecting your personal information and your right to privacy.
    This Privacy Policy explains how we collect, use, store, and protect your information when you use our website.
  `;

  privacyContent = [
    {
      title: '1. Information We Collect',
      isList: true,
      listItems: [
        'Name, email, phone number',
        'Shipping and billing address',
        'Payment information (not stored by us)',
        'Automatically collected data such as IP address, browser, device info, cookies'
      ]
    },
    {
      title: '2. How We Use Your Information',
      isList: true,
      listItems: [
        'Process and deliver your orders',
        'Improve website performance',
        'Provide customer support',
        'Send order updates and notifications',
        'Prevent fraud and unauthorized activity',
        'Personalize your shopping experience'
      ]
    },
    {
      title: '3. Sharing of Information',
      description: `
        We do not sell or trade your personal information. We may only share data with service providers
        such as delivery partners and secure payment gateways, or legal authorities if required.
      `
    },
    {
      title: '4. Cookies',
      description: `
        We use cookies to enhance your browsing experience. You can disable cookies in your browser settings,
        but some features may not work properly.
      `
    },
    {
      title: '5. Data Security',
      description: `
        We use advanced security measures to protect your information from unauthorized access, modification,
        or disclosure. However, no system is 100% secure.
      `
    },
    {
      title: '6. Third-Party Links',
      description: `
        Our website may contain links to external websites. We are not responsible for the privacy practices
        or content of those websites.
      `
    },
    {
      title: '7. Your Rights',
      isList: true,
      listItems: [
        'Access your personal data',
        'Request correction of inaccurate information',
        'Request deletion of your data',
        'Withdraw consent from marketing emails'
      ]
    },
    {
      title: '8. Changes to This Privacy Policy',
      description: `
        We may update this Privacy Policy from time to time. The effective date will always be mentioned at the top.
      `
    },
    {
      title: '9. Contact Us',
      description: `
        If you have any questions, you can contact us at:
        <a href="mailto:${this.contactEmail}">${this.contactEmail}</a>
      `
    }
  ];

}
