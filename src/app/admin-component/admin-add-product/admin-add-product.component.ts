import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number | string;
  image: string;
}

@Component({
  selector: 'app-admin-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent {
  products: any[] = [];
  productName = '';
  productPrice: number | string = '';
  productImage = '';
  productQuantity: number | string = ''; 
  editId: number | null = null;

  addProduct() {
    const newProduct = {
      id: Date.now(),
      name: this.productName,
      price: this.productPrice,
      image: this.productImage,
      quantity: this.productQuantity  
    };
    this.products.push(newProduct);
    this.clearForm();
  }

  updateProduct() {
    const index = this.products.findIndex(p => p.id === this.editId);
    if (index !== -1) {
      this.products[index] = {
        ...this.products[index],
        name: this.productName,
        price: this.productPrice,
        image: this.productImage,
        quantity: this.productQuantity 
      };
    }
    this.clearForm();
    this.editId = null;
  }

  editProduct(p: any) {
    this.editId = p.id;
    this.productName = p.name;
    this.productPrice = p.price;
    this.productImage = p.image;
    this.productQuantity = p.quantity; 
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }

  cancelEdit() {
    this.clearForm();
    this.editId = null;
  }

  clearForm() {
    this.productName = '';
    this.productPrice = '';
    this.productImage = '';
    this.productQuantity = ''; 
  }
}
