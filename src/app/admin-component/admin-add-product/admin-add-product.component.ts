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
  DataItem: any;
  Isbtn: boolean = false;
  SaveData: any;
  itemColor: any;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      oldprice: ['', [Validators.min(0)]],
      discount: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      itemCategory: ['', Validators.required],
      productCategory: ['Young Boy', Validators.required],
      description: ['', Validators.required],
      images: this.fb.array([], Validators.required),
      video: [''],
      sizes: this.fb.array([]),
      currentColor: [''],
      colors: this.fb.array([]),
      status: [true],
    });
    this.DataItem = [
      {
        itemId: 1,
        itemName: 'Cool T-Shirt',
        brand: 'BrandX',
        price: 500,
        oldprice: 700,
        discount: 29,
        qty: 20,
        category: 'Clothing',
        classifiedId: 3,
        detail:
          'High quality cotton t-shirt for young boys. Comfortable and trendy design.',
        sizes: ['S', 'M', 'L'],
        color: [{ value: '#ff0000' }, { value: '#0000ff' }],
        images: [
          'https://i.pinimg.com/1200x/46/72/0d/46720dacf89fe86096d7157cddbf7ff8.jpg',
          'https://i.pinimg.com/736x/b9/98/8a/b9988a39dab7e7fb741b6e8febfb57f1.jpg',
        ],
        createdDate: new Date(),
      },
      {
        itemId: 2,
        itemName: 'Stylish Jacket',
        brand: 'BrandY',
        price: 1200,
        oldprice: 1500,
        discount: 20,
        qty: 10,
        category: 'Winter Wear',
        classifiedId: 2,
        detail:
          'Warm and stylish jacket suitable for young girls. Perfect for winter season.',
        sizes: ['M', 'L', 'XL'],
        color: [
          { value: '#00ff00' },
          { value: '#ffff00' },
          { value: '#0000ff' },
        ],
        images: [
          'https://i.pinimg.com/1200x/09/1f/f3/091ff3982274db868af8175bcb12fd6a.jpg',
          'https://i.pinimg.com/736x/92/bb/a3/92bba38a680b10ef7110e94841c85208.jpg',
          'https://i.pinimg.com/1200x/4c/08/b6/4c08b6bb54e1bf7b7ce431ec82835e22.jpg',
        ],
        createdDate: new Date(),
      },
      {
        itemId: 3,
        itemName: 'Kids Sneakers',
        brand: 'BrandZ',
        price: 800,
        oldprice: 1000,
        discount: 20,
        qty: 15,
        category: 'Footwear',
        classifiedId: 1,
        detail:
          'Comfortable sneakers for kids. Colorful design and durable material.',
        sizes: ['S', 'M'],
        color: [{ value: '#ff9900' }, { value: '#6600ff' }],
        images: [
          'https://i.pinimg.com/1200x/c4/13/55/c4135537d9c8125ffcaa728d01951da2.jpg',
        ],
        createdDate: new Date(),
      },
    ];

    // 🔹 Dummy ke liye backend ko temporarily comment karo
    // this.getAll();

    this.autoDiscountCalculation();
  }

  //   this.getAll();
  //   this.autoDiscountCalculation();
  // }

  // FormArray getters
  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }
  get video(): string {
    return this.productForm.get('video')?.value;
  }

  get colors(): FormArray {
    return this.productForm.get('colors') as FormArray;
  }

  get sizes(): FormArray {
    return this.productForm.get('sizes') as FormArray;
  }

  // Drag & drop images
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (!event.dataTransfer) return;
    this.processFiles(event.dataTransfer.files);
  }

  maxVideoSize = 5 * 1024 * 1024;
  maxVideoDuration = 30;
  videos: string[] = [];

  onFileSelect(event: any) {
    const files: FileList = event.target.files;
    this.processFiles(files);
    event.target.value = '';
  }

  processFiles(files: FileList) {
    Array.from(files).forEach((file) => {
      // ================= IMAGE =================
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.images.push(this.fb.control(reader.result));
        };
        reader.readAsDataURL(file);
      }

      // ================= VIDEO =================
      if (file.type.startsWith('video/')) {
        // ❌ size check
        if (file.size > this.maxVideoSize) {
          alert('Video must be 5 MB or less');
          return;
        }

        const videoElement = document.createElement('video');
        videoElement.preload = 'metadata';

        videoElement.onloadedmetadata = () => {
          window.URL.revokeObjectURL(videoElement.src);

          // ❌ duration check
          if (videoElement.duration > this.maxVideoDuration) {
            alert('Video duration must be 30 seconds or less');
            return;
          }

          // ✅ valid video
          const reader = new FileReader();
          reader.onload = () => {
            this.productForm.patchValue({
              video: reader.result,
            });
          };
          reader.readAsDataURL(file);
        };

        videoElement.src = URL.createObjectURL(file);
      }
    });
  }

  removeImage(index: number) {
    const ok = window.confirm('Are you sure you want to remove this image?');
    if (!ok) return;
    this.images.removeAt(index);
  }
  removeVideo() {
    const ok = window.confirm('Are you sure you want to remove this video?');
    if (!ok) return;
    this.productForm.patchValue({ video: '' });
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
    debugger;
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
      if (res.isSuccess) this.DataItem = res?.data;
    });
  }
  DeleteProduct(p: any) {
    const ok = window.confirm(
      'Are you sure you want to delete this product? This action cannot be undone.'
    );
    if (!ok) return;
    this.api.DeleteItems(p.itemId).subscribe(() => this.getAll());
  }
  toggleStatus(product: any) {
    product.status = !product.status; // Toggle value

    // Update backend
    this.api
      .UpdateItems(product.itemId, { ...product, status: product.status })
      .subscribe(() => {
        // Optional: toast / alert
        console.log(
          `${product.itemName} status updated to ${
            product.status ? 'Active' : 'Inactive'
          }`
        );
      });
  }
}
