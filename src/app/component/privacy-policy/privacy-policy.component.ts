import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent {
  effectiveDate: string = 'April 1, 2026';
  websiteName: string = 'AhmedHub';
  websiteURL: string = 'https://ahmedhub.shop';
  contactEmail: string = 'info@ahmedhub.shop';

  policyIntro: string = `
    At <strong>AhmedHub</strong>, we value your trust. We are committed to protecting your personal data and 
    maintaining transparency about how we collect, use, and safeguard your information when you shop on our platform.
  `;

  privacySections = [
    {
      title: '1. Information We Collect',
      isList: true,
      listItems: [
        'Personal details: name, email, phone number, shipping & billing addresses',
        'Payment information (securely processed, never stored on our servers)',
        'Usage data: IP address, device type, browser, pages visited, and interactions',
        'Optional information: preferences, feedback, and customer support communications'
      ]
    },
    {
      title: '2. How We Use Your Information',
      isList: true,
      listItems: [
        'Process and fulfill orders efficiently',
        'Enhance your shopping experience and personalize recommendations',
        'Provide customer support and respond to inquiries',
        'Send order updates, promotions, and relevant communications',
        'Detect, prevent, and respond to fraudulent or unauthorized activity',
        'Comply with legal requirements and enforce our policies'
      ]
    },
    {
      title: '3. Cookies and Tracking',
      description: `
        We use cookies, analytics, and other tracking technologies to improve website performance, remember your preferences,
        and deliver personalized content. You can manage cookies through your browser settings.
      `
    },
    {
      title: '4. Sharing and Disclosure',
      description: `
        Your privacy is our priority. We only share your information with trusted third parties for:
      `,
      isList: true,
      listItems: [
        'Order fulfillment and delivery partners',
        'Payment processors and secure gateways',
        'Analytics and marketing service providers',
        'Legal authorities when required by law',
        'Business transactions like mergers or acquisitions'
      ]
    },
    {
      title: '5. Data Security',
      description: `
        We implement industry-standard technical, administrative, and physical safeguards to protect your information.
        While we strive for maximum security, no system is completely immune to breaches.
      `
    },
    {
      title: '6. Your Rights',
      isList: true,
      listItems: [
        'Access, correct, or update your personal information',
        'Request deletion of your data where applicable',
        'Opt-out of marketing communications',
        'Manage cookie and tracking preferences'
      ]
    },
    {
      title: '7. Children’s Privacy',
      description: `
        AhmedHub does not knowingly collect data from children under 13. If you are under 18, you must have parental consent 
        to use our services.
      `
    },
    {
      title: '8. Contact Us',
      description: () => `
        For questions about this Privacy Policy or your data, contact us at:
        <a href="mailto:${this.contactEmail}">${this.contactEmail}</a>
      `
    }
  ];

  getSectionDescription(section: any) {
    return typeof section.description === 'function' ? section.description() : section.description;
  }
}