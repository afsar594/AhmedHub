import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-now',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css'],
})
export class BuyNowComponent implements OnInit {

  baseUrl = 'https://localhost:44379';
  private readonly DELIVERY_PROFILES_KEY = 'ahmedhub_delivery_profiles';

  deliveryForm: FormGroup;

  selectedItems: any[] = [];

  checkoutMode: 'choose' | 'manual' | 'gmail' = 'choose';
  gmailAvailable = false;
  gmailEmail = '';
  gmailDisplayName = '';
  gmailLookupError = '';
  googleLoading = false;

  availableAreas: string[] = [];

  areasByProvince: any = {

    Punjab: [
      'Lahore',
      'Faisalabad',
      'Multan'
    ],

    Sindh: [
      'Karachi',
      'Hyderabad',
      'Sukkur'
    ],

    KPK: [
      'Peshawar',
      'Mardan',
      'Swat'
    ],

    Balochistan: [
      'Quetta',
      'Gwadar',
      'Turbat'
    ],
  };

  constructor(
    private fb: FormBuilder,
    private route: Router
  ) {

    // FORM
    this.deliveryForm = this.fb.group({

      fullName: [
        '',
        Validators.required
      ],

      email: [
        '',
        [Validators.email]
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^03[0-9]{9}$'
          ),
        ],
      ],

      province: [
        '',
        Validators.required
      ],

      area: [
        '',
        Validators.required
      ],

      house: [
        '',
        Validators.required
      ],

      colony: [''],

      address: [
        '',
        Validators.required
      ],
    });
  }

  ngOnInit(): void {

    this.loadGmailProfile();

    const navigation = history.state;

    // RECEIVE PREVIOUS PAGE DATA
    if (navigation.data != null) {

      // MULTIPLE ITEMS
      if (
        Array.isArray(
          navigation.data
        )
      ) {

        this.selectedItems =
          navigation.data;

      } else {

        // SINGLE ITEM
        const item =
          navigation.data;

        const result = {

          id: 0,

          itemId: item.id,

          itemName:
            item.title,

          price:
            item.price,

          oldPrice:
            item.oldPrice,

          discount:
            item.discount,

          qty:
            item.qty,

          img: '',

          detail:
            item.detail,

          color: '',

          classifiedId:
            item.classifiedId,

          category:
            item.category,

          brand:
            item.brand,

          createdDate:
            new Date().toISOString(),

          CurrentUser:
            '21',

          image:
            item.image,

          subTotal:
            item.qty *
            item.price,

          shippingFee:
            100,

          tax: 0,

          totalAmount:
            item.qty *
              item.price +
            100,
        };

        this.selectedItems =
          [result];
      }
    }

    console.log(
      'Selected Items:',
      this.selectedItems
    );

    // PROVINCE CHANGE
    this.deliveryForm
      .get('province')
      ?.valueChanges.subscribe(
        (province) => {

          this.availableAreas =
            this
              .areasByProvince[
              province
            ] || [];

          this.deliveryForm
            .get('area')
            ?.setValue('');
        }
      );
  }

  chooseManualEntry(): void {
    this.checkoutMode = 'manual';
  }

  chooseGmailEntry(): void {
    this.checkoutMode = 'gmail';
    this.gmailLookupError = '';

    this.fetchFromGoogleAccount();
  }

  fetchFromGoogleAccount(): void {
    const googleObj = (window as any).google;
    const clientId = String((window as any).__GOOGLE_CLIENT_ID__ || '').trim();

    if (!googleObj?.accounts?.oauth2 && !googleObj?.accounts?.id) {
      this.gmailLookupError = 'Google service is not loaded. Please refresh the page.';
      return;
    }

    if (!clientId || clientId.includes('YOUR_GOOGLE_CLIENT_ID')) {
      this.gmailLookupError = 'Google Client ID is not configured yet.';
      return;
    }

    this.gmailLookupError = '';
    this.googleLoading = true;

    if (googleObj?.accounts?.oauth2) {
      const tokenClient = googleObj.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'openid email profile',
        callback: async (tokenResponse: any) => {
          if (tokenResponse?.error || !tokenResponse?.access_token) {
            this.googleLoading = false;
            this.gmailLookupError = 'Google authorization failed. Please try again.';
            return;
          }

          await this.loadGoogleUserInfo(tokenResponse.access_token);
        },
      });

      tokenClient.requestAccessToken({ prompt: 'select_account' });
      return;
    }

    googleObj.accounts.id.initialize({
      client_id: clientId,
      callback: (response: any) => {
        this.handleGoogleCredential(response);
      },
      auto_select: true,
      ux_mode: 'popup',
    });

    googleObj.accounts.id.prompt((notification: any) => {
      this.googleLoading = false;
      if (notification?.isNotDisplayed?.() || notification?.isSkippedMoment?.()) {
        this.gmailLookupError = 'Please select your Google account to continue.';
      }
    });
  }

  private async loadGoogleUserInfo(accessToken: string): Promise<void> {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('userinfo request failed');
      }

      const profile = await response.json();
      const email = String(profile?.email || '').trim().toLowerCase();
      const name = String(profile?.name || this.getDisplayNameFromEmail(email));

      if (!email) {
        throw new Error('email not found');
      }

      this.gmailLookupError = '';
      this.gmailEmail = email;
      this.gmailDisplayName = name;
      this.gmailAvailable = true;

      this.patchFormFromGoogleAccount(this.gmailEmail, this.gmailDisplayName);

      localStorage.setItem(
        'ahmedhub_gmail_profile',
        JSON.stringify({
          email: this.gmailEmail,
          displayName: this.gmailDisplayName,
        })
      );
    } catch {
      this.gmailLookupError = 'Unable to get profile from Google account.';
    } finally {
      this.googleLoading = false;
    }
  }

  private handleGoogleCredential(response: any): void {
    const token = String(response?.credential || '');
    const payload = this.decodeJwtPayload(token);
    const email = String(payload?.email || '').trim().toLowerCase();

    if (!email) {
      this.gmailLookupError = 'Unable to read email from Google account.';
      this.googleLoading = false;
      return;
    }

    this.gmailLookupError = '';
    this.gmailEmail = email;
    this.gmailDisplayName = String(payload?.name || this.getDisplayNameFromEmail(email));

    this.gmailAvailable = true;

    this.patchFormFromGoogleAccount(this.gmailEmail, this.gmailDisplayName);

    localStorage.setItem(
      'ahmedhub_gmail_profile',
      JSON.stringify({
        email: this.gmailEmail,
        displayName: this.gmailDisplayName,
      })
    );

    this.googleLoading = false;
  }

  private patchFormFromGoogleAccount(email: string, name: string): void {
    const savedDelivery = this.getSavedDeliveryProfile(email);

    if (!savedDelivery) {
      this.deliveryForm.patchValue({
        fullName: name,
        email,
      });
      return;
    }

    const province = savedDelivery.province || '';
    this.availableAreas = this.areasByProvince[province] || [];

    this.deliveryForm.patchValue({
      fullName: name,
      email,
      phone: savedDelivery.phone || '',
      province,
      area: savedDelivery.area || '',
      house: savedDelivery.house || '',
      colony: savedDelivery.colony || '',
      address: savedDelivery.address || '',
    }, { emitEvent: false });
  }

  private getSavedDeliveryProfile(email: string): any {
    const raw = localStorage.getItem(this.DELIVERY_PROFILES_KEY);

    if (!raw) {
      return null;
    }

    try {
      const profiles = JSON.parse(raw);
      return profiles?.[email] || null;
    } catch {
      return null;
    }
  }

  private saveDeliveryProfile(email: string, value: any): void {
    if (!email) {
      return;
    }

    const raw = localStorage.getItem(this.DELIVERY_PROFILES_KEY);
    let profiles: any = {};

    try {
      profiles = raw ? JSON.parse(raw) : {};
    } catch {
      profiles = {};
    }

    profiles[email] = {
      phone: value.phone,
      province: value.province,
      area: value.area,
      house: value.house,
      colony: value.colony,
      address: value.address,
    };

    localStorage.setItem(this.DELIVERY_PROFILES_KEY, JSON.stringify(profiles));
  }

  private decodeJwtPayload(token: string): any {
    if (!token || token.split('.').length < 2) {
      return {};
    }

    try {
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64.padEnd(base64.length + (4 - (base64.length % 4 || 4)) % 4, '=');
      const json = atob(padded);
      return JSON.parse(json);
    } catch {
      return {};
    }
  }

  changeEntryMode(): void {
    this.checkoutMode = 'choose';
  }

  private loadGmailProfile(): void {
    const raw = localStorage.getItem('ahmedhub_gmail_profile');

    if (!raw) {
      this.gmailAvailable = false;
      return;
    }

    try {
      const profile = JSON.parse(raw);
      const email = String(profile?.email || '').trim();

      if (!email) {
        this.gmailAvailable = false;
        return;
      }

      this.gmailAvailable = true;
      this.gmailEmail = email;
      this.gmailDisplayName = String(profile?.displayName || this.getDisplayNameFromEmail(email));
    } catch {
      this.gmailAvailable = false;
    }
  }

  private getDisplayNameFromEmail(email: string): string {
    const localPart = email.split('@')[0] || '';

    return localPart
      .replace(/[._-]+/g, ' ')
      .split(' ')
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  // SUBTOTAL
  subtotal(): number {

    return this.selectedItems.reduce(

      (
        sum: number,
        item: {
          qty: number;
          price: number;
        }
      ) =>

        sum +
        item.qty *
          item.price,

      0
    );
  }

  // PLACE ORDER
  save() {

    if (this.checkoutMode === 'choose') {
      return;
    }

    // VALIDATION
    if (
      this.deliveryForm.invalid
    ) {

      this.deliveryForm
        .markAllAsTouched();

      return;
    }

    const formValue =
      this.deliveryForm.value;

    const profileEmail = String(formValue.email || this.gmailEmail || '').trim().toLowerCase();
    this.saveDeliveryProfile(profileEmail, formValue);

    // CHECKOUT PAYLOAD
    const checkoutPayload =
      this.selectedItems.map(
        (x: any) => {

          const subTotal =
            x.price * x.qty;

          const shippingFee =
            100;

          const tax = 0;

          return {

            id:
              x.id || 0,

            itemId:
              x.itemId ||
              x.id,

            itemName:
              x.itemName ||
              x.title,

            price:
              x.price,

            oldPrice:
              x.oldPrice,

            discount:
              x.discount,

            qty:
              x.qty,

            img:
              x.img,

            detail:
              x.detail,

            color:
              x.color,

            classifiedId:
              x.classifiedId,

            category:
              x.category,

            brand:
              x.brand,

            createdDate:
              x.createdDate ||
              new Date().toISOString(),

            CurrentUser:
              '21',

            image:
              x.image,

            subTotal:
              subTotal,

            shippingFee:
              shippingFee,

            tax:
              tax,

            totalAmount:
              subTotal +
              shippingFee +
              tax,
          };
        }
      );

    // FINAL DATA
    const finalData = {

      // DELIVERY INFO
      deliveryData: {

        fullName:
          formValue.fullName,

        email:
          formValue.email,

        phone:
          formValue.phone,

        province:
          formValue.province,

        area:
          formValue.area,

        house:
          formValue.house,

        colony:
          formValue.colony,

        address:
          formValue.address,
      },

      // PRODUCTS
      orderItems:
        this.selectedItems,

      // CHECKOUT
      checkoutPayload:
        checkoutPayload,

      // TOTAL
      total:
        this.subtotal() +
        100,
    };

    console.log(
      'FINAL DATA:',
      finalData
    );

    // SEND ALL DATA TO PAYMENT PAGE
    this.route.navigate(
      ['/payment'],
      {
        state: finalData,
      }
    );
  }
}