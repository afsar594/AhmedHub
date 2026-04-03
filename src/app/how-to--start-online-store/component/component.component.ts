import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-component',
  imports: [CommonModule],
  templateUrl: './component.component.html',
  styleUrl: './component.component.css'
})
export class ComponentComponent {

  activeStep: number | null = null;

  steps = [
    {
      img: 'https://i.pinimg.com/736x/8d/5c/3a/8d5c3a6e8a47f704dc2b95a9f1187638.jpg',
      title: 'Step 1: Choose E-commerce Platform',
      desc: `Starting an online store in Pakistan requires choosing a reliable and scalable e-commerce platform. 
  Popular options include Shopify, WooCommerce, Daraz, or even a custom-built website depending on your technical skills 
  and business goals. Consider factors such as ease of use, speed, mobile responsiveness, available plugins, and integrations 
  with local payment gateways like JazzCash, EasyPaisa, or international options like PayPal. Make sure the platform supports 
  features such as product variants, inventory management, coupon codes, and analytics dashboards. Scalability is crucial: 
  as your business grows, your platform should handle higher traffic, more products, and increased orders without crashing. 
  Also, check the platform’s customer support and community, as timely assistance can save you from potential operational issues. 
  Investing time in choosing the right platform now can save hundreds of hours and a lot of money later, making your online store 
  professional, secure, and ready to attract customers from day one.`,
  date: 'April 2026',
    },
    {
      img: 'https://i.pinimg.com/736x/b7/48/90/b74890aaad6d58afe34763afb402fbd7.jpg',
      title: 'Step 2: List Your Products',
      desc: `After selecting the right e-commerce platform, the next step is to carefully list your products. 
  Each product should have a clear, attention-grabbing title that conveys exactly what the item is. 
  High-quality images from multiple angles are essential, as customers rely heavily on visuals when shopping online. 
  Include detailed product descriptions that explain features, specifications, usage instructions, and benefits. 
  Proper categorization into relevant sections or collections helps shoppers navigate your store easily, 
  while SEO-friendly product descriptions, including targeted keywords, improve your visibility on search engines like Google. 
  Consider adding tags, product variants, and filters (e.g., size, color, style) to enhance the shopping experience. 
  Regularly update product information, stock levels, and prices to maintain credibility and avoid customer frustration. 
  Additionally, including customer reviews, FAQs, and clear return policies for each product builds trust and encourages conversions. 
  A well-structured and visually appealing product catalog can dramatically increase engagement, 
  reduce bounce rates, and maximize the likelihood of sales on your online store.`,
      date: 'April 2026'
    },
    {
      img: 'https://i.pinimg.com/736x/dc/a5/04/dca504971bec57478a4351995626c0dd.jpg',
      title: 'Step 3: Marketing & Promotion',
      desc: `Once your online store is ready with products, effective marketing is essential to attract customers and generate sales. 
  Start by leveraging popular social media platforms like Facebook, Instagram, TikTok, and LinkedIn to reach your target audience. 
  Share engaging content, including product images, videos, tutorials, behind-the-scenes posts, and customer testimonials to build trust 
  and increase engagement. Utilize paid advertising campaigns on Facebook Ads, Instagram Ads, or Google Ads to target specific demographics 
  based on age, location, interests, and purchasing behavior. Email marketing is another powerful tool: send newsletters, promotional offers, 
  and product updates to your subscriber list to encourage repeat purchases. Collaborate with influencers in your niche to promote your 
  products authentically to their followers, which can drive significant traffic and conversions. Implement SEO strategies on your website, 
  including keyword optimization, meta descriptions, alt tags for images, and internal linking to improve organic search visibility. 
  Monitor your campaigns using analytics tools to track engagement, clicks, conversions, and ROI. Continuously adjust your marketing strategy 
  based on performance insights to maximize reach, increase brand awareness, and generate consistent sales. 
  Remember, marketing is not a one-time effort; it’s an ongoing process to maintain customer interest and grow your online store effectively.`,
  date: 'April 2026'
    },
    {
      img: 'https://i.pinimg.com/736x/09/15/73/091573cb402655f61018d09dbafcba5f.jpg',
      title: 'Step 4: Manage Orders & Payments',
      desc: `Efficient order management is the backbone of a successful online store and ensures customer satisfaction. 
  Start by integrating reliable and secure payment gateways such as JazzCash, Easypaisa, Stripe, or PayPal to facilitate smooth transactions. 
  Clearly display payment options on checkout pages and ensure they are easy to use, instilling trust in your customers. 
  Maintain accurate inventory records by regularly updating stock levels, so products listed online reflect real availability and prevent overselling. 
  Implement an order tracking system that allows customers to monitor their shipments in real-time, reducing inquiries and complaints. 
  Automate notifications for order confirmations, dispatch updates, and delivery confirmations to enhance the customer experience. 
  Handle returns, refunds, and cancellations professionally, with clear policies to maintain credibility. 
  Analyze order trends to forecast demand, manage inventory efficiently, and optimize logistics. 
  Properly managing orders and payments not only improves customer satisfaction but also builds trust, increases repeat purchases, 
  and positions your online store as a professional and reliable business in the competitive e-commerce market of Pakistan.`,
  date: 'April 2026'
    },
    {
      img: 'https://i.pinimg.com/736x/80/05/a2/8005a2d609395677e7a10bbbf218958d.jpg',
      title: 'Step 5: Legal & Business Setup',
      desc: `Before fully launching your online store in Pakistan, it is crucial to register your business legally to avoid any future legal or financial complications. 
  Start by selecting a suitable business structure, such as sole proprietorship, partnership, or private limited company, depending on your scale and long-term goals. 
  Obtain the necessary licenses from local authorities and register your business with the Securities and Exchange Commission of Pakistan (SECP) if applicable. 
  Ensure your business has a valid National Tax Number (NTN) and is registered for sales tax where required. Comply with e-commerce regulations, 
  including digital payment compliance, consumer protection laws, and data privacy rules. Having legal documentation in place not only builds credibility 
  with suppliers and customers but also protects you from potential fines, penalties, or disputes. Keep all registration and license documents updated, 
  and consult with legal or business advisors if needed to ensure your store operates smoothly and professionally in the Pakistani market.`,
  date: 'April 2026'
    },
    {
      img: 'https://i.pinimg.com/736x/54/95/3c/54953ccbea5b0d2072d5562b97ac9b86.jpg',
      title: 'Step 6: Customer Support',
      desc: `Providing exceptional customer support is a key factor in building a loyal customer base for your online store. 
  Make sure to offer multiple support channels, including live chat, email, and phone support, so customers can reach you conveniently. 
  Respond to inquiries promptly, ideally within a few hours, to resolve issues and answer questions effectively. 
  Train your support team to handle complaints professionally, provide solutions quickly, and guide customers through product usage or order issues. 
  Consider implementing a ticketing system to track requests and ensure no query goes unanswered. 
  Proactively follow up on resolved issues to make customers feel valued and heard. 
  Excellent customer support increases trust, encourages positive reviews, and boosts repeat purchases. 
  Happy customers are more likely to recommend your store to friends and family, which can significantly expand your reach organically.`,
  date: 'April 2026'
    }
  ];

  toggleStep(index: number) {
    this.activeStep = this.activeStep === index ? null : index;
  }

}
