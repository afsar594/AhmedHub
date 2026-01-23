import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
  ) {
    // Validators.email
    // , Validators.minLength(5), Validators.maxLength(8)
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Values:', this.loginForm.value);

      let payload = {
        Id: 0,
        Username: this.loginForm.get('email')?.value,
        Email: '',
        Pwd: this.loginForm.get('password')?.value,
        Role: '',
      };
      this.api.login(payload).subscribe((res: any) => {
        if (res.isSuccess) {
          // this.router.navigate(['/dashboard']);
          this.router.navigate(['cart-page']);
        } else {
          alert(res.message);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
