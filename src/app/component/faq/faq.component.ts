import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FAQComponent {
  faqCategories = [
    {
      q: 'Can I change or cancel my order?',
      a: 'The production process starts quickly, but we’ll do our best to accommodate any changes before your order begins production. Updates to your shipping address or email can be made directly through your online receipt.If you need to make product or quantity changes, please contact our support team immediately. Provide your order number and details so we can assist you quickly.',
      open: false
    },
    {
      q: 'I got an error when placing my order. What went wrong?',
      a: 'Errors usually occur due to incorrect payment details, slow internet, or a temporary issue with the payment processor.Please double-check your billing address, card number, and available balance.If the issue continues, try using a different browser or payment method.You may also contact your bank to ensure the transaction is`t being blocked',
      open: false
    },
    {
      q: 'I didn`t receive an order confirmation email.',
      a: 'Order confirmation emails typically arrive within a few minutes.Check your spam, promotions, or junk folder just in case. If you still cannot find it, you may have entered an incorrect email.Contact customer support with your name and order details so we can resend your confirmation.',
      open: false
    },
    {
      q: 'What if I can`t find what I am looking for?',
      a: 'We offer a wide range of products, but if you cannot find a specific item, our support team can help check availability or suggest similar alternatives.Feel free to reach out through the chat widget or contact form anytime.',
      open: false
    },
    {
      q: 'What type of products do you offer?',
      a: 'We use a variety of quality products from carefully selected brands. Most apparel items are 100% cotton, and our catalog also includes 100% ethically sourced and eco–friendly products. Note that heathered colors and some specific clothing items are generally poly-blends. The specifics for each product type are listed in the “Product Details” section of the order screen. While we make every effort to provide a consistent product per run, hues and brands may vary due to supply chain availability but will be of comparable or better quality.',
      open: false
    },
    {
      q: 'How does the clothing generally fit?',
      a: 'Finding the right fit online can often be challenging. Take a glance at our size chart linked below the item selection area of the order screen. Women’s shirts such as Nano or Fitted have a slim, contoured fit. We recommend going up a size if a roomier fit is preferred. Please note that measurements may vary up to 1 inch (2.5 cm) due to manufacturing variances.',
      open: false
    },
    {
      q: "Can I track my order?",
      a: `
Yes! Once your order ships, you’ll receive an email containing your tracking information.  
You can click the link anytime to view your delivery status.
          `,
      open: false
    },

    {
      q: "I haven't received a shipment notification.",
      a: `
Sometimes emails get filtered into spam folders.  
Please check there first.  
If you still do not see the notification after 5 days, contact support.
          `,
      open: false
    },

    {
      q: "My tracking number isn’t working.",
      a: `
Tracking numbers may take 24–48 hours to activate.  
If the status does not update after that, contact us and we will check with the carrier.
          `,
      open: false
    },

    {
      q: "I need help with a late order.",
      a: `
Shipping delays can occur due to weather, holidays, or customs.  
If your order is significantly late, contact us and we will investigate.
          `,
      open: false
    },

    {
      q: "What can I do if I entered the wrong shipping address?",
      a: `
If your order has not entered production, we can update your shipping address.  
Please contact us immediately with the correct information.
          `,
      open: false
    },
    {
      q: "My shirt doesn't fit. What do I do?",
      a: `
If your item does not fit, contact support within 7 days of receiving it.  
We will guide you through our exchange or replacement process.
          `,
      open: false
    },

    {
      q: "What is your return and refund policy?",
      a: `
We accept returns for damaged, defective, or incorrect items.  
For smooth processing, send photos and include your order number.  
Refunds are issued to your original payment method.
          `,
      open: false
    },
    {
      q: "What is GearLaunch?",
      a: `
GearLaunch is an e-commerce fulfillment platform that helps sellers produce and ship high-quality products worldwide.
          `,
      open: false
    },

    {
      q: "How do I report a campaign for policy violations?",
      a: `
If you believe a campaign violates policies, please contact customer support with the campaign link and details.
          `,
      open: false
    },

    {
      q: "Do I need to enable cookies in my browser?",
      a: `
Yes. Cookies help store your cart, track your orders, and improve your shopping experience.  
Most browsers enable cookies automatically.
          `,
      open: false
    }
  ]
}
