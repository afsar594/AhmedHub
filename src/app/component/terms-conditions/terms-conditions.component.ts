import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- needed for *ngFor

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.css'],
  standalone: true,           // <-- make it standalone
  imports: [CommonModule]     // <-- import CommonModule for *ngFor
})
export class TermsConditionsComponent {
  termsSections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: `Welcome to MyWebsite. These Terms & Conditions (“Terms”) govern your access to and use of our website, products, and services. By using our services, you agree to comply with these Terms. If you do not agree, do not use our services.

1.1 Acceptance of Terms
You acknowledge that you have read and agree to these Terms.

1.2 Scope
These Terms apply to all users, visitors, and customers.

1.3 Eligibility
You must be 18 years or older to use MyWebsite.

1.4 Updates to Terms
We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting.`
    },
    {
      id: 'account',
      title: '2. Account Responsibilities',
      content: `2.1 Registration
To access certain features, you must register an account with accurate information.

2.2 Account Security
You are responsible for your account credentials and must notify us of any unauthorized use.

2.3 Termination
We may suspend or terminate accounts violating our Terms.

2.4 Account Activity
You agree to maintain accurate and current information in your account.`
    },
    {
      id: 'payment',
      title: '3. Payment Terms',
      content: `3.1 Payment Methods
We accept credit cards, debit cards, and other approved payment methods.

3.2 Billing
You are responsible for accurate billing information.

3.3 Refunds
Refunds are processed according to our Refund Policy.

3.4 Late Payments
Late payments may result in suspension of services until payment is received.`
    },
    {
      id: 'privacy',
      title: '4. Privacy Policy',
      content: `4.1 Data Collection
We collect personal information to provide and improve services.

4.2 Data Usage
Your information is used only as described in our Privacy Policy.

4.3 Data Security
We employ security measures to protect your data.

4.4 Third-Party Sharing
We do not share your personal information with third parties without consent, except as required by law.`
    },
    {
      id: 'user-conduct',
      title: '5. User Conduct',
      content: `5.1 Prohibited Activities
You agree not to engage in illegal, harmful, or abusive activities.

5.2 Content
All content you post must comply with laws and regulations.

5.3 Enforcement
Violations may result in suspension or legal action.

5.4 Responsibility
You are responsible for all content you upload, share, or communicate on the website.`
    },
    {
      id: 'liability',
      title: '6. Limitation of Liability',
      content: `6.1 Disclaimer
We are not liable for indirect, incidental, or consequential damages.

6.2 Maximum Liability
Our maximum liability is limited to the amount paid by you for services.

6.3 External Links
We are not responsible for content, accuracy, or practices of third-party websites linked on our site.`
    },
    {
      id: 'termination',
      title: '7. Termination',
      content: `7.1 Grounds for Termination
Accounts may be terminated for violating these Terms or engaging in prohibited conduct.

7.2 Effect of Termination
Termination does not affect accrued rights or obligations.

7.3 Data Retention
Upon termination, your data may be retained according to our Privacy Policy and legal requirements.`
    },
    {
      id: 'governing-law',
      title: '8. Governing Law',
      content: `8.1 Jurisdiction
These Terms are governed by the laws of [Your Country].

8.2 Dispute Resolution
Any disputes will be resolved in the courts of [Your Country].

8.3 Compliance
You agree to comply with all applicable laws while using our services.`
    },
    {
      id: 'changes',
      title: '9. Changes to Terms',
      content: `9.1 Modification
We may update these Terms from time to time.

9.2 Notice
Changes will be posted on the website.

9.3 Continued Use
Your continued use of our services after changes constitutes acceptance of the new Terms.`
    },
    {
      id: 'contact',
      title: '10. Contact Us',
      content: `For any questions regarding these Terms, please contact us at:

Email: support@mywebsite.com
Phone: +123 456 7890
Address: 123 Main Street, City, Country

We aim to respond to inquiries within 48 hours.`
    }
  ];

scrollTo(id: string, event: Event) {
  event.preventDefault(); // ye default jump rokta hai
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({
      behavior: 'smooth', // smooth scroll
      block: 'start'       // section top pe align ho jaye
    });
  }
}

}