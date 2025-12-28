import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-admin-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent {

  products: any;

  productName = '';
  productBrand = '';
  productDescription = '';
  productPrice: number | '' = '';
  productImage = '';
  productQuantity: number | '' = '';
  productCategory = null;
itemCategory:any
  editId: number | null = null;

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.productImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  addProduct() {
    let paylod={
  itemId: 0,
  itemName: this.productName,
  price: Number(this.productPrice),
  img:  this.productImage,
  qty: Number(this.productQuantity),
  classifiedId: this.productCategory==='Kids'?1 : this.productCategory==='Young Girl'?2 :this.productCategory==='Young Boy'?3:0,
  category: this.itemCategory,
  brand: this.productBrand,
  detail: this.productDescription,
  createdDate: new Date()
    }
     
console.log("form data",paylod)
    


  }
}
