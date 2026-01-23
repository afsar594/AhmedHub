import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted = false;
  showPassword = false; // ✅ track show/hide password

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]]
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
    return this.submitted && this.loginForm.get(controlName)?.hasError(errorName);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
