import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-detail-card',
  imports: [CommonModule],
  templateUrl: './detail-card.component.html',
  styleUrl: './detail-card.component.css'
})
export class DetailCardComponent {
  quantity=1;
product = [
  {
  title: 'Men’s Classic Warm Hoodie',
  image: 'https://i.pinimg.com/1200x/85/06/26/850626136d53b0ec52bc37e9a35f4c1f.jpg',
  price: 15.99,
  oldPrice: 22.99,
  discount: '-30%'
},
]
totalPriceFix(p:any,q:any)
{
let total=p*q;
return total.toFixed(2);
}
increase(){
  this.quantity++;
}
decrease(){
  if(this.quantity>1){
    this.quantity--
  }
}
//  selectColor(color:string){
//   this.selectColor=color;
//  }
   colors=[
  '#000000', '#ff0000', '#0066ff', '#ff9900', '#7d00ff', '#F54927' ,'#F5276C' , '#F5B027' , '#CD5C5C' , '#808080' , '#008000' 
 ]
 selectcolor='';
 sizes=['S' , 'M' , 'L' , 'XL'];
 selectedsize='';

}
