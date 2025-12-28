import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

@Component({
  selector: 'app-admin-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent {

  products: Product[] = [];

  productName = '';
  productBrand = '';
  productDescription = '';
  productPrice: number | '' = '';
  productImage = '';
  productQuantity: number | '' = '';

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
    this.products.push({
      id: Date.now(),
      name: this.productName,
      brand: this.productBrand,
      description: this.productDescription,
      price: Number(this.productPrice),
      image: this.productImage,
      quantity: Number(this.productQuantity)
    });
    this.clearForm();
  }

  updateProduct() {
    const index = this.products.findIndex(p => p.id === this.editId);
    if (index !== -1) {
      this.products[index] = {
        ...this.products[index],
        name: this.productName,
        brand: this.productBrand,
        description: this.productDescription,
        price: Number(this.productPrice),
        image: this.productImage,
        quantity: Number(this.productQuantity)
      };
    }
    this.cancelEdit();
  }

  editProduct(p: Product) {
    this.editId = p.id;
    this.productName = p.name;
    this.productBrand = p.brand;
    this.productDescription = p.description;
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
    this.productBrand = '';
    this.productDescription = '';
    this.productPrice = '';
    this.productImage = '';
    this.productQuantity = '';
  }

  isFormValid() {
    return (
      this.productName &&
      this.productBrand &&
      this.productDescription &&
      this.productPrice &&
      this.productImage &&
      this.productQuantity
    );
  }
}
