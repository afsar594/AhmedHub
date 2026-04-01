import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-shipping-policy',
  imports: [CommonModule],
  templateUrl: './shipping-policy.component.html',
  styleUrls: ['./shipping-policy.component.css']
})
export class ShippingPolicyComponent {
  policySections = [
    {
      id: "collect",
      title: "Information We Collect",
      content: [
        "We collect information to ensure smooth shipping and delivery services.",
        "This includes your name, email address, phone number, and shipping address.",
        "We may also collect order verification information to prevent errors or fraud.",
        "When you place an order, we automatically collect technical data such as IP address, browser type, device information, and operating system.",
        "We track order activity such as items ordered, shipping options selected, and delivery preferences.",
        "We may also collect location data to improve delivery speed and accuracy.",
        "Information may be collected from cookies and tracking technologies to monitor shipment status.",
        "We may receive updated delivery information from shipping partners.",
        "Third-party logistics may provide additional tracking data to enhance delivery.",
        "We ensure all collected data is used solely for shipping and delivery purposes.",
        "Additional logs and diagnostics may also be collected to improve logistics performance.",
        "We may collect feedback, reviews, and support inquiries related to shipping.",
        "Uploaded content such as delivery instructions or documents may be stored.",
        "Data helps us optimize shipping routes and maintain service reliability."
      ]
    },

    {
      id: "use",
      title: "How We Use Shipping Information",
      content: [
        "We use shipping information to process, manage, and improve deliveries.",
        "To fulfill orders accurately and efficiently.",
        "To coordinate with carriers and manage delivery schedules.",
        "To personalize shipping options and recommendations.",
        "To track delivery performance and resolve issues.",
        "To communicate delivery status via email, SMS, or notifications.",
        "To send updates about shipping policies or promotions.",
        "To prevent shipping errors and fraud.",
        "To comply with legal and regulatory shipping requirements.",
        "To optimize shipping routes and logistics strategies.",
        "To provide support and resolve shipping inquiries.",
        "To monitor delivery trends and improve service.",
        "To ensure safe handling of packages.",
        "To provide transparent shipping records.",
        "To deliver notifications about delays or changes.",
        "To maintain internal logs for auditing purposes.",
        "To enhance shipping experience using analytics and AI.",
        "To improve packaging and delivery efficiency."
      ]
    },

    {
      id: "cookies",
      title: "Cookies & Tracking Technologies",
      content: [
        "We use cookies and tracking technologies to monitor shipments.",
        "Cookies help identify your orders and delivery preferences.",
        "Session cookies track active delivery sessions.",
        "Persistent cookies store shipping information for future orders.",
        "Analytics cookies help us understand delivery patterns.",
        "Marketing cookies may inform delivery-related promotions.",
        "You can disable cookies in your browser settings.",
        "Disabling cookies may limit tracking features.",
        "Third-party services may use cookies for shipping updates.",
        "Tracking technologies include pixels, scripts, and beacons.",
        "We comply with privacy standards in all tracking.",
        "Users can manage cookie preferences at any time.",
        "We may update our tracking methods as technology evolves."
      ]
    },

    {
      id: "share",
      title: "Sharing Shipping Information",
      content: [
        "We do not sell your shipping information to third parties.",
        "We may share data with trusted carriers and service providers.",
        "Payment processors handle financial transactions securely.",
        "Shipping partners use your address to deliver packages.",
        "Analytics providers may help improve delivery performance.",
        "Marketing partners may assist in shipping promotions.",
        "Legal authorities may access data if required by law.",
        "Business transfers may involve sharing shipping information.",
        "All partners must follow strict data protection rules.",
        "We ensure confidentiality agreements are in place.",
        "Data sharing is minimized and controlled.",
        "Users are notified where required.",
        "We prioritize security and privacy in all partnerships."
      ]
    },

    {
      id: "security",
      title: "Data Security",
      content: [
        "We implement strong security measures for shipping data.",
        "Encryption is used for transmitting shipping information.",
        "Secure servers store order and delivery data.",
        "Access controls limit unauthorized access.",
        "Regular audits are conducted to ensure safety.",
        "Firewalls and monitoring systems are in place.",
        "We follow industry best practices for shipping security.",
        "Employees are trained on handling sensitive data.",
        "We continuously improve security systems.",
        "Users should protect their account credentials.",
        "Two-factor authentication may be available.",
        "Despite efforts, no system is 100% secure.",
        "We respond promptly to any security issues."
      ]
    },

    {
      id: "ads",
      title: "Shipping Updates & Notifications",
      content: [
        "We send shipping notifications and updates.",
        "Notifications are based on order status and tracking data.",
        "Third-party carriers may provide delivery alerts.",
        "We do not share personally identifiable info for ads.",
        "Users can opt-out of non-essential notifications.",
        "Notifications help keep deliveries on schedule.",
        "Performance of updates is monitored.",
        "Users can manage notification preferences.",
        "We ensure transparency in all communications.",
        "We follow best practices for customer notifications."
      ]
    },

    {
      id: "access",
      title: "Your Shipping Data Access",
      content: [
        "You can access your shipping details anytime.",
        "Order dashboard shows delivery status and tracking info.",
        "You can view order history and past deliveries.",
        "You can download shipping documents where applicable.",
        "We provide transparency in shipping data usage.",
        "Users can request detailed delivery reports.",
        "Access is secure and authenticated.",
        "We ensure accuracy and availability of delivery data."
      ]
    },

    {
      id: "choices",
      title: "Your Shipping Choices",
      content: [
        "You can update your shipping address.",
        "You can cancel orders before dispatch.",
        "You can unsubscribe from shipping notifications.",
        "You can disable delivery alerts.",
        "You can manage tracking preferences.",
        "You can opt-out of marketing related to shipping.",
        "You can restrict shipping data processing.",
        "Some features may be limited after changes.",
        "We respect your shipping choices.",
        "We provide easy control options."
      ]
    },

    {
      id: "children",
      title: "Children Policy",
      content: [
        "Our services are not intended for children under 13.",
        "We do not knowingly ship to children without parental consent.",
        "Parents should monitor deliveries for children.",
        "If detected, shipments will be canceled immediately.",
        "We prioritize children's safety in shipping.",
        "Parental consent may be required for certain deliveries."
      ]
    },

    {
      id: "changes",
      title: "Policy Updates",
      content: [
        "We may update this shipping policy periodically.",
        "Changes will be posted on this page.",
        "Users are encouraged to review regularly.",
        "Major updates may be notified separately.",
        "Continued use of our shipping services means acceptance.",
        "We maintain transparency in all shipping updates."
      ]
    }
  ];
}