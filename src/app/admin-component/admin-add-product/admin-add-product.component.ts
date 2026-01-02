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

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: [1, [Validators.required, Validators.min(1)]],
      oldprice: [0, [Validators.min(0)]],
      discount: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      itemCategory: ['', Validators.required],
      productCategory: ['Young Boy', Validators.required],
      description: ['', Validators.required],
      images: this.fb.array([], Validators.required),
      sizes: this.fb.array([]),
      currentColor: [''],
      colors: this.fb.array([]),
    });

    this.getAll();
    this.autoDiscountCalculation();
  }

  // FormArray getters
  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  get colors(): FormArray {
    return this.productForm.get('colors') as FormArray;
  }

  get sizes(): FormArray {
    return this.productForm.get('sizes') as FormArray;
  }

  // Drag & drop images
  onDragOver(event: any) {
    event.preventDefault();
  }

  onDrop(event: any) {
    event.preventDefault();
    this.processFiles(event.dataTransfer.files);
  }

  onImageSelect(event: any) {
    this.processFiles(event.target.files);
  }

  processFiles(files: FileList) {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.push(this.fb.control(e.target.result));
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }

  // Sizes toggle
  toggleSize(size: string, event: any) {
    if (event.target.checked) {
      this.sizes.push(this.fb.control(size));
    } else {
      const index = this.sizes.controls.findIndex((x) => x.value === size);
      if (index !== -1) this.sizes.removeAt(index);
    }
  }

  // Colors
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

  // Auto Discount Calculation
  autoDiscountCalculation() {
    this.productForm.valueChanges.subscribe((val) => {
      const price = Number(val.price);
      const oldprice = Number(val.oldprice);
      if (oldprice > 0 && price > 0 && oldprice > price) {
        const discount = Math.round(((oldprice - price) / oldprice) * 100);
        this.productForm.patchValue({ discount }, { emitEvent: false });
      } else {
        this.productForm.patchValue({ discount: 0 }, { emitEvent: false });
      }
    });
  }

  // Add / Update Product
  addProduct() {
    const val = this.productForm.value;
    const payload = {
      itemId: this.SaveData ? this.SaveData.itemId : 0,
      itemName: val.name,
      brand: val.brand,
      price: Number(val.price),
      oldprice: Number(val.oldprice),
      discount: Number(val.discount),
      qty: Number(val.quantity),
      category: val.itemCategory,
      classifiedId:
        val.productCategory === 'Kids'
          ? 1
          : val.productCategory === 'Young Girl'
          ? 2
          : 3,
      detail: val.description,
      images: val.images, // multiple images
      sizes: val.sizes,
      color: val.colors.length > 0 ? val.colors : [],
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

  // Edit Product
  EditProduct(p: any) {
    this.Isbtn = true;
    this.SaveData = p;

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
    });

    // Clear & set images
    this.images.clear();
    if (p.images?.length > 0)
      p.images.forEach((img: any) => this.images.push(this.fb.control(img)));

    // Clear & set colors
    this.colors.clear();
    if (p.color?.length > 0)
      p.color.forEach((c: any) =>
        this.colors.push(this.fb.group({ value: c.value }))
      );

    // Clear & set sizes
    this.sizes.clear();
    if (p.sizes?.length > 0)
      p.sizes.forEach((s: any) => this.sizes.push(this.fb.control(s)));
  }

  ResetForm() {
    this.Isbtn = false;
    this.SaveData = null;
    this.sizes.clear();
    this.colors.clear();
    this.images.clear();
    this.productForm.reset({
      productCategory: 'Young Boy',
      price: 1,
      oldprice: 0,
      discount: 0,
      quantity: 0,
    });
  }

  getAll() {
    this.api.getItemsAll().subscribe((res: any) => {
      if (res.isSuccess) this.DataItem = res.data;
    });
  }
  DeleteProduct(p: any) {
    this.api.DeleteItems(p.itemId).subscribe(() => this.getAll());
  }
  onColorChange() {
    console.log('Selected color:', this.itemColor);
  }
}
