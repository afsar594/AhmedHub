import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-shipping-policy',
  imports: [CommonModule],
  templateUrl: './shipping-policy.component.html',
  styleUrl: './shipping-policy.component.css'
})
export class ShippingPolicyComponent {
policySections=[
  {
    title: "Processing Time",
      text: "Orders are processed within 1–3 business days. During holidays or high-volume periods, processing may take slightly longer.",
  },
  {
    title: "Shipping Time",
      text: "Delivery time depends on your location: Standard 5–12 days, Express 3–7 days, International 7–20 days.",
  },
  {
    title:'Shipping Costs',
    text:'Shipping costs are calculated at checkout based on weight, destination, and selected shipping method.',
  },
  {
    title:'Order Tracking',
    text:'A tracking number will be emailed to you once your order has shipped. Tracking updates may take up to 24 hours to appear.',
  },
  {
    title:'Incorrect Address',
    text:'If you entered an incorrect address, contact us immediately. Changes are not guaranteed after shipping begins.',
  },
  {
    title:'Lost or Delayed Packages',
    text:'We are not responsible for carrier delays or customs issues. Contact support if your package is lost.',
  },
  {
    title:'Damaged Packages',
    text:'If your package arrives damaged, contact us within 48 hours with photos so we can assist you.',
  }
]
}
