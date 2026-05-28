import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { AlertModalComponent } from "../../shared/alert-modal/alert-modal.component";

@Component({
  selector: 'app-detail-card',
  standalone: true,
  imports: [CommonModule, AlertModalComponent],
  templateUrl: './detail-card.component.html',
  styleUrl: './detail-card.component.css',
})
export class DetailCardComponent implements OnInit {

  quantity = 1;
  record: any = null;

  activeImage = '';
  allImages: string[] = [];
  hoverImage: string | null = null;

  thumbStartIndex = 0;
  thumbLimit = 4;

  selectcolor = '';
  selectedsize = '';

  // ================= MODAL =================
  showModal = false;
  modalTitle = '';
  modalMessage = '';
  modalAction: (() => void) | null = null;

  // ================= TOAST =================
  showToast = false;
  toastMessage = '';

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private api: ApiService,
  ) {}

  ngOnInit() {
    this.record = history.state?.data || null;
    if (!this.record) {
      return;
    }

    // IMAGE HANDLING SAFE
    if (this.record.images?.length > 0) {
      this.allImages = this.record.images;
    } else if (this.record.image) {
      this.allImages = [this.record.image];
    } else {
      this.allImages = ['assets/no-image.png'];
    }

    this.activeImage = this.allImages[0];
  }

  // ================= CONFIRM MODAL =================
  confirmAddToCart(data: any) {
    this.modalTitle = 'Add to Cart';
    this.modalMessage = `Do you want to add "${data.title}" to cart?`;

    this.modalAction = () => this.saveToCart(data);
    this.showModal = true;
  }

  handleConfirm() {
    if (this.modalAction) {
      this.modalAction();
    }
    this.resetModal();
  }

  handleCancel() {
    this.resetModal();
  }

  private resetModal() {
    this.showModal = false;
    this.modalAction = null;
  }

  // ================= SAVE CART =================
 saveToCart(data: any) {

  // ================= CONFIRMATION =================
  this.modalTitle = 'Confirm Add to Cart';
  this.modalMessage = `Do you want to add "${data.title}" to cart?`;

  this.modalAction = () => {

    // ================= API CALL =================
    const payload = {
      id: 0,
      itemId: data.id,
      itemName: data.title,
      price: data.price,
      oldPrice: data.oldPrice,
      discount: data.discount,
      qty: this.quantity,
      img: this.activeImage,
      image: this.activeImage,
      detail: data.detail,
      color: this.selectcolor,
      size: this.selectedsize,
      classifiedId: data.classifiedId ?? 1,
      category: data.category,
      brand: data.brand,
      createdDate: new Date(),
      currentUser: 'user',
    };

    this.api.saveCard(payload).subscribe({
      next: (res: any) => {
        this.api.refreshCartCount();
        this.showToastMessage(res?.message || 'Item added to cart successfully');
      },
      error: () => {
        this.showToastMessage('Something went wrong');
      }
    });

  };

  // SHOW MODAL
  this.showModal = true;
}

  // ================= TOAST =================
  private showToastMessage(msg: string) {
    this.toastMessage = msg;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  // ================= THUMB IMAGES =================
  get visibleThumbs() {
    return this.allImages.slice(
      this.thumbStartIndex,
      this.thumbStartIndex + this.thumbLimit
    );
  }

  nextThumb() {
    if (this.thumbStartIndex + this.thumbLimit < this.allImages.length) {
      this.thumbStartIndex++;
    }
  }

  prevThumb() {
    if (this.thumbStartIndex > 0) {
      this.thumbStartIndex--;
    }
  }

  setActiveImage(img: string) {
    this.activeImage = img;
  }

  onThumbHover(img: string) {
    this.hoverImage = img;
  }

  onThumbLeave() {
    this.hoverImage = null;
  }

  get displayedImage(): string {
    return this.hoverImage || this.activeImage;
  }

  // ================= QUANTITY =================
  increase() {
    if (!this.record?.qty || this.quantity < this.record.qty) {
      this.quantity++;
    }
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // ================= NAVIGATION =================
  navigateToForm(data: any) {
    this.router.navigate(['buy-now'], {
      state: { data: { ...data, qty: this.quantity } }
    });
  }

  totalPriceFix(p: number, q: number) {
    return (p * q).toFixed(2);
  }
}