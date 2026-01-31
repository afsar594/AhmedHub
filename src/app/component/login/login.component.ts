import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted = false;
  showPassword = false; // ✅ track show/hide password
    rememberMe = false;
    username = '';
    password = '';

  constructor(
    private fb: FormBuilder,
    // private api: ApiService,
    // private router: Router,
  ) {
    // Validators.email
    // , Validators.minLength(5), Validators.maxLength(8)
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log('Form Values:', this.loginForm.value);
      alert('Login successful!');
    }
  }

  hasError(controlName: string, errorName: string) {
    return (
      this.submitted && this.loginForm.get(controlName)?.hasError(errorName)
    );
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
   forgotPassword() {
    alert('Please contact admin to reset your password.');
  }

}


