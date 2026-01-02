import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-admin-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css'],
})
export class AdminAddProductComponent implements OnInit {
  ItemDiscount = '';
  ItemOldPrice = '';
  products: any;
  itemColor: string = '#000000'; // default color
  productName = '';
  productBrand = '';
  productDescription = '';
  productPrice: number | '' = '';
  productImage = '';
  productQuantity: number | '' = '';
  productCategory: any = 'Young Boy';
  itemCategory: any;
  editId: number | null = null;
  Isbtn: boolean = false;
  DataItem: any;
  SaveData: any;
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.getAll();
  }
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
    let paylod = {
      itemId: this.SaveData != null ? this.SaveData.itemId : 0,
      itemName: this.productName,
      discount: this.ItemDiscount,
      OldPrice: this.ItemOldPrice,
      price: Number(this.productPrice),
      img: this.productImage,
      color: this.itemColor,
      qty: Number(this.productQuantity),
      classifiedId:
        this.productCategory === 'Kids'
          ? 1
          : this.productCategory === 'Young Girl'
          ? 2
          : this.productCategory === 'Young Boy'
          ? 3
          : 0,
      category: this.itemCategory,
      brand: this.productBrand,
      detail: this.productDescription,
      createdDate: new Date(),
    };
    if (paylod.itemId == 0) {
      this.saveProduct(paylod);
    } else {
      this.update(paylod);
    }
  }
  saveProduct(paylod: any) {
    this.api.saveItems(paylod).subscribe((res) => {
      console.log('save response', res);
      this.getAll();
      this.ResetForm();
    });
  }
  update(paylod: any) {
    this.api.UpdateItems(paylod.itemId, paylod).subscribe((res) => {
      console.log('data Updated');
      this.getAll();
    });
  }
  getAll() {
    this.api.getItemsAll().subscribe((res: any) => {
      if (res.isSuccess) this.DataItem = res.data;
    });
  }
  EditProduct(p: any) {
    this.productName = p.itemName;
    this.itemColor = p?.color;
    this.ItemDiscount = p?.discount;
    this.ItemOldPrice = p?.oldPrice;
    this.productBrand = p.brand;
    this.productDescription = p.detail;
    this.productPrice = p.price;
    this.productImage = p.img;
    this.productQuantity = p.qty;
    this.itemCategory = p.category;
    this.productCategory =
      p.classifiedId == 1
        ? 'Kids'
        : p.classifiedId == 2
        ? 'Young Girl'
        : p.classifiedId == 3
        ? 'Young Boy'
        : 0;
    this.Isbtn = true;
    this.SaveData = p;
  }
  ResetForm() {
    this.productName = '';
    this.productBrand = '';
    this.productDescription = '';
    this.productPrice = '';
    this.productImage = '';
    this.productQuantity = '';
    this.itemCategory = '';
    this.productCategory = '';
    this.itemColor = '';
    this.ItemDiscount;
    this.ItemOldPrice;
    this.itemColor;
    this.Isbtn = false;
  }
  DeleteProduct(p: any) {
    this.api.DeleteItems(p.itemId).subscribe((res) => {
      this.getAll();
    });
  }
  onColorChange() {
    console.log('Selected color:', this.itemColor);
  }
}
