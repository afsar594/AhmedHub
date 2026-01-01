import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-admin-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css'],
})
export class AdminAddProductComponent implements OnInit {
  productForm!: FormGroup;
  DataItem: any = [];
  Isbtn: boolean = false;
  SaveData: any;
  selectedSizes: string[] = [];

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      oldprice: [''],
      discount: [''],
      quantity: ['', Validators.required],
      itemCategory: ['', Validators.required],
      productCategory: ['Young Boy', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      sizes: this.fb.array([]),
      currentColor: [''],
      colors: this.fb.array([]),
    });
    this.getAll();
  }

  get colors(): FormArray {
    return this.productForm.get('colors') as FormArray;
  }

  get sizes(): FormArray {
    return this.productForm.get('sizes') as FormArray;
  }

  toggleSize(size: string, event: any) {
    if (event.target.checked) {
      this.sizes.push(this.fb.control(size));
    } else {
      const index = this.sizes.controls.findIndex(x => x.value === size);
      if (index !== -1) this.sizes.removeAt(index);
    }
  }

  addColor() {
    const color = this.productForm.get('currentColor')?.value;
    if (!color) return;
    if (this.colors.value.some((c: any) => c.value === color)) return;
    this.colors.push(this.fb.group({ value: color }));
    this.productForm.get('currentColor')?.reset();
  }

  removeColor(index: number) {
    this.colors.removeAt(index);
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.productForm.patchValue({ image: reader.result });
    };
    reader.readAsDataURL(file);
  }

  addProduct() {
    const formValue = this.productForm.value;
    const payload = {
      itemId: this.SaveData ? this.SaveData.itemId : 0,
      itemName: formValue.name,
      brand: formValue.brand,
      price: Number(formValue.price),
      oldprice: Number(formValue.oldprice),
      discount: Number(formValue.discount),
      qty: Number(formValue.quantity),
      category: formValue.itemCategory,
      classifiedId:
        formValue.productCategory === 'Kids'
          ? 1
          : formValue.productCategory === 'Young Girl'
          ? 2
          : 3,
      detail: formValue.description,
      img: formValue.image,
      sizes: this.selectedSizes,
      color: this.colors.value.length > 0 ? this.colors.value[0] : null,
      createdDate: new Date(),
    };

    if (payload.itemId === 0) this.saveProduct(payload);
    else this.updateProduct(payload);
  }

  saveProduct(payload: any) {
    this.api.saveItems(payload).subscribe(() => {
      this.getAll();
      this.ResetForm();
    });
  }

  updateProduct(payload: any) {
    this.api.UpdateItems(payload.itemId, payload).subscribe(() => {
      this.getAll();
      this.ResetForm();
    });
  }

  EditProduct(p: any) {
    this.Isbtn = true;
    this.SaveData = p;
    this.selectedSizes = p.sizes || [];

    this.productForm.patchValue({
      name: p.itemName,
      brand: p.brand,
      price: p.price,
      oldprice: p.oldprice,
      discount: p.discount,
      quantity: p.qty,
      itemCategory: p.category,
      productCategory:
        p.classifiedId === 1
          ? 'Kids'
          : p.classifiedId === 2
          ? 'Young Girl'
          : 'Young Boy',
      description: p.detail,
      image: p.img,
    });

    this.colors.clear();
    if (p.color) this.colors.push(this.fb.group({ value: p.color.value }));
  }

  ResetForm() {
    this.Isbtn = false;
    this.SaveData = null;
    this.selectedSizes = [];
    this.colors.clear();
    this.productForm.reset({ productCategory: 'Young Boy' });
  }

  getAll() {
    this.api.getItemsAll().subscribe((res: any) => {
      if (res.isSuccess) this.DataItem = res.data;
    });
  }

  DeleteProduct(p: any) {
    this.api.DeleteItems(p.itemId).subscribe(() => this.getAll());
  }
}
