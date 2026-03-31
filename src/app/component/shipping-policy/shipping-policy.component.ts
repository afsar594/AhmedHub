import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-shipping-policy',
  imports: [CommonModule],
  templateUrl: './shipping-policy.component.html',
  styleUrl: './shipping-policy.component.css'
})
export class ShippingPolicyComponent {
policySections = [
  {
    id: "collect",
    title: "Information We Collect",
    content: [
      "We collect a wide range of personal information to provide and continuously improve our services.",
      "This includes your name, email address, phone number, shipping address, billing address, and payment details.",
      "We may also collect identity verification information where required by law or for fraud prevention.",
      "When you interact with our platform, we automatically collect technical data such as IP address, browser type, device information, and operating system.",
      "We collect behavioral data such as pages visited, time spent, clicks, scroll behavior, and interaction patterns.",
      "We may also collect location data to provide region-based services and improve delivery accuracy.",
      "Information may also be collected from cookies, tracking technologies, and analytics tools.",
      "We may receive updated delivery information from shipping partners.",
      "Third-party integrations may provide us with additional data to enhance your experience.",
      "We ensure all collected data is used responsibly and securely.",
      "Additional logs, diagnostics, and crash reports may also be collected to improve performance.",
      "We may collect feedback, reviews, and communication data when you contact support.",
      "Uploaded content such as images, videos, and documents may also be stored.",
      "Data collected helps us optimize services and maintain system stability."
    ]
  },

  {
    id: "use",
    title: "How We Use Your Information",
    content: [
      "We use your information to operate, maintain, and improve our services.",
      "To process and fulfill orders efficiently.",
      "To manage payments, billing, and financial transactions securely.",
      "To personalize your experience and provide recommendations.",
      "To improve website functionality and fix technical issues.",
      "To analyze performance and user engagement.",
      "To communicate with you via email, SMS, or notifications.",
      "To send promotional offers and marketing campaigns.",
      "To prevent fraud and unauthorized activities.",
      "To comply with legal and regulatory obligations.",
      "To conduct research and improve business strategies.",
      "To provide customer support and resolve issues.",
      "To monitor trends and improve product offerings.",
      "To ensure platform security and integrity.",
      "To deliver targeted advertisements and content.",
      "To enhance user experience using AI and analytics.",
      "To maintain internal records and audit logs.",
      "To optimize delivery routes and logistics operations."
    ]
  },

  {
    id: "cookies",
    title: "Cookies & Tracking Technologies",
    content: [
      "We use cookies and similar technologies to enhance user experience.",
      "Cookies allow us to recognize your device and preferences.",
      "Session cookies help maintain login sessions.",
      "Persistent cookies store user preferences for future visits.",
      "We use analytics cookies to understand traffic and behavior.",
      "Marketing cookies help deliver relevant advertisements.",
      "You can disable cookies through browser settings.",
      "Disabling cookies may limit certain functionalities.",
      "Third-party services may also use cookies on our platform.",
      "Tracking technologies include pixels, scripts, and beacons.",
      "We ensure all tracking complies with privacy standards.",
      "Users can manage cookie preferences anytime.",
      "We may update our cookie usage as technology evolves."
    ]
  },

  {
    id: "share",
    title: "Sharing Information",
    content: [
      "We do not sell your personal data to third parties.",
      "We may share data with trusted service providers.",
      "Payment processors handle financial transactions securely.",
      "Shipping partners use your address for delivery.",
      "Analytics providers help improve performance.",
      "Marketing partners assist in advertising campaigns.",
      "Legal authorities may access data if required by law.",
      "Business transfers may involve data sharing.",
      "All partners must follow strict data protection rules.",
      "We ensure confidentiality agreements are in place.",
      "Data sharing is minimized and controlled.",
      "Users are notified where required.",
      "We prioritize your privacy in all partnerships."
    ]
  },

  {
    id: "security",
    title: "Data Security",
    content: [
      "We implement strong security measures to protect your data.",
      "Encryption is used during data transmission.",
      "Secure servers store your personal information.",
      "Access controls limit unauthorized access.",
      "Regular security audits are conducted.",
      "Firewalls and monitoring systems are in place.",
      "We follow industry best practices.",
      "Employees are trained on data protection.",
      "We continuously improve our security systems.",
      "Users should also protect their login credentials.",
      "Two-factor authentication may be available.",
      "Despite efforts, no system is 100% secure.",
      "We respond quickly to any security incidents."
    ]
  },

  {
    id: "ads",
    title: "Advertising",
    content: [
      "We display personalized advertisements.",
      "Ads are based on browsing and interaction data.",
      "Third-party advertisers may use cookies.",
      "We do not share personally identifiable information.",
      "Users can opt-out of personalized ads.",
      "Advertising helps us keep services affordable.",
      "Ad performance is measured using analytics.",
      "Users can control ad preferences.",
      "We ensure transparency in advertising practices.",
      "We follow industry advertising standards."
    ]
  },

  {
    id: "access",
    title: "Your Data Access",
    content: [
      "You can access your personal data anytime.",
      "Account dashboard shows your information.",
      "You can view order history and activity logs.",
      "You can download your data where applicable.",
      "We provide transparency in data usage.",
      "Users can request detailed reports.",
      "Access is secure and authenticated.",
      "We ensure data accuracy and availability."
    ]
  },

  {
    id: "choices",
    title: "Your Choices",
    content: [
      "You can update your personal information.",
      "You can delete your account anytime.",
      "You can unsubscribe from emails.",
      "You can disable notifications.",
      "You can manage cookie settings.",
      "You can opt-out of marketing.",
      "You can restrict data processing.",
      "Some features may be limited after changes.",
      "We respect your privacy choices.",
      "We provide easy control options."
    ]
  },

  {
    id: "children",
    title: "Children Policy",
    content: [
      "Our services are not intended for children under 13.",
      "We do not knowingly collect children's data.",
      "Parents should monitor children's usage.",
      "If detected, data will be removed immediately.",
      "We prioritize children's privacy.",
      "Parental consent may be required in some cases."
    ]
  },

  {
    id: "changes",
    title: "Policy Updates",
    content: [
      "We may update this policy periodically.",
      "Changes will be posted on this page.",
      "Users are encouraged to review regularly.",
      "Major changes may be notified separately.",
      "Continued use means acceptance of updates.",
      "We maintain transparency in updates."
    ]
  }
];
}
